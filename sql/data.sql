-- إنشاء جداول قاعدة البيانات وإدخال البيانات التجريبية

-- جدول المستخدمين
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL UNIQUE,
  email VARCHAR(255),
  pin VARCHAR(10) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  coins INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- جدول التصنيفات
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  icon VARCHAR(50) NOT NULL
);

-- جدول قائمة الطعام
CREATE TABLE IF NOT EXISTS menu_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  coin_value INT NOT NULL,
  image_url VARCHAR(255),
  ingredients TEXT,
  category_id INT,
  is_flash_sale BOOLEAN DEFAULT FALSE,
  discount_percentage INT DEFAULT 0,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- جدول بطاقات الطوابع
CREATE TABLE IF NOT EXISTS stamp_cards (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  card_number VARCHAR(20) NOT NULL UNIQUE,
  total_stamps INT NOT NULL,
  collected_stamps INT DEFAULT 0,
  owner VARCHAR(255) NOT NULL,
  user_id INT NOT NULL,
  phone VARCHAR(20) NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  expiry_date DATE,
  reward_stages TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- جدول الهدايا السريعة
CREATE TABLE IF NOT EXISTS gifts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  code VARCHAR(20) NOT NULL UNIQUE,
  expiry_date DATE,
  image_url VARCHAR(255),
  type VARCHAR(50),
  active BOOLEAN DEFAULT TRUE
);

-- جدول هدايا المستخدم
CREATE TABLE IF NOT EXISTS user_gifts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  gift_id INT NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (gift_id) REFERENCES gifts(id)
);

-- جدول الطلبات
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  status ENUM('new', 'preparing', 'delivering', 'delivered', 'cancelled') DEFAULT 'new',
  address TEXT NOT NULL,
  phone VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  payment_method VARCHAR(50) DEFAULT 'cash',
  used_coins INT DEFAULT 0,
  earned_coins INT DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- جدول عناصر الطلب
CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  item_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  quantity INT NOT NULL,
  customizations TEXT,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (item_id) REFERENCES menu_items(id)
);

-- جدول معاملات العملات
CREATE TABLE IF NOT EXISTS coin_transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  amount INT NOT NULL,
  type ENUM('earned', 'used') NOT NULL,
  description TEXT,
  order_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- إدخال بيانات المستخدمين
INSERT INTO users (name, phone, email, pin, role, coins) VALUES
('محمد أحمد', '+212612345678', 'mohamed@example.com', '1234', 'user', 750),
('فاطمة علي', '+212698765432', 'fatima@example.com', '1234', 'user', 320),
('أحمد محمود', '+212654321987', 'ahmed@example.com', '1234', 'user', 520),
('سارة خالد', '+212632145698', 'sara@example.com', '1234', 'user', 180),
('خالد محمد', '+212687654321', 'khaled@example.com', '1234', 'user', 420),
('admin', '+212600000000', 'admin@example.com', 'admin', 'admin', 0);

-- إدخال بيانات التصنيفات
INSERT INTO categories (name, icon) VALUES
('برجر', 'burger'),
('بيتزا', 'pizza'),
('سلطات', 'salad'),
('حلويات', 'dessert'),
('مشروبات', 'drink'),
('جانبية', 'side');

-- إدخال بيانات قائمة الطعام
INSERT INTO menu_items (name, description, price, coin_value, image_url, ingredients, category_id, is_flash_sale, discount_percentage) VALUES
('برجر كلاسيكي', 'برجر لحم بقري مع خس وطماطم وبصل ومخلل', 89.99, 90, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80', '["لحم بقري", "خس", "طماطم", "بصل", "مخلل", "صلصة خاصة"]', 1, FALSE, 0),
('برجر بالجبن', 'برجر لحم بقري مع جبن شيدر وخس وطماطم وبصل ومخلل', 99.99, 100, 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=500&q=80', '["لحم بقري", "جبن شيدر", "خس", "طماطم", "بصل", "مخلل", "صلصة خاصة"]', 1, FALSE, 0),
('برجر دبل تشيز', 'برجر لحم مزدوج مع طبقتين من الجبن الذائب والصلصة الخاصة', 59.99, 60, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80', '["لحم بقري", "جبن شيدر", "خس", "طماطم", "بصل", "صلصة خاصة"]', 1, TRUE, 30),
('بيتزا مارجريتا', 'بيتزا كلاسيكية مع صلصة طماطم وجبن موزاريلا وريحان', 129.99, 130, 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&q=80', '["عجينة", "صلصة طماطم", "جبن موزاريلا", "ريحان", "زيت زيتون"]', 2, FALSE, 0),
('بيتزا سوبريم', 'بيتزا محملة بالخضروات الطازجة واللحوم المشكلة والجبن', 89.99, 90, 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80', '["عجينة", "صلصة طماطم", "جبن موزاريلا", "فلفل", "زيتون", "لحم مفروم", "فطر"]', 2, TRUE, 30),
('سلطة سيزر', 'خس روماني مع صلصة سيزر وقطع خبز محمص وجبن بارميزان', 79.99, 80, 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500&q=80', '["خس روماني", "صلصة سيزر", "خبز محمص", "جبن بارميزان"]', 3, FALSE, 0),
('سلطة سيزر دجاج', 'سلطة خس رومين مع قطع دجاج مشوية وصلصة سيزر وخبز محمص', 49.99, 50, 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500&q=80', '["خس روماني", "دجاج مشوي", "صلصة سيزر", "خبز محمص", "جبن بارميزان"]', 3, TRUE, 30),
('قهوة مثلجة', 'قهوة مثلجة منعشة مع حليب وسكر', 39.99, 40, 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=500&q=80', '["قهوة", "حليب", "سكر", "ثلج"]', 5, FALSE, 0),
('ميلك شيك شوكولاتة', 'ميلك شيك كريمي بالشوكولاتة مع كريمة مخفوقة', 29.99, 30, 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&q=80', '["حليب", "آيس كريم", "شوكولاتة", "كريمة مخفوقة"]', 5, TRUE, 30),
('طبق كباب مشكل', 'تشكيلة من الكباب المشوي مع الخضروات والأرز', 129.99, 130, 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=500&q=80', '["لحم غنم", "لحم بقري", "دجاج", "خضروات مشوية", "أرز", "صلصة طحينة"]', 1, FALSE, 0),
('سمك مشوي', 'سمك طازج مشوي مع الأعشاب والليمون', 149.99, 150, 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&q=80', '["سمك", "ليمون", "أعشاب", "زيت زيتون", "ثوم"]', 1, FALSE, 0),
('باستا ألفريدو', 'باستا كريمية مع صلصة الألفريدو والدجاج', 99.99, 100, 'https://images.unsplash.com/photo-1645112411341-6c4fd023882c?w=500&q=80', '["باستا", "كريمة", "دجاج", "جبن بارميزان", "ثوم"]', 1, FALSE, 0);

-- إدخال بيانات بطاقات الطوابع
INSERT INTO stamp_cards (name, card_number, total_stamps, collected_stamps, owner, user_id, phone, active, expiry_date, reward_stages) VALUES
('عشاق القهوة', '1234567', 8, 5, 'محمد أحمد', 1, '+212612345678', TRUE, '2023-12-31', '[{"stamps": 3, "reward": "خصم 10%"}, {"stamps": 5, "reward": "مشروب صغير مجاني"}, {"stamps": 8, "reward": "قهوة مجانية مع كعكة"}]'),
('نادي السندويشات', '7654321', 6, 2, 'محمد أحمد', 1, '+212612345678', TRUE, '2023-11-30', '[{"stamps": 2, "reward": "إضافة مجانية"}, {"stamps": 4, "reward": "مشروب مجاني"}, {"stamps": 6, "reward": "سندويش مجاني"}]'),
('بطاقة المشروبات الخاصة', '9876543', 10, 0, 'أحمد محمود', 3, '+212654321987', TRUE, '2024-12-31', '[{"stamps": 3, "reward": "خصم 15%"}, {"stamps": 6, "reward": "مشروب صغير مجاني"}, {"stamps": 10, "reward": "مشروب كبير مجاني مع حلوى"}]');

-- إدخال بيانات الهدايا السريعة
INSERT INTO gifts (name, description, code, expiry_date, image_url, type, active) VALUES
('حلوى مجانية', 'احصل على حلوى مجانية مع أي طبق رئيسي', '12345', '2023-12-15', 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=300&q=80', 'free-dessert', TRUE),
('خصم 10%', 'خصم 10% على طلبك التالي', '67890', '2023-11-30', 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=300&q=80', 'discount', TRUE),
('مشروب مجاني', 'احصل على مشروب مجاني مع أي وجبة', '54321', '2023-12-31', 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300&q=80', 'free-drink', TRUE);

-- إدخال بيانات هدايا المستخدم
INSERT INTO user_gifts (user_id, gift_id, used) VALUES
(1, 1, FALSE),
(1, 2, FALSE),
(2, 3, FALSE);

-- إدخال بيانات الطلبات
INSERT INTO orders (user_id, total, status, address, phone, created_at, payment_method, used_coins, earned_coins) VALUES
(1, 309.97, 'delivered', 'شارع الحسن الثاني، الدار البيضاء، المغرب', '+212612345678', '2023-11-15 14:30:00', 'cash', 0, 30),
(1, 179.98, 'delivered', 'شارع الحسن الثاني، الدار البيضاء، المغرب', '+212612345678', '2023-11-10 12:15:00', 'cash', 0, 18);

-- إدخال بيانات عناصر الطلب
INSERT INTO order_items (order_id, item_id, name, price, quantity, customizations) VALUES
(1, 1, 'برجر كلاسيكي', 89.99, 2, '[]'),
(1, 4, 'بيتزا مارجريتا', 129.99, 1, '[]'),
(2, 2, 'برجر بالجبن', 99.99, 1, '[]'),
(2, 6, 'سلطة سيزر', 79.99, 1, '[]');

-- إدخال بيانات معاملات العملات
INSERT INTO coin_transactions (user_id, amount, type, description, order_id) VALUES
(1, 30, 'earned', 'مكافأة من الطلب', 1),
(1, 18, 'earned', 'مكافأة من الطلب', 2);
