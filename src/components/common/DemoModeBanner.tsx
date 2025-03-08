import React from "react";
import { AlertTriangle } from "lucide-react";
import { useDemoMode } from "@/context/DemoModeContext";

const DemoModeBanner: React.FC = () => {
  const { isDemoMode } = useDemoMode();

  if (!isDemoMode) return null;

  return (
    <div className="bg-amber-50 border-b border-amber-200 py-2 px-4 text-amber-800 text-sm text-center">
      <AlertTriangle className="inline-block h-4 w-4 mr-1" />
      <span>
        وضع العرض التجريبي: البيانات المعروضة هي بيانات تجريبية للفحص فقط
      </span>
    </div>
  );
};

export default DemoModeBanner;
