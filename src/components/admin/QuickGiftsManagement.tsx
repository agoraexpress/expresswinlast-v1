import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
import { Plus, Edit, X, Calendar, Check } from "lucide-react";

interface Gift {
  id: string;
  name: string;
  description: string;
  code: string;
  expiryDate: string;
  imageUrl: string;
  type?: string;
  active?: boolean;
}

const QuickGiftsManagement: React.FC = () => {
  const [newGiftDialog, setNewGiftDialog] = useState(false);
  const [editGiftDialog, setEditGiftDialog] = useState<Gift | null>(null);

  // Form state for new gift
  const [newGiftName, setNewGiftName] = useState("");
  const [newGiftDescription, setNewGiftDescription] = useState("");
  const [newGiftExpiryDate, setNewGiftExpiryDate] = useState("");
  const [newGiftType, setNewGiftType] = useState("discount");

  // Mock gifts data
  const [gifts, setGifts] = useState<Gift[]>([
    {
      id: "1",
      name: "حلوى مجانية",
      description: "احصل على حلوى مجانية مع أي طبق رئيسي",
      code: "12345",
      expiryDate: "2023-12-15",
      imageUrl:
        "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=300&q=80",
      type: "free-dessert",
      active: true,
    },
    {
      id: "2",
      name: "خصم 10%",
      description: "خصم 10% على طلبك التالي",
      code: "67890",
      expiryDate: "2023-11-30",
      imageUrl:
        "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=300&q=80",
      type: "discount",
      active: true,
    },
    {
      id: "3",
      name: "مشروب مجاني",
      description: "احصل على مشروب مجاني مع أي وجبة",
      code: "54321",
      expiryDate: "2023-12-31",
      imageUrl:
        "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300&q=80",
      type: "free-drink",
      active: true,
    },
  ]);

  const handleCreateGift = () => {
    // In a real app, this would create a new gift in the backend
    console.log("Creating new gift:", {
      name: newGiftName,
      description: newGiftDescription,
      expiryDate: newGiftExpiryDate,
      type: newGiftType,
    });
    setNewGiftDialog(false);
    resetNewGiftForm();
  };

  const resetNewGiftForm = () => {
    setNewGiftName("");
    setNewGiftDescription("");
    setNewGiftExpiryDate("");
    setNewGiftType("discount");
  };

  const handleEditGift = (gift: Gift) => {
    setEditGiftDialog(gift);
  };

  const handleSaveGiftEdit = () => {
    // In a real app, this would update the gift in the backend
    console.log("Saving gift edits:", editGiftDialog);
    setEditGiftDialog(null);
  };

  const handleDeactivateGift = (giftId: string) => {
    // In a real app, this would deactivate the gift in the backend
    console.log(`Deactivating gift ${giftId}`);
  };

  const handleDuplicateGift = (giftId: string) => {
    // In a real app, this would duplicate the gift with a new code
    const newCode = Math.floor(10000 + Math.random() * 90000).toString();
    console.log(`Duplicating gift ${giftId} with new code ${newCode}`);
    alert(`تم تكرار الهدية برقم جديد: ${newCode}`);
  };

  const handleUseGift = (gift: Gift) => {
    // Mark gift as used (inactive)
    const updatedGifts = gifts.map((g) => {
      if (g.id === gift.id) {
        return { ...g, active: false };
      }
      return g;
    });
    setGifts(updatedGifts);
    alert(`تم استخدام الهدية: ${gift.name}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">إدارة الهدايا السريعة</h2>
        <Button className="gap-1" onClick={() => setNewGiftDialog(true)}>
          <Plus className="h-4 w-4" />
          <span>إضافة هدية جديدة</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {gifts.map((gift) => (
          <Card key={gift.id} className="overflow-hidden">
            <div className="h-40 w-full relative">
              <img
                src={gift.imageUrl}
                alt={gift.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2">
                <Badge className="bg-primary/90 text-white shadow-sm">
                  رقم الهدية: {gift.code}
                </Badge>
              </div>
              {gift.active === false && (
                <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
                  <Badge className="bg-red-500 text-white text-lg py-1 px-3">
                    غير نشطة
                  </Badge>
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg">{gift.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {gift.description}
              </p>
              <div className="flex items-center text-sm text-muted-foreground mt-2">
                <Calendar className="ml-1 h-3 w-3" />
                <span>تنتهي الصلاحية: {gift.expiryDate}</span>
              </div>

              <div className="flex justify-between items-center mt-4">
                <Badge
                  className={
                    gift.active === false ? "bg-red-500" : "bg-green-500"
                  }
                >
                  {gift.active === false ? "مستخدمة" : "نشطة"}
                </Badge>
                <div className="flex space-x-reverse space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1"
                    onClick={() => handleEditGift(gift)}
                  >
                    <Edit className="h-4 w-4" />
                    <span>تعديل</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1"
                    onClick={() => handleDuplicateGift(gift.id)}
                  >
                    <Plus className="h-4 w-4" />
                    <span>تكرار</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 bg-blue-50 text-blue-600 hover:bg-blue-100"
                    onClick={() => handleUseGift(gift)}
                    disabled={gift.active === false}
                  >
                    <Check className="h-4 w-4" />
                    <span>استخدام</span>
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="gap-1"
                    onClick={() => handleDeactivateGift(gift.id)}
                    disabled={gift.active === false}
                  >
                    <X className="h-4 w-4" />
                    <span>حظر</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* New Gift Dialog */}
      <Dialog open={newGiftDialog} onOpenChange={setNewGiftDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>إضافة هدية سريعة جديدة</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="gift-name">اسم الهدية</Label>
              <Input
                id="gift-name"
                placeholder="أدخل اسم الهدية"
                value={newGiftName}
                onChange={(e) => setNewGiftName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gift-desc">وصف الهدية</Label>
              <Input
                id="gift-desc"
                placeholder="أدخل وصف الهدية"
                value={newGiftDescription}
                onChange={(e) => setNewGiftDescription(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gift-image">صورة الهدية</Label>
              <Input id="gift-image" type="file" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gift-expiry">تاريخ الصلاحية</Label>
              <Input
                id="gift-expiry"
                type="date"
                value={newGiftExpiryDate}
                onChange={(e) => setNewGiftExpiryDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gift-type">نوع الهدية</Label>
              <select
                id="gift-type"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={newGiftType}
                onChange={(e) => setNewGiftType(e.target.value)}
              >
                <option value="discount">خصم</option>
                <option value="free-item">وجبة مجانية</option>
                <option value="free-drink">مشروب مجاني</option>
                <option value="free-dessert">حلوى مجانية</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewGiftDialog(false)}>
              إلغاء
            </Button>
            <Button onClick={handleCreateGift}>إنشاء هدية</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Gift Dialog */}
      <Dialog
        open={!!editGiftDialog}
        onOpenChange={() => setEditGiftDialog(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>تعديل الهدية</DialogTitle>
          </DialogHeader>
          {editGiftDialog && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-gift-name">اسم الهدية</Label>
                <Input
                  id="edit-gift-name"
                  value={editGiftDialog.name}
                  onChange={(e) =>
                    setEditGiftDialog({
                      ...editGiftDialog,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-gift-desc">وصف الهدية</Label>
                <Input
                  id="edit-gift-desc"
                  value={editGiftDialog.description}
                  onChange={(e) =>
                    setEditGiftDialog({
                      ...editGiftDialog,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-gift-image">صورة الهدية</Label>
                <div className="h-40 w-full mb-2 rounded-md overflow-hidden">
                  <img
                    src={editGiftDialog.imageUrl}
                    alt={editGiftDialog.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <Input id="edit-gift-image" type="file" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-gift-expiry">تاريخ الصلاحية</Label>
                <Input
                  id="edit-gift-expiry"
                  type="date"
                  value={editGiftDialog.expiryDate}
                  onChange={(e) =>
                    setEditGiftDialog({
                      ...editGiftDialog,
                      expiryDate: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-gift-type">نوع الهدية</Label>
                <select
                  id="edit-gift-type"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={editGiftDialog.type}
                  onChange={(e) =>
                    setEditGiftDialog({
                      ...editGiftDialog,
                      type: e.target.value,
                    })
                  }
                >
                  <option value="discount">خصم</option>
                  <option value="free-item">وجبة مجانية</option>
                  <option value="free-drink">مشروب مجاني</option>
                  <option value="free-dessert">حلوى مجانية</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-gift-status">الحالة</Label>
                <select
                  id="edit-gift-status"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={editGiftDialog.active ? "active" : "inactive"}
                  onChange={(e) =>
                    setEditGiftDialog({
                      ...editGiftDialog,
                      active: e.target.value === "active",
                    })
                  }
                >
                  <option value="active">نشطة</option>
                  <option value="inactive">غير نشطة</option>
                </select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditGiftDialog(null)}>
              إلغاء
            </Button>
            <Button onClick={handleSaveGiftEdit}>حفظ التغييرات</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuickGiftsManagement;
