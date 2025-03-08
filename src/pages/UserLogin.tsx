import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, ShoppingBag, User } from "lucide-react";

const UserLogin: React.FC = () => {
  const navigate = useNavigate();
  const [userPhone, setUserPhone] = useState("");
  const [userPin, setUserPin] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUserLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // For development - use localStorage authentication
      if (userPin === "1234") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("isAdmin", "false");
        navigate("/home");
        return;
      }

      // In production, this would use Firebase authentication
      setError("رقم الهاتف أو رمز PIN غير صحيح");
      setIsLoading(false);
    } catch (error) {
      console.error("Login error:", error);
      setError("رقم الهاتف أو رمز PIN غير صحيح");
      setIsLoading(false);
    }
  };

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
              تسجيل دخول المستخدم
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUserLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="user-phone">رقم الهاتف</Label>
                <div className="relative">
                  <User
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                  <Input
                    id="user-phone"
                    type="text"
                    placeholder="أدخل رقم الهاتف"
                    className="pr-10"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="user-pin">رمز PIN</Label>
                <div className="relative">
                  <Lock
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                  <Input
                    id="user-pin"
                    type="password"
                    placeholder="أدخل رمز PIN"
                    className="pr-10"
                    value={userPin}
                    onChange={(e) => setUserPin(e.target.value)}
                    required
                  />
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-500 text-center">{error}</p>
              )}

              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isLoading}
                >
                  <ShoppingBag className="ml-2" size={18} />
                  {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
                </Button>
              </div>

              <div className="text-center text-sm text-muted-foreground mt-4">
                <p>للتجربة، استخدم:</p>
                <p>رقم الهاتف: أي رقم</p>
                <p>رمز PIN: 1234</p>
              </div>
            </form>
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

export default UserLogin;
