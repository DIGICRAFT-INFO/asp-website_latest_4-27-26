'use client';
import Link from 'next/link';

export default function CTA({ data }) {
  const title = data?.title || 'Need to rent a crane?';
  const subtitle = data?.subtitle || 'Tell us about your project requirements, and our team will provide the most suitable equipment and pricing.';
  const btnText = data?.btnText || 'Register Now';
  const image = data?.image || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80';

  return (
    <section className="w-full py-12">
      <div className="max-w-7xl relative mx-auto px-4 sm:px-6">
        <div className="bg-gray-100 rounded-xl overflow-hidden">
          <div className="flex flex-col-reverse lg:flex-row items-center min-h-[360px]">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 p-6 sm:p-10 z-10">
              <h2 className="text-2xl sm:text-3xl font-semibold text-black mb-4">{title}</h2>
              <p className="mb-6 text-gray-700 max-w-xl text-sm">{subtitle}</p>
              <Link href="/contact"
                className="flex items-center w-fit border border-gray-800 rounded-sm font-semibold text-gray-900 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all group overflow-hidden">
                <span className="pl-6 pr-2 py-3 text-sm">{btnText}</span>
                <span className="px-4 py-3 bg-red-600 text-white text-xl group-hover:bg-white group-hover:text-gray-900 transition-all">»</span>
              </Link>
            </div>

            {/* Right Image */}
            <div className="relative w-full lg:w-1/2 h-[240px] sm:h-[300px] lg:h-[380px]">
              <img
                src={image}
                alt="Crane"
                className="w-full h-full object-contain lg:object-cover"
                onError={e => { e.target.src = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80'; }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
