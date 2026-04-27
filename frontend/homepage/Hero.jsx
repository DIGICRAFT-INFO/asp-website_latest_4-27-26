'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DEFAULT_SLIDES = [
  {
    title: 'Tower Cranes',
    subtitle: 'WE PROVIDE CRANE RENTAL SERVICES',
    description:
      'High-rise construction projects ke liye powerful and stable tower cranes, designed to deliver precision lifting, safety, and reliable performance for large-scale infrastructure developments.',
    btn1Text: 'About Company',
    btn1Link: '/about',
    btn2Text: 'Get a Quote',
    btn2Link: '/contact',
    image:
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600',
    isActive: true,
  },
  {
    title: 'Truck-Mounted Cranes',
    subtitle: 'WE PROVIDE CRANE RENTAL SERVICES',
    description:
      'Highly mobile cranes designed for quick setup and transportation between multiple job sites.',
    btn1Text: 'About Company',
    btn1Link: '/about',
    btn2Text: 'Get a Quote',
    btn2Link: '/contact',
    image:
      'https://images.unsplash.com/photo-1590487988256-9ed24133863e?w=1600',
    isActive: true,
  },
  {
    title: 'Aerial Work Platforms (AWP)',
    subtitle: 'WE PROVIDE CRANE RENTAL SERVICES',
    description:
      'Safe and efficient aerial platforms designed for height access, maintenance, and inspection tasks.',
    btn1Text: 'About Company',
    btn1Link: '/about',
    btn2Text: 'Get a Quote',
    btn2Link: '/contact',
    image:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600',
    isActive: true,
  },
];

export default function Hero({ slides }) {
  const activeSlides = slides?.filter((s) => s.isActive) || [];
  const displaySlides =
    activeSlides.length > 0 ? activeSlides : DEFAULT_SLIDES;

  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const goTo = useCallback(
    (idx) => {
      if (transitioning) return;
      setTransitioning(true);
      setCurrent(idx);
      setTimeout(() => setTransitioning(false), 700);
    },
    [transitioning]
  );

  const next = useCallback(
    () => goTo((current + 1) % displaySlides.length),
    [current, displaySlides.length, goTo]
  );

  const prev = () =>
    goTo(current === 0 ? displaySlides.length - 1 : current - 1);

  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next]);

  const slide = displaySlides[current];

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        height: '100svh',
        minHeight: '600px',
        maxHeight: '900px',
      }}
    >
      {/* Slides */}
      {displaySlides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={s.image}
            alt={s.title}
            className="w-full h-full object-cover"
            loading={i === 0 ? 'eager' : 'lazy'}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/10" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 w-full">
          <div className="max-w-2xl">
            <p className="text-red-400 text-xs sm:text-sm font-black uppercase tracking-[0.3em] mb-5">
              {slide?.subtitle}
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.1] mb-6">
              {slide?.title}
            </h1>

            {slide?.description && (
              <p className="text-white/75 text-base sm:text-lg leading-relaxed mb-9 max-w-xl">
                {slide.description}
              </p>
            )}

            <div className="flex flex-wrap gap-4">
              {slide?.btn1Text && (
                <Link
                  href={slide.btn1Link || '/about'}
                  className="flex items-center gap-3 bg-white text-slate-900 font-bold px-6 py-3.5 rounded-md hover:bg-gray-100 transition-all group"
                >
                  {slide.btn1Text}
                  <span className="bg-red-600 text-white px-2 py-1 rounded-sm text-xs group-hover:bg-red-700 transition">
                    »
                  </span>
                </Link>
              )}

              {slide?.btn2Text && (
                <Link
                  href={slide.btn2Link || '/contact'}
                  className="flex items-center border-2 border-white/50 text-white font-bold px-6 py-3.5 rounded-md hover:bg-white/10 hover:border-white transition-all"
                >
                  {slide.btn2Text}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Arrows Bottom Right */}
      <div className="absolute bottom-6 right-6 z-20 flex gap-3">
        <button
          onClick={prev}
          className="w-11 h-11 bg-red-600 text-white rounded-sm flex items-center justify-center hover:bg-red-700 transition-all shadow-lg"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={next}
          className="w-11 h-11 bg-red-600 text-white rounded-sm flex items-center justify-center hover:bg-red-700 transition-all shadow-lg"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* ✅ Dots Bottom Left */}
      <div className="absolute bottom-6 left-6 z-20 flex gap-2">
        {displaySlides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current
                ? 'w-8 bg-red-500'
                : 'w-4 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  );
}

// 'use client';
// import { useState, useEffect, useCallback } from 'react';
// import Link from 'next/link';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

// const DEFAULT_SLIDES = [
//   { title: 'Tower Cranes', subtitle: 'WE PROVIDE CRANE RENTAL SERVICES', description: 'Powerful and stable tower cranes for high-rise and large-scale construction projects.', btn1Text: 'About Company', btn1Link: '/about', btn2Text: 'Get a Quote', btn2Link: '/contact', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600', isActive: true },
//   { title: 'Truck-Mounted Cranes', subtitle: 'WE PROVIDE CRANE RENTAL SERVICES', description: 'Highly mobile cranes designed for quick setup and transportation between multiple job sites.', btn1Text: 'About Company', btn1Link: '/about', btn2Text: 'Get a Quote', btn2Link: '/contact', image: 'https://images.unsplash.com/photo-1590487988256-9ed24133863e?w=1600', isActive: true },
//   { title: 'Aerial Work Platforms (AWP)', subtitle: 'WE PROVIDE CRANE RENTAL SERVICES', description: 'Safe and efficient aerial platforms designed for height access, maintenance, and inspection tasks.', btn1Text: 'About Company', btn1Link: '/about', btn2Text: 'Get a Quote', btn2Link: '/contact', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600', isActive: true },
// ];

// export default function Hero({ slides }) {
//   const activeSlides = (slides?.filter(s => s.isActive) || []);
//   const displaySlides = activeSlides.length > 0 ? activeSlides : DEFAULT_SLIDES;
//   const [current, setCurrent] = useState(0);
//   const [transitioning, setTransitioning] = useState(false);

//   const goTo = useCallback((idx) => {
//     if (transitioning) return;
//     setTransitioning(true);
//     setCurrent(idx);
//     setTimeout(() => setTransitioning(false), 700);
//   }, [transitioning]);

//   const next = useCallback(() => goTo((current + 1) % displaySlides.length), [current, displaySlides.length, goTo]);
//   const prev = () => goTo(current === 0 ? displaySlides.length - 1 : current - 1);

//   useEffect(() => {
//     const t = setInterval(next, 5000);
//     return () => clearInterval(t);
//   }, [next]);

//   const slide = displaySlides[current];

//   return (
//     <section className="relative w-full overflow-hidden" style={{ height: '100svh', minHeight: '600px', maxHeight: '900px' }}>
//       {displaySlides.map((s, i) => (
//         <div key={i} className={`absolute inset-0 transition-opacity duration-700 ${i === current ? 'opacity-100' : 'opacity-0'}`}>
//           <img src={s.image} alt={s.title} className="w-full h-full object-cover" loading={i === 0 ? 'eager' : 'lazy'} />
//           <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/10" />
//         </div>
//       ))}

//       <div className="relative z-10 h-full flex items-center">
//         <div className="max-w-7xl mx-auto px-6 sm:px-10 w-full">
//           <div className="max-w-2xl">
//             <p className="text-red-400 text-xs sm:text-sm font-black uppercase tracking-[0.3em] mb-5">{slide?.subtitle}</p>
//             <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.1] mb-6">{slide?.title}</h1>
//             {slide?.description && <p className="text-white/75 text-base sm:text-lg leading-relaxed mb-9 max-w-xl">{slide.description}</p>}
//             <div className="flex flex-wrap gap-4">
//               {slide?.btn1Text && (
//                 <Link href={slide.btn1Link || '/about'} className="flex items-center gap-3 bg-white text-slate-900 font-bold px-6 py-3.5 rounded-md hover:bg-gray-100 transition-all group">
//                   {slide.btn1Text}
//                   <span className="bg-red-600 text-white px-2 py-1 rounded-sm text-xs group-hover:bg-red-700 transition">»</span>
//                 </Link>
//               )}
//               {slide?.btn2Text && (
//                 <Link href={slide.btn2Link || '/contact'} className="flex items-center border-2 border-white/50 text-white font-bold px-6 py-3.5 rounded-md hover:bg-white/10 hover:border-white transition-all">
//                   {slide.btn2Text}
//                 </Link>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-red-600 text-white rounded-sm flex items-center justify-center hover:bg-red-700 transition-colors">
//         <ChevronLeft className="w-5 h-5" />
//       </button>
//       <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-red-600 text-white rounded-sm flex items-center justify-center hover:bg-red-700 transition-colors">
//         <ChevronRight className="w-5 h-5" />
//       </button>

//       <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
//         {displaySlides.map((_, i) => (
//           <button key={i} onClick={() => goTo(i)} className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-red-500' : 'w-4 bg-white/40 hover:bg-white/70'}`} />
//         ))}
//       </div>
//     </section>
//   );
// }
