'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { formatDate, truncateText } from '@/lib/utils';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  featured_image?: string;
  published_at?: string;
  created_at?: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const response = await fetch('/api/blog');
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      console.error('Failed to fetch blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="flex-grow">
        {/* Header */}
        <section className="section bg-gradient-to-br from-dark-900 to-dark-950">
          <div className="container text-center">
            <h1 className="mb-4">Blog</h1>
            <p className="text-dark-muted text-lg max-w-2xl mx-auto">
              Articles, tips, and insights about Shopify development, eCommerce optimization, and web performance.
            </p>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="section">
          <div className="container">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-dark-muted">Loading blog posts...</p>
              </div>
            ) : posts.length > 0 ? (
              <div className="max-w-4xl mx-auto space-y-8">
                {posts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`}>
                    <article className="card group cursor-pointer">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
                        {/* Featured Image */}
                        {post.featured_image && (
                          <div className="md:col-span-1">
                            <div className="relative w-full h-40 rounded-lg overflow-hidden bg-dark-800">
                              <img
                                src={post.featured_image}
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                          </div>
                        )}

                        {/* Content */}
                        <div className={post.featured_image ? 'md:col-span-3' : 'md:col-span-4'}>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs text-dark-muted uppercase tracking-wide">
                              {formatDate(post.published_at || post.created_at || '')}
                            </span>
                          </div>
                          <h3 className="text-2xl font-semibold mb-3 group-hover:text-primary-500 transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-dark-muted mb-4">
                            {post.excerpt || 'No excerpt available'}
                          </p>
                          <div className="flex items-center gap-2 text-primary-500 font-medium group-hover:gap-3 transition-all">
                            Read More
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-dark-muted mb-4">No blog posts published yet.</p>
                <p className="text-dark-muted text-sm">Check back soon for updates!</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
