import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
  Check,
  X,
  Clock,
  Truck,
  Search,
  Filter,
  User,
  Phone,
  MapPin,
  Gift,
  Stamp,
  Coins,
  MessageSquare,
} from "lucide-react";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  customizations?: string[];
}

interface Order {
  id: string;
  customer: string;
  phone: string;
  address: string;
  items: OrderItem[];
  total: number;
  time: string;
  elapsed?: string;
  date?: string;
  status?: "new" | "preparing" | "delivering" | "delivered" | "cancelled";
}

const OrderManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState("new");
  const [customerInfoDialog, setCustomerInfoDialog] = useState<Order | null>(
    null,
  );
  const [deliveryAgentDialog, setDeliveryAgentDialog] = useState<Order | null>(
    null,
  );
  const [deliveryAgentPhone, setDeliveryAgentPhone] = useState("");
  const [orderCompletedDialog, setOrderCompletedDialog] =
    useState<Order | null>(null);
  const [orders, setOrders] = useState({
    new: [
      {
        id: "ORD123456",
        customer: "محمد أحمد",
        phone: "+212 612345678",
        address: "شارع الحسن الثاني، الدار البيضاء",
        items: [
          {
            name: "برجر كلاسيكي",
            quantity: 2,
            price: 89.99,
            customizations: ["بدون بصل"],
          },
          { name: "بطاطس مقلية", quantity: 1, price: 29.99 },
          { name: "كولا", quantity: 2, price: 15.99 },
        ],
        total: 241.95,
        time: "منذ 5 دقائق",
        status: "new",
      },
      {
        id: "ORD123455",
        customer: "فاطمة علي",
        phone: "+212 698765432",
        address: "شارع محمد الخامس، الرباط",
        items: [
          { name: "بيتزا بيبروني", quantity: 1, price: 149.99 },
          {
            name: "سلطة سيزر",
            quantity: 1,
            price: 79.99,
            customizations: ["بدون صلصة"],
          },
        ],
        total: 229.98,
        time: "منذ 10 دقائق",
        status: "new",
      },
    ],
    preparing: [
      {
        id: "ORD123454",
        customer: "أحمد محمود",
        phone: "+212 654321987",
        address: "شارع الزرقطوني، الدار البيضاء",
        items: [
          { name: "برجر بالجبن", quantity: 3, price: 99.99 },
          { name: "بطاطس مقلية", quantity: 2, price: 29.99 },
          { name: "عصير برتقال", quantity: 3, price: 19.99 },
        ],
        total: 389.93,
        time: "15:20",
        elapsed: "12 دقيقة",
        status: "preparing",
      },
      {
        id: "ORD123453",
        customer: "ليلى محمد",
        phone: "+212 687654321",
        address: "شارع الاستقلال، طنجة",
        items: [
          { name: "بيتزا مارجريتا", quantity: 1, price: 129.99 },
          { name: "سلطة يونانية", quantity: 1, price: 69.99 },
          { name: "ماء معدني", quantity: 2, price: 9.99 },
        ],
        total: 219.96,
        time: "15:10",
        elapsed: "22 دقيقة",
        status: "preparing",
      },
    ],
    delivering: [
      {
        id: "ORD123452",
        customer: "سارة خالد",
        phone: "+212 632145698",
        address: "شارع الزرقطوني، الدار البيضاء",
        items: [
          { name: "برجر دجاج", quantity: 2, price: 79.99 },
          { name: "بطاطس مقلية", quantity: 1, price: 29.99 },
          { name: "كولا", quantity: 1, price: 15.99 },
        ],
        total: 205.96,
        time: "15:05",
        elapsed: "25 دقيقة",
        status: "delivering",
      },
    ],
    history: [
      {
        id: "ORD123451",
        customer: "خالد محمد",
        phone: "+212 687654321",
        address: "شارع الحسن الثاني، الدار البيضاء",
        items: [],
        total: 159.98,
        time: "",
        date: "2023-11-15",
        status: "delivered",
      },
      {
        id: "ORD123450",
        customer: "ليلى أحمد",
        phone: "+212 698765432",
        address: "شارع محمد الخامس، الرباط",
        items: [],
        total: 249.97,
        time: "",
        date: "2023-11-14",
        status: "delivered",
      },
      {
        id: "ORD123449",
        customer: "عمر علي",
        phone: "+212 654321987",
        address: "شارع الزرقطوني، الدار البيضاء",
        items: [],
        total: 189.99,
        time: "",
        date: "2023-11-14",
        status: "cancelled",
      },
      {
        id: "ORD123448",
        customer: "نور حسن",
        phone: "+212 632145698",
        address: "شارع الاستقلال، طنجة",
        items: [],
        total: 129.99,
        time: "",
        date: "2023-11-13",
        status: "delivered",
      },
      {
        id: "ORD123447",
        customer: "سعيد محمود",
        phone: "+212 687654321",
        address: "شارع الحسن الثاني، الدار البيضاء",
        items: [],
        total: 179.98,
        time: "",
        date: "2023-11-13",
        status: "delivered",
      },
    ],
  });

  const handleAcceptOrder = (orderId: string) => {
    // Find the order in the new orders list
    const orderToMove = orders.new.find((order) => order.id === orderId);
    if (!orderToMove) return;

    // Update the order status and add elapsed time
    const updatedOrder = {
      ...orderToMove,
      status: "preparing" as const,
      elapsed: "1 دقيقة",
    };

    // Remove from new orders and add to preparing orders
    setOrders({
      ...orders,
      new: orders.new.filter((order) => order.id !== orderId),
      preparing: [...orders.preparing, updatedOrder],
    });

    // Switch to preparing tab
    setActiveTab("preparing");
  };

  const handleRejectOrder = (orderId: string) => {
    // Find the order in the new orders list
    const orderToMove = orders.new.find((order) => order.id === orderId);
    if (!orderToMove) return;

    // Update the order status
    const updatedOrder = {
      ...orderToMove,
      status: "cancelled" as const,
      date: new Date().toISOString().split("T")[0],
    };

    // Remove from new orders and add to history
    setOrders({
      ...orders,
      new: orders.new.filter((order) => order.id !== orderId),
      history: [updatedOrder, ...orders.history],
    });
  };

  const handleMarkAsReady = (orderId: string) => {
    // Find the order in the preparing orders list
    const orderToMove = orders.preparing.find((order) => order.id === orderId);
    if (!orderToMove) return;

    // Update the order status
    const updatedOrder = {
      ...orderToMove,
      status: "delivering" as const,
    };

    // Remove from preparing orders and add to delivering orders
    setOrders({
      ...orders,
      preparing: orders.preparing.filter((order) => order.id !== orderId),
      delivering: [...orders.delivering, updatedOrder],
    });

    // Switch to delivering tab
    setActiveTab("delivering");
  };

  const handleMarkAsDelivered = (orderId: string) => {
    // Find the order in the delivering orders list
    const orderToMove = orders.delivering.find((order) => order.id === orderId);
    if (!orderToMove) return;

    // Update the order status
    const updatedOrder = {
      ...orderToMove,
      status: "delivered" as const,
      date: new Date().toISOString().split("T")[0],
    };

    // Remove from delivering orders and add to history
    setOrders({
      ...orders,
      delivering: orders.delivering.filter((order) => order.id !== orderId),
      history: [updatedOrder, ...orders.history],
    });

    // Switch to history tab
    setActiveTab("history");
  };

  const handleNotifyDeliveryAgent = (order: Order) => {
    setDeliveryAgentDialog(order);
  };

  const handleSendToDeliveryAgent = () => {
    if (!deliveryAgentDialog) return;

    // In a real app, this would send a WhatsApp message to the delivery agent
    const orderDetails = `رقم الطلب: ${deliveryAgentDialog.id}\nالعميل: ${deliveryAgentDialog.customer}\nالعنوان: ${deliveryAgentDialog.address}\nالهاتف: ${deliveryAgentDialog.phone}\nالإجمالي: ${deliveryAgentDialog.total.toFixed(2)} د.م`;

    const whatsappUrl = `https://wa.me/${deliveryAgentPhone.replace(/\s+/g, "")}?text=${encodeURIComponent(orderDetails)}`;
    window.open(whatsappUrl, "_blank");

    // Close dialog
    setDeliveryAgentDialog(null);
    setDeliveryAgentPhone("");
  };

  const handleCompleteOrder = (order: Order) => {
    setOrderCompletedDialog(order);
  };

  const handleFinalizeOrder = () => {
    if (!orderCompletedDialog) return;

    // Mark the order as delivered
    handleMarkAsDelivered(orderCompletedDialog.id);

    // Close the dialog
    setOrderCompletedDialog(null);
  };

  const handleShowCustomerInfo = (order: Order) => {
    setCustomerInfoDialog(order);
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl mb-6">
          <TabsTrigger value="new" className="relative">
            جديدة
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white">
              {orders.new.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="preparing" className="relative">
            قيد التحضير
            <Badge className="absolute -top-2 -right-2 bg-yellow-500 text-white">
              {orders.preparing.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="delivering" className="relative">
            جاري التوصيل
            <Badge className="absolute -top-2 -right-2 bg-purple-500 text-white">
              {orders.delivering.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="history">سجل الطلبات</TabsTrigger>
        </TabsList>

        {/* New Orders Tab */}
        <TabsContent value="new" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {orders.new.map((order) => (
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
                      <span className="font-medium">{order.customer}</span>
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
                          <div key={index}>
                            <div className="flex justify-between text-sm">
                              <span>
                                {item.quantity}x {item.name}
                              </span>
                              <span>{item.price.toFixed(2)} د.م</span>
                            </div>
                            {item.customizations &&
                              item.customizations.length > 0 && (
                                <div className="text-xs text-red-500 mr-4">
                                  {item.customizations.map(
                                    (customization, idx) => (
                                      <div key={idx}>- {customization}</div>
                                    ),
                                  )}
                                </div>
                              )}
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
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">معلومات العميل:</h4>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1"
                          onClick={() => handleShowCustomerInfo(order)}
                        >
                          <User className="h-4 w-4" />
                          <span>عرض المعلومات</span>
                        </Button>
                      </div>
                      <div className="space-y-1 text-sm">
                        <p>
                          <span className="text-muted-foreground ml-1">
                            الاسم:
                          </span>
                          {order.customer}
                        </p>
                        <p className="truncate">
                          <span className="text-muted-foreground ml-1">
                            العنوان:
                          </span>
                          {order.address}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-reverse space-x-2 mt-4">
                    <Button
                      variant="outline"
                      className="gap-1"
                      onClick={() => handleRejectOrder(order.id)}
                    >
                      <X className="h-4 w-4" />
                      <span>رفض</span>
                    </Button>
                    <Button
                      className="gap-1 bg-green-600 hover:bg-green-700"
                      onClick={() => handleAcceptOrder(order.id)}
                    >
                      <Check className="h-4 w-4" />
                      <span>قبول</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="gap-1"
                      onClick={() => {
                        // Create WhatsApp message for order acceptance
                        const message = `مرحباً ${order.customer}،\n\nنود إبلاغك بأنه تم قبول طلبك رقم ${order.id} وبدأنا في تحضيره.\n\nسيتم إعلامك عندما يكون الطلب جاهزاً للتوصيل.\n\nشكراً لاختيارك فليفر لويالتي!`;
                        window.open(
                          `https://wa.me/${order.phone.replace(/\s+/g, "")}?text=${encodeURIComponent(message)}`,
                          "_blank",
                        );
                      }}
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>إبلاغ العميل</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {orders.new.length === 0 && (
              <div className="text-center py-12 border rounded-lg bg-gray-50">
                <h3 className="text-lg font-medium">لا توجد طلبات جديدة</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  ستظهر الطلبات الجديدة هنا فور وصولها
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Preparing Orders Tab */}
        <TabsContent value="preparing" className="space-y-4">
          <div className="flex flex-col gap-4">
            {orders.preparing.map((order) => (
              <Card key={order.id} className="overflow-hidden w-full">
                <CardHeader
                  className={`py-3 ${parseInt(order.elapsed?.split(" ")[0] || "0") >= 15 ? "bg-red-50" : "bg-yellow-50"}`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-reverse space-x-2">
                      <Badge
                        variant="outline"
                        className="bg-yellow-100 text-yellow-800"
                      >
                        {order.id}
                      </Badge>
                      <span className="font-medium">{order.customer}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Badge
                        variant="outline"
                        className={
                          parseInt(order.elapsed?.split(" ")[0] || "0") >= 15
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }
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
                      <div key={index}>
                        <div className="flex justify-between text-sm">
                          <span>
                            {item.quantity}x {item.name}
                          </span>
                          <span>
                            {(item.price * item.quantity).toFixed(2)} د.م
                          </span>
                        </div>
                        {item.customizations &&
                          item.customizations.length > 0 && (
                            <div className="text-xs text-red-500 mr-4">
                              {item.customizations.map((customization, idx) => (
                                <div key={idx}>- {customization}</div>
                              ))}
                            </div>
                          )}
                      </div>
                    ))}
                    <Separator className="my-2" />
                    <div className="flex justify-between font-medium">
                      <span>الإجمالي:</span>
                      <span>{order.total.toFixed(2)} د.م</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1"
                      onClick={() => handleShowCustomerInfo(order)}
                    >
                      <User className="h-4 w-4" />
                      <span>معلومات العميل</span>
                    </Button>
                    <Button
                      className="gap-1"
                      onClick={() => handleMarkAsReady(order.id)}
                    >
                      <Check className="h-4 w-4" />
                      <span>تم التحضير</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {orders.preparing.length === 0 && (
              <div className="text-center py-12 border rounded-lg bg-gray-50">
                <h3 className="text-lg font-medium">
                  لا توجد طلبات قيد التحضير
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  ستظهر الطلبات قيد التحضير هنا بعد قبولها
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Delivering Orders Tab */}
        <TabsContent value="delivering" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {orders.delivering.map((order) => (
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
                      <span className="font-medium">{order.customer}</span>
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
                      <p className="text-sm text-muted-foreground">العنوان:</p>
                      <p>{order.address}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">الإجمالي:</p>
                      <p className="font-medium">
                        {order.total.toFixed(2)} د.م
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1"
                      onClick={() => handleShowCustomerInfo(order)}
                    >
                      <User className="h-4 w-4" />
                      <span>معلومات العميل</span>
                    </Button>
                    <div className="flex space-x-reverse space-x-2">
                      <Button
                        variant="outline"
                        className="gap-1"
                        onClick={() => handleNotifyDeliveryAgent(order)}
                      >
                        <Truck className="h-4 w-4" />
                        <span>إبلاغ عامل التوصيل</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="gap-1"
                        onClick={() => {
                          // Create WhatsApp message to notify customer about delivery
                          const message = `مرحباً ${order.customer}،\n\nنود إبلاغك بأن طلبك رقم ${order.id} في طريقه إليك الآن.\n\nالوقت المتوقع للوصول: 15-20 دقيقة.\n\nشكراً لاختيارك فليفر لويالتي!`;
                          window.open(
                            `https://wa.me/${order.phone.replace(/\s+/g, "")}?text=${encodeURIComponent(message)}`,
                            "_blank",
                          );
                        }}
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span>إبلاغ العميل</span>
                      </Button>
                      <Button
                        className="gap-1 bg-green-600 hover:bg-green-700"
                        onClick={() => handleCompleteOrder(order)}
                      >
                        <Check className="h-4 w-4" />
                        <span>تم التسليم</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {orders.delivering.length === 0 && (
              <div className="text-center py-12 border rounded-lg bg-gray-50">
                <h3 className="text-lg font-medium">
                  لا توجد طلبات جاري توصيلها
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  ستظهر الطلبات جاري توصيلها هنا بعد تحضيرها
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Order History Tab */}
        <TabsContent value="history">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">سجل الطلبات</h3>
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
                {orders.history.map((order) => (
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
                        {order.status === "delivered" ? "تم التسليم" : "ملغي"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Customer Info Dialog */}
      <Dialog
        open={!!customerInfoDialog}
        onOpenChange={() => setCustomerInfoDialog(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>معلومات العميل</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {customerInfoDialog && (
              <>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <h4 className="font-medium">الاسم:</h4>
                  </div>
                  <p className="text-lg">{customerInfoDialog.customer}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <h4 className="font-medium">رقم الهاتف:</h4>
                  </div>
                  <p className="text-lg">{customerInfoDialog.phone}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <h4 className="font-medium">العنوان:</h4>
                  </div>
                  <p className="text-lg">{customerInfoDialog.address}</p>
                </div>

                <div className="pt-2">
                  <Button
                    className="w-full gap-2"
                    variant="outline"
                    onClick={() => {
                      // In a real app, this would open WhatsApp with the customer's number
                      window.open(
                        `https://wa.me/${customerInfoDialog.phone.replace(/\s+/g, "")}`,
                        "_blank",
                      );
                    }}
                  >
                    <Phone className="h-4 w-4" />
                    <span>التواصل مع العميل</span>
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Delivery Agent Dialog */}
      <Dialog
        open={!!deliveryAgentDialog}
        onOpenChange={() => setDeliveryAgentDialog(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>إبلاغ عامل التوصيل</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {deliveryAgentDialog && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="delivery-agent-phone">
                    رقم هاتف عامل التوصيل
                  </Label>
                  <Input
                    id="delivery-agent-phone"
                    placeholder="أدخل رقم هاتف عامل التوصيل"
                    value={deliveryAgentPhone}
                    onChange={(e) => setDeliveryAgentPhone(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">تفاصيل الطلب:</h4>
                  <div className="bg-gray-50 p-3 rounded-md text-sm">
                    <p>
                      <span className="font-medium">رقم الطلب:</span>{" "}
                      {deliveryAgentDialog.id}
                    </p>
                    <p>
                      <span className="font-medium">العميل:</span>{" "}
                      {deliveryAgentDialog.customer}
                    </p>
                    <p>
                      <span className="font-medium">العنوان:</span>{" "}
                      {deliveryAgentDialog.address}
                    </p>
                    <p>
                      <span className="font-medium">الهاتف:</span>{" "}
                      {deliveryAgentDialog.phone}
                    </p>
                    <p>
                      <span className="font-medium">الإجمالي:</span>{" "}
                      {deliveryAgentDialog.total.toFixed(2)} د.م
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    className="w-full gap-2"
                    onClick={handleSendToDeliveryAgent}
                    disabled={!deliveryAgentPhone.trim()}
                  >
                    <Truck className="h-4 w-4" />
                    <span>إرسال تفاصيل الطلب</span>
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Order Completed Dialog */}
      <Dialog
        open={!!orderCompletedDialog}
        onOpenChange={() => setOrderCompletedDialog(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>إتمام الطلب</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {orderCompletedDialog && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">بطاقات الولاء</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="loyalty-card-number">رقم البطاقة</Label>
                        <Input
                          id="loyalty-card-number"
                          placeholder="أدخل رقم البطاقة"
                        />
                      </div>
                      <Button size="sm" className="w-full gap-1">
                        <Stamp className="h-4 w-4" />
                        <span>إضافة طابع</span>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">الهدايا</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="gift-code">رمز الهدية</Label>
                        <Input id="gift-code" placeholder="أدخل رمز الهدية" />
                      </div>
                      <Button size="sm" className="w-full gap-1">
                        <Gift className="h-4 w-4" />
                        <span>استخدام الهدية</span>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">العملات</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="coin-code">رمز العملات</Label>
                        <Input id="coin-code" placeholder="أدخل رمز العملات" />
                      </div>
                      <Button size="sm" className="w-full gap-1">
                        <Coins className="h-4 w-4" />
                        <span>إضافة عملات</span>
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <div className="pt-4 flex justify-end">
                  <Button
                    className="gap-1 bg-green-600 hover:bg-green-700"
                    onClick={handleFinalizeOrder}
                  >
                    <Check className="h-4 w-4" />
                    <span>إتمام الطلب</span>
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrderManagement;
