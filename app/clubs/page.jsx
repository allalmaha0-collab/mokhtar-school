'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Star, Users, ArrowLeft } from 'lucide-react';

const COLORS = [
  'from-blue-500 to-indigo-600',
  'from-green-500 to-teal-600',
  'from-amber-500 to-orange-600',
  'from-purple-500 to-violet-600',
  'from-rose-500 to-pink-600',
];

export default function ClubsPage() {
  const [clubs, setClubs] = useState([]);
  const [settings, setSettings] = useState({});

  useEffect(() => {
    fetch('/api/clubs').then(r => r.json()).then(d => setClubs(d.clubs || []));
    fetch('/api/settings').then(r => r.json()).then(d => setSettings(d.settings || {}));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar settings={settings} />

      <div className="mt-16 bg-gradient-to-l from-primary to-primary-light text-white py-16 px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Star size={32} />
          </div>
          <h1 className="text-4xl font-black mb-3">الأندية التربوية</h1>
          <p className="text-white/80">اكتشف أندية المؤسسة وأنشطتها المتنوعة</p>
        </motion.div>
      </div>

      <main className="flex-1 py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">

          {/* Intro */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="card p-6 mb-10 text-center max-w-3xl mx-auto">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              تحتضن مجموعة مدارس محمد المخطار مجموعة من الأندية التربوية التي تهدف إلى تنمية مواهب التلاميذ وتعزيز مهاراتهم خارج الفصل الدراسي، وتشمل مجالات القراءة والفن والرياضة والعلوم وغيرها.
            </p>
          </motion.div>

          {clubs.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <Star size={48} className="mx-auto mb-3 opacity-40" />
              <p>لا توجد أندية مسجلة حالياً</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clubs.map((club, i) => (
                <motion.div key={club.id}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -6 }} className="card overflow-hidden group">

                  <div className={`h-32 bg-gradient-to-br ${COLORS[i % COLORS.length]} flex items-center justify-center`}>
                    {club.logoUrl ? (
                      <img src={club.logoUrl} alt={club.name} className="w-20 h-20 object-contain" />
                    ) : (
                      <Star size={48} className="text-white/60" />
                    )}
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-black text-primary dark:text-white text-base leading-tight">{club.name}</h3>
                      <span className={`badge ${club.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'} text-xs flex-shrink-0`}>
                        {club.isActive ? 'نشط' : 'متوقف'}
                      </span>
                    </div>

                    {club.description && (
                      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">{club.description}</p>
                    )}

                    {club.supervisors && (
                      <p className="text-xs text-gray-400 flex items-center gap-1 mb-4">
                        <Users size={12} /> المؤطر: {club.supervisors}
                      </p>
                    )}

                    {club.activities?.length > 0 && (
                      <p className="text-xs text-secondary font-bold mb-3">{club.activities.length} نشاط مسجل</p>
                    )}

                    <Link href={`/clubs/${club.id}`}
                      className="flex items-center gap-2 text-primary dark:text-blue-300 font-bold text-sm hover:gap-3 transition-all">
                      عرض التفاصيل <ArrowLeft size={16} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer settings={settings} />
    </div>
  );
}
