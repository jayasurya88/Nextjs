import Link from 'next/link';
import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
      <nav className="w-64 bg-white dark:bg-gray-800 p-6 flex flex-col space-y-4 shadow-lg">
        <h2 className="text-2xl font-bold mb-8 text-blue-600 dark:text-blue-300">Admin Dashboard</h2>
        <Link href="/admin/hero" className="hover:text-blue-500">Hero</Link>
        <Link href="/admin/about" className="hover:text-blue-500">About</Link>
        <Link href="/admin/projects" className="hover:text-blue-500">Projects</Link>
        <Link href="/admin/services" className="hover:text-blue-500">Services</Link>
        <Link href="/admin/contact" className="hover:text-blue-500">Contact</Link>
        <Link href="/admin/logout" className="mt-auto text-red-500 hover:text-red-700">Logout</Link>
      </nav>
      <main className="flex-1 p-10 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">{children}</main>
    </div>
  );
} 