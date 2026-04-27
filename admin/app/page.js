// app/page.js
import { redirect } from 'next/navigation';

export default function RootPage() {
  // Automatically route users to the dashboard.
  // The layout's auth check will handle redirecting to /login if needed.
  redirect('/admin/dashboard');
}