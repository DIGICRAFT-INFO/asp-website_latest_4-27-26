'use client';
import { useState } from 'react';
import Link from 'next/link';
import { submitContact } from '@/lib/api';
import { Phone, Mail, MapPin, Send, Loader2, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', inquiry: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return toast.error('Please fill all required fields');
    setLoading(true);
    try {
      const res = await submitContact(form);
      if (res?.success) { setSubmitted(true); toast.success('Message sent!'); }
      else toast.error(res?.message || 'Failed to send');
    } catch { toast.error('Something went wrong. Please try again.'); }
    setLoading(false);
  };

  const F = (k) => ({ value: form[k], onChange: e => setForm(f => ({ ...f, [k]: e.target.value })) });

  return (
    <div className="pt-[70px]">
      <div className="relative">
        <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=60" alt="Contact" className="w-full h-[260px] object-cover" />
        <div className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center text-white text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-2">Contact Us</h1>
          <p className="text-white/70 text-sm">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="uppercase">CONTACT</span>
          </p>
        </div>
      </div>

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <p className="text-red-600 text-xs font-bold uppercase tracking-widest mb-2">GET IN TOUCH</p>
              <div className="w-16 h-0.5 bg-red-600 mb-4" />
              <h2 className="text-3xl font-black text-slate-900 mb-4">Let's Talk About Your Project</h2>
              <p className="text-gray-600 text-sm leading-relaxed">Whether you need a single crane or a fleet for a major project, our team is ready.</p>
            </div>
            <div className="space-y-5">
              {[
                { Icon: Phone, label: 'Call Us', value: '+91-20-66744700', href: 'tel:+912066744700' },
                { Icon: Phone, label: 'Saudi Arabia', value: '+966 59 705 9690', href: 'tel:+966597059690' },
                { Icon: Mail, label: 'Email', value: 'enquiry@aspcranes.com', href: 'mailto:enquiry@aspcranes.com' },
                { Icon: MapPin, label: 'Address', value: 'Raipur, Chhattisgarh, India', href: '#' },
              ].map((item, i) => (
                <a key={i} href={item.href} className="flex items-start gap-4 group">
                  <div className="w-11 h-11 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-red-600 transition-colors">
                    <item.Icon className="w-5 h-5 text-red-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{item.label}</p>
                    <p className="text-gray-800 font-semibold text-sm">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-20">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Message Sent!</h3>
                <p className="text-gray-500 mb-6">We'll get back to you within 24 hours.</p>
                <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', inquiry: '', message: '' }); }}
                  className="bg-red-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-red-700 transition">Send Another</button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Request a Quote</h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Full Name *</label>
                      <input {...F('name')} required placeholder="Your full name" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-red-500 transition" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Email *</label>
                      <input {...F('email')} type="email" required placeholder="your@email.com" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-red-500 transition" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Phone</label>
                      <input {...F('phone')} type="tel" placeholder="+91 XXXXXXXXXX" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-red-500 transition" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Inquiry Type</label>
                      <select {...F('inquiry')} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-red-500 transition text-gray-700">
                        <option value="">Select type</option>
                        <option>Crane Rental</option>
                        <option>Project Quote</option>
                        <option>Fleet Information</option>
                        <option>Partnership</option>
                        <option>General Enquiry</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Message *</label>
                    <textarea {...F('message')} required rows={5} placeholder="Tell us about your project..." className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-red-500 transition resize-none" />
                  </div>
                  <button type="submit" disabled={loading}
                    className="w-full bg-red-600 text-white font-bold py-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
                    {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Sending...</> : <><Send className="w-4 h-4" />Send Message</>}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
