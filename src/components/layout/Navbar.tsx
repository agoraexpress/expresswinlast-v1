import React from "react";
import { useDemoMode } from "@/context/DemoModeContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Home,
  Menu as MenuIcon,
  Gift,
  ShoppingCart,
  User,
  LogOut,
  Utensils,
  Stamp,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { t } from "@/i18n";

interface NavbarProps {
  activePage?: "home" | "menu" | "loyalty" | "cart" | "profile";
}

const Navbar = ({ activePage = "home" }: NavbarProps) => {
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const { isDemoMode } = useDemoMode();

  const handleLogout = async () => {
    try {
      // For development - use localStorage
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("isAdmin");
      navigate("/user-login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navItems = [
    {
      name: t("home"),
      icon: <Home size={24} />,
      path: "/home",
      id: "home",
    },
    {
      name: t("menu"),
      icon: <Utensils size={24} />,
      path: "/menu",
      id: "menu",
    },
    {
      name: t("loyalty"),
      icon: <Gift size={24} />,
      path: "/loyalty",
      id: "loyalty",
    },
    {
      name: t("cart"),
      icon: (
        <div className="relative">
          <ShoppingCart size={24} />
          {itemCount > 0 && (
            <Badge className="absolute -top-2 -left-2 h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
              {itemCount}
            </Badge>
          )}
        </div>
      ),
      path: "/cart",
      id: "cart",
    },
    {
      name: t("profile"),
      icon: <User size={24} />,
      path: "/profile",
      id: "profile",
    },
  ];

  return (
    <nav className="w-full h-[60px] md:h-[70px] bg-white border-b border-gray-200 fixed top-0 right-0 z-50 px-2 md:px-6 lg:px-8">
      <div className="h-full max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <div className="font-bold text-lg md:text-xl text-primary">
            AGORA EXPRESS
            {isDemoMode && (
              <span className="text-xs font-normal text-amber-600 ml-1">
                (تجريبي)
              </span>
            )}
          </div>
        </Link>

        {/* User info - show on larger screens */}
        <div className="hidden md:flex items-center mr-4">
          <span className="text-sm font-medium">محمد أحمد</span>
          <Badge className="ml-2 bg-blue-100 text-blue-800">750 عملة</Badge>
        </div>

        {/* Navigation Icons */}
        <div className="flex items-center space-x-reverse space-x-1 md:space-x-2">
          <TooltipProvider>
            {navItems.map((item) => (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>
                  <Button
                    variant={activePage === item.id ? "default" : "ghost"}
                    size="icon"
                    className={cn(
                      "rounded-full h-9 w-9 md:h-10 md:w-10",
                      activePage === item.id
                        ? "bg-primary text-primary-foreground"
                        : "text-gray-600",
                    )}
                    asChild
                  >
                    <Link to={item.path}>
                      <div className="flex items-center justify-center">
                        {React.cloneElement(item.icon as React.ReactElement, {
                          size: window.innerWidth < 768 ? 20 : 24,
                        })}
                      </div>
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.name}</p>
                </TooltipContent>
              </Tooltip>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-9 w-9 md:h-10 md:w-10"
                >
                  <Settings size={window.innerWidth < 768 ? 20 : 24} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/profile">الملف الشخصي</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  تسجيل الخروج
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TooltipProvider>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
