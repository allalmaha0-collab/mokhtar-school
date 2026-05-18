'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserPlus, ArrowRight, Save } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

const LEVELS = ['المستوى الأول','المستوى الثاني','المستوى الثالث','المستوى الرابع','المستوى الخامس','المستوى السادس'];

export default function NewStudentPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    massarCode: '',
    fullname: '',
    level: '',
    classroom: '',
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.massarCode.trim()) { toast.error('رقم مسار مطلوب'); return; }
    if (!form.fullname.trim())   { toast.error('الاسم الكامل مطلوب'); return; }
    if (!form.level)             { toast.error('المستوى مطلوب'); return; }

    setSaving(true);
    try {
      const res = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'فشل الحفظ');
      toast.success('تم إضافة التلميذ بنجاح');
      router.push('/dashboard/students');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/dashboard/students" className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
          <ArrowRight size={20} className="text-gray-500" />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-primary dark:text-white flex items-center gap-2">
            <UserPlus size={24} /> إضافة تلميذ جديد
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">أدخل بيانات التلميذ يدوياً</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="card p-6 space-y-5">
        {/* رقم مسار */}
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">
            رقم مسار <span className="text-red-500">*</span>
          </label>
          <input
            className="input font-mono"
            placeholder="مثال: G123456789"
            value={form.massarCode}
            onChange={e => set('massarCode', e.target.value.trim())}
            dir="ltr"
          />
          <p className="text-xs text-gray-400 mt-1">الرقم الفريد للتلميذ في منظومة مسار</p>
        </div>

        {/* الاسم */}
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">
            الاسم الكامل <span className="text-red-500">*</span>
          </label>
          <input
            className="input"
            placeholder="النسب ثم الاسم الشخصي"
            value={form.fullname}
            onChange={e => set('fullname', e.target.value)}
          />
        </div>

        {/* المستوى + القسم */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">
              المستوى الدراسي <span className="text-red-500">*</span>
            </label>
            <select className="input" value={form.level} onChange={e => set('level', e.target.value)}>
              <option value="">— اختر المستوى —</option>
              {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">
              الفصل / القسم
            </label>
            <input
              className="input"
              placeholder="مثال: أ  أو  A"
              value={form.classroom}
              onChange={e => set('classroom', e.target.value)}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <Link href="/dashboard/students" className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-bold text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
            إلغاء
          </Link>
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? 'جاري الحفظ...' : <><Save size={18} /> حفظ التلميذ</>}
          </button>
        </div>
      </form>
    </div>
  );
}
