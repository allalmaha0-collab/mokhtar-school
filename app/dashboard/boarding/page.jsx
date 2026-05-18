'use client';
import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Trash, Home, Save, X } from 'lucide-react';
import toast from 'react-hot-toast';

const CATEGORIES = ['خبر', 'إعلان', 'نشاط', 'توعية', 'جدول'];

export default function DashboardBoardingPage() {
  const [posts,    setPosts]    = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editing,  setEditing]  = useState(null);
  const [form,     setForm]     = useState({ title: '', content: '', category: 'خبر' });
  const [saving,   setSaving]   = useState(false);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    const res = await fetch('/api/boarding');
    const data = await res.json();
    setPosts(data.posts || []);
    setLoading(false);
  }

  function openNew()  { setForm({ title: '', content: '', category: 'خبر' }); setEditing(null); setShowForm(true); }
  function openEdit(p){ setForm({ title: p.title, content: p.content, category: p.category }); setEditing(p.id); setShowForm(true); }

  async function handleSave(e) {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) { toast.error('العنوان والمحتوى مطلوبان'); return; }
    setSaving(true);
    try {
      const method = editing ? 'PATCH' : 'POST';
      const body   = editing ? { ...form, id: editing } : form;
      const res = await fetch('/api/boarding', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (res.ok) { toast.success(editing ? 'تم التحديث' : 'تمت الإضافة'); setShowForm(false); load(); }
      else toast.error('خطأ في الحفظ');
    } catch { toast.error('خطأ في الاتصال'); }
    finally { setSaving(false); }
  }

  async function remove(id) {
    if (!confirm('حذف هذا المنشور؟')) return;
    const res = await fetch('/api/boarding', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    if (res.ok) { toast.success('تم الحذف'); load(); }
    else toast.error('فشل الحذف');
  }

  async function deleteAll() {
    if (!confirm(`⚠️ حذف جميع منشورات الداخلية (${posts.length})؟`)) return;
    setDeleting(true);
    const res = await fetch('/api/boarding', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) });
    if (res.ok) { toast.success('تم حذف الكل'); load(); }
    else toast.error('فشل الحذف');
    setDeleting(false);
  }

  const catColors = { 'خبر': 'bg-blue-100 text-blue-700', 'إعلان': 'bg-red-100 text-red-700', 'نشاط': 'bg-green-100 text-green-700', 'توعية': 'bg-purple-100 text-purple-700', 'جدول': 'bg-orange-100 text-orange-700' };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black text-primary dark:text-white flex items-center gap-2">
            <Home size={22} /> فضاء الداخلية
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{posts.length} منشور — أخبار وإعلانات الداخلية</p>
        </div>
        <div className="flex gap-2">
          {posts.length > 0 && (
            <button onClick={deleteAll} disabled={deleting}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 border border-red-200 dark:border-red-800 text-sm font-bold hover:bg-red-100 transition-all disabled:opacity-50">
              <Trash size={16} /> حذف الكل
            </button>
          )}
          <button onClick={openNew} className="btn-primary">
            <Plus size={18} /> إضافة منشور
          </button>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="card p-6 border-2 border-primary/20">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-black text-primary dark:text-white">{editing ? 'تعديل المنشور' : 'منشور جديد'}</h2>
            <button onClick={() => setShowForm(false)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <X size={18} className="text-gray-500" />
            </button>
          </div>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="label">العنوان *</label>
              <input className="input" placeholder="عنوان المنشور..." value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} required />
            </div>
            <div>
              <label className="label">المحتوى *</label>
              <textarea className="input resize-none h-32" placeholder="محتوى المنشور..." value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))} required />
            </div>
            <div>
              <label className="label">التصنيف</label>
              <select className="input" value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center">
                {saving ? <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : <><Save size={18} /> {editing ? 'حفظ التعديلات' : 'نشر'}</>}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-outline">إلغاء</button>
            </div>
          </form>
        </div>
      )}

      {/* Posts */}
      {loading ? (
        <div className="flex justify-center py-16"><div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" /></div>
      ) : posts.length === 0 && !showForm ? (
        <div className="card p-16 text-center text-gray-400">
          <Home size={48} className="mx-auto mb-3 opacity-40" />
          <p className="mb-4 font-bold">لا توجد منشورات في فضاء الداخلية</p>
          <button onClick={openNew} className="btn-primary inline-flex"><Plus size={16} /> أضف أول منشور</button>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map(p => (
            <div key={p.id} className="card p-5 hover:shadow-md transition-all">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className={`badge text-xs ${catColors[p.category] || 'bg-gray-100 text-gray-600'}`}>{p.category}</span>
                    <span className="text-xs text-gray-400">{new Date(p.date || p.createdAt).toLocaleDateString('ar-MA')}</span>
                  </div>
                  <h3 className="font-black text-gray-800 dark:text-white mb-2">{p.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2">{p.content}</p>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <button onClick={() => openEdit(p)} className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-500 transition-all">
                    <Edit2 size={15} />
                  </button>
                  <button onClick={() => remove(p.id)} className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-400 transition-all">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
