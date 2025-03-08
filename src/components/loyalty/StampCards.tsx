import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Stamp, Gift, Plus, Calendar, HelpCircle } from "lucide-react";
import { t } from "@/i18n";

interface StampCard {
  id: string;
  cardNumber: string;
  name: string;
  totalStamps: number;
  collectedStamps: number;
  expiryDate: string;
  reward: string;
  rewardStages?: {
    stamps: number;
    reward: string;
  }[];
}

interface StampCardsProps {
  userStampCards?: StampCard[];
  onAddStamp?: (cardId: string, code: string) => void;
  onActivateCard?: (cardNumber: string) => void;
}

const StampCards = ({
  userStampCards,
  onAddStamp,
  onActivateCard,
}: StampCardsProps) => {
  const [stampCards, setStampCards] = useState<StampCard[]>(
    userStampCards || [
      {
        id: "1",
        cardNumber: "1234567",
        name: "عشاق القهوة",
        totalStamps: 8,
        collectedStamps: 5,
        expiryDate: "2023-12-31",
        reward: "قهوة مجانية",
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
        expiryDate: "2023-11-30",
        reward: "سندويش مجاني",
        rewardStages: [
          { stamps: 2, reward: "إضافة مجانية" },
          { stamps: 4, reward: "مشروب مجاني" },
          { stamps: 6, reward: "سندويش مجاني" },
        ],
      },
    ],
  );

  const [stampCode, setStampCode] = useState("");
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [helpDialogOpen, setHelpDialogOpen] = useState(false);
  const [newCardDialogOpen, setNewCardDialogOpen] = useState(false);
  const [newCardNumber, setNewCardNumber] = useState("");
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [newCardInfo, setNewCardInfo] = useState<StampCard | null>(null);

  const handleAddStamp = () => {
    if (stampCode.trim() === "" || !activeCardId) return;

    if (onAddStamp) {
      // Use the provided callback if available
      onAddStamp(activeCardId, stampCode);
    } else {
      // Fallback to local state management
      const updatedCards = stampCards.map((card) => {
        if (
          card.id === activeCardId &&
          card.collectedStamps < card.totalStamps
        ) {
          return {
            ...card,
            collectedStamps: card.collectedStamps + 1,
          };
        }
        return card;
      });

      setStampCards(updatedCards);
    }

    setStampCode("");
    setActiveCardId(null);
  };

  // Sync userStampCards prop with state
  useEffect(() => {
    if (userStampCards) {
      setStampCards(userStampCards);
    }
  }, [userStampCards]);

  const handleActivateNewCard = () => {
    if (newCardNumber.trim().length !== 7) return;

    if (onActivateCard) {
      // Use the provided callback if available
      onActivateCard(newCardNumber);
      setNewCardNumber("");
      setNewCardDialogOpen(false);
    } else {
      // Fallback to local state management
      // For demo purposes, we'll create a new card with random data
      const newCard: StampCard = {
        id: Date.now().toString(),
        cardNumber: newCardNumber,
        name: "بطاقة المشروبات الخاصة",
        totalStamps: 10,
        collectedStamps: 0,
        expiryDate: "2024-12-31",
        reward: "مشروب مجاني",
        rewardStages: [
          { stamps: 3, reward: "خصم 15%" },
          { stamps: 6, reward: "مشروب صغير مجاني" },
          { stamps: 10, reward: "مشروب كبير مجاني مع حلوى" },
        ],
      };

      setStampCards([...stampCards, newCard]);
      setNewCardInfo(newCard);
      setNewCardNumber("");
      setNewCardDialogOpen(false);
      setSuccessDialogOpen(true);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">{t("yourStampCards")}</h3>
        <div className="flex gap-2">
          <Dialog open={newCardDialogOpen} onOpenChange={setNewCardDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus size={16} />
                <span>تنشيط بطاقة جديدة</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>تنشيط بطاقة طوابع جديدة</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <p className="text-sm text-muted-foreground">
                  أدخل رقم البطاقة المكون من 7 أرقام لتنشيط بطاقة طوابع جديدة
                </p>
                <Input
                  placeholder="أدخل رقم البطاقة"
                  value={newCardNumber}
                  onChange={(e) => setNewCardNumber(e.target.value)}
                  maxLength={7}
                />
                <Button onClick={handleActivateNewCard} className="w-full">
                  تنشيط البطاقة
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={helpDialogOpen} onOpenChange={setHelpDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <HelpCircle size={16} />
                <span>كيفية الاستخدام</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>كيفية استخدام بطاقات الطوابع</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <p className="text-sm">
                  يمكنك استخدام المكافآت عند تقديم الطلب. عندما تصل إلى عدد
                  الطوابع المطلوب لمكافأة معينة، يمكنك استخدامها في المرة
                  القادمة التي تطلب فيها.
                </p>
                <p className="text-sm">
                  لاستخدام المكافأة، اضغط على زر "استبدال" عند تقديم طلبك التالي
                  واختر المكافأة من قائمة الهدايا المتاحة.
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {stampCards.length === 0 ? (
        <div className="text-center py-8 border rounded-lg bg-gray-50">
          <Stamp className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
          <h3 className="text-lg font-medium">{t("noStampCards")}</h3>
          <p className="text-sm text-muted-foreground mt-1 mb-4">
            {t("noActiveStampCards")}
          </p>
          <Button variant="outline">{t("browseMenuForStamps")}</Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {stampCards.map((card) => (
            <div
              key={card.id}
              className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-white to-blue-50"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold text-lg text-primary">
                    {card.name}
                  </h4>
                  <div className="text-xs text-muted-foreground mt-1 flex items-center">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
                      رقم البطاقة: {card.cardNumber}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mt-2">
                    <Calendar className="ml-1 h-3 w-3" />
                    <span>
                      {t("expires")} {card.expiryDate}
                    </span>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="bg-primary/10 text-primary border-primary/20 text-lg font-bold"
                >
                  {card.collectedStamps}/{card.totalStamps}
                </Badge>
              </div>

              <Progress
                value={(card.collectedStamps / card.totalStamps) * 100}
                className="h-3 mt-2 rounded-full bg-blue-100"
              />

              <div className="mt-4 mb-4 bg-white p-3 rounded-lg shadow-sm">
                <h5 className="text-sm font-medium mb-3 text-primary flex items-center">
                  <Gift className="h-4 w-4 text-primary ml-2" />
                  مراحل المكافآت:
                </h5>
                <div className="space-y-2">
                  {card.rewardStages?.map((stage, index) => (
                    <div
                      key={index}
                      className="flex justify-between text-sm items-center bg-gray-50 p-2 rounded-md"
                    >
                      <div className="flex items-center">
                        <Gift className="h-3 w-3 text-primary ml-1" />
                        <span className="font-medium">{stage.reward}</span>
                      </div>
                      <Badge
                        variant={
                          card.collectedStamps >= stage.stamps
                            ? "default"
                            : "outline"
                        }
                        className={
                          card.collectedStamps >= stage.stamps
                            ? "bg-green-500"
                            : ""
                        }
                      >
                        {stage.stamps} طوابع
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <Dialog
                  open={activeCardId === card.id}
                  onOpenChange={(open) => !open && setActiveCardId(null)}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => setActiveCardId(card.id)}
                    >
                      <Plus size={14} />
                      <span>{t("addStamp")}</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{t("addStampTitle")}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <p className="text-sm text-muted-foreground">
                        {t("addStampDesc")}
                      </p>
                      <Input
                        placeholder={t("enterStampCode")}
                        value={stampCode}
                        onChange={(e) => setStampCode(e.target.value)}
                      />
                      <Button
                        onClick={() => handleAddStamp()}
                        className="w-full"
                      >
                        {t("verifyAndAddStamp")}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button
                  variant="outline"
                  size="sm"
                  disabled={card.collectedStamps < card.totalStamps}
                  className={
                    card.collectedStamps === card.totalStamps
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : ""
                  }
                >
                  {card.collectedStamps === card.totalStamps
                    ? t("redeem")
                    : t("collectMore")}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Success Dialog for New Card */}
      <Dialog open={successDialogOpen} onOpenChange={setSuccessDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              تم تنشيط البطاقة بنجاح!
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center py-6 space-y-4 text-center">
            <div className="bg-green-100 p-4 rounded-full">
              <Gift className="h-12 w-12 text-green-600" />
            </div>
            {newCardInfo && (
              <div className="space-y-2">
                <h3 className="font-bold text-lg">{newCardInfo.name}</h3>
                <p className="text-sm">رقم البطاقة: {newCardInfo.cardNumber}</p>
                <div className="mt-4 space-y-2">
                  <p className="font-medium">المكافآت المتاحة:</p>
                  <ul className="text-sm space-y-1">
                    {newCardInfo.rewardStages?.map((stage, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-center gap-1"
                      >
                        <Badge variant="outline" className="bg-blue-50">
                          {stage.stamps} طوابع
                        </Badge>
                        <span>{stage.reward}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            <Button
              onClick={() => setSuccessDialogOpen(false)}
              className="mt-4"
            >
              حسناً
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StampCards;
