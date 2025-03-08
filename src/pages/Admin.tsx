import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  LayoutDashboard,
  ShoppingBag,
  Stamp,
  Gift,
  Coins,
  Utensils,
  Users,
  Bell,
  Check,
  X,
  Clock,
  Truck,
  BarChart4,
  Plus,
  Edit,
  Trash,
  Search,
  Filter,
  Calendar,
  ChevronDown,
  Soup,
  LogOut,
} from "lucide-react";
import KitchenDisplay from "@/components/admin/KitchenDisplay";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";

const Admin: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is admin
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    if (!isAdmin) {
      navigate("/login");
    }
  }, [navigate]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activeKitchenTab, setActiveKitchenTab] = useState(false);
  const [activeOrderTab, setActiveOrderTab] = useState("new");
  const [activeLoyaltyTab, setActiveLoyaltyTab] = useState("cards");
  const [activeMenuTab, setActiveMenuTab] = useState("categories");
  const [newCardDialog, setNewCardDialog] = useState(false);
  const [newGiftDialog, setNewGiftDialog] = useState(false);
  const [newCodeDialog, setNewCodeDialog] = useState(false);
  const [newCategoryDialog, setNewCategoryDialog] = useState(false);
  const [newItemDialog, setNewItemDialog] = useState(false);
  const [newUserDialog, setNewUserDialog] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-20 bg-white border-l flex flex-col items-center py-6 shadow-md">
        <div className="mb-8">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl">
            FL
          </div>
        </div>

        <div className="flex flex-col items-center space-y-6">
          <Button
            variant={activeTab === "dashboard" ? "default" : "ghost"}
            size="icon"
            className="rounded-full w-12 h-12"
            onClick={() => setActiveTab("dashboard")}
          >
            <LayoutDashboard className="h-6 w-6" />
          </Button>

          <Button
            variant={activeTab === "orders" ? "default" : "ghost"}
            size="icon"
            className="rounded-full w-12 h-12 relative"
            onClick={() => setActiveTab("orders")}
          >
            <ShoppingBag className="h-6 w-6" />
            <Badge className="absolute -top-1 -right-1 bg-red-500 text-white">
              5
            </Badge>
          </Button>

          <Button
            variant={activeTab === "loyalty" ? "default" : "ghost"}
            size="icon"
            className="rounded-full w-12 h-12"
            onClick={() => setActiveTab("loyalty")}
          >
            <Stamp className="h-6 w-6" />
          </Button>

          <Button
            variant={activeTab === "gifts" ? "default" : "ghost"}
            size="icon"
            className="rounded-full w-12 h-12"
            onClick={() => setActiveTab("gifts")}
          >
            <Gift className="h-6 w-6" />
          </Button>

          <Button
            variant={activeTab === "coins" ? "default" : "ghost"}
            size="icon"
            className="rounded-full w-12 h-12"
            onClick={() => setActiveTab("coins")}
          >
            <Coins className="h-6 w-6" />
          </Button>

          <Button
            variant={activeTab === "menu" ? "default" : "ghost"}
            size="icon"
            className="rounded-full w-12 h-12"
            onClick={() => setActiveTab("menu")}
          >
            <Utensils className="h-6 w-6" />
          </Button>

          <Button
            variant={activeTab === "users" ? "default" : "ghost"}
            size="icon"
            className="rounded-full w-12 h-12"
            onClick={() => setActiveTab("users")}
          >
            <Users className="h-6 w-6" />
          </Button>

          <Button
            variant={activeTab === "reports" ? "default" : "ghost"}
            size="icon"
            className="rounded-full w-12 h-12"
            onClick={() => setActiveTab("reports")}
          >
            <BarChart4 className="h-6 w-6" />
          </Button>

          <Button
            variant={activeKitchenTab ? "default" : "ghost"}
            size="icon"
            className="rounded-full w-12 h-12"
            onClick={() => {
              setActiveKitchenTab(!activeKitchenTab);
              setActiveTab("");
            }}
          >
            <Soup className="h-6 w-6" />
          </Button>

          <div className="mt-auto">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full w-12 h-12 text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={() => {
                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("isAdmin");
                navigate("/login");
              }}
            >
              <LogOut className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
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
            {activeKitchenTab && "شاشة المطبخ (KDS)"}
          </h1>

          <div className="flex items-center space-x-reverse space-x-4">
            <Button variant="outline" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
              <span className="sr-only">الإشعارات</span>
            </Button>

            <div className="flex items-center space-x-reverse space-x-2">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white">
                <span className="font-medium">م</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">مدير النظام</p>
                <p className="text-xs text-muted-foreground">
                  admin@example.com
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {/* Kitchen Display System */}
          {activeKitchenTab && <KitchenDisplay />}
          {/* Dashboard */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        طلبات اليوم
                      </p>
                      <p className="text-3xl font-bold">24</p>
                    </div>
                    <div className="bg-primary/10 p-3 rounded-full">
                      <ShoppingBag className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        إجمالي المبيعات
                      </p>
                      <p className="text-3xl font-bold">2,450 د.م</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full">
                      <Coins className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        بطاقات الولاء النشطة
                      </p>
                      <p className="text-3xl font-bold">156</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Stamp className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        المستخدمين النشطين
                      </p>
                      <p className="text-3xl font-bold">1,204</p>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-full">
                      <Users className="h-8 w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>أحدث الطلبات</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          id: "ORD123456",
                          customer: "محمد أحمد",
                          total: 149.99,
                          status: "new",
                          time: "منذ 5 دقائق",
                        },
                        {
                          id: "ORD123455",
                          customer: "فاطمة علي",
                          total: 89.99,
                          status: "preparing",
                          time: "منذ 15 دقيقة",
                        },
                        {
                          id: "ORD123454",
                          customer: "أحمد محمود",
                          total: 199.99,
                          status: "delivering",
                          time: "منذ 30 دقيقة",
                        },
                        {
                          id: "ORD123453",
                          customer: "سارة خالد",
                          total: 129.99,
                          status: "delivered",
                          time: "منذ ساعة",
                        },
                      ].map((order) => (
                        <div
                          key={order.id}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div>
                            <p className="font-medium">{order.customer}</p>
                            <p className="text-sm text-muted-foreground">
                              {order.id} - {order.time}
                            </p>
                          </div>
                          <div className="flex items-center space-x-reverse space-x-3">
                            <p className="font-medium">
                              {order.total.toFixed(2)} د.م
                            </p>
                            <Badge
                              className={
                                order.status === "new"
                                  ? "bg-blue-500"
                                  : order.status === "preparing"
                                    ? "bg-yellow-500"
                                    : order.status === "delivering"
                                      ? "bg-purple-500"
                                      : "bg-green-500"
                              }
                            >
                              {order.status === "new"
                                ? "جديد"
                                : order.status === "preparing"
                                  ? "قيد التحضير"
                                  : order.status === "delivering"
                                    ? "جاري التوصيل"
                                    : "تم التسليم"}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>أكثر المنتجات مبيعاً</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          name: "برجر كلاسيكي",
                          category: "برجر",
                          sales: 156,
                          percentage: 85,
                        },
                        {
                          name: "بيتزا بيبروني",
                          category: "بيتزا",
                          sales: 129,
                          percentage: 70,
                        },
                        {
                          name: "سلطة سيزر",
                          category: "سلطات",
                          sales: 92,
                          percentage: 50,
                        },
                        {
                          name: "قهوة مثلجة",
                          category: "مشروبات",
                          sales: 78,
                          percentage: 40,
                        },
                      ].map((product, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">{product.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {product.category} - {product.sales} مبيعات
                              </p>
                            </div>
                            <p className="font-medium">{product.percentage}%</p>
                          </div>
                          <Progress
                            value={product.percentage}
                            className="h-2"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Orders Management */}
          {activeTab === "orders" && (
            <div className="space-y-6">
              <Tabs
                value={activeOrderTab}
                onValueChange={setActiveOrderTab}
                className="w-full"
              >
                <TabsList className="grid grid-cols-4 w-full max-w-2xl mb-6">
                  <TabsTrigger value="new" className="relative">
                    جديدة
                    <Badge className="absolute -top-2 -right-2 bg-red-500 text-white">
                      5
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="preparing" className="relative">
                    قيد التحضير
                    <Badge className="absolute -top-2 -right-2 bg-yellow-500 text-white">
                      3
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="delivering" className="relative">
                    جاري التوصيل
                    <Badge className="absolute -top-2 -right-2 bg-purple-500 text-white">
                      2
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="history">سجل الطلبات</TabsTrigger>
                </TabsList>

                <TabsContent value="new" className="space-y-4">
                  {[
                    {
                      id: "ORD123456",
                      customer: "محمد أحمد",
                      phone: "+212 612345678",
                      address: "شارع الحسن الثاني، الدار البيضاء",
                      items: [
                        { name: "برجر كلاسيكي", quantity: 2, price: 89.99 },
                        { name: "بطاطس مقلية", quantity: 1, price: 29.99 },
                        { name: "كولا", quantity: 2, price: 15.99 },
                      ],
                      total: 241.95,
                      time: "منذ 5 دقائق",
                    },
                    {
                      id: "ORD123455",
                      customer: "فاطمة علي",
                      phone: "+212 698765432",
                      address: "شارع محمد الخامس، الرباط",
                      items: [
                        { name: "بيتزا بيبروني", quantity: 1, price: 149.99 },
                        { name: "سلطة سيزر", quantity: 1, price: 79.99 },
                      ],
                      total: 229.98,
                      time: "منذ 10 دقائق",
                    },
                  ].map((order) => (
                    <Card key={order.id} className="overflow-hidden">
                      <CardHeader className="bg-blue-50 py-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-reverse space-x-2">
                            <Badge
                              variant="outline"
                              className="bg-blue-100 text-blue-800"
                            >
                              {order.id}
                            </Badge>
                            <span className="font-medium">
                              {order.customer}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="h-4 w-4 ml-1" />
                            <span>{order.time}</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium mb-2">تفاصيل الطلب:</h4>
                            <div className="space-y-1">
                              {order.items.map((item, index) => (
                                <div
                                  key={index}
                                  className="flex justify-between text-sm"
                                >
                                  <span>
                                    {item.quantity}x {item.name}
                                  </span>
                                  <span>{item.price.toFixed(2)} د.م</span>
                                </div>
                              ))}
                              <Separator className="my-2" />
                              <div className="flex justify-between font-medium">
                                <span>الإجمالي:</span>
                                <span>{order.total.toFixed(2)} د.م</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">
                              معلومات العميل:
                            </h4>
                            <div className="space-y-1 text-sm">
                              <p>
                                <span className="text-muted-foreground ml-1">
                                  الاسم:
                                </span>
                                {order.customer}
                              </p>
                              <p>
                                <span className="text-muted-foreground ml-1">
                                  الهاتف:
                                </span>
                                {order.phone}
                              </p>
                              <p>
                                <span className="text-muted-foreground ml-1">
                                  العنوان:
                                </span>
                                {order.address}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end space-x-reverse space-x-2 mt-4">
                          <Button variant="outline" className="gap-1">
                            <X className="h-4 w-4" />
                            <span>رفض</span>
                          </Button>
                          <Button className="gap-1 bg-green-600 hover:bg-green-700">
                            <Check className="h-4 w-4" />
                            <span>قبول</span>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="preparing" className="space-y-4">
                  {[
                    {
                      id: "ORD123454",
                      customer: "أحمد محمود",
                      items: [
                        { name: "برجر بالجبن", quantity: 3, price: 99.99 },
                        { name: "بطاطس مقلية", quantity: 2, price: 29.99 },
                        { name: "عصير برتقال", quantity: 3, price: 19.99 },
                      ],
                      total: 389.93,
                      time: "15:20",
                      elapsed: "12 دقيقة",
                    },
                  ].map((order) => (
                    <Card key={order.id} className="overflow-hidden">
                      <CardHeader className="bg-yellow-50 py-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-reverse space-x-2">
                            <Badge
                              variant="outline"
                              className="bg-yellow-100 text-yellow-800"
                            >
                              {order.id}
                            </Badge>
                            <span className="font-medium">
                              {order.customer}
                            </span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Badge
                              variant="outline"
                              className="bg-yellow-100 text-yellow-800"
                            >
                              <Clock className="h-3 w-3 ml-1" />
                              {order.elapsed}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="space-y-1 mb-4">
                          {order.items.map((item, index) => (
                            <div
                              key={index}
                              className="flex justify-between text-sm"
                            >
                              <span>
                                {item.quantity}x {item.name}
                              </span>
                              <span>
                                {(item.price * item.quantity).toFixed(2)} د.م
                              </span>
                            </div>
                          ))}
                          <Separator className="my-2" />
                          <div className="flex justify-between font-medium">
                            <span>الإجمالي:</span>
                            <span>{order.total.toFixed(2)} د.م</span>
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <Button className="gap-1">
                            <Check className="h-4 w-4" />
                            <span>تم التحضير</span>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="delivering" className="space-y-4">
                  {[
                    {
                      id: "ORD123453",
                      customer: "سارة خالد",
                      address: "شارع الزرقطوني، الدار البيضاء",
                      total: 199.98,
                      time: "15:05",
                      elapsed: "25 دقيقة",
                    },
                  ].map((order) => (
                    <Card key={order.id} className="overflow-hidden">
                      <CardHeader className="bg-purple-50 py-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-reverse space-x-2">
                            <Badge
                              variant="outline"
                              className="bg-purple-100 text-purple-800"
                            >
                              {order.id}
                            </Badge>
                            <span className="font-medium">
                              {order.customer}
                            </span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Badge
                              variant="outline"
                              className="bg-purple-100 text-purple-800"
                            >
                              <Truck className="h-3 w-3 ml-1" />
                              {order.elapsed}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-4">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              العنوان:
                            </p>
                            <p>{order.address}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              الإجمالي:
                            </p>
                            <p className="font-medium">
                              {order.total.toFixed(2)} د.م
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <Button className="gap-1 bg-green-600 hover:bg-green-700">
                            <Check className="h-4 w-4" />
                            <span>تم التسليم</span>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="history">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle>سجل الطلبات</CardTitle>
                        <div className="flex items-center space-x-reverse space-x-2">
                          <Button variant="outline" size="sm" className="gap-1">
                            <Filter className="h-4 w-4" />
                            <span>تصفية</span>
                          </Button>
                          <div className="relative">
                            <Search className="h-4 w-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                            <Input
                              placeholder="بحث..."
                              className="pl-3 pr-9 w-[200px]"
                            />
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-md border">
                        <div className="grid grid-cols-5 bg-muted/50 p-3 text-sm font-medium">
                          <div>رقم الطلب</div>
                          <div>العميل</div>
                          <div>التاريخ</div>
                          <div>الإجمالي</div>
                          <div>الحالة</div>
                        </div>
                        {[
                          {
                            id: "ORD123452",
                            customer: "خالد محمد",
                            date: "2023-11-15",
                            total: 159.98,
                            status: "delivered",
                          },
                          {
                            id: "ORD123451",
                            customer: "ليلى أحمد",
                            date: "2023-11-14",
                            total: 249.97,
                            status: "delivered",
                          },
                          {
                            id: "ORD123450",
                            customer: "عمر علي",
                            date: "2023-11-14",
                            total: 189.99,
                            status: "cancelled",
                          },
                          {
                            id: "ORD123449",
                            customer: "نور حسن",
                            date: "2023-11-13",
                            total: 129.99,
                            status: "delivered",
                          },
                          {
                            id: "ORD123448",
                            customer: "سعيد محمود",
                            date: "2023-11-13",
                            total: 179.98,
                            status: "delivered",
                          },
                        ].map((order) => (
                          <div
                            key={order.id}
                            className="grid grid-cols-5 p-3 text-sm border-t hover:bg-muted/50 transition-colors"
                          >
                            <div>{order.id}</div>
                            <div>{order.customer}</div>
                            <div>{order.date}</div>
                            <div>{order.total.toFixed(2)} د.م</div>
                            <div>
                              <Badge
                                className={
                                  order.status === "delivered"
                                    ? "bg-green-500"
                                    : "bg-red-500"
                                }
                              >
                                {order.status === "delivered"
                                  ? "تم التسليم"
                                  : "ملغي"}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {/* Loyalty Cards Management */}
          {activeTab === "loyalty" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">إدارة بطاقات الولاء</h2>
                <Button
                  className="gap-1"
                  onClick={() => setNewCardDialog(true)}
                >
                  <Plus className="h-4 w-4" />
                  <span>إضافة بطاقة جديدة</span>
                </Button>
              </div>

              <Tabs
                value={activeLoyaltyTab}
                onValueChange={setActiveLoyaltyTab}
                className="w-full"
              >
                <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
                  <TabsTrigger value="cards">البطاقات النشطة</TabsTrigger>
                  <TabsTrigger value="add-stamp">إضافة طابع</TabsTrigger>
                  <TabsTrigger value="edit">تعديل البطاقات</TabsTrigger>
                </TabsList>

                <TabsContent value="cards">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        id: "1",
                        name: "عشاق القهوة",
                        cardNumber: "1234567",
                        totalStamps: 8,
                        owner: "محمد أحمد",
                        phone: "+212 612345678",
                        active: true,
                      },
                      {
                        id: "2",
                        name: "نادي السندويشات",
                        cardNumber: "7654321",
                        totalStamps: 6,
                        owner: "فاطمة علي",
                        phone: "+212 698765432",
                        active: true,
                      },
                      {
                        id: "3",
                        name: "بطاقة المشروبات الخاصة",
                        cardNumber: "9876543",
                        totalStamps: 10,
                        owner: "أحمد محمود",
                        phone: "+212 654321987",
                        active: true,
                      },
                    ].map((card) => (
                      <Card key={card.id} className="overflow-hidden">
                        <CardHeader className="bg-blue-50 py-3">
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-lg">
                              {card.name}
                            </CardTitle>
                            <Badge
                              variant="outline"
                              className="bg-blue-100 text-blue-800"
                            >
                              {card.cardNumber}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">
                                عدد الطوابع:
                              </span>
                              <span className="font-medium">
                                {card.totalStamps}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">
                                المالك:
                              </span>
                              <span className="font-medium">{card.owner}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">
                                رقم الهاتف:
                              </span>
                              <span className="font-medium">{card.phone}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">
                                الحالة:
                              </span>
                              <Badge
                                className={
                                  card.active ? "bg-green-500" : "bg-red-500"
                                }
                              >
                                {card.active ? "نشطة" : "غير نشطة"}
                              </Badge>
                            </div>
                          </div>

                          <div className="flex justify-end space-x-reverse space-x-2 mt-4">
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1"
                            >
                              <Edit className="h-4 w-4" />
                              <span>تعديل</span>
                            </Button>
                            {card.active ? (
                              <Button
                                variant="destructive"
                                size="sm"
                                className="gap-1"
                              >
                                <X className="h-4 w-4" />
                                <span>تعطيل</span>
                              </Button>
                            ) : (
                              <Button
                                variant="default"
                                size="sm"
                                className="gap-1 bg-green-600 hover:bg-green-700"
                              >
                                <Check className="h-4 w-4" />
                                <span>تفعيل</span>
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="add-stamp">
                  <Card>
                    <CardHeader>
                      <CardTitle>إضافة طابع يدوياً</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="card-number">رقم البطاقة</Label>
                          <Input
                            id="card-number"
                            placeholder="أدخل رقم البطاقة (7 أرقام)"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="stamp-code">رمز الطابع</Label>
                          <Input
                            id="stamp-code"
                            placeholder="أدخل رمز الطابع (*12345)"
                            disabled
                            value="*54321"
                          />
                          <p className="text-xs text-muted-foreground">
                            تم توليد رمز الطابع تلقائياً
                          </p>
                        </div>
                      </div>
                      <Button className="w-full md:w-auto">إضافة طابع</Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="edit">
                  <Card>
                    <CardHeader>
                      <CardTitle>تعديل بطاقات الولاء</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-md border">
                        <div className="grid grid-cols-5 bg-muted/50 p-3 text-sm font-medium">
                          <div>اسم البطاقة</div>
                          <div>رقم البطاقة</div>
                          <div>عدد الطوابع</div>
                          <div>المالك</div>
                          <div>الإجراءات</div>
                        </div>
                        {[
                          {
                            id: "1",
                            name: "عشاق القهوة",
                            cardNumber: "1234567",
                            totalStamps: 8,
                            owner: "محمد أحمد",
                          },
                          {
                            id: "2",
                            name: "نادي السندويشات",
                            cardNumber: "7654321",
                            totalStamps: 6,
                            owner: "فاطمة علي",
                          },
                          {
                            id: "3",
                            name: "بطاقة المشروبات الخاصة",
                            cardNumber: "9876543",
                            totalStamps: 10,
                            owner: "أحمد محمود",
                          },
                        ].map((card) => (
                          <div
                            key={card.id}
                            className="grid grid-cols-5 p-3 text-sm border-t hover:bg-muted/50 transition-colors"
                          >
                            <div>{card.name}</div>
                            <div>{card.cardNumber}</div>
                            <div>{card.totalStamps}</div>
                            <div>{card.owner}</div>
                            <div className="flex space-x-reverse space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {/* Quick Gifts Management */}
          {activeTab === "gifts" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">إدارة الهدايا السريعة</h2>
                <Button
                  className="gap-1"
                  onClick={() => setNewGiftDialog(true)}
                >
                  <Plus className="h-4 w-4" />
                  <span>إضافة هدية جديدة</span>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    id: "1",
                    name: "حلوى مجانية",
                    description: "احصل على حلوى مجانية مع أي طبق رئيسي",
                    code: "12345",
                    expiryDate: "2023-12-15",
                    imageUrl:
                      "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=300&q=80",
                  },
                  {
                    id: "2",
                    name: "خصم 10%",
                    description: "خصم 10% على طلبك التالي",
                    code: "67890",
                    expiryDate: "2023-11-30",
                    imageUrl:
                      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=300&q=80",
                  },
                  {
                    id: "3",
                    name: "مشروب مجاني",
                    description: "احصل على مشروب مجاني مع أي وجبة",
                    code: "54321",
                    expiryDate: "2023-12-31",
                    imageUrl:
                      "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300&q=80",
                  },
                ].map((gift) => (
                  <Card key={gift.id} className="overflow-hidden">
                    <div className="h-40 w-full relative">
                      <img
                        src={gift.imageUrl}
                        alt={gift.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-primary/90 text-white shadow-sm">
                          رقم الهدية: {gift.code}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg">{gift.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {gift.description}
                      </p>
                      <div className="flex items-center text-sm text-muted-foreground mt-2">
                        <Calendar className="ml-1 h-3 w-3" />
                        <span>تنتهي الصلاحية: {gift.expiryDate}</span>
                      </div>

                      <div className="flex justify-end space-x-reverse space-x-2 mt-4">
                        <Button variant="outline" size="sm" className="gap-1">
                          <Edit className="h-4 w-4" />
                          <span>تعديل</span>
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="gap-1"
                        >
                          <X className="h-4 w-4" />
                          <span>حظر</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Coins Management */}
          {activeTab === "coins" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">إدارة العملات</h2>
                <Button
                  className="gap-1"
                  onClick={() => setNewCodeDialog(true)}
                >
                  <Plus className="h-4 w-4" />
                  <span>إضافة كود جديد</span>
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>الأكواد النشطة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { code: "12345", value: 100, used: false },
                      { code: "67890", value: 200, used: false },
                      { code: "54321", value: 50, used: true },
                      { code: "09876", value: 150, used: false },
                      { code: "13579", value: 75, used: false },
                      { code: "24680", value: 125, used: true },
                      { code: "11223", value: 300, used: false },
                      { code: "44556", value: 250, used: false },
                    ].map((code, index) => (
                      <div
                        key={index}
                        className={`border rounded-lg p-4 ${code.used ? "bg-gray-100 opacity-70" : "bg-white"}`}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <Badge
                            variant="outline"
                            className={code.used ? "bg-gray-200" : "bg-blue-50"}
                          >
                            {code.code}
                          </Badge>
                          <Badge
                            className={
                              code.used ? "bg-gray-500" : "bg-green-500"
                            }
                          >
                            {code.used ? "مستخدم" : "نشط"}
                          </Badge>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold">{code.value}</p>
                          <p className="text-xs text-muted-foreground">عملة</p>
                        </div>
                        {!code.used && (
                          <div className="flex justify-center mt-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Menu Management */}
          {activeTab === "menu" && (
            <div className="space-y-6">
              <Tabs
                value={activeMenuTab}
                onValueChange={setActiveMenuTab}
                className="w-full"
              >
                <TabsList className="grid grid-cols-2 w-full max-w-md mb-6">
                  <TabsTrigger value="categories">التصنيفات</TabsTrigger>
                  <TabsTrigger value="items">الأصناف</TabsTrigger>
                </TabsList>

                <TabsContent value="categories">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">إدارة التصنيفات</h2>
                    <Button
                      className="gap-1"
                      onClick={() => setNewCategoryDialog(true)}
                    >
                      <Plus className="h-4 w-4" />
                      <span>إضافة تصنيف جديد</span>
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                    {[
                      {
                        id: "1",
                        name: "برجر",
                        icon: <Utensils className="h-8 w-8" />,
                      },
                      {
                        id: "2",
                        name: "بيتزا",
                        icon: <Pizza className="h-8 w-8" />,
                      },
                      {
                        id: "3",
                        name: "سلطات",
                        icon: <Salad className="h-8 w-8" />,
                      },
                      {
                        id: "4",
                        name: "حلويات",
                        icon: <Cake className="h-8 w-8" />,
                      },
                      {
                        id: "5",
                        name: "مشروبات",
                        icon: <Coffee className="h-8 w-8" />,
                      },
                      {
                        id: "6",
                        name: "جانبية",
                        icon: <UtensilsCrossed className="h-8 w-8" />,
                      },
                    ].map((category) => (
                      <div
                        key={category.id}
                        className="border rounded-lg p-4 flex flex-col items-center text-center hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                          {category.icon}
                        </div>
                        <h3 className="font-medium">{category.name}</h3>
                        <div className="flex space-x-reverse space-x-1 mt-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="items">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">إدارة الأصناف</h2>
                    <div className="flex items-center space-x-reverse space-x-2">
                      <div className="relative">
                        <Search className="h-4 w-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          placeholder="بحث..."
                          className="pl-3 pr-9 w-[200px]"
                        />
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="gap-1">
                            <Filter className="h-4 w-4" />
                            <span>التصنيف</span>
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>الكل</DropdownMenuItem>
                          <DropdownMenuItem>برجر</DropdownMenuItem>
                          <DropdownMenuItem>بيتزا</DropdownMenuItem>
                          <DropdownMenuItem>سلطات</DropdownMenuItem>
                          <DropdownMenuItem>حلويات</DropdownMenuItem>
                          <DropdownMenuItem>مشروبات</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Button
                        className="gap-1"
                        onClick={() => setNewItemDialog(true)}
                      >
                        <Plus className="h-4 w-4" />
                        <span>إضافة صنف جديد</span>
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      {
                        id: "1",
                        name: "برجر كلاسيكي",
                        category: "برجر",
                        price: 89.99,
                        coinValue: 90,
                        imageUrl:
                          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80",
                      },
                      {
                        id: "2",
                        name: "برجر بالجبن",
                        category: "برجر",
                        price: 99.99,
                        coinValue: 100,
                        imageUrl:
                          "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=500&q=80",
                      },
                      {
                        id: "5",
                        name: "بيتزا مارجريتا",
                        category: "بيتزا",
                        price: 129.99,
                        coinValue: 130,
                        imageUrl:
                          "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&q=80",
                      },
                      {
                        id: "7",
                        name: "سلطة سيزر",
                        category: "سلطات",
                        price: 79.99,
                        coinValue: 80,
                        imageUrl:
                          "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500&q=80",
                      },
                      {
                        id: "9",
                        name: "قهوة مثلجة",
                        category: "مشروبات",
                        price: 39.99,
                        coinValue: 40,
                        imageUrl:
                          "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=500&q=80",
                      },
                    ].map((item) => (
                      <Card key={item.id} className="overflow-hidden">
                        <div className="h-40 w-full relative">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 left-2">
                            <Badge className="bg-primary/90 text-white shadow-sm">
                              <Coins className="h-3 w-3 ml-1" />
                              {item.coinValue}
                            </Badge>
                          </div>
                          <div className="absolute top-2 right-2">
                            <Badge
                              variant="outline"
                              className="bg-white/90 shadow-sm"
                            >
                              {item.category}
                            </Badge>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-lg">
                              {item.name}
                            </h3>
                            <span className="font-bold">
                              {item.price.toFixed(2)} د.م
                            </span>
                          </div>

                          <div className="flex justify-end space-x-reverse space-x-2 mt-4">
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1"
                            >
                              <Edit className="h-4 w-4" />
                              <span>تعديل</span>
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              className="gap-1"
                            >
                              <Trash className="h-4 w-4" />
                              <span>حذف</span>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {/* Users Management */}
          {activeTab === "users" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">إدارة المستخدمين</h2>
                <div className="flex items-center space-x-reverse space-x-2">
                  <div className="relative">
                    <Search className="h-4 w-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="بحث..."
                      className="pl-3 pr-9 w-[200px]"
                    />
                  </div>
                  <Button
                    className="gap-1"
                    onClick={() => setNewUserDialog(true)}
                  >
                    <Plus className="h-4 w-4" />
                    <span>إضافة مستخدم جديد</span>
                  </Button>
                </div>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-6 bg-muted/50 p-3 text-sm font-medium">
                      <div>الاسم</div>
                      <div>رقم الهاتف</div>
                      <div>البريد الإلكتروني</div>
                      <div>رصيد العملات</div>
                      <div>الحالة</div>
                      <div>الإجراءات</div>
                    </div>
                    {[
                      {
                        id: "1",
                        name: "محمد أحمد",
                        phone: "+212 612345678",
                        email: "mohamed@example.com",
                        coins: 750,
                        active: true,
                      },
                      {
                        id: "2",
                        name: "فاطمة علي",
                        phone: "+212 698765432",
                        email: "fatima@example.com",
                        coins: 320,
                        active: true,
                      },
                      {
                        id: "3",
                        name: "أحمد محمود",
                        phone: "+212 654321987",
                        email: "ahmed@example.com",
                        coins: 520,
                        active: true,
                      },
                      {
                        id: "4",
                        name: "سارة خالد",
                        phone: "+212 632145698",
                        email: "sara@example.com",
                        coins: 180,
                        active: false,
                      },
                      {
                        id: "5",
                        name: "خالد محمد",
                        phone: "+212 687654321",
                        email: "khaled@example.com",
                        coins: 420,
                        active: true,
                      },
                    ].map((user) => (
                      <div
                        key={user.id}
                        className="grid grid-cols-6 p-3 text-sm border-t hover:bg-muted/50 transition-colors"
                      >
                        <div>{user.name}</div>
                        <div>{user.phone}</div>
                        <div>{user.email}</div>
                        <div>{user.coins}</div>
                        <div>
                          <Badge
                            className={
                              user.active ? "bg-green-500" : "bg-red-500"
                            }
                          >
                            {user.active ? "مفعل" : "غير مفعل"}
                          </Badge>
                        </div>
                        <div className="flex space-x-reverse space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Reports & Analytics */}
          {activeTab === "reports" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>تقرير الطلبات</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            عدد الطلبات اليومية
                          </span>
                          <span className="font-medium">24</span>
                        </div>
                        <Progress value={80} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            عدد الطلبات الأسبوعية
                          </span>
                          <span className="font-medium">142</span>
                        </div>
                        <Progress value={65} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            عدد الطلبات الشهرية
                          </span>
                          <span className="font-medium">587</span>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>

                      <div className="pt-4 border-t">
                        <h4 className="font-medium mb-2">
                          أكثر الأصناف طلباً:
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span>برجر كلاسيكي</span>
                            <span className="text-sm text-muted-foreground">
                              156 طلب
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>بيتزا بيبروني</span>
                            <span className="text-sm text-muted-foreground">
                              129 طلب
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>سلطة سيزر</span>
                            <span className="text-sm text-muted-foreground">
                              92 طلب
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>تقرير بطاقات الولاء</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            عدد البطاقات النشطة
                          </span>
                          <span className="font-medium">156</span>
                        </div>
                        <Progress value={70} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            عدد الطوابع المجموعة
                          </span>
                          <span className="font-medium">1,245</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>

                      <div className="pt-4 border-t">
                        <h4 className="font-medium mb-2">
                          أكثر البطاقات استخداماً:
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span>عشاق القهوة</span>
                            <span className="text-sm text-muted-foreground">
                              78 مستخدم
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>نادي السندويشات</span>
                            <span className="text-sm text-muted-foreground">
                              52 مستخدم
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>بطاقة المشروبات الخاصة</span>
                            <span className="text-sm text-muted-foreground">
                              26 مستخدم
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>تقرير الهدايا السريعة</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            عدد الهدايا النشطة
                          </span>
                          <span className="font-medium">45</span>
                        </div>
                        <Progress value={60} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            عدد الهدايا المستخدمة
                          </span>
                          <span className="font-medium">128</span>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>

                      <div className="pt-4 border-t">
                        <h4 className="font-medium mb-2">
                          أكثر الهدايا استخداماً:
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span>حلوى مجانية</span>
                            <span className="text-sm text-muted-foreground">
                              56 مرة
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>خصم 10%</span>
                            <span className="text-sm text-muted-foreground">
                              42 مرة
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>مشروب مجاني</span>
                            <span className="text-sm text-muted-foreground">
                              30 مرة
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>تقرير العملات</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            عدد الأكواد الموزعة
                          </span>
                          <span className="font-medium">320</span>
                        </div>
                        <Progress value={80} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            عدد الأكواد المستخدمة
                          </span>
                          <span className="font-medium">245</span>
                        </div>
                        <Progress value={65} className="h-2" />
                      </div>

                      <div className="pt-4 border-t">
                        <h4 className="font-medium mb-2">توزيع قيم الأكواد:</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span>50 عملة</span>
                            <span className="text-sm text-muted-foreground">
                              85 كود
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>100 عملة</span>
                            <span className="text-sm text-muted-foreground">
                              120 كود
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>200 عملة</span>
                            <span className="text-sm text-muted-foreground">
                              65 كود
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>300 عملة</span>
                            <span className="text-sm text-muted-foreground">
                              50 كود
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Dialogs */}
      <Dialog open={newCardDialog} onOpenChange={setNewCardDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>إضافة بطاقة ولاء جديدة</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="card-name">اسم البطاقة</Label>
              <Input id="card-name" placeholder="أدخل اسم البطاقة" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="total-stamps">عدد الطوابع المطلوبة</Label>
              <Input
                id="total-stamps"
                type="number"
                placeholder="أدخل عدد الطوابع"
              />
            </div>
            <div className="space-y-2">
              <Label>مراحل المكافآت</Label>
              <div className="space-y-2">
                <div className="flex space-x-reverse space-x-2">
                  <Input placeholder="عدد الطوابع" className="w-1/3" />
                  <Input placeholder="المكافأة" className="w-2/3" />
                </div>
                <div className="flex space-x-reverse space-x-2">
                  <Input placeholder="عدد الطوابع" className="w-1/3" />
                  <Input placeholder="المكافأة" className="w-2/3" />
                </div>
                <div className="flex space-x-reverse space-x-2">
                  <Input placeholder="عدد الطوابع" className="w-1/3" />
                  <Input placeholder="المكافأة" className="w-2/3" />
                </div>
              </div>
              <Button variant="outline" size="sm" className="mt-2 gap-1">
                <Plus className="h-4 w-4" />
                <span>إضافة مرحلة</span>
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewCardDialog(false)}>
              إلغاء
            </Button>
            <Button onClick={() => setNewCardDialog(false)}>إنشاء بطاقة</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={newGiftDialog} onOpenChange={setNewGiftDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>إضافة هدية سريعة جديدة</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="gift-name">اسم الهدية</Label>
              <Input id="gift-name" placeholder="أدخل اسم الهدية" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gift-desc">وصف الهدية</Label>
              <Input id="gift-desc" placeholder="أدخل وصف الهدية" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gift-image">صورة الهدية</Label>
              <Input id="gift-image" type="file" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gift-expiry">تاريخ الصلاحية</Label>
              <Input id="gift-expiry" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gift-type">نوع الهدية</Label>
              <select
                id="gift-type"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="discount">خصم</option>
                <option value="free-item">وجبة مجانية</option>
                <option value="free-drink">مشروب مجاني</option>
                <option value="free-dessert">حلوى مجانية</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewGiftDialog(false)}>
              إلغاء
            </Button>
            <Button onClick={() => setNewGiftDialog(false)}>إنشاء هدية</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={newCodeDialog} onOpenChange={setNewCodeDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>إضافة كود عملات جديد</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="code-value">قيمة الكود</Label>
              <Input
                id="code-value"
                type="number"
                placeholder="أدخل قيمة الكود"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="code-number">رقم الكود</Label>
              <Input
                id="code-number"
                placeholder="سيتم توليده تلقائياً"
                disabled
                value="12345"
              />
              <p className="text-xs text-muted-foreground">
                سيتم توليد رقم الكود تلقائياً عند الإنشاء
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewCodeDialog(false)}>
              إلغاء
            </Button>
            <Button onClick={() => setNewCodeDialog(false)}>إنشاء كود</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={newCategoryDialog} onOpenChange={setNewCategoryDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>إضافة تصنيف جديد</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="category-name">اسم التصنيف</Label>
              <Input id="category-name" placeholder="أدخل اسم التصنيف" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category-icon">أيقونة التصنيف</Label>
              <select
                id="category-icon"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="utensils">أدوات الطعام</option>
                <option value="pizza">بيتزا</option>
                <option value="salad">سلطة</option>
                <option value="cake">كعكة</option>
                <option value="coffee">قهوة</option>
                <option value="utensils-crossed">أدوات متقاطعة</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setNewCategoryDialog(false)}
            >
              إلغاء
            </Button>
            <Button onClick={() => setNewCategoryDialog(false)}>
              إنشاء تصنيف
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={newItemDialog} onOpenChange={setNewItemDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>إضافة صنف جديد</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="item-category">التصنيف</Label>
              <select
                id="item-category"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="1">برجر</option>
                <option value="2">بيتزا</option>
                <option value="3">سلطات</option>
                <option value="4">حلويات</option>
                <option value="5">مشروبات</option>
                <option value="6">جانبية</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="item-name">اسم الصنف</Label>
              <Input id="item-name" placeholder="أدخل اسم الصنف" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="item-price">السعر</Label>
              <Input
                id="item-price"
                type="number"
                placeholder="أدخل سعر الصنف"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="item-coins">العملات المكافئة</Label>
              <Input
                id="item-coins"
                type="number"
                placeholder="أدخل عدد العملات"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="item-desc">الوصف</Label>
              <Input id="item-desc" placeholder="أدخل وصف الصنف" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="item-ingredients">المكونات</Label>
              <Input
                id="item-ingredients"
                placeholder="أدخل المكونات مفصولة بفواصل"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="item-image">صورة الصنف</Label>
              <Input id="item-image" type="file" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewItemDialog(false)}>
              إلغاء
            </Button>
            <Button onClick={() => setNewItemDialog(false)}>إنشاء صنف</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={newUserDialog} onOpenChange={setNewUserDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>إضافة مستخدم جديد</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="user-name">الاسم</Label>
              <Input id="user-name" placeholder="أدخل اسم المستخدم" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="user-phone">رقم الهاتف</Label>
              <Input id="user-phone" placeholder="أدخل رقم الهاتف" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="user-email">البريد الإلكتروني (اختياري)</Label>
              <Input
                id="user-email"
                type="email"
                placeholder="أدخل البريد الإلكتروني"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="user-pin">رمز PIN</Label>
              <Input
                id="user-pin"
                placeholder="سيتم توليده تلقائياً"
                disabled
                value="1234"
              />
              <p className="text-xs text-muted-foreground">
                سيتم توليد رمز PIN تلقائياً عند الإنشاء
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewUserDialog(false)}>
              إلغاء
            </Button>
            <Button onClick={() => setNewUserDialog(false)}>
              إنشاء مستخدم
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
