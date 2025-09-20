import { query } from "../db.js";

// GET all employees
export const getClients = async () => {
  try {
    const { rows } = await query("SELECT * FROM employees ORDER BY id ASC");
    return rows;
  } catch (err) {
    console.error("DB Error in getClients:", err);
    throw err;
  }
};

// CREATE employee
export const createClient = async (clientData) => {
  const { name, email, job, rate, isactive } = clientData;
  try {
    const { rows } = await query(
      `INSERT INTO employees (name, email, job, rate, isactive) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, email, job, rate, isactive]
    );
    return rows[0];
  } catch (err) {
    console.error("DB Error in createClient:", err);
    throw err;
  }
};

// UPDATE employee
export const updateClient = async (clientId, clientData) => {
  const { name, email, job, rate, isactive } = clientData;
  try {
    const { rows } = await query(
      `UPDATE employees 
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

// DELETE employee
export const deleteClient = async (clientId) => {
  try {
    const { rowCount } = await query("DELETE FROM employees WHERE id = $1", [clientId]);
    return rowCount > 0;
  } catch (err) {
    console.error("DB Error in deleteClient:", err);
    throw err;
  }
};

// SEARCH employees
export const searchClients = async (searchTerm) => {
  try {
    const { rows } = await query(
      `SELECT * FROM employees 
       WHERE name ILIKE $1 OR email ILIKE $1 OR job ILIKE $1`,
      [`%${searchTerm}%`]
    );
    return rows;
  } catch (err) {
    console.error("DB Error in searchClients:", err);
    throw err;
  }
};
