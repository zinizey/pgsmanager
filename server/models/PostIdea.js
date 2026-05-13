import pool from '../db/connection.js';

export const getPostIdeas = async (artistId, userId) => {
  const result = await pool.query(
    `SELECT pi.* FROM post_ideas pi
     JOIN artists a ON pi.artist_id = a.id
     WHERE pi.artist_id = $1 AND a.user_id = $2
     ORDER BY pi.created_at DESC`,
    [artistId, userId]
  );
  return result.rows;
};

export const createPostIdea = async (artistId, userId, data) => {
  const { title, description, category, platform, status, scheduled_date } = data;
  const result = await pool.query(
    `INSERT INTO post_ideas (artist_id, title, description, category, platform, status, scheduled_date) 
     VALUES ($1, $2, $3, $4, $5, $6, $7) 
     RETURNING *`,
    [artistId, title, description, category, platform, status || 'draft', scheduled_date]
  );
  return result.rows[0];
};

export const updatePostIdea = async (ideaId, artistId, userId, data) => {
  const { title, description, category, platform, status, scheduled_date } = data;
  const result = await pool.query(
    `UPDATE post_ideas 
     SET title = COALESCE($1, title),
         description = COALESCE($2, description),
         category = COALESCE($3, category),
         platform = COALESCE($4, platform),
         status = COALESCE($5, status),
         scheduled_date = COALESCE($6, scheduled_date),
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $7 AND artist_id = $8
     AND artist_id IN (SELECT id FROM artists WHERE user_id = $9)
     RETURNING *`,
    [title, description, category, platform, status, scheduled_date, ideaId, artistId, userId]
  );
  return result.rows[0];
};

export const deletePostIdea = async (ideaId, artistId, userId) => {
  const result = await pool.query(
    `DELETE FROM post_ideas 
     WHERE id = $1 AND artist_id = $2
     AND artist_id IN (SELECT id FROM artists WHERE user_id = $3)
     RETURNING *`,
    [ideaId, artistId, userId]
  );
  return result.rows[0];
};
