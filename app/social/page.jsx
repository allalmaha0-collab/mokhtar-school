'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { HandHeart, Calendar } from 'lucide-react';

const CAT_COLORS = {
  'توعية':     'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  'إرشاد':     'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  'دعم نفسي':  'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  'أنشطة':     'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  'إعلان':     'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
};

export default function SocialPage() {
  const [posts,    setPosts]    = useState([]);
  const [settings, setSettings] = useState({});
  const [loading,  setLoading]  = useState(true);
  const [filter,   setFilter]   = useState('all');

  useEffect(() => {
    Promise.all([
      fetch('/api/social').then(r => r.json()),
      fetch('/api/settings').then(r => r.json()),
    ]).then(([s, st]) => {
      setPosts(s.posts || []);
      setSettings(st.settings || {});
      setLoading(false);
    });
  }, []);

  const categories = [...new Set(posts.map(p => p.category))];
  const filtered   = filter === 'all' ? posts : posts.filter(p => p.category === filter);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar settings={settings} />

      <div className="mt-16 bg-gradient-to-l from-pink-600 to-rose-500 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/30">
            <HandHeart size={30} />
          </div>
          <h1 className="text-4xl font-black mb-2">المختص الاجتماعي</h1>
          <p className="text-white/70 text-sm">توعية — إرشاد — دعم نفسي — أنشطة</p>
        </div>
      </div>

      <main className="flex-1 max-w-4xl mx-auto px-4 py-10 w-full">

        {categories.length > 0 && (
          <div className="flex gap-2 flex-wrap mb-8">
            <button onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${filter === 'all' ? 'bg-rose-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 hover:bg-gray-200'}`}>
              الكل ({posts.length})
            </button>
            {categories.map(c => (
              <button key={c} onClick={() => setFilter(c)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${filter === c ? 'bg-rose-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 hover:bg-gray-200'}`}>
                {c} ({posts.filter(p => p.category === c).length})
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-rose-200 border-t-rose-500 rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="card p-16 text-center text-gray-400">
            <HandHeart size={48} className="mx-auto mb-3 opacity-30" />
            <p className="font-bold">لا توجد منشورات بعد</p>
            <p className="text-sm mt-1">أضف محتوى من لوحة الإدارة → المختص الاجتماعي</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map(p => (
              <div key={p.id} className="card p-5 hover:shadow-md transition-all">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className={`badge text-xs ${CAT_COLORS[p.category] || 'bg-gray-100 text-gray-600'}`}>{p.category}</span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Calendar size={11} /> {new Date(p.date || p.createdAt).toLocaleDateString('ar-MA')}
                  </span>
                </div>
                <h3 className="font-black text-gray-800 dark:text-white text-lg mb-2">{p.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{p.content}</p>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer settings={settings} />
    </div>
  );
}
