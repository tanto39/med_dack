import { pool } from '../config/database';

export abstract class BaseEntity<T> {
  protected tableName: string;
  protected primaryKey: string;

  constructor(tableName: string, primaryKey: string = 'id') {
    this.tableName = tableName;
    this.primaryKey = primaryKey;
  }

  async getAll(): Promise<T[]> {
    const query = `SELECT * FROM ${this.tableName}`;
    const result = await pool.query(query);
    return result.rows;
  }

  async getById(id: number | string): Promise<T | null> {
    const query = `SELECT * FROM ${this.tableName} WHERE ${this.primaryKey} = $1`;
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  async create(data: Partial<T>): Promise<T> {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
    const query = `
      INSERT INTO ${this.tableName} (${keys.join(', ')})
      VALUES (${placeholders})
      RETURNING *
    `;
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async update(id: number | string, data: Partial<T>): Promise<T | null> {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');
    const query = `
      UPDATE ${this.tableName}
      SET ${setClause}
      WHERE ${this.primaryKey} = $${keys.length + 1}
      RETURNING *
    `;
    const result = await pool.query(query, [...values, id]);
    return result.rows[0] || null;
  }

  async delete(id: number | string): Promise<boolean> {
    const query = `DELETE FROM ${this.tableName} WHERE ${this.primaryKey} = $1`;
    const result = await pool.query(query, [id]);
    return ( result.rowCount && result.rowCount > 0 ) ? true : false;
  }
}