'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, CheckCircle, Navigation } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [settings, setSettings] = useState({});
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    fetch('/api/settings').then(r => r.json()).then(d => setSettings(d.settings || {}));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.message) { toast.error('الاسم والرسالة مطلوبان'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSent(true);
        toast.success('تم إرسال رسالتك بنجاح!');
        setForm({ name: '', email: '', phone: '', message: '' });
      } else {
        toast.error('حدث خطأ، حاول مرة أخرى');
      }
    } catch { toast.error('خطأ في الاتصال'); }
    finally { setLoading(false); }
  }

  const lat = settings.lat || '32.551572';
  const lng = settings.lng || '-1.952622';
  const mapUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar settings={settings} />

      <div className="mt-16 bg-gradient-to-l from-primary to-primary-light text-white py-16 px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Phone size={32} />
          </div>
          <h1 className="text-4xl font-black mb-3">التواصل معنا</h1>
          <p className="text-white/80">نسعد بتلقي استفساراتكم ومقترحاتكم</p>
        </motion.div>
      </div>

      <main className="flex-1 py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* Contact Info */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <h2 className="font-black text-primary dark:text-white text-2xl mb-4">معلومات التواصل</h2>

              {[
                { icon: Phone, color: 'bg-green-100 text-green-600', title: 'الهاتف', value: settings.phone || '0662190618', href: `tel:${settings.phone || '0662190618'}` },
                { icon: Mail, color: 'bg-blue-100 text-blue-600', title: 'البريد الإلكتروني', value: settings.email || 'contact@mokhtar-school.ma', href: `mailto:${settings.email || 'contact@mokhtar-school.ma'}` },
                { icon: MapPin, color: 'bg-rose-100 text-rose-600', title: 'العنوان', value: settings.address || 'المديرية الإقليمية فجيج — جهة الشرق، المملكة المغربية' },
              ].map(c => (
                <div key={c.title} className="card p-5 flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl ${c.color} flex items-center justify-center flex-shrink-0`}>
                    <c.icon size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{c.title}</p>
                    {c.href ? (
                      <a href={c.href} className="font-bold text-gray-800 dark:text-white hover:text-primary transition-colors">{c.value}</a>
                    ) : (
                      <p className="font-bold text-gray-800 dark:text-white">{c.value}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* Google Maps */}
              <div className="card overflow-hidden">
                <iframe
                  src={mapUrl}
                  width="100%"
                  height="280"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="موقع المؤسسة"
                />
                <div className="p-4 flex justify-between items-center border-t border-gray-100 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                    <MapPin size={14} /> مجموعة مدارس محمد المخطار
                  </p>
                  <a href={directionsUrl} target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-primary-light transition-all">
                    <Navigation size={14} /> الاتجاهات
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
              <div className="card p-8">
                <h2 className="font-black text-primary dark:text-white text-2xl mb-6">أرسل رسالة</h2>

                {sent ? (
                  <div className="text-center py-12">
                    <CheckCircle size={60} className="mx-auto text-green-500 mb-4" />
                    <h3 className="font-black text-green-600 text-xl mb-2">تم الإرسال بنجاح!</h3>
                    <p className="text-gray-500 mb-6">سنتواصل معك في أقرب وقت ممكن.</p>
                    <button onClick={() => setSent(false)} className="btn-primary">إرسال رسالة أخرى</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="label">الاسم الكامل *</label>
                      <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                        className="input" placeholder="الاسم الكامل" required />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="label">البريد الإلكتروني</label>
                        <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                          className="input" placeholder="email@example.com" dir="ltr" />
                      </div>
                      <div>
                        <label className="label">رقم الهاتف</label>
                        <input value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                          className="input" placeholder="06XXXXXXXX" dir="ltr" />
                      </div>
                    </div>
                    <div>
                      <label className="label">الرسالة *</label>
                      <textarea value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                        className="input resize-none h-36" placeholder="اكتب رسالتك هنا..." required />
                    </div>
                    <button type="submit" disabled={loading}
                      className="btn-primary w-full justify-center disabled:opacity-60">
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      ) : (
                        <><Send size={18} /> إرسال الرسالة</>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer settings={settings} />
    </div>
  );
}
