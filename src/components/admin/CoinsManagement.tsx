import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Plus, Edit, Copy, Check } from "lucide-react";

interface CoinCode {
  id: string;
  code: string;
  value: number;
  used: boolean;
}

const CoinsManagement: React.FC = () => {
  const [newCodeDialog, setNewCodeDialog] = useState(false);
  const [editCodeDialog, setEditCodeDialog] = useState<CoinCode | null>(null);
  const [newCodeValue, setNewCodeValue] = useState("100");
  const [generatedCode, setGeneratedCode] = useState("");
  const [showCopySuccess, setShowCopySuccess] = useState(false);

  // Mock codes data
  const codes: CoinCode[] = [
    { id: "1", code: "12345", value: 100, used: false },
    { id: "2", code: "67890", value: 200, used: false },
    { id: "3", code: "54321", value: 50, used: true },
    { id: "4", code: "09876", value: 150, used: false },
    { id: "5", code: "13579", value: 75, used: false },
    { id: "6", code: "24680", value: 125, used: true },
    { id: "7", code: "11223", value: 300, used: false },
    { id: "8", code: "44556", value: 250, used: false },
    { id: "9", code: "99887", value: 175, used: false },
    { id: "10", code: "55443", value: 225, used: true },
    { id: "11", code: "33221", value: 80, used: false },
    { id: "12", code: "77889", value: 120, used: false },
  ];

  const handleCreateCode = () => {
    // Generate a random 5-digit code
    const randomCode = Math.floor(10000 + Math.random() * 90000).toString();
    setGeneratedCode(randomCode);

    // In a real app, this would create a new code in the backend
    console.log("Creating new code:", {
      value: parseInt(newCodeValue),
      code: randomCode,
    });
  };

  const handleSaveCode = () => {
    // In a real app, this would save the code to the backend
    console.log("Saving code:", {
      value: parseInt(newCodeValue),
      code: generatedCode,
    });
    setNewCodeDialog(false);
    setNewCodeValue("100");
    setGeneratedCode("");
  };

  const handleEditCode = (code: CoinCode) => {
    setEditCodeDialog(code);
  };

  const handleSaveCodeEdit = () => {
    // In a real app, this would update the code in the backend
    console.log("Saving code edits:", editCodeDialog);
    setEditCodeDialog(null);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setShowCopySuccess(true);
    setTimeout(() => setShowCopySuccess(false), 2000);
  };

  const handleDuplicateCode = (code: CoinCode) => {
    // Generate a new random code
    const randomCode = Math.floor(10000 + Math.random() * 90000).toString();

    // In a real app, this would create a duplicate code with a new code number
    console.log("Duplicating code:", {
      ...code,
      code: randomCode,
      used: false,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">إدارة العملات</h2>
        <Button className="gap-1" onClick={() => setNewCodeDialog(true)}>
          <Plus className="h-4 w-4" />
          <span>إضافة كود جديد</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>الأكواد النشطة</CardTitle>
            <div className="flex items-center space-x-reverse space-x-2">
              <Badge variant="outline" className="bg-green-50 text-green-700">
                {codes.filter((c) => !c.used).length} كود نشط
              </Badge>
              <Badge variant="outline" className="bg-gray-50 text-gray-700">
                {codes.filter((c) => c.used).length} كود مستخدم
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {codes.map((code) => (
              <div
                key={code.id}
                className={`border rounded-lg p-4 ${code.used ? "bg-gray-100 opacity-70" : "bg-white"}`}
              >
                <div className="flex justify-between items-center mb-2">
                  <Badge
                    variant="outline"
                    className={code.used ? "bg-gray-200" : "bg-blue-50"}
                  >
                    {code.code}
                  </Badge>
                  <Badge className={code.used ? "bg-gray-500" : "bg-green-500"}>
                    {code.used ? "مستخدم" : "نشط"}
                  </Badge>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{code.value}</p>
                  <p className="text-xs text-muted-foreground">عملة</p>
                </div>
                {!code.used && (
                  <div className="flex justify-center space-x-reverse space-x-2 mt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => handleEditCode(code)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => handleCopyCode(code.code)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => handleDuplicateCode(code)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* New Code Dialog */}
      <Dialog open={newCodeDialog} onOpenChange={setNewCodeDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>إضافة كود عملات جديد</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="code-value">قيمة الكود</Label>
              <Input
                id="code-value"
                type="number"
                placeholder="أدخل قيمة الكود"
                value={newCodeValue}
                onChange={(e) => setNewCodeValue(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="code-number">رقم الكود</Label>
              <div className="flex space-x-reverse space-x-2">
                <Input
                  id="code-number"
                  placeholder="سيتم توليده تلقائياً"
                  disabled
                  value={generatedCode}
                  className="flex-1"
                />
                <Button onClick={handleCreateCode} type="button">
                  توليد
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                اضغط على زر "توليد" لإنشاء رقم كود عشوائي
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewCodeDialog(false)}>
              إلغاء
            </Button>
            <Button
              onClick={handleSaveCode}
              disabled={!generatedCode || parseInt(newCodeValue) <= 0}
            >
              إنشاء كود
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Code Dialog */}
      <Dialog
        open={!!editCodeDialog}
        onOpenChange={() => setEditCodeDialog(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>تعديل كود العملات</DialogTitle>
          </DialogHeader>
          {editCodeDialog && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-code-value">قيمة الكود</Label>
                <Input
                  id="edit-code-value"
                  type="number"
                  value={editCodeDialog.value}
                  onChange={(e) =>
                    setEditCodeDialog({
                      ...editCodeDialog,
                      value: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-code-number">رقم الكود</Label>
                <Input
                  id="edit-code-number"
                  value={editCodeDialog.code}
                  disabled
                />
                <p className="text-xs text-muted-foreground">
                  لا يمكن تغيير رقم الكود بعد إنشائه
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-code-status">حالة الكود</Label>
                <select
                  id="edit-code-status"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={editCodeDialog.used ? "used" : "active"}
                  onChange={(e) =>
                    setEditCodeDialog({
                      ...editCodeDialog,
                      used: e.target.value === "used",
                    })
                  }
                >
                  <option value="active">نشط</option>
                  <option value="used">مستخدم</option>
                </select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditCodeDialog(null)}>
              إلغاء
            </Button>
            <Button onClick={handleSaveCodeEdit}>حفظ التغييرات</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Copy Success Toast */}
      {showCopySuccess && (
        <div className="fixed bottom-4 right-4 bg-green-100 border border-green-200 text-green-800 px-4 py-2 rounded-md shadow-md flex items-center space-x-reverse space-x-2">
          <Check className="h-4 w-4" />
          <span>تم نسخ الكود بنجاح</span>
        </div>
      )}
    </div>
  );
};

export default CoinsManagement;
