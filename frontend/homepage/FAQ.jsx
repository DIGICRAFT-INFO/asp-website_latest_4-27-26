'use client';
import React, { useState } from 'react';

const DEFAULT_FAQS = [
  { question: 'Do you provide crane operators?', answer: 'Yes, all equipment rentals include experienced and certified operators.' },
  { question: 'Can you handle large industrial projects?', answer: 'Absolutely. Our fleet and technical team are equipped for complex and heavy-duty projects.' },
  { question: 'Is safety compliance ensured?', answer: 'Yes, safety is our top priority with regular inspections and standard operating procedures.' },
  { question: 'What is your service coverage area?', answer: 'We provide services across major industrial regions in India with rapid deployment capabilities.' },
  { question: 'Do you offer emergency rental services?', answer: 'Yes, we have 24/7 emergency support with quick mobilization for urgent requirements.' },
];

export default function FAQ({ faqs, data }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const items = faqs?.length ? faqs : DEFAULT_FAQS;
  const tagline = data?.tagline || 'GOT QUESTIONS?';
  const title = data?.title || 'Frequently Asked Questions';
  const subtitle = data?.subtitle || 'Find answers to common questions about our services and operations';

  return (
    <section className="w-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 py-24 relative overflow-hidden">
      <div className="absolute top-20 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
      <div className="absolute -bottom-20 left-0 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-red-600 uppercase tracking-wider mb-3">{tagline}</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked <span className="text-red-600">Questions</span>
          </h2>
          {subtitle && <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">{subtitle}</p>}
        </div>

        <div className="space-y-5">
          {items.map((faq, index) => (
            <div key={faq._id || index}
              className={`group border-2 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden ${activeIndex === index ? 'border-black shadow-lg' : 'border-gray-100 hover:border-blue-200'}`}>
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full flex justify-between items-center p-6 text-left group-hover:bg-blue-50/50 transition-colors"
              >
                <div className="flex items-start gap-4 flex-1">
                  <span className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-all ${activeIndex === index ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                    {index + 1}
                  </span>
                  <span className={`font-semibold text-lg ${activeIndex === index ? 'text-red-600' : 'text-gray-800'}`}>
                    {faq.question}
                  </span>
                </div>
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all ${activeIndex === index ? 'bg-red-600 text-white rotate-180' : 'bg-gray-100 text-red-500'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              <div className={`overflow-hidden transition-all duration-500 ${activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-6 pb-6 pt-2">
                  <div className="pl-12">
                    <div className="h-px w-full bg-gradient-to-r from-blue-200 to-transparent mb-4" />
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
