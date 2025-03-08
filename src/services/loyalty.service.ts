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

export interface StampCard {
  id?: string;
  name: string;
  cardNumber: string;
  totalStamps: number;
  collectedStamps: number;
  owner: string;
  userId: string;
  phone: string;
  active: boolean;
  expiryDate: string;
  rewardStages: {
    stamps: number;
    reward: string;
  }[];
}

export interface Gift {
  id?: string;
  name: string;
  description: string;
  code: string;
  expiryDate: string;
  imageUrl: string;
  type: string;
  active: boolean;
}

// Mock data for demo mode
const mockStampCards: StampCard[] = [
  {
    id: "1",
    cardNumber: "1234567",
    name: "عشاق القهوة",
    totalStamps: 8,
    collectedStamps: 5,
    owner: "محمد أحمد",
    userId: "user123",
    phone: "+212 612345678",
    active: true,
    expiryDate: "2023-12-31",
    rewardStages: [
      { stamps: 3, reward: "خصم 10%" },
      { stamps: 5, reward: "مشروب صغير مجاني" },
      { stamps: 8, reward: "قهوة مجانية مع كعكة" },
    ],
  },
  {
    id: "2",
    cardNumber: "7654321",
    name: "نادي السندويشات",
    totalStamps: 6,
    collectedStamps: 2,
    owner: "محمد أحمد",
    userId: "user123",
    phone: "+212 612345678",
    active: true,
    expiryDate: "2023-11-30",
    rewardStages: [
      { stamps: 2, reward: "إضافة مجانية" },
      { stamps: 4, reward: "مشروب مجاني" },
      { stamps: 6, reward: "سندويش مجاني" },
    ],
  },
];

const mockGifts: Gift[] = [
  {
    id: "1",
    name: "حلوى مجانية",
    description: "احصل على حلوى مجانية مع أي طبق رئيسي",
    code: "12345",
    expiryDate: "2023-12-15",
    imageUrl:
      "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=300&q=80",
    type: "free-dessert",
    active: true,
  },
  {
    id: "2",
    name: "خصم 10%",
    description: "خصم 10% على طلبك التالي",
    code: "67890",
    expiryDate: "2023-11-30",
    imageUrl:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=300&q=80",
    type: "discount",
    active: true,
  },
];

// Firebase methods for stamp cards
export const getStampCards = async (userId: string): Promise<StampCard[]> => {
  // Check if in demo mode
  if (
    typeof window !== "undefined" &&
    localStorage.getItem("demoMode") === "true"
  ) {
    return Promise.resolve(mockStampCards);
  }

  // Real implementation for production mode
  try {
    const cardsCollection = collection(db, "stampCards");
    const q = query(cardsCollection, where("userId", "==", userId));
    const cardsSnapshot = await getDocs(q);

    // If no data exists in Firestore, initialize with mock data
    if (cardsSnapshot.empty) {
      console.log("Initializing stamp cards in Firestore");
      for (const card of mockStampCards) {
        const { id, ...cardData } = card;
        // Set the correct userId for the current user
        await addDoc(collection(db, "stampCards"), {
          ...cardData,
          userId: userId,
        });
      }

      // Fetch again after initialization
      const newSnapshot = await getDocs(q);
      return newSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as StampCard[];
    }

    return cardsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as StampCard[];
  } catch (error) {
    console.error("Error getting stamp cards:", error);
    throw error;
  }
};

export const getStampCard = async (id: string): Promise<StampCard | null> => {
  try {
    const cardDoc = await getDoc(doc(db, "stampCards", id));
    if (cardDoc.exists()) {
      return { id: cardDoc.id, ...cardDoc.data() } as StampCard;
    }
    return null;
  } catch (error) {
    console.error("Error getting stamp card:", error);
    throw error;
  }
};

export const addStampCard = async (card: StampCard): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, "stampCards"), card);
    return docRef.id;
  } catch (error) {
    console.error("Error adding stamp card:", error);
    throw error;
  }
};

export const updateStampCard = async (
  id: string,
  card: Partial<StampCard>,
): Promise<void> => {
  try {
    await updateDoc(doc(db, "stampCards", id), card);
  } catch (error) {
    console.error("Error updating stamp card:", error);
    throw error;
  }
};

export const addStampToCard = async (id: string): Promise<void> => {
  try {
    const cardDoc = await getDoc(doc(db, "stampCards", id));
    if (cardDoc.exists()) {
      const cardData = cardDoc.data() as StampCard;
      await updateDoc(doc(db, "stampCards", id), {
        collectedStamps: cardData.collectedStamps + 1,
      });
    }
  } catch (error) {
    console.error("Error adding stamp to card:", error);
    throw error;
  }
};

// Firebase methods for gifts
export const getGifts = async (): Promise<Gift[]> => {
  // Check if in demo mode
  if (
    typeof window !== "undefined" &&
    localStorage.getItem("demoMode") === "true"
  ) {
    return Promise.resolve(mockGifts);
  }

  // Real implementation for production mode
  try {
    const giftsCollection = collection(db, "gifts");
    const giftsSnapshot = await getDocs(giftsCollection);
    return giftsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Gift[];
  } catch (error) {
    console.error("Error getting gifts:", error);
    throw error;
  }
};

export const getActiveGifts = async (): Promise<Gift[]> => {
  try {
    const giftsCollection = collection(db, "gifts");
    const q = query(giftsCollection, where("active", "==", true));
    const giftsSnapshot = await getDocs(q);
    return giftsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Gift[];
  } catch (error) {
    console.error("Error getting active gifts:", error);
    throw error;
  }
};

// MySQL methods
export const getStampCardsFromMySQL = async (
  userId: string,
): Promise<StampCard[]> => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM stamp_cards WHERE user_id = ?",
      [userId],
    );
    return (rows as any[]).map((row) => ({
      id: row.id.toString(),
      name: row.name,
      cardNumber: row.card_number,
      totalStamps: row.total_stamps,
      collectedStamps: row.collected_stamps,
      owner: row.owner,
      userId: row.user_id,
      phone: row.phone,
      active: row.active === 1,
      expiryDate: row.expiry_date,
      rewardStages: JSON.parse(row.reward_stages),
    }));
  } catch (error) {
    console.error("Error getting stamp cards from MySQL:", error);
    throw error;
  }
};

export const addStampToCardInMySQL = async (id: string): Promise<void> => {
  try {
    await pool.query(
      "UPDATE stamp_cards SET collected_stamps = collected_stamps + 1 WHERE id = ?",
      [id],
    );
  } catch (error) {
    console.error("Error adding stamp to card in MySQL:", error);
    throw error;
  }
};
