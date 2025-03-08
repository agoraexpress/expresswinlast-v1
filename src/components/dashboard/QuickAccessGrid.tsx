import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Utensils,
  ShoppingBag,
  Gift,
  CreditCard,
  History,
  Settings,
  HelpCircle,
} from "lucide-react";

interface QuickAccessItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  path: string;
}

interface QuickAccessGridProps {
  items?: QuickAccessItem[];
}

const QuickAccessGrid = ({ items = defaultItems }: QuickAccessGridProps) => {
  return (
    <Card className="w-full p-6 bg-white shadow-sm">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800">الوصول السريع</h2>
        <p className="text-gray-500">انتقل إلى الأقسام المستخدمة بشكل متكرر</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {items.map((item) => (
          <TooltipProvider key={item.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="h-auto flex flex-col items-center justify-center p-4 gap-2 hover:bg-gray-50 transition-colors"
                  asChild
                >
                  <Link to={item.path}>
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {item.icon}
                    </div>
                    <span className="font-medium text-gray-800">
                      {item.title}
                    </span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{item.description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </Card>
  );
};

const defaultItems: QuickAccessItem[] = [
  {
    id: "1",
    title: "قائمة الطعام",
    icon: <Utensils size={24} />,
    description: "تصفح قائمة الطعام لدينا",
    path: "/menu",
  },
  {
    id: "2",
    title: "سجل الطلبات",
    icon: <ShoppingBag size={24} />,
    description: "عرض سجل طلباتك",
    path: "/orders",
  },
  {
    id: "3",
    title: "مكافآت الولاء",
    icon: <Gift size={24} />,
    description: "تحقق من مكافآت الولاء الخاصة بك",
    path: "/loyalty",
  },
  {
    id: "4",
    title: "الدفع",
    icon: <CreditCard size={24} />,
    description: "إدارة طرق الدفع",
    path: "/payment",
  },
  {
    id: "5",
    title: "السجل",
    icon: <History size={24} />,
    description: "عرض سجل المعاملات",
    path: "/history",
  },
  {
    id: "6",
    title: "الإعدادات",
    icon: <Settings size={24} />,
    description: "ضبط التفضيلات الخاصة بك",
    path: "/settings",
  },
  {
    id: "7",
    title: "المساعدة",
    icon: <HelpCircle size={24} />,
    description: "الحصول على المساعدة",
    path: "/help",
  },
];

export default QuickAccessGrid;
