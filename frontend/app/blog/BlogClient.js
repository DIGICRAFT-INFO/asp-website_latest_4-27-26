'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, Tag, User, Calendar, Clock, ArrowRight, Filter } from 'lucide-react';

export default function BlogClient({ initialBlogs, pagination, meta, initialSearch, initialCategory, initialTag }) {
  const [search, setSearch] = useState(initialSearch || '');
  const [category, setCategory] = useState(initialCategory || '');
  const [tag, setTag] = useState(initialTag || '');
  const router = useRouter();

  const applyFilter = (params = {}) => {
    const q = new URLSearchParams();
    const s = params.search !== undefined ? params.search : search;
    const c = params.category !== undefined ? params.category : category;
    const t = params.tag !== undefined ? params.tag : tag;
    if (s) q.set('search', s);
    if (c) q.set('category', c);
    if (t) q.set('tag', t);
    router.push(`/blog?${q.toString()}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    applyFilter({ search });
  };

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-4xl font-bold text-slate-900">Industry Insights</h2>
          <p className="text-gray-500 mt-2 text-sm">Expert trends, analysis, and updates across industries</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main content */}
        <div className="flex-1">
          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex gap-2 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search articles..."
                className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              />
            </div>
            <button type="submit" className="bg-red-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-red-700 transition">
              Search
            </button>
            {(search || category || tag) && (
              <button type="button" onClick={() => { setSearch(''); setCategory(''); setTag(''); router.push('/blog'); }}
                className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition">
                Clear
              </button>
            )}
          </form>

          {/* Blog grid */}
          {initialBlogs.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <Search className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <p className="text-xl font-medium">No articles found</p>
              <p className="text-sm mt-2">Try a different search term or category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {initialBlogs.map((blog, i) => (
                <article key={blog._id || i} className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all overflow-hidden border border-gray-100">
                  <div className="aspect-video overflow-hidden">
                    {blog.image ? (
                      <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={e => { e.target.src = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600'; }} />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                        <span className="text-slate-400 text-sm">No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    {blog.category && (
                      <span className="inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white bg-red-600 rounded mb-3">
                        {blog.category}
                      </span>
                    )}
                    <h3 className="text-lg font-bold text-slate-900 leading-snug mb-2 group-hover:text-red-600 transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">{blog.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                      <span className="flex items-center gap-1"><User className="w-3 h-3" />{blog.author}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(blog.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <Link href={`/blog/${blog.slug}`}
                      className="flex items-center gap-2 text-red-600 font-semibold text-sm hover:gap-3 transition-all">
                      Read Article <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="flex justify-center gap-2 mt-10">
              {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(p => (
                <button key={p}
                  onClick={() => router.push(`/blog?page=${p}${search ? `&search=${search}` : ''}${category ? `&category=${category}` : ''}`)}
                  className={`w-10 h-10 rounded-lg font-semibold text-sm transition-all ${pagination.page === p ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="lg:w-64 xl:w-72 space-y-6 flex-shrink-0">
          {/* Categories */}
          {meta.categories?.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-sm">
                <Filter className="w-4 h-4 text-red-500" /> Categories
              </h4>
              <div className="space-y-1">
                <button onClick={() => { setCategory(''); applyFilter({ category: '' }); }}
                  className={`block w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${!category ? 'bg-red-50 text-red-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>
                  All Articles
                </button>
                {meta.categories.map(c => (
                  <button key={c} onClick={() => { setCategory(c); applyFilter({ category: c }); }}
                    className={`block w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${category === c ? 'bg-red-50 text-red-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {meta.tags?.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-sm">
                <Tag className="w-4 h-4 text-red-500" /> Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {meta.tags.slice(0, 15).map(t => (
                  <button key={t} onClick={() => { setTag(t); applyFilter({ tag: t }); }}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${tag === t ? 'bg-red-600 text-white border-red-600' : 'border-gray-200 text-gray-600 hover:border-red-300 hover:text-red-600'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Authors */}
          {meta.authors?.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-sm">
                <User className="w-4 h-4 text-red-500" /> Authors
              </h4>
              <div className="space-y-1">
                {meta.authors.map(a => (
                  <button key={a} onClick={() => applyFilter({ search: a })}
                    className="block w-full text-left text-sm text-gray-600 hover:text-red-600 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                    {a}
                  </button>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}
