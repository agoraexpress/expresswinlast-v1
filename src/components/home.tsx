import React from "react";
import DemoModeBanner from "@/components/common/DemoModeBanner";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import LoyaltyStatusCard from "@/components/dashboard/LoyaltyStatusCard";
import QuickAccessGrid from "@/components/dashboard/QuickAccessGrid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Clock, ArrowRight, ShoppingBag, Flame } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { MenuItemType } from "@/components/menu/MenuItem";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Flash sale products
  const flashSaleProducts: MenuItemType[] = [
    {
      id: "flash1",
      name: "برجر دبل تشيز",
      description: "برجر لحم مزدوج مع طبقتين من الجبن الذائب والصلصة الخاصة",
      price: 59.99,
      coinValue: 60,
      imageUrl:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80",
      ingredients: ["لحم بقري", "جبن شيدر", "خس", "طماطم", "بصل", "صلصة خاصة"],
      category: "1",
    },
    {
      id: "flash2",
      name: "بيتزا سوبريم",
      description: "بيتزا محملة بالخضروات الطازجة واللحوم المشكلة والجبن",
      price: 89.99,
      coinValue: 90,
      imageUrl:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80",
      ingredients: [
        "عجينة",
        "صلصة طماطم",
        "جبن موزاريلا",
        "فلفل",
        "زيتون",
        "لحم مفروم",
        "فطر",
      ],
      category: "2",
    },
    {
      id: "flash3",
      name: "سلطة سيزر دجاج",
      description: "سلطة خس رومين مع قطع دجاج مشوية وصلصة سيزر وخبز محمص",
      price: 49.99,
      coinValue: 50,
      imageUrl:
        "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500&q=80",
      ingredients: [
        "خس روماني",
        "دجاج مشوي",
        "صلصة سيزر",
        "خبز محمص",
        "جبن بارميزان",
      ],
      category: "3",
    },
    {
      id: "flash4",
      name: "ميلك شيك شوكولاتة",
      description: "ميلك شيك كريمي بالشوكولاتة مع كريمة مخفوقة",
      price: 29.99,
      coinValue: 30,
      imageUrl:
        "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&q=80",
      ingredients: ["حليب", "آيس كريم", "شوكولاتة", "كريمة مخفوقة"],
      category: "5",
    },
    {
      id: "flash5",
      name: "أجنحة دجاج حارة",
      description: "أجنحة دجاج مقرمشة ومتبلة بصلصة حارة",
      price: 39.99,
      coinValue: 40,
      imageUrl:
        "https://images.unsplash.com/photo-1608039755401-742074f0548d?w=500&q=80",
      ingredients: ["أجنحة دجاج", "توابل", "صلصة حارة"],
      category: "6",
    },
  ];

  // Products of the day
  const productsOfDay: MenuItemType[] = [
    {
      id: "day1",
      name: "طبق كباب مشكل",
      description: "تشكيلة من الكباب المشوي مع الخضروات والأرز",
      price: 129.99,
      coinValue: 130,
      imageUrl:
        "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=500&q=80",
      ingredients: [
        "لحم غنم",
        "لحم بقري",
        "دجاج",
        "خضروات مشوية",
        "أرز",
        "صلصة طحينة",
      ],
      category: "1",
    },
    {
      id: "day2",
      name: "سمك مشوي",
      description: "سمك طازج مشوي مع الأعشاب والليمون",
      price: 149.99,
      coinValue: 150,
      imageUrl:
        "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&q=80",
      ingredients: ["سمك", "ليمون", "أعشاب", "زيت زيتون", "ثوم"],
      category: "1",
    },
    {
      id: "day3",
      name: "باستا ألفريدو",
      description: "باستا كريمية مع صلصة الألفريدو والدجاج",
      price: 99.99,
      coinValue: 100,
      imageUrl:
        "https://images.unsplash.com/photo-1645112411341-6c4fd023882c?w=500&q=80",
      ingredients: ["باستا", "كريمة", "دجاج", "جبن بارميزان", "ثوم"],
      category: "1",
    },
  ];

  const handleAddToCart = (item: MenuItemType) => {
    addToCart({
      ...item,
      quantity: 1,
    });
  };

  // Get current hour to check if it's flash sale time (10-11 AM)
  const currentHour = new Date().getHours();
  const isFlashSaleTime = currentHour >= 10 && currentHour < 11;

  return (
    <div className="min-h-screen bg-gray-50">
      <DemoModeBanner />
      <Navbar activePage="home" />

      <main className="container mx-auto px-4 pt-[90px] pb-10">
        <div className="flex flex-col gap-6 max-w-4xl mx-auto">
          {/* Loyalty Status Card */}
          <LoyaltyStatusCard />

          {/* Flash Sale Section */}
          <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-lg p-4 text-white">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Flame className="h-6 w-6 animate-pulse" />
                <h2 className="text-xl font-bold">عروض فلاش!</h2>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span className="text-sm font-medium">
                  {isFlashSaleTime
                    ? "العرض متاح الآن! ينتهي في الساعة 11 صباحاً"
                    : "العرض متاح يومياً من الساعة 10 إلى 11 صباحاً"}
                </span>
              </div>
            </div>

            <ScrollArea className="w-full whitespace-nowrap pb-4">
              <div className="flex space-x-reverse space-x-4">
                {flashSaleProducts.map((product) => (
                  <div
                    key={product.id}
                    className="w-[250px] flex-shrink-0 bg-white rounded-lg overflow-hidden shadow-md"
                  >
                    <div className="h-36 relative">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-2 left-2 bg-red-600">
                        خصم 30%
                      </Badge>
                    </div>
                    <div className="p-3">
                      <h3 className="font-bold text-gray-800 mb-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2 h-10 mb-2">
                        {product.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1">
                          <span className="text-lg font-bold text-primary">
                            {product.price.toFixed(2)}
                          </span>
                          <span className="text-xs line-through text-gray-500">
                            {(product.price * 1.3).toFixed(2)} د.م
                          </span>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleAddToCart(product)}
                        >
                          أضف للسلة
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>

          {/* Advertisement Banner */}
          <div className="w-full h-48 rounded-lg overflow-hidden relative">
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80"
              alt="عروض خاصة"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
              <div className="text-white p-6">
                <h2 className="text-xl md:text-2xl font-bold mb-2">
                  أطباق جديدة كل أسبوع!
                </h2>
                <p className="mb-4">
                  جرب قائمتنا المتجددة واستمتع بتجربة طعام فريدة
                </p>
                <Button
                  onClick={() => navigate("/menu")}
                  className="bg-white text-primary hover:bg-gray-100"
                >
                  استكشف القائمة
                </Button>
              </div>
            </div>
          </div>

          {/* Products of the Day */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl font-bold">
                أطباق اليوم المميزة
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1"
                onClick={() => navigate("/menu")}
              >
                <span>عرض المزيد</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {productsOfDay.map((product) => (
                  <div
                    key={product.id}
                    className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="h-40 relative">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-2 left-2 bg-primary/90">
                        طبق اليوم
                      </Badge>
                    </div>
                    <div className="p-3">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">
                          {product.name}
                        </h3>
                        <span className="font-bold">
                          {product.price.toFixed(2)} د.م
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {product.description}
                      </p>
                      <Button
                        className="w-full"
                        onClick={() => handleAddToCart(product)}
                      >
                        أضف للسلة
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Access Grid */}
          <QuickAccessGrid />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2023 فليفر لويالتي. جميع الحقوق محفوظة.</p>
          <div className="flex justify-center space-x-reverse space-x-4 mt-2">
            <a href="#" className="text-sm hover:text-primary">
              سياسة الخصوصية
            </a>
            <a href="#" className="text-sm hover:text-primary">
              شروط الخدمة
            </a>
            <a href="#" className="text-sm hover:text-primary">
              اتصل بنا
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
