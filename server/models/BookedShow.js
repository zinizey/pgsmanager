import pool from '../db/connection.js';

export const getBookedShows = async (artistId, userId) => {
  const result = await pool.query(
    `SELECT bs.* FROM booked_shows bs
     JOIN artists a ON bs.artist_id = a.id
     WHERE bs.artist_id = $1 AND a.user_id = $2
     ORDER BY bs.show_date ASC`,
    [artistId, userId]
  );
  return result.rows;
};

export const createShow = async (artistId, userId, data) => {
  const {
    venue_name,
    city,
    state,
    country,
    show_date,
    start_time,
    end_time,
    ticket_price,
    expected_attendance,
    guaranteed_fee,
    percentage_of_door,
    contact_person,
    contact_email,
    contact_phone,
    notes
  } = data;

  const result = await pool.query(
    `INSERT INTO booked_shows 
     (artist_id, venue_name, city, state, country, show_date, start_time, end_time, ticket_price, expected_attendance, guaranteed_fee, percentage_of_door, contact_person, contact_email, contact_phone, notes) 
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) 
     RETURNING *`,
    [
      artistId, venue_name, city, state, country, show_date, start_time, end_time, ticket_price,
      expected_attendance, guaranteed_fee, percentage_of_door, contact_person, contact_email, contact_phone, notes
    ]
  );
  return result.rows[0];
};

export const updateShow = async (showId, artistId, userId, data) => {
  const {
    venue_name,
    city,
    state,
    country,
    show_date,
    start_time,
    end_time,
    ticket_price,
    expected_attendance,
    guaranteed_fee,
    percentage_of_door,
    contact_person,
    contact_email,
    contact_phone,
    notes
  } = data;

  const result = await pool.query(
    `UPDATE booked_shows 
     SET venue_name = COALESCE($1, venue_name),
         city = COALESCE($2, city),
         state = COALESCE($3, state),
         country = COALESCE($4, country),
         show_date = COALESCE($5, show_date),
         start_time = COALESCE($6, start_time),
         end_time = COALESCE($7, end_time),
         ticket_price = COALESCE($8, ticket_price),
         expected_attendance = COALESCE($9, expected_attendance),
         guaranteed_fee = COALESCE($10, guaranteed_fee),
         percentage_of_door = COALESCE($11, percentage_of_door),
         contact_person = COALESCE($12, contact_person),
         contact_email = COALESCE($13, contact_email),
         contact_phone = COALESCE($14, contact_phone),
         notes = COALESCE($15, notes),
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $16 AND artist_id = $17
     AND artist_id IN (SELECT id FROM artists WHERE user_id = $18)
     RETURNING *`,
    [
      venue_name, city, state, country, show_date, start_time, end_time, ticket_price,
      expected_attendance, guaranteed_fee, percentage_of_door, contact_person, contact_email, contact_phone, notes, showId, artistId, userId
    ]
  );
  return result.rows[0];
};

export const deleteShow = async (showId, artistId, userId) => {
  const result = await pool.query(
    `DELETE FROM booked_shows 
     WHERE id = $1 AND artist_id = $2
     AND artist_id IN (SELECT id FROM artists WHERE user_id = $3)
     RETURNING *`,
    [showId, artistId, userId]
  );
  return result.rows[0];
};
