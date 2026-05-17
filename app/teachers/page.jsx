'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Users, GraduationCap, Shield } from 'lucide-react';

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [settings, setSettings] = useState({});
  const [filter, setFilter]     = useState('all');

  useEffect(() => {
    fetch('/api/teachers').then(r => r.json()).then(d => setTeachers(d.teachers || []));
    fetch('/api/settings').then(r => r.json()).then(d => setSettings(d.settings || {}));
  }, []);

  const adminStaff = teachers.filter(t => t.isAdminStaff);
  const teaching   = teachers.filter(t => !t.isAdminStaff);
  const shown      = filter === 'admin' ? adminStaff : filter === 'teachers' ? teaching : teachers;

  const initials = name => name?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const colors   = ['from-blue-500 to-blue-700', 'from-green-500 to-green-700', 'from-purple-500 to-purple-700', 'from-amber-500 to-amber-700', 'from-rose-500 to-rose-700', 'from-teal-500 to-teal-700'];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar settings={settings} />

      <div className="mt-16 bg-gradient-to-l from-primary to-primary-light text-white py-16 px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Users size={32} />
          </div>
          <h1 className="text-4xl font-black mb-3">الأطر التربوية</h1>
          <p className="text-white/80">الفريق التربوي والإداري لمجموعة مدارس محمد المخطار</p>
        </motion.div>
      </div>

      <main className="flex-1 py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">

          {/* Filter */}
          <div className="flex justify-center gap-3 mb-10">
            {[
              { key: 'all',      label: `الكل (${teachers.length})` },
              { key: 'admin',    label: `الإدارة (${adminStaff.length})` },
              { key: 'teachers', label: `الأساتذة (${teaching.length})` },
            ].map(f => (
              <button key={f.key} onClick={() => setFilter(f.key)}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${filter === f.key ? 'bg-primary text-white shadow-md' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                {f.label}
              </button>
            ))}
          </div>

          {/* Admin Staff */}
          {(filter === 'all' || filter === 'admin') && adminStaff.length > 0 && (
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
              <h2 className="font-black text-primary dark:text-white text-xl mb-6 flex items-center gap-2">
                <Shield size={20} /> الإدارة التربوية
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {adminStaff.map((t, i) => (
                  <TeacherCard key={t.id} teacher={t} color={colors[i % colors.length]} initials={initials} isAdmin />
                ))}
              </div>
            </motion.section>
          )}

          {/* Teaching Staff */}
          {(filter === 'all' || filter === 'teachers') && teaching.length > 0 && (
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <h2 className="font-black text-primary dark:text-white text-xl mb-6 flex items-center gap-2">
                <GraduationCap size={20} /> هيئة التدريس
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {teaching.map((t, i) => (
                  <TeacherCard key={t.id} teacher={t} color={colors[i % colors.length]} initials={initials} />
                ))}
              </div>
            </motion.section>
          )}

          {shown.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <Users size={48} className="mx-auto mb-3 opacity-40" />
              <p>لا توجد بيانات حالياً</p>
            </div>
          )}
        </div>
      </main>

      <Footer settings={settings} />
    </div>
  );
}

function TeacherCard({ teacher, color, initials, isAdmin }) {
  return (
    <motion.div whileHover={{ y: -4 }} className="card p-5 text-center">
      {teacher.photoUrl ? (
        <img src={teacher.photoUrl} alt={teacher.fullname}
          className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-4 border-white shadow-md" />
      ) : (
        <div className={`w-20 h-20 rounded-full mx-auto mb-3 bg-gradient-to-br ${color} flex items-center justify-center text-white text-2xl font-black shadow-md border-4 border-white`}>
          {initials(teacher.fullname)}
        </div>
      )}
      {isAdmin && (
        <span className="inline-block badge bg-amber-100 text-amber-700 text-xs mb-2">إداري</span>
      )}
      <h3 className="font-black text-primary dark:text-white text-sm leading-tight mb-1">{teacher.fullname}</h3>
      <p className="text-gray-500 dark:text-gray-400 text-xs">{teacher.subject}</p>
      {teacher.bio && <p className="text-gray-400 text-xs mt-2 line-clamp-2">{teacher.bio}</p>}
    </motion.div>
  );
}
