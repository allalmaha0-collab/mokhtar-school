'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Building2, MapPin, Phone, GraduationCap, Target, Eye, BookOpen } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

export default function AboutPage() {
  const [settings, setSettings] = useState({});
  useEffect(() => {
    fetch('/api/settings').then(r => r.json()).then(d => setSettings(d.settings || {}));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar settings={settings} />

      {/* Page Header */}
      <div className="mt-16 bg-gradient-to-l from-primary to-primary-light text-white py-16 px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Building2 size={32} />
          </div>
          <h1 className="text-4xl font-black mb-3">المؤسسة</h1>
          <p className="text-white/80">تعرف على مجموعة مدارس محمد المخطار</p>
        </motion.div>
      </div>

      <main className="flex-1 py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4 space-y-12">

          {/* Identity Card */}
          <motion.section initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.h2 variants={fadeUp} className="section-title text-center mb-8">الهوية المؤسسية</motion.h2>
            <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card p-6 space-y-4">
                <h3 className="font-black text-primary dark:text-blue-300 text-lg flex items-center gap-2">
                  <Building2 size={20} /> معلومات المؤسسة
                </h3>
                <InfoRow label="اسم المؤسسة" value="مجموعة مدارس محمد المخطار" />
                <InfoRow label="المدير" value={settings.director || 'عبد العزيز علال'} />
                <InfoRow label="النوع" value="مؤسسة تعليمية ابتدائية عمومية" />
                <InfoRow label="اللغة" value="العربية — الفرنسية" />
              </div>
              <div className="card p-6 space-y-4">
                <h3 className="font-black text-primary dark:text-blue-300 text-lg flex items-center gap-2">
                  <MapPin size={20} /> التبعية الإدارية
                </h3>
                <InfoRow label="الوزارة" value="وزارة التربية الوطنية والتعليم الأولي والرياضة" />
                <InfoRow label="الأكاديمية" value="الأكاديمية الجهوية للتربية والتكوين لجهة الشرق" />
                <InfoRow label="المديرية" value="المديرية الإقليمية فجيج" />
                <InfoRow label="الهاتف" value={settings.phone || '0662190618'} />
              </div>
            </motion.div>
          </motion.section>

          {/* Vision & Mission */}
          <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Target, title: 'الرسالة', color: 'blue', text: 'تقديم تعليم جيد ومتكافئ لجميع المتعلمين، وتكوين أجيال قادرة على الانخراط في الحياة الاجتماعية والمهنية بكفاءة وقيم راسخة.' },
              { icon: Eye, title: 'الرؤية', color: 'green', text: 'مدرسة عصرية ومتفتحة، تحتضن التنوع وتوظف الابتكار لبناء متعلم متوازن ومتكامل في شخصيته العلمية والإنسانية.' },
              { icon: BookOpen, title: 'القيم', color: 'amber', text: 'الجودة، المساواة، الاحترام، الانفتاح، المواطنة، والمثابرة — قيم تشكّل هوية مجموعتنا التربوية وتوجّه عملها اليومي.' },
            ].map(v => (
              <div key={v.title} className="card p-6 text-center">
                <div className={`w-14 h-14 rounded-2xl bg-${v.color}-100 flex items-center justify-center mx-auto mb-4`}>
                  <v.icon size={26} className={`text-${v.color}-600`} />
                </div>
                <h3 className="font-black text-primary dark:text-white text-lg mb-3">{v.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{v.text}</p>
              </div>
            ))}
          </motion.section>

          {/* About Text */}
          <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="card p-8">
            <h2 className="font-black text-primary dark:text-white text-xl mb-4">تعريف المؤسسة</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base mb-4">
              {settings.about_text || 'مجموعة مدارس محمد المخطار مؤسسة تعليمية عمومية تابعة لوزارة التربية الوطنية والتعليم الأولي والرياضة، تقع في نطاق المديرية الإقليمية فجيج التابعة للأكاديمية الجهوية للتربية والتكوين لجهة الشرق.'}
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
              تتكون المجموعة من وحدتين: المدرسة المركزية والفرع (مدرسة المنجم)، وتضم مئات التلاميذ في مختلف المستويات الابتدائية. تحتضن المؤسسة طاقماً تربوياً مؤهلاً يسعى إلى تحقيق الجودة في التعليم وتنمية شخصية المتعلم في جميع أبعادها.
            </p>
          </motion.section>

          {/* Two Schools */}
          <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="section-title text-center mb-8">وحدات المؤسسة</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: 'المدرسة المركزية', desc: 'المقر الرئيسي لمجموعة مدارس محمد المخطار، تضم مجموعة من الفصول الدراسية وتحتضن الإدارة التربوية وجميع المرافق والأندية.', icon: '🏫' },
                { name: 'فرع المنجم', desc: 'الفرع الثاني للمجموعة، يخدم أبناء منطقة المنجم ويوفر لهم نفس المستوى التعليمي في بيئة مشجعة وآمنة.', icon: '🏫' },
              ].map(s => (
                <div key={s.name} className="card p-6 flex gap-4">
                  <div className="text-4xl">{s.icon}</div>
                  <div>
                    <h3 className="font-black text-primary dark:text-white text-lg mb-2">{s.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        </div>
      </main>

      <Footer settings={settings} />
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex gap-2 border-b border-gray-100 dark:border-gray-700 pb-2">
      <span className="text-gray-500 dark:text-gray-400 text-sm flex-shrink-0">{label}:</span>
      <span className="font-bold text-gray-800 dark:text-white text-sm">{value}</span>
    </div>
  );
}
