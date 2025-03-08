import React from "react";
import DemoModeBanner from "@/components/common/DemoModeBanner";
import Navbar from "@/components/layout/Navbar";
import MenuList from "@/components/menu/MenuList";
import { MenuItemType } from "@/components/menu/MenuItem";
import { useCart } from "@/context/CartContext";
import { t } from "@/i18n";

const Menu: React.FC = () => {
  const { addToCart } = useCart();

  const handleAddToCart = (
    item: MenuItemType,
    quantity: number,
    customizations?: string[],
  ) => {
    addToCart({
      ...item,
      quantity,
      customizations,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DemoModeBanner />
      <Navbar activePage="menu" />

      <main className="pt-[70px] pb-10">
        {/* Advertisement Banner */}
        <div className="w-full h-40 mb-4">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80"
            alt="عروض خاصة"
            className="w-full h-full object-cover"
          />
        </div>

        <MenuList onAddToCart={handleAddToCart} />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>{t("copyright")}</p>
          <div className="flex justify-center space-x-reverse space-x-4 mt-2">
            <a href="#" className="text-sm hover:text-primary">
              {t("privacyPolicy")}
            </a>
            <a href="#" className="text-sm hover:text-primary">
              {t("termsOfService")}
            </a>
            <a href="#" className="text-sm hover:text-primary">
              {t("contactUs")}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Menu;
