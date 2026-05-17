'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Users, GraduationCap, Newspaper, Star, Plus, ArrowLeft, MessageSquare, Heart } from 'lucide-react';

export default function DashboardPage() {
  const [stats, setStats] = useState({ students: 0, teachers: 0, news: 0, activities: 0, messages: 0, clubs: 0 });
  const [recent, setRecent] = useState({ news: [], students: [] });

  useEffect(() => {
    Promise.all([
      fetch('/api/students').then(r => r.json()),
      fetch('/api/teachers').then(r => r.json()),
      fetch('/api/news?limit=5').then(r => r.json()),
      fetch('/api/activities?limit=5').then(r => r.json()),
      fetch('/api/messages').then(r => r.json()),
      fetch('/api/clubs').then(r => r.json()),
    ]).then(([s, t, n, a, m, c]) => {
      setStats({
        students:   s.total || s.students?.length || 0,
        teachers:   t.teachers?.length || 0,
        news:       n.news?.length || 0,
        activities: a.activities?.length || 0,
        messages:   m.messages?.filter(x => !x.isRead)?.length || 0,
        clubs:      c.clubs?.length || 0,
      });
      setRecent({ news: n.news?.slice(0, 5) || [], students: s.students?.slice(0, 5) || [] });
    }).catch(() => {});
  }, []);

  const cards = [
    { label: 'التلاميذ',    value: stats.students,   icon: GraduationCap, color: 'bg-blue-500',   href: '/dashboard/students' },
    { label: 'الأساتذة',   value: stats.teachers,   icon: Users,         color: 'bg-green-500',  href: '/dashboard/teachers' },
    { label: 'الأخبار',    value: stats.news,        icon: Newspaper,     color: 'bg-orange-500', href: '/dashboard/news' },
    { label: 'الأنشطة',    value: stats.activities,  icon: Star,          color: 'bg-purple-500', href: '/dashboard/activities' },
    { label: 'الأندية',    value: stats.clubs,       icon: Heart,         color: 'bg-teal-500',   href: '/dashboard/clubs' },
    { label: 'رسائل جديدة',value: stats.messages,   icon: MessageSquare, color: 'bg-red-500',    href: '/dashboard/messages' },
  ];

  const shortcuts = [
    { label: 'إضافة خبر',    href: '/dashboard/news/new',        icon: Newspaper,    color: 'bg-orange-50 text-orange-600 border-orange-200' },
    { label: 'إضافة أستاذ',  href: '/dashboard/teachers/new',   icon: Users,        color: 'bg-green-50 text-green-600 border-green-200' },
    { label: 'إضافة نشاط',   href: '/dashboard/activities/new', icon: Star,         color: 'bg-purple-50 text-purple-600 border-purple-200' },
    { label: 'إضافة نادٍ',   href: '/dashboard/clubs/new',       icon: Heart,        color: 'bg-teal-50 text-teal-600 border-teal-200' },
    { label: 'استيراد نتائج',href: '/dashboard/import',          icon: GraduationCap,color: 'bg-blue-50 text-blue-600 border-blue-200' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-primary dark:text-white">لوحة التحكم</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">مجموعة مدارس محمد المخطار — مرحباً بك</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {cards.map(c => (
          <Link key={c.label} href={c.href} className="card p-4 flex flex-col items-center text-center gap-2 group">
            <div className={`w-12 h-12 rounded-xl ${c.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
              <c.icon size={22} />
            </div>
            <p className="text-2xl font-black text-gray-800 dark:text-white">{c.value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{c.label}</p>
          </Link>
        ))}
      </div>

      {/* Shortcuts */}
      <div>
        <h2 className="text-sm font-black text-gray-500 dark:text-gray-400 mb-3">إجراءات سريعة</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {shortcuts.map(s => (
            <Link key={s.label} href={s.href}
              className={`flex items-center gap-2 p-4 rounded-xl border-2 ${s.color} hover:-translate-y-0.5 transition-all font-bold text-sm`}>
              <Plus size={16} /> {s.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Recent */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-black text-primary dark:text-white">آخر الأخبار</h2>
            <Link href="/dashboard/news" className="text-xs text-primary-light hover:underline flex items-center gap-1">عرض الكل <ArrowLeft size={12} /></Link>
          </div>
          <div className="space-y-2">
            {recent.news.length === 0 && <p className="text-gray-400 text-sm text-center py-4">لا توجد أخبار</p>}
            {recent.news.map(n => (
              <div key={n.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <span className="badge bg-orange-100 text-orange-700 text-xs flex-shrink-0">{n.category}</span>
                <p className="text-sm font-bold text-gray-700 dark:text-gray-200 flex-1 truncate">{n.title}</p>
                <span className="text-xs text-gray-400 flex-shrink-0">{new Date(n.publishedAt).toLocaleDateString('ar-MA')}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-black text-primary dark:text-white">آخر التلاميذ المضافين</h2>
            <Link href="/dashboard/students" className="text-xs text-primary-light hover:underline flex items-center gap-1">عرض الكل <ArrowLeft size={12} /></Link>
          </div>
          <div className="space-y-2">
            {recent.students.length === 0 && <p className="text-gray-400 text-sm text-center py-4">لا يوجد تلاميذ</p>}
            {recent.students.map(s => (
              <div key={s.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-light to-secondary-light text-white text-xs font-black flex items-center justify-center flex-shrink-0">
                  {s.fullname?.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-700 dark:text-gray-200 truncate">{s.fullname}</p>
                  <p className="text-xs text-gray-400">{s.level} — {s.classroom}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
