import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Coins, Gift, Truck } from "lucide-react";
import { t } from "@/i18n";

interface LoyaltyTier {
  name: string;
  color: string;
}

interface StampCard {
  id: string;
  name: string;
  totalStamps: number;
  collectedStamps: number;
  expiryDate: string;
}

interface LoyaltyStatusCardProps {
  userName?: string;
  coinsBalance?: number;
  loyaltyTier?: LoyaltyTier;
  activeStampCards?: StampCard[];
}

const LoyaltyStatusCard = ({
  userName = "",
  coinsBalance = 0,
  loyaltyTier = { name: "عادي", color: "bg-blue-500" },
  activeStampCards = [],
}: LoyaltyStatusCardProps) => {
  const [userData, setUserData] = useState({
    name: userName,
    coins: coinsBalance,
    tier: loyaltyTier,
    cards: activeStampCards
  });
  
  // جلب بيانات المستخدم من قاعدة البيانات
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) return;
        
        // استدعاء خدمة الحصول على بيانات المستخدم
        const { getUserById } = await import('@/services/mysql/user.service');
        const { getStampCards } = await import('@/services/mysql/loyalty.service');
        
        const user = await getUserById(parseInt(userId));
        if (user) {
          // تحديد مستوى الولاء بناءً على عدد العملات
          let tier = { name: "عادي", color: "bg-blue-500" };
          if (user.coins >= 1000) {
            tier = { name: "ذهبي", color: "bg-yellow-500" };
          } else if (user.coins >= 500) {
            tier = { name: "فضي", color: "bg-gray-400" };
          } else if (user.coins >= 200) {
            tier = { name: "برونزي", color: "bg-amber-600" };
          }
          
          // جلب بطاقات الطوابع النشطة
          const stampCards = await getStampCards(user.id);
          const activeCards = stampCards
            .filter(card => card.active)
            .map(card => ({
              id: card.id.toString(),
              name: card.name,
              totalStamps: card.total_stamps,
              collectedStamps: card.collected_stamps,
              expiryDate: card.expiry_date
            }));
          
          setUserData({
            name: user.name,
            coins: user.coins,
            tier,
            cards: activeCards
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    
    fetchUserData();
  }, []);
  return (
    <Card className="w-full bg-white shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold">
            حالة الولاء الخاصة بك
          </CardTitle>
          <Badge className={`${userData.tier.color} text-white px-3 py-1`}>
            عضو {userData.tier.name}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Coins Balance */}
          <div className="flex items-center space-x-reverse space-x-4 bg-slate-50 p-4 rounded-lg">
            <div className="bg-blue-100 p-3 rounded-full">
              <Coins className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">العملات المتاحة</p>
              <p className="text-2xl font-bold">{userData.coins}</p>
              <p className="text-xs text-slate-400">
                استخدمها للحصول على خصومات على الطلبات
              </p>
            </div>
          </div>

          {/* Active Stamp Cards */}
          <div className="flex items-center space-x-reverse space-x-4 bg-slate-50 p-4 rounded-lg">
            <div className="bg-green-100 p-3 rounded-full">
              <Gift className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">بطاقات الطوابع النشطة</p>
              <p className="text-2xl font-
            </div>
          </div>

          {/* Delivery Time */}
          <div className="flex items-center space-x-reverse space-x-4 bg-slate-50 p-4 rounded-lg">
            <div className="w-[55px] h-[67px]"></div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Truck className="h-8 w-8 text-purple-600 shadow-none" />
            </div>
            <div className="w-full">
              <p className="text-sm text-slate-500">وقت التوصيل</p>
              <div className="flex justify-between items-center">
                <p className="text-lg font-bold">نحن على بعد 15 دقيقة منك!</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoyaltyStatusCard;
