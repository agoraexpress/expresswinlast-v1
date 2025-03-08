import React, { ReactNode, useState } from "react";
import { useDemoMode } from "@/context/DemoModeContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  ShoppingBag,
  Stamp,
  Gift,
  Coins,
  Utensils,
  Users,
  Bell,
  BarChart4,
  Soup,
  LogOut,
  Menu,
  X,
} from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  notificationCount?: {
    orders?: number;
  };
}

const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  activeTab,
  onTabChange,
  notificationCount = {},
}) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDemoMode } = useDemoMode();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`${isMobileMenuOpen ? "fixed inset-0 z-40 bg-black/50" : "hidden"} lg:block lg:relative lg:bg-transparent`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div
          className={`${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 fixed inset-y-0 right-0 w-64 bg-white border-l flex flex-col items-center py-6 shadow-md transition-transform duration-300 ease-in-out lg:relative lg:shadow-none`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-8">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl relative">
              FL
              {isDemoMode && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full px-1.5 py-0.5">
                  تجريبي
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center space-y-6 flex-1 overflow-y-auto w-full px-4">
            <Button
              variant={activeTab === "dashboard" ? "default" : "ghost"}
              size="lg"
              className="rounded-full w-full justify-start gap-3"
              onClick={() => {
                onTabChange("dashboard");
                setIsMobileMenuOpen(false);
              }}
            >
              <LayoutDashboard className="h-5 w-5" />
              <span>لوحة التحكم</span>
            </Button>

            <Button
              variant={activeTab === "orders" ? "default" : "ghost"}
              size="lg"
              className="rounded-full w-full justify-start gap-3 relative"
              onClick={() => {
                onTabChange("orders");
                setIsMobileMenuOpen(false);
              }}
            >
              <ShoppingBag className="h-5 w-5" />
              <span>إدارة الطلبات</span>
              {notificationCount.orders && (
                <Badge className="absolute -top-1 -right-1 bg-red-500 text-white">
                  {notificationCount.orders}
                </Badge>
              )}
            </Button>

            <Button
              variant={activeTab === "loyalty" ? "default" : "ghost"}
              size="lg"
              className="rounded-full w-full justify-start gap-3"
              onClick={() => {
                onTabChange("loyalty");
                setIsMobileMenuOpen(false);
              }}
            >
              <Stamp className="h-5 w-5" />
              <span>بطاقات الولاء</span>
            </Button>

            <Button
              variant={activeTab === "gifts" ? "default" : "ghost"}
              size="lg"
              className="rounded-full w-full justify-start gap-3"
              onClick={() => {
                onTabChange("gifts");
                setIsMobileMenuOpen(false);
              }}
            >
              <Gift className="h-5 w-5" />
              <span>الهدايا السريعة</span>
            </Button>

            <Button
              variant={activeTab === "coins" ? "default" : "ghost"}
              size="lg"
              className="rounded-full w-full justify-start gap-3"
              onClick={() => {
                onTabChange("coins");
                setIsMobileMenuOpen(false);
              }}
            >
              <Coins className="h-5 w-5" />
              <span>إدارة العملات</span>
            </Button>

            <Button
              variant={activeTab === "menu" ? "default" : "ghost"}
              size="lg"
              className="rounded-full w-full justify-start gap-3"
              onClick={() => {
                onTabChange("menu");
                setIsMobileMenuOpen(false);
              }}
            >
              <Utensils className="h-5 w-5" />
              <span>إدارة القائمة</span>
            </Button>

            <Button
              variant={activeTab === "users" ? "default" : "ghost"}
              size="lg"
              className="rounded-full w-full justify-start gap-3"
              onClick={() => {
                onTabChange("users");
                setIsMobileMenuOpen(false);
              }}
            >
              <Users className="h-5 w-5" />
              <span>إدارة المستخدمين</span>
            </Button>

            <Button
              variant={activeTab === "reports" ? "default" : "ghost"}
              size="lg"
              className="rounded-full w-full justify-start gap-3"
              onClick={() => {
                onTabChange("reports");
                setIsMobileMenuOpen(false);
              }}
            >
              <BarChart4 className="h-5 w-5" />
              <span>التقارير والإحصائيات</span>
            </Button>

            <Button
              variant={activeTab === "kitchen" ? "default" : "ghost"}
              size="lg"
              className="rounded-full w-full justify-start gap-3"
              onClick={() => {
                onTabChange("kitchen");
                setIsMobileMenuOpen(false);
              }}
            >
              <Soup className="h-5 w-5" />
              <span>شاشة المطبخ (KDS)</span>
            </Button>
          </div>

          <div className="mt-auto w-full px-4 pt-6">
            <Button
              variant="ghost"
              size="lg"
              className="rounded-full w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              <span>تسجيل الخروج</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            {activeTab === "dashboard" && "لوحة التحكم"}
            {activeTab === "orders" && "إدارة الطلبات"}
            {activeTab === "loyalty" && "بطاقات الولاء"}
            {activeTab === "gifts" && "الهدايا السريعة"}
            {activeTab === "coins" && "إدارة العملات"}
            {activeTab === "menu" && "إدارة القائمة"}
            {activeTab === "users" && "إدارة المستخدمين"}
            {activeTab === "reports" && "التقارير والإحصائيات"}
            {activeTab === "kitchen" && "شاشة المطبخ (KDS)"}
          </h1>

          <div className="flex items-center space-x-reverse space-x-4">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full relative"
            >
              <Bell className="h-5 w-5" />
              {notificationCount.orders && (
                <Badge className="absolute -top-1 -right-1 bg-red-500 text-white">
                  {notificationCount.orders}
                </Badge>
              )}
              <span className="sr-only">الإشعارات</span>
            </Button>

            <div className="flex items-center space-x-reverse space-x-2">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white relative">
                <span className="font-medium">م</span>
                {isDemoMode && (
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[10px] rounded-full px-1 py-0.5">
                    تجريبي
                  </span>
                )}
              </div>
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium">مدير النظام</p>
                <p className="text-xs text-muted-foreground">
                  admin@example.com
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
