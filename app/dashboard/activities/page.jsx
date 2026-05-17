'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus, Star, Edit, Trash2, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

export default function DashboardActivitiesPage() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading]       = useState(true);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    const res = await fetch('/api/activities?limit=100');
    const data = await res.json();
    setActivities(data.activities || []);
    setLoading(false);
  }

  async function remove(id) {
    if (!confirm('هل تريد حذف هذا النشاط؟')) return;
    const res = await fetch(`/api/activities/${id}`, { method: 'DELETE' });
    if (res.ok) { toast.success('تم الحذف'); load(); }
    else toast.error('خطأ في الحذف');
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-primary dark:text-white">الأنشطة المدرسية</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{activities.length} نشاط مسجل</p>
        </div>
        <Link href="/dashboard/activities/new" className="btn-primary">
          <Plus size={18} /> إضافة نشاط
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" /></div>
      ) : activities.length === 0 ? (
        <div className="card p-16 text-center text-gray-400">
          <Star size={48} className="mx-auto mb-3 opacity-40" />
          <p className="mb-4">لا توجد أنشطة</p>
          <Link href="/dashboard/activities/new" className="btn-primary inline-flex"><Plus size={16} /> أضف أول نشاط</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {activities.map(a => (
            <motion.div key={a.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card p-5">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-black text-primary dark:text-white text-sm leading-tight flex-1">{a.title}</h3>
                <span className="badge bg-green-100 text-green-700 text-xs flex-shrink-0">{a.category}</span>
              </div>
              {a.description && <p className="text-gray-500 dark:text-gray-400 text-xs mb-3 line-clamp-2">{a.description}</p>}
              <p className="text-xs text-gray-400 flex items-center gap-1 mb-4">
                <Calendar size={12} /> {new Date(a.date).toLocaleDateString('ar-MA')}
              </p>
              <div className="flex gap-2">
                <button onClick={() => remove(a.id)}
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
