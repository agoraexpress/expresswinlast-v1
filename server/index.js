const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const admin = require("firebase-admin");
const dotenv = require("dotenv");

dotenv.config();

// Initialize Firebase Admin SDK
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Create MySQL connection pool
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Authentication middleware
const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authHeader.split("Bearer ")[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ error: "Unauthorized" });
  }
};

// Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Protected routes
app.use("/api/menu", authenticateUser);
app.use("/api/orders", authenticateUser);
app.use("/api/loyalty", authenticateUser);

// Menu routes
app.get("/api/menu", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM menu_items");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/menu/categories", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM categories");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/menu/:id", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM menu_items WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Menu item not found" });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching menu item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Order routes
app.post("/api/orders", async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const {
      items,
      total,
      address,
      phone,
      paymentMethod,
      usedCoins,
      earnedCoins,
    } = req.body;
    const userId = req.user.uid;

    // Insert order
    const [orderResult] = await connection.query(
      `INSERT INTO orders (user_id, total, status, address, phone, payment_method, used_coins, earned_coins) 
       VALUES (?, ?, 'new', ?, ?, ?, ?, ?)`,
      [
        userId,
        total,
        address,
        phone,
        paymentMethod,
        usedCoins || 0,
        earnedCoins || 0,
      ],
    );

    const orderId = orderResult.insertId;

    // Insert order items
    for (const item of items) {
      await connection.query(
        `INSERT INTO order_items (order_id, item_id, name, price, quantity, customizations) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          orderId,
          item.id,
          item.name,
          item.price,
          item.quantity,
          JSON.stringify(item.customizations || []),
        ],
      );
    }

    // Update user coins if needed
    if (usedCoins > 0 || earnedCoins > 0) {
      // Get current user coins
      const [userRows] = await connection.query(
        "SELECT coins FROM users WHERE id = ?",
        [userId],
      );
      if (userRows.length === 0) {
        throw new Error("User not found");
      }

      const currentCoins = userRows[0].coins;
      const newCoins = currentCoins - (usedCoins || 0) + (earnedCoins || 0);

      // Update user coins
      await connection.query("UPDATE users SET coins = ? WHERE id = ?", [
        newCoins,
        userId,
      ]);

      // Record coin transactions
      if (usedCoins > 0) {
        await connection.query(
          "INSERT INTO coin_transactions (user_id, amount, type, description, order_id) VALUES (?, ?, ?, ?, ?)",
          [userId, usedCoins, "used", "Used coins for order", orderId],
        );
      }

      if (earnedCoins > 0) {
        await connection.query(
          "INSERT INTO coin_transactions (user_id, amount, type, description, order_id) VALUES (?, ?, ?, ?, ?)",
          [userId, earnedCoins, "earned", "Earned coins from order", orderId],
        );
      }
    }

    await connection.commit();
    res.status(201).json({ id: orderId });
  } catch (error) {
    await connection.rollback();
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    connection.release();
  }
});

app.get("/api/orders", async (req, res) => {
  try {
    const userId = req.user.uid;

    // Get orders
    const [orders] = await pool.query(
      `SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC`,
      [userId],
    );

    const result = [];

    // Get order items for each order
    for (const order of orders) {
      const [items] = await pool.query(
        `SELECT * FROM order_items WHERE order_id = ?`,
        [order.id],
      );

      result.push({
        ...order,
        items: items.map((item) => ({
          ...item,
          customizations: JSON.parse(item.customizations || "[]"),
        })),
      });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Loyalty routes
app.get("/api/loyalty/stamps", async (req, res) => {
  try {
    const userId = req.user.uid;

    const [rows] = await pool.query(
      "SELECT * FROM stamp_cards WHERE user_id = ?",
      [userId],
    );

    res.json(
      rows.map((row) => ({
        ...row,
        active: row.active === 1,
        rewardStages: JSON.parse(row.reward_stages),
      })),
    );
  } catch (error) {
    console.error("Error fetching stamp cards:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/loyalty/stamps/:id/add", async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.uid;

    // Verify the card belongs to the user
    const [cardRows] = await pool.query(
      "SELECT * FROM stamp_cards WHERE id = ? AND user_id = ?",
      [id, userId],
    );

    if (cardRows.length === 0) {
      return res.status(404).json({ error: "Stamp card not found" });
    }

    // Add stamp
    await pool.query(
      "UPDATE stamp_cards SET collected_stamps = collected_stamps + 1 WHERE id = ?",
      [id],
    );

    res.json({ success: true });
  } catch (error) {
    console.error("Error adding stamp:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/loyalty/gifts", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM gifts WHERE active = 1");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching gifts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/loyalty/user-gifts", async (req, res) => {
  try {
    const userId = req.user.uid;

    const [rows] = await pool.query(
      `SELECT ug.*, g.name, g.description, g.image_url, g.type 
       FROM user_gifts ug 
       JOIN gifts g ON ug.gift_id = g.id 
       WHERE ug.user_id = ?`,
      [userId],
    );

    res.json(
      rows.map((row) => ({
        ...row,
        used: row.used === 1,
      })),
    );
  } catch (error) {
    console.error("Error fetching user gifts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
