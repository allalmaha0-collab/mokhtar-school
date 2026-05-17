-- ============================================================
-- مجموعة مدارس محمد المختار - قاعدة البيانات
-- ============================================================

-- مستخدمو لوحة التحكم
create table if not exists users (
  id bigint generated always as identity primary key,
  name text not null,
  email text unique not null,
  password text not null,
  role text default 'editor' check (role in ('admin','editor','viewer')),
  avatar text,
  created_at timestamptz default now()
);

-- التلاميذ
create table if not exists students (
  id bigint generated always as identity primary key,
  massar_code text unique,
  fullname text not null,
  gender text check (gender in ('ذكر','أنثى')),
  level text,
  classroom text,
  birth_date date,
  father_name text,
  phone text,
  address text,
  created_at timestamptz default now()
);

-- الأساتذة
create table if not exists teachers (
  id bigint generated always as identity primary key,
  fullname text not null,
  subject text,
  level text,
  phone text,
  email text,
  image text,
  bio text,
  is_admin boolean default false,
  created_at timestamptz default now()
);

-- الأخبار والإعلانات
create table if not exists news (
  id bigint generated always as identity primary key,
  title text not null,
  content text,
  image text,
  category text default 'إعلان' check (category in ('إعلان','نشاط','حفل','دراسي','عام')),
  is_published boolean default true,
  published_at timestamptz default now(),
  created_at timestamptz default now()
);

-- الأنشطة
create table if not exists activities (
  id bigint generated always as identity primary key,
  title text not null,
  description text,
  images text[],
  video_url text,
  activity_date date,
  category text default 'ثقافي',
  created_at timestamptz default now()
);

-- الأقسام
create table if not exists classrooms (
  id bigint generated always as identity primary key,
  name text not null,
  level text not null,
  teacher_id bigint references teachers(id) on delete set null,
  capacity int default 30,
  created_at timestamptz default now()
);

-- الوثائق
create table if not exists documents (
  id bigint generated always as identity primary key,
  title text not null,
  description text,
  file_url text,
  file_name text,
  category text default 'عام',
  download_count int default 0,
  created_at timestamptz default now()
);

-- إعدادات الموقع
create table if not exists settings (
  id bigint generated always as identity primary key,
  key text unique not null,
  value text,
  updated_at timestamptz default now()
);

-- رسائل التواصل
create table if not exists messages (
  id bigint generated always as identity primary key,
  sender_name text not null,
  sender_email text,
  sender_phone text,
  subject text,
  body text not null,
  is_read boolean default false,
  created_at timestamptz default now()
);

-- الإعدادات الافتراضية
insert into settings (key, value) values
  ('school_name',    'مجموعة مدارس محمد المختار'),
  ('address',        'المغرب'),
  ('phone',          '+212 6XX-XXXXXX'),
  ('email',          'contact@mokhtar-school.ma'),
  ('whatsapp',       '212600000000'),
  ('facebook',       'https://facebook.com'),
  ('lat',            '32.551572'),
  ('lng',            '-1.952622'),
  ('director_name',  'الأستاذ محمد أمين'),
  ('director_msg',   'أهلاً وسهلاً بكم في الموقع الرسمي لمجموعة مدارس محمد المختار'),
  ('students_count', '450'),
  ('teachers_count', '18'),
  ('activities_count','15'),
  ('classes_count',  '6'),
  ('year',           '2025-2026')
on conflict (key) do nothing;

-- مستخدم admin افتراضي (كلمة المرور: admin123)
insert into users (name, email, password, role) values
  ('المدير', 'admin@mokhtar-school.ma', '$2a$10$rQ5LWpbRjX7mS6ysKZQlUeN4J5Kk7h.k0VGm5pXwFLuEQ2xKJdFyO', 'admin')
on conflict (email) do nothing;

-- RLS Policies
alter table students  enable row level security;
alter table teachers  enable row level security;
alter table news      enable row level security;
alter table activities enable row level security;
alter table settings  enable row level security;
alter table documents enable row level security;
alter table messages  enable row level security;

-- Public read for news, activities, teachers, settings, documents
create policy "public_read_news"       on news       for select using (is_published = true);
create policy "public_read_activities" on activities  for select using (true);
create policy "public_read_teachers"   on teachers    for select using (true);
create policy "public_read_settings"   on settings    for select using (true);
create policy "public_read_documents"  on documents   for select using (true);
create policy "public_insert_messages" on messages    for insert with check (true);
