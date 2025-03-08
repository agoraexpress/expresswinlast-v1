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
import {
  Plus,
  Edit,
  Trash,
  Search,
  Filter,
  User,
  Mail,
  Phone,
  Copy,
  Check,
  MessageSquare,
} from "lucide-react";

interface UserData {
  id: string;
  name: string;
  phone: string;
  email?: string;
  coins: number;
  activeGifts: number;
  active: boolean;
  pin?: string;
}

const UserManagement: React.FC = () => {
  const [newUserDialog, setNewUserDialog] = useState(false);
  const [editUserDialog, setEditUserDialog] = useState<UserData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCopySuccess, setShowCopySuccess] = useState(false);

  // Form state for new user
  const [newUserName, setNewUserName] = useState("");
  const [newUserPhone, setNewUserPhone] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [generatedPin, setGeneratedPin] = useState("");

  // Mock users data
  const users: UserData[] = [
    {
      id: "1",
      name: "محمد أحمد",
      phone: "+212 612345678",
      email: "mohamed@example.com",
      coins: 750,
      activeGifts: 2,
      active: true,
    },
    {
      id: "2",
      name: "فاطمة علي",
      phone: "+212 698765432",
      email: "fatima@example.com",
      coins: 320,
      activeGifts: 1,
      active: true,
    },
    {
      id: "3",
      name: "أحمد محمود",
      phone: "+212 654321987",
      email: "ahmed@example.com",
      coins: 520,
      activeGifts: 0,
      active: true,
    },
    {
      id: "4",
      name: "سارة خالد",
      phone: "+212 632145698",
      email: "sara@example.com",
      coins: 180,
      activeGifts: 1,
      active: false,
    },
    {
      id: "5",
      name: "خالد محمد",
      phone: "+212 687654321",
      email: "khaled@example.com",
      coins: 420,
      activeGifts: 0,
      active: true,
    },
  ];

  const handleGeneratePin = () => {
    // Generate a random 4-digit PIN
    const randomPin = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedPin(randomPin);
  };

  const handleCreateUser = () => {
    // In a real app, this would create a new user in the backend
    console.log("Creating new user:", {
      name: newUserName,
      phone: newUserPhone,
      email: newUserEmail || undefined,
      pin: generatedPin,
    });
    setNewUserDialog(false);
    resetNewUserForm();
  };

  const resetNewUserForm = () => {
    setNewUserName("");
    setNewUserPhone("");
    setNewUserEmail("");
    setGeneratedPin("");
  };

  const handleEditUser = (user: UserData) => {
    setEditUserDialog(user);
  };

  const handleSaveUserEdit = () => {
    // In a real app, this would update the user in the backend
    console.log("Saving user edits:", editUserDialog);
    setEditUserDialog(null);
  };

  const handleDeleteUser = (userId: string) => {
    // In a real app, this would delete the user from the backend
    console.log(`Deleting user ${userId}`);
  };

  const handleCopyPin = (pin: string) => {
    navigator.clipboard.writeText(pin);
    setShowCopySuccess(true);
    setTimeout(() => setShowCopySuccess(false), 2000);
  };

  const handleSendPinViaWhatsApp = (user: UserData) => {
    // Generate PIN if not exists
    const pin = user.pin || Math.floor(1000 + Math.random() * 9000).toString();

    // Create WhatsApp message with PIN
    const message = `مرحباً ${user.name}،\n\nرمز PIN الخاص بك في تطبيق فليفر لويالتي هو: ${pin}\n\nيرجى الاحتفاظ بهذا الرمز لاستخدامه عند تسجيل الدخول.\n\nشكراً لاستخدامك تطبيقنا!`;

    // Open WhatsApp with the message
    window.open(
      `https://wa.me/${user.phone.replace(/\s+/g, "")}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  const filteredUsers = searchQuery
    ? users.filter(
        (user) =>
          user.name.includes(searchQuery) ||
          user.phone.includes(searchQuery) ||
          (user.email && user.email.includes(searchQuery)),
      )
    : users;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">إدارة المستخدمين</h2>
        <div className="flex items-center space-x-reverse space-x-2">
          <div className="relative">
            <Search className="h-4 w-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="بحث..."
              className="pl-3 pr-9 w-[200px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button className="gap-1" onClick={() => setNewUserDialog(true)}>
            <Plus className="h-4 w-4" />
            <span>إضافة مستخدم جديد</span>
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="rounded-md border">
            <div className="grid grid-cols-7 bg-muted/50 p-3 text-sm font-medium">
              <div>الاسم</div>
              <div>رقم الهاتف</div>
              <div>البريد الإلكتروني</div>
              <div>رصيد العملات</div>
              <div>الهدايا النشطة</div>
              <div>الحالة</div>
              <div>الإجراءات</div>
            </div>
            {filteredUsers.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground">
                لا توجد نتائج مطابقة للبحث
              </div>
            ) : (
              filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="grid grid-cols-7 p-3 text-sm border-t hover:bg-muted/50 transition-colors"
                >
                  <div>{user.name}</div>
                  <div>{user.phone}</div>
                  <div>{user.email || "-"}</div>
                  <div>{user.coins}</div>
                  <div>{user.activeGifts}</div>
                  <div>
                    <Badge
                      className={user.active ? "bg-green-500" : "bg-red-500"}
                    >
                      {user.active ? "مفعل" : "غير مفعل"}
                    </Badge>
                  </div>
                  <div className="flex space-x-reverse space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => handleEditUser(user)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-blue-500 hover:text-blue-600"
                      onClick={() => handleSendPinViaWhatsApp(user)}
                    >
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* New User Dialog */}
      <Dialog open={newUserDialog} onOpenChange={setNewUserDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>إضافة مستخدم جديد</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="user-name">الاسم</Label>
              <Input
                id="user-name"
                placeholder="أدخل اسم المستخدم"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="user-phone">رقم الهاتف</Label>
              <Input
                id="user-phone"
                placeholder="أدخل رقم الهاتف"
                value={newUserPhone}
                onChange={(e) => setNewUserPhone(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="user-email">البريد الإلكتروني (اختياري)</Label>
              <Input
                id="user-email"
                type="email"
                placeholder="أدخل البريد الإلكتروني"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="user-pin">رمز PIN</Label>
              <div className="flex space-x-reverse space-x-2">
                <Input
                  id="user-pin"
                  placeholder="سيتم توليده تلقائياً"
                  disabled
                  value={generatedPin}
                  className="flex-1"
                />
                <Button onClick={handleGeneratePin} type="button">
                  توليد
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                اضغط على زر "توليد" لإنشاء رمز PIN عشوائي مكون من 4 أرقام
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewUserDialog(false)}>
              إلغاء
            </Button>
            <Button
              onClick={handleCreateUser}
              disabled={
                !newUserName.trim() || !newUserPhone.trim() || !generatedPin
              }
            >
              إنشاء مستخدم
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog
        open={!!editUserDialog}
        onOpenChange={() => setEditUserDialog(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>تعديل بيانات المستخدم</DialogTitle>
          </DialogHeader>
          {editUserDialog && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-user-name">الاسم</Label>
                <Input
                  id="edit-user-name"
                  value={editUserDialog.name}
                  onChange={(e) =>
                    setEditUserDialog({
                      ...editUserDialog,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-user-phone">رقم الهاتف</Label>
                <Input
                  id="edit-user-phone"
                  value={editUserDialog.phone}
                  onChange={(e) =>
                    setEditUserDialog({
                      ...editUserDialog,
                      phone: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-user-email">
                  البريد الإلكتروني (اختياري)
                </Label>
                <Input
                  id="edit-user-email"
                  type="email"
                  value={editUserDialog.email || ""}
                  onChange={(e) =>
                    setEditUserDialog({
                      ...editUserDialog,
                      email: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-user-coins">رصيد العملات</Label>
                <Input
                  id="edit-user-coins"
                  type="number"
                  value={editUserDialog.coins}
                  onChange={(e) =>
                    setEditUserDialog({
                      ...editUserDialog,
                      coins: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-user-status">حالة الحساب</Label>
                <select
                  id="edit-user-status"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={editUserDialog.active ? "active" : "inactive"}
                  onChange={(e) =>
                    setEditUserDialog({
                      ...editUserDialog,
                      active: e.target.value === "active",
                    })
                  }
                >
                  <option value="active">مفعل</option>
                  <option value="inactive">غير مفعل</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-user-pin">إعادة تعيين رمز PIN</Label>
                <div className="flex space-x-reverse space-x-2">
                  <Input
                    id="edit-user-pin"
                    placeholder="اضغط على زر التوليد لإعادة تعيين الرمز"
                    disabled
                    value={editUserDialog.pin || ""}
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      editUserDialog.pin && handleCopyPin(editUserDialog.pin)
                    }
                    disabled={!editUserDialog.pin}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => {
                      const newPin = Math.floor(
                        1000 + Math.random() * 9000,
                      ).toString();
                      setEditUserDialog({ ...editUserDialog, pin: newPin });
                    }}
                    type="button"
                  >
                    توليد
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  اضغط على زر "توليد" لإنشاء رمز PIN جديد للمستخدم
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditUserDialog(null)}>
              إلغاء
            </Button>
            <Button onClick={handleSaveUserEdit}>حفظ التغييرات</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Copy Success Toast */}
      {showCopySuccess && (
        <div className="fixed bottom-4 right-4 bg-green-100 border border-green-200 text-green-800 px-4 py-2 rounded-md shadow-md flex items-center space-x-reverse space-x-2">
          <Check className="h-4 w-4" />
          <span>تم نسخ الرمز بنجاح</span>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
