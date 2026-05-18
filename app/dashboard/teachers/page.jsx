'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Users, Trash2, Shield, Edit2, Trash } from 'lucide-react';
import toast from 'react-hot-toast';

export default function DashboardTeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    const res = await fetch('/api/teachers');
    const data = await res.json();
    setTeachers(data.teachers || []);
    setLoading(false);
  }

  async function remove(id, name) {
    if (!confirm(`حذف "${name}"؟`)) return;
    const res = await fetch(`/api/teachers/${id}`, { method: 'DELETE' });
    if (res.ok) { toast.success('تم الحذف'); load(); }
    else toast.error('خطأ في الحذف');
  }

  async function deleteAll() {
    if (!confirm(`⚠️ حذف جميع الأساتذة (${teachers.length})؟ لا يمكن التراجع!`)) return;
    setDeleting(true);
    const res = await fetch('/api/teachers', { method: 'DELETE' });
    if (res.ok) { toast.success('تم حذف الكل'); load(); }
    else toast.error('فشل الحذف');
    setDeleting(false);
  }

  const initials = name => name?.split(' ').slice(0, 2).map(w => w[0]).join('') || '؟';
  const admins   = teachers.filter(t => t.isAdminStaff);
  const profs    = teachers.filter(t => !t.isAdminStaff);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black text-primary dark:text-white">الأطر التربوية والإدارية</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {admins.length} إداري — {profs.length} أستاذ
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {teachers.length > 0 && (
            <button onClick={deleteAll} disabled={deleting}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 border border-red-200 dark:border-red-800 text-sm font-bold hover:bg-red-100 transition-all disabled:opacity-50">
              <Trash size={16} /> حذف الكل
            </button>
          )}
          <Link href="/dashboard/teachers/new" className="btn-primary">
            <Plus size={18} /> إضافة أستاذ
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      ) : teachers.length === 0 ? (
        <div className="card p-16 text-center text-gray-400">
          <Users size={48} className="mx-auto mb-3 opacity-40" />
          <p className="mb-4 font-bold">لا يوجد أساتذة مسجلون</p>
          <Link href="/dashboard/teachers/new" className="btn-primary inline-flex">
            <Plus size={16} /> أضف أول أستاذ
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Admins */}
          {admins.length > 0 && (
            <div>
              <h2 className="text-sm font-black text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-2">
                <Shield size={14} className="text-amber-500" /> الإطار الإداري ({admins.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {admins.map(t => <TeacherCard key={t.id} t={t} onDelete={remove} initials={initials} />)}
              </div>
            </div>
          )}

          {/* Teachers */}
          {profs.length > 0 && (
            <div>
              <h2 className="text-sm font-black text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-2">
                <Users size={14} className="text-primary" /> الأساتذة ({profs.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {profs.map(t => <TeacherCard key={t.id} t={t} onDelete={remove} initials={initials} />)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function TeacherCard({ t, onDelete, initials }) {
  const colors = ['from-blue-500 to-blue-700', 'from-green-500 to-green-700', 'from-purple-500 to-purple-700',
    'from-orange-500 to-orange-700', 'from-teal-500 to-teal-700', 'from-rose-500 to-rose-700'];
  const color = colors[t.id % colors.length];

  return (
    <div className="card p-4 text-center group hover:shadow-md transition-all">
      <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white font-black text-lg mx-auto mb-3`}>
        {initials(t.fullname)}
      </div>
      {t.isAdminStaff && (
        <span className="badge bg-amber-100 text-amber-700 text-xs mb-1 inline-flex items-center gap-1">
          <Shield size={10} /> إداري
        </span>
      )}
      <h3 className="font-black text-gray-800 dark:text-white text-sm leading-tight mb-0.5">{t.fullname}</h3>
      <p className="text-gray-500 dark:text-gray-400 text-xs mb-3">{t.subject}</p>
      {t.bio && <p className="text-gray-400 text-xs mb-3 line-clamp-2">{t.bio}</p>}
      <div className="flex gap-1">
        <Link href={`/dashboard/teachers/${t.id}`}
          className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-500 text-xs font-bold transition-all">
          <Edit2 size={12} /> تعديل
        </Link>
        <button onClick={() => onDelete(t.id, t.fullname)}
          className="flex-1 flex items-center justify-center gap-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 py-1.5 rounded-lg text-xs font-bold transition-all">
          <Trash2 size={12} /> حذف
        </button>
      </div>
    </div>
  );
}
