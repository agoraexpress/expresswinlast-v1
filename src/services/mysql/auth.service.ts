import pool from "@/lib/mysql";

export interface UserData {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  role: "user" | "admin";
  coins: number;
  created_at: Date;
}

export const loginUser = async (
  phone: string,
  pin: string,
): Promise<UserData | null> => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE phone = ? AND pin = ?",
      [phone, pin],
    );

    const users = rows as UserData[];
    if (users.length === 0) {
      return null;
    }

    return users[0];
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const registerUser = async (
  name: string,
  phone: string,
  pin: string,
  email?: string,
): Promise<UserData> => {
  try {
    // التحقق من عدم وجود مستخدم بنفس رقم الهاتف
    const [existingUsers] = await pool.query(
      "SELECT * FROM users WHERE phone = ?",
      [phone],
    );

    if ((existingUsers as any[]).length > 0) {
      throw new Error("رقم الهاتف مستخدم بالفعل");
    }

    // إنشاء مستخدم جديد
    const [result] = await pool.query(
      "INSERT INTO users (name, phone, pin, email, role, coins) VALUES (?, ?, ?, ?, ?, ?)",
      [name, phone, pin, email || null, "user", 0],
    );

    const userId = (result as any).insertId;

    // استرجاع بيانات المستخدم الجديد
    const [userRows] = await pool.query("SELECT * FROM users WHERE id = ?", [
      userId,
    ]);

    return (userRows as UserData[])[0];
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const getUserById = async (id: number): Promise<UserData | null> => {
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);

    const users = rows as UserData[];
    if (users.length === 0) {
      return null;
    }

    return users[0];
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  }
};

export const updateUserCoins = async (
  userId: number,
  coins: number,
): Promise<void> => {
  try {
    await pool.query("UPDATE users SET coins = ? WHERE id = ?", [
      coins,
      userId,
    ]);
  } catch (error) {
    console.error("Error updating user coins:", error);
    throw error;
  }
};
