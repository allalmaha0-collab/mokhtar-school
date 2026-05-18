'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FileText, ExternalLink } from 'lucide-react';

export default function TeacherDocsPublicPage() {
  const [resources, setResources] = useState([]);
  const [settings,  setSettings]  = useState({});
  const [loading,   setLoading]   = useState(true);
  const [filter,    setFilter]    = useState('all');

  useEffect(() => {
    Promise.all([
      fetch('/api/resources?type=teacher').then(r => r.json()),
      fetch('/api/settings').then(r => r.json()),
    ]).then(([r, s]) => { setResources(r.resources || []); setSettings(s.settings || {}); setLoading(false); });
  }, []);

  const categories = [...new Set(resources.map(r => r.category))];
  const filtered   = filter === 'all' ? resources : resources.filter(r => r.category === filter);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar settings={settings} />
      <div className="mt-16 bg-gradient-to-l from-lime-600 to-lime-500 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <FileText size={40} className="mx-auto mb-3" />
          <h1 className="text-3xl font-black mb-2">وثائق الأساتذة</h1>
          <p className="text-white/80 text-sm">برامج دراسية — مذكرات — وثائق إدارية</p>
        </div>
      </div>

      <main className="flex-1 max-w-6xl mx-auto px-4 py-10 w-full">
        {categories.length > 0 && (
          <div className="flex gap-2 flex-wrap mb-8">
            <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${filter==='all' ? 'bg-lime-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600'}`}>الكل ({resources.length})</button>
            {categories.map(c => <button key={c} onClick={() => setFilter(c)} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${filter===c ? 'bg-lime-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600'}`}>{c}</button>)}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-lime-200 border-t-lime-500 rounded-full animate-spin" /></div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400"><FileText size={48} className="mx-auto mb-3 opacity-30" /><p>لا توجد وثائق بعد</p></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(r => (
              <div key={r.id} className="card p-4 hover:shadow-md transition-all">
                <span className="badge bg-lime-100 text-lime-700 text-xs mb-2">{r.category}</span>
                <h3 className="font-bold text-gray-800 dark:text-white text-sm mb-1">{r.title}</h3>
                {r.description && <p className="text-xs text-gray-500 mb-3 line-clamp-2">{r.description}</p>}
                {r.fileUrl && <a href={r.fileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-lime-50 dark:bg-lime-900/20 text-lime-700 dark:text-lime-300 px-3 py-2 rounded-xl text-sm font-bold hover:bg-lime-100 transition-all">
                  <ExternalLink size={14} /> تنزيل / فتح
                </a>}
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer settings={settings} />
    </div>
  );
}
