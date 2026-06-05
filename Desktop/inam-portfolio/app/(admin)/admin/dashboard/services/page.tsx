'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Service {
  id: number;
  title: string;
  slug: string;
  description: string;
  icon?: string;
}

export default function AdminServicesPage() {
  const [items, setItems] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services');
      if (response.ok) {
        const data = await response.json();
        setItems(data);
      }
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      const response = await fetch(`/api/services/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setItems(items.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete service:', error);
      alert('Failed to delete service');
    }
  };

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Header */}
      <header className="bg-dark-900 border-b border-dark-800 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Services</h1>
            <p className="text-dark-muted text-sm">Manage your service offerings</p>
          </div>
          <div className="flex gap-4">
            <Link href="/admin/dashboard" className="btn btn-secondary text-sm">
              ← Back
            </Link>
            <Link href="/admin/dashboard/services/new" className="btn btn-primary text-sm">
              ➕ Add New
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-dark-muted">Loading services...</p>
          </div>
        ) : items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((item) => (
              <div key={item.id} className="card">
                <div className="flex items-start justify-between mb-3">
                  {item.icon && <span className="text-4xl">{item.icon}</span>}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-dark-muted text-sm mb-4 line-clamp-2">
                  {item.description}
                </p>
                <p className="text-primary-500 text-xs font-medium mb-4">{item.slug}</p>
                <div className="flex gap-2 pt-4 border-t border-dark-700">
                  <Link
                    href={`/admin/dashboard/services/${item.id}`}
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
            <p className="text-dark-muted mb-4">No services yet.</p>
            <Link href="/admin/dashboard/services/new" className="btn btn-primary">
              Add Your First Service
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
