'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface PortfolioItem {
  id: number;
  title: string;
  slug: string;
  description: string;
  category?: string;
  featured?: boolean;
  created_at?: string;
}

export default function AdminPortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    fetchPortfolioItems();
  }, []);

  const fetchPortfolioItems = async () => {
    try {
      const response = await fetch('/api/portfolio');
      if (response.ok) {
        const data = await response.json();
        setItems(data);
      }
    } catch (error) {
      console.error('Failed to fetch portfolio items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const response = await fetch(`/api/portfolio/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setItems(items.filter((item) => item.id !== id));
        setDeleteId(null);
      }
    } catch (error) {
      console.error('Failed to delete item:', error);
      alert('Failed to delete item');
    }
  };

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Header */}
      <header className="bg-dark-900 border-b border-dark-800 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Portfolio Items</h1>
            <p className="text-dark-muted text-sm">Manage your case studies and projects</p>
          </div>
          <div className="flex gap-4">
            <Link href="/admin/dashboard" className="btn btn-secondary text-sm">
              ← Back
            </Link>
            <Link href="/admin/dashboard/portfolio/new" className="btn btn-primary text-sm">
              ➕ Add New
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-dark-muted">Loading portfolio items...</p>
          </div>
        ) : items.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-800">
                  <th className="text-left py-3 px-4 font-semibold">Title</th>
                  <th className="text-left py-3 px-4 font-semibold">Category</th>
                  <th className="text-left py-3 px-4 font-semibold">Featured</th>
                  <th className="text-left py-3 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-dark-800 hover:bg-dark-900/50">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-dark-muted text-sm">{item.slug}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-dark-muted text-sm">{item.category || '—'}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`text-sm ${item.featured ? 'text-primary-500' : 'text-dark-muted'}`}>
                        {item.featured ? '★' : '☆'}
                      </span>
                    </td>
                    <td className="py-4 px-4 flex gap-2">
                      <Link
                        href={`/admin/dashboard/portfolio/${item.id}`}
                        className="text-primary-500 hover:text-primary-400 text-sm font-medium"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-500 hover:text-red-400 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 card">
            <p className="text-dark-muted mb-4">No portfolio items yet.</p>
            <Link href="/admin/dashboard/portfolio/new" className="btn btn-primary">
              Create Your First Project
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
