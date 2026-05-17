'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Building2, Calendar, Moon, Sun, BookOpen, Users } from 'lucide-react';

export default function BoardingPage() {
  const [posts, setPosts] = useState([]);
  const [settings, setSettings] = useState({});

  useEffect(() => {
    fetch('/api/boarding').then(r => r.json()).then(d => setPosts(d.posts || []));
    fetch('/api/settings').then(r => r.json()).then(d => setSettings(d.settings || {}));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar settings={settings} />

      <div className="mt-16 bg-gradient-to-l from-purple-700 to-primary text-white py-16 px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Building2 size={32} />
          </div>
          <h1 className="text-4xl font-black mb-3">فضاء الداخلية</h1>
          <p className="text-white/80">بيئة آمنة ومريحة لتلاميذ الداخلية</p>
        </motion.div>
      </div>

      <main className="flex-1 py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4">

          {/* Info Cards */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {[
              { icon: Moon, title: 'الإقامة', desc: 'غرف مريحة ومجهزة', color: 'bg-purple-100 text-purple-600' },
              { icon: Sun, title: 'الإطعام', desc: 'وجبات متوازنة يومياً', color: 'bg-amber-100 text-amber-600' },
              { icon: BookOpen, title: 'الدراسة', desc: 'فضاء مراجعة هادئ', color: 'bg-blue-100 text-blue-600' },
              { icon: Users, title: 'الإشراف', desc: 'طاقم إشراف متخصص', color: 'bg-green-100 text-green-600' },
            ].map(c => (
              <div key={c.title} className="card p-5 text-center">
                <div className={`w-12 h-12 rounded-2xl ${c.color} flex items-center justify-center mx-auto mb-3`}>
                  <c.icon size={22} />
                </div>
                <h3 className="font-black text-primary dark:text-white mb-1">{c.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs">{c.desc}</p>
              </div>
            ))}
          </motion.div>

          {/* About */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="card p-8 mb-10">
            <h2 className="font-black text-primary dark:text-white text-xl mb-4">عن الداخلية</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              توفر داخلية مجموعة مدارس محمد المخطار بيئة تعليمية وإقامية متكاملة للتلاميذ القادمين من المناطق النائية، مما يضمن لهم الاستقرار والتفوق الدراسي في ظروف ملائمة وآمنة.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              تشمل خدمات الداخلية الإقامة، الإطعام، المراقبة الصحية، فضاءات الدراسة، والأنشطة الترفيهية، كل ذلك تحت إشراف طاقم تربوي متخصص ومتفانٍ.
            </p>
          </motion.div>

          {/* Posts */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="font-black text-primary dark:text-white text-xl mb-6">أخبار الداخلية</h2>
            {posts.length === 0 ? (
              <div className="card p-12 text-center text-gray-400">
                <Building2 size={40} className="mx-auto mb-3 opacity-40" />
                <p>لا توجد أخبار حالياً</p>
              </div>
            ) : (
              <div className="space-y-4">
                {posts.map(p => (
                  <div key={p.id} className="card p-5">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-black text-primary dark:text-white">{p.title}</h3>
                      <span className="badge bg-purple-100 text-purple-700 text-xs flex-shrink-0">{p.category}</span>
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

          {/* Internal Rules */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="card p-8 mt-8">
            <h2 className="font-black text-primary dark:text-white text-xl mb-4">النظام الداخلي</h2>
            <ul className="space-y-3">
              {[
                'الالتزام بمواعيد الإيقاظ والنوم المحددة',
                'المحافظة على نظافة الغرف والمرافق المشتركة',
                'الحضور المنتظم لوجبات الإطعام',
                'احترام المشرفين والزملاء',
                'ممنوع استخدام الهاتف المحمول خلال ساعات الدراسة',
                'الإخطار المسبق في حالة الغياب',
              ].map((r, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-600 dark:text-gray-300 text-sm">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5">{i + 1}</span>
                  {r}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </main>

      <Footer settings={settings} />
    </div>
  );
}
