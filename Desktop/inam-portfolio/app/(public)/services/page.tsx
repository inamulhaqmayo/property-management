'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

interface Service {
  id: number;
  title: string;
  description: string;
  icon?: string;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services');
      if (response.ok) {
        const data = await response.json();
        setServices(data);
      }
    } catch (error) {
      console.error('Failed to fetch services:', error);
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
            <h1 className="mb-4">Services</h1>
            <p className="text-dark-muted text-lg max-w-2xl mx-auto">
              Comprehensive Shopify development and optimization services tailored to your business needs.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="section">
          <div className="container">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-dark-muted">Loading services...</p>
              </div>
            ) : services.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {services.map((service) => (
                  <div key={service.id} className="card">
                    {service.icon && <div className="text-5xl mb-4">{service.icon}</div>}
                    <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
                    <p className="text-dark-muted mb-6 leading-relaxed">{service.description}</p>
                    <Link href="/contact" className="text-primary-500 hover:text-primary-400 font-medium inline-flex items-center gap-2">
                      Learn More →
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-dark-muted">No services available at the moment.</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="section bg-dark-900 gradient-bg">
          <div className="container text-center">
            <h2 className="mb-6">Ready to Get Started?</h2>
            <p className="text-dark-muted text-lg mb-8 max-w-2xl mx-auto">
              Contact me to discuss your Shopify needs and how I can help grow your store.
            </p>
            <Link href="/contact" className="btn btn-primary">
              Contact Me
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
