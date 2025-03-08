import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, Coins } from "lucide-react";
import { MenuItemType } from "../menu/MenuItem";
import { t } from "@/i18n";

export interface CartItemType extends MenuItemType {
  quantity: number;
  customizations?: string[];
}

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItem = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => {
  const handleIncrement = () => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    }
  };

  // Map customization IDs to readable names
  const getCustomizationName = (id: string) => {
    const customizationMap: Record<string, string> = {
      "extra-cheese": "إضافة جبن إضافي",
      "extra-sauce": "إضافة صلصة إضافية",
      "no-onions": "بدون بصل",
      "no-tomato": "بدون طماطم",
    };
    return customizationMap[id] || id;
  };

  return (
    <div className="flex border-b py-4">
      <div className="h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="mr-4 flex-grow">
        <div className="flex justify-between">
          <h3 className="font-medium">{item.name}</h3>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={() => onRemove(item.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        {item.customizations && item.customizations.length > 0 && (
          <div className="text-xs text-muted-foreground mt-1">
            {item.customizations.map((customization, index) => (
              <span key={index} className="block">
                - {getCustomizationName(customization)}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center text-sm text-muted-foreground mt-1">
          <Coins className="h-3 w-3 ml-1" />
          <span>
            {item.coinValue * item.quantity} {t("coins")}
          </span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center space-x-reverse space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={handleDecrement}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-6 text-center text-sm">{item.quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={handleIncrement}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <div className="font-medium">
            {(item.price * item.quantity).toFixed(2)} د.م
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
