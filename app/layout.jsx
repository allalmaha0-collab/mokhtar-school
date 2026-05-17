import './globals.css';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: { default: 'مجموعة مدارس محمد المختار', template: '%s | مجموعة مدارس محمد المختار' },
  description: 'الموقع الرسمي لمجموعة مدارس محمد المختار - وزارة التربية الوطنية والتعليم الأولي والرياضة',
  keywords: ['مدرسة', 'محمد المختار', 'ابتدائي', 'المغرب', 'التعليم'],
  openGraph: {
    title: 'مجموعة مدارس محمد المختار',
    description: 'الموقع الرسمي لمجموعة مدارس محمد المختار',
    locale: 'ar_MA',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-cairo">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: { fontFamily: 'Cairo, sans-serif', direction: 'rtl' },
              success: { iconTheme: { primary: '#27ae60', secondary: '#fff' } },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
