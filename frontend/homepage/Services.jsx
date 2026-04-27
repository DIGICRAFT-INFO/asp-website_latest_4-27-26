'use client';

import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const DEFAULT_SERVICES = [
  {
    title: 'Heavy Equipment Shifting & Loading',
    description: 'Safe and efficient shifting, loading, and unloading of heavy machinery using advanced lifting techniques.',
    image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=600&q=80'
  },
  {
    title: 'Crane Rental with Certified Operators',
    description: 'Wide range of cranes operated by trained and certified professionals ensuring maximum safety.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80'
  },
  {
    title: 'Aerial Access Solutions',
    description: 'Reliable aerial platforms and access solutions for high-reach industrial and construction work.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80'
  },
];

export default function Services({ services, data }) {
  const displayServices = services?.length ? services : DEFAULT_SERVICES;

  const tagline = data?.tagline || 'OUR SERVICES';
  const title = data?.title || 'Reliable Solutions for Heavy & Industrial Operations';
  const btnText = data?.btnText || 'See More';
  const btnLink = data?.btnLink || '/services';

  // autoplay condition
  const enableAutoplay = displayServices.length > 8;

  return (
    <section className="w-full bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="flex justify-between items-end mb-10 flex-wrap gap-4">
          <div>

            {/* Logo + Tagline */}
            <div className="flex items-center gap-3 mb-1">
              <div className="bg-white p-1 rounded shadow-sm">
                <img src="/aboutlogo.png" alt="logo" className="w-6 h-6" />
              </div>

              <p className="text-sm font-bold text-red-500 tracking-widest uppercase">
                {tagline}
              </p>
            </div>

            {/* Red underline */}
            <div className="h-[2px] bg-red-500 mb-3"></div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              {title}
            </h2>
          </div>

          {/* Button */}
          <Link
            href={btnLink}
            className="flex items-center border border-gray-800 rounded-sm font-semibold text-gray-900 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all group overflow-hidden flex-shrink-0"
          >
            <span className="pl-5 pr-2 py-2.5 text-sm">{btnText}</span>
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
        >
          {displayServices.map((service, i) => (
            <SwiperSlide key={service._id || i}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition flex flex-col m-3">

                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={service.image || DEFAULT_SERVICES[i % 3]?.image}
                    alt={service.title}
                    className="w-full h-full object-cover hover:scale-110 transition duration-500"
                    onError={(e) => {
                      e.target.src = DEFAULT_SERVICES[i % 3]?.image;
                    }}
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}

// 'use client';
// import Link from 'next/link';

// const DEFAULT_SERVICES = [
//   { title: 'Heavy Equipment Shifting & Loading', description: 'Safe and efficient shifting, loading, and unloading of heavy machinery using advanced lifting techniques.', image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=600&q=80' },
//   { title: 'Crane Rental with Certified Operators', description: 'Wide range of cranes operated by trained and certified professionals ensuring maximum safety.', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80' },
//   { title: 'Aerial Access Solutions', description: 'Reliable aerial platforms and access solutions for high-reach industrial and construction work.', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80' },
// ];

// export default function Services({ services, data }) {
//   const displayServices = services?.length ? services : DEFAULT_SERVICES;
//   const tagline = data?.tagline || 'OUR SERVICES';
//   const title = data?.title || 'Reliable Solutions for Heavy & Industrial Operations';
//   const btnText = data?.btnText || 'See More';
//   const btnLink = data?.btnLink || '/services';

//   return (
//     <section className="w-full py-24">
//       <div className="max-w-7xl mx-auto px-6">
//         {/* Heading row */}
//         <div className="flex justify-between items-end mb-10 flex-wrap gap-4">
//           <div>
//             <p className="text-sm inline-flex font-bold text-red-500 gap-2 tracking-widest mb-3 items-center">
//               <span>🏗</span>
//               <span>{tagline}</span>
//             </p>
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
//               {title}
//             </h2>
//           </div>
//           <Link href={btnLink}
//             className="flex items-center border border-gray-800 rounded-sm font-semibold text-gray-900 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all group overflow-hidden flex-shrink-0">
//             <span className="pl-5 pr-2 py-2.5 text-sm">{btnText}</span>
//             <span className="px-4 py-2.5 bg-red-600 text-white text-xl group-hover:bg-white group-hover:text-gray-900 transition-all">»</span>
//           </Link>
//         </div>

//         {/* Grid */}
//         <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
//           {displayServices.slice(0, 6).map((service, i) => (
//             <div key={service._id || i} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition flex flex-col">
//               <div className="relative h-48 overflow-hidden">
//                 <img
//                   src={service.image || DEFAULT_SERVICES[i % 3]?.image}
//                   alt={service.title}
//                   className="w-full h-full object-cover hover:scale-110 transition duration-500"
//                   onError={e => { e.target.src = DEFAULT_SERVICES[i % 3]?.image; }}
//                 />
//               </div>
//               <div className="p-8 flex flex-col flex-grow">
//                 <h3 className="text-xl font-semibold mb-3 text-gray-900">{service.title}</h3>
//                 <p className="text-gray-600 flex-grow text-sm leading-relaxed">{service.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
