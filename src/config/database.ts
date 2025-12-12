import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  client_encoding: 'utf8',
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

// Функция для проверки подключения
export const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('Connected to PostgreSQL database:', process.env.DB_NAME);
    console.log('Client encoding:', (await client.query('SHOW client_encoding')).rows[0]);
    console.log('Server encoding:', (await client.query('SHOW SERVER_ENCODING')).rows[0]);
    client.release();
  } catch (error) {
    console.error('Database connection error:', error);
  }
};