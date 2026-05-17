'use client';
import { useState, useEffect, useCallback } from 'react';
import { Search, Plus, Trash2, Edit2, Download, Filter, Upload } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

const LEVELS = ['', 'المستوى الأول','المستوى الثاني','المستوى الثالث','المستوى الرابع','المستوى الخامس','المستوى السادس'];

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [search,   setSearch]   = useState('');
  const [level,    setLevel]    = useState('');
  const [classroom,setClassroom]= useState('');
  const [page,     setPage]     = useState(1);
  const [total,    setTotal]    = useState(0);
  const PER = 20;

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page, per: PER, search, level, classroom });
    const res  = await fetch(`/api/students?${params}`);
    const data = await res.json();
    setStudents(data.students || []);
    setTotal(data.total || 0);
    setLoading(false);
  }, [page, search, level, classroom]);

  useEffect(() => { fetchStudents(); }, [fetchStudents]);

  async function deleteStudent(id) {
    if (!confirm('هل أنت متأكد من حذف هذا التلميذ؟')) return;
    const res = await fetch(`/api/students/${id}`, { method: 'DELETE' });
    if (res.ok) { toast.success('تم الحذف'); fetchStudents(); }
    else toast.error('فشل الحذف');
  }

  function exportCSV() {
    if (!students.length) return;
    const headers = ['رقم مسار', 'الاسم الكامل', 'الجنس', 'المستوى', 'القسم', 'تاريخ الازدياد'];
    const rows = students.map(s => [s.massar_code, s.fullname, s.gender, s.level, s.classroom, s.birth_date].join(','));
    const blob = new Blob(['﻿' + [headers.join(','), ...rows].join('\n')], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'التلاميذ.csv'; a.click();
  }

  const pages = Math.ceil(total / PER);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black text-primary dark:text-white">التلاميذ</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{total} تلميذ</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm font-bold transition-all">
            <Download size={16} /> تصدير CSV
          </button>
          <Link href="/dashboard/import" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500 text-white text-sm font-bold hover:bg-orange-600 transition-all">
            <Upload size={16} /> استيراد مسار
          </Link>
          <Link href="/dashboard/students/new" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-light transition-all">
            <Plus size={16} /> إضافة تلميذ
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4 flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input className="input pr-9 text-sm" placeholder="بحث بالاسم أو رقم مسار..."
            value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
        </div>
        <select className="input text-sm w-auto min-w-40" value={level} onChange={e => { setLevel(e.target.value); setPage(1); }}>
          <option value="">كل المستويات</option>
          {LEVELS.filter(Boolean).map(l => <option key={l}>{l}</option>)}
        </select>
        <input className="input text-sm w-auto min-w-28" placeholder="القسم..." value={classroom}
          onChange={e => { setClassroom(e.target.value); setPage(1); }} />
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700">
                <th className="table-head rounded-tr-xl">#</th>
                <th className="table-head">رقم مسار</th>
                <th className="table-head">الاسم الكامل</th>
                <th className="table-head">الجنس</th>
                <th className="table-head">المستوى</th>
                <th className="table-head">القسم</th>
                <th className="table-head">تاريخ الازدياد</th>
                <th className="table-head rounded-tl-xl">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={8} className="text-center py-12 text-gray-400">جاري التحميل...</td></tr>
              ) : students.length === 0 ? (
                <tr><td colSpan={8} className="text-center py-12 text-gray-400">لا يوجد تلاميذ</td></tr>
              ) : students.map((s, i) => (
                <tr key={s.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="table-cell text-gray-400 text-xs">{(page - 1) * PER + i + 1}</td>
                  <td className="table-cell font-mono text-xs text-gray-500">{s.massar_code || '—'}</td>
                  <td className="table-cell font-bold">{s.fullname}</td>
                  <td className="table-cell"><span className={`badge ${s.gender === 'ذكر' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'}`}>{s.gender}</span></td>
                  <td className="table-cell text-sm">{s.level}</td>
                  <td className="table-cell text-sm">{s.classroom}</td>
                  <td className="table-cell text-sm text-gray-500">{s.birth_date || '—'}</td>
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
                      <Link href={`/dashboard/students/${s.id}`} className="p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-500 transition-all"><Edit2 size={15} /></Link>
                      <button onClick={() => deleteStudent(s.id)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-400 transition-all"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500">صفحة {page} من {pages}</p>
            <div className="flex gap-1">
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
                className="px-3 py-1.5 rounded-lg border text-xs font-bold disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-gray-700">السابق</button>
              <button disabled={page === pages} onClick={() => setPage(p => p + 1)}
                className="px-3 py-1.5 rounded-lg border text-xs font-bold disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-gray-700">التالي</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
