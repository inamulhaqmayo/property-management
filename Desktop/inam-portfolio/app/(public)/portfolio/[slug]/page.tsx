'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { formatDate } from '@/lib/utils';

interface PortfolioItem {
  id: number;
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
  created_at?: string;
}

export default function PortfolioDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const [portfolio, setPortfolio] = useState<PortfolioItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchPortfolio();
  }, [params.slug]);

  const fetchPortfolio = async () => {
    try {
      const response = await fetch(`/api/portfolio/${params.slug}`);
      if (response.ok) {
        const data = await response.json();
        setPortfolio(data);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error('Failed to fetch portfolio item:', err);
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

  if (error || !portfolio) {
    return (
      <>
        <Navbar />
        <main className="flex-grow">
          <section className="section">
            <div className="container text-center">
              <h1 className="mb-4">Project Not Found</h1>
              <p className="text-dark-muted mb-8">
                Sorry, this portfolio project doesn't exist.
              </p>
              <Link href="/portfolio" className="btn btn-primary">
                Back to Portfolio
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  const technologies = portfolio.technologies
    ? portfolio.technologies.split(',').map((t) => t.trim())
    : [];

  return (
    <>
      <Navbar />

      <main className="flex-grow">
        {/* Header */}
        <section className="section bg-gradient-to-br from-dark-900 to-dark-950">
          <div className="container">
            <Link href="/portfolio" className="text-primary-500 hover:text-primary-400 text-sm font-medium mb-6 inline-block">
              ← Back to Portfolio
            </Link>
            <h1 className="mb-4">{portfolio.title}</h1>
            {portfolio.category && (
              <span className="inline-block bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
                {portfolio.category}
              </span>
            )}
            <p className="text-lg text-dark-muted max-w-3xl">{portfolio.description}</p>
          </div>
        </section>

        {/* Images */}
        {portfolio.images && portfolio.images.length > 0 && (
          <section className="section">
            <div className="container">
              <div className="grid grid-cols-1 gap-6">
                {portfolio.images.map((image, index) => (
                  <div key={index} className="rounded-lg overflow-hidden bg-dark-800">
                    <img
                      src={image}
                      alt={`${portfolio.title} - ${index + 1}`}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Content Grid */}
        <section className="section bg-dark-900">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Challenge */}
                {portfolio.challenge && (
                  <div className="mb-12">
                    <h2 className="mb-4 text-primary-500">Challenge</h2>
                    <p className="text-dark-muted leading-relaxed">{portfolio.challenge}</p>
                  </div>
                )}

                {/* Solution */}
                {portfolio.solution && (
                  <div className="mb-12">
                    <h2 className="mb-4 text-primary-500">Solution</h2>
                    <p className="text-dark-muted leading-relaxed">{portfolio.solution}</p>
                  </div>
                )}

                {/* Results */}
                {portfolio.results && (
                  <div className="mb-12">
                    <h2 className="mb-4 text-primary-500">Results</h2>
                    <p className="text-dark-muted leading-relaxed">{portfolio.results}</p>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div>
                {/* Live Link */}
                {portfolio.live_link && (
                  <div className="card mb-6">
                    <p className="text-sm text-dark-muted mb-3">View Live Project</p>
                    <a
                      href={portfolio.live_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary w-full text-center"
                    >
                      Visit Store →
                    </a>
                  </div>
                )}

                {/* Technologies */}
                {technologies.length > 0 && (
                  <div className="card mb-6">
                    <h3 className="font-semibold mb-4">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {technologies.map((tech) => (
                        <span
                          key={tech}
                          className="bg-primary-500/10 text-primary-400 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Metadata */}
                <div className="card">
                  {portfolio.category && (
                    <div className="mb-4 pb-4 border-b border-dark-700">
                      <p className="text-xs text-dark-muted uppercase tracking-wide mb-2">Category</p>
                      <p className="font-semibold">{portfolio.category}</p>
                    </div>
                  )}
                  {portfolio.created_at && (
                    <div>
                      <p className="text-xs text-dark-muted uppercase tracking-wide mb-2">Date</p>
                      <p className="font-semibold">{formatDate(portfolio.created_at)}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section">
          <div className="container text-center">
            <h2 className="mb-6">Interested in Similar Work?</h2>
            <Link href="/contact" className="btn btn-primary">
              Let's Discuss Your Project
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
