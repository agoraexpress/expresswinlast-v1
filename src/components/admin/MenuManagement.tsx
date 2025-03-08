import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
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
  Utensils,
  Pizza,
  Coffee,
  Salad,
  Cake,
  ChevronDown,
  Coins,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  coinValue: number;
  description?: string;
  ingredients?: string[];
  imageUrl: string;
}

interface Customization {
  id: string;
  name: string;
  price: number;
  type: "addon" | "removal";
}

const MenuManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState("categories");
  const [newCategoryDialog, setNewCategoryDialog] = useState(false);
  const [editCategoryDialog, setEditCategoryDialog] = useState<Category | null>(
    null,
  );
  const [newItemDialog, setNewItemDialog] = useState(false);
  const [editItemDialog, setEditItemDialog] = useState<MenuItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Form state for new category
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryIcon, setNewCategoryIcon] = useState("utensils");

  // Form state for new item
  const [newItemName, setNewItemName] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [newItemCoinValue, setNewItemCoinValue] = useState("");
  const [newItemDescription, setNewItemDescription] = useState("");
  const [newItemIngredients, setNewItemIngredients] = useState("");
  const [newItemCustomizations, setNewItemCustomizations] = useState<
    Customization[]
  >([
    { id: "1", name: "إضافة جبن", price: 5, type: "addon" },
    { id: "2", name: "بدون بصل", price: 0, type: "removal" },
  ]);
  const [isFlashSale, setIsFlashSale] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState("30");

  // Mock categories data
  const categories: Category[] = [
    { id: "1", name: "برجر", icon: <Utensils className="h-8 w-8" /> },
    { id: "2", name: "بيتزا", icon: <Pizza className="h-8 w-8" /> },
    { id: "3", name: "سلطات", icon: <Salad className="h-8 w-8" /> },
    { id: "4", name: "حلويات", icon: <Cake className="h-8 w-8" /> },
    { id: "5", name: "مشروبات", icon: <Coffee className="h-8 w-8" /> },
    { id: "6", name: "جانبية", icon: <Utensils className="h-8 w-8" /> },
  ];

  // Mock menu items data - synchronized with the items shown in the app interface
  const menuItems: MenuItem[] = [
    {
      id: "1",
      name: "برجر كلاسيكي",
      category: "برجر",
      price: 89.99,
      coinValue: 90,
      description: "برجر لحم بقري مع خس وطماطم وبصل ومخلل",
      ingredients: ["لحم بقري", "خس", "طماطم", "بصل", "مخلل", "صلصة خاصة"],
      imageUrl:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80",
    },
    {
      id: "2",
      name: "برجر بالجبن",
      category: "برجر",
      price: 99.99,
      coinValue: 100,
      description: "برجر لحم بقري مع جبن شيدر وخس وطماطم وبصل ومخلل",
      ingredients: [
        "لحم بقري",
        "جبن شيدر",
        "خس",
        "طماطم",
        "بصل",
        "مخلل",
        "صلصة خاصة",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=500&q=80",
    },
    {
      id: "flash1",
      name: "برجر دبل تشيز",
      category: "برجر",
      price: 59.99,
      coinValue: 60,
      description: "برجر لحم مزدوج مع طبقتين من الجبن الذائب والصلصة الخاصة",
      ingredients: ["لحم بقري", "جبن شيدر", "خس", "طماطم", "بصل", "صلصة خاصة"],
      imageUrl:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80",
    },
    {
      id: "5",
      name: "بيتزا مارجريتا",
      category: "بيتزا",
      price: 129.99,
      coinValue: 130,
      description: "بيتزا كلاسيكية مع صلصة طماطم وجبن موزاريلا وريحان",
      ingredients: [
        "عجينة",
        "صلصة طماطم",
        "جبن موزاريلا",
        "ريحان",
        "زيت زيتون",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&q=80",
    },
    {
      id: "flash2",
      name: "بيتزا سوبريم",
      category: "بيتزا",
      price: 89.99,
      coinValue: 90,
      description: "بيتزا محملة بالخضروات الطازجة واللحوم المشكلة والجبن",
      ingredients: [
        "عجينة",
        "صلصة طماطم",
        "جبن موزاريلا",
        "فلفل",
        "زيتون",
        "لحم مفروم",
        "فطر",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80",
    },
    {
      id: "7",
      name: "سلطة سيزر",
      category: "سلطات",
      price: 79.99,
      coinValue: 80,
      description: "خس روماني مع صلصة سيزر وقطع خبز محمص وجبن بارميزان",
      ingredients: ["خس روماني", "صلصة سيزر", "خبز محمص", "جبن بارميزان"],
      imageUrl:
        "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500&q=80",
    },
    {
      id: "flash3",
      name: "سلطة سيزر دجاج",
      category: "سلطات",
      price: 49.99,
      coinValue: 50,
      description: "سلطة خس رومين مع قطع دجاج مشوية وصلصة سيزر وخبز محمص",
      ingredients: [
        "خس روماني",
        "دجاج مشوي",
        "صلصة سيزر",
        "خبز محمص",
        "جبن بارميزان",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500&q=80",
    },
    {
      id: "9",
      name: "قهوة مثلجة",
      category: "مشروبات",
      price: 39.99,
      coinValue: 40,
      description: "قهوة مثلجة منعشة مع حليب وسكر",
      ingredients: ["قهوة", "حليب", "سكر", "ثلج"],
      imageUrl:
        "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=500&q=80",
    },
    {
      id: "flash4",
      name: "ميلك شيك شوكولاتة",
      category: "مشروبات",
      price: 29.99,
      coinValue: 30,
      description: "ميلك شيك كريمي بالشوكولاتة مع كريمة مخفوقة",
      ingredients: ["حليب", "آيس كريم", "شوكولاتة", "كريمة مخفوقة"],
      imageUrl:
        "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&q=80",
    },
    {
      id: "day1",
      name: "طبق كباب مشكل",
      category: "برجر",
      price: 129.99,
      coinValue: 130,
      description: "تشكيلة من الكباب المشوي مع الخضروات والأرز",
      ingredients: [
        "لحم غنم",
        "لحم بقري",
        "دجاج",
        "خضروات مشوية",
        "أرز",
        "صلصة طحينة",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=500&q=80",
    },
    {
      id: "day2",
      name: "سمك مشوي",
      category: "برجر",
      price: 149.99,
      coinValue: 150,
      description: "سمك طازج مشوي مع الأعشاب والليمون",
      ingredients: ["سمك", "ليمون", "أعشاب", "زيت زيتون", "ثوم"],
      imageUrl:
        "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&q=80",
    },
    {
      id: "day3",
      name: "باستا ألفريدو",
      category: "برجر",
      price: 99.99,
      coinValue: 100,
      description: "باستا كريمية مع صلصة الألفريدو والدجاج",
      ingredients: ["باستا", "كريمة", "دجاج", "جبن بارميزان", "ثوم"],
      imageUrl:
        "https://images.unsplash.com/photo-1645112411341-6c4fd023882c?w=500&q=80",
    },
  ];

  const handleCreateCategory = () => {
    // In a real app, this would create a new category in the backend
    console.log("Creating new category:", {
      name: newCategoryName,
      icon: newCategoryIcon,
    });
    setNewCategoryDialog(false);
    resetNewCategoryForm();
  };

  const resetNewCategoryForm = () => {
    setNewCategoryName("");
    setNewCategoryIcon("utensils");
  };

  const handleEditCategory = (category: Category) => {
    setEditCategoryDialog(category);
  };

  const handleSaveCategoryEdit = () => {
    // In a real app, this would update the category in the backend
    console.log("Saving category edits:", editCategoryDialog);
    setEditCategoryDialog(null);
  };

  const handleDeleteCategory = (categoryId: string) => {
    // In a real app, this would delete the category from the backend
    console.log(`Deleting category ${categoryId}`);
  };

  const handleCreateItem = () => {
    // In a real app, this would create a new menu item in the backend
    console.log("Creating new menu item:", {
      name: newItemName,
      category: newItemCategory,
      price: parseFloat(newItemPrice),
      coinValue: parseInt(newItemCoinValue),
      description: newItemDescription,
      ingredients: newItemIngredients.split(",").map((i) => i.trim()),
      customizations: newItemCustomizations,
      isFlashSale: isFlashSale,
      discountPercentage: isFlashSale ? parseInt(discountPercentage) : 0,
    });
    setNewItemDialog(false);
    resetNewItemForm();
  };

  const resetNewItemForm = () => {
    setNewItemName("");
    setNewItemCategory("");
    setNewItemPrice("");
    setNewItemCoinValue("");
    setNewItemDescription("");
    setNewItemIngredients("");
    setNewItemCustomizations([
      { id: "1", name: "إضافة جبن", price: 5, type: "addon" },
      { id: "2", name: "بدون بصل", price: 0, type: "removal" },
    ]);
    setIsFlashSale(false);
    setDiscountPercentage("30");
  };

  const handleEditItem = (item: MenuItem) => {
    setEditItemDialog(item);
  };

  const handleSaveItemEdit = () => {
    // In a real app, this would update the menu item in the backend
    console.log("Saving menu item edits:", editItemDialog);
    setEditItemDialog(null);
  };

  const handleDeleteItem = (itemId: string) => {
    // In a real app, this would delete the menu item from the backend
    console.log(`Deleting menu item ${itemId}`);
  };

  const filteredItems = selectedCategory
    ? menuItems.filter((item) => item.category === selectedCategory)
    : menuItems;

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-full max-w-md mb-6">
          <TabsTrigger value="categories">التصنيفات</TabsTrigger>
          <TabsTrigger value="items">الأصناف</TabsTrigger>
        </TabsList>

        {/* Categories Tab */}
        <TabsContent value="categories">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg md:text-xl font-bold">إدارة التصنيفات</h2>
            <Button
              className="gap-1"
              onClick={() => setNewCategoryDialog(true)}
            >
              <Plus className="h-4 w-4" />
              <span>إضافة تصنيف جديد</span>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="border rounded-lg p-4 flex flex-col items-center text-center hover:bg-gray-50 transition-colors"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                  {category.icon}
                </div>
                <h3 className="font-medium">{category.name}</h3>
                <div className="flex space-x-reverse space-x-1 mt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => handleEditCategory(category)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Menu Items Tab */}
        <TabsContent value="items">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg md:text-xl font-bold">إدارة الأصناف</h2>
            <div className="flex items-center space-x-reverse space-x-2">
              <div className="relative">
                <Search className="h-4 w-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="بحث..." className="pl-3 pr-9 w-[200px]" />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-1">
                    <Filter className="h-4 w-4" />
                    <span>التصنيف</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSelectedCategory(null)}>
                    الكل
                  </DropdownMenuItem>
                  {categories.map((category) => (
                    <DropdownMenuItem
                      key={category.id}
                      onClick={() => setSelectedCategory(category.name)}
                    >
                      {category.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button className="gap-1" onClick={() => setNewItemDialog(true)}>
                <Plus className="h-4 w-4" />
                <span>إضافة صنف جديد</span>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="h-40 w-full relative">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-primary/90 text-white shadow-sm">
                      <Coins className="h-3 w-3 ml-1" />
                      {item.coinValue}
                    </Badge>
                  </div>
                  <div className="absolute top-2 right-2">
                    <Badge variant="outline" className="bg-white/90 shadow-sm">
                      {item.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <span className="font-bold">
                      {item.price.toFixed(2)} د.م
                    </span>
                  </div>

                  {item.description && (
                    <p className="text-sm text-muted-foreground mb-2">
                      {item.description}
                    </p>
                  )}

                  {item.ingredients && item.ingredients.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.ingredients.map((ingredient, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="bg-gray-50"
                        >
                          {ingredient}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-end space-x-reverse space-x-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1"
                      onClick={() => handleEditItem(item)}
                    >
                      <Edit className="h-4 w-4" />
                      <span>تعديل</span>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="gap-1"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      <Trash className="h-4 w-4" />
                      <span>حذف</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* New Category Dialog */}
      <Dialog open={newCategoryDialog} onOpenChange={setNewCategoryDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>إضافة تصنيف جديد</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="category-name">اسم التصنيف</Label>
              <Input
                id="category-name"
                placeholder="أدخل اسم التصنيف"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category-icon">أيقونة التصنيف</Label>
              <select
                id="category-icon"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={newCategoryIcon}
                onChange={(e) => setNewCategoryIcon(e.target.value)}
              >
                <option value="utensils">أدوات الطعام</option>
                <option value="pizza">بيتزا</option>
                <option value="salad">سلطة</option>
                <option value="cake">كعكة</option>
                <option value="coffee">قهوة</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category-image">صورة التصنيف (اختياري)</Label>
              <Input id="category-image" type="file" />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setNewCategoryDialog(false)}
            >
              إلغاء
            </Button>
            <Button
              onClick={handleCreateCategory}
              disabled={!newCategoryName.trim()}
            >
              إنشاء تصنيف
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Category Dialog */}
      <Dialog
        open={!!editCategoryDialog}
        onOpenChange={() => setEditCategoryDialog(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>تعديل التصنيف</DialogTitle>
          </DialogHeader>
          {editCategoryDialog && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-category-name">اسم التصنيف</Label>
                <Input
                  id="edit-category-name"
                  value={editCategoryDialog.name}
                  onChange={(e) =>
                    setEditCategoryDialog({
                      ...editCategoryDialog,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-category-icon">أيقونة التصنيف</Label>
                <select
                  id="edit-category-icon"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="utensils">أدوات الطعام</option>
                  <option value="pizza">بيتزا</option>
                  <option value="salad">سلطة</option>
                  <option value="cake">كعكة</option>
                  <option value="coffee">قهوة</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-category-image">صورة التصنيف</Label>
                <Input id="edit-category-image" type="file" />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditCategoryDialog(null)}
            >
              إلغاء
            </Button>
            <Button onClick={handleSaveCategoryEdit}>حفظ التغييرات</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Item Dialog */}
      <Dialog open={newItemDialog} onOpenChange={setNewItemDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>إضافة صنف جديد</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between mb-4 bg-blue-50 p-3 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-700">
                إضافة صنف جديد
              </h3>
              <Badge variant="outline" className="bg-blue-100 text-blue-800">
                ID#{Math.floor(1000 + Math.random() * 9000)}
              </Badge>
            </div>

            <div className="space-y-2">
              <Label htmlFor="item-category">التصنيف</Label>
              <select
                id="item-category"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={newItemCategory}
                onChange={(e) => setNewItemCategory(e.target.value)}
              >
                <option value="" disabled>
                  اختر التصنيف
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="item-name">اسم الصنف</Label>
              <Input
                id="item-name"
                placeholder="أدخل اسم الصنف"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="item-price">السعر</Label>
                <Input
                  id="item-price"
                  type="number"
                  placeholder="أدخل سعر الصنف"
                  value={newItemPrice}
                  onChange={(e) => setNewItemPrice(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="item-coins">العملات المكافئة</Label>
                <Input
                  id="item-coins"
                  type="number"
                  placeholder="أدخل عدد العملات"
                  value={newItemCoinValue}
                  onChange={(e) => setNewItemCoinValue(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="item-desc">الوصف</Label>
              <Textarea
                id="item-desc"
                placeholder="أدخل وصف الصنف"
                value={newItemDescription}
                onChange={(e) => setNewItemDescription(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="item-ingredients">المكونات</Label>
              <Input
                id="item-ingredients"
                placeholder="أدخل المكونات مفصولة بفواصل"
                value={newItemIngredients}
                onChange={(e) => setNewItemIngredients(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>الإضافات والتخصيص</Label>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1"
                  onClick={() => {
                    setNewItemCustomizations([
                      ...newItemCustomizations,
                      {
                        id: Date.now().toString(),
                        name: "",
                        price: 0,
                        type: "addon",
                      },
                    ]);
                  }}
                >
                  <Plus className="h-4 w-4" />
                  <span>إضافة جديدة</span>
                </Button>
              </div>
              <div className="space-y-2 mt-2">
                {newItemCustomizations.map((customization, index) => (
                  <div
                    key={customization.id}
                    className="flex space-x-reverse space-x-2 items-center"
                  >
                    <Input
                      placeholder="اسم الإضافة"
                      className="flex-1"
                      value={customization.name}
                      onChange={(e) => {
                        const updated = [...newItemCustomizations];
                        updated[index].name = e.target.value;
                        setNewItemCustomizations(updated);
                      }}
                    />
                    <Input
                      type="number"
                      placeholder="السعر"
                      className="w-20"
                      value={customization.price}
                      onChange={(e) => {
                        const updated = [...newItemCustomizations];
                        updated[index].price = parseFloat(e.target.value) || 0;
                        setNewItemCustomizations(updated);
                      }}
                    />
                    <select
                      className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={customization.type}
                      onChange={(e) => {
                        const updated = [...newItemCustomizations];
                        updated[index].type = e.target.value as
                          | "addon"
                          | "removal";
                        setNewItemCustomizations(updated);
                      }}
                    >
                      <option value="addon">إضافة</option>
                      <option value="removal">إزالة</option>
                    </select>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-10 w-10 p-0 text-red-500"
                      onClick={() => {
                        setNewItemCustomizations(
                          newItemCustomizations.filter((_, i) => i !== index),
                        );
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-reverse space-x-2">
                <Label
                  htmlFor="flash-sale"
                  className="flex items-center space-x-reverse space-x-2 cursor-pointer"
                >
                  <input
                    id="flash-sale"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    checked={isFlashSale}
                    onChange={(e) => setIsFlashSale(e.target.checked)}
                  />
                  <span>إضافة كعرض فلاش</span>
                </Label>
              </div>

              {isFlashSale && (
                <div className="mt-2 p-3 bg-red-50 rounded-md">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="discount-percentage">نسبة الخصم</Label>
                    <div className="flex items-center">
                      <Input
                        id="discount-percentage"
                        type="number"
                        className="w-20"
                        value={discountPercentage}
                        onChange={(e) => setDiscountPercentage(e.target.value)}
                      />
                      <span className="mr-2">%</span>
                    </div>
                  </div>
                  <p className="text-xs text-red-600 mt-1">
                    سيتم عرض هذا الصنف في قسم عروض فلاش في الصفحة الرئيسية
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="item-image">صورة الصنف</Label>
              <Input id="item-image" type="file" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewItemDialog(false)}>
              إلغاء
            </Button>
            <Button
              onClick={handleCreateItem}
              disabled={
                !newItemName.trim() ||
                !newItemCategory ||
                !newItemPrice ||
                !newItemCoinValue
              }
            >
              إنشاء صنف
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Item Dialog */}
      <Dialog
        open={!!editItemDialog}
        onOpenChange={() => setEditItemDialog(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>تعديل الصنف</DialogTitle>
          </DialogHeader>
          {editItemDialog && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-item-category">التصنيف</Label>
                <select
                  id="edit-item-category"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={editItemDialog.category}
                  onChange={(e) =>
                    setEditItemDialog({
                      ...editItemDialog,
                      category: e.target.value,
                    })
                  }
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-item-name">اسم الصنف</Label>
                <Input
                  id="edit-item-name"
                  value={editItemDialog.name}
                  onChange={(e) =>
                    setEditItemDialog({
                      ...editItemDialog,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-item-price">السعر</Label>
                  <Input
                    id="edit-item-price"
                    type="number"
                    value={editItemDialog.price}
                    onChange={(e) =>
                      setEditItemDialog({
                        ...editItemDialog,
                        price: parseFloat(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-item-coins">العملات المكافئة</Label>
                  <Input
                    id="edit-item-coins"
                    type="number"
                    value={editItemDialog.coinValue}
                    onChange={(e) =>
                      setEditItemDialog({
                        ...editItemDialog,
                        coinValue: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-item-desc">الوصف</Label>
                <Textarea
                  id="edit-item-desc"
                  value={editItemDialog.description || ""}
                  onChange={(e) =>
                    setEditItemDialog({
                      ...editItemDialog,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-item-ingredients">المكونات</Label>
                <Input
                  id="edit-item-ingredients"
                  value={
                    editItemDialog.ingredients
                      ? editItemDialog.ingredients.join(", ")
                      : ""
                  }
                  onChange={(e) =>
                    setEditItemDialog({
                      ...editItemDialog,
                      ingredients: e.target.value
                        .split(",")
                        .map((i) => i.trim()),
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-item-image">صورة الصنف</Label>
                <div className="h-40 w-full mb-2 rounded-md overflow-hidden">
                  <img
                    src={editItemDialog.imageUrl}
                    alt={editItemDialog.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <Input id="edit-item-image" type="file" />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditItemDialog(null)}>
              إلغاء
            </Button>
            <Button onClick={handleSaveItemEdit}>حفظ التغييرات</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MenuManagement;
