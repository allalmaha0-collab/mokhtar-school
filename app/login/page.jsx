'use client';
import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { GraduationCap, Eye, EyeOff, Lock } from 'lucide-react';

function LoginForm() {
  const router   = useRouter();
  const params   = useSearchParams();
  const redirect = params.get('redirect') || '/dashboard';
  const [form, setForm] = useState({ email: '', password: '' });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res  = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error || 'بيانات خاطئة'); return; }
      toast.success('مرحباً بك!');
      router.push(redirect);
    } catch { toast.error('خطأ في الاتصال'); }
    finally { setLoading(false); }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="label">البريد الإلكتروني</label>
        <input type="email" required className="input text-center" placeholder="admin@mokhtar-school.ma"
          value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
      </div>
      <div>
        <label className="label">كلمة المرور</label>
        <div className="relative">
          <input type={show ? 'text' : 'password'} required className="input text-center pl-10"
            placeholder="••••••••" value={form.password}
            onChange={e => setForm(p => ({ ...p, password: e.target.value }))} />
          <button type="button" onClick={() => setShow(!show)}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>
      <button type="submit" disabled={loading}
        className="w-full bg-primary hover:bg-primary-light text-white font-black py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-60">
        <Lock size={18} />
        {loading ? 'جاري الدخول...' : 'دخول'}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-light to-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <GraduationCap size={36} className="text-white" />
          </div>
          <h1 className="text-2xl font-black text-primary dark:text-white">لوحة تحكم الإدارة</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">مجموعة مدارس محمد المخطار</p>
        </div>

        <Suspense fallback={<div className="text-center py-4 text-gray-400">جاري التحميل...</div>}>
          <LoginForm />
        </Suspense>

        <p className="text-center text-xs text-gray-400 mt-6">
          للتجربة: <span className="font-bold text-primary">admin@mokhtar-school.ma</span> / <span className="font-bold text-primary">admin123</span>
        </p>
      </div>
    </div>
  );
}
