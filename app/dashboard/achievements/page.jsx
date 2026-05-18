'use client';
import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Trash, Trophy, Save, X, Star } from 'lucide-react';
import toast from 'react-hot-toast';

const TYPES = ['تلميذ الشهر', 'أستاذ الشهر', 'إنجاز مؤسسي', 'جائزة', 'تميز'];
const MONTHS = ['يناير','فبراير','مارس','أبريل','ماي','يونيو','يوليوز','غشت','شتنبر','أكتوبر','نونبر','دجنبر'];

const typeColors = {
  'تلميذ الشهر':  'bg-blue-100 text-blue-700',
  'أستاذ الشهر':  'bg-green-100 text-green-700',
  'إنجاز مؤسسي': 'bg-purple-100 text-purple-700',
  'جائزة':        'bg-amber-100 text-amber-700',
  'تميز':         'bg-rose-100 text-rose-700',
};

export default function AchievementsPage() {
  const [items,    setItems]    = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing,  setEditing]  = useState(null);
  const [saving,   setSaving]   = useState(false);
  const [form, setForm] = useState({ title: '', description: '', personName: '', level: '', type: 'تلميذ الشهر', month: '', year: new Date().getFullYear().toString() });

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    const res  = await fetch('/api/achievements');
    const data = await res.json();
    setItems(data.achievements || []);
    setLoading(false);
  }

  function openNew()   { setForm({ title: '', description: '', personName: '', level: '', type: 'تلميذ الشهر', month: '', year: new Date().getFullYear().toString() }); setEditing(null); setShowForm(true); }
  function openEdit(r) { setForm({ title: r.title, description: r.description||'', personName: r.personName||'', level: r.level||'', type: r.type, month: r.month||'', year: r.year||'' }); setEditing(r.id); setShowForm(true); }

  async function handleSave(e) {
    e.preventDefault();
    if (!form.title.trim()) { toast.error('العنوان مطلوب'); return; }
    setSaving(true);
    try {
      const method = editing ? 'PATCH' : 'POST';
      const body   = editing ? { ...form, id: editing } : form;
      const res = await fetch('/api/achievements', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (res.ok) { toast.success(editing ? 'تم التحديث' : 'تمت الإضافة'); setShowForm(false); load(); }
      else toast.error('خطأ في الحفظ');
    } catch { toast.error('خطأ'); }
    finally { setSaving(false); }
  }

  async function remove(id) {
    if (!confirm('حذف هذا الإنجاز؟')) return;
    const res = await fetch('/api/achievements', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    if (res.ok) { toast.success('تم الحذف'); load(); }
  }

  async function deleteAll() {
    if (!confirm(`⚠️ حذف جميع الإنجازات (${items.length})؟`)) return;
    await fetch('/api/achievements', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) });
    toast.success('تم حذف الكل'); load();
  }

  const grouped = TYPES.reduce((a, t) => { const i = items.filter(x => x.type === t); if (i.length) a[t] = i; return a; }, {});

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black text-primary dark:text-white flex items-center gap-2"><Trophy size={24} /> جدارية الإنجازات</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{items.length} إنجاز — تلميذ الشهر، أستاذ الشهر...</p>
        </div>
        <div className="flex gap-2">
          {items.length > 0 && <button onClick={deleteAll} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 text-red-600 border border-red-200 text-sm font-bold hover:bg-red-100 transition-all"><Trash size={16} /> حذف الكل</button>}
          <button onClick={openNew} className="btn-primary"><Plus size={18} /> إضافة إنجاز</button>
        </div>
      </div>

      {showForm && (
        <div className="card p-6 border-2 border-primary/20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-black text-primary dark:text-white">{editing ? 'تعديل الإنجاز' : 'إنجاز جديد'}</h2>
            <button onClick={() => setShowForm(false)}><X size={18} className="text-gray-400" /></button>
          </div>
          <form onSubmit={handleSave} className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="label">العنوان *</label>
              <input className="input" placeholder="مثال: تلميذ الشهر — يناير 2025" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} required />
            </div>
            <div>
              <label className="label">النوع</label>
              <select className="input" value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}>
                {TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="label">الشهر</label>
              <select className="input" value={form.month} onChange={e => setForm(p => ({ ...p, month: e.target.value }))}>
                <option value="">— اختر الشهر —</option>
                {MONTHS.map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="label">الاسم (التلميذ / الأستاذ)</label>
              <input className="input" placeholder="الاسم الكامل" value={form.personName} onChange={e => setForm(p => ({ ...p, personName: e.target.value }))} />
            </div>
            <div>
              <label className="label">المستوى / القسم</label>
              <input className="input" placeholder="مثال: المستوى السادس" value={form.level} onChange={e => setForm(p => ({ ...p, level: e.target.value }))} />
            </div>
            <div className="col-span-2">
              <label className="label">الوصف والسبب</label>
              <textarea className="input resize-none h-20" placeholder="لماذا استحق هذا التكريم؟" value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} />
            </div>
            <div className="col-span-2 flex gap-3 pt-2">
              <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center">
                {saving ? <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : <><Save size={18} /> {editing ? 'حفظ' : 'إضافة'}</>}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-outline">إلغاء</button>
            </div>
          </form>
        </div>
      )}

      {loading ? <div className="flex justify-center py-16"><div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" /></div>
      : items.length === 0 && !showForm ? (
        <div className="card p-16 text-center text-gray-400">
          <Trophy size={48} className="mx-auto mb-3 opacity-40" />
          <p className="mb-4 font-bold">لا توجد إنجازات بعد</p>
          <button onClick={openNew} className="btn-primary inline-flex"><Plus size={16} /> أضف أول إنجاز</button>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([type, grpItems]) => (
            <div key={type}>
              <h2 className="text-sm font-black text-gray-500 mb-3 flex items-center gap-2">
                <span className={`badge ${typeColors[type] || 'bg-gray-100 text-gray-600'}`}><Star size={11} className="inline" /> {type}</span>
                <span className="text-xs text-gray-400">({grpItems.length})</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {grpItems.map(item => (
                  <div key={item.id} className="card p-4 hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-black text-gray-800 dark:text-white text-sm flex-1">{item.title}</h3>
                      <div className="flex gap-1 flex-shrink-0">
                        <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500"><Edit2 size={13} /></button>
                        <button onClick={() => remove(item.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-400"><Trash2 size={13} /></button>
                      </div>
                    </div>
                    {item.personName && <p className="font-bold text-primary dark:text-blue-300 text-sm mb-1">👤 {item.personName}</p>}
                    {item.level     && <p className="text-xs text-gray-400 mb-1">📚 {item.level}</p>}
                    {item.month     && <p className="text-xs text-gray-400 mb-1">📅 {item.month} {item.year}</p>}
                    {item.description && <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{item.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
