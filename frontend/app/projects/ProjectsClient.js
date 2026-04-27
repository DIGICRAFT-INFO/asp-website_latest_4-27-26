'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Calendar } from 'lucide-react';

export default function ProjectsClient({ initialProjects, allCategories, initialCategory }) {
  const [category, setCategory] = useState(initialCategory);
  const router = useRouter();

  const setFilter = (cat) => {
    setCategory(cat);
    const q = new URLSearchParams();
    if (cat) q.set('category', cat);
    router.push(`/projects?${q.toString()}`);
  };

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-10">
        <p className="text-sm font-semibold text-red-600 uppercase tracking-wider mb-2">OUR PROJECTS</p>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Our Completed Projects</h2>
        <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">Delivering excellence across industries with precision engineering and reliable crane operations.</p>
      </div>

      {/* Category tabs */}
      {allCategories.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => setFilter('')}
            className={`px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${!category ? 'bg-red-600 text-white' : 'text-gray-600 hover:text-red-600 border border-gray-200 hover:border-red-300'}`}
          >All</button>
          {allCategories.map(cat => (
            <button key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${category === cat ? 'bg-red-600 text-white' : 'text-gray-600 hover:text-red-600 border border-gray-200 hover:border-red-300'}`}
            >{cat}</button>
          ))}
        </div>
      )}

      {initialProjects.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-xl font-medium">No projects found in this category</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {initialProjects.map(project => (
            <div key={project._id} className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all overflow-hidden border border-gray-100">
              <div className="aspect-video overflow-hidden relative">
                {project.image ? (
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200" />
                )}
                <div className="absolute top-3 left-3">
                  <span className="bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-red-600 transition-colors">{project.title}</h3>
                <p className="text-gray-500 text-sm mb-3 line-clamp-2">{project.description}</p>
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  {project.location && (
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{project.location}</span>
                  )}
                  {project.year && (
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{project.year}</span>
                  )}
                </div>
                {project.client && (
                  <p className="mt-2 text-xs text-gray-400">Client: <span className="font-semibold text-gray-600">{project.client}</span></p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
