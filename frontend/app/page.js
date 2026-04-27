import { getHomepage, getCranes, getServices, getProjects, getBlogs, getClients, getFAQs } from '@/lib/api';

import Hero from '@/homepage/Hero';
import About from '@/homepage/About';
import WhoWeAre from '@/homepage/WhoWeAre';
import Products from '@/homepage/Products';   // OUR CRANES
import Services from '@/homepage/Services';   // OUR SERVICES
import Projects from '@/homepage/Projects';
import Advantages from '@/homepage/Advantages';
import Clients from '@/homepage/Clients';     // Trusted Partners / Clients
import BlogSection from '@/homepage/BlogSection'; // Industry Insights
import FAQ from '@/homepage/FAQ';
import CTA from '@/homepage/CTA';             // Get Free Quote
import Contact from '@/homepage/Contact';     // Footer contact section

export const revalidate = 60;

export default async function HomePage() {

  const [
    homepageRes,
    cranesRes,
    servicesRes,
    projectsRes,
    blogsRes,
    clientsRes,
    faqsRes
  ] = await Promise.allSettled([
    getHomepage(),
    getCranes('?limit=6'),
    getServices(),
    getProjects(),
    getBlogs('?limit=3'),
    getClients(),
    getFAQs(),
  ]);

  const hp = homepageRes.value?.data || {};
  const cranes = cranesRes.value?.data || [];
  const services = servicesRes.value?.data || [];
  const projects = projectsRes.value?.data || [];
  const blogs = blogsRes.value?.data || [];
  const clients = clientsRes.value?.data || [];
  const faqs = faqsRes.value?.data || [];

  return (
    <div className="pt-[70px]">

      {/* 1. Hero */}
      <Hero slides={hp.hero?.slides} />

      {/* 2. About */}
      <About data={hp.about} />

      {/* 3. Who We Are */}
      <WhoWeAre data={hp.whoWeAre} />

      {/* 4. OUR CRANES */}
      <Products cranes={cranes} />

      {/* 5. OUR SERVICES */}
      <Services services={services} data={hp.services} />

      {/* 6. Our Projects */}
      <Projects projects={projects} data={hp.projects} />

      {/* 7. Advantages */}
      <Advantages data={hp.advantages} />

      {/* 8. Trusted Partners / Clients */}
      <Clients clients={clients} data={hp.clients} />

      {/* 9. Industry Insights (Blogs) */}
      <BlogSection blogs={blogs} data={hp.blog} />

      {/* 10. FAQ */}
      <FAQ faqs={faqs} data={hp.faq} />

      {/* 11. Get Free Quote */}
      <CTA data={hp.cta} />

      {/* 12. Footer / Contact */}
      <Contact />

    </div>
  );
}


// import { getHomepage, getCranes, getServices, getProjects, getBlogs, getClients, getFAQs } from '@/lib/api';
// import Hero from '@/homepage/Hero';
// import About from '@/homepage/About';
// import WhoWeAre from '@/homepage/WhoWeAre';
// import Services from '@/homepage/Services';
// import Products from '@/homepage/Products';
// import Projects from '@/homepage/Projects';
// import Advantages from '@/homepage/Advantages';
// import Clients from '@/homepage/Clients';
// import BlogSection from '@/homepage/BlogSection';
// import FAQ from '@/homepage/FAQ';
// import CTA from '@/homepage/CTA';
// import Contact from '@/homepage/Contact';

// export const revalidate = 60;

// export default async function HomePage() {
//   const [homepageRes, cranesRes, servicesRes, projectsRes, blogsRes, clientsRes, faqsRes] = await Promise.allSettled([
//     getHomepage(),
//     getCranes('?limit=6'),
//     getServices(),
//     getProjects(),
//     getBlogs('?limit=3'),
//     getClients(),
//     getFAQs(),
//   ]);

//   const hp = homepageRes.value?.data || {};
//   const cranes = cranesRes.value?.data || [];
//   const services = servicesRes.value?.data || [];
//   const projects = projectsRes.value?.data || [];
//   const blogs = blogsRes.value?.data || [];
//   const clients = clientsRes.value?.data || [];
//   const faqs = faqsRes.value?.data || [];

//   return (
//     <div className="pt-[70px]">
//       <Hero slides={hp.hero?.slides} />
//       <About data={hp.about} />
//       <WhoWeAre data={hp.whoWeAre} />
//       <Services services={services} data={hp.services} />
//       <Products cranes={cranes} />
//       <Projects projects={projects} data={hp.projects} />
//       <Advantages data={hp.advantages} />
//       <Clients clients={clients} data={hp.clients} />
//       <BlogSection blogs={blogs} data={hp.blog} />
//       <FAQ faqs={faqs} data={hp.faq} />
//       <CTA data={hp.cta} />
//       <Contact />
//     </div>
//   );
// }
