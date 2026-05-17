'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Newspaper, Calendar, Search } from 'lucide-react';

const CATEGORIES = ['الكل', 'إعلان', 'فعالية', 'ثقافي', 'نتائج', 'نشاط', 'عام'];
const CAT_COLORS = {
  'إعلان': 'bg-blue-100 text-blue-700',
  'فعالية': 'bg-amber-100 text-amber-700',
  'ثقافي': 'bg-purple-100 text-purple-700',
  'نتائج': 'bg-green-100 text-green-700',
  'نشاط': 'bg-teal-100 text-teal-700',
  'عام': 'bg-gray-100 text-gray-600',
};

export default function NewsPage() {
  const [news, setNews]         = useState([]);
  const [settings, setSettings] = useState({});
  const [category, setCategory] = useState('الكل');
  const [search, setSearch]     = useState('');

  useEffect(() => {
    fetch('/api/news?limit=50').then(r => r.json()).then(d => setNews(d.news || []));
    fetch('/api/settings').then(r => r.json()).then(d => setSettings(d.settings || {}));
  }, []);

  const filtered = news
    .filter(n => category === 'الكل' || n.category === category)
    .filter(n => !search || n.title.includes(search) || n.content?.includes(search));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar settings={settings} />

      <div className="mt-16 bg-gradient-to-l from-primary to-primary-light text-white py-16 px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Newspaper size={32} />
          </div>
          <h1 className="text-4xl font-black mb-3">الأخبار والإعلانات</h1>
          <p className="text-white/80">آخر أخبار وإعلانات مجموعة مدارس محمد المخطار</p>
        </motion.div>
      </div>

      <main className="flex-1 py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">

          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                className="input pr-10" placeholder="ابحث في الأخبار..." />
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(c => (
                <button key={c} onClick={() => setCategory(c)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${category === c ? 'bg-primary text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <Newspaper size={48} className="mx-auto mb-3 opacity-40" />
              <p>لا توجد أخبار</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((n, i) => (
                <motion.div key={n.id}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="card overflow-hidden">
                  <div className="h-44 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    {n.imageUrl ? (
                      <img src={n.imageUrl} alt={n.title} className="w-full h-full object-cover" />
                    ) : (
                      <Newspaper size={44} className="text-primary/30" />
                    )}
                  </div>
                  <div className="p-5">
                    <span className={`badge text-xs mb-2 ${CAT_COLORS[n.category] || 'bg-gray-100 text-gray-600'}`}>{n.category}</span>
                    <h3 className="font-black text-primary dark:text-white mb-2 leading-tight">{n.title}</h3>
                    {n.content && <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-3 line-clamp-3">{n.content}</p>}
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <Calendar size={12} /> {new Date(n.publishedAt).toLocaleDateString('ar-MA', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer settings={settings} />
    </div>
  );
}
