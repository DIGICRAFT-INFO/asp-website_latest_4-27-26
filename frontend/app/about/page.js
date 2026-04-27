import { getAbout, getServices, getProjects } from '@/lib/api';
import Link from 'next/link';
import AboutClient from './AboutClient';
import Contact from '@/homepage/Contact'; // Import the Contact/Get Quote component

export const revalidate = 60;

export default async function AboutPage() {
  // Fetch everything in parallel for speed
  const [aboutRes, servicesRes, projectsRes] = await Promise.allSettled([
    getAbout(), 
    getServices(),
    getProjects('?limit=6') // Fetch top 6 projects for the about page
  ]);

  const about = aboutRes.value?.data || {};
  const services = servicesRes.value?.data || [];
  const projects = projectsRes.value?.data || [];

  return (
    <div className="pt-[70px]">
      {/* ── Banner ── */}
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=60"
          alt="About Us Banner"
          className="w-full h-[260px] object-cover object-center"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black/55">
          <h1 className="mb-2 text-4xl font-black md:text-5xl">About Us</h1>
          <p className="text-sm text-white/70">
            <Link href="/" className="transition hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="tracking-wider uppercase">ABOUT</span>
          </p>
        </div>
      </div>

      {/* ── Main About Section ── */}
      <AboutClient about={about} services={services} />

      {/* ── Real Projects Section ── */}
      <div className="py-20 border-t border-gray-100 bg-slate-50">
        <div className="px-4 mx-auto max-w-7xl">
          <div className="flex flex-col items-end justify-between gap-4 mb-12 md:flex-row">
            <div>
              <p className="mb-2 text-sm font-bold tracking-widest text-red-600 uppercase">Portfolio</p>
              <h2 className="text-3xl font-black md:text-4xl text-slate-900">Check our latest projects</h2>
              <p className="mt-2 text-gray-500">We are the best construction agency in the world</p>
            </div>
            <Link 
              href="/projects" 
              className="px-6 py-3 font-bold text-white transition-all bg-red-600 rounded-lg shadow-lg hover:bg-red-700 shadow-red-600/20 active:scale-95"
            >
              See More
            </Link>
          </div>

          {/* Projects Grid logic with real data */}
          {projects.length === 0 ? (
             <p className="py-10 text-center text-gray-400">Loading real projects...</p>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projects.slice(0, 6).map((project) => (
                <div key={project._id} className="overflow-hidden transition-all duration-500 bg-white border border-gray-100 shadow-sm group rounded-2xl hover:shadow-2xl">
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img 
                      src={project.image || 'https://via.placeholder.com/400x300'} 
                      alt={project.title} 
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-red-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 text-xl font-bold transition-colors text-slate-900 group-hover:text-red-600">{project.title}</h3>
                    <p className="mb-4 text-sm leading-relaxed text-gray-500 line-clamp-2">{project.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                       <span className="text-xs font-bold tracking-tighter uppercase text-slate-400">Client: {project.client || 'N/A'}</span>
                       <span className="text-xs font-bold text-red-600 uppercase transition-transform group-hover:translate-x-1">Explore →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Contact / Get Free Quote Section (New Add) ── */}
      <Contact />
    </div>
  );
}
// import { getAbout, getServices } from '@/lib/api';
// import Link from 'next/link';
// import AboutClient from './AboutClient';

// export const revalidate = 60;

// export default async function AboutPage() {
//   const [aboutRes, servicesRes] = await Promise.allSettled([getAbout(), getServices()]);
//   const about = aboutRes.value?.data || {};
//   const services = servicesRes.value?.data || [];

//   return (
//     <div className="pt-[70px]">
//       {/* ── Banner ── */}
//       <div className="relative">
//         <img
//           src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=60"
//           alt="About Us Banner"
//           className="w-full h-[260px] object-cover object-center"
//         />
//         <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black/55">
//           <h1 className="mb-2 text-4xl font-black md:text-5xl">About Us</h1>
//           <p className="text-sm text-white/70">
//             <Link href="/" className="transition hover:text-white">Home</Link>
//             <span className="mx-2">/</span>
//             <span className="tracking-wider uppercase">ABOUT</span>
//           </p>
//         </div>
//       </div>

//       {/* ── Main About Section (matches screenshot exactly) ── */}
//       <AboutClient about={about} services={services} />
//     </div>
//   );
// }
