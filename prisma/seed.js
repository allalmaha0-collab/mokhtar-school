// Prisma 7 generates an ESM-only client — use dynamic import() instead of require()
const bcrypt = require('bcryptjs');

async function main() {
  const { PrismaClient } = await import('@prisma/client');

  // Prisma 7: reads DATABASE_URL from env automatically
  const prisma = new PrismaClient();

  try {
    // ── Admin user ────────────────────────────────────────────────────────────
    const adminEmail    = process.env.ADMIN_EMAIL    || 'admin@mokhtar-school.ma';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const hash = await bcrypt.hash(adminPassword, 10);
    await prisma.user.upsert({
      where:  { email: adminEmail },
      update: {},
      create: { email: adminEmail, passwordHash: hash, name: 'عبد العزيز علال', role: 'admin' },
    });
    console.log('✓ Admin:', adminEmail);

    // ── Settings ──────────────────────────────────────────────────────────────
    const settings = [
      { key: 'school_name',     value: 'مجموعة مدارس محمد المخطار' },
      { key: 'director',        value: 'عبد العزيز علال' },
      { key: 'phone',           value: '0662190618' },
      { key: 'email',           value: 'contact@mokhtar-school.ma' },
      { key: 'address',         value: 'المديرية الإقليمية فجيج — جهة الشرق، المملكة المغربية' },
      { key: 'lat',             value: '32.551572' },
      { key: 'lng',             value: '-1.952622' },
      { key: 'facebook',        value: '' },
      { key: 'whatsapp',        value: '212662190618' },
      { key: 'welcome_message', value: 'أهلاً وسهلاً بكم في الموقع الرسمي لمجموعة مدارس محمد المخطار.' },
      { key: 'about_text',      value: 'مجموعة مدارس محمد المخطار مؤسسة تعليمية عمومية تابعة لوزارة التربية الوطنية.' },
    ];
    for (const s of settings) {
      await prisma.setting.upsert({ where: { key: s.key }, update: {}, create: s });
    }
    console.log('✓ Settings seeded');

    // ── Teachers (skip if already seeded) ────────────────────────────────────
    if ((await prisma.teacher.count()) === 0) {
      await prisma.teacher.createMany({
        data: [
          { fullname: 'عبد العزيز علال',      subject: 'مدير المؤسسة',      isAdminStaff: true,  order: 1 },
          { fullname: 'فاطمة الزهراء البكري', subject: 'اللغة العربية',     isAdminStaff: false, order: 2 },
          { fullname: 'محمد الحسني',          subject: 'الرياضيات',         isAdminStaff: false, order: 3 },
          { fullname: 'خديجة العلوي',         subject: 'الفرنسية',          isAdminStaff: false, order: 4 },
          { fullname: 'يوسف المرابط',         subject: 'التربية الإسلامية', isAdminStaff: false, order: 5 },
          { fullname: 'لطيفة القادري',        subject: 'التربية البدنية',   isAdminStaff: false, order: 6 },
          { fullname: 'عمر بنعلي',            subject: 'التاريخ والجغرافيا',isAdminStaff: false, order: 7 },
          { fullname: 'نجاة الشرقاوي',        subject: 'العلوم',             isAdminStaff: false, order: 8 },
        ],
      });
      console.log('✓ Teachers seeded');
    }

    // ── News ──────────────────────────────────────────────────────────────────
    if ((await prisma.news.count()) === 0) {
      await prisma.news.createMany({
        data: [
          { title: 'انطلاق الموسم الدراسي الجديد', content: 'تُعلن المؤسسة عن انطلاق الموسم الدراسي بأجواء احتفالية.', category: 'إعلان',  publishedAt: new Date('2025-09-04') },
          { title: 'حفل توزيع الجوائز السنوي',      content: 'تكريم التلاميذ المتفوقين في الموسم الدراسي.',            category: 'فعالية', publishedAt: new Date('2025-07-10') },
          { title: 'نتائج الفصل الأول متاحة الآن',  content: 'يمكن الاطلاع على النتائج باستخدام رقم المسار.',          category: 'نتائج',  publishedAt: new Date('2026-01-20') },
        ],
      });
      console.log('✓ News seeded');
    }

    // ── Clubs ─────────────────────────────────────────────────────────────────
    if ((await prisma.club.count()) === 0) {
      await prisma.club.createMany({
        data: [
          { name: 'نادي القراءة والكتابة', description: 'ينمّي حب القراءة والكتابة الإبداعية.', supervisors: 'فاطمة الزهراء البكري', isActive: true, order: 1 },
          { name: 'النادي الرياضي',         description: 'يشجّع على ممارسة الرياضة.',           supervisors: 'لطيفة القادري',        isActive: true, order: 2 },
          { name: 'نادي الفنون التشكيلية', description: 'يُنمّي الإبداع من خلال الرسم.',        supervisors: 'نجاة الشرقاوي',        isActive: true, order: 3 },
        ],
      });
      console.log('✓ Clubs seeded');
    }

    // ── Activities ────────────────────────────────────────────────────────────
    if ((await prisma.activity.count()) === 0) {
      await prisma.activity.createMany({
        data: [
          { title: 'الاحتفال باليوم العالمي للكتاب', description: 'فعالية ثقافية بمشاركة جميع التلاميذ.', category: 'ثقافي',  date: new Date('2025-04-23') },
          { title: 'يوم الرياضة المدرسي',             description: 'يوم مفتوح للرياضة والترفيه.',          category: 'رياضي', date: new Date('2025-05-15') },
        ],
      });
      console.log('✓ Activities seeded');
    }

    // ── Sample students ───────────────────────────────────────────────────────
    if ((await prisma.student.count()) === 0) {
      const grades = JSON.stringify([
        { subject: 'اللغة العربية', grade: 15 },
        { subject: 'الرياضيات',    grade: 14 },
        { subject: 'الفرنسية',     grade: 13 },
      ]);
      const s1 = await prisma.student.create({ data: { massarCode: 'J123456789', fullname: 'أمين بنعلي',    level: 'السنة الخامسة', classroom: '5أ' } });
      const s2 = await prisma.student.create({ data: { massarCode: 'J987654321', fullname: 'سلمى الإدريسي', level: 'السنة السادسة', classroom: '6ب' } });
      await prisma.studentResult.createMany({
        data: [
          { studentId: s1.id, semester: 'الفصل الأول', generalAverage: 14.5, councilDecision: 'منتقل', grades },
          { studentId: s2.id, semester: 'الفصل الأول', generalAverage: 15.2, councilDecision: 'منتقل', grades },
        ],
      });
      console.log('✓ Students seeded');
    }

    // ── Announcement ──────────────────────────────────────────────────────────
    if ((await prisma.announcement.count()) === 0) {
      await prisma.announcement.create({
        data: { title: 'تعليق الدراسة بمناسبة العيد الوطني', content: 'تعليق الدراسة يومي 17 و18 نوفمبر.', isActive: true },
      });
      console.log('✓ Announcements seeded');
    }

    console.log('\n✅ Seed complete!');
    console.log('👤 Login: admin@mokhtar-school.ma / admin123');
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(e => { console.error('Seed error:', e.message); process.exit(1); });
