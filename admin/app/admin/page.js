// app/admin/dashboard/page.js
'use client';
import { useAuthStore } from '@/store/authStore';
import { Activity, Truck, FileText, Users, ArrowUpRight, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user } = useAuthStore();

  const stats = [
    { title: 'Total Cranes', value: '24', icon: Truck, color: 'text-red-500', bg: 'bg-red-500/10', trend: '+2 this month' },
    { title: 'Active Projects', value: '12', icon: Activity, color: 'text-emerald-500', bg: 'bg-emerald-500/10', trend: 'On schedule' },
    { title: 'Blog Posts', value: '48', icon: FileText, color: 'text-blue-500', bg: 'bg-blue-500/10', trend: '5 new drafts' },
    { title: 'Inquiries', value: '156', icon: Users, color: 'text-amber-500', bg: 'bg-amber-500/10', trend: '+12% increase' },
  ];

  return (
    <div className="p-4 space-y-8 duration-700 md:p-8 animate-in fade-in slide-in-from-bottom-4">
      
      {/* Header Section */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">
            Dashboard Overview
          </h1>
          <p className="flex items-center gap-2 mt-1 text-sm text-slate-400 md:text-base">
            Welcome back, <span className="font-semibold text-red-400">{user?.name || 'Admin'}</span>
            <span className="hidden md:inline">|</span>
            <span className="text-xs text-slate-500 md:text-sm">Everything looks good today.</span>
          </p>
        </div>
        
        <div className="flex gap-2">
          <div className="flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-widest uppercase border rounded-lg bg-slate-900 border-slate-800 text-slate-300">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            System Live
          </div>
        </div>
      </div>

      {/* Stats Grid - Responsive 1 to 4 columns */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
        {stats.map((stat, i) => (
          <div 
            key={i} 
            className="relative p-5 transition-all duration-300 border shadow-xl group bg-slate-900/40 backdrop-blur-md border-white/5 rounded-2xl md:p-6 hover:bg-slate-800/60 hover:border-red-500/30 hover:-translate-y-1"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <p className="text-xs font-bold tracking-wider uppercase text-slate-500">{stat.title}</p>
                <h3 className="text-3xl font-black text-white transition-colors group-hover:text-red-500">
                  {stat.value}
                </h3>
                <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400">
                  <TrendingUp className="w-3 h-3 text-emerald-500" />
                  {stat.trend}
                </div>
              </div>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:rotate-[10deg] group-hover:scale-110 ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
            {/* Subtle bottom glow effect on hover */}
            <div className="absolute inset-x-0 bottom-0 h-1 transition-opacity opacity-0 bg-gradient-to-r from-transparent via-red-500/20 to-transparent group-hover:opacity-100 rounded-b-2xl" />
          </div>
        ))}
      </div>

      {/* Quick Links Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Quick Actions Container */}
        <div className="p-6 border lg:col-span-2 bg-slate-900/40 backdrop-blur-md border-white/5 rounded-3xl md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="flex items-center gap-2 text-xl font-bold text-white">
              Management Portal
            </h2>
            <span className="font-mono text-xs text-slate-500">v2.0.4</span>
          </div>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { label: 'Manage Crane Fleet', href: '/admin/cranes', desc: 'Update inventory & details' },
              { label: 'Review Messages', href: '/admin/contacts', desc: 'Check client inquiries' },
              { label: 'New Blog Post', href: '/admin/blogs', desc: 'Publish latest news' },
              { label: 'Site Settings', href: '/admin/settings', desc: 'Configuration & SEO' },
            ].map((item, idx) => (
              <Link 
                href={item.href} 
                key={idx} 
                className="group flex items-center justify-between p-5 rounded-2xl bg-white/[0.03] hover:bg-red-600/10 border border-white/5 hover:border-red-500/40 transition-all duration-300"
              >
                <div className="min-w-0">
                  <p className="font-bold transition-colors text-slate-200 group-hover:text-white">{item.label}</p>
                  <p className="mt-1 text-xs truncate text-slate-500 group-hover:text-slate-400">{item.desc}</p>
                </div>
                <div className="flex items-center justify-center w-10 h-10 transition-all rounded-full bg-slate-800 group-hover:bg-red-600">
                  <ArrowUpRight className="w-5 h-5 transition-all text-slate-400 group-hover:text-white group-hover:rotate-45" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Info Card / Sidebar Box */}
        <div className="relative flex flex-col justify-between p-8 overflow-hidden text-white bg-gradient-to-br from-red-600 to-red-900 rounded-3xl group">
          <div className="relative z-10">
            <h3 className="mb-2 text-2xl font-black leading-tight">Fastest Fleet <br/>Management.</h3>
            <p className="text-sm text-red-100 opacity-80">
              Your ASP Cranes dashboard is optimized for mobile performance.
            </p>
          </div>
          
          <div className="relative z-10 mt-8">
             <button className="px-6 py-3 text-sm font-bold text-red-600 transition-colors bg-white shadow-lg rounded-xl hover:bg-slate-100">
               View Analytics
             </button>
          </div>

          {/* Decorative background circle */}
          <div className="absolute w-40 h-40 transition-transform duration-700 rounded-full -bottom-10 -right-10 bg-white/10 blur-3xl group-hover:scale-150" />
        </div>
      </div>
    </div>
  );
}


// // app/admin/dashboard/page.js
// 'use client';
// import { useAuthStore } from '@/store/authStore';
// import { Activity, Truck, FileText, Users, ArrowUpRight } from 'lucide-react';
// import Link from 'next/link';

// export default function DashboardPage() {
//   const { user } = useAuthStore();

//   // Mock data for the initial UI layout (Crane replaced with Truck icon)
//   const stats = [
//     { title: 'Total Cranes', value: '24', icon: Truck, color: 'text-blue-500', bg: 'bg-blue-500/10' },
//     { title: 'Active Projects', value: '12', icon: Activity, color: 'text-green-500', bg: 'bg-green-500/10' },
//     { title: 'Blog Posts', value: '48', icon: FileText, color: 'text-purple-500', bg: 'bg-purple-500/10' },
//     { title: 'Client Inquiries', value: '156', icon: Users, color: 'text-orange-500', bg: 'bg-orange-500/10' },
//   ];

//   return (
//     <div className="space-y-8 animate-fade-in">
//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
//         <p className="mt-1 text-slate-400">
//           Welcome back, <span className="font-medium text-white">{user?.name || 'Admin'}</span>. Here is what's happening today.
//         </p>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
//         {stats.map((stat, i) => (
//           <div 
//             key={i} 
//             className="p-6 transition-all border bg-slate-900/50 backdrop-blur-sm border-slate-800 rounded-2xl hover:border-slate-700"
//           >
//             <div className="flex items-start justify-between">
//               <div>
//                 <p className="mb-2 text-sm font-medium text-slate-400">{stat.title}</p>
//                 <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
//               </div>
//               <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
//                 <stat.icon className={`w-6 h-6 ${stat.color}`} />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Quick Links / Actions */}
//       <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
//         <div className="p-6 border bg-slate-900/50 backdrop-blur-sm border-slate-800 rounded-2xl">
//           <h2 className="mb-4 text-lg font-semibold text-white">Quick Actions</h2>
//           <div className="space-y-3">
//             {[
//               { label: 'Manage Crane Fleet', href: '/admin/cranes' },
//               { label: 'Review Contact Messages', href: '/admin/contacts' },
//               { label: 'Add New Blog Post', href: '/admin/blogs' },
//               { label: 'Update Site Settings', href: '/admin/settings' },
//             ].map((item, idx) => (
//               <Link 
//                 href={item.href} 
//                 key={idx} 
//                 className="flex items-center justify-between w-full p-4 transition-colors border border-transparent rounded-xl bg-slate-800/50 hover:bg-slate-700/50 hover:border-slate-700 group text-slate-300 hover:text-white"
//               >
//                 <span className="font-medium">{item.label}</span>
//                 <ArrowUpRight className="w-5 h-5 transition-colors text-slate-500 group-hover:text-red-500" />
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }