import React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { t } from "@/i18n";
import { Utensils, Pizza, Coffee, Cake, UtensilsCrossed } from "lucide-react";
import { Salad } from "lucide-react";

interface Category {
  id: string;
  name: string;
  imageUrl: string;
}

interface MenuCategoriesProps {
  categories?: Category[];
  activeCategory?: string;
  onSelectCategory?: (id: string) => void;
}

const MenuCategories = ({
  categories = defaultCategories,
  activeCategory = "1",
  onSelectCategory = () => {},
}: MenuCategoriesProps) => {
  return (
    <div className="w-full bg-white py-4 sticky top-[70px] z-10">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex justify-center space-x-reverse space-x-6 px-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex flex-col items-center space-y-2 cursor-pointer"
              onClick={() => onSelectCategory(category.id)}
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center ${activeCategory === category.id ? "bg-primary text-white" : "bg-gray-100 text-gray-600"} shadow-md hover:shadow-lg transition-all transform hover:scale-105`}
              >
                {category.id === "1" && <Utensils className="h-7 w-7" />}
                {category.id === "2" && <Pizza className="h-7 w-7" />}
                {category.id === "3" && <Salad className="h-7 w-7" />}
                {category.id === "4" && <Cake className="h-7 w-7" />}
                {category.id === "5" && <Coffee className="h-7 w-7" />}
                {category.id === "6" && <UtensilsCrossed className="h-7 w-7" />}
              </div>
              <span
                className={`text-sm font-medium ${activeCategory === category.id ? "text-primary" : "text-gray-600"}`}
              >
                {category.name}
              </span>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

const defaultCategories: Category[] = [
  {
    id: "1",
    name: t("burgers"),
    imageUrl:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&q=80",
  },
  {
    id: "2",
    name: t("pizza"),
    imageUrl:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&q=80",
  },
  {
    id: "3",
    name: t("salads"),
    imageUrl:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&q=80",
  },
  {
    id: "4",
    name: t("desserts"),
    imageUrl:
      "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=300&q=80",
  },
  {
    id: "5",
    name: t("drinks"),
    imageUrl:
      "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300&q=80",
  },
  {
    id: "6",
    name: t("sides"),
    imageUrl:
      "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=300&q=80",
  },
];

export default MenuCategories;
