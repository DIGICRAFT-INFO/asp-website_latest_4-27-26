import { getServices } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';
import Contact from '@/homepage/Contact'; 

export const revalidate = 60;

const ICON_EMOJI = { Truck: '🚛', Settings: '⚙️', Layers: '📐', Anchor: '⚓', Package: '📦', Tool: '🔧', Shield: '🛡️', Wrench: '🔧' };

export default async function ServicesPage() {
  const res = await getServices();
  const services = res?.data || [];

  const whyChooseUsData = [
    { id: "01", title: "ADVANCED TECHNOLOGY", desc: "We craft unique digital experiences. With more years of expertise we design" },
    { id: "02", title: "TRUSTED COMPANY", desc: "We craft unique digital experiences. With more years of expertise we design" },
    { id: "03", title: "PROFESSIONAL TEAMS", desc: "We craft unique digital experiences. With more years of expertise we design" },
    { id: "04", title: "STYLISTIC FORMULA METHOD", desc: "We craft unique digital experiences. With more years of expertise we design" },
  ];

  return (
    <div className="pt-[70px] bg-white">
      {/* ── 1. BANNER ── */}
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=1600&q=60"
          alt="Services"
          className="w-full h-[260px] object-cover object-center"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black/50">
          <h1 className="mb-2 text-4xl font-black tracking-tight uppercase md:text-5xl">Services</h1>
          <p className="text-sm font-medium text-white/70">
            <Link href="/" className="transition hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="tracking-wider uppercase">SERVICES</span>
          </p>
        </div>
      </div>

      {/* ── 2. SERVICES LIST ── */}
      <section className="px-4 py-20 mx-auto max-w-7xl sm:px-6">
        <div className="mb-12">
          <h2 className="mb-3 text-3xl font-black tracking-tight md:text-4xl text-slate-900">Our services that we provide</h2>
          <p className="max-w-2xl text-sm leading-relaxed text-gray-500">
            We craft unique solutions for heavy industry. With more than 7 years of expertise we design and code clean.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {(services.length ? services : []).map((service, i) => (
            <div key={service._id || i} className="p-8 transition-all duration-300 bg-white border border-gray-100 rounded-2xl hover:shadow-2xl group">
              <div className="flex items-center justify-center mb-6 text-3xl transition-colors w-14 h-14 bg-orange-50 rounded-xl group-hover:bg-red-50">
                {ICON_EMOJI[service.icon] || '🏗️'}
              </div>
              <h3 className="mb-3 text-xl font-black transition-colors text-slate-900 group-hover:text-red-600">{service.title}</h3>
              <p className="mb-6 text-sm leading-relaxed text-gray-500">{service.description}</p>
              <Link href="/contact" className="inline-flex items-center text-xs font-black tracking-widest text-red-600 uppercase transition-all hover:gap-3">
                Get Quote <span className="ml-2">→</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. WHY CHOOSE US (Exact Match image_f5bc5c.png) ── */}
      <section className="py-24 overflow-hidden bg-white">
        <div className="flex flex-col items-center gap-12 px-4 mx-auto max-w-7xl lg:flex-row">
          
          {/* Left: Truck Image */}
          <div className="w-full lg:w-1/2">
            <div className="relative w-full aspect-[4/3] transform hover:scale-105 transition-transform duration-700">
              <Image 
                src="/servicesimagetruck.png" 
                alt="Heavy Duty Truck" 
                fill 
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Right: Detailed Content */}
          <div className="w-full lg:w-1/2">
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <Image src="/aboutlogo.png" alt="icon" width={22} height={22} className="object-contain" />
                <span className="text-red-600 font-bold tracking-[0.2em] text-sm uppercase">Our Benefits</span>
              </div>
              <h2 className="mb-6 text-4xl font-black tracking-tighter md:text-6xl text-slate-900">
                Why choose us
              </h2>
              <div className="w-24 h-[3px] bg-red-600"></div> {/* Long Red Underline */}
            </div>

            <div className="grid grid-cols-1 gap-y-12">
              {whyChooseUsData.map((item) => (
                <div key={item.id} className="flex items-start gap-8 group">
                  {/* Large Stylized Number */}
                  <span className="text-6xl font-black leading-none text-gray-100 transition-colors duration-300 group-hover:text-red-100">
                    {item.id}
                  </span>
                  
                  <div className="pt-1">
                    <h4 className="mb-2 text-lg font-black tracking-tight transition-colors text-slate-900 group-hover:text-red-600">
                      {item.title}
                    </h4>
                    <p className="max-w-md text-sm leading-relaxed text-gray-500">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. GET FREE QUOTE SECTION ── */}
      <div className="mt-10">
        <Contact />
      </div>
    </div>
  );
}

// import { getServices } from '@/lib/api';
// import Link from 'next/link';

// export const revalidate = 60;

// const ICON_EMOJI = { Truck: '🚛', Settings: '⚙️', Layers: '📐', Anchor: '⚓', Package: '📦', Tool: '🔧', Shield: '🛡️', Wrench: '🔧' };

// export default async function ServicesPage() {
//   const res = await getServices();
//   const services = res?.data || [];

//   const defaultServices = [
//     { title: 'Shifting & Loading', description: 'We specialize in heavy equipment shifting and loading for industrial plants, infrastructure sites, and factories.', icon: 'Truck' },
//     { title: 'Winch Handling', description: 'Professional winch operations for controlled pulling, positioning, and lifting of heavy components in confined or challenging environments.', icon: 'Anchor' },
//     { title: 'Material Handling', description: 'Complete material handling solutions including lifting, positioning, and movement of heavy and oversized materials.', icon: 'Package' },
//     { title: 'Jacking (Machine Jacking & Leveling)', description: 'Accurate machine jacking and leveling services for installation, alignment, and relocation of industrial machinery.', icon: 'Tool' },
//     { title: 'Operations & Maintenance (O&M)', description: 'Dedicated O&M services for long-term projects, ensuring equipment uptime, safety compliance, and operational efficiency.', icon: 'Shield' },
//   ];

//   const displayServices = services.length ? services : defaultServices;

//   return (
//     <div className="pt-[70px]">
//       {/* Banner — matches screenshot */}
//       <div className="relative">
//         <img
//           src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=1600&q=60"
//           alt="Services"
//           className="w-full h-[260px] object-cover object-center"
//         />
//         <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black/50">
//           <h1 className="mb-2 text-4xl font-black md:text-5xl">Services</h1>
//           <p className="text-sm text-white/70">
//             <Link href="/" className="transition hover:text-white">Home</Link>
//             <span className="mx-2">/</span>
//             <span className="tracking-wider uppercase">SERVICES</span>
//           </p>
//         </div>
//       </div>

//       <section className="px-4 py-20 mx-auto max-w-7xl sm:px-6">
//         <div className="mb-12">
//           <h2 className="mb-3 text-3xl font-bold md:text-4xl text-slate-900">Our services that we provide</h2>
//           <p className="max-w-2xl text-sm text-gray-500">
//             We craft unique solutions for heavy industry. With more than 7 years of expertise we design and code clean.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {displayServices.map((service, i) => (
//             <div key={service._id || i} className="transition-all bg-white border border-gray-100 rounded-2xl p-7 hover:shadow-lg group">
//               <div className="flex items-center justify-center mb-5 text-3xl transition-colors bg-orange-100 w-14 h-14 rounded-xl group-hover:bg-orange-200">
//                 {ICON_EMOJI[service.icon] || '🏗️'}
//               </div>
//               <h3 className="mb-3 text-xl font-bold transition-colors text-slate-900 group-hover:text-red-600">{service.title}</h3>
//               <p className="text-sm leading-relaxed text-gray-500">{service.description}</p>
//               {service.features?.length > 0 && (
//                 <ul className="mt-4 space-y-1">
//                   {service.features.slice(0, 3).map((f, fi) => (
//                     <li key={fi} className="flex items-center gap-2 text-xs text-gray-600">
//                       <span className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0" />{f}
//                     </li>
//                   ))}
//                 </ul>
//               )}
//               <Link href="/contact" className="inline-flex items-center mt-4 text-sm font-semibold text-red-600 transition-colors hover:text-red-700">
//                 Get Quote →
//               </Link>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }
