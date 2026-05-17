'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Star, Users, Calendar, ArrowRight, Activity } from 'lucide-react';

export default function ClubDetailPage() {
  const { id }  = useParams();
  const [club, setClub]     = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/clubs/${id}`)
      .then(r => r.json())
      .then(d => { setClub(d.club); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
    </div>
  );

  if (!club) return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <p className="text-gray-400 text-xl mb-4">النادي غير موجود</p>
      <Link href="/clubs" className="btn-primary">العودة للأندية</Link>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="mt-16 bg-gradient-to-l from-primary to-primary-light text-white py-16 px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
          <Link href="/clubs" className="flex items-center gap-2 text-white/70 hover:text-white mb-6 text-sm transition-colors">
            <ArrowRight size={16} /> العودة إلى الأندية
          </Link>
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
              {club.logoUrl ? (
                <img src={club.logoUrl} alt={club.name} className="w-14 h-14 object-contain" />
              ) : (
                <Star size={36} />
              )}
            </div>
            <div>
              <h1 className="text-3xl font-black mb-1">{club.name}</h1>
              {club.supervisors && (
                <p className="text-white/80 flex items-center gap-2">
                  <Users size={16} /> {club.supervisors}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      <main className="flex-1 py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 space-y-8">

          {/* About */}
          {club.description && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-6">
              <h2 className="font-black text-primary dark:text-white text-xl mb-4">عن النادي</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{club.description}</p>
            </motion.div>
          )}

          {/* Activities */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h2 className="font-black text-primary dark:text-white text-xl mb-6 flex items-center gap-2">
              <Activity size={20} /> أنشطة النادي ({club.activities?.length || 0})
            </h2>

            {!club.activities?.length ? (
              <div className="card p-12 text-center text-gray-400">
                <Activity size={40} className="mx-auto mb-3 opacity-40" />
                <p>لا توجد أنشطة مسجلة لهذا النادي حتى الآن</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {club.activities.map(a => (
                  <div key={a.id} className="card p-5">
                    <div className="h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl mb-4 flex items-center justify-center">
                      {a.images ? (
                        <img src={a.images.split(',')[0]} alt={a.title} className="w-full h-full object-cover rounded-xl" />
                      ) : (
                        <Activity size={32} className="text-primary/30" />
                      )}
                    </div>
                    <h3 className="font-black text-primary dark:text-white mb-2">{a.title}</h3>
                    {a.description && <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-3 line-clamp-3">{a.description}</p>}
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <Calendar size={12} /> {new Date(a.date).toLocaleDateString('ar-MA')}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
