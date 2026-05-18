'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Save, ArrowRight, Trash2 } from 'lucide-react';

export default function EditClubPage() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);
  const [form, setForm] = useState({ name: '', description: '', supervisors: '', isActive: true, order: 0 });

  useEffect(() => {
    fetch(`/api/clubs/${id}`).then(r => r.json()).then(d => {
      if (d.club) setForm({ name: d.club.name, description: d.club.description || '', supervisors: d.club.supervisors || '', isActive: d.club.isActive, order: d.club.order });
      setLoading(false);
    });
  }, [id]);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim()) { toast.error('اسم النادي مطلوب'); return; }
    setSaving(true);
    try {
      const res = await fetch(`/api/clubs/${id}`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, order: parseInt(form.order) || 0 }),
      });
      if (res.ok) { toast.success('تم التحديث'); router.push('/dashboard/clubs'); }
      else { const d = await res.json(); toast.error(d.error || 'خطأ'); }
    } catch { toast.error('خطأ في الاتصال'); }
    finally { setSaving(false); }
  }

  async function handleDelete() {
    if (!confirm('حذف هذا النادي وجميع أنشطته؟')) return;
    const res = await fetch(`/api/clubs/${id}`, { method: 'DELETE' });
    if (res.ok) { toast.success('تم الحذف'); router.push('/dashboard/clubs'); }
    else toast.error('فشل الحذف');
  }

  if (loading) return <div className="flex justify-center py-16"><div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" /></div>;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/clubs" className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700">
            <ArrowRight size={20} className="text-gray-500" />
          </Link>
          <h1 className="text-2xl font-black text-primary dark:text-white">تعديل النادي</h1>
        </div>
        <button onClick={handleDelete} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-100 font-bold text-sm transition-all">
          <Trash2 size={16} /> حذف
        </button>
      </div>

      <form onSubmit={handleSubmit} className="card p-6 space-y-5">
        <div>
          <label className="label">اسم النادي *</label>
          <input value={form.name} onChange={e => set('name', e.target.value)} className="input" placeholder="مثال: نادي القراءة" required />
        </div>
        <div>
          <label className="label">الوصف</label>
          <textarea value={form.description} onChange={e => set('description', e.target.value)} className="input resize-none h-24" placeholder="وصف النادي وأهدافه..." />
        </div>
        <div>
          <label className="label">المؤطر / المشرف</label>
          <input value={form.supervisors} onChange={e => set('supervisors', e.target.value)} className="input" placeholder="اسم الأستاذ المشرف" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">الترتيب</label>
            <input type="number" value={form.order} onChange={e => set('order', e.target.value)} className="input" min="0" />
          </div>
          <div className="flex items-center gap-3 mt-5">
            <input type="checkbox" id="isActive" checked={form.isActive} onChange={e => set('isActive', e.target.checked)} className="w-5 h-5 accent-primary" />
            <label htmlFor="isActive" className="font-bold text-gray-700 dark:text-gray-300 text-sm cursor-pointer">نادٍ نشط</label>
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center disabled:opacity-60">
            {saving ? <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : <><Save size={18} /> حفظ التعديلات</>}
          </button>
          <Link href="/dashboard/clubs" className="btn-outline">إلغاء</Link>
        </div>
      </form>
    </div>
  );
}
