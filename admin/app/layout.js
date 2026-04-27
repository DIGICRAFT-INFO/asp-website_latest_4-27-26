import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';

// Optimized font loading with swap display for better performance
const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap', 
});

export const metadata = {
  title: 'ASP Cranes | Admin CMS',
  description: 'Advanced Content Management System for ASP Cranes',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={`${inter.variable} font-sans antialiased bg-slate-950 text-slate-200 selection:bg-red-500/30 selection:text-red-200`} 
        suppressHydrationWarning
      >
        {/* Main Content Area */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* Modern Toast Configuration */}
        <Toaster
          position="top-right"
          gutter={12}
          toastOptions={{
            duration: 4000,
            style: { 
              background: 'rgba(15, 23, 42, 0.9)', 
              color: '#f1f5f9', 
              borderRadius: '12px', 
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              fontSize: '14px',
              padding: '12px 16px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.4)',
            },
            success: { 
              iconTheme: { primary: '#ef4444', secondary: '#fff' } // Matching the Red theme of ASP Cranes
            },
            error: { 
              iconTheme: { primary: '#ef4444', secondary: '#fff' } 
            },
          }}
        />
      </body>
    </html>
  );
}

// import { Inter } from 'next/font/google';
// import './globals.css';
// import { Toaster } from 'react-hot-toast';

// const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// export const metadata = {
//   title: 'ASP Cranes - Admin CMS',
//   description: 'Content Management System for ASP Cranes website',
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
//         {children}
//         <Toaster
//           position="top-right"
//           toastOptions={{
//             duration: 4000,
//             style: { background: '#1e293b', color: '#f1f5f9', borderRadius: '8px', border: '1px solid #334155' },
//             success: { iconTheme: { primary: '#22c55e', secondary: '#1e293b' } },
//             error: { iconTheme: { primary: '#ef4444', secondary: '#1e293b' } },
//           }}
//         />
//       </body>
//     </html>
//   );
// }
