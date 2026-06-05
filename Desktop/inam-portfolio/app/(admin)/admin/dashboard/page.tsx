'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface DashboardStats {
  portfolioCount: number;
  testimonialCount: number;
  serviceCount: number;
  blogCount: number;
  messageCount: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    portfolioCount: 0,
    testimonialCount: 0,
    serviceCount: 0,
    blogCount: 0,
    messageCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [portfolio, testimonials, services, blog, messages] = await Promise.all([
        fetch('/api/portfolio'),
        fetch('/api/testimonials'),
        fetch('/api/services'),
        fetch('/api/blog?includeUnpublished=true'),
        fetch('/api/contact'),
      ]);

      const portfolioData = portfolio.ok ? await portfolio.json() : [];
      const testimonialData = testimonials.ok ? await testimonials.json() : [];
      const serviceData = services.ok ? await services.json() : [];
      const blogData = blog.ok ? await blog.json() : [];
      const messageData = messages.ok ? await messages.json() : [];

      setStats({
        portfolioCount: portfolioData.length,
        testimonialCount: testimonialData.length,
        serviceCount: serviceData.length,
        blogCount: blogData.length,
        messageCount: messageData.length,
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
  };

  const dashboardItems = [
    {
      title: 'Portfolio Items',
      count: stats.portfolioCount,
      href: '/admin/dashboard/portfolio',
      icon: '🎨',
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Testimonials',
      count: stats.testimonialCount,
      href: '/admin/dashboard/testimonials',
      icon: '⭐',
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      title: 'Services',
      count: stats.serviceCount,
      href: '/admin/dashboard/services',
      icon: '🛠️',
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Blog Posts',
      count: stats.blogCount,
      href: '/admin/dashboard/blog',
      icon: '📝',
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Messages',
      count: stats.messageCount,
      href: '/admin/dashboard/messages',
      icon: '💬',
      color: 'from-pink-500 to-pink-600',
    },
    {
      title: 'Settings',
      count: 1,
      href: '/admin/dashboard/settings',
      icon: '⚙️',
      color: 'from-gray-500 to-gray-600',
    },
  ];

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Header */}
      <header className="bg-dark-900 border-b border-dark-800 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold gradient-text">Admin Dashboard</h1>
            <p className="text-dark-muted text-sm">Manage your portfolio content</p>
          </div>
          <button
            onClick={handleLogout}
            className="btn btn-secondary text-sm"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-dark-muted">Loading dashboard...</p>
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {dashboardItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="card group hover:scale-105 transition-transform cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl">{item.icon}</span>
                    <span className="text-3xl font-bold text-primary-500">
                      {item.count}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg group-hover:text-primary-500 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-dark-muted text-sm mt-2">
                    Manage →
                  </p>
                </Link>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h2 className="font-semibold text-lg mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link
                  href="/admin/dashboard/portfolio?new=true"
                  className="flex items-center gap-3 p-4 bg-dark-800 hover:bg-dark-700 rounded-lg transition-colors"
                >
                  <span className="text-2xl">➕</span>
                  <span className="font-medium">Add Portfolio Item</span>
                </Link>
                <Link
                  href="/admin/dashboard/testimonials?new=true"
                  className="flex items-center gap-3 p-4 bg-dark-800 hover:bg-dark-700 rounded-lg transition-colors"
                >
                  <span className="text-2xl">➕</span>
                  <span className="font-medium">Add Testimonial</span>
                </Link>
                <Link
                  href="/admin/dashboard/blog?new=true"
                  className="flex items-center gap-3 p-4 bg-dark-800 hover:bg-dark-700 rounded-lg transition-colors"
                >
                  <span className="text-2xl">➕</span>
                  <span className="font-medium">Write Blog Post</span>
                </Link>
                <Link
                  href="/admin/dashboard/services?new=true"
                  className="flex items-center gap-3 p-4 bg-dark-800 hover:bg-dark-700 rounded-lg transition-colors"
                >
                  <span className="text-2xl">➕</span>
                  <span className="font-medium">Add Service</span>
                </Link>
                <Link
                  href="/admin/dashboard/settings"
                  className="flex items-center gap-3 p-4 bg-dark-800 hover:bg-dark-700 rounded-lg transition-colors"
                >
                  <span className="text-2xl">⚙️</span>
                  <span className="font-medium">Update Settings</span>
                </Link>
                <Link
                  href="/"
                  className="flex items-center gap-3 p-4 bg-dark-800 hover:bg-dark-700 rounded-lg transition-colors"
                >
                  <span className="text-2xl">👁️</span>
                  <span className="font-medium">View Website</span>
                </Link>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
