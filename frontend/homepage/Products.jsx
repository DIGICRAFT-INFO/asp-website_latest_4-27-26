'use client';

import React from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const FALLBACK = [
  { name: 'Tower Cranes', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80', slug: 'tower-crane' },
  { name: 'Truck-Mounted Cranes', image: 'https://images.unsplash.com/photo-1590487988256-9ed24133863e?w=600&q=80', slug: 'truck-mounted-crane' },
  { name: 'Crawler Cranes', image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=600&q=80', slug: 'crawler-crane' },
  { name: 'Pick & Carry Cranes', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80', slug: 'pick-carry-crane' },
  { name: 'Aerial Work Platforms (AWP)', image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=600&q=80', slug: 'aerial-work-platform-awp' },
  { name: 'Multi-Axle Platform Trailers', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', slug: 'multi-axle-platform-trailer' },
];

export default function Products({ cranes }) {
  const items = cranes?.length ? cranes : FALLBACK;

  // autoplay only when more than 8 items
  const enableAutoplay = items.length > 8;

  return (
    <section className="w-full bg-white py-24">
      <div className="max-w-6xl mx-auto px-8">

        {/* Heading */}
        <div className="flex justify-between items-end mb-10 flex-wrap gap-4">
          <div>

            {/* Logo + OUR CRANES */}
            <div className="flex items-center gap-3 mb-1">
              <div className="bg-white p-1 rounded shadow-sm">
                <img
                  src="/aboutlogo.png"
                  alt="logo"
                  className="w-6 h-6 object-contain"
                />
              </div>

              <p className="text-sm font-bold text-red-500 tracking-widest uppercase">
                OUR CRANES
              </p>
            </div>

            {/* Red underline (below text) */}
            <div className=" h-[1px] bg-red-500 mb-3"></div>

            {/* Main Heading */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Engineered Equipment For Every Lift
            </h2>
          </div>

          {/* Button */}
          <Link
            href="/our-cranes"
            className="flex items-center border border-gray-800 rounded-sm font-semibold text-gray-900 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all group overflow-hidden flex-shrink-0"
          >
            <span className="pl-5 pr-2 py-2.5 text-sm">See More</span>
            <span className="px-4 py-2.5 bg-red-600 text-white text-xl group-hover:bg-white group-hover:text-gray-900 transition-all">
              »
            </span>
          </Link>
        </div>

        {/* Slider */}
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          loop={true}
          autoplay={
            enableAutoplay
              ? { delay: 10000, disableOnInteraction: false }
              : false
          }
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="services-slider"
        >
          {items.map((item, i) => (
            <SwiperSlide key={item._id || i}>
              <div className="group shadow rounded-lg m-4">

                {/* Image */}
                <div className="overflow-hidden">
                  <img
                    src={item.image || FALLBACK[i % 6]?.image}
                    alt={item.name || item.title}
                    className="w-full h-[340px] rounded-t-lg object-cover group-hover:scale-105 transition duration-500"
                    onError={(e) => {
                      e.target.src = FALLBACK[i % 6]?.image;
                    }}
                  />
                </div>

                {/* Title */}
                <Link
                  href={`/our-cranes/${item.slug || '#'}`}
                  className="flex items-center justify-between p-4 hover:text-red-600 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-red-600">
                    {item.name || item.title}
                  </h3>
                </Link>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}


// 'use client';
// import React from 'react';
// import Link from 'next/link';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination, Autoplay } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/pagination';

// const FALLBACK = [
//   { name: 'Tower Cranes', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80', slug: 'tower-crane' },
//   { name: 'Truck-Mounted Cranes', image: 'https://images.unsplash.com/photo-1590487988256-9ed24133863e?w=600&q=80', slug: 'truck-mounted-crane' },
//   { name: 'Crawler Cranes', image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=600&q=80', slug: 'crawler-crane' },
//   { name: 'Pick & Carry Cranes', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80', slug: 'pick-carry-crane' },
//   { name: 'Aerial Work Platforms (AWP)', image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=600&q=80', slug: 'aerial-work-platform-awp' },
//   { name: 'Multi-Axle Platform Trailers', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', slug: 'multi-axle-platform-trailer' },
// ];

// export default function Products({ cranes }) {
//   const items = cranes?.length ? cranes : FALLBACK;

//   return (
//     <section className="w-full bg-white py-24">
//       <div className="max-w-6xl mx-auto px-8">
//         {/* Heading */}
//         <div className="flex justify-between items-end mb-10 flex-wrap gap-4">
//           <div>
//             <p className="text-sm inline-flex font-bold text-red-500 gap-2 tracking-widest mb-3 items-center">
//               <span>🏗</span>
//               <span>OUR CRANES</span>
//             </p>
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
//               Engineered Equipment For Every Lift
//             </h2>
//           </div>
//           <Link href="/our-cranes"
//             className="flex items-center border border-gray-800 rounded-sm font-semibold text-gray-900 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all group overflow-hidden flex-shrink-0">
//             <span className="pl-5 pr-2 py-2.5 text-sm">See More</span>
//             <span className="px-4 py-2.5 bg-red-600 text-white text-xl group-hover:bg-white group-hover:text-gray-900 transition-all">»</span>
//           </Link>
//         </div>

//         {/* Swiper Slider */}
//         <Swiper
//           modules={[Pagination, Autoplay]}
//           spaceBetween={30}
//           loop={true}
//           autoplay={{ delay: 2500, disableOnInteraction: false }}
//           breakpoints={{
//             0: { slidesPerView: 1 },
//             768: { slidesPerView: 2 },
//             1024: { slidesPerView: 3 },
//           }}
//           className="services-slider"
//         >
//           {items.map((item, i) => (
//             <SwiperSlide key={item._id || i}>
//               <div className="group shadow rounded-lg m-4">
//                 <div className="overflow-hidden">
//                   <img
//                     src={item.image || FALLBACK[i % 6]?.image}
//                     alt={item.name || item.title}
//                     className="w-full h-[340px] rounded-t-lg object-cover group-hover:scale-105 transition duration-500"
//                     onError={e => { e.target.src = FALLBACK[i % 6]?.image; }}
//                   />
//                 </div>
//                 <Link href={`/our-cranes/${item.slug || '#'}`}
//                   className="flex items-center rounded-sm justify-between p-4 hover:text-red-600 transition-colors">
//                   <h3 className="text-lg font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
//                     {item.name || item.title}
//                   </h3>
//                 </Link>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </section>
//   );
// }
