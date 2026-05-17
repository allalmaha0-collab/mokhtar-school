'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Calendar, Filter } from 'lucide-react';

const CATEGORIES = ['الكل', 'ثقافي', 'رياضي', 'مسابقة', 'احتفال', 'نشاط'];
const CAT_COLORS = {
  'ثقافي':   'bg-purple-100 text-purple-700',
  'رياضي':   'bg-green-100 text-green-700',
  'مسابقة':  'bg-amber-100 text-amber-700',
  'احتفال':  'bg-rose-100 text-rose-700',
  'نشاط':    'bg-blue-100 text-blue-700',
};

export default function ActivitiesPage() {
  const [activities, setActivities] = useState([]);
  const [settings, setSettings]     = useState({});
  const [category, setCategory]     = useState('الكل');
  const [selected, setSelected]     = useState(null);

  useEffect(() => {
    fetch('/api/activities?limit=50').then(r => r.json()).then(d => setActivities(d.activities || []));
    fetch('/api/settings').then(r => r.json()).then(d => setSettings(d.settings || {}));
  }, []);

  const filtered = category === 'الكل' ? activities : activities.filter(a => a.category === category);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar settings={settings} />

      <div className="mt-16 bg-gradient-to-l from-primary to-primary-light text-white py-16 px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Activity size={32} />
          </div>
          <h1 className="text-4xl font-black mb-3">الأنشطة المدرسية</h1>
          <p className="text-white/80">معرض أنشطة وفعاليات مجموعة مدارس محمد المخطار</p>
        </motion.div>
      </div>

      <main className="flex-1 py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCategory(c)}
                className={`px-5 py-2 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${category === c ? 'bg-primary text-white shadow-md' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                {c === 'الكل' && <Filter size={14} />} {c}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <Activity size={48} className="mx-auto mb-3 opacity-40" />
              <p>لا توجد أنشطة في هذه الفئة</p>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <AnimatePresence>
                {filtered.map((a, i) => (
                  <motion.div key={a.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.05 }}
                    className="card overflow-hidden cursor-pointer group"
                    onClick={() => setSelected(a)}>

                    <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden">
                      {a.images ? (
                        <img src={a.images.split(',')[0]} alt={a.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      ) : (
                        <Activity size={48} className="text-primary/30" />
                      )}
                    </div>

                    <div className="p-5">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-black text-primary dark:text-white text-sm leading-tight">{a.title}</h3>
                        <span className={`badge text-xs flex-shrink-0 ${CAT_COLORS[a.category] || 'bg-gray-100 text-gray-600'}`}>{a.category}</span>
                      </div>
                      {a.description && <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed mb-3 line-clamp-2">{a.description}</p>}
                      <p className="text-xs text-gray-400 flex items-center gap-1">
                        <Calendar size={12} /> {new Date(a.date).toLocaleDateString('ar-MA')}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </main>

      {/* Activity Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}>

              <div className="h-56 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                {selected.images ? (
                  <img src={selected.images.split(',')[0]} alt={selected.title} className="w-full h-full object-cover" />
                ) : (
                  <Activity size={60} className="text-primary/30" />
                )}
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="font-black text-primary dark:text-white text-xl leading-tight">{selected.title}</h2>
                  <span className={`badge ${CAT_COLORS[selected.category] || 'bg-gray-100 text-gray-600'}`}>{selected.category}</span>
                </div>
                {selected.description && <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{selected.description}</p>}
                <p className="text-sm text-gray-400 flex items-center gap-1 mb-4">
                  <Calendar size={14} /> {new Date(selected.date).toLocaleDateString('ar-MA', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <button onClick={() => setSelected(null)}
                  className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-light transition-all">
                  إغلاق
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer settings={settings} />
    </div>
  );
}
