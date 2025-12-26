import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'nabiha2003',
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