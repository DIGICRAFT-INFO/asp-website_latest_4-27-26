import { getProjects } from '@/lib/api';
import Link from 'next/link';
import ProjectsClient from './ProjectsClient';

export const revalidate = 60;

export default async function ProjectsPage({ searchParams }) {
  const { category } = searchParams || {};
  const params = new URLSearchParams();
  if (category) params.set('category', category);

  const res = await getProjects(`?${params.toString()}`);
  const projects = res?.data || [];
  const allCategories = res?.categories || [];

  return (
    <div className="pt-[70px]">
      {/* Banner */}
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=60"
          alt="Projects"
          className="w-full h-[260px] object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center text-white text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-2">Projects</h1>
          <p className="text-white/70 text-sm">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <span className="mx-2">/</span>
            <span className="uppercase tracking-wider">PROJECTS</span>
          </p>
        </div>
      </div>

      <ProjectsClient
        initialProjects={projects}
        allCategories={allCategories}
        initialCategory={category || ''}
      />
    </div>
  );
}
