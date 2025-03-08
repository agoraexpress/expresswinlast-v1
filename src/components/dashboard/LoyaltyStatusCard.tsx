import React from "react";
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
  userName = "محمد أحمد",
  coinsBalance = 750,
  loyaltyTier = { name: "ذهبي", color: "bg-yellow-500" },
  activeStampCards = [
    {
      id: "1",
      name: "عشاق القهوة",
      totalStamps: 8,
      collectedStamps: 5,
      expiryDate: "2023-12-31",
    },
    {
      id: "2",
      name: "نادي السندويشات",
      totalStamps: 6,
      collectedStamps: 2,
      expiryDate: "2023-11-30",
    },
  ],
}: LoyaltyStatusCardProps) => {
  return (
    <Card className="w-full bg-white shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold">
            حالة الولاء الخاصة بك
          </CardTitle>
          <Badge className={`${loyaltyTier.color} text-white px-3 py-1`}>
            عضو {loyaltyTier.name}
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
              <p className="text-2xl font-bold">{coinsBalance}</p>
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
              <p className="text-2xl font-bold">{activeStampCards.length}</p>
              <div className="flex space-x-reverse space-x-1 mt-1">
                {activeStampCards.map((card) => (
                  <div
                    key={card.id}
                    className="text-xs bg-white px-2 py-1 rounded border"
                  >
                    {card.collectedStamps}/{card.totalStamps} {card.name}
                  </div>
                ))}
              </div>
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
