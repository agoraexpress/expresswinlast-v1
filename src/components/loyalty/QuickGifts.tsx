import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Gift, Plus, Calendar, HelpCircle, AlertCircle } from "lucide-react";
import { t } from "@/i18n";
import { Badge } from "@/components/ui/badge";

interface QuickGift {
  id: string;
  giftNumber: string;
  name: string;
  description: string;
  expiryDate: string;
  isActive: boolean;
  imageUrl: string;
}

const QuickGifts = () => {
  const [gifts, setGifts] = useState<QuickGift[]>([
    {
      id: "1",
      giftNumber: "12345",
      name: "حلوى مجانية",
      description: "احصل على حلوى مجانية مع أي طبق رئيسي",
      expiryDate: "2023-12-15",
      isActive: true,
      imageUrl:
        "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=300&q=80",
    },
    {
      id: "2",
      giftNumber: "67890",
      name: "خصم 10%",
      description: "خصم 10% على طلبك التالي",
      expiryDate: "2023-11-30",
      isActive: true,
      imageUrl:
        "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=300&q=80",
    },
  ]);

  const [giftCode, setGiftCode] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [helpDialogOpen, setHelpDialogOpen] = useState(false);
  const [useGiftDialogOpen, setUseGiftDialogOpen] = useState(false);
  const [selectedGiftId, setSelectedGiftId] = useState<string | null>(null);

  const handleActivateGift = () => {
    if (giftCode.trim() === "") return;

    // In a real app, this would validate the code against the backend
    setGiftCode("");
    setDialogOpen(false);
  };

  const handleUseGift = (id: string) => {
    setSelectedGiftId(id);
    setUseGiftDialogOpen(true);
  };

  const confirmUseGift = () => {
    if (!selectedGiftId) return;

    const updatedGifts = gifts.map((gift) =>
      gift.id === selectedGiftId ? { ...gift, isActive: false } : gift,
    );
    setGifts(updatedGifts);
    setUseGiftDialogOpen(false);
    setSelectedGiftId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">{t("yourQuickGifts")}</h3>
        <div className="flex gap-2">
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
                <DialogTitle>كيفية استخدام الهدايا السريعة</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <p className="text-sm">
                  يمكنك استخدام هذه الهدية عند تقديم الطلب. عند الوصول إلى صفحة
                  السلة، اختر "استخدام هدية سريعة" وحدد الهدية التي ترغب في
                  استخدامها.
                </p>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus size={16} />
                <span>{t("activateGift")}</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t("activateGiftTitle")}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <p className="text-sm text-muted-foreground">
                  {t("activateGiftDesc")}
                </p>
                <Input
                  placeholder={t("enterGiftCode")}
                  value={giftCode}
                  onChange={(e) => setGiftCode(e.target.value)}
                />
                <Button onClick={handleActivateGift} className="w-full">
                  {t("verifyAndActivate")}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {gifts.length === 0 ? (
        <div className="text-center py-8 border rounded-lg bg-gray-50">
          <Gift className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
          <h3 className="text-lg font-medium">{t("noQuickGifts")}</h3>
          <p className="text-sm text-muted-foreground mt-1 mb-4">
            {t("noActiveGifts")}
          </p>
          <Button variant="outline">{t("browseMenuForGifts")}</Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {gifts
            .filter((gift) => gift.isActive)
            .map((gift) => (
              <div
                key={gift.id}
                className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-40 w-full relative overflow-hidden rounded-t-lg">
                  <img
                    src={gift.imageUrl}
                    alt={gift.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-primary/90 text-white shadow-sm">
                      رقم الهدية: {gift.giftNumber}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-lg">{gift.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {gift.description}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground mt-2">
                    <Calendar className="ml-1 h-3 w-3" />
                    <span>
                      {t("expires")} {gift.expiryDate}
                    </span>
                  </div>
                  <div className="mt-4">
                    <Button
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                      onClick={() => handleUseGift(gift.id)}
                    >
                      {t("useGift")}
                    </Button>
                  </div>
                </div>
              </div>
            ))}

          {gifts.some((gift) => !gift.isActive) && (
            <div className="col-span-full mt-6">
              <h4 className="font-medium text-lg mb-3">{t("usedGifts")}</h4>
              <div className="grid gap-4 md:grid-cols-2">
                {gifts
                  .filter((gift) => !gift.isActive)
                  .map((gift) => (
                    <div
                      key={gift.id}
                      className="border rounded-lg overflow-hidden bg-gray-100 opacity-70"
                    >
                      <div className="h-40 w-full relative">
                        <img
                          src={gift.imageUrl}
                          alt={gift.name}
                          className="w-full h-full object-cover grayscale"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <span className="text-white font-bold text-lg">
                            {t("used")}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-lg">{gift.name}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {gift.description}
                        </p>
                        <div className="text-sm text-muted-foreground mt-1">
                          رقم الهدية: {gift.giftNumber}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Use Gift Dialog */}
      <Dialog open={useGiftDialogOpen} onOpenChange={setUseGiftDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>استخدام الهدية</DialogTitle>
          </DialogHeader>
          <div className="py-4 flex flex-col items-center text-center space-y-4">
            <div className="bg-amber-100 p-3 rounded-full">
              <AlertCircle className="h-8 w-8 text-amber-600" />
            </div>
            <p>يمكنك استخدام هذه الهدية عند تقديم الطلب.</p>
            <p className="text-sm text-muted-foreground">
              عند الوصول إلى صفحة السلة، اختر "استخدام هدية سريعة" وحدد الهدية
              التي ترغب في استخدامها.
            </p>
            <div className="flex gap-2 w-full mt-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setUseGiftDialogOpen(false)}
              >
                إلغاء
              </Button>
              <Button className="flex-1" onClick={confirmUseGift}>
                فهمت
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuickGifts;
