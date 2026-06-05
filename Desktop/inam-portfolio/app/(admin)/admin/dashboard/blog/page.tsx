'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  published: boolean;
  published_at?: string;
  created_at?: string;
}

export default function AdminBlogPage() {
  const [items, setItems] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const response = await fetch('/api/blog?includeUnpublished=true');
      if (response.ok) {
        const data = await response.json();
        setItems(data);
      }
    } catch (error) {
      console.error('Failed to fetch blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setItems(items.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete blog post:', error);
      alert('Failed to delete blog post');
    }
  };

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Header */}
      <header className="bg-dark-900 border-b border-dark-800 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Blog Posts</h1>
            <p className="text-dark-muted text-sm">Manage your blog articles</p>
          </div>
          <div className="flex gap-4">
            <Link href="/admin/dashboard" className="btn btn-secondary text-sm">
              ← Back
            </Link>
            <Link href="/admin/dashboard/blog/new" className="btn btn-primary text-sm">
              ➕ New Post
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-dark-muted">Loading blog posts...</p>
          </div>
        ) : items.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-800">
                  <th className="text-left py-3 px-4 font-semibold">Title</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                  <th className="text-left py-3 px-4 font-semibold">Date</th>
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
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded ${
                          item.published
                            ? 'bg-primary-500/10 text-primary-400'
                            : 'bg-dark-800 text-dark-muted'
                        }`}
                      >
                        {item.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-dark-muted">
                      {formatDate(item.published_at || item.created_at || '')}
                    </td>
                    <td className="py-4 px-4 flex gap-2">
                      <Link
                        href={`/admin/dashboard/blog/${item.id}`}
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
            <p className="text-dark-muted mb-4">No blog posts yet.</p>
            <Link href="/admin/dashboard/blog/new" className="btn btn-primary">
              Write Your First Post
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
