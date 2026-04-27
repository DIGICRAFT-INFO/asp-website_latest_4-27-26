'use client';
import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { submitContact } from '@/lib/api';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await submitContact({ ...form, inquiry: form.service });
      if (res?.success) setSent(true);
    } catch {}
    setLoading(false);
  };

  const F = (k) => ({ value: form[k], onChange: e => setForm(f => ({ ...f, [k]: e.target.value })) });

  return (
    <section className="relative w-full flex items-center bg-white overflow-hidden min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80"
          alt="Construction"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-black/30 via-white/90 to-white md:from-transparent md:via-white/60 md:to-white" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 flex justify-center md:justify-end">
        <div className="w-full max-w-xl bg-white/95 md:bg-transparent p-6 sm:p-8 rounded-xl md:rounded-none shadow-lg md:shadow-none">
          <div className="mb-8">
            <button className="flex items-center text-orange-600 font-bold text-xs tracking-widest uppercase mb-4">
              Get Free Quote
              <ArrowUpRight className="ml-1 w-4 h-4" />
            </button>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
              Have a project in mind?
            </h2>
          </div>

          {sent ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 text-2xl">✓</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
              <p className="text-gray-600 text-sm">We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input {...F('name')} required type="text" placeholder="Your Name" className="w-full p-4 bg-gray-100 outline-none text-gray-700 focus:ring-2 focus:ring-red-400 rounded" />
                <input {...F('email')} required type="email" placeholder="Email Address" className="w-full p-4 bg-gray-100 outline-none text-gray-700 focus:ring-2 focus:ring-red-400 rounded" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input {...F('phone')} type="tel" placeholder="Phone Number" className="w-full p-4 bg-gray-100 outline-none text-gray-700 focus:ring-2 focus:ring-red-400 rounded" />
                <select {...F('service')} className="w-full p-4 bg-gray-100 outline-none text-gray-700 focus:ring-2 focus:ring-red-400 rounded">
                  <option value="">Select Service</option>
                  <option>Tower Crane Rental</option>
                  <option>Truck-Mounted Crane</option>
                  <option>Crawler Crane</option>
                  <option>AWP Rental</option>
                  <option>Shifting & Loading</option>
                  <option>Other</option>
                </select>
              </div>
              <textarea {...F('message')} rows={4} placeholder="Project Details / Message" className="w-full p-4 bg-gray-100 outline-none text-gray-700 focus:ring-2 focus:ring-red-400 rounded resize-none" />
              <button type="submit" disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded transition-colors disabled:opacity-60">
                {loading ? 'Sending...' : 'Send Message →'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
