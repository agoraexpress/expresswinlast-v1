import { db } from "@/lib/firebase";
import { useDemoMode } from "@/context/DemoModeContext";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import pool from "@/lib/mysql";
import { CartItemType } from "@/components/cart/CartItem";

export interface Order {
  id?: string;
  userId: string;
  items: CartItemType[];
  total: number;
  status: "new" | "preparing" | "delivering" | "delivered" | "cancelled";
  address: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  paymentMethod: string;
  usedCoins: number;
  earnedCoins: number;
}

// Mock data for demo mode
const mockOrders: Order[] = [
  {
    id: "order1",
    userId: "user123",
    items: [
      {
        id: "1",
        name: "برجر كلاسيكي",
        price: 89.99,
        quantity: 2,
        imageUrl:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80",
      },
      {
        id: "5",
        name: "بيتزا مارجريتا",
        price: 129.99,
        quantity: 1,
        imageUrl:
          "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&q=80",
      },
    ],
    total: 309.97,
    status: "delivered",
    address: "شارع الحسن الثاني، الدار البيضاء، المغرب",
    phone: "+212 612345678",
    createdAt: new Date("2023-11-15T14:30:00"),
    updatedAt: new Date("2023-11-15T15:45:00"),
    paymentMethod: "cash",
    usedCoins: 0,
    earnedCoins: 30,
  },
  {
    id: "order2",
    userId: "user123",
    items: [
      {
        id: "2",
        name: "برجر بالجبن",
        price: 99.99,
        quantity: 1,
        imageUrl:
          "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=500&q=80",
      },
      {
        id: "7",
        name: "سلطة سيزر",
        price: 79.99,
        quantity: 1,
        imageUrl:
          "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500&q=80",
      },
    ],
    total: 179.98,
    status: "delivered",
    address: "شارع الحسن الثاني، الدار البيضاء، المغرب",
    phone: "+212 612345678",
    createdAt: new Date("2023-11-10T12:15:00"),
    updatedAt: new Date("2023-11-10T13:30:00"),
    paymentMethod: "cash",
    usedCoins: 0,
    earnedCoins: 18,
  },
];

// Firebase methods
export const createOrder = async (order: Order): Promise<string> => {
  // Check if in demo mode
  if (
    typeof window !== "undefined" &&
    localStorage.getItem("demoMode") === "true"
  ) {
    // Simulate order creation in demo mode
    console.log("Creating order in demo mode:", order);
    return Promise.resolve(`demo-order-${Date.now()}`);
  }

  // Real implementation for production mode
  try {
    // Add order to Firestore
    const docRef = await addDoc(collection(db, "orders"), {
      ...order,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Update user's coins if applicable
    if (order.earnedCoins > 0 || order.usedCoins > 0) {
      const userRef = doc(db, "users", order.userId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const currentCoins = userData.coins || 0;
        const newCoins = currentCoins + order.earnedCoins - order.usedCoins;

        await updateDoc(userRef, { coins: newCoins });

        // Record coin transaction
        await addDoc(collection(db, "coinTransactions"), {
          userId: order.userId,
          orderId: docRef.id,
          earnedCoins: order.earnedCoins,
          usedCoins: order.usedCoins,
          balance: newCoins,
          createdAt: new Date(),
        });
      }
    }

    return docRef.id;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const getUserOrders = async (userId: string): Promise<Order[]> => {
  // Check if in demo mode
  if (
    typeof window !== "undefined" &&
    localStorage.getItem("demoMode") === "true"
  ) {
    return Promise.resolve(mockOrders);
  }

  // Real implementation for production mode
  try {
    const ordersCollection = collection(db, "orders");
    const q = query(
      ordersCollection,
      where("userId", "==", userId),
      orderBy("createdAt", "desc"),
    );
    const ordersSnapshot = await getDocs(q);
    return ordersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
      updatedAt: doc.data().updatedAt.toDate(),
    })) as Order[];
  } catch (error) {
    console.error("Error getting user orders:", error);
    throw error;
  }
};

export const getOrder = async (id: string): Promise<Order | null> => {
  try {
    const orderDoc = await getDoc(doc(db, "orders", id));
    if (orderDoc.exists()) {
      const data = orderDoc.data();
      return {
        id: orderDoc.id,
        ...data,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
      } as Order;
    }
    return null;
  } catch (error) {
    console.error("Error getting order:", error);
    throw error;
  }
};

export const updateOrderStatus = async (
  id: string,
  status: Order["status"],
): Promise<void> => {
  try {
    await updateDoc(doc(db, "orders", id), {
      status,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
};

// MySQL methods
export const createOrderInMySQL = async (order: Order): Promise<number> => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Insert order
    const [orderResult] = await connection.query(
      `INSERT INTO orders (user_id, total, status, address, phone, created_at, updated_at, payment_method, used_coins, earned_coins) 
       VALUES (?, ?, ?, ?, ?, NOW(), NOW(), ?, ?, ?)`,
      [
        order.userId,
        order.total,
        order.status,
        order.address,
        order.phone,
        order.paymentMethod,
        order.usedCoins,
        order.earnedCoins,
      ],
    );

    const orderId = (orderResult as any).insertId;

    // Insert order items
    for (const item of order.items) {
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

    await connection.commit();
    return orderId;
  } catch (error) {
    await connection.rollback();
    console.error("Error creating order in MySQL:", error);
    throw error;
  } finally {
    connection.release();
  }
};

export const getUserOrdersFromMySQL = async (
  userId: string,
): Promise<Order[]> => {
  try {
    // Get orders
    const [orders] = await pool.query(
      `SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC`,
      [userId],
    );

    const result: Order[] = [];

    // Get order items for each order
    for (const order of orders as any[]) {
      const [items] = await pool.query(
        `SELECT * FROM order_items WHERE order_id = ?`,
        [order.id],
      );

      result.push({
        id: order.id.toString(),
        userId: order.user_id,
        items: (items as any[]).map((item) => ({
          id: item.item_id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          customizations: JSON.parse(item.customizations || "[]"),
        })),
        total: order.total,
        status: order.status,
        address: order.address,
        phone: order.phone,
        createdAt: new Date(order.created_at),
        updatedAt: new Date(order.updated_at),
        paymentMethod: order.payment_method,
        usedCoins: order.used_coins,
        earnedCoins: order.earned_coins,
      });
    }

    return result;
  } catch (error) {
    console.error("Error getting user orders from MySQL:", error);
    throw error;
  }
};
