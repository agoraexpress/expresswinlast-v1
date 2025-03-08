import React from "react";
import Navbar from "@/components/layout/Navbar";
import LoyaltyTabs from "@/components/loyalty/LoyaltyTabs";

const Loyalty: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activePage="loyalty" />

      <main className="container mx-auto px-4 pt-[90px] pb-10">
        <div className="flex flex-col gap-6 max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-2">
            <h1 className="text-3xl font-bold text-gray-900">
              Loyalty Rewards
            </h1>
            <p className="text-gray-600">
              Manage your stamp cards, quick gifts, and coins
            </p>
          </div>

          {/* Loyalty Tabs */}
          <section>
            <LoyaltyTabs />
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2023 FlavorLoyalty. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="text-sm hover:text-primary">
              Privacy Policy
            </a>
            <a href="#" className="text-sm hover:text-primary">
              Terms of Service
            </a>
            <a href="#" className="text-sm hover:text-primary">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Loyalty;
