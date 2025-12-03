import { query } from "../db.js";

// GET all clients
export const getClients = async () => {
  try {
    // FIXED: Changed 'client_tb' to 'clients_tb'
    const { rows } = await query("SELECT * FROM clients_tb ORDER BY id ASC");
    return rows;
  } catch (err) {
    console.error("DB Error in getClients:", err);
    throw err;
  }
};

// CREATE client
export const createClient = async (clientData) => {
  const { name, email, job, rate, isactive } = clientData;
  try {
    // FIXED: Changed 'employees' to 'clients_tb'
    const { rows } = await query(
      `INSERT INTO clients_tb (name, email, job, rate, isactive) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, email, job, rate, isactive]
    );
    return rows[0];
  } catch (err) {
    console.error("DB Error in createClient:", err);
    throw err;
  }
};

// UPDATE client
export const updateClient = async (clientId, clientData) => {
  const { name, email, job, rate, isactive } = clientData;
  try {
    // FIXED: Changed 'employees' to 'clients_tb'
    const { rows } = await query(
      `UPDATE clients_tb 
       SET name = $1, email = $2, job = $3, rate = $4, isactive = $5 
       WHERE id = $6 RETURNING *`,
      [name, email, job, rate, isactive, clientId]
    );
    return rows[0];
  } catch (err) {
    console.error("DB Error in updateClient:", err);
    throw err;
  }
};

// DELETE client
export const deleteClient = async (clientId) => {
  try {
    // FIXED: Changed 'employees' to 'clients_tb'
    const { rowCount } = await query("DELETE FROM clients_tb WHERE id = $1", [clientId]);
    return rowCount > 0;
  } catch (err) {
    console.error("DB Error in deleteClient:", err);
    throw err;
  }
};

// SEARCH clients
export const searchClients = async (searchTerm) => {
  try {
    // FIXED: Changed 'employees' to 'clients_tb'
    const { rows } = await query(
      `SELECT * FROM clients_tb 
       WHERE name ILIKE $1 OR email ILIKE $1 OR job ILIKE $1`,
      [`%${searchTerm}%`]
    );
    return rows;
  } catch (err) {
    console.error("DB Error in searchClients:", err);
    throw err;
  }
};
