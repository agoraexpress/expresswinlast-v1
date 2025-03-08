import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, Check, Bell, AlertTriangle } from "lucide-react";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  customizations?: string[];
}

interface Order {
  id: string;
  customer: string;
  items: OrderItem[];
  total: number;
  time: string;
  timestamp: number; // For timer calculation
}

const KitchenDisplay: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD123456",
      customer: "محمد أحمد",
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
      time: "منذ 2 دقيقة",
      timestamp: Date.now() - 2 * 60 * 1000,
    },
    {
      id: "ORD123455",
      customer: "فاطمة علي",
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
      time: "منذ 5 دقائق",
      timestamp: Date.now() - 5 * 60 * 1000,
    },
    {
      id: "ORD123454",
      customer: "أحمد محمود",
      items: [
        { name: "برجر بالجبن", quantity: 3, price: 99.99 },
        { name: "بطاطس مقلية", quantity: 2, price: 29.99 },
        { name: "عصير برتقال", quantity: 3, price: 19.99 },
      ],
      total: 389.93,
      time: "منذ 12 دقيقة",
      timestamp: Date.now() - 12 * 60 * 1000,
    },
  ]);

  const [timers, setTimers] = useState<Record<string, number>>({});
  const [playSound, setPlaySound] = useState(false);

  // Update timers every second
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const updatedTimers: Record<string, number> = {};

      orders.forEach((order) => {
        const elapsedSeconds = Math.floor((now - order.timestamp) / 1000);
        updatedTimers[order.id] = elapsedSeconds;
      });

      setTimers(updatedTimers);
    }, 1000);

    return () => clearInterval(interval);
  }, [orders]);

  // Play sound effect when new order arrives
  useEffect(() => {
    if (playSound) {
      // In a real app, this would play a sound
      console.log("Playing new order sound");
      // Reset the flag after playing
      setTimeout(() => setPlaySound(false), 1000);
    }
  }, [playSound]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleMarkAsPreparing = (orderId: string) => {
    // In a real app, this would update the order status in the backend
    setOrders(orders.filter((order) => order.id !== orderId));
  };

  // Simulate receiving a new order
  const handleAddNewOrder = () => {
    const newOrder: Order = {
      id: `ORD${Math.floor(100000 + Math.random() * 900000)}`,
      customer: "عمر خالد",
      items: [
        { name: "برجر بالجبن", quantity: 1, price: 99.99 },
        { name: "عصير برتقال", quantity: 1, price: 19.99 },
      ],
      total: 119.98,
      time: "الآن",
      timestamp: Date.now(),
    };

    setOrders([newOrder, ...orders]);
    setPlaySound(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">شاشة المطبخ</h2>
        <Button onClick={handleAddNewOrder} className="gap-2">
          <Bell className="h-4 w-4" />
          <span>محاكاة طلب جديد</span>
        </Button>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-gray-50">
          <Bell className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
          <h3 className="text-lg font-medium">لا توجد طلبات جديدة</h3>
          <p className="text-sm text-muted-foreground mt-1">
            ستظهر الطلبات الجديدة هنا فور وصولها
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders.map((order) => {
            const elapsedMinutes = Math.floor((timers[order.id] || 0) / 60);
            const isWarning = elapsedMinutes >= 10;

            return (
              <Card
                key={order.id}
                className={`overflow-hidden border-2 ${isWarning ? "border-red-500" : "border-blue-500"}`}
              >
                <CardHeader
                  className={`py-3 ${isWarning ? "bg-red-50" : "bg-blue-50"}`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-reverse space-x-2">
                      <Badge
                        variant="outline"
                        className={
                          isWarning
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                        }
                      >
                        {order.id}
                      </Badge>
                      <span className="font-medium">{order.customer}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Badge
                        variant="outline"
                        className={
                          isWarning
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                        }
                      >
                        <Clock className="h-3 w-3 ml-1" />
                        {timers[order.id]
                          ? formatTime(timers[order.id])
                          : "0:00"}
                      </Badge>
                      {isWarning && (
                        <AlertTriangle className="h-4 w-4 text-red-500 ml-1" />
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-1 mb-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="text-sm">
                        <div className="flex justify-between">
                          <span className="font-medium">
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

                  <Button
                    className={`w-full gap-1 ${isWarning ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
                    onClick={() => handleMarkAsPreparing(order.id)}
                  >
                    <Check className="h-4 w-4" />
                    <span>بدء التحضير</span>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default KitchenDisplay;
