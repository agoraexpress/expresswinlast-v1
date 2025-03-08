import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Coins, Gift, User, MapPin, Phone, Edit, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import StampCards from "@/components/loyalty/StampCards";
import QuickGifts from "@/components/loyalty/QuickGifts";

const Profile: React.FC = () => {
  // Mock user data
  const [userData, setUserData] = useState({
    name: "محمد أحمد",
    phone: "+212 612345678",
    address: "شارع الحسن الثاني، الدار البيضاء، المغرب",
    coinsBalance: 750,
    loyaltyTier: { name: "ذهبي", color: "bg-yellow-500" },
    pin: "",
  });

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: userData.name,
    phone: userData.phone,
    address: userData.address,
    pin: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProfile = () => {
    setUserData((prev) => ({
      ...prev,
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      pin: formData.pin,
    }));
    setEditDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activePage="profile" />

      <main className="container mx-auto px-4 pt-[90px] pb-10">
        <div className="flex flex-col gap-6 max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-2">
            <h1 className="text-3xl font-bold text-gray-900">الملف الشخصي</h1>
            <p className="text-gray-600">
              إدارة معلوماتك الشخصية ومكافآت الولاء
            </p>
          </div>

          {/* User Info Card */}
          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl font-bold">
                  معلومات المستخدم
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => setEditDialogOpen(true)}
                >
                  <Edit size={16} />
                  <span>تعديل</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-reverse space-x-4">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">الاسم</p>
                    <p className="font-medium">{userData.name}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-reverse space-x-4">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">رقم الهاتف</p>
                    <p className="font-medium">{userData.phone}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-reverse space-x-4">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">العنوان</p>
                    <p className="font-medium">{userData.address}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-reverse space-x-4">
                  <Coins className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      رصيد العملات
                    </p>
                    <p className="font-medium">{userData.coinsBalance} عملة</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Loyalty Rewards */}
          <div>
            <h2 className="text-2xl font-bold mb-4">مكافآت الولاء</h2>
            <Separator className="mb-6" />

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  بطاقات الطوابع النشطة
                </h3>
                <StampCards />
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">الهدايا السريعة</h3>
                <QuickGifts />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      {/* Edit Profile Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>تعديل معلومات المستخدم</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">الاسم</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">رقم الهاتف</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">العنوان</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pin" className="flex items-center gap-1">
                <Lock size={14} />
                <span>رمز PIN (اختياري)</span>
              </Label>
              <Input
                id="pin"
                name="pin"
                type="password"
                placeholder="أدخل رمز PIN جديد"
                value={formData.pin}
                onChange={handleInputChange}
              />
              <p className="text-xs text-muted-foreground">
                يستخدم رمز PIN لتأكيد العمليات المهمة في حسابك
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={handleUpdateProfile}>تحديث</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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

export default Profile;
