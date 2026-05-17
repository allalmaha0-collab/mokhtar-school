'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus, Users, Trash2, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

export default function DashboardTeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    const res = await fetch('/api/teachers');
    const data = await res.json();
    setTeachers(data.teachers || []);
    setLoading(false);
  }

  async function remove(id) {
    if (!confirm('هل تريد حذف هذا الأستاذ؟')) return;
    const res = await fetch(`/api/teachers/${id}`, { method: 'DELETE' });
    if (res.ok) { toast.success('تم الحذف'); load(); }
    else toast.error('خطأ في الحذف');
  }

  const initials = name => name?.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-primary dark:text-white">الأطر التربوية</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{teachers.length} أستاذ مسجل</p>
        </div>
        <Link href="/dashboard/teachers/new" className="btn-primary">
          <Plus size={18} /> إضافة أستاذ
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" /></div>
      ) : teachers.length === 0 ? (
        <div className="card p-16 text-center text-gray-400">
          <Users size={48} className="mx-auto mb-3 opacity-40" />
          <p className="mb-4">لا يوجد أساتذة</p>
          <Link href="/dashboard/teachers/new" className="btn-primary inline-flex"><Plus size={16} /> أضف أول أستاذ</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {teachers.map(t => (
            <motion.div key={t.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card p-4 text-center">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-black text-lg mx-auto mb-3">
                {initials(t.fullname)}
              </div>
              {t.isAdminStaff && (
                <span className="badge bg-amber-100 text-amber-700 text-xs mb-1 flex items-center gap-1 justify-center">
                  <Shield size={10} /> إداري
                </span>
              )}
              <h3 className="font-black text-primary dark:text-white text-sm leading-tight mb-1">{t.fullname}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-xs mb-3">{t.subject}</p>
              <button onClick={() => remove(t.id)}
                className="w-full flex items-center justify-center gap-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 py-1.5 rounded-lg text-xs font-bold transition-all">
                <Trash2 size={12} /> حذف
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
