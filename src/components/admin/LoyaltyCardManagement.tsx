import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Plus,
  Edit,
  Trash,
  Check,
  X,
  Stamp,
  User,
  Phone,
  Calendar,
} from "lucide-react";

interface StampCard {
  id: string;
  name: string;
  cardNumber: string;
  totalStamps: number;
  collectedStamps?: number;
  owner: string;
  phone: string;
  active: boolean;
  expiryDate?: string;
  generatedStampCode?: string;
  rewardStages?: {
    stamps: number;
    reward: string;
  }[];
}

const LoyaltyCardManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState("cards");
  const [newCardDialog, setNewCardDialog] = useState(false);
  const [editCardDialog, setEditCardDialog] = useState<StampCard | null>(null);
  const [cardNumber, setCardNumber] = useState("");
  const [stampCode, setStampCode] = useState(
    "*" + Math.floor(10000 + Math.random() * 90000),
  );

  // Mock stamp cards data
  const [stampCards, setStampCards] = useState<StampCard[]>([
    {
      id: "1",
      name: "عشاق القهوة",
      cardNumber: "1234567",
      totalStamps: 8,
      collectedStamps: 5,
      owner: "محمد أحمد",
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
      name: "نادي السندويشات",
      cardNumber: "7654321",
      totalStamps: 6,
      collectedStamps: 2,
      owner: "فاطمة علي",
      phone: "+212 698765432",
      active: true,
      expiryDate: "2023-11-30",
      rewardStages: [
        { stamps: 2, reward: "إضافة مجانية" },
        { stamps: 4, reward: "مشروب مجاني" },
        { stamps: 6, reward: "سندويش مجاني" },
      ],
    },
    {
      id: "3",
      name: "بطاقة المشروبات الخاصة",
      cardNumber: "9876543",
      totalStamps: 10,
      collectedStamps: 0,
      owner: "أحمد محمود",
      phone: "+212 654321987",
      active: true,
      expiryDate: "2024-12-31",
      rewardStages: [
        { stamps: 3, reward: "خصم 15%" },
        { stamps: 6, reward: "مشروب صغير مجاني" },
        { stamps: 10, reward: "مشروب كبير مجاني مع حلوى" },
      ],
    },
  ]);

  // Form state for new card
  const [newCardName, setNewCardName] = useState("");
  const [newCardDescription, setNewCardDescription] = useState("");
  const [newCardStamps, setNewCardStamps] = useState("8");
  const [newCardRewards, setNewCardRewards] = useState([
    { stamps: 3, reward: "" },
    { stamps: 5, reward: "" },
    { stamps: 8, reward: "" },
  ]);

  const handleAddStamp = () => {
    // In a real app, this would validate the card number and add a stamp
    console.log(`Adding stamp to card ${cardNumber} with code ${stampCode}`);
    // Generate a new stamp code for next use
    setStampCode("*" + Math.floor(10000 + Math.random() * 90000));
    setCardNumber("");
  };

  const handleEditCard = (card: StampCard) => {
    setEditCardDialog(card);
  };

  const handleToggleCardStatus = (cardId: string, currentStatus: boolean) => {
    // In a real app, this would update the card status in the backend
    console.log(`Toggling card ${cardId} status to ${!currentStatus}`);
  };

  const handleCreateCard = () => {
    // In a real app, this would create a new card in the backend
    console.log("Creating new card:", {
      name: newCardName,
      totalStamps: parseInt(newCardStamps),
      rewardStages: newCardRewards,
    });
    setNewCardDialog(false);
    setNewCardName("");
    setNewCardStamps("8");
    setNewCardRewards([
      { stamps: 3, reward: "" },
      { stamps: 5, reward: "" },
      { stamps: 8, reward: "" },
    ]);
  };

  const handleUpdateReward = (index: number, value: string) => {
    const updatedRewards = [...newCardRewards];
    updatedRewards[index].reward = value;
    setNewCardRewards(updatedRewards);
  };

  const handleUpdateStampCount = (index: number, value: string) => {
    const stampCount = parseInt(value);
    if (isNaN(stampCount)) return;

    const updatedRewards = [...newCardRewards];
    updatedRewards[index].stamps = stampCount;
    setNewCardRewards(updatedRewards);
  };

  const handleAddRewardStage = () => {
    setNewCardRewards([...newCardRewards, { stamps: 0, reward: "" }]);
  };

  const handleSaveCardEdit = () => {
    // In a real app, this would update the card in the backend
    console.log("Saving card edits:", editCardDialog);
    setEditCardDialog(null);
  };

  const handleDuplicateCard = (cardId: string) => {
    // In a real app, this would duplicate the card with a new number
    const newCardNumber = Math.floor(
      1000000 + Math.random() * 9000000,
    ).toString();
    console.log(`Duplicating card ${cardId} with new number ${newCardNumber}`);
    alert(`تم تكرار البطاقة برقم جديد: ${newCardNumber}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg md:text-xl font-bold">إدارة بطاقات الولاء</h2>
        <Button className="gap-1" onClick={() => setNewCardDialog(true)}>
          <Plus className="h-4 w-4" />
          <span>إضافة بطاقة جديدة</span>
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
          <TabsTrigger value="cards">البطاقات النشطة</TabsTrigger>
          <TabsTrigger value="add-stamp">إضافة طابع</TabsTrigger>
          <TabsTrigger value="edit">تعديل البطاقات</TabsTrigger>
        </TabsList>

        {/* Active Cards Tab */}
        <TabsContent value="cards">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stampCards.map((card) => (
              <Card key={card.id} className="overflow-hidden">
                <CardHeader className="bg-blue-50 py-3">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{card.name}</CardTitle>
                    <Badge
                      variant="outline"
                      className="bg-blue-100 text-blue-800"
                    >
                      {card.cardNumber}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        عدد الطوابع:
                      </span>
                      <span className="font-medium">
                        {card.collectedStamps}/{card.totalStamps}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        المالك:
                      </span>
                      <span className="font-medium">{card.owner}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        رقم الهاتف:
                      </span>
                      <span className="font-medium">{card.phone}</span>
                    </div>
                    {card.expiryDate && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          تاريخ الانتهاء:
                        </span>
                        <span className="font-medium">{card.expiryDate}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        الحالة:
                      </span>
                      <Badge
                        className={card.active ? "bg-green-500" : "bg-red-500"}
                      >
                        {card.active ? "نشطة" : "غير نشطة"}
                      </Badge>
                    </div>
                  </div>

                  <div className="mt-4 mb-4 bg-white p-3 rounded-lg shadow-sm">
                    <h5 className="text-sm font-medium mb-3 text-primary flex items-center">
                      <Stamp className="h-4 w-4 text-primary ml-2" />
                      مراحل المكافآت:
                    </h5>
                    <div className="space-y-2">
                      {card.rewardStages?.map((stage, index) => (
                        <div
                          key={index}
                          className="flex justify-between text-sm items-center bg-gray-50 p-2 rounded-md"
                        >
                          <span className="font-medium">{stage.reward}</span>
                          <Badge
                            variant={
                              card.collectedStamps &&
                              card.collectedStamps >= stage.stamps
                                ? "default"
                                : "outline"
                            }
                            className={
                              card.collectedStamps &&
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

                  <div className="flex justify-end space-x-reverse space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1"
                      onClick={() => handleDuplicateCard(card.id)}
                    >
                      <Plus className="h-4 w-4" />
                      <span>تكرار</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1"
                      onClick={() => handleEditCard(card)}
                    >
                      <Edit className="h-4 w-4" />
                      <span>تعديل</span>
                    </Button>
                    {card.generatedStampCode ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 bg-green-100 text-green-700 hover:bg-green-200"
                        onClick={() => {
                          // Create WhatsApp message with stamp code
                          const message = `مرحباً،\n\nإليك رمز الطابع الخاص ببطاقة ${card.name}:\n\n${card.generatedStampCode}\n\nيمكنك استخدام هذا الرمز في تطبيق فليفر لويالتي لإضافة طابع إلى بطاقتك.\n\nشكراً لولائك!`;

                          // Open WhatsApp with the message
                          window.open(
                            `https://wa.me/${card.phone.replace(/\s+/g, "")}?text=${encodeURIComponent(message)}`,
                            "_blank",
                          );
                        }}
                      >
                        <Stamp className="h-4 w-4" />
                        <span>إرسال الطابع</span>
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1"
                        onClick={() => {
                          // Generate stamp code
                          const stampCode =
                            "*" + Math.floor(10000 + Math.random() * 90000);

                          // In a real app, this would save the stamp code to the database
                          console.log(
                            `Generated stamp code ${stampCode} for card ${card.id}`,
                          );

                          // Update the card with the generated stamp code
                          const updatedCard = {
                            ...card,
                            generatedStampCode: stampCode,
                          };
                          setStampCards(
                            stampCards.map((c) =>
                              c.id === card.id ? updatedCard : c,
                            ),
                          );
                        }}
                      >
                        <Stamp className="h-4 w-4" />
                        <span>إنشاء طابع</span>
                      </Button>
                    )}
                    {card.active ? (
                      <Button
                        variant="destructive"
                        size="sm"
                        className="gap-1"
                        onClick={() =>
                          handleToggleCardStatus(card.id, card.active)
                        }
                      >
                        <X className="h-4 w-4" />
                        <span>تعطيل</span>
                      </Button>
                    ) : (
                      <Button
                        variant="default"
                        size="sm"
                        className="gap-1 bg-green-600 hover:bg-green-700"
                        onClick={() =>
                          handleToggleCardStatus(card.id, card.active)
                        }
                      >
                        <Check className="h-4 w-4" />
                        <span>تفعيل</span>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Add Stamp Tab */}
        <TabsContent value="add-stamp">
          <Card>
            <CardHeader>
              <CardTitle>إضافة طابع يدوياً</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="card-number">رقم البطاقة</Label>
                  <Input
                    id="card-number"
                    placeholder="أدخل رقم البطاقة (7 أرقام)"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    maxLength={7}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stamp-code">رمز الطابع</Label>
                  <Input
                    id="stamp-code"
                    placeholder="أدخل رمز الطابع (*12345)"
                    disabled
                    value={stampCode}
                  />
                  <p className="text-xs text-muted-foreground">
                    تم توليد رمز الطابع تلقائياً
                  </p>
                </div>
              </div>
              <Button
                className="w-full md:w-auto"
                onClick={handleAddStamp}
                disabled={cardNumber.length !== 7}
              >
                إضافة طابع
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Edit Cards Tab */}
        <TabsContent value="edit">
          <Card>
            <CardHeader>
              <CardTitle>تعديل بطاقات الولاء</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-5 bg-muted/50 p-3 text-sm font-medium">
                  <div>اسم البطاقة</div>
                  <div>رقم البطاقة</div>
                  <div>عدد الطوابع</div>
                  <div>المالك</div>
                  <div>الإجراءات</div>
                </div>
                {stampCards.map((card) => (
                  <div
                    key={card.id}
                    className="grid grid-cols-5 p-3 text-sm border-t hover:bg-muted/50 transition-colors"
                  >
                    <div>{card.name}</div>
                    <div>{card.cardNumber}</div>
                    <div>{card.totalStamps}</div>
                    <div>{card.owner}</div>
                    <div className="flex space-x-reverse space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleEditCard(card)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* New Card Dialog */}
      <Dialog open={newCardDialog} onOpenChange={setNewCardDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>إضافة بطاقة ولاء جديدة</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="card-name">اسم البطاقة</Label>
              <Input
                id="card-name"
                placeholder="أدخل اسم البطاقة"
                value={newCardName}
                onChange={(e) => setNewCardName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="card-description">وصف البطاقة</Label>
              <Input
                id="card-description"
                placeholder="أدخل وصفاً قصيراً للبطاقة"
                value={newCardDescription || ""}
                onChange={(e) => setNewCardDescription(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="total-stamps">عدد الطوابع المطلوبة</Label>
              <Input
                id="total-stamps"
                type="number"
                placeholder="أدخل عدد الطوابع"
                value={newCardStamps}
                onChange={(e) => setNewCardStamps(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>مراحل المكافآت</Label>
              <div className="space-y-2">
                {newCardRewards.map((reward, index) => (
                  <div key={index} className="flex space-x-reverse space-x-2">
                    <Input
                      placeholder="عدد الطوابع"
                      className="w-1/3"
                      type="number"
                      value={reward.stamps}
                      onChange={(e) =>
                        handleUpdateStampCount(index, e.target.value)
                      }
                    />
                    <Input
                      placeholder="المكافأة"
                      className="w-2/3"
                      value={reward.reward}
                      onChange={(e) =>
                        handleUpdateReward(index, e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="mt-2 gap-1"
                onClick={handleAddRewardStage}
              >
                <Plus className="h-4 w-4" />
                <span>إضافة مرحلة</span>
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewCardDialog(false)}>
              إلغاء
            </Button>
            <Button onClick={handleCreateCard}>إنشاء بطاقة</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Card Dialog */}
      <Dialog
        open={!!editCardDialog}
        onOpenChange={() => setEditCardDialog(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>تعديل بطاقة الولاء</DialogTitle>
          </DialogHeader>
          {editCardDialog && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-card-name">اسم البطاقة</Label>
                <Input
                  id="edit-card-name"
                  value={editCardDialog.name}
                  onChange={(e) =>
                    setEditCardDialog({
                      ...editCardDialog,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-total-stamps">عدد الطوابع المطلوبة</Label>
                <Input
                  id="edit-total-stamps"
                  type="number"
                  value={editCardDialog.totalStamps}
                  onChange={(e) =>
                    setEditCardDialog({
                      ...editCardDialog,
                      totalStamps: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-expiry-date">تاريخ الانتهاء</Label>
                <Input
                  id="edit-expiry-date"
                  type="date"
                  value={editCardDialog.expiryDate}
                  onChange={(e) =>
                    setEditCardDialog({
                      ...editCardDialog,
                      expiryDate: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>مراحل المكافآت</Label>
                <div className="space-y-2">
                  {editCardDialog.rewardStages?.map((stage, index) => (
                    <div key={index} className="flex space-x-reverse space-x-2">
                      <Input
                        placeholder="عدد الطوابع"
                        className="w-1/3"
                        type="number"
                        value={stage.stamps}
                        onChange={(e) => {
                          const newStages = [
                            ...(editCardDialog.rewardStages || []),
                          ];
                          newStages[index].stamps = parseInt(e.target.value);
                          setEditCardDialog({
                            ...editCardDialog,
                            rewardStages: newStages,
                          });
                        }}
                      />
                      <Input
                        placeholder="المكافأة"
                        className="w-2/3"
                        value={stage.reward}
                        onChange={(e) => {
                          const newStages = [
                            ...(editCardDialog.rewardStages || []),
                          ];
                          newStages[index].reward = e.target.value;
                          setEditCardDialog({
                            ...editCardDialog,
                            rewardStages: newStages,
                          });
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditCardDialog(null)}>
              إلغاء
            </Button>
            <Button onClick={handleSaveCardEdit}>حفظ التغييرات</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoyaltyCardManagement;
