# دليل تثبيت وتطوير تطبيق فليفر لويالتي

## متطلبات النظام

- Node.js (الإصدار 16 أو أحدث)
- npm (الإصدار 7 أو أحدث)
- Git
- MySQL (لوضع الإنتاج فقط)

## خطوات التثبيت

### 1. استنساخ المشروع

```bash
git clone https://github.com/yourusername/flavor-loyalty.git
cd flavor-loyalty
```

### 2. تثبيت التبعيات

```bash
npm install
```

### 3. إنشاء ملف البيئة

قم بنسخ ملف `.env.example` إلى ملف جديد باسم `.env`

```bash
cp .env.example .env
```

### 4. تشغيل التطبيق في وضع التطوير

```bash
npm run dev
```

سيتم تشغيل التطبيق افتراضياً على المنفذ 5173. يمكنك الوصول إليه من خلال الرابط: http://localhost:5173

## هيكل المشروع

```
src/
  ├── components/     # مكونات React
  │   ├── admin/     # مكونات لوحة الإدارة
  │   ├── cart/      # مكونات سلة التسوق
  │   ├── common/    # مكونات مشتركة
  │   ├── dashboard/ # مكونات لوحة المعلومات
  │   ├── layout/    # مكونات التخطيط
  │   ├── loyalty/   # مكونات نظام الولاء
  │   ├── menu/      # مكونات قائمة الطعام
  │   └── ui/        # مكونات واجهة المستخدم الأساسية
  ├── context/       # سياقات React
  ├── i18n/          # ملفات الترجمة
  ├── lib/           # مكتبات ووظائف مساعدة
  ├── pages/         # صفحات التطبيق
  ├── services/      # خدمات API
  └── types/         # تعريفات TypeScript
```

## وضع العرض التجريبي

التطبيق يدعم وضعين للتشغيل:

- **وضع العرض التجريبي (Demo Mode)**: يستخدم بيانات محلية مخزنة مسبقاً دون الحاجة لاتصال بقاعدة بيانات أو خدمات API خارجية.
- **وضع الإنتاج (Production Mode)**: يتصل بقاعدة البيانات وخدمات API الحقيقية.

للتبديل بين الوضعين، استخدم مفتاح التبديل في لوحة الإدارة تحت قسم "إدارة API وقاعدة البيانات".

## إعداد قاعدة البيانات (لوضع الإنتاج فقط)

### 1. إنشاء قاعدة بيانات MySQL

```sql
CREATE DATABASE flavor_loyalty;
```

### 2. تشغيل سكريبت إنشاء الجداول

```bash
mysql -u root -p flavor_loyalty < sql/schema.sql
```

### 3. تحديث بيانات الاتصال في ملف .env

```
VITE_MYSQL_HOST=localhost
VITE_MYSQL_USER=root
VITE_MYSQL_PASSWORD=yourpassword
VITE_MYSQL_DATABASE=flavor_loyalty
```

## بناء التطبيق للإنتاج

### 1. بناء التطبيق

```bash
npm run build
```

### 2. معاينة نسخة الإنتاج محلياً

```bash
npm run preview
```

## تسجيل الدخول للتجربة

### حساب المستخدم
- **رقم الهاتف**: أي رقم
- **رمز PIN**: 1234

### حساب المسؤول
- **اسم المستخدم**: admin
- **كلمة المرور**: admin

## تكوين Firebase (لوضع الإنتاج فقط)

إذا كنت ترغب في استخدام Firebase، قم بإنشاء مشروع في [Firebase Console](https://console.firebase.google.com/) وتحديث ملف التكوين في `src/lib/firebase.ts`.

## نشر التطبيق

يمكن نشر التطبيق على أي منصة استضافة تدعم تطبيقات React مثل:

- Vercel
- Netlify
- Firebase Hosting
- GitHub Pages

### نشر التطبيق على Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy --only hosting
```

## الميزات الرئيسية

- **نظام الولاء**: بطاقات طوابع، هدايا سريعة، عملات
- **قائمة الطعام**: عرض الأصناف، تفاصيل المنتجات، تخصيص الطلبات
- **سلة التسوق**: إضافة منتجات، تعديل الكميات، استخدام مكافآت الولاء
- **لوحة الإدارة**: إدارة المستخدمين، الطلبات، المنتجات، نظام الولاء
- **شاشة المطبخ**: عرض الطلبات النشطة للمطبخ

## المساهمة في المشروع

1. قم بعمل fork للمشروع
2. قم بإنشاء فرع للميزة الجديدة (`git checkout -b feature/amazing-feature`)
3. قم بإجراء التغييرات وتسجيلها (`git commit -m 'Add some amazing feature'`)
4. قم بدفع التغييرات إلى الفرع (`git push origin feature/amazing-feature`)
5. قم بفتح طلب سحب (Pull Request)

## الترخيص

هذا المشروع مرخص تحت رخصة MIT - انظر ملف LICENSE للتفاصيل.
