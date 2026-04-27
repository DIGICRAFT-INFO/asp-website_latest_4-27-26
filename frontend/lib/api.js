const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function fetchAPI(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...options.headers },
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      console.warn(`API ${endpoint} returned ${res.status}`);
      return null;
    }
    return res.json();
  } catch (err) {
    // In development, show more detail; in prod, fail silently
    if (process.env.NODE_ENV === 'development') {
      console.warn(`API Error [${endpoint}]:`, err.message);
    }
    return null;
  }
}

export const getHomepage   = ()       => fetchAPI('/homepage');
export const getCranes     = (p = '') => fetchAPI(`/cranes${p}`);
export const getCrane      = (slug)   => fetchAPI(`/cranes/${slug}`);
export const getServices   = ()       => fetchAPI('/services');
export const getProjects   = (p = '') => fetchAPI(`/projects${p}`);
export const getBlogs      = (p = '') => fetchAPI(`/blogs${p}`);
export const getBlog       = (slug)   => fetchAPI(`/blogs/${slug}`);
export const getClients    = ()       => fetchAPI('/clients');
export const getFAQs       = ()       => fetchAPI('/faqs');
export const getAbout      = ()       => fetchAPI('/about');
export const getSettings   = ()       => fetchAPI('/settings');

export async function submitContact(data) {
  try {
    const res = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  } catch {
    return { success: false, message: 'Network error. Please try again.' };
  }
}
