import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Database, Server, Info } from "lucide-react";
import { useDemoMode } from "@/context/DemoModeContext";

const DemoModeStoryboard: React.FC = () => {
  const { isDemoMode, setIsDemoMode } = useDemoMode();

  const handleToggleDemoMode = () => {
    const newDemoMode = !isDemoMode;
    setIsDemoMode(newDemoMode);
    localStorage.setItem("demoMode", newDemoMode ? "true" : "false");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">إعدادات وضع العرض التجريبي</h1>

      <Card className={isDemoMode ? "border-amber-300" : "border-green-300"}>
        <CardHeader
          className={`pb-2 ${isDemoMode ? "bg-amber-50" : "bg-green-50"}`}
        >
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg flex items-center gap-2">
              {isDemoMode ? (
                <>
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  <span>وضع العرض التجريبي</span>
                </>
              ) : (
                <>
                  <Server className="h-5 w-5 text-green-600" />
                  <span>وضع الإنتاج</span>
                </>
              )}
            </CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-sm">
                {isDemoMode ? "وضع العرض التجريبي" : "وضع الإنتاج"}
              </span>
              <Switch
                checked={!isDemoMode}
                onCheckedChange={handleToggleDemoMode}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Info
                className={`h-5 w-5 mt-0.5 ${isDemoMode ? "text-amber-600" : "text-green-600"}`}
              />
              <div>
                <h3 className="font-medium mb-1">
                  {isDemoMode
                    ? "معلومات وضع العرض التجريبي"
                    : "معلومات وضع الإنتاج"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {isDemoMode
                    ? "في وضع العرض التجريبي، يتم استخدام بيانات وهمية محلية لفحص وظائف التطبيق. لا يتم الاتصال بأي خدمات خارجية أو قواعد بيانات حقيقية."
                    : "في وضع الإنتاج، يتم الاتصال بقواعد البيانات الحقيقية وخدمات API. جميع البيانات والمعاملات حقيقية وتؤثر على النظام."}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Database
                className={`h-5 w-5 mt-0.5 ${isDemoMode ? "text-amber-600" : "text-green-600"}`}
              />
              <div>
                <h3 className="font-medium mb-1">مصدر البيانات</h3>
                <p className="text-sm text-muted-foreground">
                  {isDemoMode
                    ? "البيانات المعروضة هي بيانات تجريبية مخزنة محلياً في التطبيق. أي تغييرات تقوم بها لن يتم حفظها بشكل دائم."
                    : "البيانات المعروضة يتم جلبها من قاعدة البيانات الحقيقية. جميع التغييرات والإضافات يتم حفظها وتؤثر على النظام الفعلي."}
                </p>
              </div>
            </div>

            {isDemoMode && (
              <div className="bg-amber-50 p-3 rounded-md border border-amber-200">
                <p className="text-sm text-amber-800">
                  <AlertTriangle className="h-4 w-4 inline-block ml-1" />
                  تنبيه: أنت في وضع العرض التجريبي. لاستخدام بيانات حقيقية
                  والاتصال بقاعدة البيانات، يرجى التبديل إلى وضع الإنتاج.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button
          variant={isDemoMode ? "default" : "outline"}
          className="mx-2"
          onClick={() => setIsDemoMode(true)}
        >
          تفعيل وضع العرض التجريبي
        </Button>
        <Button
          variant={!isDemoMode ? "default" : "outline"}
          className="mx-2"
          onClick={() => setIsDemoMode(false)}
        >
          تفعيل وضع الإنتاج
        </Button>
      </div>

      <div className="mt-8 p-4 border rounded-lg">
        <h2 className="text-lg font-bold mb-4">حالة التطبيق الحالية</h2>
        <div className="space-y-2">
          <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
            <span>وضع العرض التجريبي:</span>
            <Badge className={isDemoMode ? "bg-amber-500" : "bg-gray-300"}>
              {isDemoMode ? "مفعل" : "غير مفعل"}
            </Badge>
          </div>
          <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
            <span>مصدر البيانات:</span>
            <Badge className={isDemoMode ? "bg-blue-500" : "bg-green-500"}>
              {isDemoMode ? "بيانات محلية" : "قاعدة بيانات حقيقية"}
            </Badge>
          </div>
          <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
            <span>حفظ التغييرات:</span>
            <Badge className={isDemoMode ? "bg-gray-500" : "bg-green-500"}>
              {isDemoMode ? "مؤقت (محلي فقط)" : "دائم (في قاعدة البيانات)"}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoModeStoryboard;
