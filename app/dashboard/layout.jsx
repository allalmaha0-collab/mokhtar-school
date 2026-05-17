'use client';
import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { Menu, Bell, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function DashboardLayout({ children }) {
  const [sideOpen, setSideOpen] = useState(false);
  const { theme, setTheme }     = useTheme();

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-950 font-cairo overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sideOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-64 flex-shrink-0"><Sidebar onClose={() => setSideOpen(false)} /></div>
          <div className="flex-1 bg-black/50" onClick={() => setSideOpen(false)} />
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-14 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 flex-shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setSideOpen(true)}>
              <Menu size={20} className="text-gray-600 dark:text-gray-300" />
            </button>
            <h1 className="font-black text-primary dark:text-white text-sm hidden sm:block">لوحة تحكم — مجموعة مدارس محمد المختار</h1>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 relative">
              <Bell size={18} />
            </button>
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-black">م</div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
