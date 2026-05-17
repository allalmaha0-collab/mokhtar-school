# مجموعة مدارس محمد المختار — الموقع الرسمي

## 🛠 تقنيات المشروع
- **Next.js 14** (App Router)
- **Supabase** (قاعدة البيانات + التخزين)
- **Tailwind CSS** (التصميم)
- **XLSX** (استيراد ملفات مسار)
- **JWT + bcryptjs** (المصادقة)
- **Vercel** (الاستضافة)

---

## 🚀 تشغيل المشروع محلياً

### 1. تثبيت المتطلبات
```bash
cd "school-app"
npm install
```

### 2. إعداد Supabase
1. اذهب إلى [supabase.com](https://supabase.com) وأنشئ مشروعاً جديداً
2. افتح **SQL Editor** وشغّل الملف `supabase/schema.sql`
3. أنشئ Bucket باسم `school-media` في **Storage** واجعله عاماً (Public)

### 3. إعداد متغيرات البيئة
```bash
cp .env.local.example .env.local
```
عدّل `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
JWT_SECRET=اكتب_مفتاحاً_سرياً_طويلاً_هنا
```

### 4. تشغيل المشروع
```bash
npm run dev
```
افتح المتصفح على: **http://localhost:3000**

---

## 🔐 بيانات الدخول الافتراضية
- **البريد:** `admin@mokhtar-school.ma`
- **كلمة المرور:** `admin123`

> غيّر كلمة المرور فور تسجيل الدخول من: **لوحة التحكم ← الإعدادات ← الأمان**

---

## 📥 استيراد التلاميذ من مسار
1. سجّل الدخول للوحة التحكم
2. اذهب إلى: **التلاميذ ← استيراد من مسار**
3. ارفع ملف Excel المستخرج من منظومة مسار
4. راجع البيانات في جدول المعاينة
5. اضغط **بدء الاستيراد**

### الأعمدة المدعومة من ملف مسار:
| العمود | الأسماء المحتملة |
|--------|-----------------|
| رقم مسار | رقم مسار، رقم التسجيل في مسار |
| الاسم العائلي | الاسم العائلي، nom |
| الاسم الشخصي | الاسم الشخصي، prénom |
| الجنس | الجنس، genre |
| تاريخ الازدياد | تاريخ الازدياد، date de naissance |
| المستوى | المستوى، niveau |
| الفصل | الفصل، القسم، classe |

---

## 🌐 النشر على Vercel
```bash
npm install -g vercel
vercel
```
أضف متغيرات البيئة في لوحة تحكم Vercel.

---

## 📁 هيكل المشروع
```
school-app/
├── app/
│   ├── page.jsx              # الصفحة الرئيسية
│   ├── login/                # تسجيل الدخول
│   ├── contact/              # التواصل
│   ├── dashboard/            # لوحة التحكم
│   │   ├── page.jsx          # نظرة عامة
│   │   ├── news/             # الأخبار
│   │   ├── students/         # التلاميذ
│   │   ├── teachers/         # الأساتذة
│   │   ├── import/           # استيراد مسار ⭐
│   │   └── settings/         # الإعدادات
│   └── api/                  # API Routes
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── dashboard/
│       └── Sidebar.jsx
├── lib/
│   ├── supabase.js
│   ├── auth.js
│   └── utils.js
├── middleware.js              # حماية لوحة التحكم
└── supabase/
    └── schema.sql            # جداول قاعدة البيانات
```
