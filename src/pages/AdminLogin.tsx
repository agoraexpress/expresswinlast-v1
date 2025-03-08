import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LayoutDashboard, Lock, User } from "lucide-react";

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // For development - use localStorage authentication
      if (adminUsername === "admin" && adminPassword === "admin") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("isAdmin", "true");
        navigate("/admin");
        return;
      }

      // In production, this would use Firebase authentication
      setError("اسم المستخدم أو كلمة المرور غير صحيحة");
      setIsLoading(false);
    } catch (error) {
      console.error("Admin login error:", error);
      setError("اسم المستخدم أو كلمة المرور غير صحيحة");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            لوحة تحكم المسؤول
          </h1>
          <p className="text-gray-400">نظام إدارة الولاء والطلبات</p>
        </div>

        <Card className="w-full bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-center text-white">
              تسجيل دخول المسؤول
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-username" className="text-gray-300">
                  اسم المستخدم
                </Label>
                <div className="relative">
                  <User
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                  <Input
                    id="admin-username"
                    type="text"
                    placeholder="أدخل اسم المستخدم"
                    className="pr-10 bg-gray-700 border-gray-600 text-white"
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin-password" className="text-gray-300">
                  كلمة المرور
                </Label>
                <div className="relative">
                  <Lock
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                  <Input
                    id="admin-password"
                    type="password"
                    placeholder="أدخل كلمة المرور"
                    className="pr-10 bg-gray-700 border-gray-600 text-white"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
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
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  size="lg"
                  disabled={isLoading}
                >
                  <LayoutDashboard className="ml-2" size={18} />
                  {isLoading ? "جاري تسجيل الدخول..." : "دخول للوحة التحكم"}
                </Button>
              </div>

              <div className="text-center text-sm text-gray-400 mt-4">
                <p>للتجربة، استخدم:</p>
                <p>اسم المستخدم: admin</p>
                <p>كلمة المرور: admin</p>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-sm text-gray-400">
          <p>© 2023 فليفر لويالتي. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
