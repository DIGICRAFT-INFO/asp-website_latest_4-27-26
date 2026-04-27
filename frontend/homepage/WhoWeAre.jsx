
'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

const DEFAULT_CARDS = [
  {
    title: 'We are Leaders',
    description:
      'Leading the industry with innovative lifting solutions and a commitment to safety, efficiency, and excellence in every project we undertake.',
    image:
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
    link: '/about',
  },
  {
    title: 'We Are Experience',
    description:
      'With decades of combined experience, our team brings unmatched expertise to every project, ensuring safe and efficient crane operations across all sectors.',
    image:
      'https://images.unsplash.com/photo-1590487988256-9ed24133863e?w=600&q=80',
    link: '/about',
  },
  {
    title: 'We are Solutions',
    description:
      'Providing comprehensive crane rental solutions tailored to your specific project needs.',
    image:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80',
    link: '/about',
  },
];

export default function WhoWeAre({ data }) {
  const cards = data?.cards?.length ? data.cards : DEFAULT_CARDS;
  const title = data?.title || 'WHO WE ARE';

  return (
    <section className="py-20 bg-white flex flex-col items-center">
      <div className="text-center mb-14">
        <h2 className="text-3xl font-bold text-red-600 uppercase tracking-wider">
          {title}
        </h2>
      </div>

      <div className="max-w-7xl w-full px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((item, i) => (
          <div
            key={i}
            className="relative group overflow-hidden rounded-xl  cursor-pointer"
          >
            {/* IMAGE */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* DARK OVERLAY (on hover) */}
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition duration-500" />

            {/* CONTENT (hidden → show on hover) */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              
              <h3 className="text-2xl font-bold mb-2">
                {item.title}
              </h3>

              <p className="text-white/80 text-sm mb-3 leading-relaxed">
                {item.description}
              </p>

              <Link
                href={item.link || '/about'}
                className="text-sm font-semibold text-red-400 hover:text-white transition"
              >
                Read More »
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// 'use client';
// import { motion } from 'framer-motion';
// import Link from 'next/link';

// const DEFAULT_CARDS = [
//   { title: 'We are Leaders', description: 'Leading the industry with innovative lifting solutions and a commitment to safety, efficiency, and excellence in every project we undertake.', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80', link: '/about' },
//   { title: 'We Are Experience', description: 'With decades of combined experience, our team brings unmatched expertise to every project, ensuring safe and efficient crane operations across all sectors.', image: 'https://images.unsplash.com/photo-1590487988256-9ed24133863e?w=600&q=80', link: '/about' },
//   { title: 'We are Solutions', description: 'Providing comprehensive crane rental solutions tailored to your specific project needs, from single lifts to long-term equipment deployment.', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80', link: '/about' },
// ];

// const card = {
//   hidden: { opacity: 0, y: 40 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
// };

// const container = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
// };

// export default function WhoWeAre({ data }) {
//   const cards = data?.cards?.length ? data.cards : DEFAULT_CARDS;
//   const title = data?.title || 'WHO WE ARE';

//   return (
//     <section className="py-20 bg-white flex flex-col justify-center items-center">
//       <div className="text-center mb-14">
//         <h2 className="text-3xl font-bold text-red-600 uppercase tracking-wider">{title}</h2>
//       </div>

//       <motion.div
//         variants={container}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, margin: '-100px' }}
//         className="max-w-7xl w-full px-6 grid grid-cols-1 md:grid-cols-3 gap-6"
//       >
//         {cards.map((item, i) => (
//           <motion.div key={i} variants={card}
//             className="relative group overflow-hidden rounded-xl aspect-[4/5] shadow-lg cursor-pointer"
//           >
//             <img
//               src={item.image || DEFAULT_CARDS[i % 3]?.image}
//               alt={item.title}
//               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//               onError={e => { e.target.src = DEFAULT_CARDS[i % 3]?.image; }}
//             />
//             {/* Gradient overlay */}
//             <div className={`absolute inset-0 bg-gradient-to-t ${i === 1 ? 'from-black/85 via-black/50 to-black/20' : 'from-black/80 via-black/30 to-transparent'}`} />

//             <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
//               <h3 className="text-2xl font-black mb-2">{item.title}</h3>
//               {item.description && (
//                 <p className="text-white/80 text-sm leading-relaxed mb-3 line-clamp-4">{item.description}</p>
//               )}
//               <Link href={item.link || '/about'} className="text-sm font-semibold text-white hover:text-red-300 transition-colors">
//                 Read More »
//               </Link>
//             </div>
//           </motion.div>
//         ))}
//       </motion.div>
//     </section>
//   );
// }
