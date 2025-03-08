import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart4,
  Calendar,
  Download,
  TrendingUp,
  Clock,
  Stamp,
  Gift,
  Coins,
} from "lucide-react";

const ReportsAnalytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const [timeRange, setTimeRange] = useState("week");

  const handleExportReport = (reportType: string) => {
    // In a real app, this would generate and download a report
    console.log(`Exporting ${reportType} report for ${timeRange} range`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">التقارير والإحصائيات</h2>
        <div className="flex items-center space-x-reverse space-x-2">
          <select
            className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="day">اليوم</option>
            <option value="week">الأسبوع</option>
            <option value="month">الشهر</option>
            <option value="year">السنة</option>
          </select>
          <Button variant="outline" className="gap-1">
            <Calendar className="h-4 w-4" />
            <span>تحديد فترة</span>
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl mb-6">
          <TabsTrigger value="orders" className="gap-1">
            <BarChart4 className="h-4 w-4" />
            <span>الطلبات</span>
          </TabsTrigger>
          <TabsTrigger value="loyalty" className="gap-1">
            <Stamp className="h-4 w-4" />
            <span>بطاقات الولاء</span>
          </TabsTrigger>
          <TabsTrigger value="gifts" className="gap-1">
            <Gift className="h-4 w-4" />
            <span>الهدايا السريعة</span>
          </TabsTrigger>
          <TabsTrigger value="coins" className="gap-1">
            <Coins className="h-4 w-4" />
            <span>العملات</span>
          </TabsTrigger>
        </TabsList>

        {/* Orders Report Tab */}
        <TabsContent value="orders">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">عدد الطلبات</p>
                  <p className="text-3xl font-bold">587</p>
                  <div className="flex items-center text-green-600 text-sm mt-1">
                    <TrendingUp className="h-3 w-3 ml-1" />
                    <span>+12% عن الفترة السابقة</span>
                  </div>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <BarChart4 className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    إجمالي المبيعات
                  </p>
                  <p className="text-3xl font-bold">58,450 د.م</p>
                  <div className="flex items-center text-green-600 text-sm mt-1">
                    <TrendingUp className="h-3 w-3 ml-1" />
                    <span>+8% عن الفترة السابقة</span>
                  </div>
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
                    متوسط وقت التحضير
                  </p>
                  <p className="text-3xl font-bold">18 دقيقة</p>
                  <div className="flex items-center text-red-600 text-sm mt-1">
                    <TrendingUp className="h-3 w-3 ml-1" />
                    <span>+2 دقيقة عن الفترة السابقة</span>
                  </div>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <Clock className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>توزيع الطلبات</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1"
                    onClick={() => handleExportReport("orders")}
                  >
                    <Download className="h-4 w-4" />
                    <span>تصدير</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">طلبات جديدة</span>
                      <span className="font-medium">24 (4%)</span>
                    </div>
                    <Progress value={4} className="h-2 bg-gray-100" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">قيد التحضير</span>
                      <span className="font-medium">18 (3%)</span>
                    </div>
                    <Progress value={3} className="h-2 bg-gray-100" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">جاري التوصيل</span>
                      <span className="font-medium">12 (2%)</span>
                    </div>
                    <Progress value={2} className="h-2 bg-gray-100" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">تم التسليم</span>
                      <span className="font-medium">520 (89%)</span>
                    </div>
                    <Progress value={89} className="h-2 bg-gray-100" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">ملغية</span>
                      <span className="font-medium">13 (2%)</span>
                    </div>
                    <Progress value={2} className="h-2 bg-gray-100" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>أكثر الأصناف مبيعاً</CardTitle>
                  <Badge variant="outline">
                    {timeRange === "day"
                      ? "اليوم"
                      : timeRange === "week"
                        ? "الأسبوع"
                        : timeRange === "month"
                          ? "الشهر"
                          : "السنة"}
                  </Badge>
                </div>
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
                    {
                      name: "برجر بالجبن",
                      category: "برجر",
                      sales: 65,
                      percentage: 35,
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
                      <Progress value={product.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Loyalty Cards Report Tab */}
        <TabsContent value="loyalty">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    بطاقات الولاء النشطة
                  </p>
                  <p className="text-3xl font-bold">156</p>
                  <div className="flex items-center text-green-600 text-sm mt-1">
                    <TrendingUp className="h-3 w-3 ml-1" />
                    <span>+15% عن الفترة السابقة</span>
                  </div>
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
                    عدد الطوابع المجموعة
                  </p>
                  <p className="text-3xl font-bold">1,245</p>
                  <div className="flex items-center text-green-600 text-sm mt-1">
                    <TrendingUp className="h-3 w-3 ml-1" />
                    <span>+22% عن الفترة السابقة</span>
                  </div>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <Stamp className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    المكافآت المستخدمة
                  </p>
                  <p className="text-3xl font-bold">87</p>
                  <div className="flex items-center text-green-600 text-sm mt-1">
                    <TrendingUp className="h-3 w-3 ml-1" />
                    <span>+10% عن الفترة السابقة</span>
                  </div>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <Gift className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>أكثر البطاقات استخداماً</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1"
                    onClick={() => handleExportReport("loyalty")}
                  >
                    <Download className="h-4 w-4" />
                    <span>تصدير</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "عشاق القهوة", users: 78, percentage: 85 },
                    { name: "نادي السندويشات", users: 52, percentage: 70 },
                    {
                      name: "بطاقة المشروبات الخاصة",
                      users: 26,
                      percentage: 50,
                    },
                  ].map((card, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{card.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {card.users} مستخدم
                          </p>
                        </div>
                        <p className="font-medium">{card.percentage}%</p>
                      </div>
                      <Progress value={card.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>توزيع الطوابع</CardTitle>
                  <Badge variant="outline">
                    {timeRange === "day"
                      ? "اليوم"
                      : timeRange === "week"
                        ? "الأسبوع"
                        : timeRange === "month"
                          ? "الشهر"
                          : "السنة"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">عشاق القهوة</span>
                      <span className="font-medium">520 (42%)</span>
                    </div>
                    <Progress value={42} className="h-2 bg-gray-100" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">نادي السندويشات</span>
                      <span className="font-medium">380 (30%)</span>
                    </div>
                    <Progress value={30} className="h-2 bg-gray-100" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">بطاقة المشروبات الخاصة</span>
                      <span className="font-medium">220 (18%)</span>
                    </div>
                    <Progress value={18} className="h-2 bg-gray-100" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">بطاقات أخرى</span>
                      <span className="font-medium">125 (10%)</span>
                    </div>
                    <Progress value={10} className="h-2 bg-gray-100" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Gifts Report Tab */}
        <TabsContent value="gifts">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    عدد الهدايا النشطة
                  </p>
                  <p className="text-3xl font-bold">45</p>
                  <div className="flex items-center text-green-600 text-sm mt-1">
                    <TrendingUp className="h-3 w-3 ml-1" />
                    <span>+5 عن الفترة السابقة</span>
                  </div>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Gift className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    عدد الهدايا المستخدمة
                  </p>
                  <p className="text-3xl font-bold">128</p>
                  <div className="flex items-center text-green-600 text-sm mt-1">
                    <TrendingUp className="h-3 w-3 ml-1" />
                    <span>+18% عن الفترة السابقة</span>
                  </div>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <Gift className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    نسبة استخدام الهدايا
                  </p>
                  <p className="text-3xl font-bold">74%</p>
                  <div className="flex items-center text-green-600 text-sm mt-1">
                    <TrendingUp className="h-3 w-3 ml-1" />
                    <span>+8% عن الفترة السابقة</span>
                  </div>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <BarChart4 className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>أكثر الهدايا استخداماً</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1"
                    onClick={() => handleExportReport("gifts")}
                  >
                    <Download className="h-4 w-4" />
                    <span>تصدير</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "حلوى مجانية", uses: 56, percentage: 85 },
                    { name: "خصم 10%", uses: 42, percentage: 70 },
                    { name: "مشروب مجاني", uses: 30, percentage: 50 },
                  ].map((gift, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{gift.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {gift.uses} مرة
                          </p>
                        </div>
                        <p className="font-medium">{gift.percentage}%</p>
                      </div>
                      <Progress value={gift.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>توزيع أنواع الهدايا</CardTitle>
                  <Badge variant="outline">
                    {timeRange === "day"
                      ? "اليوم"
                      : timeRange === "week"
                        ? "الأسبوع"
                        : timeRange === "month"
                          ? "الشهر"
                          : "السنة"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">خصومات</span>
                      <span className="font-medium">65 (45%)</span>
                    </div>
                    <Progress value={45} className="h-2 bg-gray-100" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">مشروبات مجانية</span>
                      <span className="font-medium">42 (30%)</span>
                    </div>
                    <Progress value={30} className="h-2 bg-gray-100" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">حلويات مجانية</span>
                      <span className="font-medium">25 (18%)</span>
                    </div>
                    <Progress value={18} className="h-2 bg-gray-100" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">وجبات مجانية</span>
                      <span className="font-medium">10 (7%)</span>
                    </div>
                    <Progress value={7} className="h-2 bg-gray-100" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Coins Report Tab */}
        <TabsContent value="coins">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    عدد الأكواد الموزعة
                  </p>
                  <p className="text-3xl font-bold">320</p>
                  <div className="flex items-center text-green-600 text-sm mt-1">
                    <TrendingUp className="h-3 w-3 ml-1" />
                    <span>+15% عن الفترة السابقة</span>
                  </div>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Coins className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    عدد الأكواد المستخدمة
                  </p>
                  <p className="text-3xl font-bold">245</p>
                  <div className="flex items-center text-green-600 text-sm mt-1">
                    <TrendingUp className="h-3 w-3 ml-1" />
                    <span>+12% عن الفترة السابقة</span>
                  </div>
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
                    نسبة استخدام الأكواد
                  </p>
                  <p className="text-3xl font-bold">76%</p>
                  <div className="flex items-center text-green-600 text-sm mt-1">
                    <TrendingUp className="h-3 w-3 ml-1" />
                    <span>+5% عن الفترة السابقة</span>
                  </div>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <BarChart4 className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>توزيع قيم الأكواد</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1"
                    onClick={() => handleExportReport("coins")}
                  >
                    <Download className="h-4 w-4" />
                    <span>تصدير</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">50 عملة</span>
                      <span className="font-medium">45 (15%)</span>
                    </div>
                    <Progress value={15} className="h-2 bg-gray-100" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">100 عملة</span>
                      <span className="font-medium">120 (40%)</span>
                    </div>
                    <Progress value={40} className="h-2 bg-gray-100" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">200 عملة</span>
                      <span className="font-medium">90 (30%)</span>
                    </div>
                    <Progress value={30} className="h-2 bg-gray-100" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">أكثر من 200 عملة</span>
                      <span className="font-medium">45 (15%)</span>
                    </div>
                    <Progress value={15} className="h-2 bg-gray-100" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>حالة استخدام الأكواد</CardTitle>
                  <Badge variant="outline">
                    {timeRange === "day"
                      ? "اليوم"
                      : timeRange === "week"
                        ? "الأسبوع"
                        : timeRange === "month"
                          ? "الشهر"
                          : "السنة"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "أكواد مستخدمة", count: 245, percentage: 76 },
                    { name: "أكواد غير مستخدمة", count: 75, percentage: 24 },
                  ].map((status, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{status.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {status.count} كود
                          </p>
                        </div>
                        <p className="font-medium">{status.percentage}%</p>
                      </div>
                      <Progress value={status.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsAnalytics;
