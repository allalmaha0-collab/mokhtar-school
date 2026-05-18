'use client';
import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Trash, Mic, Radio, BookOpen, Save, X, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';

const TYPES = [
  { key: 'podcast',  label: 'بودكاست تربوي',  icon: '🎙️' },
  { key: 'radio',    label: 'إذاعة مدرسية',    icon: '📻' },
  { key: 'magazine', label: 'مجلة إلكترونية',  icon: '📖' },
  { key: 'video',    label: 'فيديو تعليمي',    icon: '🎥' },
];

export default function MediaPage() {
  const [items,    setItems]    = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [tab,      setTab]      = useState('podcast');
  const [showForm, setShowForm] = useState(false);
  const [editing,  setEditing]  = useState(null);
  const [saving,   setSaving]   = useState(false);
  const [form, setForm] = useState({ title: '', description: '', url: '', type: 'podcast', episode: '', duration: '' });

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    const res  = await fetch('/api/media');
    const data = await res.json();
    setItems(data.media || []);
    setLoading(false);
  }

  function openNew()   { setForm({ title: '', description: '', url: '', type: tab, episode: '', duration: '' }); setEditing(null); setShowForm(true); }
  function openEdit(r) { setForm({ title: r.title, description: r.description||'', url: r.url||'', type: r.type, episode: r.episode?.toString()||'', duration: r.duration||'' }); setEditing(r.id); setShowForm(true); }

  async function handleSave(e) {
    e.preventDefault();
    if (!form.title.trim()) { toast.error('العنوان مطلوب'); return; }
    setSaving(true);
    try {
      const method = editing ? 'PATCH' : 'POST';
      const body   = editing ? { ...form, id: editing, episode: form.episode ? parseInt(form.episode) : null } : { ...form, episode: form.episode ? parseInt(form.episode) : null };
      const res = await fetch('/api/media', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (res.ok) { toast.success(editing ? 'تم التحديث' : 'تمت الإضافة'); setShowForm(false); load(); }
      else toast.error('خطأ');
    } catch { toast.error('خطأ'); }
    finally { setSaving(false); }
  }

  async function remove(id) {
    if (!confirm('حذف هذا المحتوى؟')) return;
    await fetch('/api/media', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    toast.success('تم الحذف'); load();
  }

  const tabItems = items.filter(i => i.type === tab);
  const currentType = TYPES.find(t => t.key === tab);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black text-primary dark:text-white flex items-center gap-2"><Mic size={24} /> المحتوى الإعلامي</h1>
          <p className="text-gray-500 text-sm">{items.length} محتوى — بودكاست، إذاعة، مجلة، فيديو</p>
        </div>
        <button onClick={openNew} className="btn-primary"><Plus size={18} /> إضافة</button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {TYPES.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${tab === t.key ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200'}`}>
            {t.icon} {t.label}
            <span className="text-xs opacity-70">({items.filter(i => i.type === t.key).length})</span>
          </button>
        ))}
      </div>

      {showForm && (
        <div className="card p-6 border-2 border-primary/20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-black text-primary dark:text-white">{editing ? 'تعديل' : 'إضافة محتوى'}</h2>
            <button onClick={() => setShowForm(false)}><X size={18} className="text-gray-400" /></button>
          </div>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="label">العنوان *</label>
                <input className="input" placeholder="عنوان المحتوى..." value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} required />
              </div>
              <div>
                <label className="label">النوع</label>
                <select className="input" value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}>
                  {TYPES.map(t => <option key={t.key} value={t.key}>{t.label}</option>)}
                </select>
              </div>
              <div>
                <label className="label">الحلقة / العدد</label>
                <input type="number" className="input" min="1" placeholder="رقم الحلقة" value={form.episode} onChange={e => setForm(p => ({ ...p, episode: e.target.value }))} />
              </div>
              <div className="col-span-2">
                <label className="label">الرابط (YouTube, SoundCloud, Google Drive...)</label>
                <input className="input" placeholder="https://..." value={form.url} onChange={e => setForm(p => ({ ...p, url: e.target.value }))} dir="ltr" />
              </div>
              <div>
                <label className="label">المدة</label>
                <input className="input" placeholder="مثال: 15 دقيقة" value={form.duration} onChange={e => setForm(p => ({ ...p, duration: e.target.value }))} />
              </div>
              <div>
                <label className="label">الوصف</label>
                <input className="input" placeholder="وصف مختصر..." value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center">
                {saving ? <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : <><Save size={18} /> {editing ? 'حفظ' : 'إضافة'}</>}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-outline">إلغاء</button>
            </div>
          </form>
        </div>
      )}

      {loading ? <div className="flex justify-center py-16"><div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" /></div>
      : tabItems.length === 0 ? (
        <div className="card p-12 text-center text-gray-400">
          <p className="text-3xl mb-3">{currentType?.icon}</p>
          <p className="font-bold mb-3">لا يوجد محتوى في {currentType?.label}</p>
          <button onClick={openNew} className="btn-primary inline-flex"><Plus size={16} /> إضافة</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tabItems.map(item => (
            <div key={item.id} className="card p-4 hover:shadow-md transition-all">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex-1">
                  {item.episode && <span className="text-xs text-primary font-black">الحلقة {item.episode} </span>}
                  <h3 className="font-bold text-gray-800 dark:text-white text-sm">{item.title}</h3>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <button onClick={() => openEdit(item)} className="p-1.5 hover:bg-blue-50 rounded-lg text-blue-500"><Edit2 size={13} /></button>
                  <button onClick={() => remove(item.id)} className="p-1.5 hover:bg-red-50 rounded-lg text-red-400"><Trash2 size={13} /></button>
                </div>
              </div>
              {item.duration    && <p className="text-xs text-gray-400 mb-1">⏱ {item.duration}</p>}
              {item.description && <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 line-clamp-2">{item.description}</p>}
              {item.url && (
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-primary hover:underline text-xs font-bold">
                  <ExternalLink size={12} /> فتح المحتوى
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
