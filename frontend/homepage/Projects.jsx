'use client';
import { useState } from 'react';
import Link from 'next/link';

const FALLBACK_PROJECTS = [
  { title: 'Steel Plant Erection', category: 'Infrastructure', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80' },
  { title: 'Power Plant Maintenance', category: 'Energy', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80' },
  { title: 'Bridge Construction Support', category: 'Infrastructure', image: 'https://images.unsplash.com/photo-1590487988256-9ed24133863e?w=600&q=80' },
  { title: 'Cement Plant Installation', category: 'Industrial', image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=600&q=80' },
];

export default function Projects({ projects, data }) {
  const items = projects?.length ? projects : FALLBACK_PROJECTS;
  const allCategories = [...new Set(items.map(p => p.category).filter(Boolean))];
  const [active, setActive] = useState('');

  const filtered = active ? items.filter(p => p.category === active) : items;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl font-bold uppercase tracking-wide">
            Our <span className="text-red-600">Projects</span>
          </h2>
          <p className="text-gray-500 mt-4 text-sm">
            {data?.subtitle || 'Delivering excellence across industries with precision engineering and reliable crane operations.'}
          </p>
        </div>

        {/* Category Filter Tabs */}
        {allCategories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setActive('')}
              className={`px-5 py-2 text-sm font-bold uppercase tracking-wider transition-all ${!active ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-500 hover:text-red-500'}`}
            >
              All
            </button>
            {allCategories.map(cat => (
              <button key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2 text-sm font-bold uppercase tracking-wider transition-all ${active === cat ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-500 hover:text-red-500'}`}
              >{cat}</button>
            ))}
          </div>
        )}

        {/* Projects Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">No projects in this category</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.slice(0, 6).map((project, i) => (
              <div key={project._id || i} className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all aspect-[4/3]">
                <img
                  src={project.image || FALLBACK_PROJECTS[i % 4]?.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={e => { e.target.src = FALLBACK_PROJECTS[i % 4]?.image; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  {project.category && (
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-red-600 px-2 py-1 rounded mb-2 inline-block">
                      {project.category}
                    </span>
                  )}
                  <h3 className="font-bold text-base">{project.title}</h3>
                  {project.location && <p className="text-white/70 text-xs mt-1">{project.location}</p>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More */}
        <div className="flex justify-center mt-10">
          <Link href="/projects"
            className="flex items-center border border-gray-800 rounded-sm font-semibold text-gray-900 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all group overflow-hidden">
            <span className="pl-6 pr-2 py-3 text-sm">Load More</span>
            <span className="px-4 py-3 bg-red-600 text-white text-xl group-hover:bg-white group-hover:text-gray-900 transition-all">»</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
