'use client';
import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { 
  Star, Wrench, FolderOpen, Newspaper, Phone, HelpCircle, 
  TrendingUp, CheckCircle, Eye, BarChart3 
} from 'lucide-react';
import Link from 'next/link';

const StatCard = ({ title, count, icon: Icon, color, href }) => (
  <Link href={href}>
    <div className="stat-card hover:border-slate-600 transition-all cursor-pointer group">
      <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <p className="text-2xl font-bold text-white">{count}</p>
        <p className="text-slate-400 text-xs">{title}</p>
      </div>
    </div>
  </Link>
);

export default function Dashboard() {
  const [stats, setStats] = useState({ cranes: 0, services: 0, projects: 0, blogs: 0, contacts: 0, faqs: 0 });
  const [recentContacts, setRecentContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [cranes, services, projects, blogs, faqs, contacts] = await Promise.allSettled([
          api.get('/cranes/all'),
          api.get('/services/all'),
          api.get('/projects/all'),
          api.get('/blogs/all'),
          api.get('/faqs/all'),
          api.get('/contact'),
        ]);

        setStats({
          cranes: cranes.value?.data?.data?.length || 0,
          services: services.value?.data?.data?.length || 0,
          projects: projects.value?.data?.data?.length || 0,
          blogs: blogs.value?.data?.data?.length || 0,
          faqs: faqs.value?.data?.data?.length || 0,
          contacts: contacts.value?.data?.data?.length || 0,
        });

        if (contacts.value?.data?.data) {
          setRecentContacts(contacts.value.data.data.slice(0, 5));
        }
      } catch (e) {}
      setLoading(false);
    };
    fetchStats();
  }, []);

  const statCards = [
    { title: 'Our Cranes', count: stats.cranes, icon: Star, color: 'bg-red-600', href: '/admin/cranes' },
    { title: 'Services', count: stats.services, icon: Wrench, color: 'bg-orange-600', href: '/admin/services' },
    { title: 'Projects', count: stats.projects, icon: FolderOpen, color: 'bg-blue-600', href: '/admin/projects' },
    { title: 'Blog Posts', count: stats.blogs, icon: Newspaper, color: 'bg-green-600', href: '/admin/blogs' },
    { title: 'FAQs', count: stats.faqs, icon: HelpCircle, color: 'bg-purple-600', href: '/admin/faqs' },
    { title: 'Contacts', count: stats.contacts, icon: Phone, color: 'bg-teal-600', href: '/admin/contacts' },
  ];

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">Welcome to ASP Cranes CMS</p>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3 sm:flex sm:gap-3 sm:flex-wrap">
        {[
          { label: 'Edit Homepage', href: '/admin/homepage', icon: BarChart3 },
          { label: 'Add Crane', href: '/admin/cranes', icon: Star },
          { label: 'New Blog', href: '/admin/blogs', icon: Newspaper },
          { label: 'View Contacts', href: '/admin/contacts', icon: Phone },
        ].map(action => (
          <Link key={action.href} href={action.href}>
            <button className="btn-secondary text-xs sm:text-sm">
              <action.icon className="w-3.5 h-3.5" />
              {action.label}
            </button>
          </Link>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {statCards.map(card => (
          <StatCard key={card.title} {...card} />
        ))}
      </div>

      {/* Recent contacts */}
      <div className="admin-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-white flex items-center gap-2">
            <Phone className="w-4 h-4 text-teal-400" />
            Recent Contact Enquiries
          </h2>
          <Link href="/admin/contacts" className="text-xs text-red-400 hover:text-red-300">
            View All →
          </Link>
        </div>

        {recentContacts.length === 0 ? (
          <p className="text-slate-500 text-sm text-center py-6">No contact submissions yet</p>
        ) : (
          <div className="space-y-3">
            {recentContacts.map(c => (
              <div key={c._id} className="flex items-start gap-3 p-3 bg-slate-900/40 rounded-lg border border-slate-700/30">
                <div className="w-8 h-8 bg-teal-600/20 rounded-full flex items-center justify-center text-teal-400 text-xs font-bold flex-shrink-0">
                  {c.name?.[0]?.toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-white text-sm font-medium">{c.name}</p>
                    {!c.isRead && <span className="badge badge-red">New</span>}
                  </div>
                  <p className="text-slate-400 text-xs truncate">{c.email}</p>
                  <p className="text-slate-500 text-xs mt-1 line-clamp-1">{c.message}</p>
                </div>
                <p className="text-slate-600 text-[10px] flex-shrink-0">
                  {new Date(c.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
