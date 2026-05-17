'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Heart, Users, Shield, BookOpen, Calendar } from 'lucide-react';

export default function SocialPage() {
  const [posts, setPosts] = useState([]);
  const [settings, setSettings] = useState({});

  useEffect(() => {
    fetch('/api/social').then(r => r.json()).then(d => setPosts(d.posts || []));
    fetch('/api/settings').then(r => r.json()).then(d => setSettings(d.settings || {}));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar settings={settings} />

      <div className="mt-16 bg-gradient-to-l from-rose-600 to-primary text-white py-16 px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Heart size={32} />
          </div>
          <h1 className="text-4xl font-black mb-3">المختص الاجتماعي</h1>
          <p className="text-white/80">دعم ومواكبة اجتماعية لتلاميذ المؤسسة</p>
        </motion.div>
      </div>

      <main className="flex-1 py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4">

          {/* Services */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {[
              { icon: Heart, title: 'الدعم النفسي', desc: 'جلسات إصغاء وإرشاد نفسي', color: 'bg-rose-100 text-rose-600' },
              { icon: Shield, title: 'الحماية', desc: 'الوقاية من العنف والتحرش', color: 'bg-blue-100 text-blue-600' },
              { icon: Users, title: 'المواكبة', desc: 'مواكبة الحالات الهشة', color: 'bg-green-100 text-green-600' },
              { icon: BookOpen, title: 'التحسيس', desc: 'حملات توعية وتثقيف', color: 'bg-amber-100 text-amber-600' },
            ].map(s => (
              <div key={s.title} className="card p-5 text-center">
                <div className={`w-12 h-12 rounded-2xl ${s.color} flex items-center justify-center mx-auto mb-3`}>
                  <s.icon size={22} />
                </div>
                <h3 className="font-black text-primary dark:text-white mb-1">{s.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs">{s.desc}</p>
              </div>
            ))}
          </motion.div>

          {/* About */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="card p-8 mb-10">
            <h2 className="font-black text-primary dark:text-white text-xl mb-4">عن المختص الاجتماعي</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              يضطلع المختص الاجتماعي بمجموعة من المهام الحيوية التي تهدف إلى ضمان جودة الحياة المدرسية للتلاميذ وتحقيق الانسجام والتوازن النفسي والاجتماعي داخل المؤسسة.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              يعمل المختص الاجتماعي على رصد الحالات التي تعاني من صعوبات اجتماعية أو نفسية، وتقديم الدعم اللازم لها بالتنسيق مع الأسرة والمؤسسة وشركاء المدرسة.
            </p>
          </motion.div>

          {/* Activities */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="font-black text-primary dark:text-white text-xl mb-6">الأنشطة والحملات</h2>
            {posts.length === 0 ? (
              <div className="card p-12 text-center text-gray-400">
                <Heart size={40} className="mx-auto mb-3 opacity-40" />
                <p>لا توجد أنشطة مسجلة حالياً</p>
              </div>
            ) : (
              <div className="space-y-4">
                {posts.map(p => (
                  <div key={p.id} className="card p-5">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-black text-primary dark:text-white">{p.title}</h3>
                      <span className="badge bg-rose-100 text-rose-700 text-xs flex-shrink-0">{p.category}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">{p.content}</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <Calendar size={12} /> {new Date(p.date).toLocaleDateString('ar-MA')}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </main>

      <Footer settings={settings} />
    </div>
  );
}
