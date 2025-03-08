import { db } from "@/lib/firebase";
import { useDemoMode } from "@/context/DemoModeContext";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import pool from "@/lib/mysql";

export interface MenuItem {
  id?: string;
  name: string;
  description: string;
  price: number;
  coinValue: number;
  imageUrl: string;
  ingredients: string[];
  category: string;
  isFlashSale?: boolean;
  discountPercentage?: number;
}

export interface Category {
  id?: string;
  name: string;
  icon: string;
}

// Mock data for demo mode
const mockMenuItems: MenuItem[] = [
  {
    id: "1",
    name: "برجر كلاسيكي",
    description: "برجر لحم بقري مع خس وطماطم وبصل ومخلل",
    price: 89.99,
    coinValue: 90,
    imageUrl:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80",
    ingredients: ["لحم بقري", "خس", "طماطم", "بصل", "مخلل", "صلصة خاصة"],
    category: "1",
  },
  {
    id: "2",
    name: "برجر بالجبن",
    description: "برجر لحم بقري مع جبن شيدر وخس وطماطم وبصل ومخلل",
    price: 99.99,
    coinValue: 100,
    imageUrl:
      "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=500&q=80",
    ingredients: [
      "لحم بقري",
      "جبن شيدر",
      "خس",
      "طماطم",
      "بصل",
      "مخلل",
      "صلصة خاصة",
    ],
    category: "1",
  },
  {
    id: "5",
    name: "بيتزا مارجريتا",
    description: "بيتزا كلاسيكية مع صلصة طماطم وجبن موزاريلا وريحان",
    price: 129.99,
    coinValue: 130,
    imageUrl:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&q=80",
    ingredients: ["عجينة", "صلصة طماطم", "جبن موزاريلا", "ريحان", "زيت زيتون"],
    category: "2",
  },
  {
    id: "7",
    name: "سلطة سيزر",
    description: "خس روماني مع صلصة سيزر وقطع خبز محمص وجبن بارميزان",
    price: 79.99,
    coinValue: 80,
    imageUrl:
      "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500&q=80",
    ingredients: ["خس روماني", "صلصة سيزر", "خبز محمص", "جبن بارميزان"],
    category: "3",
  },
];

const mockCategories: Category[] = [
  { id: "1", name: "برجر", icon: "burger" },
  { id: "2", name: "بيتزا", icon: "pizza" },
  { id: "3", name: "سلطات", icon: "salad" },
  { id: "4", name: "حلويات", icon: "dessert" },
  { id: "5", name: "مشروبات", icon: "drink" },
];

// Firebase methods
export const getMenuItems = async (): Promise<MenuItem[]> => {
  // Check if in demo mode
  if (
    typeof window !== "undefined" &&
    localStorage.getItem("demoMode") === "true"
  ) {
    return Promise.resolve(mockMenuItems);
  }

  // Real implementation for production mode
  try {
    const menuCollection = collection(db, "menuItems");
    const menuSnapshot = await getDocs(menuCollection);
    return menuSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as MenuItem[];
  } catch (error) {
    console.error("Error getting menu items:", error);
    throw error;
  }
};

export const getMenuItemsByCategory = async (
  categoryId: string,
): Promise<MenuItem[]> => {
  try {
    const menuCollection = collection(db, "menuItems");
    const q = query(menuCollection, where("category", "==", categoryId));
    const menuSnapshot = await getDocs(q);
    return menuSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as MenuItem[];
  } catch (error) {
    console.error("Error getting menu items by category:", error);
    throw error;
  }
};

export const getMenuItem = async (id: string): Promise<MenuItem | null> => {
  try {
    const menuDoc = await getDoc(doc(db, "menuItems", id));
    if (menuDoc.exists()) {
      return { id: menuDoc.id, ...menuDoc.data() } as MenuItem;
    }
    return null;
  } catch (error) {
    console.error("Error getting menu item:", error);
    throw error;
  }
};

export const addMenuItem = async (item: MenuItem): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, "menuItems"), item);
    return docRef.id;
  } catch (error) {
    console.error("Error adding menu item:", error);
    throw error;
  }
};

export const updateMenuItem = async (
  id: string,
  item: Partial<MenuItem>,
): Promise<void> => {
  try {
    await updateDoc(doc(db, "menuItems", id), item);
  } catch (error) {
    console.error("Error updating menu item:", error);
    throw error;
  }
};

export const deleteMenuItem = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, "menuItems", id));
  } catch (error) {
    console.error("Error deleting menu item:", error);
    throw error;
  }
};

export const getCategories = async (): Promise<Category[]> => {
  // Check if in demo mode
  if (
    typeof window !== "undefined" &&
    localStorage.getItem("demoMode") === "true"
  ) {
    return Promise.resolve(mockCategories);
  }

  // Real implementation for production mode
  try {
    const categoryCollection = collection(db, "categories");
    const categorySnapshot = await getDocs(categoryCollection);
    return categorySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Category[];
  } catch (error) {
    console.error("Error getting categories:", error);
    throw error;
  }
};

// MySQL methods
export const getMenuItemsFromMySQL = async (): Promise<MenuItem[]> => {
  try {
    const [rows] = await pool.query("SELECT * FROM menu_items");
    return rows as MenuItem[];
  } catch (error) {
    console.error("Error getting menu items from MySQL:", error);
    throw error;
  }
};

export const getMenuItemFromMySQL = async (
  id: string,
): Promise<MenuItem | null> => {
  try {
    const [rows] = await pool.query("SELECT * FROM menu_items WHERE id = ?", [
      id,
    ]);
    const items = rows as MenuItem[];
    return items.length > 0 ? items[0] : null;
  } catch (error) {
    console.error("Error getting menu item from MySQL:", error);
    throw error;
  }
};

export const addMenuItemToMySQL = async (item: MenuItem): Promise<number> => {
  try {
    const [result] = await pool.query(
      "INSERT INTO menu_items (name, description, price, coin_value, image_url, ingredients, category) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        item.name,
        item.description,
        item.price,
        item.coinValue,
        item.imageUrl,
        JSON.stringify(item.ingredients),
        item.category,
      ],
    );
    return (result as any).insertId;
  } catch (error) {
    console.error("Error adding menu item to MySQL:", error);
    throw error;
  }
};
