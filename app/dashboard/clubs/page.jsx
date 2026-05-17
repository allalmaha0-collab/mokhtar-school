'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus, Star, Trash2, Edit, ToggleLeft, ToggleRight } from 'lucide-react';
import toast from 'react-hot-toast';

export default function DashboardClubsPage() {
  const [clubs, setClubs]     = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    // Fetch all clubs (including inactive) for admin
    const res = await fetch('/api/clubs');
    const data = await res.json();
    setClubs(data.clubs || []);
    setLoading(false);
  }

  async function remove(id) {
    if (!confirm('هل تريد حذف هذا النادي؟')) return;
    const res = await fetch(`/api/clubs/${id}`, { method: 'DELETE' });
    if (res.ok) { toast.success('تم الحذف'); load(); }
    else toast.error('خطأ في الحذف');
  }

  async function toggleActive(id, current) {
    const res = await fetch(`/api/clubs/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: !current }),
    });
    if (res.ok) { toast.success(current ? 'تم تعطيل النادي' : 'تم تفعيل النادي'); load(); }
    else toast.error('خطأ');
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-primary dark:text-white">الأندية التربوية</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{clubs.length} نادٍ مسجل</p>
        </div>
        <Link href="/dashboard/clubs/new" className="btn-primary">
          <Plus size={18} /> إضافة نادي
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" /></div>
      ) : clubs.length === 0 ? (
        <div className="card p-16 text-center text-gray-400">
          <Star size={48} className="mx-auto mb-3 opacity-40" />
          <p className="mb-4">لا توجد أندية</p>
          <Link href="/dashboard/clubs/new" className="btn-primary inline-flex"><Plus size={16} /> أضف أول نادٍ</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {clubs.map(c => (
            <motion.div key={c.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card p-5">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-black text-primary dark:text-white text-base leading-tight flex-1 ml-2">{c.name}</h3>
                <span className={`badge text-xs ${c.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {c.isActive ? 'نشط' : 'متوقف'}
                </span>
              </div>
              {c.description && <p className="text-gray-500 dark:text-gray-400 text-sm mb-3 line-clamp-2">{c.description}</p>}
              {c.supervisors && <p className="text-xs text-gray-400 mb-4">المؤطر: {c.supervisors}</p>}

              <div className="flex gap-2">
                <button onClick={() => toggleActive(c.id, c.isActive)}
                  className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-bold transition-all ${c.isActive ? 'text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20' : 'text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20'}`}>
                  {c.isActive ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
                  {c.isActive ? 'تعطيل' : 'تفعيل'}
                </button>
                <button onClick={() => remove(c.id)}
                  className="flex-1 flex items-center justify-center gap-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 py-2 rounded-xl text-xs font-bold transition-all">
                  <Trash2 size={14} /> حذف
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
