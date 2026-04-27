'use client';
import { useState, useEffect } from 'react';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { Globe, Save, Plus, Trash2, Loader2, ChevronDown, ChevronUp } from 'lucide-react';

const Section = ({ title, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="admin-card overflow-hidden p-0">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-700/20 transition-colors">
        <h3 className="text-white font-semibold text-sm">{title}</h3>
        {open ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
      </button>
      {open && <div className="px-5 pb-5 border-t border-slate-700/40 pt-4 space-y-4">{children}</div>}
    </div>
  );
};

export default function HomepagePage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get('/homepage').then(r => setData(r.data.data)).catch(() => toast.error('Failed to load')).finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put('/homepage', data);
      toast.success('Homepage updated! Changes are live.');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    }
    setSaving(false);
  };

  const set = (path, value) => {
    setData(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      let obj = next;
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
      obj[keys[keys.length - 1]] = value;
      return next;
    });
  };

  const addSlide = () => {
    setData(prev => ({
      ...prev,
      hero: {
        ...prev.hero,
        slides: [...(prev.hero?.slides || []), { title: '', subtitle: 'WE PROVIDE CRANE RENTAL SERVICES', description: '', btn1Text: 'About Company', btn1Link: '/about', btn2Text: 'Get a Quote', btn2Link: '/contact', image: '', isActive: true, order: 0 }]
      }
    }));
  };

  const removeSlide = (i) => {
    setData(prev => ({ ...prev, hero: { ...prev.hero, slides: prev.hero.slides.filter((_, idx) => idx !== i) } }));
  };

  const setSlide = (i, key, val) => {
    setData(prev => {
      const slides = [...(prev.hero?.slides || [])];
      slides[i] = { ...slides[i], [key]: val };
      return { ...prev, hero: { ...prev.hero, slides } };
    });
  };

  if (loading) return <div className="flex items-center justify-center py-24"><Loader2 className="w-8 h-8 animate-spin text-red-400" /></div>;
  if (!data) return <div className="text-center py-24 text-slate-500">Failed to load homepage data</div>;

  const I = (path, placeholder = '') => ({
    value: path.split('.').reduce((o, k) => o?.[k], data) || '',
    onChange: e => set(path, e.target.value),
    className: 'admin-input',
    placeholder,
  });

  const TA = (path, placeholder = '', rows = 3) => ({
    value: path.split('.').reduce((o, k) => o?.[k], data) || '',
    onChange: e => set(path, e.target.value),
    className: 'admin-input resize-none',
    rows,
    placeholder,
  });

  return (
    <div className="animate-fade-in space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2"><Globe className="w-5 h-5 text-red-400" /> Homepage Editor</h1>
          <p className="text-slate-400 text-xs">Changes reflect live on the website</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="btn-primary">
          {saving ? <><Loader2 className="w-4 h-4 animate-spin" />Saving...</> : <><Save className="w-4 h-4" />Save All Changes</>}
        </button>
      </div>

      {/* Hero Slides */}
      <Section title="🎯 Hero Slider" defaultOpen>
        {(data.hero?.slides || []).map((slide, i) => (
          <div key={i} className="bg-slate-900/60 rounded-xl p-4 border border-slate-700/40 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Slide {i + 1}</span>
              <button onClick={() => removeSlide(i)} className="btn-danger p-1.5"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="admin-label">Title</label><input className="admin-input" value={slide.title} onChange={e => setSlide(i, 'title', e.target.value)} placeholder="Crane type name" /></div>
              <div><label className="admin-label">Subtitle (red text)</label><input className="admin-input" value={slide.subtitle} onChange={e => setSlide(i, 'subtitle', e.target.value)} /></div>
              <div className="col-span-2"><label className="admin-label">Description</label><textarea className="admin-input resize-none" rows={2} value={slide.description} onChange={e => setSlide(i, 'description', e.target.value)} /></div>
              <div><label className="admin-label">Image URL</label><input className="admin-input" value={slide.image} onChange={e => setSlide(i, 'image', e.target.value)} placeholder="https://..." /></div>
              <div><label className="admin-label">Button 1 Text</label><input className="admin-input" value={slide.btn1Text} onChange={e => setSlide(i, 'btn1Text', e.target.value)} /></div>
              <div><label className="admin-label">Button 1 Link</label><input className="admin-input" value={slide.btn1Link} onChange={e => setSlide(i, 'btn1Link', e.target.value)} /></div>
              <div><label className="admin-label">Button 2 Text</label><input className="admin-input" value={slide.btn2Text} onChange={e => setSlide(i, 'btn2Text', e.target.value)} /></div>
              <div><label className="admin-label">Button 2 Link</label><input className="admin-input" value={slide.btn2Link} onChange={e => setSlide(i, 'btn2Link', e.target.value)} /></div>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={!!slide.isActive} onChange={e => setSlide(i, 'isActive', e.target.checked)} className="rounded" />
              <span className="text-slate-300 text-sm">Active</span>
            </label>
          </div>
        ))}
        <button onClick={addSlide} className="btn-secondary w-full justify-center"><Plus className="w-4 h-4" /> Add Slide</button>
      </Section>

      {/* About Section */}
      <Section title="📌 About Section">
        <div><label className="admin-label">Tagline (small red text)</label><input {...I('about.tagline', 'ABOUT US')} /></div>
        <div><label className="admin-label">Title</label><input {...I('about.title', 'Our Commitment To Excellence...')} /></div>
        <div>
          <label className="admin-label">Paragraphs (one per line)</label>
          <textarea
            className="admin-input resize-none" rows={5}
            value={(data.about?.paragraphs || []).join('\n')}
            onChange={e => set('about.paragraphs', e.target.value.split('\n'))}
            placeholder="Each line becomes a paragraph..."
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="admin-label">Button Text</label><input {...I('about.btnText', 'About Us')} /></div>
          <div><label className="admin-label">Button Link</label><input {...I('about.btnLink', '/about')} /></div>
        </div>
        <div><label className="admin-label">Section Image URL</label><input {...I('about.image', 'https://...')} /></div>
      </Section>

      {/* Services Section */}
      <Section title="⚙️ Services Section Header">
        <div><label className="admin-label">Tagline</label><input {...I('services.tagline', 'OUR SERVICES')} /></div>
        <div><label className="admin-label">Title</label><input {...I('services.title')} /></div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="admin-label">Button Text</label><input {...I('services.btnText', 'See More')} /></div>
          <div><label className="admin-label">Button Link</label><input {...I('services.btnLink', '/services')} /></div>
        </div>
        <p className="text-slate-500 text-xs">Services content is managed in the Services section.</p>
      </Section>

      {/* Advantages Section */}
      <Section title="✅ Advantages Section">
        <div><label className="admin-label">Title</label><input {...I('advantages.title', 'Advantages of Renting')} /></div>
        <div><label className="admin-label">Subtitle</label><input {...I('advantages.subtitle', 'through the ASP Cranes platform')} /></div>
        <div>
          <label className="admin-label">Customer Points (one per line)</label>
          <textarea className="admin-input resize-none" rows={4}
            value={(data.advantages?.customerPoints || []).join('\n')}
            onChange={e => set('advantages.customerPoints', e.target.value.split('\n').filter(Boolean))}
          />
        </div>
        <div>
          <label className="admin-label">Rental Company Points (one per line)</label>
          <textarea className="admin-input resize-none" rows={4}
            value={(data.advantages?.rentalPoints || []).join('\n')}
            onChange={e => set('advantages.rentalPoints', e.target.value.split('\n').filter(Boolean))}
          />
        </div>
        <div><label className="admin-label">Image URL</label><input {...I('advantages.image')} /></div>
        <div><label className="admin-label">Button Text</label><input {...I('advantages.btnText', 'Register Now')} /></div>
      </Section>

      {/* Blog Section Header */}
      <Section title="📰 Blog Section Header">
        <div><label className="admin-label">Title</label><input {...I('blog.title', 'Industry Insights')} /></div>
        <div><label className="admin-label">Subtitle</label><input {...I('blog.subtitle')} /></div>
        <div><label className="admin-label">Button Text</label><input {...I('blog.btnText', 'Know More')} /></div>
      </Section>

      {/* FAQ Header */}
      <Section title="❓ FAQ Section Header">
        <div><label className="admin-label">Tagline</label><input {...I('faq.tagline', 'GOT QUESTIONS?')} /></div>
        <div><label className="admin-label">Title</label><input {...I('faq.title')} /></div>
        <div><label className="admin-label">Subtitle</label><input {...I('faq.subtitle')} /></div>
      </Section>

      {/* CTA Section */}
      <Section title="🔔 CTA Banner">
        <div><label className="admin-label">Title</label><input {...I('cta.title', 'Need to rent a crane?')} /></div>
        <div><label className="admin-label">Subtitle</label><input {...I('cta.subtitle')} /></div>
        <div><label className="admin-label">Button Text</label><input {...I('cta.btnText', 'Register Now')} /></div>
        <div><label className="admin-label">Image URL</label><input {...I('cta.image')} /></div>
      </Section>

      {/* Save button at bottom */}
      <div className="flex justify-end pb-6">
        <button onClick={handleSave} disabled={saving} className="btn-primary px-8 py-3">
          {saving ? <><Loader2 className="w-4 h-4 animate-spin" />Saving...</> : <><Save className="w-4 h-4" />Save All Changes</>}
        </button>
      </div>
    </div>
  );
}
