import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Coins, Gift, Stamp } from "lucide-react";
import { CartItemType } from "./CartItem";
import { t } from "@/i18n";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface CartSummaryProps {
  items: CartItemType[];
  coinsBalance?: number;
  onCheckout?: () => void;
}

const CartSummary = ({
  items,
  coinsBalance = 750,
  onCheckout = () => {},
}: CartSummaryProps) => {
  const [useCoins, setUseCoins] = useState(false);
  const [coinsToUse, setCoinsToUse] = useState(0);
  const [stampDialogOpen, setStampDialogOpen] = useState(false);
  const [giftDialogOpen, setGiftDialogOpen] = useState(false);
  const [stampCode, setStampCode] = useState("");

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const tax = subtotal * 0.1; // 10% tax
  const discount = useCoins ? Math.min(coinsToUse / 10, subtotal) : 0; // 10 coins = $1
  const total = subtotal + tax - discount;

  const totalCoinsEarned = items.reduce(
    (sum, item) => sum + item.coinValue * item.quantity,
    0,
  );

  const handleCoinsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setCoinsToUse(Math.min(value, coinsBalance, subtotal * 10)); // Limit to balance and subtotal
  };

  const handleAddStamp = () => {
    // In a real app, this would validate the stamp code
    console.log("Adding stamp with code:", stampCode);
    setStampCode("");
    setStampDialogOpen(false);
  };

  // Mock active gifts for the gift selection dialog
  const activeGifts = [
    {
      id: "1",
      name: "حلوى مجانية",
      description: "احصل على حلوى مجانية مع أي طبق رئيسي",
    },
    { id: "2", name: "خصم 10%", description: "خصم 10% على طلبك التالي" },
  ];

  const handleSelectGift = (giftId: string) => {
    console.log("Selected gift:", giftId);
    setGiftDialogOpen(false);
  };

  return (
    <div className="bg-white rounded-lg border p-6">
      <h3 className="text-lg font-semibold mb-4">{t("orderSummary")}</h3>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-muted-foreground">{t("subtotal")}</span>
          <span>{subtotal.toFixed(2)} د.م</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">{t("tax")}</span>
          <span>{tax.toFixed(2)} د.م</span>
        </div>
        {useCoins && (
          <div className="flex justify-between text-green-600">
            <span>{t("discount")}</span>
            <span>-{discount.toFixed(2)} د.م</span>
          </div>
        )}
      </div>

      <Separator className="my-4" />

      <div className="flex justify-between font-semibold text-lg mb-6">
        <span>{t("total")}</span>
        <span>{total.toFixed(2)} د.م</span>
      </div>

      <div className="bg-blue-50 p-4 rounded-md mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Coins className="h-5 w-5 text-blue-600 ml-2" />
          <span>
            {t("youllEarn")} <strong>{totalCoinsEarned}</strong> {t("coins")}
          </span>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-reverse space-x-2">
            <Coins className="h-5 w-5 text-muted-foreground" />
            <Label htmlFor="use-coins">{t("useCoins")}</Label>
          </div>
          <Switch
            id="use-coins"
            checked={useCoins}
            onCheckedChange={setUseCoins}
          />
        </div>

        {useCoins && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>
                {t("available")} {coinsBalance} {t("coins")}
              </span>
              <span>
                {t("max")} {Math.floor(subtotal * 10)} {t("coins")}
              </span>
            </div>
            <Input
              type="number"
              value={coinsToUse}
              onChange={handleCoinsChange}
              min={0}
              max={Math.min(coinsBalance, Math.floor(subtotal * 10))}
              className="w-full"
            />
            <p className="text-sm text-muted-foreground">
              {coinsToUse} {t("coinsEqualsDiscount")}{" "}
              {(coinsToUse / 10).toFixed(2)} د.م
            </p>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-reverse space-x-2">
            <Stamp className="h-5 w-5 text-muted-foreground" />
            <Label htmlFor="add-stamp">طلب طابع</Label>
          </div>
          <Dialog open={stampDialogOpen} onOpenChange={setStampDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                طلب طابع
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>اختيار بطاقة الطوابع</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <p className="text-sm text-muted-foreground">
                  اختر البطاقة التي ترغب بإضافة طابع لها
                </p>
                <div className="space-y-2">
                  {[
                    {
                      id: "1",
                      name: "عشاق القهوة",
                      cardNumber: "1234567",
                      progress: "5/8",
                    },
                    {
                      id: "2",
                      name: "نادي السندويشات",
                      cardNumber: "7654321",
                      progress: "2/6",
                    },
                  ].map((card) => (
                    <div
                      key={card.id}
                      className="border rounded-lg p-3 cursor-pointer hover:bg-gray-50"
                      onClick={() => {
                        console.log("Selected card for stamp:", card.id);
                        // Store selected card info in localStorage for display in cart
                        localStorage.setItem(
                          "selectedStampCard",
                          JSON.stringify({
                            id: card.id,
                            name: card.name,
                            cardNumber: card.cardNumber,
                            progress: card.progress,
                          }),
                        );
                        setStampDialogOpen(false);
                      }}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">{card.name}</h4>
                          <p className="text-xs text-muted-foreground">
                            رقم البطاقة: {card.cardNumber}
                          </p>
                        </div>
                        <Badge variant="outline">{card.progress}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Display selected stamp card */}
        {localStorage.getItem("selectedStampCard") && (
          <div className="mt-2 p-2 bg-blue-50 rounded-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Stamp className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">
                  {
                    JSON.parse(
                      localStorage.getItem("selectedStampCard") || "{}",
                    ).name
                  }
                </span>
              </div>
              <Badge variant="outline" className="bg-blue-100">
                {
                  JSON.parse(localStorage.getItem("selectedStampCard") || "{}")
                    .cardNumber
                }
              </Badge>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-reverse space-x-2">
            <Gift className="h-5 w-5 text-muted-foreground" />
            <Label htmlFor="use-gift">{t("useQuickGift")}</Label>
          </div>
          <Dialog open={giftDialogOpen} onOpenChange={setGiftDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                {t("selectGift")}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>اختيار هدية</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <p className="text-sm text-muted-foreground">
                  اختر هدية لاستخدامها مع طلبك
                </p>
                <div className="space-y-2">
                  {activeGifts.map((gift) => (
                    <div
                      key={gift.id}
                      className="border rounded-lg p-3 cursor-pointer hover:bg-gray-50"
                      onClick={() => {
                        handleSelectGift(gift.id);
                        // Store selected gift info in localStorage for display in cart
                        localStorage.setItem(
                          "selectedGift",
                          JSON.stringify({
                            id: gift.id,
                            name: gift.name,
                            description: gift.description,
                            code: gift.id === "1" ? "12345" : "67890",
                          }),
                        );
                      }}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">{gift.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {gift.description}
                          </p>
                        </div>
                        <Badge variant="outline" className="bg-blue-50">
                          رقم: {gift.id === "1" ? "12345" : "67890"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Display selected gift */}
        {localStorage.getItem("selectedGift") && (
          <div className="mt-2 p-2 bg-purple-50 rounded-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gift className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium">
                  {
                    JSON.parse(localStorage.getItem("selectedGift") || "{}")
                      .name
                  }
                </span>
              </div>
              <Badge variant="outline" className="bg-purple-100">
                رقم:{" "}
                {JSON.parse(localStorage.getItem("selectedGift") || "{}").code}
              </Badge>
            </div>
          </div>
        )}
      </div>

      <Button
        className="w-full"
        size="lg"
        onClick={() => (window.location.href = "/checkout")}
      >
        {t("proceedToCheckout")}
      </Button>
    </div>
  );
};

export default CartSummary;
