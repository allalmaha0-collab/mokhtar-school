'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Star, Trash2, Edit2, ToggleLeft, ToggleRight, Trash, Heart } from 'lucide-react';
import toast from 'react-hot-toast';

export default function DashboardClubsPage() {
  const [clubs,    setClubs]    = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    const res = await fetch('/api/clubs');
    const data = await res.json();
    setClubs(data.clubs || []);
    setLoading(false);
  }

  async function remove(id, name) {
    if (!confirm(`حذف نادي "${name}"؟`)) return;
    const res = await fetch(`/api/clubs/${id}`, { method: 'DELETE' });
    if (res.ok) { toast.success('تم الحذف'); load(); }
    else toast.error('خطأ في الحذف');
  }

  async function deleteAll() {
    if (!confirm(`⚠️ حذف جميع الأندية (${clubs.length})؟ لا يمكن التراجع!`)) return;
    setDeleting(true);
    const res = await fetch('/api/clubs', { method: 'DELETE' });
    if (res.ok) { toast.success('تم حذف الكل'); load(); }
    else toast.error('فشل الحذف');
    setDeleting(false);
  }

  async function toggleActive(id, current) {
    const res = await fetch(`/api/clubs/${id}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: !current }),
    });
    if (res.ok) { toast.success(current ? 'تم التعطيل' : 'تم التفعيل'); load(); }
    else toast.error('خطأ');
  }

  const active   = clubs.filter(c => c.isActive);
  const inactive = clubs.filter(c => !c.isActive);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black text-primary dark:text-white">الأندية التربوية</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {active.length} نادٍ نشط — {inactive.length} متوقف
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {clubs.length > 0 && (
            <button onClick={deleteAll} disabled={deleting}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 border border-red-200 dark:border-red-800 text-sm font-bold hover:bg-red-100 transition-all disabled:opacity-50">
              <Trash size={16} /> حذف الكل
            </button>
          )}
          <Link href="/dashboard/clubs/new" className="btn-primary">
            <Plus size={18} /> إضافة نادي
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      ) : clubs.length === 0 ? (
        <div className="card p-16 text-center text-gray-400">
          <Heart size={48} className="mx-auto mb-3 opacity-40" />
          <p className="mb-4 font-bold">لا توجد أندية</p>
          <Link href="/dashboard/clubs/new" className="btn-primary inline-flex"><Plus size={16} /> أضف أول نادٍ</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {clubs.map(c => (
            <div key={c.id} className="card p-5 hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-black text-primary dark:text-white text-base leading-tight flex-1 ml-2">{c.name}</h3>
                <span className={`badge text-xs flex-shrink-0 ${c.isActive ? 'bg-green-100 text-green-700 dark:bg-green-900/30' : 'bg-gray-100 text-gray-500 dark:bg-gray-700'}`}>
                  {c.isActive ? '● نشط' : '● متوقف'}
                </span>
              </div>
              {c.description && <p className="text-gray-500 dark:text-gray-400 text-sm mb-3 line-clamp-2">{c.description}</p>}
              {c.supervisors && (
                <p className="text-xs text-gray-400 mb-4 flex items-center gap-1">
                  <Star size={11} className="text-amber-400" /> المؤطر: {c.supervisors}
                </p>
              )}
              {c.activities?.length > 0 && (
                <p className="text-xs text-gray-400 mb-3">{c.activities.length} نشاط مسجل</p>
              )}
              <div className="flex gap-1 pt-2 border-t border-gray-100 dark:border-gray-700">
                <Link href={`/dashboard/clubs/${c.id}`}
                  className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-500 text-xs font-bold transition-all">
                  <Edit2 size={12} /> تعديل
                </Link>
                <button onClick={() => toggleActive(c.id, c.isActive)}
                  className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-bold transition-all ${c.isActive ? 'text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20' : 'text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20'}`}>
                  {c.isActive ? <ToggleRight size={12} /> : <ToggleLeft size={12} />}
                  {c.isActive ? 'تعطيل' : 'تفعيل'}
                </button>
                <button onClick={() => remove(c.id, c.name)}
                  className="flex-1 flex items-center justify-center gap-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 py-1.5 rounded-lg text-xs font-bold transition-all">
                  <Trash2 size={12} /> حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
