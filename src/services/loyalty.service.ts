import pool from "@/lib/mysql";

export interface StampCard {
  id: number;
  name: string;
  card_number: string;
  total_stamps: number;
  collected_stamps: number;
  owner: string;
  user_id: number;
  phone: string;
  active: boolean;
  expiry_date: string;
  reward_stages: {
    stamps: number;
    reward: string;
  }[];
}

export interface Gift {
  id: number;
  name: string;
  description: string;
  code: string;
  expiry_date: string;
  image_url: string;
  type: string;
  active: boolean;
}

export interface UserGift {
  id: number;
  user_id: number;
  gift_id: number;
  used: boolean;
  created_at: Date;
  name?: string;
  description?: string;
  image_url?: string;
  type?: string;
}

export const getStampCards = async (userId: number): Promise<StampCard[]> => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM stamp_cards WHERE user_id = ?",
      [userId],
    );

    return (rows as any[]).map((card) => ({
      ...card,
      active: card.active === 1,
      reward_stages: JSON.parse(card.reward_stages),
    }));
  } catch (error) {
    console.error("Error getting stamp cards:", error);
    throw error;
  }
};

export const getStampCard = async (id: number): Promise<StampCard | null> => {
  try {
    const [rows] = await pool.query("SELECT * FROM stamp_cards WHERE id = ?", [
      id,
    ]);

    const cards = rows as any[];
    if (cards.length === 0) {
      return null;
    }

    const card = cards[0];
    return {
      ...card,
      active: card.active === 1,
      reward_stages: JSON.parse(card.reward_stages),
    };
  } catch (error) {
    console.error("Error getting stamp card:", error);
    throw error;
  }
};

export const addStampToCard = async (id: number): Promise<void> => {
  try {
    await pool.query(
      "UPDATE stamp_cards SET collected_stamps = collected_stamps + 1 WHERE id = ?",
      [id],
    );
  } catch (error) {
    console.error("Error adding stamp to card:", error);
    throw error;
  }
};

export const createStampCard = async (
  card: Omit<StampCard, "id">,
): Promise<number> => {
  try {
    const [result] = await pool.query(
      `INSERT INTO stamp_cards 
       (name, card_number, total_stamps, collected_stamps, owner, user_id, phone, active, expiry_date, reward_stages) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        card.name,
        card.card_number,
        card.total_stamps,
        card.collected_stamps,
        card.owner,
        card.user_id,
        card.phone,
        card.active ? 1 : 0,
        card.expiry_date,
        JSON.stringify(card.reward_stages),
      ],
    );

    return (result as any).insertId;
  } catch (error) {
    console.error("Error creating stamp card:", error);
    throw error;
  }
};

export const updateStampCard = async (
  id: number,
  card: Partial<StampCard>,
): Promise<void> => {
  try {
    const updates: string[] = [];
    const values: any[] = [];

    if (card.name !== undefined) {
      updates.push("name = ?");
      values.push(card.name);
    }

    if (card.total_stamps !== undefined) {
      updates.push("total_stamps = ?");
      values.push(card.total_stamps);
    }

    if (card.collected_stamps !== undefined) {
      updates.push("collected_stamps = ?");
      values.push(card.collected_stamps);
    }

    if (card.active !== undefined) {
      updates.push("active = ?");
      values.push(card.active ? 1 : 0);
    }

    if (card.expiry_date !== undefined) {
      updates.push("expiry_date = ?");
      values.push(card.expiry_date);
    }

    if (card.reward_stages !== undefined) {
      updates.push("reward_stages = ?");
      values.push(JSON.stringify(card.reward_stages));
    }

    if (updates.length === 0) {
      return;
    }

    values.push(id);

    await pool.query(
      `UPDATE stamp_cards SET ${updates.join(", ")} WHERE id = ?`,
      values,
    );
  } catch (error) {
    console.error("Error updating stamp card:", error);
    throw error;
  }
};

export const getGifts = async (): Promise<Gift[]> => {
  try {
    const [rows] = await pool.query("SELECT * FROM gifts");

    return (rows as any[]).map((gift) => ({
      ...gift,
      active: gift.active === 1,
    }));
  } catch (error) {
    console.error("Error getting gifts:", error);
    throw error;
  }
};

export const getActiveGifts = async (): Promise<Gift[]> => {
  try {
    const [rows] = await pool.query("SELECT * FROM gifts WHERE active = 1");

    return rows as Gift[];
  } catch (error) {
    console.error("Error getting active gifts:", error);
    throw error;
  }
};

export const getUserGifts = async (userId: number): Promise<UserGift[]> => {
  try {
    const [rows] = await pool.query(
      `SELECT ug.*, g.name, g.description, g.image_url, g.type 
       FROM user_gifts ug 
       JOIN gifts g ON ug.gift_id = g.id 
       WHERE ug.user_id = ?`,
      [userId],
    );

    return (rows as any[]).map((gift) => ({
      ...gift,
      used: gift.used === 1,
    }));
  } catch (error) {
    console.error("Error getting user gifts:", error);
    throw error;
  }
};

export const assignGiftToUser = async (
  userId: number,
  giftId: number,
): Promise<number> => {
  try {
    const [result] = await pool.query(
      "INSERT INTO user_gifts (user_id, gift_id, used) VALUES (?, ?, 0)",
      [userId, giftId],
    );

    return (result as any).insertId;
  } catch (error) {
    console.error("Error assigning gift to user:", error);
    throw error;
  }
};

export const useGift = async (userGiftId: number): Promise<void> => {
  try {
    await pool.query("UPDATE user_gifts SET used = 1 WHERE id = ?", [
      userGiftId,
    ]);
  } catch (error) {
    console.error("Error using gift:", error);
    throw error;
  }
};

export const createGift = async (gift: Omit<Gift, "id">): Promise<number> => {
  try {
    const [result] = await pool.query(
      `INSERT INTO gifts 
       (name, description, code, expiry_date, image_url, type, active) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        gift.name,
        gift.description,
        gift.code,
        gift.expiry_date,
        gift.image_url,
        gift.type,
        gift.active ? 1 : 0,
      ],
    );

    return (result as any).insertId;
  } catch (error) {
    console.error("Error creating gift:", error);
    throw error;
  }
};

export const updateGift = async (
  id: number,
  gift: Partial<Gift>,
): Promise<void> => {
  try {
    const updates: string[] = [];
    const values: any[] = [];

    if (gift.name !== undefined) {
      updates.push("name = ?");
      values.push(gift.name);
    }

    if (gift.description !== undefined) {
      updates.push("description = ?");
      values.push(gift.description);
    }

    if (gift.code !== undefined) {
      updates.push("code = ?");
      values.push(gift.code);
    }

    if (gift.expiry_date !== undefined) {
      updates.push("expiry_date = ?");
      values.push(gift.expiry_date);
    }

    if (gift.image_url !== undefined) {
      updates.push("image_url = ?");
      values.push(gift.image_url);
    }

    if (gift.type !== undefined) {
      updates.push("type = ?");
      values.push(gift.type);
    }

    if (gift.active !== undefined) {
      updates.push("active = ?");
      values.push(gift.active ? 1 : 0);
    }

    if (updates.length === 0) {
      return;
    }

    values.push(id);

    await pool.query(
      `UPDATE gifts SET ${updates.join(", ")} WHERE id = ?`,
      values,
    );
  } catch (error) {
    console.error("Error updating gift:", error);
    throw error;
  }
};
