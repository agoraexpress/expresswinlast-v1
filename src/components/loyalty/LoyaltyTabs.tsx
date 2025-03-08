import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import StampCards from "./StampCards";
import QuickGifts from "./QuickGifts";
import CoinsBalance from "./CoinsBalance";
import { t } from "@/i18n";
import { Stamp, Gift, Coins } from "lucide-react";

const LoyaltyTabs = () => {
  return (
    <Card className="w-full bg-white shadow-sm">
      <CardContent className="p-6">
        <Tabs defaultValue="stamps" className="w-full">
          <TabsList className="flex justify-around w-full space-x-reverse space-x-2 mb-8 border-0 bg-transparent">
            <TabsTrigger
              value="stamps"
              className="w-24 h-24 rounded-full flex flex-col items-center justify-center p-0 shadow-md data-[state=active]:shadow-lg data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-200 border-2 data-[state=active]:border-primary"
            >
              <Stamp className="h-10 w-10 mb-1" />
              <span className="text-sm font-medium">{t("stampCards")}</span>
            </TabsTrigger>
            <TabsTrigger
              value="gifts"
              className="w-24 h-24 rounded-full flex flex-col items-center justify-center p-0 shadow-md data-[state=active]:shadow-lg data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-200 border-2 data-[state=active]:border-primary"
            >
              <Gift className="h-10 w-10 mb-1" />
              <span className="text-sm font-medium">{t("quickGifts")}</span>
            </TabsTrigger>
            <TabsTrigger
              value="coins"
              className="w-24 h-24 rounded-full flex flex-col items-center justify-center p-0 shadow-md data-[state=active]:shadow-lg data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-200 border-2 data-[state=active]:border-primary"
            >
              <Coins className="h-10 w-10 mb-1" />
              <span className="text-sm font-medium">{t("coins")}</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="stamps">
            <StampCards />
          </TabsContent>
          <TabsContent value="gifts">
            <QuickGifts />
          </TabsContent>
          <TabsContent value="coins">
            <CoinsBalance />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LoyaltyTabs;
