'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PortfolioCard from '@/components/PortfolioCard';

interface PortfolioItem {
  id: number;
  title: string;
  slug: string;
  description: string;
  images?: string[];
  results?: string;
  category?: string;
}

export default function PortfolioPage() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<PortfolioItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const categories = ['Theme Development', 'Performance Optimization', 'App Integration', 'Custom Features'];

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const response = await fetch('/api/portfolio');
      if (response.ok) {
        const data = await response.json();
        setPortfolioItems(data);
        setFilteredItems(data);
      }
    } catch (error) {
      console.error('Failed to fetch portfolio:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryFilter = (category: string | null) => {
    setSelectedCategory(category);
    if (category === null) {
      setFilteredItems(portfolioItems);
    } else {
      setFilteredItems(portfolioItems.filter((item) => item.category === category));
    }
  };

  return (
    <>
      <Navbar />

      <main className="flex-grow">
        {/* Header */}
        <section className="section bg-gradient-to-br from-dark-900 to-dark-950">
          <div className="container text-center">
            <h1 className="mb-4">My Portfolio</h1>
            <p className="text-dark-muted text-lg max-w-2xl mx-auto">
              Explore a selection of Shopify optimization and development projects I've completed.
            </p>
          </div>
        </section>

        {/* Filter */}
        <section className="section border-b border-dark-800">
          <div className="container">
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => handleCategoryFilter(null)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === null
                    ? 'bg-primary-500 text-white'
                    : 'bg-dark-800 text-dark-muted hover:bg-dark-700'
                }`}
              >
                All Projects
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryFilter(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-primary-500 text-white'
                      : 'bg-dark-800 text-dark-muted hover:bg-dark-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Grid */}
        <section className="section">
          <div className="container">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-dark-muted">Loading portfolio items...</p>
              </div>
            ) : filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <PortfolioCard key={item.id} {...item} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-dark-muted">No portfolio items found in this category.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
