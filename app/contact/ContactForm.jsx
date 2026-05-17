'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Send } from 'lucide-react';

export default function ContactForm() {
  const [form, setForm] = useState({ sender_name: '', sender_email: '', sender_phone: '', subject: '', body: '' });
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/messages', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (res.ok) { toast.success('تم إرسال رسالتك بنجاح!'); setForm({ sender_name: '', sender_email: '', sender_phone: '', subject: '', body: '' }); }
      else toast.error('حدث خطأ، حاول مجدداً');
    } catch { toast.error('خطأ في الاتصال'); }
    finally { setLoading(false); }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div><label className="label">الاسم الكامل</label><input required className="input" placeholder="اسمك الكامل" value={form.sender_name} onChange={e => setForm(p => ({...p, sender_name: e.target.value}))} /></div>
        <div><label className="label">الهاتف</label><input className="input" placeholder="06XXXXXXXX" value={form.sender_phone} onChange={e => setForm(p => ({...p, sender_phone: e.target.value}))} /></div>
      </div>
      <div><label className="label">البريد الإلكتروني</label><input type="email" className="input" placeholder="example@email.com" value={form.sender_email} onChange={e => setForm(p => ({...p, sender_email: e.target.value}))} /></div>
      <div>
        <label className="label">الموضوع</label>
        <select className="input" value={form.subject} onChange={e => setForm(p => ({...p, subject: e.target.value}))}>
          <option value="">اختر الموضوع</option>
          <option>استفسار عام</option><option>نتائج التلاميذ</option><option>التسجيل</option><option>شكوى</option><option>مقترح</option>
        </select>
      </div>
      <div><label className="label">الرسالة</label><textarea required rows={5} className="input resize-none" placeholder="اكتب رسالتك هنا..." value={form.body} onChange={e => setForm(p => ({...p, body: e.target.value}))} /></div>
      <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5 disabled:opacity-60">
        <Send size={18} /> {loading ? 'جاري الإرسال...' : 'إرسال الرسالة'}
      </button>
    </form>
  );
}
