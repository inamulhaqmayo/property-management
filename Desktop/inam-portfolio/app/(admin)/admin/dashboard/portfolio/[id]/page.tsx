'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { slugify } from '@/lib/utils';

interface PortfolioItem {
  id?: number;
  title: string;
  slug: string;
  description: string;
  challenge?: string;
  solution?: string;
  results?: string;
  images?: string[];
  live_link?: string;
  technologies?: string;
  category?: string;
  featured?: boolean;
}

export default function AdminPortfolioFormPage({
  params,
}: {
  params: { id?: string };
}) {
  const [formData, setFormData] = useState<PortfolioItem>({
    title: '',
    slug: '',
    description: '',
    challenge: '',
    solution: '',
    results: '',
    images: [],
    live_link: '',
    technologies: '',
    category: '',
    featured: false,
  });
  const [loading, setLoading] = useState(params.id ? true : false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const isNew = !params.id || params.id === 'new';

  useEffect(() => {
    if (!isNew && params.id) {
      fetchPortfolioItem();
    }
  }, [params.id, isNew]);

  const fetchPortfolioItem = async () => {
    try {
      const response = await fetch(`/api/portfolio/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setFormData(data);
      } else {
        setError('Failed to load portfolio item');
      }
    } catch (err) {
      console.error('Error fetching portfolio item:', err);
      setError('Failed to load portfolio item');
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
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Auto-generate slug from title
    if (name === 'title') {
      setFormData((prev) => ({
        ...prev,
        slug: slugify(value),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const method = isNew ? 'POST' : 'PUT';
      const url = isNew ? '/api/portfolio' : `/api/portfolio/${params.id}`;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/admin/dashboard/portfolio');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to save portfolio item');
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
              {isNew ? 'New Portfolio Item' : 'Edit Portfolio Item'}
            </h1>
          </div>
          <Link href="/admin/dashboard/portfolio" className="btn btn-secondary text-sm">
            ← Back
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="card">
              <label className="block text-sm font-medium mb-2">Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-3 text-white placeholder-dark-muted focus:outline-none focus:border-primary-500"
                placeholder="Project title"
              />
            </div>

            {/* Slug */}
            <div className="card">
              <label className="block text-sm font-medium mb-2">Slug *</label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-3 text-white placeholder-dark-muted focus:outline-none focus:border-primary-500"
                placeholder="url-friendly-slug"
              />
              <p className="text-dark-muted text-xs mt-2">Auto-generated from title</p>
            </div>

            {/* Description */}
            <div className="card">
              <label className="block text-sm font-medium mb-2">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-3 text-white placeholder-dark-muted focus:outline-none focus:border-primary-500 resize-none"
                placeholder="Brief overview of the project"
              />
            </div>

            {/* Challenge */}
            <div className="card">
              <label className="block text-sm font-medium mb-2">Challenge</label>
              <textarea
                name="challenge"
                value={formData.challenge}
                onChange={handleChange}
                rows={4}
                className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-3 text-white placeholder-dark-muted focus:outline-none focus:border-primary-500 resize-none"
                placeholder="What was the challenge or problem?"
              />
            </div>

            {/* Solution */}
            <div className="card">
              <label className="block text-sm font-medium mb-2">Solution</label>
              <textarea
                name="solution"
                value={formData.solution}
                onChange={handleChange}
                rows={4}
                className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-3 text-white placeholder-dark-muted focus:outline-none focus:border-primary-500 resize-none"
                placeholder="How did you solve it?"
              />
            </div>

            {/* Results */}
            <div className="card">
              <label className="block text-sm font-medium mb-2">Results</label>
              <textarea
                name="results"
                value={formData.results}
                onChange={handleChange}
                rows={3}
                className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-3 text-white placeholder-dark-muted focus:outline-none focus:border-primary-500 resize-none"
                placeholder="What were the outcomes? e.g. 30% speed improvement"
              />
            </div>

            {/* Live Link */}
            <div className="card">
              <label className="block text-sm font-medium mb-2">Live Store Link</label>
              <input
                type="url"
                name="live_link"
                value={formData.live_link}
                onChange={handleChange}
                className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-3 text-white placeholder-dark-muted focus:outline-none focus:border-primary-500"
                placeholder="https://example.myshopify.com"
              />
            </div>

            {/* Technologies */}
            <div className="card">
              <label className="block text-sm font-medium mb-2">Technologies (comma-separated)</label>
              <input
                type="text"
                name="technologies"
                value={formData.technologies}
                onChange={handleChange}
                className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-3 text-white placeholder-dark-muted focus:outline-none focus:border-primary-500"
                placeholder="Shopify Liquid, JavaScript, CSS"
              />
            </div>

            {/* Category */}
            <div className="card">
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500"
              >
                <option value="">Select a category</option>
                <option value="Theme Development">Theme Development</option>
                <option value="Performance Optimization">Performance Optimization</option>
                <option value="App Integration">App Integration</option>
                <option value="Custom Features">Custom Features</option>
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
                {submitting ? 'Saving...' : 'Save Portfolio Item'}
              </button>
              <Link href="/admin/dashboard/portfolio" className="btn btn-secondary">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
