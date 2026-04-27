'use client';
import Link from 'next/link';

const FALLBACK_BLOGS = [
  { title: 'Top 5 Safety Protocols for High-Rise Lifts', category: 'Safety', excerpt: 'Ensuring crew safety and load stability during complex urban maneuvers.', image: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=600&q=80', slug: 'safety-protocols' },
  { title: 'Mobile vs. Tower Cranes: Choosing the Right Rig', category: 'Fleet', excerpt: 'A comprehensive guide to selecting the most cost-effective crane for your project.', image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80', slug: 'mobile-vs-tower-cranes' },
  { title: 'The Future of Remote-Operated Lifting', category: 'Innovation', excerpt: 'How digital twins and IoT are revolutionizing efficiency on modern construction sites.', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80', slug: 'future-remote-lifting' },
];

export default function BlogSection({ blogs, data }) {
  const items = blogs?.length ? blogs : FALLBACK_BLOGS;
  const title = data?.title || 'Industry Insights';
  const subtitle = data?.subtitle || 'Expert trends, analysis, and updates across industries';
  const btnText = data?.btnText || 'Know More';

  return (
    <section className="w-full py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading row */}
        <div className="flex justify-between items-end mb-10 flex-wrap gap-4">
          <div>
            <h2 className="text-4xl font-bold text-gray-900">{title}</h2>
            <p className="text-gray-500 mt-2 text-sm">{subtitle}</p>
          </div>
          <Link href="/blog"
            className="flex items-center border border-gray-800 rounded-sm font-semibold text-gray-900 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all group overflow-hidden flex-shrink-0">
            <span className="pl-5 pr-2 py-2.5 text-sm">{btnText}</span>
            <span className="px-4 py-2.5 bg-red-600 text-white text-xl group-hover:bg-white group-hover:text-gray-900 transition-all">»</span>
          </Link>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.slice(0, 3).map((blog, i) => (
            <article key={blog._id || i} className="group bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-all">
              <div className="aspect-video overflow-hidden">
                <img
                  src={blog.image || FALLBACK_BLOGS[i % 3]?.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={e => { e.target.src = FALLBACK_BLOGS[i % 3]?.image; }}
                />
              </div>
              <div className="p-6">
                <span className="inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white bg-red-600 rounded mb-3">
                  {blog.category}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug group-hover:text-red-600 transition-colors line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{blog.excerpt}</p>
                <Link href={`/blog/${blog.slug || '#'}`}
                  className="text-sm font-semibold text-gray-700 hover:text-red-600 transition-colors">
                  Read Article →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
