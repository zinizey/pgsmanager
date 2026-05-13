import pool from '../db/connection.js';

export const getScheduledEvents = async (artistId, userId) => {
  const result = await pool.query(
    `SELECT se.* FROM scheduled_events se
     JOIN artists a ON se.artist_id = a.id
     WHERE se.artist_id = $1 AND a.user_id = $2
     ORDER BY se.start_date ASC`,
    [artistId, userId]
  );
  return result.rows;
};

export const createEvent = async (artistId, userId, data) => {
  const { title, description, event_type, start_date, end_date, location, notes } = data;
  const result = await pool.query(
    `INSERT INTO scheduled_events (artist_id, title, description, event_type, start_date, end_date, location, notes) 
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
     RETURNING *`,
    [artistId, title, description, event_type, start_date, end_date, location, notes]
  );
  return result.rows[0];
};

export const updateEvent = async (eventId, artistId, userId, data) => {
  const { title, description, event_type, start_date, end_date, location, notes } = data;
  const result = await pool.query(
    `UPDATE scheduled_events 
     SET title = COALESCE($1, title),
         description = COALESCE($2, description),
         event_type = COALESCE($3, event_type),
         start_date = COALESCE($4, start_date),
         end_date = COALESCE($5, end_date),
         location = COALESCE($6, location),
         notes = COALESCE($7, notes),
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $8 AND artist_id = $9
     AND artist_id IN (SELECT id FROM artists WHERE user_id = $10)
     RETURNING *`,
    [title, description, event_type, start_date, end_date, location, notes, eventId, artistId, userId]
  );
  return result.rows[0];
};

export const deleteEvent = async (eventId, artistId, userId) => {
  const result = await pool.query(
    `DELETE FROM scheduled_events 
     WHERE id = $1 AND artist_id = $2
     AND artist_id IN (SELECT id FROM artists WHERE user_id = $3)
     RETURNING *`,
    [eventId, artistId, userId]
  );
  return result.rows[0];
};
