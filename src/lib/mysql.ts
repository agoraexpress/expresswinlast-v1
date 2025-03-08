import mysql from "mysql2/promise";

// Create a connection pool
const pool = mysql.createPool({
  host: import.meta.env.VITE_MYSQL_HOST,
  user: import.meta.env.VITE_MYSQL_USER,
  password: import.meta.env.VITE_MYSQL_PASSWORD,
  database: import.meta.env.VITE_MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
