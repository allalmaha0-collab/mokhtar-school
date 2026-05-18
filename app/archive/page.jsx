'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Image } from 'lucide-react';

export default function ArchivePage() {
  const [photos,   setPhotos]   = useState([]);
  const [settings, setSettings] = useState({});
  const [loading,  setLoading]  = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch('/api/photos').then(r => r.json()),
      fetch('/api/settings').then(r => r.json()),
    ]).then(([p, s]) => { setPhotos(p.photos || []); setSettings(s.settings || {}); setLoading(false); });
  }, []);

  const byYear = photos.reduce((a, p) => { const y = p.year || 'بدون تصنيف'; (a[y] = a[y]||[]).push(p); return a; }, {});
  const years  = Object.keys(byYear).sort((a,b) => b.localeCompare(a));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar settings={settings} />
      <div className="mt-16 bg-gradient-to-l from-teal-600 to-teal-500 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Image size={40} className="mx-auto mb-3" />
          <h1 className="text-3xl font-black mb-2">أرشيف الصور</h1>
          <p className="text-white/80 text-sm">ذاكرة المؤسسة عبر السنين</p>
        </div>
      </div>

      <main className="flex-1 max-w-6xl mx-auto px-4 py-10 w-full">
        {loading ? (
          <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-teal-200 border-t-teal-500 rounded-full animate-spin" /></div>
        ) : photos.length === 0 ? (
          <div className="text-center py-20 text-gray-400"><Image size={48} className="mx-auto mb-3 opacity-30" /><p>لا توجد صور في الأرشيف</p></div>
        ) : (
          <div className="space-y-10">
            {years.map(year => (
              <div key={year}>
                <h2 className="text-lg font-black text-gray-700 dark:text-gray-200 mb-4 flex items-center gap-2">
                  <span className="bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 px-3 py-1 rounded-lg">📅 {year}</span>
                  <span className="text-sm text-gray-400">({byYear[year].length} صورة)</span>
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {byYear[year].map(p => (
                    <button key={p.id} onClick={() => setSelected(p)}
                      className="group relative rounded-xl overflow-hidden aspect-square bg-gray-200 dark:bg-gray-700 hover:shadow-lg transition-all hover:scale-105">
                      <img src={p.url} alt={p.title} className="w-full h-full object-cover" onError={e => { e.target.src=''; e.target.style.display='none'; }} />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex items-end p-2">
                        <p className="text-white text-xs font-bold text-right">{p.title}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Lightbox */}
      {selected && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="max-w-2xl w-full" onClick={e => e.stopPropagation()}>
            <img src={selected.url} alt={selected.title} className="w-full rounded-xl" />
            <div className="text-white text-center mt-3">
              <p className="font-bold">{selected.title}</p>
              {selected.year && <p className="text-white/60 text-sm">{selected.year}</p>}
              {selected.description && <p className="text-white/70 text-sm mt-1">{selected.description}</p>}
            </div>
            <button onClick={() => setSelected(null)} className="mt-4 w-full py-2 bg-white/20 text-white rounded-xl hover:bg-white/30 font-bold">إغلاق</button>
          </div>
        </div>
      )}

      <Footer settings={settings} />
    </div>
  );
}
