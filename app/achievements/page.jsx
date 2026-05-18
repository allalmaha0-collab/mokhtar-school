'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Trophy, Star } from 'lucide-react';

const TYPES = ['تلميذ الشهر','أستاذ الشهر','إنجاز مؤسسي','جائزة','تميز'];
const typeColors = {
  'تلميذ الشهر':  'from-blue-400 to-blue-600',
  'أستاذ الشهر':  'from-green-400 to-green-600',
  'إنجاز مؤسسي': 'from-purple-400 to-purple-600',
  'جائزة':        'from-amber-400 to-amber-600',
  'تميز':         'from-rose-400 to-rose-600',
};
const typeEmoji = { 'تلميذ الشهر':'🎓','أستاذ الشهر':'👨‍🏫','إنجاز مؤسسي':'🏫','جائزة':'🏆','تميز':'⭐' };

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState([]);
  const [settings, setSettings]         = useState({});
  const [filter, setFilter]             = useState('all');
  const [loading, setLoading]           = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/achievements').then(r => r.json()),
      fetch('/api/settings').then(r => r.json()),
    ]).then(([a, s]) => { setAchievements(a.achievements || []); setSettings(s.settings || {}); setLoading(false); });
  }, []);

  const filtered = filter === 'all' ? achievements : achievements.filter(a => a.type === filter);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar settings={settings} />
      <div className="mt-16 bg-gradient-to-l from-amber-600 to-amber-500 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Trophy size={40} className="mx-auto mb-3" />
          <h1 className="text-3xl font-black mb-2">جدارية الإنجازات</h1>
          <p className="text-white/80 text-sm">تلميذ الشهر — أستاذ الشهر — إنجازات المؤسسة</p>
        </div>
      </div>

      <main className="flex-1 max-w-6xl mx-auto px-4 py-10 w-full">
        {/* Filter */}
        <div className="flex gap-2 flex-wrap mb-8">
          <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${filter==='all' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>الكل ({achievements.length})</button>
          {TYPES.map(t => {
            const count = achievements.filter(a => a.type === t).length;
            if (!count) return null;
            return <button key={t} onClick={() => setFilter(t)} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${filter===t ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>{typeEmoji[t]} {t} ({count})</button>;
          })}
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin" /></div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400"><Trophy size={48} className="mx-auto mb-3 opacity-30" /><p>لا توجد إنجازات بعد</p></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(a => (
              <div key={a.id} className="card overflow-hidden hover:shadow-lg transition-all">
                <div className={`bg-gradient-to-r ${typeColors[a.type] || 'from-gray-400 to-gray-600'} p-6 text-white text-center`}>
                  <span className="text-4xl">{typeEmoji[a.type] || '⭐'}</span>
                  <p className="text-xs font-black mt-2 opacity-80">{a.type}</p>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-black text-gray-800 dark:text-white mb-1">{a.title}</h3>
                  {a.personName && <p className="text-primary dark:text-blue-300 font-bold text-sm">{a.personName}</p>}
                  {a.level      && <p className="text-xs text-gray-400 mt-0.5">{a.level}</p>}
                  {a.month      && <p className="text-xs text-gray-400">{a.month} {a.year}</p>}
                  {a.description && <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">{a.description}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer settings={settings} />
    </div>
  );
}
