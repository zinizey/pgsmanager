import pool from '../db/connection.js';

export const getFinancialTransactions = async (artistId, userId) => {
  const result = await pool.query(
    `SELECT ft.* FROM financial_transactions ft
     JOIN artists a ON ft.artist_id = a.id
     WHERE ft.artist_id = $1 AND a.user_id = $2
     ORDER BY ft.transaction_date DESC`,
    [artistId, userId]
  );
  return result.rows;
};

export const createTransaction = async (artistId, userId, data) => {
  const { transaction_type, amount, category, description, transaction_date, status, notes } = data;
  const result = await pool.query(
    `INSERT INTO financial_transactions (artist_id, transaction_type, amount, category, description, transaction_date, status, notes) 
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
     RETURNING *`,
    [artistId, transaction_type, amount, category, description, transaction_date, status || 'pending', notes]
  );
  return result.rows[0];
};

export const updateTransaction = async (transactionId, artistId, userId, data) => {
  const { transaction_type, amount, category, description, transaction_date, status, notes } = data;
  const result = await pool.query(
    `UPDATE financial_transactions 
     SET transaction_type = COALESCE($1, transaction_type),
         amount = COALESCE($2, amount),
         category = COALESCE($3, category),
         description = COALESCE($4, description),
         transaction_date = COALESCE($5, transaction_date),
         status = COALESCE($6, status),
         notes = COALESCE($7, notes),
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $8 AND artist_id = $9
     AND artist_id IN (SELECT id FROM artists WHERE user_id = $10)
     RETURNING *`,
    [transaction_type, amount, category, description, transaction_date, status, notes, transactionId, artistId, userId]
  );
  return result.rows[0];
};

export const deleteTransaction = async (transactionId, artistId, userId) => {
  const result = await pool.query(
    `DELETE FROM financial_transactions 
     WHERE id = $1 AND artist_id = $2
     AND artist_id IN (SELECT id FROM artists WHERE user_id = $3)
     RETURNING *`,
    [transactionId, artistId, userId]
  );
  return result.rows[0];
};

export const getFinancialSummary = async (artistId, userId) => {
  const result = await pool.query(
    `SELECT 
       transaction_type,
       SUM(amount) as total
     FROM financial_transactions ft
     JOIN artists a ON ft.artist_id = a.id
     WHERE ft.artist_id = $1 AND a.user_id = $2
     GROUP BY transaction_type`,
    [artistId, userId]
  );
  return result.rows;
};
