'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { Eye, EyeOff, Lock, Mail, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setAuth, isAuthenticated, init } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    if (isAuthenticated) router.push('/admin/dashboard');
  }, [isAuthenticated, router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error('Please fill all fields');
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      const { accessToken, refreshToken, user } = res.data.data;
      setAuth({ user, accessToken, refreshToken });
      toast.success(`Welcome back, ${user.name}!`);
      router.push('/admin/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen p-4 overflow-hidden font-sans bg-slate-950 selection:bg-red-500/30">
      
      {/* BACKGROUND DECORATION */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-800/15 rounded-full blur-[80px]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03]" />
      </div>

      <div className="relative z-10 w-full max-w-md transition-all duration-500 animate-fade-in">
        
        {/* LOGO SECTION */}
        <div className="mb-10 text-center">
          <div className="relative inline-flex items-center justify-center w-24 h-24 mb-6 transition-transform border shadow-2xl bg-slate-900 border-slate-700 rounded-3xl shadow-slate-950/30 group hover:scale-105">
            <Image 
              src="/companylogo.jpeg" 
              alt="ASP Cranes Logo" 
              width={85} 
              height={85}
              className="object-contain rounded-2xl" 
              priority
            />
          </div>
          <h1 className="text-3xl font-black leading-tight tracking-tight text-white">
            ASP <span className="text-red-500">Cranes</span>
          </h1>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] mt-1.5">
            Admin CMS Panel
          </p>
        </div>

        {/* LOGIN CARD */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-white/[0.05] rounded-[28px] p-8 shadow-2xl relative">
          
          <div className="absolute -inset-px rounded-[28px] bg-gradient-to-br from-red-600/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-white">Sign In</h2>

          <form onSubmit={handleLogin} className="relative z-10 space-y-6">
            <div>
              <label className="block mb-2 text-xs font-semibold tracking-wide uppercase text-slate-400">Email Address</label>
              <div className="relative group">
                <Mail className="absolute w-5 h-5 transition-colors -translate-y-1/2 left-4 top-1/2 text-slate-600 group-focus-within:text-red-500" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@aspcranes.com"
                  className="w-full px-4 pl-12 text-sm text-white transition-all border outline-none h-13 rounded-xl bg-slate-800 border-slate-700/50 placeholder:text-slate-600 focus:ring-2 focus:ring-red-500/50 focus:border-red-600"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-xs font-semibold tracking-wide uppercase text-slate-400">Password</label>
              <div className="relative group">
                <Lock className="absolute w-5 h-5 transition-colors -translate-y-1/2 left-4 top-1/2 text-slate-600 group-focus-within:text-red-500" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 pl-12 pr-12 text-sm text-white transition-all border outline-none h-13 rounded-xl bg-slate-800 border-slate-700/50 placeholder:text-slate-600 focus:ring-2 focus:ring-red-500/50 focus:border-red-600"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute transition-colors -translate-y-1/2 right-4 top-1/2 text-slate-600 hover:text-white"
                >
                  {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="w-full flex items-center justify-center gap-2 h-13 rounded-xl bg-red-600 text-white font-bold text-sm uppercase tracking-widest shadow-lg shadow-red-600/20 hover:bg-red-700 hover:shadow-red-700/40 transform active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Verifying...</> : 'Launch Dashboard'}
            </button>
          </form>

          {/* UPDATED CREDENTIALS BOX */}
          <div className="mt-8 p-5 bg-slate-800/40 rounded-2xl border border-white/[0.03] text-center">
            <p className="text-[10px] text-slate-500 mb-3 font-bold uppercase tracking-[0.2em]">System Credentials</p>
            <div className="space-y-2 font-mono text-[11px]">
              <div className="flex flex-col gap-1">
                <span className="text-slate-500 text-[9px] uppercase">Super Admin</span>
                <p className="px-3 py-1.5 rounded-lg text-slate-300 bg-slate-950/60 border border-white/[0.03]">
                  superadmin@aspcranes.com
                </p>
              </div>
              <div className="flex flex-col gap-1 mt-2">
                <span className="text-slate-500 text-[9px] uppercase">Standard Admin</span>
                <p className="px-3 py-1.5 rounded-lg text-slate-300 bg-slate-950/60 border border-white/[0.03]">
                  admin@aspcranes.com
                </p>
              </div>
              <p className="mt-2 font-bold text-red-500/80">Pass: Admin@123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 'use client';
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuthStore } from '@/store/authStore';
// import api from '@/lib/api';
// import toast from 'react-hot-toast';
// import { Eye, EyeOff, Lock, Mail, Loader2 } from 'lucide-react';

// export default function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPass, setShowPass] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const { setAuth, isAuthenticated, init } = useAuthStore();
//   const router = useRouter();

//   useEffect(() => {
//     init();
//   }, []);

//   useEffect(() => {
//     if (isAuthenticated) router.push('/admin/dashboard');
//   }, [isAuthenticated]);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (!email || !password) return toast.error('Please fill all fields');
//     setLoading(true);
//     try {
//       const res = await api.post('/auth/login', { email, password });
//       const { accessToken, refreshToken, user } = res.data.data;
//       setAuth({ user, accessToken, refreshToken });
//       toast.success(`Welcome back, ${user.name}!`);
//       router.push('/admin/dashboard');
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Login failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
//       {/* Background decoration */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute rounded-full top-1/4 left-1/4 w-96 h-96 bg-red-600/5 blur-3xl" />
//         <div className="absolute w-64 h-64 rounded-full bottom-1/4 right-1/4 bg-red-600/10 blur-3xl" />
//       </div>

//       <div className="relative z-10 w-full max-w-md animate-fade-in">
//         {/* Logo */}
//         <div className="mb-8 text-center">
//           <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-red-600 shadow-lg rounded-2xl shadow-red-600/20">
//             <svg width="32" height="32" viewBox="0 0 32 32" fill="white">
//               <path d="M16 2 L16 8 M16 2 L10 8 M16 2 L22 8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
//               <rect x="4" y="8" width="24" height="2" rx="1" fill="white"/>
//               <path d="M16 10 L16 28" stroke="white" strokeWidth="2"/>
//               <path d="M8 28 L24 28" stroke="white" strokeWidth="2" strokeLinecap="round"/>
//             </svg>
//           </div>
//           <h1 className="text-2xl font-bold text-white">ASP Cranes</h1>
//           <p className="mt-1 text-sm text-slate-400">Admin Content Management System</p>
//         </div>

//         {/* Login Card */}
//         <div className="p-8 border shadow-2xl bg-slate-800/80 backdrop-blur-sm border-slate-700/50 rounded-2xl">
//           <h2 className="mb-6 text-xl font-semibold text-white">Sign In</h2>

//           <form onSubmit={handleLogin} className="space-y-5">
//             <div>
//               <label className="admin-label">Email Address</label>
//               <div className="relative">
//                 <Mail className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-slate-500" />
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={e => setEmail(e.target.value)}
//                   placeholder="admin@aspcranes.com"
//                   className="pl-10 admin-input"
//                   required
//                   autoComplete="email"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="admin-label">Password</label>
//               <div className="relative">
//                 <Lock className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-slate-500" />
//                 <input
//                   type={showPass ? 'text' : 'password'}
//                   value={password}
//                   onChange={e => setPassword(e.target.value)}
//                   placeholder="••••••••"
//                   className="pl-10 pr-10 admin-input"
//                   required
//                   autoComplete="current-password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPass(!showPass)}
//                   className="absolute -translate-y-1/2 right-3 top-1/2 text-slate-500 hover:text-slate-300"
//                 >
//                   {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                 </button>
//               </div>
//             </div>

//             <button type="submit" disabled={loading} className="justify-center w-full py-3 mt-2 btn-primary">
//               {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Signing in...</> : 'Sign In'}
//             </button>
//           </form>

//           <div className="p-4 mt-6 border rounded-lg bg-slate-900/60 border-slate-700/40">
//             <p className="mb-2 text-xs font-medium text-slate-500">Default Credentials:</p>
//             <p className="text-xs text-slate-400">superadmin@aspcranes.com / Admin@123</p>
//             <p className="text-xs text-slate-400">admin@aspcranes.com / Admin@123</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
