'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Sun, Moon, Menu, X, GraduationCap, ChevronDown } from 'lucide-react';
import BreakingNewsTicker from '@/components/BreakingNewsTicker';

const LINKS = [
  { href: '/',           label: 'الرئيسية' },
  { href: '/about',      label: 'المؤسسة' },
  { href: '/results',    label: 'النتائج' },
  { href: '/teachers',   label: 'الأطر التربوية' },
  { href: '/clubs',      label: 'الأندية' },
  { href: '/boarding',   label: 'الداخلية' },
  { href: '/social',     label: 'المختص الاجتماعي' },
  { href: '/activities', label: 'الأنشطة' },
  { href: '/contact',    label: 'اتصل بنا' },
];

export default function Navbar({ settings = {} }) {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme }     = useTheme();
  const pathname                = usePathname();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const isActive = href => href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 font-cairo ${
      scrolled ? 'bg-primary/97 backdrop-blur-sm shadow-lg' : 'bg-primary'
    }`}>
      <BreakingNewsTicker />
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 text-white flex-shrink-0">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center border border-white/30">
            <GraduationCap size={22} />
          </div>
          <div className="hidden sm:block">
            <p className="font-black text-sm leading-tight">مجموعة مدارس محمد المخطار</p>
            <p className="text-xs text-white/60">المديرية الإقليمية فجيج</p>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden xl:flex items-center gap-0.5">
          {LINKS.map(l => (
            <li key={l.href}>
              <Link href={l.href}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 ${
                  isActive(l.href)
                    ? 'bg-white/20 text-white'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg text-white/70 hover:bg-white/15 hover:text-white transition-all">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link href="/dashboard"
            className="hidden md:flex items-center gap-1.5 bg-secondary-light text-white px-4 py-2 rounded-lg text-xs font-black hover:bg-secondary transition-all shadow-md">
            لوحة الإدارة
          </Link>
          <button onClick={() => setOpen(!open)} className="xl:hidden p-2 text-white/80 hover:text-white transition-colors">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="xl:hidden bg-primary-light/95 backdrop-blur border-t border-white/10 px-4 py-4 flex flex-col gap-1 shadow-xl">
          {LINKS.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                isActive(l.href) ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}>
              {l.label}
            </Link>
          ))}
          <div className="pt-2 mt-2 border-t border-white/10">
            <Link href="/dashboard" onClick={() => setOpen(false)}
              className="block text-center bg-secondary-light text-white py-2.5 rounded-xl text-sm font-black hover:bg-secondary transition-all">
              لوحة الإدارة
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
