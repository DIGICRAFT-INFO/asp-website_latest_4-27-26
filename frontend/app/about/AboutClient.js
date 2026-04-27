'use client';
import Link from 'next/link';
import { Target, Eye } from 'lucide-react';

// Screenshot shows: left side has tagline, big title, paragraph, bullet list (Safety First, Integrity etc),
// mission/vision boxes, About Us button | right side has crane image

export default function AboutClient({ about, services }) {
  const s1 = about?.section1 || {};

  const tagline = s1.tagline || 'ABOUT US';
  const title = s1.title || 'WE BUILD EVERYTHING THAT YOU NEED';
  const description = s1.paragraphs?.[0] || 'ASP Cranes is a leading crane rental and heavy lifting service provider, delivering professional solutions to India\'s infrastructure and industrial sectors. Our operations are driven by technical expertise, safety awareness, and customer satisfaction.';
  const highlights = s1.highlights?.length ? s1.highlights : [
    'Safety First',
    'Integrity & Transparency',
    'Professional Excellence',
    'Customer Commitment',
    'Continuous Improvement',
  ];
  const mission = about?.mission || 'To deliver reliable, safe, and innovative lifting solutions that support our clients\' project success.';
  const vision = about?.vision || 'To become one of India\'s most trusted and technologically advanced crane rental companies.';
  const btnText = s1.btnText || 'About Us';
  const btnLink = s1.btnLink || '/contact';
  const image = s1.image || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80';

  return (
    <>
      {/* ── Section 1: About (matches screenshot) ── */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          {/* Left Content */}
          <div>
            <p className="text-red-500 text-sm font-bold uppercase tracking-widest flex items-center gap-2 mb-4">
              <span>🏗</span>
              <span>{tagline}</span>
            </p>
            <div className="w-16 h-0.5 bg-red-600 mb-4" />

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-6 uppercase">
              {title}
            </h2>

            <p className="text-gray-500 text-sm leading-relaxed mb-6">{description}</p>

            {/* Bullet highlights */}
            <ul className="space-y-2 mb-8">
              {highlights.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700 text-sm">
                  <span className="w-4 h-4 rounded-full border-2 border-orange-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            {/* Mission + Vision boxes */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Our Mission</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">{mission}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <Eye className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Our Vision</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">{vision}</p>
                </div>
              </div>
            </div>

            {/* Button */}
            <Link href={btnLink}
              className="flex items-center w-fit border border-gray-800 rounded-sm font-semibold text-gray-900 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all group overflow-hidden">
              <span className="pl-6 pr-2 py-3 text-sm">{btnText}</span>
              <span className="px-4 py-3 bg-red-600 text-white text-xl group-hover:bg-white group-hover:text-gray-900 transition-all">»</span>
            </Link>
          </div>

          {/* Right: Crane Image */}
          <div>
            <img
              src={image}
              alt="ASP Cranes"
              className="w-full rounded-lg object-cover shadow-md"
              style={{ maxHeight: '500px' }}
              onError={e => { e.target.src = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80'; }}
            />
          </div>
        </div>
      </section>

      {/* ── Services Section below (as seen in screenshot) ── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
            <h2 className="text-3xl font-bold text-gray-900">
              Our services that<br />we provide
            </h2>
            <Link href="/services"
              className="flex items-center border border-gray-800 rounded-sm font-semibold text-gray-900 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all group overflow-hidden">
              <span className="pl-5 pr-2 py-2.5 text-sm">Know More</span>
              <span className="px-4 py-2.5 bg-red-600 text-white text-xl group-hover:bg-white group-hover:text-gray-900 transition-all">»</span>
            </Link>
          </div>

          {services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.slice(0, 6).map((svc, i) => (
                <div key={svc._id || i} className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-2xl mb-4">
                    🏗️
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{svc.title}</h3>
                  <p className="text-gray-500 text-sm">{svc.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {['Shifting & Loading', 'Crane Rental', 'Winch Handling', 'Material Handling', 'Jacking & Leveling', 'Operations & Maintenance'].map((t, i) => (
                <div key={i} className="bg-white rounded-xl p-6 border border-gray-100">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-2xl mb-4">🏗️</div>
                  <h3 className="font-bold text-gray-900">{t}</h3>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
