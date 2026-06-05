'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PortfolioCard from '@/components/PortfolioCard';
import TestimonialCard from '@/components/TestimonialCard';

interface PortfolioItem {
  id: number;
  title: string;
  slug: string;
  description: string;
  images?: string[];
  results?: string;
  category?: string;
}

interface Testimonial {
  id: number;
  client_name: string;
  client_company?: string;
  client_role?: string;
  quote: string;
  image_url?: string;
  rating?: number;
}

interface Service {
  id: number;
  title: string;
  description: string;
  icon?: string;
}

interface Settings {
  bio?: string;
  headline?: string;
  years_experience?: string;
  email?: string;
}

export default function Home() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [services, setServices] = useState<Service[]>([
    { id: 1, title: 'Shopify Development', description: 'Custom store development and setup' },
    { id: 2, title: 'Performance Optimization', description: 'Speed and conversion optimization' },
    { id: 3, title: 'Theme Customization', description: 'Professional theme design and coding' },
    { id: 4, title: 'App Integration', description: 'Integrate powerful apps and tools' },
  ]);
  const [settings, setSettings] = useState<Settings>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const results = await Promise.all([
        fetch('/api/portfolio?featured=true').catch(() => null),
        fetch('/api/testimonials?featured=true').catch(() => null),
        fetch('/api/services').catch(() => null),
        fetch('/api/settings').catch(() => null),
      ]);

      const [portfolioRes, testimonialsRes, servicesRes, settingsRes] = results;

      if (portfolioRes?.ok) {
        const data = await portfolioRes.json();
        setPortfolioItems(Array.isArray(data) ? data : []);
      }
      if (testimonialsRes?.ok) {
        const data = await testimonialsRes.json();
        setTestimonials(Array.isArray(data) ? data : []);
      }
      if (servicesRes?.ok) {
        const data = await servicesRes.json();
        setServices(Array.isArray(data) ? data : services);
      }
      if (settingsRes?.ok) {
        const data = await settingsRes.json();
        setSettings(data || {});
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
      // Use default data if fetch fails
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-gray-900 to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="mb-6 text-4xl md:text-5xl lg:text-6xl font-bold">
                <span className="bg-gradient-to-r from-cyan-400 to-cyan-500 bg-clip-text text-transparent">
                  {settings.headline || 'Build High-Converting Shopify Stores'}
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                {settings.bio ||
                  'Professional Shopify Developer with 9+ years of experience creating and optimizing eCommerce solutions that drive real results.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/portfolio" className="px-6 py-3 bg-cyan-500 text-white rounded-lg font-medium hover:bg-cyan-600 active:scale-95 transition-all duration-200">
                  View My Work
                </Link>
                <Link href="/contact" className="px-6 py-3 border-2 border-cyan-500 text-cyan-500 rounded-lg font-medium hover:bg-cyan-500 hover:text-white transition-all duration-200">
                  Let's Talk
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 md:py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-center mb-12 text-3xl md:text-4xl font-bold">Services I Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.slice(0, 4).map((service) => (
                <div key={service.id} className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-cyan-500 transition-all duration-300 text-center">
                  {service.icon && <div className="text-4xl mb-4">{service.icon}</div>}
                  <h3 className="text-lg font-semibold mb-3">{service.title}</h3>
                  <p className="text-gray-400 text-sm">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Portfolio Section */}
        {portfolioItems.length > 0 && (
          <section className="py-16 md:py-24 lg:py-32 bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-12">
                <h2 className="mb-4 text-3xl md:text-4xl font-bold">Featured Projects</h2>
                <p className="text-gray-400 max-w-2xl">
                  Explore some of my recent Shopify optimization and development projects that delivered measurable results.
                </p>
              </div>

              {/* Responsive Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {portfolioItems.map((item) => (
                  <div key={item.id} className="w-full">
                    <PortfolioCard {...item} />
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <Link href="/portfolio" className="px-6 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg font-medium hover:bg-gray-700 transition-all duration-200">
                  View All Projects
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Stats Section */}
        <section className="py-16 md:py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 p-8 rounded-lg">
                <h3 className="text-4xl font-bold text-cyan-500 mb-2">
                  {settings.years_experience || '9'}+
                </h3>
                <p className="text-gray-400">Years of Experience</p>
              </div>
              <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 p-8 rounded-lg">
                <h3 className="text-4xl font-bold text-cyan-500 mb-2">50+</h3>
                <p className="text-gray-400">Shopify Stores Optimized</p>
              </div>
              <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 p-8 rounded-lg">
                <h3 className="text-4xl font-bold text-cyan-500 mb-2">30%</h3>
                <p className="text-gray-400">Avg. Performance Improvement</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        {testimonials.length > 0 && (
          <section className="py-16 md:py-24 lg:py-32 bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-center mb-12 text-3xl md:text-4xl font-bold">What Clients Say</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.slice(0, 3).map((testimonial) => (
                  <TestimonialCard key={testimonial.id} {...testimonial} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-cyan-500/10 to-cyan-500/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="mb-6 text-3xl md:text-4xl font-bold">Ready to Grow Your Shopify Store?</h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Let's discuss how I can help optimize your store for better performance and increased conversions.
            </p>
            <Link href="/contact" className="px-6 py-3 bg-cyan-500 text-white rounded-lg font-medium hover:bg-cyan-600 active:scale-95 transition-all duration-200">
              Get in Touch
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
