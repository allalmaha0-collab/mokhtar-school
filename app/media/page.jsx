'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mic, ExternalLink } from 'lucide-react';

const TYPES = [
  { key: 'podcast',  label: 'بودكاست تربوي', emoji: '🎙️' },
  { key: 'radio',    label: 'إذاعة مدرسية',   emoji: '📻' },
  { key: 'magazine', label: 'مجلة إلكترونية', emoji: '📖' },
  { key: 'video',    label: 'فيديو تعليمي',   emoji: '🎥' },
];

export default function MediaPage() {
  const [media,    setMedia]    = useState([]);
  const [settings, setSettings] = useState({});
  const [tab,      setTab]      = useState('all');
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/media').then(r => r.json()),
      fetch('/api/settings').then(r => r.json()),
    ]).then(([m, s]) => { setMedia(m.media || []); setSettings(s.settings || {}); setLoading(false); });
  }, []);

  const filtered = tab === 'all' ? media : media.filter(m => m.type === tab);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar settings={settings} />
      <div className="mt-16 bg-gradient-to-l from-indigo-600 to-indigo-500 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Mic size={40} className="mx-auto mb-3" />
          <h1 className="text-3xl font-black mb-2">الإعلام المدرسي</h1>
          <p className="text-white/80 text-sm">بودكاست — إذاعة — مجلة — فيديو</p>
        </div>
      </div>

      <main className="flex-1 max-w-6xl mx-auto px-4 py-10 w-full">
        <div className="flex gap-2 flex-wrap mb-8">
          <button onClick={() => setTab('all')} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${tab==='all' ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600'}`}>الكل</button>
          {TYPES.map(t => {
            const c = media.filter(m => m.type === t.key).length;
            if (!c) return null;
            return <button key={t.key} onClick={() => setTab(t.key)} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${tab===t.key ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600'}`}>{t.emoji} {t.label} ({c})</button>;
          })}
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin" /></div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400"><Mic size={48} className="mx-auto mb-3 opacity-30" /><p>لا يوجد محتوى إعلامي بعد</p></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(m => {
              const t = TYPES.find(x => x.key === m.type);
              return (
                <div key={m.id} className="card overflow-hidden hover:shadow-lg transition-all">
                  <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 p-6 text-center text-white">
                    <span className="text-4xl">{t?.emoji || '🎵'}</span>
                    <p className="text-xs font-bold mt-2 opacity-80">{t?.label}</p>
                    {m.episode && <p className="text-xs opacity-70">الحلقة {m.episode}</p>}
                  </div>
                  <div className="p-4">
                    <h3 className="font-black text-gray-800 dark:text-white text-sm mb-1">{m.title}</h3>
                    {m.duration    && <p className="text-xs text-gray-400 mb-1">⏱ {m.duration}</p>}
                    {m.description && <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">{m.description}</p>}
                    {m.url && <a href={m.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 px-3 py-2 rounded-xl text-sm font-bold hover:bg-indigo-100 transition-all">
                      <ExternalLink size={14} /> فتح المحتوى
                    </a>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
      <Footer settings={settings} />
    </div>
  );
}
