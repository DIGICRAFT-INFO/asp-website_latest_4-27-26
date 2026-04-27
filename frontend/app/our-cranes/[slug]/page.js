import { getCrane, getCranes } from '@/lib/api';
import Link from 'next/link';
import { MessageCircle, ChevronLeft } from 'lucide-react';

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const res = await getCranes('?limit=50');
    return (res?.data || []).map(c => ({ slug: c.slug }));
  } catch { return []; }
}

export default async function CraneDetailPage({ params }) {
  const { slug } = params;
  let crane = null;
  try {
    const res = await getCrane(slug);
    crane = res?.data;
  } catch {}

  if (!crane) {
    return (
      <div className="pt-[70px] min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Crane Not Found</h1>
        <Link href="/our-cranes" className="text-red-600 font-semibold hover:underline">← Back to Fleet</Link>
      </div>
    );
  }

  return (
    <div className="pt-[70px]">
      {/* Banner */}
      <div className="relative">
        <img src={crane.image || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=60'} alt={crane.name}
          className="w-full h-[300px] object-cover" onError={e => { e.target.src = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600'; }} />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-center">
          <h1 className="text-3xl md:text-4xl font-black mb-2">{crane.name}</h1>
          <p className="text-white/70 text-sm">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/our-cranes" className="hover:text-white">Our Cranes</Link>
            <span className="mx-2">/</span>
            <span className="uppercase">{crane.name}</span>
          </p>
        </div>
      </div>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <Link href="/our-cranes" className="inline-flex items-center gap-2 text-red-600 font-semibold mb-8 hover:gap-3 transition-all text-sm">
          <ChevronLeft className="w-4 h-4" /> Back to Fleet
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div>
            <img src={crane.image} alt={crane.name}
              className="w-full rounded-2xl shadow-lg object-cover aspect-video"
              onError={e => { e.target.src = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800'; }} />
            {crane.badge && (
              <span className="inline-block mt-4 bg-red-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded">{crane.badge}</span>
            )}
          </div>

          {/* Details */}
          <div>
            <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">{crane.category}</span>
            <h1 className="text-3xl font-black text-slate-900 mt-1 mb-3">{crane.name}</h1>
            {crane.subtitle && <p className="text-red-600 font-semibold mb-4">{crane.subtitle}</p>}
            <p className="text-gray-600 leading-relaxed mb-6 text-sm">{crane.description}</p>

            {/* Specs */}
            {crane.specs && Object.keys(crane.specs).length > 0 && (
              <div className="mb-6">
                <h3 className="text-base font-bold text-slate-900 mb-3">Technical Specifications</h3>
                <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                  {Object.entries(crane.specs).map(([k, v], i) => (
                    <div key={k} className={`flex justify-between px-5 py-3 text-sm ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                      <span className="text-gray-500 font-medium">{k}</span>
                      <span className="text-gray-900 font-semibold">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            {crane.features?.length > 0 && (
              <div className="mb-6">
                <h3 className="text-base font-bold text-slate-900 mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {crane.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0" />{f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA */}
            <div className="flex gap-3">
              <Link href="/contact"
                className="flex items-center gap-2 bg-red-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-red-700 transition-colors">
                <MessageCircle className="w-4 h-4" /> Get Quote
              </Link>
              <Link href="/our-cranes"
                className="flex items-center gap-2 border border-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-lg hover:border-red-500 hover:text-red-600 transition-colors">
                View All Cranes
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
