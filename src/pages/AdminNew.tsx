import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import OrderManagement from "@/components/admin/OrderManagement";
import LoyaltyCardManagement from "@/components/admin/LoyaltyCardManagement";
import QuickGiftsManagement from "@/components/admin/QuickGiftsManagement";
import CoinsManagement from "@/components/admin/CoinsManagement";
import MenuManagement from "@/components/admin/MenuManagement";
import UserManagement from "@/components/admin/UserManagement";
import ReportsAnalytics from "@/components/admin/ReportsAnalytics";
import KitchenDisplay from "@/components/admin/KitchenDisplay";

const AdminNew: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    // Check if user is admin
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    if (!isAdmin) {
      navigate("/admin-login");
    }
  }, [navigate]);

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <ReportsAnalytics />;
      case "orders":
        return <OrderManagement />;
      case "loyalty":
        return <LoyaltyCardManagement />;
      case "gifts":
        return <QuickGiftsManagement />;
      case "coins":
        return <CoinsManagement />;
      case "menu":
        return <MenuManagement />;
      case "users":
        return <UserManagement />;
      case "reports":
        return <ReportsAnalytics />;
      case "kitchen":
        return <KitchenDisplay />;
      case "firebase":
        return <FirebaseManager />;
      case "api":
        return <ApiManager />;
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-lg text-muted-foreground">
              قسم {activeTab} قيد التطوير
            </p>
          </div>
        );
    }
  };

  return (
    <AdminLayout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      notificationCount={{ orders: 2 }}
    >
      {renderContent()}
    </AdminLayout>
  );
};

export default AdminNew;
