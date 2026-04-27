import { getBlogs } from '@/lib/api';
import Link from 'next/link';
import BlogClient from './BlogClient';

export const revalidate = 60;

export default async function BlogPage({ searchParams }) {
  const { search, category, tag, page = 1 } = searchParams || {};
  const params = new URLSearchParams();
  if (search) params.set('search', search);
  if (category) params.set('category', category);
  if (tag) params.set('tag', tag);
  params.set('page', String(page));
  params.set('limit', '9');

  const res = await getBlogs(`?${params.toString()}`);
  const blogs = res?.data || [];
  const pagination = res?.pagination || {};
  const meta = res?.meta || {};

  return (
    <div className="pt-[70px]">
      {/* Banner */}
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=60"
          alt="Blogs"
          className="w-full h-[260px] object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center text-white text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-2">Blogs</h1>
          <p className="text-white/70 text-sm">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <span className="mx-2">/</span>
            <span className="uppercase tracking-wider">BLOGS</span>
          </p>
        </div>
      </div>

      <BlogClient
        initialBlogs={blogs}
        pagination={pagination}
        meta={meta}
        initialSearch={search || ''}
        initialCategory={category || ''}
        initialTag={tag || ''}
      />
    </div>
  );
}
