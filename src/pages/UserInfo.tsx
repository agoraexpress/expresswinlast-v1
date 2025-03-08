import React, { useState } from "react";
import DemoModeBanner from "@/components/common/DemoModeBanner";
import Navbar from "@/components/layout/Navbar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/context/CartContext";
import { Truck, Check, MessageSquare } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { t } from "@/i18n";

const UserInfo: React.FC = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  // Use user data from profile
  const [name, setName] = useState("محمد أحمد");
  const [phone, setPhone] = useState("+212 612345678");
  const [address, setAddress] = useState(
    "شارع الحسن الثاني، الدار البيضاء، المغرب",
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Calculate actual totals from cart items
  const subtotal =
    cartItems.length > 0
      ? cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      : 249.97; // Default value if cart is empty
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call to submit order
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      // In a real app, this would send the order to a backend
    }, 1500);
  };

  const createWhatsAppMessage = () => {
    const itemsList = cartItems
      .map(
        (item) =>
          `${item.quantity}x ${item.name} (${(item.price * item.quantity).toFixed(2)} د.م)${
            item.customizations?.length
              ? ` - ${item.customizations
                  .map((c) => {
                    const customizationMap: Record<string, string> = {
                      "extra-cheese": "إضافة جبن إضافي",
                      "extra-sauce": "إضافة صلصة إضافية",
                      "no-onions": "بدون بصل",
                      "no-tomato": "بدون طماطم",
                    };
                    return customizationMap[c] || c;
                  })
                  .join(", ")}`
              : ""
          }`,
      )
      .join("\n");

    const message = `
*طلب جديد من فليفر لويالتي*

*معلومات العميل:*
الاسم: ${name}
رقم الهاتف: ${phone}
عنوان التوصيل: ${address}

*تفاصيل الطلب:*
${itemsList}

*معلومات الولاء:*
رقم بطاقة الولاء: 1234567
رقم الهدية المستخدمة: 12345

المجموع الفرعي: ${subtotal.toFixed(2)} د.م
الضريبة: ${tax.toFixed(2)} د.م
الإجمالي: ${total.toFixed(2)} د.م

شكراً لطلبك! سيتم التوصيل في أقل من 15 دقيقة.
`;

    return encodeURIComponent(message);
  };

  const handleWhatsAppConfirmation = () => {
    const message = createWhatsAppMessage();
    window.open(`https://wa.me/?text=${message}`, "_blank");
    clearCart();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DemoModeBanner />
      <Navbar activePage="cart" />

      <main className="container mx-auto px-4 pt-[90px] pb-10">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            معلومات التوصيل
          </h1>

          <Card className="p-6 bg-white">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">الاسم</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="أدخل اسمك الكامل"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">رقم الهاتف</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="أدخل رقم هاتفك"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="address">عنوان التوصيل</Label>
                  <Textarea
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="أدخل عنوان التوصيل التفصيلي"
                    required
                  />
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="mb-4 bg-blue-50 p-3 rounded-md">
                  <h4 className="font-medium mb-2">
                    معلومات الولاء المستخدمة:
                  </h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>رقم بطاقة الطوابع:</span>
                      <Badge variant="outline" className="bg-white">
                        1234567
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>رقم الهدية المستخدمة:</span>
                      <Badge variant="outline" className="bg-white">
                        12345
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">المجموع الفرعي:</span>
                  <span>{subtotal.toFixed(2)} د.م</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">الضريبة (10%):</span>
                  <span>{tax.toFixed(2)} د.م</span>
                </div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>الإجمالي:</span>
                  <span>{total.toFixed(2)} د.م</span>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "جاري تأكيد الطلب..." : "تأكيد الطلب"}
              </Button>
            </form>
          </Card>
        </div>
      </main>

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              تم تقديم الطلب بنجاح!
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center py-6 space-y-6">
            <div className="bg-green-100 p-4 rounded-full">
              <Truck className="h-16 w-16 text-green-600" />
            </div>
            <div className="text-center">
              <p className="mb-2">سيتم توصيل طلبك في أقل من 15 دقيقة</p>
              <p className="text-sm text-muted-foreground">
                يمكنك متابعة حالة طلبك من خلال واتساب
              </p>
            </div>
            <div className="flex flex-col w-full gap-2">
              <Button
                onClick={handleWhatsAppConfirmation}
                className="bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2"
              >
                <MessageSquare className="h-5 w-5" />
                تأكيد الطلب عبر واتساب
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  clearCart();
                  navigate("/");
                }}
              >
                <Check className="h-5 w-5 mr-2" />
                العودة إلى الصفحة الرئيسية
              </Button>
            </div>
          </div>
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

export default UserInfo;
