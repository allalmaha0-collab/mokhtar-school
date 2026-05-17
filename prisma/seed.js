const { PrismaClient } = require('@prisma/client');
const { PrismaLibSql } = require('@prisma/adapter-libsql');
const bcrypt = require('bcryptjs');
const path = require('path');

const dbPath = path.resolve(__dirname, 'school.db');
const adapter = new PrismaLibSql({ url: 'file:' + dbPath });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Admin user
  const hash = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@mokhtar-school.ma' },
    update: {},
    create: { email: 'admin@mokhtar-school.ma', passwordHash: hash, name: 'عبد العزيز علال', role: 'admin' },
  });

  // Settings
  const settings = [
    { key: 'school_name',    value: 'مجموعة مدارس محمد المخطار' },
    { key: 'director',       value: 'عبد العزيز علال' },
    { key: 'phone',          value: '0662190618' },
    { key: 'email',          value: 'contact@mokhtar-school.ma' },
    { key: 'address',        value: 'المديرية الإقليمية فجيج — جهة الشرق، المملكة المغربية' },
    { key: 'lat',            value: '32.551572' },
    { key: 'lng',            value: '-1.952622' },
    { key: 'facebook',       value: '' },
    { key: 'whatsapp',       value: '212662190618' },
    { key: 'welcome_message',value: 'أهلاً وسهلاً بكم في الموقع الرسمي لمجموعة مدارس محمد المخطار. نسعى إلى تقديم تعليم جيد وبيئة آمنة لكل تلاميذنا.' },
    { key: 'about_text',     value: 'مجموعة مدارس محمد المخطار مؤسسة تعليمية عمومية تابعة لوزارة التربية الوطنية والتعليم الأولي والرياضة، تقع في نطاق المديرية الإقليمية فجيج التابعة للأكاديمية الجهوية للتربية والتكوين لجهة الشرق.' },
  ];
  for (const s of settings) {
    await prisma.setting.upsert({ where: { key: s.key }, update: { value: s.value }, create: s });
  }

  // News
  const newsItems = [
    { title: 'انطلاق الموسم الدراسي الجديد', content: 'تُعلن مجموعة مدارس محمد المخطار عن انطلاق الموسم الدراسي الجديد بأجواء احتفالية مميزة، مع استقبال التلاميذ الجدد وتهيئة الفصول الدراسية.', category: 'إعلان', publishedAt: new Date('2025-09-04') },
    { title: 'حفل توزيع الجوائز السنوي', content: 'نظّمت المؤسسة حفل توزيع الجوائز السنوي تكريماً للتلاميذ المتفوقين في الموسم الدراسي، في جو من الفرحة والحماس.', category: 'فعالية', publishedAt: new Date('2025-07-10') },
    { title: 'الأسبوع التربوي للقراءة', content: 'احتضنت المؤسسة الأسبوع التربوي للقراءة بمشاركة واسعة من التلاميذ والأساتذة، مع تنظيم أنشطة ثقافية متنوعة.', category: 'ثقافي', publishedAt: new Date('2025-11-15') },
    { title: 'نتائج الفصل الأول متاحة الآن', content: 'أُعلنت نتائج الفصل الدراسي الأول على الموقع الرسمي للمؤسسة. يمكن للتلاميذ الاطلاع على نتائجهم باستخدام رقم المسار.', category: 'نتائج', publishedAt: new Date('2026-01-20') },
    { title: 'رحلة تربوية إلى مدينة وجدة', content: 'نظّمت المؤسسة رحلة تربوية إلى مدينة وجدة للتعريف بالموروث الثقافي والحضاري للمنطقة الشرقية.', category: 'نشاط', publishedAt: new Date('2025-12-05') },
  ];
  for (const n of newsItems) {
    await prisma.news.create({ data: n });
  }

  // Teachers
  const teachers = [
    { fullname: 'عبد العزيز علال', subject: 'مدير المؤسسة', isAdminStaff: true, order: 1 },
    { fullname: 'فاطمة الزهراء البكري', subject: 'اللغة العربية', order: 2 },
    { fullname: 'محمد الحسني', subject: 'الرياضيات', order: 3 },
    { fullname: 'خديجة العلوي', subject: 'الفرنسية', order: 4 },
    { fullname: 'يوسف المرابط', subject: 'التربية الإسلامية', order: 5 },
    { fullname: 'لطيفة القادري', subject: 'التربية البدنية', order: 6 },
    { fullname: 'عمر بنعلي', subject: 'التاريخ والجغرافيا', order: 7 },
    { fullname: 'نجاة الشرقاوي', subject: 'العلوم', order: 8 },
    { fullname: 'رشيد الإدريسي', subject: 'مساعد اجتماعي', isAdminStaff: true, order: 9 },
  ];
  for (const t of teachers) {
    await prisma.teacher.create({ data: t });
  }

  // Clubs
  const clubs = [
    { name: 'نادي القراءة والكتابة', description: 'ينمّي حب القراءة والكتابة الإبداعية لدى التلاميذ من خلال ورشات أسبوعية.', supervisors: 'فاطمة الزهراء البكري', isActive: true, order: 1 },
    { name: 'النادي الرياضي', description: 'يشجّع على ممارسة الرياضة وتنمية روح التحدي والتعاون.', supervisors: 'لطيفة القادري', isActive: true, order: 2 },
    { name: 'نادي الفنون التشكيلية', description: 'يكتشف المواهب الفنية ويُنمّي الإبداع من خلال الرسم والتشكيل.', supervisors: 'نجاة الشرقاوي', isActive: true, order: 3 },
    { name: 'نادي المسرح والفن', description: 'ينمّي مهارات التعبير والإلقاء والتمثيل لدى التلاميذ.', supervisors: 'خديجة العلوي', isActive: true, order: 4 },
    { name: 'نادي العلوم والاكتشاف', description: 'يُشجّع على التفكير العلمي وإجراء التجارب البسيطة.', supervisors: 'نجاة الشرقاوي', isActive: true, order: 5 },
  ];
  for (const c of clubs) {
    await prisma.club.create({ data: c });
  }

  // Activities
  const activities = [
    { title: 'الاحتفال باليوم العالمي للكتاب', description: 'فعالية ثقافية بمناسبة اليوم العالمي للكتاب شارك فيها جميع تلاميذ المؤسسة.', category: 'ثقافي', date: new Date('2025-04-23') },
    { title: 'مسابقة الخط العربي', description: 'مسابقة في الخط العربي لاكتشاف المواهب وتنمية الهوية الثقافية.', category: 'مسابقة', date: new Date('2025-03-10') },
    { title: 'الحفل الختامي للموسم الدراسي', description: 'حفل ختامي بهيج تخلله توزيع الجوائز وعروض فنية متنوعة.', category: 'احتفال', date: new Date('2025-06-28') },
    { title: 'يوم الرياضة المدرسي', description: 'يوم مفتوح للرياضة والترفيه شارك فيه كل تلاميذ المؤسسة.', category: 'رياضي', date: new Date('2025-05-15') },
  ];
  for (const a of activities) {
    await prisma.activity.create({ data: a });
  }

  // Students (sample for testing)
  const students = [
    { massarCode: 'J123456789', fullname: 'أمين بنعلي', level: 'السنة الخامسة', classroom: '5أ' },
    { massarCode: 'J987654321', fullname: 'سلمى الإدريسي', level: 'السنة السادسة', classroom: '6ب' },
    { massarCode: 'J111222333', fullname: 'كريم المرابط', level: 'السنة الرابعة', classroom: '4أ' },
  ];
  for (const s of students) {
    const student = await prisma.student.create({ data: s });
    await prisma.studentResult.create({
      data: {
        studentId: student.id,
        semester: 'الفصل الأول',
        generalAverage: 14.5,
        councilDecision: 'منتقل',
        grades: JSON.stringify([
          { subject: 'اللغة العربية', grade: 15 },
          { subject: 'الرياضيات', grade: 14 },
          { subject: 'الفرنسية', grade: 13 },
          { subject: 'التربية الإسلامية', grade: 16 },
          { subject: 'التاريخ والجغرافيا', grade: 14 },
          { subject: 'العلوم', grade: 15 },
        ]),
      },
    });
  }

  // Announcements
  await prisma.announcement.create({
    data: { title: 'تعليق الدراسة بمناسبة العيد الوطني', content: 'يُعلم ولياء التلاميذ بتعليق الدراسة يومي 17 و18 نوفمبر بمناسبة عيد الاستقلال المجيد.', isActive: true },
  });

  // Boarding
  await prisma.boardingPost.create({
    data: { title: 'افتتاح الداخلية للموسم الجديد', content: 'تُعلن الداخلية عن فتح باب التسجيل للموسم الدراسي الجديد مع توفير كافة الظروف الملائمة للتلاميذ الداخليين.', category: 'إعلان' },
  });

  // Social
  await prisma.socialPost.create({
    data: { title: 'حملة توعوية حول الوقاية من الإدمان', content: 'نظّم المختص الاجتماعي للمؤسسة حملة توعوية حول مخاطر الإدمان وكيفية الوقاية منه، موجهة لتلاميذ السنة الخامسة والسادسة.', category: 'توعية' },
  });

  console.log('✅ Database seeded successfully!');
  console.log('👤 Admin: admin@mokhtar-school.ma / admin123');
  console.log('📚 Sample massar codes: J123456789, J987654321, J111222333');
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
