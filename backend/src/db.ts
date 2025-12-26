import dotenv from "dotenv";
dotenv.config();

import mysql from 'mysql2/promise';

console.log("DB PASSWORD:", process.env.PASSWORD);
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: 'mystackoverflow',
});

export async function testDBConnection() {
  try {
    const connection = await db.getConnection();
    console.log("✅ Connected to MySQL database");
    connection.release();
  } catch (err: any) {
    console.error("❌ Error connecting to MySQL:", err.message);
  }
}

export { db };