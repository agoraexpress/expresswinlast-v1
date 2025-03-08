import pool from "@/lib/mysql";

export interface OrderItem {
  id?: number;
  order_id?: number;
  item_id: number;
  name: string;
  price: number;
  quantity: number;
  customizations?: string[];
}

export interface Order {
  id?: number;
  user_id: number;
  total: number;
  status: "new" | "preparing" | "delivering" | "delivered" | "cancelled";
  address: string;
  phone: string;
  created_at?: Date;
  updated_at?: Date;
  payment_method: string;
  used_coins: number;
  earned_coins: number;
  items?: OrderItem[];
}

export const createOrder = async (order: Order): Promise<number> => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // إدخال الطلب
    const [orderResult] = await connection.query(
      `INSERT INTO orders 
       (user_id, total, status, address, phone, payment_method, used_coins, earned_coins) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        order.user_id,
        order.total,
        order.status,
        order.address,
        order.phone,
        order.payment_method,
        order.used_coins,
        order.earned_coins,
      ],
    );

    const orderId = (orderResult as any).insertId;

    // إدخال عناصر الطلب
    if (order.items && order.items.length > 0) {
      for (const item of order.items) {
        await connection.query(
          `INSERT INTO order_items 
           (order_id, item_id, name, price, quantity, customizations) 
           VALUES (?, ?, ?, ?, ?, ?)`,
          [
            orderId,
            item.item_id,
            item.name,
            item.price,
            item.quantity,
            JSON.stringify(item.customizations || []),
          ],
        );
      }
    }

    // تحديث رصيد العملات للمستخدم إذا لزم الأمر
    if (order.used_coins > 0 || order.earned_coins > 0) {
      // الحصول على رصيد العملات الحالي
      const [userRows] = await connection.query(
        "SELECT coins FROM users WHERE id = ?",
        [order.user_id],
      );

      const currentCoins = (userRows as any[])[0].coins;
      const newCoins = currentCoins - order.used_coins + order.earned_coins;

      // تحديث رصيد العملات
      await connection.query("UPDATE users SET coins = ? WHERE id = ?", [
        newCoins,
        order.user_id,
      ]);

      // تسجيل معاملات العملات
      if (order.used_coins > 0) {
        await connection.query(
          `INSERT INTO coin_transactions 
           (user_id, amount, type, description, order_id) 
           VALUES (?, ?, ?, ?, ?)`,
          [
            order.user_id,
            order.used_coins,
            "used",
            "استخدام عملات للطلب",
            orderId,
          ],
        );
      }

      if (order.earned_coins > 0) {
        await connection.query(
          `INSERT INTO coin_transactions 
           (user_id, amount, type, description, order_id) 
           VALUES (?, ?, ?, ?, ?)`,
          [
            order.user_id,
            order.earned_coins,
            "earned",
            "عملات مكتسبة من الطلب",
            orderId,
          ],
        );
      }
    }

    await connection.commit();
    return orderId;
  } catch (error) {
    await connection.rollback();
    console.error("Error creating order:", error);
    throw error;
  } finally {
    connection.release();
  }
};

export const getUserOrders = async (userId: number): Promise<Order[]> => {
  try {
    // الحصول على الطلبات
    const [orders] = await pool.query(
      `SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC`,
      [userId],
    );

    const result: Order[] = [];

    // الحصول على عناصر كل طلب
    for (const order of orders as any[]) {
      const [items] = await pool.query(
        `SELECT * FROM order_items WHERE order_id = ?`,
        [order.id],
      );

      result.push({
        ...order,
        items: (items as any[]).map((item) => ({
          ...item,
          customizations: JSON.parse(item.customizations || "[]"),
        })),
      });
    }

    return result;
  } catch (error) {
    console.error("Error getting user orders:", error);
    throw error;
  }
};

export const getOrder = async (id: number): Promise<Order | null> => {
  try {
    // الحصول على الطلب
    const [orders] = await pool.query("SELECT * FROM orders WHERE id = ?", [
      id,
    ]);

    if ((orders as any[]).length === 0) {
      return null;
    }

    const order = (orders as any[])[0];

    // الحصول على عناصر الطلب
    const [items] = await pool.query(
      "SELECT * FROM order_items WHERE order_id = ?",
      [id],
    );

    return {
      ...order,
      items: (items as any[]).map((item) => ({
        ...item,
        customizations: JSON.parse(item.customizations || "[]"),
      })),
    };
  } catch (error) {
    console.error("Error getting order:", error);
    throw error;
  }
};

export const updateOrderStatus = async (
  id: number,
  status: Order["status"],
): Promise<void> => {
  try {
    await pool.query(
      "UPDATE orders SET status = ?, updated_at = NOW() WHERE id = ?",
      [status, id],
    );
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
};

export const getAllOrders = async (): Promise<Order[]> => {
  try {
    const [orders] = await pool.query(
      "SELECT * FROM orders ORDER BY created_at DESC",
    );

    return orders as Order[];
  } catch (error) {
    console.error("Error getting all orders:", error);
    throw error;
  }
};

export const getOrdersByStatus = async (
  status: Order["status"],
): Promise<Order[]> => {
  try {
    const [orders] = await pool.query(
      "SELECT * FROM orders WHERE status = ? ORDER BY created_at DESC",
      [status],
    );

    return orders as Order[];
  } catch (error) {
    console.error("Error getting orders by status:", error);
    throw error;
  }
};
