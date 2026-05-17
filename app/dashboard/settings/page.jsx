'use client';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Save, MapPin, Phone, Mail, Globe, Lock, Eye, EyeOff, School, Users, Star } from 'lucide-react';

const CLUBS_DEFAULT = [
  { icon:'📚', name:'نادي القراءة',   desc:'جلسات القراءة الجماعية وتبادل الكتب' },
  { icon:'🎨', name:'نادي الفنون',    desc:'الرسم والخط والأشغال اليدوية والمسرح' },
  { icon:'⚽', name:'النادي الرياضي', desc:'كرة القدم والألعاب الجماعية' },
  { icon:'💻', name:'النادي الرقمي',  desc:'التكنولوجيا الرقمية والإعلاميات' },
  { icon:'🌱', name:'نادي البيئة',    desc:'المحافظة على البيئة وحملات النظافة' },
  { icon:'🤝', name:'الدعم التربوي',  desc:'مساعدة التلاميذ ذوي الصعوبات التعلمية' },
];

export default function SettingsPage() {
  const [settings, setSettings] = useState({});
  const [clubs,    setClubs]    = useState(CLUBS_DEFAULT);
  const [loading,  setLoading]  = useState(true);
  const [saving,   setSaving]   = useState(false);
  const [tab,      setTab]      = useState('school');
  const [showPwd,  setShowPwd]  = useState(false);
  const [pwd,      setPwd]      = useState({ old: '', new: '', confirm: '' });
  const [mapPreview, setMapPreview] = useState(false);

  useEffect(() => {
    fetch('/api/settings').then(r => r.json()).then(d => { setSettings(d.settings || {}); setLoading(false); });
    const saved = localStorage.getItem('school_clubs');
    if (saved) try { setClubs(JSON.parse(saved)); } catch {}
  }, []);

  function set(key, val) { setSettings(p => ({ ...p, [key]: val })); }

  async function save() {
    setSaving(true);
    const res = await fetch('/api/settings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ settings }) });
    if (res.ok) toast.success('تم حفظ الإعدادات');
    else toast.error('فشل الحفظ');
    setSaving(false);
  }

  async function changePwd() {
    if (pwd.new !== pwd.confirm) { toast.error('كلمتا المرور غير متطابقتان'); return; }
    if (pwd.new.length < 6)      { toast.error('كلمة المرور قصيرة جداً'); return; }
    const res = await fetch('/api/auth/change-password', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(pwd) });
    const d = await res.json();
    if (res.ok) { toast.success('تم تغيير كلمة المرور'); setPwd({ old: '', new: '', confirm: '' }); }
    else toast.error(d.error || 'فشل التغيير');
  }

  function saveClubs() {
    localStorage.setItem('school_clubs', JSON.stringify(clubs));
    toast.success('تم حفظ الأندية');
  }

  function updateClub(i, field, val) {
    setClubs(prev => prev.map((c, idx) => idx === i ? { ...c, [field]: val } : c));
  }
  function addClub() { setClubs(prev => [...prev, { icon: '⭐', name: 'نادي جديد', desc: '' }]); }
  function removeClub(i) { setClubs(prev => prev.filter((_, idx) => idx !== i)); }

  const tabs = [
    { key: 'school',  label: 'المؤسسة',    icon: School },
    { key: 'contact', label: 'التواصل',    icon: Phone },
    { key: 'map',     label: 'الخريطة',    icon: MapPin },
    { key: 'clubs',   label: 'الأندية',    icon: Star },
    { key: 'stats',   label: 'الإحصائيات', icon: Users },
    { key: 'security',label: 'الأمان',     icon: Lock },
  ];

  if (loading) return <div className="text-center py-20 text-gray-400">جاري التحميل...</div>;

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-black text-primary dark:text-white">إعدادات الموقع</h1>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${tab === t.key ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
            <t.icon size={15} /> {t.label}
          </button>
        ))}
      </div>

      <div className="card p-6">
        {/* SCHOOL */}
        {tab === 'school' && (
          <div className="space-y-4">
            <h2 className="font-black text-primary dark:text-white mb-4">معلومات المؤسسة</h2>
            <div><label className="label">اسم المؤسسة</label><input className="input" value={settings.school_name || ''} onChange={e => set('school_name', e.target.value)} /></div>
            <div><label className="label">اسم المدير</label><input className="input" value={settings.director_name || ''} onChange={e => set('director_name', e.target.value)} /></div>
            <div><label className="label">كلمة المدير</label><textarea rows={4} className="input resize-none" value={settings.director_msg || ''} onChange={e => set('director_msg', e.target.value)} /></div>
            <div><label className="label">الموسم الدراسي</label><input className="input" placeholder="2025-2026" value={settings.year || ''} onChange={e => set('year', e.target.value)} /></div>
          </div>
        )}

        {/* CONTACT */}
        {tab === 'contact' && (
          <div className="space-y-4">
            <h2 className="font-black text-primary dark:text-white mb-4">معلومات التواصل</h2>
            <div><label className="label"><MapPin size={14} className="inline ml-1" />العنوان</label><input className="input" value={settings.address || ''} onChange={e => set('address', e.target.value)} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="label"><Phone size={14} className="inline ml-1" />الهاتف</label><input className="input" value={settings.phone || ''} onChange={e => set('phone', e.target.value)} /></div>
              <div><label className="label"><Mail size={14} className="inline ml-1" />البريد الإلكتروني</label><input className="input" value={settings.email || ''} onChange={e => set('email', e.target.value)} /></div>
            </div>
            <div><label className="label">واتساب (بدون +)</label><input className="input" placeholder="212600000000" value={settings.whatsapp || ''} onChange={e => set('whatsapp', e.target.value)} /></div>
            <div><label className="label"><Globe size={14} className="inline ml-1" />رابط فيسبوك</label><input className="input" value={settings.facebook || ''} onChange={e => set('facebook', e.target.value)} /></div>
            <div><label className="label">رابط يوتيوب</label><input className="input" value={settings.youtube || ''} onChange={e => set('youtube', e.target.value)} /></div>
          </div>
        )}

        {/* MAP */}
        {tab === 'map' && (
          <div className="space-y-4">
            <h2 className="font-black text-primary dark:text-white mb-4">إحداثيات الخريطة</h2>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="label">خط العرض (Latitude)</label><input type="number" step="0.000001" className="input" value={settings.lat || '32.551572'} onChange={e => set('lat', e.target.value)} /></div>
              <div><label className="label">خط الطول (Longitude)</label><input type="number" step="0.000001" className="input" value={settings.lng || '-1.952622'} onChange={e => set('lng', e.target.value)} /></div>
            </div>
            <button onClick={() => setMapPreview(!mapPreview)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/20 text-sm font-bold transition-all">
              <Eye size={16} /> {mapPreview ? 'إخفاء' : 'معاينة'} الخريطة
            </button>
            {mapPreview && (
              <div className="rounded-2xl overflow-hidden h-64 border-2 border-gray-200 dark:border-gray-600">
                <iframe className="w-full h-full border-none"
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323!2d${settings.lng||'-1.952622'}!3d${settings.lat||'32.551572'}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0x0!2z!5e0!3m2!1sar!2sma!4v1`}
                  allowFullScreen loading="lazy" />
              </div>
            )}
          </div>
        )}

        {/* CLUBS */}
        {tab === 'clubs' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-black text-primary dark:text-white">إدارة الأندية</h2>
              <button onClick={addClub} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-bold">+ إضافة نادي</button>
            </div>
            {clubs.map((c, i) => (
              <div key={i} className="border-2 border-gray-100 dark:border-gray-700 rounded-xl p-4 space-y-2">
                <div className="flex gap-3 items-start">
                  <input className="input w-16 text-center text-2xl" value={c.icon} onChange={e => updateClub(i, 'icon', e.target.value)} maxLength={4} />
                  <input className="input flex-1 font-bold" value={c.name} onChange={e => updateClub(i, 'name', e.target.value)} placeholder="اسم النادي" />
                  <button onClick={() => removeClub(i)} className="text-red-400 hover:text-red-600 p-2 flex-shrink-0">✕</button>
                </div>
                <input className="input text-sm" value={c.desc} onChange={e => updateClub(i, 'desc', e.target.value)} placeholder="وصف النادي..." />
              </div>
            ))}
            <button onClick={saveClubs} className="btn-secondary"><Save size={16} /> حفظ الأندية</button>
          </div>
        )}

        {/* STATS */}
        {tab === 'stats' && (
          <div className="space-y-4">
            <h2 className="font-black text-primary dark:text-white mb-4">إحصائيات الصفحة الرئيسية</h2>
            <div className="grid grid-cols-2 gap-4">
              {[['students_count','عدد التلاميذ'],['teachers_count','عدد الأساتذة'],['activities_count','عدد الأنشطة'],['classes_count','عدد الفصول']].map(([k, l]) => (
                <div key={k}><label className="label">{l}</label><input type="number" className="input" value={settings[k] || ''} onChange={e => set(k, e.target.value)} /></div>
              ))}
            </div>
          </div>
        )}

        {/* SECURITY */}
        {tab === 'security' && (
          <div className="space-y-4">
            <h2 className="font-black text-primary dark:text-white mb-4">تغيير كلمة المرور</h2>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-xl p-4 text-sm text-yellow-700 dark:text-yellow-300">
              ⚠️ تأكد من حفظ كلمة المرور الجديدة في مكان آمن
            </div>
            {[['old','كلمة المرور الحالية'],['new','كلمة المرور الجديدة'],['confirm','تأكيد كلمة المرور']].map(([k,l]) => (
              <div key={k}>
                <label className="label">{l}</label>
                <div className="relative">
                  <input type={showPwd ? 'text' : 'password'} className="input pl-10" value={pwd[k]} onChange={e => setPwd(p => ({...p, [k]: e.target.value}))} />
                  <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Eye size={16} /></button>
                </div>
              </div>
            ))}
            <button onClick={changePwd} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 text-white font-bold text-sm hover:bg-orange-600 transition-all">
              <Lock size={16} /> تغيير كلمة المرور
            </button>
          </div>
        )}

        {/* Save button for non-security tabs */}
        {tab !== 'security' && tab !== 'clubs' && (
          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
            <button onClick={save} disabled={saving} className="btn-primary disabled:opacity-60">
              <Save size={18} /> {saving ? 'جاري الحفظ...' : 'حفظ الإعدادات'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
