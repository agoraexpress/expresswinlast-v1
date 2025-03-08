import mysql from "mysql2/promise";

// إنشاء اتصال بقاعدة البيانات
const pool = mysql.createPool({
  host: import.meta.env.VITE_MYSQL_HOST || "localhost",
  user: import.meta.env.VITE_MYSQL_USER || "root",
  password: import.meta.env.VITE_MYSQL_PASSWORD || "",
  database: import.meta.env.VITE_MYSQL_DATABASE || "flavor_loyalty",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
