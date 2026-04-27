import { Barlow } from 'next/font/google';
import './globals.css';
import Navbar from '@/layout/Navbar';
import Footer from '@/layout/Footer';
import { getSettings } from '@/lib/api';
import { Toaster } from 'react-hot-toast';

const barlow = Barlow({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-barlow',
  display: 'swap',
});

export async function generateMetadata() {
  try {
    const res = await getSettings();
    const s = res?.data;
    return {
      title: s?.seo?.metaTitle || 'ASP Cranes - Professional Crane Rental Services in India',
      description: s?.seo?.metaDescription || 'ASP Cranes provides professional crane rental, heavy lifting, and aerial access services across India.',
      keywords: s?.seo?.keywords?.join(', ') || 'crane rental india, tower crane, crawler crane',
    };
  } catch {
    return {
      title: 'ASP Cranes - Professional Crane Rental Services',
      description: 'Professional crane rental services across India.',
    };
  }
}

export default async function RootLayout({ children }) {
  let settings = null;
  try {
    const res = await getSettings();
    settings = res?.data;
  } catch {}

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${barlow.variable} font-sans antialiased`} suppressHydrationWarning>
        <Navbar settings={settings} />
        {children}
        <Footer settings={settings} />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: { background: '#1e293b', color: '#f1f5f9', borderRadius: '8px' },
          }}
        />
      </body>
    </html>
  );
}
