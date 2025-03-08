import pool from "@/lib/mysql";

export interface User {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  role: "user" | "admin";
  coins: number;
  created_at: Date;
}

export interface CoinTransaction {
  id: number;
  user_id: number;
  amount: number;
  type: "earned" | "used";
  description: string;
  order_id: number | null;
  created_at: Date;
}

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    return rows as User[];
  } catch (error) {
    console.error("Error getting all users:", error);
    throw error;
  }
};

export const getUserById = async (id: number): Promise<User | null> => {
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);

    const users = rows as User[];
    if (users.length === 0) {
      return null;
    }

    return users[0];
  } catch (error) {
    console.error("Error getting user by ID:", error);
    throw error;
  }
};

export const getUserByPhone = async (phone: string): Promise<User | null> => {
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE phone = ?", [
      phone,
    ]);

    const users = rows as User[];
    if (users.length === 0) {
      return null;
    }

    return users[0];
  } catch (error) {
    console.error("Error getting user by phone:", error);
    throw error;
  }
};

export const createUser = async (
  user: Omit<User, "id" | "created_at">,
): Promise<number> => {
  try {
    const [result] = await pool.query(
      "INSERT INTO users (name, phone, email, role, coins) VALUES (?, ?, ?, ?, ?)",
      [user.name, user.phone, user.email, user.role, user.coins],
    );

    return (result as any).insertId;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const updateUser = async (
  id: number,
  user: Partial<User>,
): Promise<void> => {
  try {
    const updates: string[] = [];
    const values: any[] = [];

    if (user.name !== undefined) {
      updates.push("name = ?");
      values.push(user.name);
    }

    if (user.phone !== undefined) {
      updates.push("phone = ?");
      values.push(user.phone);
    }

    if (user.email !== undefined) {
      updates.push("email = ?");
      values.push(user.email);
    }

    if (user.role !== undefined) {
      updates.push("role = ?");
      values.push(user.role);
    }

    if (user.coins !== undefined) {
      updates.push("coins = ?");
      values.push(user.coins);
    }

    if (updates.length === 0) {
      return;
    }

    values.push(id);

    await pool.query(
      `UPDATE users SET ${updates.join(", ")} WHERE id = ?`,
      values,
    );
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const getUserCoinTransactions = async (
  userId: number,
): Promise<CoinTransaction[]> => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM coin_transactions WHERE user_id = ? ORDER BY created_at DESC",
      [userId],
    );

    return rows as CoinTransaction[];
  } catch (error) {
    console.error("Error getting user coin transactions:", error);
    throw error;
  }
};

export const addCoinTransaction = async (
  transaction: Omit<CoinTransaction, "id" | "created_at">,
): Promise<number> => {
  try {
    const [result] = await pool.query(
      "INSERT INTO coin_transactions (user_id, amount, type, description, order_id) VALUES (?, ?, ?, ?, ?)",
      [
        transaction.user_id,
        transaction.amount,
        transaction.type,
        transaction.description,
        transaction.order_id,
      ],
    );

    return (result as any).insertId;
  } catch (error) {
    console.error("Error adding coin transaction:", error);
    throw error;
  }
};
