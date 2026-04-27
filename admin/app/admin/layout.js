'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import Sidebar from '@/components/layout/Sidebar';
import { Menu, Bell, ExternalLink, ShieldCheck } from 'lucide-react';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated, isLoading, init } = useAuthStore();
  const router = useRouter();

  useEffect(() => { init(); }, []);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.push('/login');
  }, [isLoading, isAuthenticated, router]);

  // Premium Loading State
  if (isLoading) {
    return (
      <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-slate-950">
        {/* Animated background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-600/20 blur-[120px] rounded-full animate-pulse" />
        
        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 rounded-full border-slate-800 border-t-red-600 animate-spin" />
            <ShieldCheck className="absolute w-6 h-6 text-red-500 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
          </div>
          <div className="text-center">
            <p className="text-xs font-bold tracking-widest text-white uppercase">ASP Cranes</p>
            <p className="text-slate-500 text-[10px] mt-1 font-medium italic">Securely verifying session...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="flex min-h-screen font-sans bg-slate-950 selection:bg-red-500/30 selection:text-red-200">
      {/* Sidebar - Integrated with the new 280px width */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-[280px] transition-all duration-300">
        
        {/* Modern Topbar */}
        <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-xl border-b border-white/[0.05] h-16 flex items-center justify-between px-4 lg:px-8">
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-red-500/50 transition-all text-slate-300"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Desktop Breadcrumb/Title */}
          <div className="items-center hidden gap-2 lg:flex">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]" />
            <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">
              Admin <span className="mx-1 text-slate-600">/</span> <span className="text-white">CMS Panel</span>
            </p>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <a
              href={process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold transition-all duration-300 border shadow-sm rounded-xl bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 hover:border-red-500/30"
            >
              <ExternalLink className="w-3.5 h-3.5 text-red-500" />
              <span className="hidden sm:inline">Launch Main Site</span>
            </a>

            {/* Notification Bell with Ping */}
            <button className="group p-2.5 relative rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all">
              <Bell className="w-4 h-4 transition-colors text-slate-400 group-hover:text-white" />
              <span className="absolute w-2 h-2 bg-red-500 border-2 rounded-full top-2 right-2 border-slate-900 animate-bounce" />
            </button>
          </div>
        </header>

        {/* Page Content with smooth fade-in */}
        <main className="flex-1 overflow-x-hidden duration-500 animate-in fade-in slide-in-from-top-2">
          <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-8">
            {/* Content wrapper to ensure footer-like padding at bottom */}
            <div className="pb-12">
              {children}
            </div>
          </div>
        </main>

        {/* Subtle Footer */}
        <footer className="px-8 py-4 border-t border-white/[0.02] flex justify-between items-center bg-slate-950/50">
           <p className="text-[10px] text-slate-600 font-medium">© 2026 ASP CRANES • INTERNAL SYSTEMS</p>
           <div className="flex gap-4">
              <div className="w-2 h-2 rounded-full bg-emerald-500/50 animate-pulse" />
           </div>
        </footer>
      </div>
    </div>
  );
}

// 'use client';
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuthStore } from '@/store/authStore';
// import Sidebar from '@/components/layout/Sidebar';
// import { Menu, Bell, ExternalLink } from 'lucide-react';

// export default function AdminLayout({ children }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const { isAuthenticated, isLoading, init } = useAuthStore();
//   const router = useRouter();

//   useEffect(() => { init(); }, []);
//   useEffect(() => {
//     if (!isLoading && !isAuthenticated) router.push('/login');
//   }, [isLoading, isAuthenticated]);

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-slate-950">
//         <div className="flex flex-col items-center gap-4">
//           <div className="w-10 h-10 border-2 border-red-600 rounded-full border-t-transparent animate-spin" />
//           <p className="text-sm text-slate-400">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!isAuthenticated) return null;

//   return (
//     <div className="flex min-h-screen bg-slate-950">
//       <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

//       {/* Main */}
//       <div className="flex-1 flex flex-col min-w-0 lg:ml-[260px]">
//         {/* Topbar */}
//         <header className="sticky top-0 z-20 flex items-center justify-between h-16 px-4 border-b bg-slate-900/95 backdrop-blur border-slate-700/50 lg:px-6">
//           <button
//             onClick={() => setSidebarOpen(true)}
//             className="p-2 lg:hidden btn-ghost"
//           >
//             <Menu className="w-5 h-5 text-slate-300" />
//           </button>

//           <div className="flex-1 hidden lg:block">
//             <p className="text-sm text-slate-400">ASP Cranes CMS</p>
//           </div>

//           <div className="flex items-center gap-2">
//             <a
//               href={process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000'}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="btn-ghost text-xs flex items-center gap-1.5 hidden sm:flex"
//             >
//               <ExternalLink className="w-3.5 h-3.5" />
//               View Site
//             </a>
//             <button className="relative p-2 btn-ghost">
//               <Bell className="w-4 h-4 text-slate-400" />
//             </button>
//           </div>
//         </header>

//         {/* Page Content */}
//         <main className="flex-1 overflow-auto">
//           <div className="px-4 py-6 mx-auto max-w-7xl lg:px-6">
//             {children}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }
