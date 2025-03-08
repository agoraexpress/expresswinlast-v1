import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Coins, Plus, Minus, Info } from "lucide-react";
import { t } from "@/i18n";

export interface MenuItemType {
  id: string;
  name: string;
  description: string;
  price: number;
  coinValue: number;
  imageUrl: string;
  ingredients: string[];
  category: string;
}

interface CustomizationOption {
  id: string;
  name: string;
  price: number;
}

interface MenuItemProps {
  item: MenuItemType;
  onAddToCart?: (
    item: MenuItemType,
    quantity: number,
    customizations?: string[],
  ) => void;
}

const MenuItem = ({ item, onAddToCart = () => {} }: MenuItemProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCustomizations, setSelectedCustomizations] = useState<
    string[]
  >([]);

  // Mock customization options
  const customizationOptions: CustomizationOption[] = [
    { id: "extra-cheese", name: "إضافة جبن إضافي", price: 10 },
    { id: "extra-sauce", name: "إضافة صلصة إضافية", price: 5 },
    { id: "no-onions", name: "بدون بصل", price: 0 },
    { id: "no-tomato", name: "بدون طماطم", price: 0 },
  ];

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleCustomizationChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedCustomizations([...selectedCustomizations, id]);
    } else {
      setSelectedCustomizations(
        selectedCustomizations.filter((item) => item !== id),
      );
    }
  };

  const calculateTotalPrice = () => {
    let total = item.price;
    selectedCustomizations.forEach((id) => {
      const option = customizationOptions.find((opt) => opt.id === id);
      if (option) {
        total += option.price;
      }
    });
    return total * quantity;
  };

  const handleAddToCart = () => {
    onAddToCart(item, quantity, selectedCustomizations);
    setQuantity(1);
    setSelectedCustomizations([]);
    setIsDialogOpen(false);
  };

  return (
    <>
      <div className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
        <div className="h-48 relative overflow-hidden">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute top-2 left-2">
            <Badge className="bg-primary/90 hover:bg-primary text-white shadow-sm">
              <Coins className="h-3 w-3 ml-1" />
              {item.coinValue}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute bottom-2 left-2 bg-white/80 hover:bg-white rounded-full shadow-sm"
            onClick={() => setIsDialogOpen(true)}
          >
            <Info className="h-4 w-4" />
          </Button>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg">{item.name}</h3>
            <span className="font-bold">{item.price.toFixed(2)} د.م</span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {item.description}
          </p>
          <Button className="w-full" onClick={() => setIsDialogOpen(true)}>
            {t("addToCart")}
          </Button>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{item.name}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="h-48 rounded-md overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <div className="flex items-center">
                  <span className="font-bold ml-2">
                    {item.price.toFixed(2)} د.م
                  </span>
                  <Badge className="bg-primary/90 text-white">
                    <Coins className="h-3 w-3 ml-1" />
                    {item.coinValue}
                  </Badge>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {item.description}
              </p>
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">{t("ingredients")}</h4>
                <div className="flex flex-wrap gap-1">
                  {item.ingredients.map((ingredient, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-gray-50 cursor-pointer hover:bg-red-50 hover:border-red-200 group transition-colors"
                      onClick={() => {
                        if (
                          selectedCustomizations.includes(
                            `no-${ingredient.toLowerCase().replace(/\s/g, "-")}`,
                          )
                        )
                          handleCustomizationChange(
                            `no-${ingredient.toLowerCase().replace(/\s/g, "-")}`,
                            false,
                          );
                        else
                          handleCustomizationChange(
                            `no-${ingredient.toLowerCase().replace(/\s/g, "-")}`,
                            true,
                          );
                      }}
                    >
                      <span
                        className={
                          selectedCustomizations.includes(
                            `no-${ingredient.toLowerCase().replace(/\s/g, "-")}`,
                          )
                            ? "line-through text-red-500"
                            : ""
                        }
                      >
                        {ingredient}
                      </span>
                      {selectedCustomizations.includes(
                        `no-${ingredient.toLowerCase().replace(/\s/g, "-")}`,
                      ) && <span className="text-xs text-red-500 mr-1">✕</span>}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  انقر على أي مكون لإزالته
                </p>
              </div>

              {/* Customization Options */}
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">خيارات التخصيص:</h4>
                <div className="space-y-2">
                  {customizationOptions.map((option) => (
                    <div
                      key={option.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-reverse space-x-2">
                        <Checkbox
                          id={option.id}
                          checked={selectedCustomizations.includes(option.id)}
                          onCheckedChange={(checked) =>
                            handleCustomizationChange(
                              option.id,
                              checked as boolean,
                            )
                          }
                        />
                        <label htmlFor={option.id} className="text-sm">
                          {option.name}
                        </label>
                      </div>
                      {option.price > 0 && (
                        <span className="text-sm">
                          {option.price.toFixed(2)} د.م
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className="font-medium">{t("quantity")}:</span>
                <div className="flex items-center space-x-reverse space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleDecrement}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleIncrement}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Button className="w-full" onClick={handleAddToCart}>
                {t("addToCart")} - {calculateTotalPrice().toFixed(2)} د.م
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MenuItem;
