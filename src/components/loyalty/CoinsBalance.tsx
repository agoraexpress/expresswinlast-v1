import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Coins, Plus, Check, X } from "lucide-react";
import { t } from "@/i18n";

interface CoinTransaction {
  id: string;
  code: string;
  amount: number;
  date: string;
  status: "success" | "pending" | "failed";
}

const CoinsBalance = () => {
  const [balance, setBalance] = useState(750);
  const [transactions, setTransactions] = useState<CoinTransaction[]>([
    {
      id: "1",
      code: "WELCOME50",
      amount: 500,
      date: "2023-10-15",
      status: "success",
    },
    {
      id: "2",
      code: "BIRTHDAY25",
      amount: 250,
      date: "2023-11-01",
      status: "success",
    },
  ]);

  const [coinCode, setCoinCode] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAddCoins = () => {
    if (coinCode.trim() === "") return;

    // In a real app, this would validate the code against the backend
    // For demo purposes, we'll just add 100 coins
    const newTransaction: CoinTransaction = {
      id: (transactions.length + 1).toString(),
      code: coinCode,
      amount: 100,
      date: new Date().toISOString().split("T")[0],
      status: "success",
    };

    setTransactions([newTransaction, ...transactions]);
    setBalance(balance + 100);
    setCoinCode("");
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">{t("yourCoins")}</h3>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus size={16} />
              <span>{t("addCoins")}</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("addCoinsTitle")}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <p className="text-sm text-muted-foreground">
                {t("addCoinsDesc")}
              </p>
              <Input
                placeholder={t("enterCoinCode")}
                value={coinCode}
                onChange={(e) => setCoinCode(e.target.value)}
              />
              <Button onClick={handleAddCoins} className="w-full">
                {t("verifyAndAddCoins")}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-blue-50 rounded-lg p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <Coins className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-slate-500">{t("availableBalance")}</p>
            <p className="text-3xl font-bold">{balance}</p>
          </div>
        </div>
        <Button variant="outline" className="border-blue-200 hover:bg-blue-100">
          {t("useCoins")}
        </Button>
      </div>

      <div className="mt-8">
        <h4 className="font-medium text-lg mb-4">{t("transactionHistory")}</h4>

        {transactions.length === 0 ? (
          <div className="text-center py-8 border rounded-lg bg-gray-50">
            <p className="text-muted-foreground">{t("noTransactions")}</p>
          </div>
        ) : (
          <div className="border rounded-lg overflow-hidden">
            <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 font-medium text-sm">
              <div>{t("code")}</div>
              <div>{t("date")}</div>
              <div>{t("amount")}</div>
              <div>{t("status")}</div>
            </div>
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="grid grid-cols-4 gap-4 p-4 border-t text-sm"
              >
                <div className="font-medium">{transaction.code}</div>
                <div>{transaction.date}</div>
                <div>+{transaction.amount}</div>
                <div>
                  {transaction.status === "success" ? (
                    <span className="flex items-center text-green-600">
                      <Check className="h-4 w-4 ml-1" /> {t("success")}
                    </span>
                  ) : transaction.status === "pending" ? (
                    <span className="flex items-center text-yellow-600">
                      <span className="h-2 w-2 bg-yellow-500 rounded-full ml-2"></span>{" "}
                      {t("pending")}
                    </span>
                  ) : (
                    <span className="flex items-center text-red-600">
                      <X className="h-4 w-4 ml-1" /> {t("failed")}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoinsBalance;
