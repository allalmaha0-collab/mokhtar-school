'use client';
import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Trash, FileText, Save, X, ExternalLink, Users } from 'lucide-react';
import toast from 'react-hot-toast';

const CATEGORIES = [
  'وثائق إدارية',
  'برامج دراسية',
  'مذكرات الدروس',
  'بطاقات التقييم',
  'محاضر اجتماعات',
  'تكوين وتأهيل',
  'أخرى',
];

const catColors = {
  'وثائق إدارية':    'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  'برامج دراسية':    'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  'مذكرات الدروس':   'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  'بطاقات التقييم':  'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  'محاضر اجتماعات':  'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  'تكوين وتأهيل':    'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
};

export default function TeacherDocsPage() {
  const [resources, setResources] = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [showForm,  setShowForm]  = useState(false);
  const [editing,   setEditing]   = useState(null);
  const [saving,    setSaving]    = useState(false);
  const [form, setForm] = useState({ title: '', description: '', fileUrl: '', category: 'وثائق إدارية', type: 'teacher', order: 0 });

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    const res = await fetch('/api/resources?type=teacher');
    const data = await res.json();
    setResources(data.resources || []);
    setLoading(false);
  }

  function openNew()   { setForm({ title: '', description: '', fileUrl: '', category: 'وثائق إدارية', type: 'teacher', order: 0 }); setEditing(null); setShowForm(true); }
  function openEdit(r) { setForm({ title: r.title, description: r.description || '', fileUrl: r.fileUrl || '', category: r.category, type: 'teacher', order: r.order }); setEditing(r.id); setShowForm(true); }

  async function handleSave(e) {
    e.preventDefault();
    if (!form.title.trim()) { toast.error('العنوان مطلوب'); return; }
    setSaving(true);
    try {
      const method = editing ? 'PATCH' : 'POST';
      const body   = editing ? { ...form, id: editing } : form;
      const res = await fetch('/api/resources', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (res.ok) { toast.success(editing ? 'تم التحديث' : 'تمت الإضافة'); setShowForm(false); load(); }
      else toast.error('خطأ في الحفظ');
    } catch { toast.error('خطأ في الاتصال'); }
    finally { setSaving(false); }
  }

  async function remove(id) {
    if (!confirm('حذف هذا الملف؟')) return;
    const res = await fetch('/api/resources', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    if (res.ok) { toast.success('تم الحذف'); load(); }
    else toast.error('فشل الحذف');
  }

  async function deleteAll() {
    if (!confirm(`⚠️ حذف جميع وثائق الأساتذة (${resources.length})؟`)) return;
    const res = await fetch('/api/resources', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'teacher' }) });
    if (res.ok) { toast.success('تم حذف الكل'); load(); }
    else toast.error('فشل الحذف');
  }

  const grouped = CATEGORIES.reduce((acc, cat) => {
    const items = resources.filter(r => r.category === cat);
    if (items.length) acc[cat] = items;
    return acc;
  }, {});
  const other = resources.filter(r => !CATEGORIES.includes(r.category));
  if (other.length) grouped['أخرى'] = other;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black text-primary dark:text-white flex items-center gap-2">
            <Users size={24} /> وثائق الأساتذة
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {resources.length} وثيقة — برامج، مذكرات، وثائق إدارية
          </p>
        </div>
        <div className="flex gap-2">
          {resources.length > 0 && (
            <button onClick={deleteAll} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 border border-red-200 dark:border-red-800 text-sm font-bold hover:bg-red-100 transition-all">
              <Trash size={16} /> حذف الكل
            </button>
          )}
          <button onClick={openNew} className="btn-primary">
            <Plus size={18} /> إضافة وثيقة
          </button>
        </div>
      </div>

      {showForm && (
        <div className="card p-6 border-2 border-primary/20">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-black text-primary dark:text-white">{editing ? 'تعديل الوثيقة' : 'وثيقة جديدة'}</h2>
            <button onClick={() => setShowForm(false)}><X size={18} className="text-gray-400" /></button>
          </div>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="label">العنوان *</label>
                <input className="input" placeholder="عنوان الوثيقة أو الملف..." value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} required />
              </div>
              <div>
                <label className="label">التصنيف</label>
                <select className="input" value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="label">الترتيب</label>
                <input type="number" className="input" min="0" value={form.order} onChange={e => setForm(p => ({ ...p, order: parseInt(e.target.value) || 0 }))} />
              </div>
              <div className="col-span-2">
                <label className="label">رابط الملف (Google Drive، PDF...)</label>
                <input className="input" placeholder="https://drive.google.com/..." value={form.fileUrl} onChange={e => setForm(p => ({ ...p, fileUrl: e.target.value }))} dir="ltr" />
              </div>
              <div className="col-span-2">
                <label className="label">الوصف</label>
                <textarea className="input resize-none h-20" placeholder="وصف مختصر..." value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center">
                {saving ? <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : <><Save size={18} /> {editing ? 'حفظ التعديلات' : 'إضافة'}</>}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-outline">إلغاء</button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-16"><div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" /></div>
      ) : resources.length === 0 && !showForm ? (
        <div className="card p-16 text-center text-gray-400">
          <FileText size={48} className="mx-auto mb-3 opacity-40" />
          <p className="mb-4 font-bold">لا توجد وثائق بعد</p>
          <button onClick={openNew} className="btn-primary inline-flex"><Plus size={16} /> أضف أول وثيقة</button>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([cat, items]) => (
            <div key={cat}>
              <h2 className="text-sm font-black text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-2">
                <span className={`badge ${catColors[cat] || 'bg-gray-100 text-gray-600'}`}>{cat}</span>
                <span className="text-xs text-gray-400">({items.length})</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {items.map(r => (
                  <div key={r.id} className="card p-4 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-bold text-gray-800 dark:text-white text-sm leading-tight flex-1">{r.title}</h3>
                      <div className="flex gap-1 flex-shrink-0">
                        <button onClick={() => openEdit(r)} className="p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-500"><Edit2 size={13} /></button>
                        <button onClick={() => remove(r.id)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-400"><Trash2 size={13} /></button>
                      </div>
                    </div>
                    {r.description && <p className="text-gray-400 text-xs mb-3 line-clamp-2">{r.description}</p>}
                    {r.fileUrl && (
                      <a href={r.fileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-primary hover:underline text-xs font-bold">
                        <ExternalLink size={12} /> فتح الملف
                      </a>
                    )}
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
