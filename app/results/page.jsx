'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, GraduationCap, BookOpen, Award, AlertCircle, CheckCircle } from 'lucide-react';

export default function ResultsPage() {
  const [massarCode, setMassarCode] = useState('');
  const [loading, setLoading]       = useState(false);
  const [student, setStudent]       = useState(null);
  const [error, setError]           = useState('');

  async function handleSearch(e) {
    e.preventDefault();
    if (!massarCode.trim()) return;
    setLoading(true); setError(''); setStudent(null);
    try {
      const res = await fetch(`/api/students?massar=${massarCode.trim().toUpperCase()}`);
      const data = await res.json();
      if (!res.ok || !data.student) { setError('لم يُعثر على نتائج لهذا الرقم. تأكد من صحة رقم المسار.'); return; }
      setStudent(data.student);
    } catch { setError('خطأ في الاتصال بالخادم. حاول مرة أخرى.'); }
    finally { setLoading(false); }
  }

  function gradeColor(g) {
    if (g >= 16) return 'text-green-600 font-black';
    if (g >= 12) return 'text-blue-600 font-bold';
    if (g >= 10) return 'text-amber-600 font-bold';
    return 'text-red-600 font-bold';
  }

  function decisionBadge(d) {
    if (d?.includes('ناج') || d?.includes('منتقل')) return 'bg-green-100 text-green-700';
    if (d?.includes('راسب') || d?.includes('مُعاد')) return 'bg-red-100 text-red-700';
    return 'bg-blue-100 text-blue-700';
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="mt-16 bg-gradient-to-l from-primary to-primary-light text-white py-16 px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <GraduationCap size={32} />
          </div>
          <h1 className="text-4xl font-black mb-3">نتائج التلاميذ</h1>
          <p className="text-white/80">ابحث عن نتائجك باستخدام رقم المسار</p>
        </motion.div>
      </div>

      <main className="flex-1 py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4">

          {/* Search Box */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="card p-8 mb-8">
            <h2 className="font-black text-primary dark:text-white text-xl mb-6 text-center">أدخل رقم المسار</h2>
            <form onSubmit={handleSearch} className="flex gap-3">
              <input
                value={massarCode}
                onChange={e => setMassarCode(e.target.value)}
                placeholder="مثال: J123456789"
                className="input flex-1 text-center text-lg tracking-wider"
                dir="ltr"
              />
              <button type="submit" disabled={loading}
                className="btn-primary px-8 flex-shrink-0 disabled:opacity-60">
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                ) : (
                  <><Search size={18} /> بحث</>
                )}
              </button>
            </form>

            <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-sm text-blue-700 dark:text-blue-300">
              <p className="font-bold mb-1">كيفية الاستخدام:</p>
              <p>أدخل رقم مسار التلميذ المكوّن من 9 أرقام ويبدأ بحرف J، ثم اضغط على بحث.</p>
            </div>
          </motion.div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4 mb-6 flex items-center gap-3 text-red-700 dark:text-red-300">
                <AlertCircle size={20} className="flex-shrink-0" />
                <span className="font-bold">{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results */}
          <AnimatePresence>
            {student && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="space-y-6">

                {/* Student Info */}
                <div className="card p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl font-black">
                      {student.fullname?.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-gray-800 dark:text-white">{student.fullname}</h3>
                      <p className="text-gray-500 text-sm">{student.level} — {student.classroom}</p>
                      <p className="text-primary text-xs font-bold mt-1" dir="ltr">{student.massarCode}</p>
                    </div>
                  </div>
                </div>

                {/* Results by Semester */}
                {student.results?.length === 0 && (
                  <div className="card p-8 text-center text-gray-400">
                    <BookOpen size={40} className="mx-auto mb-3 opacity-40" />
                    <p>لا توجد نتائج مسجلة لهذا التلميذ حتى الآن</p>
                  </div>
                )}

                {student.results?.map(r => {
                  let grades = [];
                  try { grades = JSON.parse(r.grades || '[]'); } catch {}
                  return (
                    <motion.div key={r.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card overflow-hidden">
                      <div className="bg-primary px-6 py-4 flex items-center justify-between">
                        <h4 className="font-black text-white text-lg">{r.semester}</h4>
                        <div className="text-center">
                          <p className="text-white/70 text-xs">المعدل العام</p>
                          <p className="text-3xl font-black text-accent">{r.generalAverage?.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="p-6">
                        {grades.length > 0 && (
                          <div className="mb-6">
                            <h5 className="font-bold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                              <BookOpen size={16} /> نقط المواد
                            </h5>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                              {grades.map((g, i) => (
                                <div key={i} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-3 flex items-center justify-between">
                                  <span className="text-sm text-gray-600 dark:text-gray-300">{g.subject}</span>
                                  <span className={`text-lg ${gradeColor(g.grade)}`}>{g.grade}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                          <CheckCircle size={20} className="text-green-500" />
                          <span className="text-gray-600 dark:text-gray-300 font-medium">قرار المجلس:</span>
                          <span className={`badge text-sm px-4 py-1 ${decisionBadge(r.councilDecision)}`}>{r.councilDecision}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Demo hint */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="mt-8 text-center text-sm text-gray-400">
            للتجربة استخدم: <span className="font-bold text-primary" dir="ltr">J123456789</span>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
