import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, ShoppingBag } from "lucide-react";

const Login: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            فليفر لويالتي
          </h1>
          <p className="text-gray-600">نظام الولاء والطلبات للمطاعم</p>
        </div>

        <Card className="w-full shadow-lg border-blue-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-center">
              مرحباً بك في فليفر لويالتي
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 py-6">
            <Button className="w-full h-16 text-lg gap-3" size="lg" asChild>
              <Link to="/user-login">
                <ShoppingBag className="h-6 w-6" />
                <span>دخول كمستخدم</span>
              </Link>
            </Button>

            <Button
              className="w-full h-16 text-lg gap-3 bg-secondary hover:bg-secondary/90"
              size="lg"
              asChild
            >
              <Link to="/admin-login">
                <LayoutDashboard className="h-6 w-6" />
                <span>دخول كمسؤول</span>
              </Link>
            </Button>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-sm text-gray-500">
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
      </div>
    </div>
  );
};

export default Login;
