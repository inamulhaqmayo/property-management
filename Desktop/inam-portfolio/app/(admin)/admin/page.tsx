'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard
    router.push('/admin/dashboard');
  }, [router]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <p className="text-white">Redirecting to dashboard...</p>
    </div>
  );
}
