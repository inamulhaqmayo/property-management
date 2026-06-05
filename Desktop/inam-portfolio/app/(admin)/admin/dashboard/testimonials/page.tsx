'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Testimonial {
  id: number;
  client_name: string;
  client_company?: string;
  client_role?: string;
  quote: string;
  rating?: number;
  featured?: boolean;
}

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials');
      if (response.ok) {
        const data = await response.json();
        setItems(data);
      }
    } catch (error) {
      console.error('Failed to fetch testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    try {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setItems(items.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete testimonial:', error);
      alert('Failed to delete testimonial');
    }
  };

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Header */}
      <header className="bg-dark-900 border-b border-dark-800 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Testimonials</h1>
            <p className="text-dark-muted text-sm">Manage client reviews and testimonials</p>
          </div>
          <div className="flex gap-4">
            <Link href="/admin/dashboard" className="btn btn-secondary text-sm">
              ← Back
            </Link>
            <Link href="/admin/dashboard/testimonials/new" className="btn btn-primary text-sm">
              ➕ Add New
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-dark-muted">Loading testimonials...</p>
          </div>
        ) : items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((item) => (
              <div key={item.id} className="card">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold">{item.client_name}</h3>
                    {item.client_role && (
                      <p className="text-dark-muted text-sm">{item.client_role}</p>
                    )}
                    {item.client_company && (
                      <p className="text-primary-500 text-sm font-medium">{item.client_company}</p>
                    )}
                  </div>
                  {item.featured && (
                    <span className="text-primary-500 text-lg">★</span>
                  )}
                </div>
                <p className="text-dark-muted italic mb-4">"{item.quote}"</p>
                <div className="flex items-center gap-2">
                  {item.rating && (
                    <div className="flex gap-1">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <span key={i} className="text-primary-400">★</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex gap-2 mt-4 pt-4 border-t border-dark-700">
                  <Link
                    href={`/admin/dashboard/testimonials/${item.id}`}
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
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 card">
            <p className="text-dark-muted mb-4">No testimonials yet.</p>
            <Link href="/admin/dashboard/testimonials/new" className="btn btn-primary">
              Add Your First Testimonial
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
