'use client';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import toast from 'react-hot-toast';
import { Upload, FileSpreadsheet, Check, X, AlertCircle, Download, Loader } from 'lucide-react';

// Massar Excel column mapping

 const MASSAR_COLS ={ 
  massar_code: ['رقم مسار', 'الرمز'],
  last_name: ['النسب'],
  first_name: ['الإسم', 'الاسم'],
  gender: ['الجنس', 'النوع'],
  birth_date: ['تاريخ الازدياد'],
  level: ['المستوى', 'Level', 'niveau', 'Niveau'],
 classroom: ['القسم', 'الفصل', 'Classe'],
};
// Normalize level from any Massar format to "المستوى X"
function normalizeLevel(raw) {
  if (!raw) return '';
  const s = raw.toString().trim();
  const map = [
    { keys: ['أول', 'اول', '1', 'أولى', 'اولى', 'الأول', 'الاول', 'première', 'first'], out: 'المستوى الأول' },
    { keys: ['ثان', 'ثاني', '2', 'الثاني', 'deuxième', 'second'],                        out: 'المستوى الثاني' },
    { keys: ['ثالث', '3', 'الثالث', 'troisième', 'third'],                               out: 'المستوى الثالث' },
    { keys: ['رابع', '4', 'الرابع', 'quatrième', 'fourth'],                              out: 'المستوى الرابع' },
    { keys: ['خامس', '5', 'الخامس', 'cinquième', 'fifth'],                               out: 'المستوى الخامس' },
    { keys: ['سادس', '6', 'السادس', 'sixième', 'sixth'],                                 out: 'المستوى السادس' },
  ];
  const lower = s.toLowerCase();
  for (const { keys, out } of map) {
    if (keys.some(k => lower.includes(k.toLowerCase()))) return out;
  }
  return s; // keep original if no match
}

function findCol(headers, keys) {
  for (const k of keys) {
    const found = headers.find(h => h && h.toString().trim().toLowerCase().includes(k.toLowerCase()));
    if (found) return found;
  }
  return null;
}

function extractSheetMeta(ws) {
  const metaRows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
  let level = '', classroom = '';
  for (let i = 0; i < Math.min(9, metaRows.length); i++) {
    const row = metaRows[i];
    for (let j = 0; j < row.length; j++) {
      const cell = row[j]?.toString().trim();
      if (!cell) continue;
      if (cell === 'المستوى' || cell.startsWith('المستوى:')) {
        const val = cell.includes(':') ? cell.split(':').slice(1).join(':').trim() : '';
        if (val) { level = val; continue; }
        for (let k = j - 1; k >= 0; k--) { const v = row[k]?.toString().trim(); if (v) { level = v; break; } }
        if (!level) for (let k = j + 1; k < row.length; k++) { const v = row[k]?.toString().trim(); if (v) { level = v; break; } }
      }
      if (cell === 'القسم' || cell.startsWith('القسم:')) {
        const val = cell.includes(':') ? cell.split(':').slice(1).join(':').trim() : '';
        if (val) { classroom = val; continue; }
        for (let k = j - 1; k >= 0; k--) { const v = row[k]?.toString().trim(); if (v) { classroom = v; break; } }
        if (!classroom) for (let k = j + 1; k < row.length; k++) { const v = row[k]?.toString().trim(); if (v) { classroom = v; break; } }
      }
    }
  }
  return { level, classroom };
}

function parseExcel(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const wb = XLSX.read(e.target.result, { type: 'array', cellDates: true });
        let allStudents = [];
        let globalHeaders = null;
        let globalColMap = null;

        wb.SheetNames.forEach(sheetName => {
          const ws = wb.Sheets[sheetName];

          // Extract level and classroom from metadata rows (before range:9)
          const { level: sheetLevel, classroom: sheetClassroom } = extractSheetMeta(ws);

          // Read data starting from row index 9 (row 10 in Excel = header row in Massar format)
          const rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '', range: 9 });
          if (rows.length < 2) return;

          const headers = rows[0].map(h => h?.toString().trim());
          const dataRows = rows.slice(1).filter(r => r.some(c => c && c.toString().trim()));

          if (!globalHeaders) {
            globalHeaders = headers;
            const colMap = {};
            for (const [field, candidates] of Object.entries(MASSAR_COLS)) {
              const col = findCol(headers, candidates);
              colMap[field] = col !== null ? headers.indexOf(col) : -1;
            }
            globalColMap = colMap;
          }

          const colMap = globalColMap;
          const sheetStudents = dataRows.map((row, idx) => {
            const get = (field) => colMap[field] >= 0 ? (row[colMap[field]] ?? '').toString().trim() : '';

            const lastName  = get('last_name');
            const firstName = get('first_name');
            const fatherName= get('father_name');
            const fullname  = [lastName, firstName, fatherName].filter(Boolean).join(' ') || `تلميذ ${idx + 1}`;

            let birth_date = null;
            const rawDate = get('birth_date');
            if (rawDate) {
              if (rawDate instanceof Date) birth_date = rawDate.toISOString().split('T')[0];
              else if (/^\d{4}-\d{2}-\d{2}$/.test(rawDate)) birth_date = rawDate;
              else if (/^\d{2}\/\d{2}\/\d{4}$/.test(rawDate)) {
                const [d, m, y] = rawDate.split('/');
                birth_date = `${y}-${m.padStart(2,'0')}-${d.padStart(2,'0')}`;
              }
            }

            const gender = get('gender');
            const normalizedGender = gender.includes('أنثى') || gender.toLowerCase() === 'f' || gender === '2' ? 'أنثى'
                                   : gender.includes('ذكر')  || gender.toLowerCase() === 'm' || gender === '1' ? 'ذكر' : gender;

            return {
              massar_code: get('massar_code'),
              fullname,
              gender: normalizedGender,
              birth_date,
              level: normalizeLevel(sheetLevel || get('level') || ''),
              classroom: sheetClassroom || get('classroom') || '',
              father_name: fatherName,
              _sheet: sheetName,
              _rowIndex: idx + 2,
            };
          });

          allStudents = [...allStudents, ...sheetStudents];
        });

        if (allStudents.length === 0) { reject(new Error('الملف فارغ أو لا يحتوي على بيانات')); return; }

        const uniqueStudents = allStudents.filter(
          (s, idx, self) => idx === self.findIndex(t => t.massar_code === s.massar_code)
        );

        resolve({ students: uniqueStudents, headers: globalHeaders, colMap: globalColMap, totalRows: uniqueStudents.length });
      } catch (err) { reject(err); }
    };
    reader.onerror = () => reject(new Error('فشل قراءة الملف'));
    reader.readAsArrayBuffer(file);
  });
}

export default function ImportPage() {
  const [step,     setStep]     = useState('upload'); // upload | preview | importing | done
  const [file,     setFile]     = useState(null);
  const [parsed,   setParsed]   = useState(null);
  const [progress, setProgress] = useState({ done: 0, total: 0, errors: 0 });
  const [duplicates, setDuplicates] = useState([]);
  const [skipDups, setSkipDups] = useState(true);

  const onDrop = useCallback(async (accepted) => {
    const f = accepted[0];
    if (!f) return;
    if (!f.name.match(/\.(xlsx|xls|csv)$/i)) { toast.error('يرجى رفع ملف Excel (.xlsx أو .xls) أو CSV'); return; }
    setFile(f);
    toast.loading('جاري قراءة الملف...', { id: 'parse' });
    try {
      const result = await parseExcel(f);
      setParsed(result);
      setStep('preview');
      toast.success(`تم قراءة ${result.totalRows} صف`, { id: 'parse' });
    } catch (err) {
      toast.error(err.message, { id: 'parse' });
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept: { 'application/vnd.ms-excel': ['.xls'], 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'], 'text/csv': ['.csv'] },
    maxFiles: 1,
  });

  async function startImport() {
    if (!parsed) return;
    setStep('importing');
    const students = parsed.students;
    let done = 0, errors = 0;
    const errs = [];

    const BATCH = 20;
    for (let i = 0; i < students.length; i += BATCH) {
      const batch = students.slice(i, i + BATCH);
      const res = await fetch('/api/import-students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ students: batch, skipDuplicates: skipDups }),
      });
      const data = await res.json();
      done   += data.inserted || 0;
      errors += data.errors   || 0;
      if (data.duplicates) errs.push(...data.duplicates);
      setProgress({ done: i + batch.length, total: students.length, errors });
    }

    setDuplicates(errs);
    setStep('done');
    toast.success(`تم استيراد ${done} تلميذ بنجاح`);
  }

  function reset() { setStep('upload'); setFile(null); setParsed(null); setProgress({ done: 0, total: 0, errors: 0 }); setDuplicates([]); }

  function downloadTemplate() {
    const ws = XLSX.utils.aoa_to_sheet([
      ['رقم مسار', 'الاسم العائلي', 'الاسم الشخصي', 'اسم الأب', 'الجنس', 'تاريخ الازدياد', 'المستوى', 'الفصل'],
      ['G123456789', 'الإدريسي', 'أحمد', 'محمد', 'ذكر', '2015-05-10', 'المستوى السادس', 'A'],
      ['G987654321', 'البكري',   'فاطمة','علي',   'أنثى', '2016-03-15', 'المستوى الخامس', 'B'],
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'التلاميذ');
    XLSX.writeFile(wb, 'نموذج_مسار.xlsx');
  }

  const pct = parsed ? Math.round((progress.done / parsed.totalRows) * 100) : 0;

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-black text-primary dark:text-white">استيراد التلاميذ من منظومة مسار</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">ارفع ملف Excel المستخرج من بوابة مسار لاستيراد بيانات التلاميذ تلقائياً</p>
      </div>

      {/* Steps indicator */}
      <div className="flex items-center gap-2">
        {[['upload','رفع الملف'],['preview','المعاينة'],['importing','الاستيراد'],['done','مكتمل']].map(([s, l], i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${
              step === s ? 'bg-primary text-white scale-110' : ['preview','importing','done'].indexOf(s) <= ['upload','preview','importing','done'].indexOf(step) ? 'bg-secondary-light text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
            }`}>{step === s ? i+1 : <Check size={14} />}</div>
            <span className={`text-xs font-bold hidden sm:block ${step === s ? 'text-primary dark:text-blue-300' : 'text-gray-400'}`}>{l}</span>
            {i < 3 && <div className="w-8 h-0.5 bg-gray-200 dark:bg-gray-700" />}
          </div>
        ))}
      </div>

      {/* UPLOAD */}
      {step === 'upload' && (
        <div className="space-y-4">
          <div {...getRootProps()} className={`border-3 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${isDragActive ? 'border-primary bg-primary-pale dark:bg-primary/10 scale-105' : 'border-gray-300 dark:border-gray-600 hover:border-primary-light hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
            <input {...getInputProps()} />
            <div className="flex flex-col items-center gap-4">
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all ${isDragActive ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-400'}`}>
                <FileSpreadsheet size={40} />
              </div>
              <div>
                <p className="text-lg font-black text-gray-700 dark:text-gray-200">
                  {isDragActive ? 'أفلت الملف هنا...' : 'اسحب ملف Excel هنا أو انقر للاختيار'}
                </p>
                <p className="text-sm text-gray-400 mt-1">يدعم: .xlsx، .xls، .csv — مستخرج من منظومة مسار</p>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1.5 text-xs text-gray-400"><Check size={12} className="text-green-500" />رقم مسار</div>
                <div className="flex items-center gap-1.5 text-xs text-gray-400"><Check size={12} className="text-green-500" />الاسم الكامل</div>
                <div className="flex items-center gap-1.5 text-xs text-gray-400"><Check size={12} className="text-green-500" />المستوى والفصل</div>
                <div className="flex items-center gap-1.5 text-xs text-gray-400"><Check size={12} className="text-green-500" />الجنس وتاريخ الازدياد</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertCircle size={18} className="text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-blue-700 dark:text-blue-300">كيف أستخرج الملف من مسار؟</p>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">ادخل إلى بوابة مسار ← إدارة التلاميذ ← تصدير Excel، ثم ارفع الملف هنا</p>
              </div>
            </div>
            <button onClick={downloadTemplate} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold flex-shrink-0 hover:bg-blue-200 dark:hover:bg-blue-700 transition-all">
              <Download size={14} /> نموذج
            </button>
          </div>
        </div>
      )}

      {/* PREVIEW */}
      {step === 'preview' && parsed && (
        <div className="space-y-4">
          {/* File info */}
          <div className="card p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center text-green-600"><FileSpreadsheet size={24} /></div>
            <div>
              <p className="font-bold text-gray-800 dark:text-white">{file?.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{parsed.totalRows} تلميذ — {(file?.size / 1024).toFixed(1)} KB</p>
            </div>
            <button onClick={reset} className="mr-auto text-gray-400 hover:text-gray-600"><X size={20} /></button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[['🎓', 'إجمالي التلاميذ', parsed.totalRows, 'bg-blue-50 text-blue-700'],
              ['👦', 'ذكور', parsed.students.filter(s => s.gender === 'ذكر').length, 'bg-indigo-50 text-indigo-700'],
              ['👧', 'إناث', parsed.students.filter(s => s.gender === 'أنثى').length, 'bg-pink-50 text-pink-700'],
            ].map(([e, l, v, c]) => (
              <div key={l} className={`${c} dark:bg-opacity-20 rounded-xl p-4 text-center`}>
                <span className="text-2xl">{e}</span>
                <p className="text-2xl font-black mt-1">{v}</p>
                <p className="text-xs font-bold">{l}</p>
              </div>
            ))}
          </div>

          {/* Options */}
          <div className="card p-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={skipDups} onChange={e => setSkipDups(e.target.checked)} className="w-4 h-4 accent-primary" />
              <div>
                <p className="font-bold text-sm text-gray-700 dark:text-gray-200">تجاهل التلاميذ المكررين (نفس رقم مسار)</p>
                <p className="text-xs text-gray-400">سيتم تخطي التلاميذ الموجودين مسبقاً في قاعدة البيانات</p>
              </div>
            </label>
          </div>

          {/* Preview table */}
          <div className="card overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <p className="font-bold text-sm text-gray-700 dark:text-gray-200">معاينة البيانات (أول 10 صفوف)</p>
              <span className="badge bg-gray-100 dark:bg-gray-700 text-gray-500">{parsed.totalRows} صف</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>{['رقم مسار','الاسم الكامل','الجنس','المستوى','القسم','تاريخ الازدياد'].map(h => (
                    <th key={h} className="table-head">{h}</th>
                  ))}</tr>
                </thead>
                <tbody>
                  {parsed.students.slice(0, 10).map((s, i) => (
                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="table-cell font-mono text-xs">{s.massar_code || '—'}</td>
                      <td className="table-cell font-bold">{s.fullname}</td>
                      <td className="table-cell"><span className={`badge ${s.gender === 'ذكر' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'}`}>{s.gender || '—'}</span></td>
                      <td className="table-cell text-xs">{s.level || '—'}</td>
                      <td className="table-cell text-xs">{s.classroom || '—'}</td>
                      <td className="table-cell text-xs text-gray-500">{s.birth_date || '—'}</td>
                    </tr>
                  ))}
                  {parsed.totalRows > 10 && (
                    <tr><td colSpan={6} className="table-cell text-center text-gray-400 italic">... و {parsed.totalRows - 10} تلميذ آخر</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={reset} className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-bold text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
              <X size={16} /> إلغاء
            </button>
            <button onClick={startImport} className="btn-primary">
              <Upload size={18} /> بدء الاستيراد ({parsed.totalRows} تلميذ)
            </button>
          </div>
        </div>
      )}

      {/* IMPORTING */}
      {step === 'importing' && (
        <div className="card p-10 text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto animate-spin">
            <Loader size={36} className="text-primary" />
          </div>
          <div>
            <p className="text-xl font-black text-primary dark:text-white">جاري استيراد البيانات...</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{progress.done} / {parsed?.totalRows} تلميذ</p>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div className="bg-gradient-to-l from-primary to-secondary-light h-3 rounded-full transition-all duration-300" style={{ width: `${pct}%` }} />
          </div>
          <p className="text-2xl font-black text-primary dark:text-blue-300">{pct}%</p>
        </div>
      )}

      {/* DONE */}
      {step === 'done' && (
        <div className="card p-10 text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto">
            <Check size={40} className="text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-black text-green-600">تم الاستيراد بنجاح!</p>
            <div className="flex justify-center gap-8 mt-4">
              <div><p className="text-3xl font-black text-primary dark:text-blue-300">{progress.done}</p><p className="text-xs text-gray-500">تم معالجتهم</p></div>
              <div><p className="text-3xl font-black text-red-400">{progress.errors}</p><p className="text-xs text-gray-500">أخطاء</p></div>
              {duplicates.length > 0 && <div><p className="text-3xl font-black text-orange-400">{duplicates.length}</p><p className="text-xs text-gray-500">مكررون</p></div>}
            </div>
          </div>
          {duplicates.length > 0 && (
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 text-right">
              <p className="font-bold text-orange-700 dark:text-orange-300 text-sm mb-2">التلاميذ المتجاهلون (مكررون):</p>
              <div className="max-h-32 overflow-y-auto space-y-1">
                {duplicates.map((d, i) => <p key={i} className="text-xs text-orange-600 dark:text-orange-400">{d.fullname} — {d.massar_code}</p>)}
              </div>
            </div>
          )}
          <div className="flex gap-3 justify-center">
            <button onClick={reset} className="btn-outline">استيراد ملف آخر</button>
            <a href="/dashboard/students" className="btn-primary">عرض التلاميذ</a>
          </div>
        </div>
      )}
    </div>
  );
}
