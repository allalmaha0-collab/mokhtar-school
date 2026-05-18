'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Save, ArrowRight, Trash2 } from 'lucide-react';

export default function EditTeacherPage() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);
  const [form, setForm] = useState({ fullname: '', subject: '', bio: '', isAdminStaff: false, order: 0 });

  useEffect(() => {
    fetch(`/api/teachers/${id}`).then(r => r.json()).then(d => {
      if (d.teacher) setForm({ fullname: d.teacher.fullname, subject: d.teacher.subject, bio: d.teacher.bio || '', isAdminStaff: d.teacher.isAdminStaff, order: d.teacher.order });
      setLoading(false);
    });
  }, [id]);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.fullname || !form.subject) { toast.error('الاسم والمادة مطلوبان'); return; }
    setSaving(true);
    try {
      const res = await fetch(`/api/teachers/${id}`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, order: parseInt(form.order) || 0 }),
      });
      if (res.ok) { toast.success('تم التحديث بنجاح'); router.push('/dashboard/teachers'); }
      else { const d = await res.json(); toast.error(d.error || 'خطأ'); }
    } catch { toast.error('خطأ في الاتصال'); }
    finally { setSaving(false); }
  }

  async function handleDelete() {
    if (!confirm('حذف هذا الأستاذ نهائياً؟')) return;
    const res = await fetch(`/api/teachers/${id}`, { method: 'DELETE' });
    if (res.ok) { toast.success('تم الحذف'); router.push('/dashboard/teachers'); }
    else toast.error('فشل الحذف');
  }

  if (loading) return <div className="flex justify-center py-16"><div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" /></div>;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/teachers" className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
            <ArrowRight size={20} className="text-gray-500" />
          </Link>
          <h1 className="text-2xl font-black text-primary dark:text-white">تعديل بيانات الأستاذ</h1>
        </div>
        <button onClick={handleDelete} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-100 font-bold text-sm transition-all">
          <Trash2 size={16} /> حذف
        </button>
      </div>

      <form onSubmit={handleSubmit} className="card p-6 space-y-5">
        <div>
          <label className="label">الاسم الكامل *</label>
          <input value={form.fullname} onChange={e => set('fullname', e.target.value)} className="input" placeholder="الاسم الكامل" required />
        </div>
        <div>
          <label className="label">المادة / الوظيفة *</label>
          <input value={form.subject} onChange={e => set('subject', e.target.value)} className="input" placeholder="مثال: الرياضيات، مدير المؤسسة..." required />
        </div>
        <div>
          <label className="label">نبذة تعريفية</label>
          <textarea value={form.bio} onChange={e => set('bio', e.target.value)} className="input resize-none h-24" placeholder="نبذة مختصرة..." />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">الترتيب</label>
            <input type="number" value={form.order} onChange={e => set('order', e.target.value)} className="input" min="0" />
          </div>
          <div className="flex items-center gap-3 mt-5">
            <input type="checkbox" id="isAdmin" checked={form.isAdminStaff} onChange={e => set('isAdminStaff', e.target.checked)} className="w-5 h-5 accent-primary" />
            <label htmlFor="isAdmin" className="font-bold text-gray-700 dark:text-gray-300 text-sm cursor-pointer">إطار إداري</label>
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center disabled:opacity-60">
            {saving ? <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : <><Save size={18} /> حفظ التعديلات</>}
          </button>
          <Link href="/dashboard/teachers" className="btn-outline">إلغاء</Link>
        </div>
      </form>
    </div>
  );
}
