'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  GraduationCap, BookOpen, Users, Star, Heart, Phone,
  ArrowLeft, Newspaper, Trophy, Image, Mic, HandHeart,
  Home, FileText, Bell, MapPin, ChevronLeft
} from 'lucide-react';

export default function HomePage() {
  const [data, setData] = useState({
    settings: {}, news: [], activities: [], clubs: [],
    announcements: [], achievements: [], teachers: []
  });

  useEffect(() => {
    Promise.all([
      fetch('/api/settings').then(r => r.json()),
      fetch('/api/news?limit=6').then(r => r.json()),
      fetch('/api/activities?limit=6').then(r => r.json()),
      fetch('/api/clubs').then(r => r.json()),
      fetch('/api/announcements').then(r => r.json()),
      fetch('/api/achievements').then(r => r.json()),
      fetch('/api/teachers').then(r => r.json()),
    ]).then(([s, n, a, c, ann, ach, t]) => {
      setData({
        settings:      s.settings      || {},
        news:          n.news          || [],
        activities:    a.activities    || [],
        clubs:         c.clubs         || [],
        announcements: ann.announcements || [],
        achievements:  ach.achievements  || [],
        teachers:      t.teachers       || [],
      });
    }).catch(() => {});
  }, []);

  const { settings, news, activities, clubs, announcements, achievements, teachers } = data;
  const schoolName = settings.school_name || 'مجموعة مدارس محمد المخطار';
  const welcome    = settings.welcome_message || '';

  const sections = [
    { href: '/news',         icon: Newspaper,   label: 'الأخبار',           color: 'bg-blue-500',    count: news.length },
    { href: '/activities',   icon: Star,         label: 'الأنشطة',           color: 'bg-purple-500',  count: activities.length },
    { href: '/clubs',        icon: Heart,        label: 'الأندية',           color: 'bg-rose-500',    count: clubs.length },
    { href: '/achievements', icon: Trophy,       label: 'الإنجازات',         color: 'bg-amber-500',   count: achievements.length },
    { href: '/teachers',     icon: Users,        label: 'الأطر التربوية',    color: 'bg-green-500',   count: teachers.length },
    { href: '/archive',      icon: Image,        label: 'أرشيف الصور',       color: 'bg-teal-500',    count: null },
    { href: '/media',        icon: Mic,          label: 'الإعلام المدرسي',   color: 'bg-indigo-500',  count: null },
    { href: '/social',       icon: HandHeart,    label: 'المختص الاجتماعي', color: 'bg-pink-500',    count: null },
    { href: '/boarding',     icon: Home,         label: 'فضاء الداخلية',     color: 'bg-orange-500',  count: null },
    { href: '/student-docs', icon: BookOpen,     label: 'وثائق التلاميذ',    color: 'bg-cyan-500',    count: null },
    { href: '/teacher-docs', icon: FileText,     label: 'وثائق الأساتذة',    color: 'bg-lime-500',    count: null },
    { href: '/contact',      icon: Phone,        label: 'تواصل معنا',        color: 'bg-gray-500',    count: null },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Navbar settings={settings} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-primary to-primary-light text-white pt-24 pb-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/30">
            <GraduationCap size={40} />
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-4">{schoolName}</h1>
          {settings.address && <p className="text-white/70 flex items-center justify-center gap-2 text-sm"><MapPin size={14} /> {settings.address}</p>}
          {welcome && <p className="text-white/80 mt-4 max-w-2xl mx-auto leading-relaxed">{welcome}</p>}

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-10 max-w-md mx-auto">
            <div className="bg-white/10 rounded-xl p-3 border border-white/20">
              <p className="text-2xl font-black">{teachers.length}</p>
              <p className="text-xs text-white/70">أستاذ</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3 border border-white/20">
              <p className="text-2xl font-black">{clubs.length}</p>
              <p className="text-xs text-white/70">نادي</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3 border border-white/20">
              <p className="text-2xl font-black">{news.length}</p>
              <p className="text-xs text-white/70">خبر</p>
            </div>
          </div>
        </div>
      </section>

      {/* Announcements ticker */}
      {announcements.length > 0 && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border-y border-amber-200 dark:border-amber-700 py-2 px-4">
          <div className="max-w-6xl mx-auto flex items-center gap-3">
            <span className="bg-amber-500 text-white text-xs font-black px-2 py-1 rounded flex-shrink-0 flex items-center gap-1">
              <Bell size={11} /> إعلان
            </span>
            <div className="overflow-hidden">
              <p className="text-amber-800 dark:text-amber-200 text-sm font-bold truncate">{announcements[0]?.title}</p>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 max-w-6xl mx-auto px-4 py-12 w-full space-y-14">

        {/* Sections grid */}
        <section>
          <h2 className="text-xl font-black text-primary dark:text-white mb-6">أقسام الموقع</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {sections.map(s => (
              <Link key={s.href} href={s.href}
                className="card p-4 flex flex-col items-center gap-2 text-center hover:shadow-lg hover:-translate-y-1 transition-all group">
                <div className={`w-12 h-12 ${s.color} rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                  <s.icon size={22} />
                </div>
                <p className="font-bold text-sm text-gray-700 dark:text-gray-200">{s.label}</p>
                {s.count !== null && <span className="text-xs text-gray-400">{s.count} عنصر</span>}
              </Link>
            ))}
          </div>
        </section>

        {/* Latest News */}
        {news.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-black text-primary dark:text-white flex items-center gap-2"><Newspaper size={20} /> آخر الأخبار</h2>
              <Link href="/news" className="text-sm text-primary hover:underline flex items-center gap-1">عرض الكل <ChevronLeft size={14} /></Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {news.slice(0, 6).map(n => (
                <div key={n.id} className="card overflow-hidden hover:shadow-md transition-all">
                  {n.imageUrl ? <img src={n.imageUrl} alt={n.title} className="w-full h-40 object-cover" /> : <div className="w-full h-40 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center text-4xl">📰</div>}
                  <div className="p-4">
                    <span className="badge bg-blue-100 text-blue-700 text-xs mb-2">{n.category}</span>
                    <h3 className="font-black text-gray-800 dark:text-white text-sm mb-1 line-clamp-2">{n.title}</h3>
                    <p className="text-xs text-gray-500 line-clamp-2">{n.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Achievements */}
        {achievements.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-black text-primary dark:text-white flex items-center gap-2"><Trophy size={20} /> جدارية الإنجازات</h2>
              <Link href="/achievements" className="text-sm text-primary hover:underline flex items-center gap-1">عرض الكل <ChevronLeft size={14} /></Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.slice(0, 3).map(a => (
                <div key={a.id} className="card p-5 text-center hover:shadow-md transition-all border-t-4 border-amber-400">
                  <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-3 text-3xl">🏆</div>
                  <span className="badge bg-amber-100 text-amber-700 text-xs mb-2">{a.type}</span>
                  <h3 className="font-black text-gray-800 dark:text-white text-sm">{a.title}</h3>
                  {a.personName && <p className="text-primary font-bold text-sm mt-1">{a.personName}</p>}
                  {a.month && <p className="text-xs text-gray-400 mt-1">{a.month} {a.year}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Activities */}
        {activities.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-black text-primary dark:text-white flex items-center gap-2"><Star size={20} /> الأنشطة المدرسية</h2>
              <Link href="/activities" className="text-sm text-primary hover:underline flex items-center gap-1">عرض الكل <ChevronLeft size={14} /></Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activities.slice(0, 3).map(a => (
                <div key={a.id} className="card p-4 hover:shadow-md transition-all">
                  <span className="badge bg-purple-100 text-purple-700 text-xs mb-2">{a.category}</span>
                  <h3 className="font-bold text-gray-800 dark:text-white text-sm mb-1">{a.title}</h3>
                  {a.description && <p className="text-xs text-gray-500 line-clamp-2">{a.description}</p>}
                  <p className="text-xs text-gray-400 mt-2">{new Date(a.date).toLocaleDateString('ar-MA')}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Clubs */}
        {clubs.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-black text-primary dark:text-white flex items-center gap-2"><Heart size={20} /> الأندية التربوية</h2>
              <Link href="/clubs" className="text-sm text-primary hover:underline flex items-center gap-1">عرض الكل <ChevronLeft size={14} /></Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {clubs.filter(c => c.isActive).slice(0, 3).map(c => (
                <Link key={c.id} href={`/clubs/${c.id}`} className="card p-4 hover:shadow-md transition-all hover:-translate-y-0.5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-black text-gray-800 dark:text-white text-sm">{c.name}</h3>
                    <span className="badge bg-green-100 text-green-700 text-xs">نشط</span>
                  </div>
                  {c.description && <p className="text-xs text-gray-500 line-clamp-2">{c.description}</p>}
                  {c.supervisors && <p className="text-xs text-gray-400 mt-2">المؤطر: {c.supervisors}</p>}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Teachers */}
        {teachers.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-black text-primary dark:text-white flex items-center gap-2"><Users size={20} /> الأطر التربوية</h2>
              <Link href="/teachers" className="text-sm text-primary hover:underline flex items-center gap-1">عرض الكل <ChevronLeft size={14} /></Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {teachers.slice(0, 8).map(t => {
                const colors = ['from-blue-500 to-blue-700','from-green-500 to-green-700','from-purple-500 to-purple-700','from-amber-500 to-amber-700'];
                return (
                  <div key={t.id} className="card p-4 text-center">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${colors[t.id % colors.length]} text-white flex items-center justify-center font-black mx-auto mb-2`}>
                      {t.fullname?.split(' ').map(w => w[0]).join('').slice(0,2)}
                    </div>
                    <p className="font-bold text-xs text-gray-800 dark:text-white truncate">{t.fullname}</p>
                    <p className="text-xs text-gray-400 truncate">{t.subject}</p>
                  </div>
                );
              })}
            </div>
          </section>
        )}

      </main>
      <Footer settings={settings} />
    </div>
  );
}
