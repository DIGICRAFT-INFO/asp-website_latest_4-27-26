import Link from 'next/link';

const DEFAULT_QUICK_LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'People', href: '/about' },
  { label: 'Middle East', href: '/middle-east' },
  { label: 'Policies', href: '/policies' },
];

const DEFAULT_CRANE_LINKS = [
  { label: 'Tower Cranes', href: '/our-cranes/tower-crane' },
  { label: 'Truck-Mounted Cranes', href: '/our-cranes/truck-mounted-crane' },
  { label: 'Crawler Cranes', href: '/our-cranes/crawler-crane' },
  { label: 'Pick & Carry Cranes', href: '/our-cranes/pick-carry-crane' },
  { label: 'Policies', href: '/policies' },
  { label: 'Policies', href: '/policies' }, // Image shows 'Policies' repeated
];

const DEFAULT_SERVICE_LINKS = [
  { label: 'Shifting & Loading', href: '/services' },
  { label: 'Winch Handling', href: '/services' },
  { label: 'Material Handling', href: '/services' },
  { label: 'Jacking', href: '/services' },
  { label: 'Operations & Maintenance (O&M)', href: '/services' },
];

const SocialIcon = ({ label, href }) => (
  <a
    href={href || "#"}
    className="w-8 h-8 border border-white/40 rounded-full flex items-center justify-center text-[10px] text-white hover:bg-white hover:text-black transition-all"
  >
    {label}
  </a>
);

export default function Footer({ settings }) {
  const phone = settings?.phone || ['+91-20-66744700 / +966 59 705 9690'];
  const email = settings?.email || 'enquiry@aspcranes.com';

  return (
    <footer className="bg-black text-white font-sans py-16 px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-20">
          
          {/* Brand/Logo Section */}
          <div className="flex flex-col">
            <div className="bg-white p-2 mb-6 w-fit">
              <img
                src="/companylogo.jpeg" 
                alt="ASP Cranes"
                className="h-24 w-auto object-contain"
              />
            </div>
            <div className="text-sm">
              <p className="font-bold mb-1">Customer Support</p>
              <p className="text-gray-400 text-xs">
                Write to us if you have any <br /> sales enquiry
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-medium mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {DEFAULT_QUICK_LINKS.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-gray-300 hover:text-white text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Cranes */}
          <div>
            <h4 className="text-lg font-medium mb-6">Our Cranes</h4>
            <ul className="space-y-4">
              {DEFAULT_CRANE_LINKS.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-gray-300 hover:text-white text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-medium mb-6">Services</h4>
            <ul className="space-y-4">
              {DEFAULT_SERVICE_LINKS.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-gray-300 hover:text-white text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-lg font-medium mb-6">Contact</h4>
            <div className="space-y-4 mb-8">
              {phone.map((p, i) => (
                <p key={i} className="text-gray-300 text-sm leading-relaxed">
                  {p}
                </p>
              ))}
              <a href={`mailto:${email}`} className="block text-gray-300 hover:text-white text-sm">
                {email}
              </a>
            </div>
            
            <div className="flex gap-3">
              <SocialIcon label="in" href="#" />
              <SocialIcon label="f" href="#" />
              <SocialIcon label="ig" href="#" />
              <SocialIcon label="x" href="#" />
              <SocialIcon label="yt" href="#" />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:row items-center justify-between">
          <p className="text-gray-500 text-sm">
            © Copyrights 2026 ASP Cranes Limited. All Rights Reserved
          </p>

          <div className="flex gap-4 text-sm">
            <Link href="/sitemap" className="text-gray-300 hover:text-white">Site Map</Link>
            <span className="text-gray-700">|</span>
            <Link href="/privacy" className="text-gray-300 hover:text-white">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// import Link from 'next/link';
// import { Linkedin, Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

// const DEFAULT_QUICK_LINKS = [
//   { label: 'Services', href: '/services' },
//   { label: 'About Us', href: '/about' },
//   { label: 'Projects', href: '/projects' },
//   { label: 'Blog', href: '/blog' },
// ];

// const DEFAULT_CRANE_LINKS = [
//   { label: 'Tower Cranes', href: '/our-cranes/tower-crane' },
//   { label: 'Truck-Mounted Cranes', href: '/our-cranes/truck-mounted-crane' },
//   { label: 'Crawler Cranes', href: '/our-cranes/crawler-crane' },
//   { label: 'Pick & Carry Cranes', href: '/our-cranes/pick-carry-crane' },
//   { label: 'Aerial Work Platforms', href: '/our-cranes/aerial-work-platform-awp' },
// ];

// const DEFAULT_SERVICE_LINKS = [
//   { label: 'Shifting & Loading', href: '/services' },
//   { label: 'Winch Handling', href: '/services' },
//   { label: 'Material Handling', href: '/services' },
//   { label: 'Jacking', href: '/services' },
//   { label: 'Operations & Maintenance', href: '/services' },
// ];

// const SocialIcon = ({ href, Icon }) => href && href !== '#' ? (
//   <a href={href} target="_blank" rel="noopener noreferrer"
//     className="w-8 h-8 border border-white/20 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:border-white transition-all">
//     <Icon className="w-3.5 h-3.5" />
//   </a>
// ) : null;

// export default function Footer({ settings }) {
//   const quickLinks = settings?.footerLinks?.quickLinks?.length ? settings.footerLinks.quickLinks : DEFAULT_QUICK_LINKS;
//   const craneLinks = settings?.footerLinks?.cranes?.length ? settings.footerLinks.cranes : DEFAULT_CRANE_LINKS;
//   const serviceLinks = settings?.footerLinks?.services?.length ? settings.footerLinks.services : DEFAULT_SERVICE_LINKS;
//   const social = settings?.socialLinks || {};
//   const phone = settings?.phone || ['+91-20-66744700', '+966 59 705 9690'];
//   const email = settings?.email || 'enquiry@aspcranes.com';
//   const address = settings?.address || 'Raipur, Chhattisgarh, India';

//   return (
//     <footer className="bg-gray-950 text-white">
//       <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
//           {/* Brand */}
//           <div className="lg:col-span-1">
//             <div className="flex items-center gap-2 mb-4">
//               <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
//                 <svg width="20" height="20" viewBox="0 0 32 32" fill="white">
//                   <path d="M16 2 L16 8" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
//                   <rect x="4" y="8" width="24" height="2" rx="1" fill="white"/>
//                   <path d="M16 10 L16 28" stroke="white" strokeWidth="2.5"/>
//                   <path d="M8 28 L24 28" stroke="white" strokeWidth="2" strokeLinecap="round"/>
//                 </svg>
//               </div>
//               <div>
//                 <p className="text-red-500 font-black text-lg leading-none">ASP</p>
//                 <p className="text-gray-400 text-[10px] tracking-[0.2em] uppercase">Cranes</p>
//               </div>
//             </div>
//             <p className="text-gray-500 text-xs leading-relaxed mb-4">
//               Customer Support<br />
//               <span className="text-gray-400">Write to us if you have any sales enquiry</span>
//             </p>
//             <div className="flex gap-2">
//               <SocialIcon href={social.linkedin} Icon={Linkedin} />
//               <SocialIcon href={social.facebook} Icon={Facebook} />
//               <SocialIcon href={social.instagram} Icon={Instagram} />
//               <SocialIcon href={social.twitter} Icon={Twitter} />
//               <SocialIcon href={social.youtube} Icon={Youtube} />
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Quick Links</h4>
//             <ul className="space-y-2">
//               {quickLinks.map((link, i) => (
//                 <li key={i}>
//                   <Link href={link.href} className="text-gray-400 hover:text-white text-sm transition-colors">
//                     {link.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Our Cranes */}
//           <div>
//             <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Our Cranes</h4>
//             <ul className="space-y-2">
//               {craneLinks.map((link, i) => (
//                 <li key={i}>
//                   <Link href={link.href} className="text-gray-400 hover:text-white text-sm transition-colors">
//                     {link.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Services */}
//           <div>
//             <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Services</h4>
//             <ul className="space-y-2">
//               {serviceLinks.map((link, i) => (
//                 <li key={i}>
//                   <Link href={link.href} className="text-gray-400 hover:text-white text-sm transition-colors">
//                     {link.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact */}
//           <div>
//             <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Contact</h4>
//             <ul className="space-y-3">
//               {phone.map((p, i) => (
//                 <li key={i} className="flex items-start gap-2">
//                   <Phone className="w-3.5 h-3.5 text-red-500 mt-0.5 flex-shrink-0" />
//                   <a href={`tel:${p.replace(/\s/g, '')}`} className="text-gray-400 hover:text-white text-sm transition-colors">{p}</a>
//                 </li>
//               ))}
//               <li className="flex items-start gap-2">
//                 <Mail className="w-3.5 h-3.5 text-red-500 mt-0.5 flex-shrink-0" />
//                 <a href={`mailto:${email}`} className="text-gray-400 hover:text-white text-sm transition-colors">{email}</a>
//               </li>
//               <li className="flex items-start gap-2">
//                 <MapPin className="w-3.5 h-3.5 text-red-500 mt-0.5 flex-shrink-0" />
//                 <span className="text-gray-400 text-sm">{address}</span>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Bottom bar */}
//         <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
//           <p className="text-gray-600 text-xs">
//             © Copyrights {new Date().getFullYear()} ASP Cranes Limited. All Rights Reserved
//           </p>
//           <div className="flex gap-4 text-gray-600 text-xs">
//             <Link href="/sitemap" className="hover:text-gray-400 transition-colors">Site Map</Link>
//             <Link href="/privacy" className="hover:text-gray-400 transition-colors">Privacy</Link>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }
