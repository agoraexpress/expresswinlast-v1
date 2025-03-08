import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Clock, ArrowUpRight, ShoppingBag, RefreshCw } from "lucide-react";
import { t } from "@/i18n";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  date: string;
  status: "delivered" | "processing" | "cancelled";
  total: number;
  items: OrderItem[];
}

interface RecentOrdersListProps {
  orders?: Order[];
}

const RecentOrdersList = ({
  orders = defaultOrders,
}: RecentOrdersListProps) => {
  return (
    <Card className="w-full bg-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold">الطلبات الأخيرة</CardTitle>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <span>عرض الكل</span>
          <ArrowUpRight className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <ShoppingBag className="h-12 w-12 text-muted-foreground mb-3" />
            <h3 className="text-lg font-medium">لا توجد طلبات حديثة</h3>
            <p className="text-sm text-muted-foreground mt-1">
              ستظهر طلباتك الأخيرة هنا
            </p>
            <Button className="mt-4">تصفح القائمة</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="rounded-lg border p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      طلب #{order.id.slice(-6)}
                    </span>
                    <Badge
                      variant={
                        order.status === "delivered"
                          ? "default"
                          : order.status === "processing"
                            ? "secondary"
                            : "destructive"
                      }
                      className="capitalize"
                    >
                      {order.status}
                    </Badge>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    <span>{order.date}</span>
                  </div>
                </div>

                <div className="space-y-1 mb-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>
                        {item.quantity}x {item.name}
                      </span>
                      <span>${item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="font-medium">
                    الإجمالي: {order.total.toFixed(2)} د.م
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <RefreshCw className="h-3 w-3" />
                    <span>إعادة الطلب</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Default mock data
const defaultOrders: Order[] = [
  {
    id: "ORD123456",
    date: "Today, 2:30 PM",
    status: "delivered",
    total: 24.99,
    items: [
      { id: "item1", name: "Chicken Burger", quantity: 1, price: 12.99 },
      { id: "item2", name: "French Fries", quantity: 1, price: 4.5 },
      { id: "item3", name: "Soda", quantity: 1, price: 2.5 },
      { id: "item4", name: "Extra Sauce", quantity: 2, price: 2.5 },
    ],
  },
  {
    id: "ORD789012",
    date: "Yesterday, 7:15 PM",
    status: "processing",
    total: 32.75,
    items: [
      { id: "item5", name: "Veggie Pizza", quantity: 1, price: 18.99 },
      { id: "item6", name: "Garlic Bread", quantity: 1, price: 5.99 },
      { id: "item7", name: "Caesar Salad", quantity: 1, price: 7.77 },
    ],
  },
  {
    id: "ORD345678",
    date: "3 days ago",
    status: "cancelled",
    total: 15.5,
    items: [
      { id: "item8", name: "Beef Tacos", quantity: 2, price: 13.5 },
      { id: "item9", name: "Guacamole", quantity: 1, price: 2.0 },
    ],
  },
];

export default RecentOrdersList;
