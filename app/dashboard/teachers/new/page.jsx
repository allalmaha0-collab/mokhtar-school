'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Save, ArrowRight } from 'lucide-react';

export default function NewTeacherPage() {
  const router = useRouter();
  const [form, setForm] = useState({ fullname: '', subject: '', bio: '', isAdminStaff: false, order: 0 });
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.fullname || !form.subject) { toast.error('الاسم والمادة مطلوبان'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/teachers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, order: parseInt(form.order) || 0 }),
      });
      if (res.ok) { toast.success('تمت الإضافة بنجاح'); router.push('/dashboard/teachers'); }
      else { const d = await res.json(); toast.error(d.error || 'خطأ'); }
    } catch { toast.error('خطأ في الاتصال'); }
    finally { setLoading(false); }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/dashboard/teachers" className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
          <ArrowRight size={20} className="text-gray-500" />
        </Link>
        <h1 className="text-2xl font-black text-primary dark:text-white">إضافة أستاذ / إطار</h1>
      </div>

      <form onSubmit={handleSubmit} className="card p-6 space-y-5">
        <div>
          <label className="label">الاسم الكامل *</label>
          <input value={form.fullname} onChange={e => set('fullname', e.target.value)} className="input" placeholder="الاسم الكامل للأستاذ" required />
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
            <label className="label">الترتيب (رقم)</label>
            <input type="number" value={form.order} onChange={e => set('order', e.target.value)} className="input" min="0" />
          </div>
          <div className="flex items-center gap-3 mt-5">
            <input type="checkbox" id="isAdmin" checked={form.isAdminStaff} onChange={e => set('isAdminStaff', e.target.checked)}
              className="w-5 h-5 accent-primary rounded" />
            <label htmlFor="isAdmin" className="font-bold text-gray-700 dark:text-gray-300 text-sm cursor-pointer">إطار إداري</label>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={loading} className="btn-primary flex-1 justify-center disabled:opacity-60">
            {loading ? <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : <><Save size={18} /> حفظ</>}
          </button>
          <Link href="/dashboard/teachers" className="btn-outline">إلغاء</Link>
        </div>
      </form>
    </div>
  );
}
