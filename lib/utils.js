export function gradeLabel(mark) {
  const m = parseFloat(mark);
  if (m >= 18) return { label: 'ممتاز',   color: 'bg-green-100 text-green-800' };
  if (m >= 15) return { label: 'جيد جداً', color: 'bg-blue-100 text-blue-800' };
  if (m >= 12) return { label: 'جيد',      color: 'bg-yellow-100 text-yellow-800' };
  if (m >= 10) return { label: 'مقبول',    color: 'bg-orange-100 text-orange-800' };
  return           { label: 'ضعيف',       color: 'bg-red-100 text-red-800' };
}

export function formatDate(d) {
  if (!d) return '-';
  return new Date(d).toLocaleDateString('ar-MA', { year:'numeric', month:'long', day:'numeric' });
}

export function classLabel(level) {
  const map = {
    '1': 'المستوى الأول', '2': 'المستوى الثاني', '3': 'المستوى الثالث',
    '4': 'المستوى الرابع','5': 'المستوى الخامس','6': 'المستوى السادس',
  };
  return map[level] || level;
}

// Parse Massar Excel row into student object
export function parseMassarRow(row) {
  return {
    massar_code: String(row['رقم مسار'] || row['رقم التسجيل في مسار'] || row[0] || '').trim(),
    fullname:    [row['الاسم العائلي'] || row[1] || '', row['الاسم الشخصي'] || row[2] || '', row['اسم الأب'] || row[3] || ''].filter(Boolean).join(' ').trim(),
    gender:      String(row['الجنس'] || row[4] || '').trim(),
    birth_date:  row['تاريخ الازدياد'] || row[5] || null,
    level:       String(row['المستوى'] || row[6] || '').trim(),
    classroom:   String(row['الفصل'] || row['القسم'] || row[7] || '').trim(),
    father_name: String(row['اسم الأب'] || row[3] || '').trim(),
  };
}
