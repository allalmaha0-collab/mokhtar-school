'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Plus, Trash2, Edit2, Search } from 'lucide-react';

export default function NewsPage() {
  const [news,    setNews]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [search,  setSearch]  = useState('');

  async function fetchNews() {
    setLoading(true);
    const res  = await fetch('/api/news?all=true');
    const data = await res.json();
    setNews(data.news || []);
    setLoading(false);
  }
  useEffect(() => { fetchNews(); }, []);

  async function deleteNews(id) {
    if (!confirm('حذف هذا الخبر؟')) return;
    const res = await fetch(`/api/news/${id}`, { method: 'DELETE' });
    if (res.ok) { toast.success('تم الحذف'); fetchNews(); }
    else toast.error('فشل الحذف');
  }

  const filtered = news.filter(n => !search || n.title.includes(search));

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-black text-primary dark:text-white">الأخبار والإعلانات</h1>
        <Link href="/dashboard/news/new" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-light transition-all">
          <Plus size={16} /> خبر جديد
        </Link>
      </div>

      <div className="relative">
        <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input className="input pr-9 text-sm" placeholder="بحث في الأخبار..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {loading ? <p className="text-center py-10 text-gray-400">جاري التحميل...</p>
        : filtered.length === 0 ? <p className="text-center py-10 text-gray-400">لا توجد أخبار</p>
        : filtered.map(n => (
          <div key={n.id} className="card p-4 flex items-start gap-4">
            {n.imageUrl
              ? <img src={n.imageUrl} alt={n.title} className="w-20 h-16 rounded-xl object-cover flex-shrink-0" />
              : <div className="w-20 h-16 rounded-xl bg-gradient-to-br from-primary-pale to-secondary-pale dark:from-gray-700 dark:to-gray-600 flex items-center justify-center text-2xl flex-shrink-0">📰</div>
            }
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="badge bg-orange-100 text-orange-700">{n.category}</span>
              </div>
              <h3 className="font-bold text-gray-800 dark:text-white text-sm truncate">{n.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{n.content}</p>
              <p className="text-xs text-gray-400 mt-1">{new Date(n.publishedAt).toLocaleDateString('ar-MA')}</p>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <Link href={`/dashboard/news/${n.id}`} className="p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-500 transition-all"><Edit2 size={15} /></Link>
              <button onClick={() => deleteNews(n.id)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-400 transition-all"><Trash2 size={15} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
