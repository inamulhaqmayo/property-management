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
  const [services, setServices] = useState<Service[]>([]);
  const [settings, setSettings] = useState<Settings>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [portfolioRes, testimonialsRes, servicesRes, settingsRes] = await Promise.all([
        fetch('/api/portfolio?featured=true'),
        fetch('/api/testimonials?featured=true'),
        fetch('/api/services'),
        fetch('/api/settings'),
      ]);

      if (portfolioRes.ok) setPortfolioItems(await portfolioRes.json());
      if (testimonialsRes.ok) setTestimonials(await testimonialsRes.json());
      if (servicesRes.ok) setServices(await servicesRes.json());
      if (settingsRes.ok) setSettings(await settingsRes.json());
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="section bg-gradient-to-br from-dark-900 to-dark-950 py-20 md:py-32">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="mb-6 animate-fade-in">
                <span className="gradient-text">
                  {settings.headline || 'Build High-Converting Shopify Stores'}
                </span>
              </h1>
              <p className="text-lg md:text-xl text-dark-muted mb-8 max-w-2xl mx-auto animate-slide-up">
                {settings.bio ||
                  'Professional Shopify Developer with 9+ years of experience creating and optimizing eCommerce solutions that drive real results.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
                <Link href="/portfolio" className="btn btn-primary">
                  View My Work
                </Link>
                <Link href="/contact" className="btn btn-outline">
                  Let's Talk
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="section">
          <div className="container">
            <h2 className="text-center mb-12">Services I Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.slice(0, 4).map((service) => (
                <div key={service.id} className="card text-center">
                  {service.icon && <div className="text-4xl mb-4">{service.icon}</div>}
                  <h3 className="text-lg font-semibold mb-3">{service.title}</h3>
                  <p className="text-dark-muted text-sm">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Portfolio Section */}
        {portfolioItems.length > 0 && (
          <section className="section bg-dark-900">
            <div className="container">
              <div className="mb-12">
                <h2 className="mb-4">Featured Projects</h2>
                <p className="text-dark-muted max-w-2xl">
                  Explore some of my recent Shopify optimization and development projects that delivered measurable results.
                </p>
              </div>

              {/* Responsive Slider */}
              <div className="overflow-x-auto pb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-w-max md:min-w-0">
                  {portfolioItems.map((item) => (
                    <div key={item.id} className="w-full md:w-auto">
                      <PortfolioCard {...item} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center mt-8">
                <Link href="/portfolio" className="btn btn-secondary">
                  View All Projects
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Stats Section */}
        <section className="section">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="gradient-bg p-8 rounded-lg">
                <h3 className="text-4xl font-bold text-primary-500 mb-2">
                  {settings.years_experience || '9'}+
                </h3>
                <p className="text-dark-muted">Years of Experience</p>
              </div>
              <div className="gradient-bg p-8 rounded-lg">
                <h3 className="text-4xl font-bold text-primary-500 mb-2">50+</h3>
                <p className="text-dark-muted">Shopify Stores Optimized</p>
              </div>
              <div className="gradient-bg p-8 rounded-lg">
                <h3 className="text-4xl font-bold text-primary-500 mb-2">30%</h3>
                <p className="text-dark-muted">Avg. Performance Improvement</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        {testimonials.length > 0 && (
          <section className="section bg-dark-900">
            <div className="container">
              <h2 className="text-center mb-12">What Clients Say</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.slice(0, 3).map((testimonial) => (
                  <TestimonialCard key={testimonial.id} {...testimonial} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="section gradient-bg">
          <div className="container text-center">
            <h2 className="mb-6">Ready to Grow Your Shopify Store?</h2>
            <p className="text-dark-muted text-lg mb-8 max-w-2xl mx-auto">
              Let's discuss how I can help optimize your store for better performance and increased conversions.
            </p>
            <Link href="/contact" className="btn btn-primary">
              Get in Touch
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
