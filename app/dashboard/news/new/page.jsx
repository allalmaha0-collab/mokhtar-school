'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Save, ArrowRight, Image as ImageIcon } from 'lucide-react';

export default function NewNewsPage() {
  const router = useRouter();
  const [form, setForm] = useState({ title: '', content: '', category: 'إعلان' });
  const [imgFile, setImgFile] = useState(null);
  const [imgPreview, setImgPreview] = useState('');
  const [loading, setLoading] = useState(false);

  function handleImg(e) {
    const f = e.target.files[0]; if (!f) return;
    setImgFile(f);
    const r = new FileReader(); r.onload = e => setImgPreview(e.target.result); r.readAsDataURL(f);
  }

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/news', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: form.title, content: form.content, category: form.category, imageUrl: imgPreview || null }),
    });
    if (res.ok) { toast.success('تم إضافة الخبر'); router.push('/dashboard/news'); }
    else { toast.error('فشل الحفظ'); setLoading(false); }
  }

  return (
    <div className="max-w-2xl space-y-5">
      <div className="flex items-center gap-3">
        <button onClick={() => router.back()} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500"><ArrowRight size={20} /></button>
        <h1 className="text-2xl font-black text-primary dark:text-white">خبر جديد</h1>
      </div>

      <form onSubmit={submit} className="card p-6 space-y-5">
        <div><label className="label">العنوان *</label><input required className="input" placeholder="عنوان الخبر..." value={form.title} onChange={e => setForm(p => ({...p, title: e.target.value}))} /></div>
        <div>
          <label className="label">الفئة</label>
          <select className="input" value={form.category} onChange={e => setForm(p => ({...p, category: e.target.value}))}>
            {['إعلان','نشاط','حفل','دراسي','عام'].map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div><label className="label">المحتوى *</label><textarea required rows={6} className="input resize-none" placeholder="اكتب محتوى الخبر..." value={form.content} onChange={e => setForm(p => ({...p, content: e.target.value}))} /></div>
        <div>
          <label className="label">الصورة</label>
          <label className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 flex flex-col items-center gap-2 cursor-pointer hover:border-primary-light transition-colors">
            {imgPreview ? <img src={imgPreview} alt="" className="max-h-40 rounded-lg object-cover" /> : <><ImageIcon size={32} className="text-gray-300" /><span className="text-sm text-gray-400">انقر لرفع صورة</span></>}
            <input type="file" accept="image/*" className="hidden" onChange={handleImg} />
          </label>
        </div>
        <button type="submit" disabled={loading} className="btn-primary disabled:opacity-60">
          <Save size={18} /> {loading ? 'جاري الحفظ...' : 'حفظ الخبر'}
        </button>
      </form>
    </div>
  );
}
