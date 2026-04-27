'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, ArrowRight, MessageCircle } from 'lucide-react';

const CATEGORY_LABELS = {
  'tower': 'Tower Cranes',
  'truck-mounted': 'Truck-Mounted Cranes',
  'crawler': 'Crawler Cranes',
  'pick-carry': 'Pick & Carry Cranes',
  'awp': 'Aerial Work Platforms',
  'trailer': 'Platform Trailers',
  'other': 'Other Equipment',
};

export default function CranesClient({ initialCranes, categories, initialCategory, initialSearch }) {
  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const router = useRouter();

  const applyFilter = (params = {}) => {
    const q = new URLSearchParams();
    const s = params.search !== undefined ? params.search : search;
    const c = params.category !== undefined ? params.category : category;
    if (s) q.set('search', s);
    if (c) q.set('category', c);
    router.push(`/our-cranes?${q.toString()}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    applyFilter({ search });
  };

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
            <span className="w-1 h-8 bg-red-600 rounded-full block"></span>
            Our Fleet
          </h2>
        </div>
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search cranes..."
              className="border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-red-500 w-48"
            />
          </div>
          <button type="submit" className="bg-red-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-red-700 transition">Search</button>
        </form>
      </div>

      {/* Category filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => { setCategory(''); applyFilter({ category: '' }); }}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${!category ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          All Cranes
        </button>
        {categories.map(c => (
          <button key={c}
            onClick={() => { setCategory(c); applyFilter({ category: c }); }}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${category === c ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {CATEGORY_LABELS[c] || c}
          </button>
        ))}
      </div>

      {/* Crane cards */}
      {initialCranes.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-xl font-medium">No cranes found</p>
          <p className="text-sm mt-2">Try a different search or category filter</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {initialCranes.map(crane => (
            <div key={crane._id} className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all border border-gray-100 overflow-hidden">
              <div className="relative aspect-video overflow-hidden">
                {crane.image ? (
                  <img src={crane.image} alt={crane.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                    <span className="text-slate-400 text-sm">No Image</span>
                  </div>
                )}
                {crane.badge && (
                  <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                    {crane.badge}
                  </span>
                )}
              </div>
              <div className="p-5">
                <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">{CATEGORY_LABELS[crane.category] || crane.category}</span>
                <h3 className="text-lg font-bold text-slate-900 mt-1 mb-2 group-hover:text-red-600 transition-colors">{crane.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">{crane.description}</p>

                {/* Specs preview */}
                {crane.specs && Object.keys(crane.specs).length > 0 && (
                  <div className="bg-gray-50 rounded-lg p-3 mb-4 space-y-1">
                    {Object.entries(crane.specs).slice(0, 2).map(([k, v]) => (
                      <div key={k} className="flex justify-between text-xs">
                        <span className="text-gray-500">{k}</span>
                        <span className="text-gray-800 font-semibold">{v}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex gap-2">
                  <Link href="/contact"
                    className="flex-1 bg-red-600 text-white text-sm font-semibold py-2.5 rounded-lg text-center hover:bg-red-700 transition-colors flex items-center justify-center gap-1.5">
                    <MessageCircle className="w-3.5 h-3.5" /> Get Quote
                  </Link>
                  <Link href={`/our-cranes/${crane.slug}`}
                    className="flex-1 border border-gray-200 text-gray-700 text-sm font-semibold py-2.5 rounded-lg text-center hover:border-red-500 hover:text-red-600 transition-colors flex items-center justify-center gap-1.5">
                    View Details <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
