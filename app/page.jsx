'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, useInView } from 'framer-motion';
import {
  GraduationCap, BookOpen, Users, Star, Award, Phone,
  ArrowLeft, ChevronLeft, Bell, Calendar, MapPin,
  Heart, Shield, Newspaper, Activity, Building2
} from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

function AnimSection({ children, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? 'visible' : 'hidden'} className={className}>
      {children}
    </motion.div>
  );
}

const QUICK_LINKS = [
  { icon: GraduationCap, label: 'نتائج التلاميذ', desc: 'ابحث برقم المسار', href: '/results', color: 'from-blue-500 to-blue-700' },
  { icon: Users, label: 'الأطر التربوية', desc: 'فريق التدريس', href: '/teachers', color: 'from-green-500 to-green-700' },
  { icon: Star, label: 'الأندية التربوية', desc: 'أنشطة متنوعة', href: '/clubs', color: 'from-amber-500 to-amber-700' },
  { icon: Building2, label: 'الداخلية', desc: 'فضاء الداخلية', href: '/boarding', color: 'from-purple-500 to-purple-700' },
  { icon: Heart, label: 'المختص الاجتماعي', desc: 'دعم ومواكبة', href: '/social', color: 'from-rose-500 to-rose-700' },
  { icon: Activity, label: 'الأنشطة المدرسية', desc: 'معرض الأنشطة', href: '/activities', color: 'from-teal-500 to-teal-700' },
];

const CATEGORY_COLORS = {
  'إعلان': 'bg-blue-100 text-blue-700',
  'فعالية': 'bg-amber-100 text-amber-700',
  'ثقافي': 'bg-purple-100 text-purple-700',
  'نتائج': 'bg-green-100 text-green-700',
  'نشاط': 'bg-teal-100 text-teal-700',
  'عام':   'bg-gray-100 text-gray-600',
};

export default function HomePage() {
  const [news, setNews] = useState([]);
  const [activities, setActivities] = useState([]);
  const [settings, setSettings] = useState({});
  const [announcement, setAnnouncement] = useState(null);
  const [heroIdx, setHeroIdx] = useState(0);

  useEffect(() => {
    fetch('/api/news?limit=4').then(r => r.json()).then(d => setNews(d.news || []));
    fetch('/api/activities?limit=4').then(r => r.json()).then(d => setActivities(d.activities || []));
    fetch('/api/settings').then(r => r.json()).then(d => setSettings(d.settings || {}));
    fetch('/api/announcements').then(r => r.json()).then(d => { if (d.announcements?.[0]) setAnnouncement(d.announcements[0]); });
  }, []);

  const heroSlides = [
    { bg: 'from-primary via-primary-light to-secondary', title: 'مجموعة مدارس محمد المخطار', sub: 'وزارة التربية الوطنية والتعليم الأولي والرياضة' },
    { bg: 'from-primary-light via-secondary to-primary', title: 'التعليم من أجل المستقبل', sub: 'تكوين أجيال واعدة بالمعرفة والقيم والمهارات' },
    { bg: 'from-secondary via-primary to-primary-light', title: 'بيئة تعليمية محفزة', sub: 'فضاءات حديثة وأطر كفؤة لخدمة التلاميذ' },
  ];

  useEffect(() => {
    const t = setInterval(() => setHeroIdx(i => (i + 1) % heroSlides.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar settings={settings} />

      {/* Announcement Banner */}
      {announcement && (
        <div className="bg-accent text-white text-center py-2 px-4 text-sm font-bold flex items-center justify-center gap-2 mt-16">
          <Bell size={16} className="flex-shrink-0" />
          <span>{announcement.title}</span>
        </div>
      )}

      {/* Hero Section */}
      <section className={`relative min-h-[90vh] bg-gradient-to-bl ${heroSlides[heroIdx].bg} flex items-center justify-center overflow-hidden ${!announcement ? 'mt-16' : ''}`}>
        {/* Decorative circles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/5 rounded-full" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-white/5 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/3 rounded-full" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white">
          {/* Logos row */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-6 mb-8">
            <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center border border-white/30">
              <img src="/logo-morocco.png" alt="المغرب" className="w-14 h-14 object-contain" onError={e => { e.target.style.display = 'none'; }} />
              <GraduationCap size={28} className="text-white hidden" />
            </div>
            <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center border border-white/30">
              <GraduationCap size={32} className="text-white" />
            </div>
          </motion.div>

          <motion.p key={heroIdx + 'sub'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            className="text-white/80 text-sm md:text-base mb-3 font-medium">
            {heroSlides[heroIdx].sub}
          </motion.p>

          <motion.h1 key={heroIdx + 'title'} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            {heroSlides[heroIdx].title}
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} transition={{ delay: 0.4 }}
            className="text-base md:text-lg mb-4">
            الأكاديمية الجهوية للتربية والتكوين لجهة الشرق — المديرية الإقليمية فجيج
          </motion.p>

          {settings.welcome_message && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.85 }} transition={{ delay: 0.6 }}
              className="max-w-2xl mx-auto text-sm md:text-base text-white/80 leading-relaxed mb-8">
              {settings.welcome_message}
            </motion.p>
          )}

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-4 justify-center">
            <Link href="/results"
              className="bg-white text-primary font-black px-8 py-3 rounded-2xl hover:bg-white/90 transition-all hover:-translate-y-1 hover:shadow-xl flex items-center gap-2">
              <GraduationCap size={20} /> نتائج التلاميذ
            </Link>
            <Link href="/about"
              className="bg-white/20 backdrop-blur border border-white/40 text-white font-black px-8 py-3 rounded-2xl hover:bg-white/30 transition-all hover:-translate-y-1 flex items-center gap-2">
              <BookOpen size={20} /> عن المؤسسة
            </Link>
          </motion.div>
        </div>

        {/* Slide dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => setHeroIdx(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${i === heroIdx ? 'bg-white w-6' : 'bg-white/40'}`} />
          ))}
        </div>
      </section>

      {/* Stats Bar */}
      <AnimSection className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-5xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { num: '400+', label: 'تلميذ وتلميذة', icon: GraduationCap },
            { num: '20+', label: 'أستاذ وأستاذة', icon: Users },
            { num: '5+', label: 'أندية تربوية', icon: Star },
            { num: '30+', label: 'سنة من العطاء', icon: Award },
          ].map(s => (
            <motion.div key={s.label} variants={fadeUp} className="flex flex-col items-center gap-1">
              <s.icon size={28} className="text-primary mb-1" />
              <span className="text-3xl font-black text-primary dark:text-blue-300">{s.num}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </AnimSection>

      {/* Quick Links */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <AnimSection>
            <motion.div variants={fadeUp} className="text-center mb-10">
              <span className="section-tag">خدماتنا</span>
              <h2 className="section-title">روابط سريعة</h2>
              <div className="divider" />
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {QUICK_LINKS.map(l => (
                <motion.div key={l.href} variants={fadeUp}>
                  <Link href={l.href}
                    className="group card p-6 flex flex-col items-center text-center gap-3 cursor-pointer">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${l.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                      <l.icon size={26} />
                    </div>
                    <div>
                      <p className="font-black text-primary dark:text-white text-sm">{l.label}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{l.desc}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </AnimSection>
        </div>
      </section>

      {/* Director's Welcome */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-5xl mx-auto px-4">
          <AnimSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div variants={fadeUp}>
                <span className="section-tag">كلمة المدير</span>
                <h2 className="section-title">رسالة ترحيبية</h2>
                <div className="divider mb-4 mr-0" />
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  {settings.welcome_message || 'أهلاً وسهلاً بكم في الموقع الرسمي لمجموعة مدارس محمد المخطار. يسعدنا أن نضع بين أيديكم هذه المنصة الرقمية التي تعكس توجهنا نحو مدرسة عصرية ومتفتحة.'}
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  إن مؤسستنا تضم طاقماً تربوياً مؤهلاً يعمل بكل إخلاص وتفانٍ لتحقيق الجودة في التعليم وتنمية شخصية المتعلم في جميع أبعادها.
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-black text-lg">ع</div>
                  <div>
                    <p className="font-black text-primary dark:text-white">{settings.director || 'عبد العزيز علال'}</p>
                    <p className="text-sm text-gray-500">مدير المؤسسة</p>
                  </div>
                </div>
              </motion.div>
              <motion.div variants={fadeUp} className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-8 text-center">
                <GraduationCap size={80} className="mx-auto text-primary/40 mb-4" />
                <p className="text-primary font-black text-xl mb-2">مجموعة مدارس محمد المخطار</p>
                <p className="text-gray-500 text-sm">المديرية الإقليمية فجيج</p>
                <p className="text-gray-500 text-sm">الأكاديمية الجهوية لجهة الشرق</p>
                <div className="mt-6 flex justify-center gap-4">
                  <div className="text-center">
                    <p className="font-black text-2xl text-primary">المركزية</p>
                    <p className="text-xs text-gray-500">المدرسة الأم</p>
                  </div>
                  <div className="w-px bg-gray-200" />
                  <div className="text-center">
                    <p className="font-black text-2xl text-primary">المنجم</p>
                    <p className="text-xs text-gray-500">الفرع</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <AnimSection>
            <motion.div variants={fadeUp} className="flex items-center justify-between mb-10">
              <div>
                <span className="section-tag">أحدث المستجدات</span>
                <h2 className="section-title">آخر الأخبار</h2>
                <div className="divider mr-0" />
              </div>
              <Link href="/news" className="btn-outline text-sm gap-1">
                كل الأخبار <ArrowLeft size={16} />
              </Link>
            </motion.div>
            {news.length === 0 ? (
              <motion.p variants={fadeUp} className="text-center text-gray-400 py-12">لا توجد أخبار حالياً</motion.p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {news.map((n, i) => (
                  <motion.div key={n.id} variants={fadeUp} className="card overflow-hidden group">
                    <div className="h-36 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      {n.imageUrl ? (
                        <img src={n.imageUrl} alt={n.title} className="w-full h-full object-cover" />
                      ) : (
                        <Newspaper size={40} className="text-primary/30" />
                      )}
                    </div>
                    <div className="p-4">
                      <span className={`badge text-xs mb-2 ${CATEGORY_COLORS[n.category] || 'bg-gray-100 text-gray-600'}`}>{n.category}</span>
                      <h3 className="font-black text-sm text-gray-800 dark:text-white leading-tight mb-2 line-clamp-2">{n.title}</h3>
                      <p className="text-xs text-gray-400 flex items-center gap-1">
                        <Calendar size={12} /> {new Date(n.publishedAt).toLocaleDateString('ar-MA')}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimSection>
        </div>
      </section>

      {/* Latest Activities */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <AnimSection>
            <motion.div variants={fadeUp} className="flex items-center justify-between mb-10">
              <div>
                <span className="section-tag">حياة مدرسية نشيطة</span>
                <h2 className="section-title">آخر الأنشطة</h2>
                <div className="divider mr-0" />
              </div>
              <Link href="/activities" className="btn-outline text-sm gap-1">
                كل الأنشطة <ArrowLeft size={16} />
              </Link>
            </motion.div>
            {activities.length === 0 ? (
              <motion.p variants={fadeUp} className="text-center text-gray-400 py-12">لا توجد أنشطة حالياً</motion.p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {activities.map(a => (
                  <motion.div key={a.id} variants={fadeUp} className="card overflow-hidden">
                    <div className="h-36 bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center">
                      <Activity size={40} className="text-secondary/40" />
                    </div>
                    <div className="p-4">
                      <span className="badge bg-green-100 text-green-700 text-xs mb-2">{a.category}</span>
                      <h3 className="font-black text-sm text-gray-800 dark:text-white leading-tight mb-2 line-clamp-2">{a.title}</h3>
                      <p className="text-xs text-gray-400 flex items-center gap-1">
                        <Calendar size={12} /> {new Date(a.date).toLocaleDateString('ar-MA')}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimSection>
        </div>
      </section>

      {/* Contact Bar */}
      <section className="py-12 bg-gradient-to-l from-primary to-primary-light text-white">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-black mb-1">تواصل معنا</h3>
            <p className="text-white/70">نحن هنا للإجابة على استفساراتكم</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a href={`tel:${settings.phone || '0662190618'}`}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl font-bold transition-all border border-white/30">
              <Phone size={18} /> {settings.phone || '0662190618'}
            </a>
            <Link href="/contact"
              className="flex items-center gap-2 bg-secondary-light hover:bg-secondary px-6 py-3 rounded-xl font-bold transition-all">
              <MapPin size={18} /> صفحة التواصل
            </Link>
          </div>
        </div>
      </section>

      <Footer settings={settings} />
    </div>
  );
}
