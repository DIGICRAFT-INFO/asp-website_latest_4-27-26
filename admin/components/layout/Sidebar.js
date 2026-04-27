'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import {
  LayoutDashboard, Settings, HelpCircle, ChevronRight, LogOut, Globe,
  Newspaper, Wrench, UserCheck, Building2, Star, FolderOpen, Phone
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Homepage', href: '/admin/homepage', icon: Globe },
  { label: 'About Page', href: '/admin/about', icon: Building2 },
  { label: 'Our Cranes', href: '/admin/cranes', icon: Star },
  { label: 'Services', href: '/admin/services', icon: Wrench },
  { label: 'Projects', href: '/admin/projects', icon: FolderOpen },
  { label: 'Blog Posts', href: '/admin/blogs', icon: Newspaper },
  { label: 'Our Clients', href: '/admin/clients', icon: UserCheck },
  { label: 'FAQs', href: '/admin/faqs', icon: HelpCircle },
  { label: 'Contacts', href: '/admin/contacts', icon: Phone },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (e) {}
    logout();
    toast.success('Logged out');
    router.push('/login');
  };

  return (
    <>
      {/* Modern Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-30 transition-opacity duration-300 bg-slate-950/40 backdrop-blur-md lg:hidden" 
          onClick={onClose} 
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-[280px] bg-black border-r border-white/5 z-40 flex flex-col transition-all duration-500 ease-in-out shadow-2xl ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        
        {/* Modern Logo Section */}
        <div className="relative flex items-center justify-center px-6 py-8">
          <div className="relative w-full transition-transform duration-300 h-14 group hover:scale-105">
            <Image 
              src="/companylogo.jpeg" 
              alt="ASP Cranes Logo" 
              fill
              className="object-contain transition-shadow duration-300 rounded-lg shadow-md group-hover:shadow-lg group-hover:shadow-red-600/30"
              priority
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-2 px-4 space-y-1.5 custom-scrollbar scrollbar-hide">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href));
            
            return (
              <Link 
                key={item.href} 
                href={item.href} 
                onClick={onClose}
                className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 transform active:scale-95 ${
                  active 
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30 active-nav' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform duration-300 group-hover:rotate-12 ${active ? 'text-white' : 'text-slate-500 group-hover:text-red-400'}`} />
                <span className="flex-1 tracking-wide">{item.label}</span>
                {active ? (
                   <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                ) : (
                  <ChevronRight className="w-4 h-4 transition-all duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 text-slate-500" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Profile & Logout */}
        <div className="p-4 mt-auto">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 shadow-sm group hover:bg-white/[0.08] transition-colors duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <div className="flex items-center justify-center w-10 h-10 font-bold text-white shadow-inner bg-gradient-to-tr from-red-600 to-red-400 rounded-xl">
                  {user?.name?.[0]?.toUpperCase() || 'A'}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold tracking-tight text-white truncate">{user?.name || 'Admin User'}</p>
                <p className="text-slate-500 text-[11px] font-medium uppercase tracking-widest leading-none mt-1">{user?.role || 'Super Admin'}</p>
              </div>
            </div>
            
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800 hover:bg-red-600/10 text-slate-300 hover:text-red-400 border border-white/5 hover:border-red-500/30 transition-all duration-300 text-xs font-bold uppercase tracking-tighter"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout Session
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}





// 'use client';
// import Link from 'next/link';
// import { usePathname, useRouter } from 'next/navigation';
// import { useAuthStore } from '@/store/authStore';
// import api from '@/lib/api';
// import toast from 'react-hot-toast';
// import {
//   LayoutDashboard, Settings, FileText, Image, FolderOpen,
//   Users, Phone, HelpCircle, ChevronRight, LogOut, Globe,
//   Newspaper, Wrench, UserCheck, Building2, Star
// } from 'lucide-react';

// const navItems = [
//   { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
//   { label: 'Homepage', href: '/admin/homepage', icon: Globe },
//   { label: 'About Page', href: '/admin/about', icon: Building2 },
//   { label: 'Our Cranes', href: '/admin/cranes', icon: Star },
//   { label: 'Services', href: '/admin/services', icon: Wrench },
//   { label: 'Projects', href: '/admin/projects', icon: FolderOpen },
//   { label: 'Blog Posts', href: '/admin/blogs', icon: Newspaper },
//   { label: 'Our Clients', href: '/admin/clients', icon: UserCheck },
//   { label: 'FAQs', href: '/admin/faqs', icon: HelpCircle },
//   { label: 'Contacts', href: '/admin/contacts', icon: Phone },
//   { label: 'Settings', href: '/admin/settings', icon: Settings },
// ];

// export default function Sidebar({ isOpen, onClose }) {
//   const pathname = usePathname();
//   const router = useRouter();
//   const { user, logout } = useAuthStore();

//   const handleLogout = async () => {
//     try {
//       await api.post('/auth/logout');
//     } catch (e) {}
//     logout();
//     toast.success('Logged out');
//     router.push('/login');
//   };

//   return (
//     <>
//       {/* Mobile overlay */}
//       {isOpen && (
//         <div className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={onClose} />
//       )}

//       {/* Sidebar */}
//       <aside className={`fixed top-0 left-0 h-full w-[260px] bg-slate-900 border-r border-slate-700/50 z-40 flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
//         {/* Logo */}
//         <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-700/50">
//           <div className="flex items-center justify-center flex-shrink-0 bg-red-600 rounded-lg w-9 h-9">
//             <svg width="20" height="20" viewBox="0 0 32 32" fill="white">
//               <path d="M16 2 L16 8" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
//               <rect x="4" y="8" width="24" height="2" rx="1" fill="white"/>
//               <path d="M16 10 L16 28" stroke="white" strokeWidth="2.5"/>
//               <path d="M8 28 L24 28" stroke="white" strokeWidth="2" strokeLinecap="round"/>
//             </svg>
//           </div>
//           <div>
//             <p className="text-sm font-bold leading-tight text-white">ASP Cranes</p>
//             <p className="text-slate-400 text-[10px]">Admin Panel</p>
//           </div>
//         </div>

//         {/* Nav */}
//         <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
//           {navItems.map(item => {
//             const Icon = item.icon;
//             const active = pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href));
//             return (
//               <Link key={item.href} href={item.href} onClick={onClose}
//                 className={`sidebar-link ${active ? 'active' : ''}`}>
//                 <Icon className="flex-shrink-0 w-4 h-4" />
//                 <span className="flex-1">{item.label}</span>
//                 {active && <ChevronRight className="w-3.5 h-3.5 text-red-400" />}
//               </Link>
//             );
//           })}
//         </nav>

//         {/* User + Logout */}
//         <div className="p-3 border-t border-slate-700/50">
//           <div className="flex items-center gap-3 px-3 py-2 mb-1">
//             <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 text-xs font-bold text-white rounded-full bg-gradient-to-br from-red-500 to-red-700">
//               {user?.name?.[0]?.toUpperCase() || 'A'}
//             </div>
//             <div className="flex-1 min-w-0">
//               <p className="text-xs font-semibold text-white truncate">{user?.name || 'Admin'}</p>
//               <p className="text-slate-500 text-[10px] truncate capitalize">{user?.role}</p>
//             </div>
//           </div>
//           <button onClick={handleLogout} className="w-full text-red-400 sidebar-link hover:text-red-300 hover:bg-red-900/20">
//             <LogOut className="w-4 h-4" />
//             <span>Logout</span>
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// }
