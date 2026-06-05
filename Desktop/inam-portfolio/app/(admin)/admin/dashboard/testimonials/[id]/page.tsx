'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

interface Testimonial {
  id?: number;
  client_name: string;
  client_company?: string;
  client_role?: string;
  quote: string;
  image_url?: string;
  rating?: number;
  featured?: boolean;
}

export default function AdminTestimonialFormPage({
  params,
}: {
  params: { id?: string };
}) {
  const [formData, setFormData] = useState<Testimonial>({
    client_name: '',
    client_company: '',
    client_role: '',
    quote: '',
    image_url: '',
    rating: 5,
    featured: false,
  });
  const [loading, setLoading] = useState(params.id ? true : false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const isNew = !params.id || params.id === 'new';

  useEffect(() => {
    if (!isNew && params.id) {
      fetchTestimonial();
    }
  }, [params.id, isNew]);

  const fetchTestimonial = async () => {
    try {
      const response = await fetch(`/api/testimonials/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setFormData(data);
      } else {
        setError('Failed to load testimonial');
      }
    } catch (err) {
      console.error('Error fetching testimonial:', err);
      setError('Failed to load testimonial');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const method = isNew ? 'POST' : 'PUT';
      const url = isNew ? '/api/testimonials' : `/api/testimonials/${params.id}`;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/admin/dashboard/testimonials');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to save testimonial');
      }
    } catch (err) {
      console.error('Submit error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <p className="text-dark-muted">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Header */}
      <header className="bg-dark-900 border-b border-dark-800 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">
              {isNew ? 'New Testimonial' : 'Edit Testimonial'}
            </h1>
          </div>
          <Link href="/admin/dashboard/testimonials" className="btn btn-secondary text-sm">
            ← Back
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Client Name */}
            <div className="card">
              <label className="block text-sm font-medium mb-2">Client Name *</label>
              <input
                type="text"
                name="client_name"
                value={formData.client_name}
                onChange={handleChange}
                required
                className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-3 text-white placeholder-dark-muted focus:outline-none focus:border-primary-500"
                placeholder="John Doe"
              />
            </div>

            {/* Client Company */}
            <div className="card">
              <label className="block text-sm font-medium mb-2">Company</label>
              <input
                type="text"
                name="client_company"
                value={formData.client_company}
                onChange={handleChange}
                className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-3 text-white placeholder-dark-muted focus:outline-none focus:border-primary-500"
                placeholder="Company Name"
              />
            </div>

            {/* Client Role */}
            <div className="card">
              <label className="block text-sm font-medium mb-2">Role</label>
              <input
                type="text"
                name="client_role"
                value={formData.client_role}
                onChange={handleChange}
                className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-3 text-white placeholder-dark-muted focus:outline-none focus:border-primary-500"
                placeholder="CEO, Founder, etc."
              />
            </div>

            {/* Quote */}
            <div className="card">
              <label className="block text-sm font-medium mb-2">Testimonial Quote *</label>
              <textarea
                name="quote"
                value={formData.quote}
                onChange={handleChange}
                required
                rows={4}
                className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-3 text-white placeholder-dark-muted focus:outline-none focus:border-primary-500 resize-none"
                placeholder="What did the client say about the project?"
              />
            </div>

            {/* Image URL */}
            <div className="card">
              <label className="block text-sm font-medium mb-2">Image URL</label>
              <input
                type="url"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-3 text-white placeholder-dark-muted focus:outline-none focus:border-primary-500"
                placeholder="https://example.com/image.jpg"
              />
              <p className="text-dark-muted text-xs mt-2">Optional client photo</p>
            </div>

            {/* Rating */}
            <div className="card">
              <label className="block text-sm font-medium mb-2">Rating</label>
              <select
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500"
              >
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>

            {/* Featured */}
            <div className="card">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-dark-700 bg-dark-800 cursor-pointer"
                />
                <span className="font-medium">Featured on homepage</span>
              </label>
            </div>

            {/* Submit */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Saving...' : 'Save Testimonial'}
              </button>
              <Link href="/admin/dashboard/testimonials" className="btn btn-secondary">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
