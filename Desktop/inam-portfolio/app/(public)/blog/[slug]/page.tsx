'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { formatDate } from '@/lib/utils';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  featured_image?: string;
  published_at?: string;
  created_at?: string;
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchBlogPost();
  }, [params.slug]);

  const fetchBlogPost = async () => {
    try {
      const response = await fetch(`/api/blog/${params.slug}`);
      if (response.ok) {
        const data = await response.json();
        setPost(data);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error('Failed to fetch blog post:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <p className="text-dark-muted">Loading...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !post) {
    return (
      <>
        <Navbar />
        <main className="flex-grow">
          <section className="section">
            <div className="container text-center">
              <h1 className="mb-4">Post Not Found</h1>
              <p className="text-dark-muted mb-8">
                Sorry, this blog post doesn't exist.
              </p>
              <Link href="/blog" className="btn btn-primary">
                Back to Blog
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="flex-grow">
        {/* Featured Image */}
        {post.featured_image && (
          <div className="relative w-full h-96 bg-dark-800">
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article */}
        <article className="section">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              {/* Header */}
              <Link href="/blog" className="text-primary-500 hover:text-primary-400 text-sm font-medium mb-6 inline-block">
                ← Back to Blog
              </Link>

              <header className="mb-8">
                <h1 className="mb-4">{post.title}</h1>
                <div className="flex items-center gap-4 text-dark-muted text-sm">
                  <span>{formatDate(post.published_at || post.created_at || '')}</span>
                  <span>•</span>
                  <span>5 min read</span>
                </div>
              </header>

              {/* Content */}
              <div className="prose prose-invert max-w-none mb-12">
                <div
                  className="text-dark-muted leading-relaxed space-y-4"
                  dangerouslySetInnerHTML={{
                    __html: post.content
                      .split('\n')
                      .map((p) => (p.trim() ? `<p>${p}</p>` : ''))
                      .join(''),
                  }}
                />
              </div>

              {/* Author Bio */}
              <div className="card mt-12 pt-8 border-t border-dark-800">
                <div className="flex gap-4 items-start">
                  <div className="w-16 h-16 rounded-full bg-primary-500/10 flex-shrink-0 flex items-center justify-center">
                    <span className="text-2xl">👨‍💻</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Inam Ul Haq</h3>
                    <p className="text-dark-muted text-sm">
                      Professional Shopify Developer with 9+ years of experience building and optimizing eCommerce solutions. I share insights about Shopify development, performance optimization, and web best practices.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="card bg-primary-500/5 border-primary-500/20 mt-8 text-center">
                <h3 className="font-semibold mb-3">Ready to optimize your Shopify store?</h3>
                <Link href="/contact" className="btn btn-primary">
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
