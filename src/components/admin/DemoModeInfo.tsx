import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Info, Database, Server } from "lucide-react";

interface DemoModeInfoProps {
  isDemoMode: boolean;
}

const DemoModeInfo: React.FC<DemoModeInfoProps> = ({ isDemoMode }) => {
  return (
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
          <Badge className={isDemoMode ? "bg-amber-500" : "bg-green-500"}>
            {isDemoMode ? "تجريبي" : "إنتاج"}
          </Badge>
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
  );
};

export default DemoModeInfo;
