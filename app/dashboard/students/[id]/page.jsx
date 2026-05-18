'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Edit2, ArrowRight, Save, Trash2 } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

const LEVELS = ['المستوى الأول','المستوى الثاني','المستوى الثالث','المستوى الرابع','المستوى الخامس','المستوى السادس'];

export default function EditStudentPage() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);
  const [form, setForm] = useState({ massarCode: '', fullname: '', level: '', classroom: '' });

  useEffect(() => {
    fetch(`/api/students/${id}`)
      .then(r => r.json())
      .then(d => {
        if (d.student) {
          const s = d.student;
          setForm({ massarCode: s.massarCode || '', fullname: s.fullname || '', level: s.level || '', classroom: s.classroom || '' });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.fullname.trim()) { toast.error('الاسم الكامل مطلوب'); return; }
    setSaving(true);
    try {
      const res = await fetch(`/api/students/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'فشل الحفظ');
      toast.success('تم تحديث بيانات التلميذ');
      router.push('/dashboard/students');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm('هل أنت متأكد من حذف هذا التلميذ؟ سيتم حذف نتائجه أيضاً.')) return;
    const res = await fetch(`/api/students/${id}`, { method: 'DELETE' });
    if (res.ok) { toast.success('تم الحذف'); router.push('/dashboard/students'); }
    else toast.error('فشل الحذف');
  }

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-400">جاري التحميل...</div>;

  return (
    <div className="max-w-2xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/students" className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
            <ArrowRight size={20} className="text-gray-500" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-primary dark:text-white flex items-center gap-2">
              <Edit2 size={22} /> تعديل بيانات التلميذ
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">{form.massarCode}</p>
          </div>
        </div>
        <button onClick={handleDelete} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/40 font-bold text-sm transition-all">
          <Trash2 size={16} /> حذف
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="card p-6 space-y-5">
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">رقم مسار</label>
          <input className="input font-mono bg-gray-50 dark:bg-gray-800 cursor-not-allowed" value={form.massarCode} disabled dir="ltr" />
          <p className="text-xs text-gray-400 mt-1">رقم مسار لا يمكن تعديله</p>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">
            الاسم الكامل <span className="text-red-500">*</span>
          </label>
          <input className="input" placeholder="النسب ثم الاسم الشخصي" value={form.fullname} onChange={e => set('fullname', e.target.value)} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">المستوى الدراسي</label>
            <select className="input" value={form.level} onChange={e => set('level', e.target.value)}>
              <option value="">— اختر المستوى —</option>
              {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">الفصل / القسم</label>
            <input className="input" placeholder="أ أو A" value={form.classroom} onChange={e => set('classroom', e.target.value)} />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Link href="/dashboard/students" className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-bold text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
            إلغاء
          </Link>
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? 'جاري الحفظ...' : <><Save size={18} /> حفظ التعديلات</>}
          </button>
        </div>
      </form>
    </div>
  );
}
