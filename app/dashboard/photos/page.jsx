'use client';
import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Trash, Image, Save, X, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';

export default function PhotosPage() {
  const [photos,   setPhotos]   = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing,  setEditing]  = useState(null);
  const [saving,   setSaving]   = useState(false);
  const [form, setForm] = useState({ title: '', url: '', year: '', description: '', category: 'أرشيف' });

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    const res  = await fetch('/api/photos');
    const data = await res.json();
    setPhotos(data.photos || []);
    setLoading(false);
  }

  function openNew()   { setForm({ title: '', url: '', year: '', description: '', category: 'أرشيف' }); setEditing(null); setShowForm(true); }
  function openEdit(p) { setForm({ title: p.title, url: p.url, year: p.year||'', description: p.description||'', category: p.category }); setEditing(p.id); setShowForm(true); }

  async function handleSave(e) {
    e.preventDefault();
    if (!form.title.trim() || !form.url.trim()) { toast.error('العنوان والرابط مطلوبان'); return; }
    setSaving(true);
    try {
      const method = editing ? 'PATCH' : 'POST';
      const body   = editing ? { ...form, id: editing } : form;
      const res = await fetch('/api/photos', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (res.ok) { toast.success(editing ? 'تم التحديث' : 'تمت الإضافة'); setShowForm(false); load(); }
      else toast.error('خطأ');
    } catch { toast.error('خطأ'); }
    finally { setSaving(false); }
  }

  async function remove(id) {
    if (!confirm('حذف هذه الصورة؟')) return;
    await fetch('/api/photos', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    toast.success('تم الحذف'); load();
  }

  async function deleteAll() {
    if (!confirm(`⚠️ حذف جميع الصور (${photos.length})؟`)) return;
    await fetch('/api/photos', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) });
    toast.success('تم حذف الكل'); load();
  }

  const byYear = photos.reduce((a, p) => { const y = p.year || 'بدون سنة'; (a[y] = a[y]||[]).push(p); return a; }, {});
  const years  = Object.keys(byYear).sort((a,b) => b.localeCompare(a));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black text-primary dark:text-white flex items-center gap-2"><Image size={24} /> أرشيف الصور</h1>
          <p className="text-gray-500 text-sm">{photos.length} صورة — تاريخ المؤسسة</p>
        </div>
        <div className="flex gap-2">
          {photos.length > 0 && <button onClick={deleteAll} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 text-red-600 border border-red-200 text-sm font-bold hover:bg-red-100"><Trash size={16} /> حذف الكل</button>}
          <button onClick={openNew} className="btn-primary"><Plus size={18} /> إضافة صورة</button>
        </div>
      </div>

      {showForm && (
        <div className="card p-6 border-2 border-primary/20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-black text-primary dark:text-white">{editing ? 'تعديل الصورة' : 'صورة جديدة'}</h2>
            <button onClick={() => setShowForm(false)}><X size={18} className="text-gray-400" /></button>
          </div>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="label">العنوان *</label>
              <input className="input" placeholder="عنوان الصورة أو الحدث..." value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} required />
            </div>
            <div>
              <label className="label">رابط الصورة * (Google Drive, Imgur, ...)</label>
              <input className="input" placeholder="https://..." value={form.url} onChange={e => setForm(p => ({ ...p, url: e.target.value }))} dir="ltr" required />
              <p className="text-xs text-gray-400 mt-1">استخدم رابطاً مباشراً للصورة (Direct Image URL)</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">السنة</label>
                <input className="input" placeholder="مثال: 2020" value={form.year} onChange={e => setForm(p => ({ ...p, year: e.target.value }))} />
              </div>
              <div>
                <label className="label">التصنيف</label>
                <input className="input" placeholder="مثال: حفلات، رحلات..." value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} />
              </div>
            </div>
            <div>
              <label className="label">الوصف</label>
              <input className="input" placeholder="وصف مختصر..." value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} />
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
      : photos.length === 0 && !showForm ? (
        <div className="card p-12 text-center text-gray-400">
          <Image size={48} className="mx-auto mb-3 opacity-40" />
          <p className="font-bold mb-3">لا توجد صور في الأرشيف</p>
          <button onClick={openNew} className="btn-primary inline-flex"><Plus size={16} /> إضافة صورة</button>
        </div>
      ) : (
        <div className="space-y-8">
          {years.map(year => (
            <div key={year}>
              <h2 className="text-lg font-black text-gray-600 dark:text-gray-300 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">📅 {year}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {byYear[year].map(p => (
                  <div key={p.id} className="group relative rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 aspect-square">
                    <img src={p.url} alt={p.title} className="w-full h-full object-cover" onError={e => { e.target.style.display='none'; }} />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex flex-col justify-end p-2">
                      <p className="text-white text-xs font-bold truncate mb-1">{p.title}</p>
                      <div className="flex gap-1">
                        <button onClick={() => openEdit(p)} className="flex-1 py-1 bg-blue-500 text-white rounded text-xs">تعديل</button>
                        <button onClick={() => remove(p.id)} className="flex-1 py-1 bg-red-500 text-white rounded text-xs">حذف</button>
                      </div>
                    </div>
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
