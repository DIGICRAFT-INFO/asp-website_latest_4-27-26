'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Search } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Our Cranes', href: '/our-cranes' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  const navBg = isHome
    ? scrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur shadow-sm'
    : 'bg-white shadow-md';

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/blog?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50  transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 lg:h-[70px]">

          {/* ✅ LOGO FIXED */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <img
              src="/companylogo.jpeg"
              alt="ASP Cranes"
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-sm font-semibold transition-colors rounded-md ${
                  pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                    ? 'text-red-600'
                    : 'text-gray-800 hover:text-red-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">

            {/* Search */}
            <div className="relative hidden sm:block">
              {searchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    autoFocus
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="border border-gray-300 rounded-l-md px-3 py-1.5 text-sm w-44 outline-none focus:border-red-500"
                  />
                  <button type="submit" className="bg-red-600 text-white px-3 py-1.5 rounded-r-md">
                    <Search className="w-4 h-4" />
                  </button>
                  <button type="button" onClick={() => setSearchOpen(false)} className="ml-1 text-gray-500">
                    <X className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <button onClick={() => setSearchOpen(true)} className="p-2 text-gray-600 hover:text-red-600">
                  <Search className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* CTA */}
            <Link href="/contact" className="hidden sm:flex items-center bg-red-600 text-white text-sm font-semibold px-5 py-2.5 rounded-md hover:bg-red-700">
              Request a Quote
            </Link>

            {/* Mobile menu */}
            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-gray-700">
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 rounded-lg text-sm font-semibold ${
                  pathname === link.href ? 'bg-red-50 text-red-600' : 'text-gray-700'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Link href="/contact" className="block mt-2 text-center bg-red-600 text-white font-semibold py-3 rounded-lg">
              Request a Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

// 'use client';
// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { Menu, X, Search, ChevronDown } from 'lucide-react';

// const NAV_LINKS = [
//   { label: 'Home', href: '/' },
//   { label: 'About Us', href: '/about' },
//   { label: 'Our Cranes', href: '/our-cranes' },
//   { label: 'Services', href: '/services' },
//   { label: 'Projects', href: '/projects' },
//   { label: 'Blog', href: '/blog' },
// ];

// export default function Navbar({ settings }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const pathname = usePathname();
//   const isHome = pathname === '/';

//   useEffect(() => {
//     const handler = () => setScrolled(window.scrollY > 50);
//     window.addEventListener('scroll', handler);
//     return () => window.removeEventListener('scroll', handler);
//   }, []);

//   useEffect(() => { setIsOpen(false); }, [pathname]);

//   const navBg = isHome
//     ? scrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur shadow-sm'
//     : 'bg-white shadow-md';

//   const textColor = 'text-gray-800';

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       window.location.href = `/blog?search=${encodeURIComponent(searchQuery)}`;
//     }
//   };

//   return (
//     <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6">
//         <div className="flex items-center justify-between h-16 lg:h-[70px]">
//           {/* Logo */}
//           <Link href="/" className="flex items-center gap-2 flex-shrink-0">
//             {settings?.logo ? (
//               <img src={settings.logo} alt={settings.siteName || 'ASP Cranes'} className="h-12 w-auto object-contain" />
//             ) : (
//               <div className="flex items-center gap-2">
//                 <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
//                   <svg width="20" height="20" viewBox="0 0 32 32" fill="white">
//                     <path d="M16 2 L16 8" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
//                     <rect x="4" y="8" width="24" height="2" rx="1" fill="white"/>
//                     <path d="M16 10 L16 28" stroke="white" strokeWidth="2.5"/>
//                     <path d="M8 28 L24 28" stroke="white" strokeWidth="2" strokeLinecap="round"/>
//                   </svg>
//                 </div>
//                 <div>
//                   <p className="text-red-600 font-black text-lg leading-tight tracking-wide">ASP</p>
//                   <p className="text-gray-700 text-[10px] font-semibold tracking-[0.2em] uppercase leading-none">Cranes</p>
//                 </div>
//               </div>
//             )}
//           </Link>

//           {/* Desktop Nav */}
//           <nav className="hidden lg:flex items-center gap-1">
//             {NAV_LINKS.map(link => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className={`px-4 py-2 text-sm font-semibold transition-colors rounded-md ${
//                   pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
//                     ? 'text-red-600'
//                     : `${textColor} hover:text-red-600`
//                 }`}
//               >
//                 {link.label}
//               </Link>
//             ))}
//           </nav>

//           {/* Right actions */}
//           <div className="flex items-center gap-2">
//             {/* Search */}
//             <div className="relative hidden sm:block">
//               {searchOpen ? (
//                 <form onSubmit={handleSearch} className="flex items-center">
//                   <input
//                     autoFocus
//                     value={searchQuery}
//                     onChange={e => setSearchQuery(e.target.value)}
//                     placeholder="Search..."
//                     className="border border-gray-300 rounded-l-md px-3 py-1.5 text-sm w-48 outline-none focus:border-red-500"
//                   />
//                   <button type="submit" className="bg-red-600 text-white px-3 py-1.5 rounded-r-md hover:bg-red-700 transition">
//                     <Search className="w-4 h-4" />
//                   </button>
//                   <button type="button" onClick={() => setSearchOpen(false)} className="ml-1 text-gray-500 hover:text-gray-800">
//                     <X className="w-4 h-4" />
//                   </button>
//                 </form>
//               ) : (
//                 <button onClick={() => setSearchOpen(true)} className="p-2 text-gray-600 hover:text-red-600 transition">
//                   <Search className="w-4 h-4" />
//                 </button>
//               )}
//             </div>

//             {/* CTA button */}
//             <Link href="/contact" className="hidden sm:flex items-center bg-red-600 text-white text-sm font-semibold px-5 py-2.5 rounded-md hover:bg-red-700 transition-colors">
//               Request a Quote
//             </Link>

//             {/* Mobile toggle */}
//             <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-gray-700">
//               {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       {isOpen && (
//         <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
//           <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
//             {NAV_LINKS.map(link => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className={`block px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
//                   pathname === link.href ? 'bg-red-50 text-red-600' : 'text-gray-700 hover:bg-gray-50'
//                 }`}
//               >
//                 {link.label}
//               </Link>
//             ))}
//             <Link href="/contact" className="block mt-2 text-center bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition">
//               Request a Quote
//             </Link>
//             {/* Mobile search */}
//             <form onSubmit={handleSearch} className="flex items-center pt-2">
//               <input
//                 value={searchQuery}
//                 onChange={e => setSearchQuery(e.target.value)}
//                 placeholder="Search..."
//                 className="border border-gray-300 rounded-l-lg px-3 py-2 text-sm flex-1 outline-none focus:border-red-500"
//               />
//               <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded-r-lg">
//                 <Search className="w-4 h-4" />
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }
