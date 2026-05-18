'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  LayoutDashboard, Newspaper, Star, Users, GraduationCap,
  Settings, MessageSquare, LogOut, Heart, Building2, HandHeart, Home,
  FileText, BookOpen, Zap
} from 'lucide-react';

const nav = [
  { href: '/dashboard',              icon: LayoutDashboard, label: 'الرئيسية',          group: null },
  { href: '/dashboard/news',         icon: Newspaper,       label: 'الأخبار',            group: 'المحتوى' },
  { href: '/dashboard/activities',   icon: Star,            label: 'الأنشطة',            group: 'المحتوى' },
  { href: '/dashboard/clubs',        icon: Heart,           label: 'الأندية',            group: 'المحتوى' },
  { href: '/dashboard/social',       icon: HandHeart,       label: 'المختص الاجتماعي',  group: 'المحتوى' },
  { href: '/dashboard/boarding',     icon: Home,            label: 'فضاء الداخلية',      group: 'المحتوى' },
  { href: '/dashboard/teachers',     icon: Users,           label: 'الأساتذة',           group: 'الأطر' },
  { href: '/dashboard/teacher-docs', icon: FileText,        label: 'وثائق الأساتذة',     group: 'الأطر' },
  { href: '/dashboard/student-docs', icon: BookOpen,        label: 'وثائق التلاميذ',     group: 'التلاميذ' },
  { href: '/dashboard/messages',     icon: MessageSquare,   label: 'الرسائل',            group: 'أخرى' },
  { href: '/dashboard/settings',     icon: Settings,        label: 'الإعدادات',          group: 'أخرى' },
];

export default function Sidebar({ onClose }) {
  const pathname = usePathname();
  const router   = useRouter();

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    toast.success('تم تسجيل الخروج');
    router.push('/login');
  }

  const groups = ['المحتوى', 'الأطر', 'التلاميذ', 'أخرى'];

  return (
    <aside className="w-64 bg-primary dark:bg-gray-900 h-full flex flex-col font-cairo shadow-xl">
      {/* Logo */}
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center">
            <Building2 size={20} className="text-white" />
          </div>
          <div>
            <p className="text-white font-black text-sm leading-tight">محمد المخطار</p>
            <p className="text-white/50 text-xs">لوحة الإدارة</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 overflow-y-auto">
        {/* Dashboard */}
        <Link href="/dashboard" onClick={onClose}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all mb-1 ${
            pathname === '/dashboard' ? 'bg-secondary-light text-white shadow' : 'text-white/70 hover:bg-white/10 hover:text-white'
          }`}>
          <LayoutDashboard size={18} /> لوحة التحكم
        </Link>

        {groups.map(g => {
          const items = nav.filter(n => n.group === g);
          return (
            <div key={g} className="mt-5">
              <p className="text-white/30 text-xs font-black px-3 mb-2 uppercase tracking-wider">{g}</p>
              {items.map(item => (
                <Link key={item.href} href={item.href} onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all mt-0.5 ${
                    pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href + '/'))
                      ? 'bg-secondary-light text-white shadow'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}>
                  <item.icon size={18} />
                  <span className="flex-1">{item.label}</span>
                  {item.href === '/dashboard/import' && (
                    <span className="bg-orange-400 text-white text-xs px-2 py-0.5 rounded-full">Excel</span>
                  )}
                </Link>
              ))}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-white/10">
        <Link href="/" onClick={onClose}
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 text-sm transition-all mb-1">
          ← العودة للموقع
        </Link>
        <button onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-red-300 hover:bg-red-500/20 hover:text-red-200 text-sm font-bold transition-all">
          <LogOut size={18} /> تسجيل الخروج
        </button>
      </div>
    </aside>
  );
}
