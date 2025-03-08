import pool from "@/lib/mysql";

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  coin_value: number;
  image_url: string;
  ingredients: string[];
  category_id: number;
  is_flash_sale: boolean;
  discount_percentage: number;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
}

export const getMenuItems = async (): Promise<MenuItem[]> => {
  try {
    const [rows] = await pool.query("SELECT * FROM menu_items");

    return (rows as any[]).map((item) => ({
      ...item,
      ingredients: JSON.parse(item.ingredients),
      is_flash_sale: item.is_flash_sale === 1,
    }));
  } catch (error) {
    console.error("Error getting menu items:", error);
    throw error;
  }
};

export const getMenuItemsByCategory = async (
  categoryId: number,
): Promise<MenuItem[]> => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM menu_items WHERE category_id = ?",
      [categoryId],
    );

    return (rows as any[]).map((item) => ({
      ...item,
      ingredients: JSON.parse(item.ingredients),
      is_flash_sale: item.is_flash_sale === 1,
    }));
  } catch (error) {
    console.error("Error getting menu items by category:", error);
    throw error;
  }
};

export const getMenuItem = async (id: number): Promise<MenuItem | null> => {
  try {
    const [rows] = await pool.query("SELECT * FROM menu_items WHERE id = ?", [
      id,
    ]);

    const items = rows as any[];
    if (items.length === 0) {
      return null;
    }

    const item = items[0];
    return {
      ...item,
      ingredients: JSON.parse(item.ingredients),
      is_flash_sale: item.is_flash_sale === 1,
    };
  } catch (error) {
    console.error("Error getting menu item:", error);
    throw error;
  }
};

export const getCategories = async (): Promise<Category[]> => {
  try {
    const [rows] = await pool.query("SELECT * FROM categories");
    return rows as Category[];
  } catch (error) {
    console.error("Error getting categories:", error);
    throw error;
  }
};

export const getFlashSaleItems = async (): Promise<MenuItem[]> => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM menu_items WHERE is_flash_sale = 1",
    );

    return (rows as any[]).map((item) => ({
      ...item,
      ingredients: JSON.parse(item.ingredients),
      is_flash_sale: true,
    }));
  } catch (error) {
    console.error("Error getting flash sale items:", error);
    throw error;
  }
};

export const addMenuItem = async (
  item: Omit<MenuItem, "id">,
): Promise<number> => {
  try {
    const [result] = await pool.query(
      `INSERT INTO menu_items 
       (name, description, price, coin_value, image_url, ingredients, category_id, is_flash_sale, discount_percentage) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        item.name,
        item.description,
        item.price,
        item.coin_value,
        item.image_url,
        JSON.stringify(item.ingredients),
        item.category_id,
        item.is_flash_sale ? 1 : 0,
        item.discount_percentage,
      ],
    );

    return (result as any).insertId;
  } catch (error) {
    console.error("Error adding menu item:", error);
    throw error;
  }
};

export const updateMenuItem = async (
  id: number,
  item: Partial<MenuItem>,
): Promise<void> => {
  try {
    const updates: string[] = [];
    const values: any[] = [];

    if (item.name !== undefined) {
      updates.push("name = ?");
      values.push(item.name);
    }

    if (item.description !== undefined) {
      updates.push("description = ?");
      values.push(item.description);
    }

    if (item.price !== undefined) {
      updates.push("price = ?");
      values.push(item.price);
    }

    if (item.coin_value !== undefined) {
      updates.push("coin_value = ?");
      values.push(item.coin_value);
    }

    if (item.image_url !== undefined) {
      updates.push("image_url = ?");
      values.push(item.image_url);
    }

    if (item.ingredients !== undefined) {
      updates.push("ingredients = ?");
      values.push(JSON.stringify(item.ingredients));
    }

    if (item.category_id !== undefined) {
      updates.push("category_id = ?");
      values.push(item.category_id);
    }

    if (item.is_flash_sale !== undefined) {
      updates.push("is_flash_sale = ?");
      values.push(item.is_flash_sale ? 1 : 0);
    }

    if (item.discount_percentage !== undefined) {
      updates.push("discount_percentage = ?");
      values.push(item.discount_percentage);
    }

    if (updates.length === 0) {
      return;
    }

    values.push(id);

    await pool.query(
      `UPDATE menu_items SET ${updates.join(", ")} WHERE id = ?`,
      values,
    );
  } catch (error) {
    console.error("Error updating menu item:", error);
    throw error;
  }
};

export const deleteMenuItem = async (id: number): Promise<void> => {
  try {
    await pool.query("DELETE FROM menu_items WHERE id = ?", [id]);
  } catch (error) {
    console.error("Error deleting menu item:", error);
    throw error;
  }
};
