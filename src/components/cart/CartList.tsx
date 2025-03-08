import React from "react";
import CartItem, { CartItemType } from "./CartItem";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { t } from "@/i18n";

interface CartListProps {
  items: CartItemType[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const CartList = ({ items, onUpdateQuantity, onRemove }: CartListProps) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg bg-gray-50">
        <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
        <h3 className="text-lg font-medium">{t("emptyCart")}</h3>
        <p className="text-sm text-muted-foreground mt-1 mb-4">
          {t("addItemsToStart")}
        </p>
        <Button asChild>
          <Link to="/menu">{t("browseMenu")}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onUpdateQuantity={onUpdateQuantity}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

export default CartList;
