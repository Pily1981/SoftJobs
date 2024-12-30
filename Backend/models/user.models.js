import { pool } from '../database/config.js';
import format from "pg-format";

const getUser = async (email) => {
  const query = format(`SELECT * FROM usuarios WHERE email = %s;`,email);
  const { rows } = await pool.query(query);
  return rows[0];
};

const createUser = async ({ email, password, rol, lenguage }) => {
  const query = format(`INSERT INTO usuarios (email, password, rol, lenguage) VALUES (%s, %s, %s, %s) RETURNING *;`,email,password,rol,lenguage);
  const { rows } = await pool.query(query);
  return rows[0];
};

const verifyUserEmail = async (email='') => {
  const query = format(`SELECT email FROM usuarios WHERE email = %s;`,email);
  const { rows } = await pool.query(query);
  return rows[0];
};

export const usersModel = {
  getUser,
  createUser,
  verifyUserEmail,
};