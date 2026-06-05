'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { slugify } from '@/lib/utils';

interface BlogPost {
  id?: number;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  published?: boolean;
}

export default function AdminBlogFormPage({
  params,
}: {
  params: { id?: string };
}) {
  const [formData, setFormData] = useState<BlogPost>({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    featured_image: '',
    published: false,
  });
  const [loading, setLoading] = useState(params.id ? true : false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const isNew = !params.id || params.id === 'new';

  useEffect(() => {
    if (!isNew && params.id) {
      fetchBlogPost();
    }
  }, [params.id, isNew]);

  const fetchBlogPost = async () => {
    try {
      const response = await fetch(`/api/blog/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setFormData(data);
      } else {
        setError('Failed to load blog post');
      }
    } catch (err) {
      console.error('Error fetching blog post:', err);
      setError('Failed to load blog post');
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
      const url = isNew ? '/api/blog' : `/api/blog/${params.id}`;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/admin/dashboard/blog');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to save blog post');
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
              {isNew ? 'New Blog Post' : 'Edit Blog Post'}
            </h1>
          </div>
          <Link href="/admin/dashboard/blog" className="btn btn-secondary text-sm">
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
                placeholder="Blog post title"
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

            {/* Featured Image */}
            <div className="card">
              <label className="block text-sm font-medium mb-2">Featured Image URL</label>
              <input
                type="url"
                name="featured_image"
                value={formData.featured_image}
                onChange={handleChange}
                className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-3 text-white placeholder-dark-muted focus:outline-none focus:border-primary-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Excerpt */}
            <div className="card">
              <label className="block text-sm font-medium mb-2">Excerpt</label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                rows={2}
                className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-3 text-white placeholder-dark-muted focus:outline-none focus:border-primary-500 resize-none"
                placeholder="Brief summary of the post (shown in listings)"
              />
            </div>

            {/* Content */}
            <div className="card">
              <label className="block text-sm font-medium mb-2">Content *</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows={12}
                className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-3 text-white placeholder-dark-muted focus:outline-none focus:border-primary-500 resize-none font-mono text-sm"
                placeholder="Write your blog post content here. Use line breaks to separate paragraphs."
              />
              <p className="text-dark-muted text-xs mt-2">
                Separate paragraphs with blank lines. HTML tags are supported.
              </p>
            </div>

            {/* Published */}
            <div className="card">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="published"
                  checked={formData.published}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-dark-700 bg-dark-800 cursor-pointer"
                />
                <span className="font-medium">Publish this post</span>
              </label>
              <p className="text-dark-muted text-xs mt-2">
                Uncheck to save as draft (only visible to you)
              </p>
            </div>

            {/* Submit */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Saving...' : 'Save Blog Post'}
              </button>
              <Link href="/admin/dashboard/blog" className="btn btn-secondary">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
