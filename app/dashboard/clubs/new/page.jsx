'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Save, ArrowRight } from 'lucide-react';

export default function NewClubPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', description: '', supervisors: '', isActive: true, order: 0 });
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name) { toast.error('اسم النادي مطلوب'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/clubs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, order: parseInt(form.order) || 0 }),
      });
      if (res.ok) { toast.success('تمت إضافة النادي بنجاح'); router.push('/dashboard/clubs'); }
      else { const d = await res.json(); toast.error(d.error || 'خطأ'); }
    } catch { toast.error('خطأ في الاتصال'); }
    finally { setLoading(false); }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/dashboard/clubs" className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
          <ArrowRight size={20} className="text-gray-500" />
        </Link>
        <h1 className="text-2xl font-black text-primary dark:text-white">إضافة نادٍ جديد</h1>
      </div>

      <form onSubmit={handleSubmit} className="card p-6 space-y-5">
        <div>
          <label className="label">اسم النادي *</label>
          <input value={form.name} onChange={e => set('name', e.target.value)} className="input" placeholder="مثال: نادي القراءة والكتابة" required />
        </div>
        <div>
          <label className="label">وصف النادي</label>
          <textarea value={form.description} onChange={e => set('description', e.target.value)} className="input resize-none h-28" placeholder="اكتب وصفاً للنادي وأهدافه..." />
        </div>
        <div>
          <label className="label">المؤطرون</label>
          <input value={form.supervisors} onChange={e => set('supervisors', e.target.value)} className="input" placeholder="أسماء الأساتذة المؤطرين للنادي" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">الترتيب</label>
            <input type="number" value={form.order} onChange={e => set('order', e.target.value)} className="input" min="0" />
          </div>
          <div className="flex items-center gap-3 mt-5">
            <input type="checkbox" id="isActive" checked={form.isActive} onChange={e => set('isActive', e.target.checked)}
              className="w-5 h-5 accent-primary rounded" />
            <label htmlFor="isActive" className="font-bold text-gray-700 dark:text-gray-300 text-sm cursor-pointer">نادٍ نشط</label>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={loading} className="btn-primary flex-1 justify-center disabled:opacity-60">
            {loading ? <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : <><Save size={18} /> حفظ النادي</>}
          </button>
          <Link href="/dashboard/clubs" className="btn-outline">إلغاء</Link>
        </div>
      </form>
    </div>
  );
}
