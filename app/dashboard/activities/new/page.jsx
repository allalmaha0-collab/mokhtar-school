'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Save, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const CATEGORIES = ['ثقافي', 'رياضي', 'مسابقة', 'احتفال', 'نشاط', 'علمي', 'فني'];

export default function NewActivityPage() {
  const router = useRouter();
  const [form, setForm] = useState({ title: '', description: '', category: 'نشاط', date: new Date().toISOString().split('T')[0] });
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.title) { toast.error('العنوان مطلوب'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, date: new Date(form.date).toISOString() }),
      });
      if (res.ok) { toast.success('تمت الإضافة بنجاح'); router.push('/dashboard/activities'); }
      else { const d = await res.json(); toast.error(d.error || 'خطأ'); }
    } catch { toast.error('خطأ في الاتصال'); }
    finally { setLoading(false); }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/dashboard/activities" className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
          <ArrowRight size={20} className="text-gray-500" />
        </Link>
        <h1 className="text-2xl font-black text-primary dark:text-white">إضافة نشاط جديد</h1>
      </div>

      <form onSubmit={handleSubmit} className="card p-6 space-y-5">
        <div>
          <label className="label">عنوان النشاط *</label>
          <input value={form.title} onChange={e => set('title', e.target.value)} className="input" placeholder="مثال: الاحتفال باليوم العالمي للكتاب" required />
        </div>
        <div>
          <label className="label">الوصف</label>
          <textarea value={form.description} onChange={e => set('description', e.target.value)} className="input resize-none h-28" placeholder="وصف النشاط..." />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">الفئة</label>
            <select value={form.category} onChange={e => set('category', e.target.value)} className="input">
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="label">التاريخ</label>
            <input type="date" value={form.date} onChange={e => set('date', e.target.value)} className="input" />
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={loading} className="btn-primary flex-1 justify-center disabled:opacity-60">
            {loading ? <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : <><Save size={18} /> حفظ النشاط</>}
          </button>
          <Link href="/dashboard/activities" className="btn-outline">إلغاء</Link>
        </div>
      </form>
    </div>
  );
}
