'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const DEFAULT = {
  tagline: 'ABOUT US',
  title: 'Our Commitment To Excellence In Construction And Design',
  paragraphs: [
    "ASP Cranes (Aadishakti Projects) is a professionally managed crane rental company headquartered in Raipur, Chhattisgarh. We specialize in providing advanced lifting solutions using a diverse fleet of cranes and access equipment, supported by skilled manpower and strict safety protocols.",
    "We operate across India and cater to infrastructure developers, EPC contractors, power plants, steel plants, cement industries, and manufacturing units.",
    "Founded with a vision to support India's growing infrastructure sector, ASP Cranes is part of the Rajdev Group — a diversified business group with experience across logistics, construction support, and heavy engineering services.",
  ],
  btnText: 'About Us',
  btnLink: '/about',
  image: '/aboutimg.png',
};

export default function About({ data }) {
  const d = data || DEFAULT;
  const paragraphs = d.paragraphs?.length ? d.paragraphs : DEFAULT.paragraphs;

  return (
    <section className="w-full bg-gray-50 py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        
        <div className="grid lg:grid-cols-2 gap-3 items-center">

          {/* ✅ LEFT IMAGE */}
          <div className="relative w-full flex justify-center lg:justify-start">
            
            {/* vertical divider */}
            <div className="hidden absolute right-0 top-0 h-full w-[1px] bg-gray-300"></div>

            <div className="relative w-full max-w-[320px] sm:max-w-[420px] md:max-w-[500px] lg:max-w-[520px] h-[300px] sm:h-[380px] md:h-[450px] lg:h-[520px]">
              <Image
                src="/aboutimg.png"
                alt="ASP Cranes"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>

          {/* ✅ RIGHT CONTENT */}
          <div className="w-full">
            
            {/* 🔥 Tagline with Logo */}
            <div className="flex items-center gap-3 ">
              
              {/* Logo */}
              <Image
                src="/aboutlogo.png"
                alt="icon"
                width={22}
                height={22}
                className="object-contain"
              />

              {/* Text */}
              <span className="text-red-600 text-sm font-bold tracking-widest uppercase">
                {d.tagline}
              </span>
            </div>

            {/* 🔥 Long Red Line */}
            <div className="w-full  h-[2px] bg-red-600 mb-6"></div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
              {d.title}
            </h2>

            {/* Paragraphs */}
            {paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-gray-500 text-sm sm:text-base leading-relaxed mb-4"
              >
                {p}
              </p>
            ))}

            {/* Button */}
            <div className="mt-6">
              <Link
                href={d.btnLink}
                className="inline-flex items-center border border-gray-300 rounded-sm overflow-hidden group"
              >
                <span className="px-6 py-3 text-sm font-semibold text-gray-900 group-hover:bg-red-600 group-hover:text-white transition">
                  {d.btnText}
                </span>

                <span className="px-4 py-3 bg-red-600 text-white group-hover:bg-gray-900 transition">
                  »
                </span>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}


// 'use client';
// import React from 'react';
// import Image from 'next/image';
// import Link from 'next/link';

// const DEFAULT = {
//   tagline: 'ABOUT US',
//   title: 'Our Commitment To Excellence In Construction And Design',
//   paragraphs: [
//     "ASP Cranes (Aadishakti Projects) is a professionally managed crane rental company headquartered in Raipur, Chhattisgarh. We specialize in providing advanced lifting solutions using a diverse fleet of cranes and access equipment, supported by skilled manpower and strict safety protocols.",
//     "We operate across India and cater to infrastructure developers, EPC contractors, power plants, steel plants, cement industries, and manufacturing units.",
//     "Founded with a vision to support India's growing infrastructure sector, ASP Cranes is part of the Rajdev Group — a diversified business group with experience across logistics, construction support, and heavy engineering services. Our strength lies in modern equipment, technical expertise, and a customer-first approach.",
//   ],
//   btnText: 'About Us',
//   btnLink: '/about',
//   image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
// };

// export default function About({ data }) {
//   const d = data || DEFAULT;
//   const paragraphs = d.paragraphs?.length ? d.paragraphs : DEFAULT.paragraphs;

//   return (
//     <section className="w-full bg-gray-50 py-24 relative overflow-hidden">
//       <div className="max-w-7xl mx-auto px-8">
//         <div className="flex max-lg:flex-col gap-10 items-start">
//           {/* Left Image */}
//           <div className="relative w-full lg:w-1/2 flex-shrink-0">
//             <img
//               src={d.image || DEFAULT.image}
//               alt="ASP Cranes"
//               className="w-full rounded-lg object-cover aspect-square shadow-lg"
//               onError={e => { e.target.src = DEFAULT.image; }}
//             />
//           </div>

//           {/* Right Content */}
//           <div className="w-full lg:w-1/2">
//             {/* Tagline */}
//             <p className="text-sm flex items-center font-bold text-red-500 gap-2 tracking-widest mb-4">
//               <span>🏗</span>
//               <span>{d.tagline || DEFAULT.tagline}</span>
//             </p>
//             <div className="w-16 h-0.5 bg-red-600 mb-4" />

//             <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
//               {d.title || DEFAULT.title}
//             </h2>

//             {paragraphs.map((p, i) => (
//               <p key={i} className="text-gray-500 leading-relaxed mb-4 text-sm">
//                 {p}
//               </p>
//             ))}

//             <div className="mt-6">
//               <Link
//                 href={d.btnLink || '/about'}
//                 className="flex items-center w-fit border border-gray-800 rounded-sm font-semibold text-gray-900 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all group overflow-hidden"
//               >
//                 <span className="pl-6 pr-2 py-3 text-sm">{d.btnText || 'About Us'}</span>
//                 <span className="px-4 py-3 flex items-center justify-center bg-red-600 text-white text-xl group-hover:bg-white group-hover:text-gray-900 transition-all">»</span>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
