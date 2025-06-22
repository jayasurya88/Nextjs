"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isAuth = localStorage.getItem('admin-auth') === 'true';
      if (!isAuth) {
        router.replace('/admin/login');
      }
    }
  }, [router]);

  return <>{children}</>;
} 