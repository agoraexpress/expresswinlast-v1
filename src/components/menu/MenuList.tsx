import React, { useState, useEffect } from "react";
import MenuItem, { MenuItemType } from "./MenuItem";
import MenuCategories from "./MenuCategories";
import { t } from "@/i18n";
import { getMenuItems, getCategories } from "@/services/mysql/menu.service";

interface MenuListProps {
  items?: MenuItemType[];
  onAddToCart?: (item: MenuItemType, quantity: number) => void;
}

const MenuList = ({
  items = defaultItems,
  onAddToCart = () => {},
}: MenuListProps) => {
  const [activeCategory, setActiveCategory] = useState("1");
  const [menuItems, setMenuItems] = useState<MenuItemType[]>(items);

  // جلب العناصر من قاعدة البيانات
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const data = await getMenuItems();
        // تحويل البيانات إلى الشكل المطلوب
        const formattedItems = data.map((item) => ({
          id: item.id.toString(),
          name: item.name,
          description: item.description,
          price: item.price,
          coinValue: item.coin_value,
          imageUrl: item.image_url,
          ingredients: item.ingredients,
          category: item.category_id.toString(),
        }));
        setMenuItems(formattedItems);
      } catch (error) {
        console.error("Error fetching menu items:", error);
        // استخدام البيانات الافتراضية في حالة الخطأ
        setMenuItems(items);
      }
    };

    fetchMenuItems();
  }, []);

  const filteredItems = menuItems.filter(
    (item) => item.category === activeCategory,
  );

  return (
    <div className="w-full">
      <MenuCategories
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      <div className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-6">
          {categories.find((cat) => cat.id === activeCategory)?.name ||
            t("menu")}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-4 sm:gap-6">
          {filteredItems.map((item) => (
            <MenuItem key={item.id} item={item} onAddToCart={onAddToCart} />
          ))}
        </div>
      </div>
    </div>
  );
};

// جلب التصنيفات من قاعدة البيانات
const [categories, setCategories] = useState([
  {
    id: "1",
    name: t("burgers"),
    imageUrl:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&q=80",
  },
  {
    id: "2",
    name: t("pizza"),
    imageUrl:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&q=80",
  },
  {
    id: "3",
    name: t("salads"),
    imageUrl:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&q=80",
  },
  {
    id: "4",
    name: t("desserts"),
    imageUrl:
      "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=300&q=80",
  },
  {
    id: "5",
    name: t("drinks"),
    imageUrl:
      "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300&q=80",
  },
]);

// جلب التصنيفات من قاعدة البيانات
useEffect(() => {
  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      // تحويل البيانات إلى الشكل المطلوب
      const formattedCategories = data.map((category) => {
        // تحديد الصورة بناءً على نوع التصنيف
        let imageUrl = "";
        switch (category.icon) {
          case "burger":
            imageUrl =
              "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&q=80";
            break;
          case "pizza":
            imageUrl =
              "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&q=80";
            break;
          case "salad":
            imageUrl =
              "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&q=80";
            break;
          case "dessert":
            imageUrl =
              "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=300&q=80";
            break;
          case "drink":
            imageUrl =
              "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300&q=80";
            break;
          default:
            imageUrl =
              "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&q=80";
        }

        return {
          id: category.id.toString(),
          name: category.name,
          imageUrl,
        };
      });
      setCategories(formattedCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      // الاحتفاظ بالتصنيفات الافتراضية في حالة الخطأ
    }
  };

  fetchCategories();
}, []);

const defaultItems: MenuItemType[] = [
  {
    id: "1",
    name: "برجر كلاسيكي",
    description:
      "قطعة لحم بقري عصيرية مع خس، طماطم، بصل، وصلصتنا الخاصة على خبز محمص.",
    price: 89.99,
    coinValue: 90,
    imageUrl:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80",
    ingredients: ["قطعة لحم بقري", "خس", "طماطم", "بصل", "صلصة خاصة", "خبز"],
    category: "1",
  },
  {
    id: "2",
    name: "برجر بالجبن",
    description: "برجر كلاسيكي مع جبن شيدر ذائب.",
    price: 99.99,
    coinValue: 100,
    imageUrl:
      "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=500&q=80",
    ingredients: [
      "قطعة لحم بقري",
      "جبن شيدر",
      "خس",
      "طماطم",
      "بصل",
      "صلصة خاصة",
      "خبز",
    ],
    category: "1",
  },
  {
    id: "3",
    name: "برجر باللحم المقدد",
    description: "برجر كلاسيكي مع شرائح لحم مقدد مقرمشة وجبن ذائب.",
    price: 119.99,
    coinValue: 120,
    imageUrl:
      "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500&q=80",
    ingredients: [
      "قطعة لحم بقري",
      "لحم مقدد",
      "جبن شيدر",
      "خس",
      "طماطم",
      "بصل",
      "صلصة خاصة",
      "خبز",
    ],
    category: "1",
  },
  {
    id: "4",
    name: "برجر نباتي",
    description: "قطعة نباتية مع خضروات طازجة ومايونيز نباتي.",
    price: 109.99,
    coinValue: 110,
    imageUrl:
      "https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=500&q=80",
    ingredients: [
      "قطعة نباتية",
      "خس",
      "طماطم",
      "خيار",
      "مايونيز نباتي",
      "خبز حبوب كامل",
    ],
    category: "1",
  },
  {
    id: "5",
    name: "بيتزا مارجريتا",
    description: "بيتزا كلاسيكية مع صلصة طماطم، جبن موزاريلا، وريحان طازج.",
    price: 129.99,
    coinValue: 130,
    imageUrl:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&q=80",
    ingredients: [
      "عجينة بيتزا",
      "صلصة طماطم",
      "جبن موزاريلا",
      "ريحان طازج",
      "زيت زيتون",
    ],
    category: "2",
  },
  {
    id: "6",
    name: "بيتزا بيبروني",
    description: "بيتزا مع صلصة طماطم، جبن موزاريلا، وشرائح بيبروني.",
    price: 149.99,
    coinValue: 150,
    imageUrl:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&q=80",
    ingredients: ["عجينة بيتزا", "صلصة طماطم", "جبن موزاريلا", "بيبروني"],
    category: "2",
  },
  {
    id: "7",
    name: "سلطة سيزر",
    description: "خس روماني طازج مع صلصة سيزر، خبز محمص، وجبن بارميزان.",
    price: 79.99,
    coinValue: 80,
    imageUrl:
      "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500&q=80",
    ingredients: ["خس روماني", "صلصة سيزر", "خبز محمص", "جبن بارميزان"],
    category: "3",
  },
  {
    id: "8",
    name: "كيك شوكولاتة",
    description: "كيك شوكولاتة غني مع طبقة من غاناش الشوكولاتة.",
    price: 69.99,
    coinValue: 70,
    imageUrl:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80",
    ingredients: ["شوكولاتة", "دقيق", "سكر", "بيض", "زبدة", "غاناش"],
    category: "4",
  },
  {
    id: "9",
    name: "قهوة مثلجة",
    description: "قهوة مخمرة باردة تقدم مع الثلج وحليب من اختيارك.",
    price: 39.99,
    coinValue: 40,
    imageUrl:
      "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=500&q=80",
    ingredients: ["قهوة", "ثلج", "حليب"],
    category: "5",
  },
];

export default MenuList;
