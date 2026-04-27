import { getCranes } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import CranesClient from './CranesClient';
import Products from '@/homepage/Products'; 
import Contact from '@/homepage/Contact';

export const revalidate = 60;

const CATEGORIES = ['tower', 'truck-mounted', 'crawler', 'pick-carry', 'awp', 'trailer'];

export default async function OurCranesPage({ searchParams }) {
  const { category, search } = searchParams || {};
  const params = new URLSearchParams();
  if (category) params.set('category', category);
  if (search) params.set('search', search);

  const res = await getCranes(`?${params.toString()}`);
  const cranes = res?.data || [];

  return (
    <div className="pt-[70px] bg-white">
      {/* 1. HERO BANNER */}
      <div className="relative h-[300px] md:h-[400px] w-full">
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=60"
          alt="Our Cranes Banner"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white bg-black/60">
          <h1 className="mb-4 text-4xl font-black tracking-tight md:text-6xl">Our Cranes</h1>
          <nav className="flex items-center gap-2 text-sm font-medium md:text-base">
            <Link href="/" className="transition-colors hover:text-red-500">Home</Link>
            <ChevronRight className="w-4 h-4 text-red-500" />
            <span className="tracking-widest text-gray-300 uppercase">Our Cranes</span>
          </nav>
        </div>
      </div>

      {/* 2. OUR FLEET / PRODUCTS SLIDER (Moved to First) */}
      <Products cranes={cranes} />

      {/* 3. ABOUT SECTION (With public/appourcranes.png) */}
      <section className="w-full px-4 py-20 mx-auto border-t border-gray-100 md:px-8 max-w-7xl">
        <div className="grid items-center grid-cols-1 gap-12 md:grid-cols-2">
          <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-xl">
            <Image 
              src="/appourcranes.png" 
              alt="ASP Cranes Fleet" 
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-6">
            <div className="inline-block">
              <p className="flex items-center gap-2 text-sm font-bold tracking-widest text-red-600 uppercase">
                <span className="w-8 h-[2px] bg-red-600"></span>
                Our Cranes
              </p>
            </div>
            <h2 className="text-3xl font-black leading-tight md:text-5xl text-slate-900">
              Our Commitment To <br/> Excellence Construction
            </h2>
            <p className="leading-relaxed text-gray-600">
              ASP Cranes (Aadishakti Projects) is a professionally managed crane rental company headquartered in Raipur, Chhattisgarh. We specialize in providing advanced lifting solutions using a diverse fleet of cranes and access equipment.
            </p>
            <Link href="/about" className="inline-flex items-center group">
              <span className="px-8 py-3 font-bold text-white transition-colors bg-red-600 rounded-l-full group-hover:bg-red-700">
                About Us
              </span>
              <span className="p-3 text-white rounded-r-full bg-slate-900">
                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. FILTERABLE INVENTORY */}
      <div className="py-16 bg-gray-50">
        <div className="px-4 mx-auto max-w-7xl">
          <CranesClient
            initialCranes={cranes}
            categories={CATEGORIES}
            initialCategory={category || ''}
            initialSearch={search || ''}
          />
        </div>
      </div>

      {/* 5. CONTACT SECTION */}
      <Contact />
    </div>
  );
}
