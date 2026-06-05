'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

interface Settings {
  bio?: string;
  years_experience?: string;
  headline?: string;
  email?: string;
}

export default function AboutPage() {
  const [settings, setSettings] = useState<Settings>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings');
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const skills = [
    'Shopify Liquid',
    'Theme Customization',
    'Store Setup & Configuration',
    'Performance Optimization',
    'App Integration',
    'Conversion Rate Optimization',
    'Speed Optimization',
    'Bug Fixing & Troubleshooting',
    'Responsive Design',
    'SEO Optimization',
    'Payment Gateway Integration',
    'Custom Feature Development',
  ];

  return (
    <>
      <Navbar />

      <main className="flex-grow">
        {/* Header */}
        <section className="section bg-gradient-to-br from-dark-900 to-dark-950">
          <div className="container text-center">
            <h1 className="mb-4">About Me</h1>
            <p className="text-dark-muted text-lg max-w-2xl mx-auto">
              Learn more about my background and expertise in Shopify development.
            </p>
          </div>
        </section>

        {/* Bio Section */}
        <section className="section">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {/* Stats */}
                <div className="card text-center">
                  <p className="text-5xl font-bold text-primary-500 mb-2">
                    {settings.years_experience || '9'}+
                  </p>
                  <p className="text-dark-muted">Years Experience</p>
                </div>
                <div className="card text-center">
                  <p className="text-5xl font-bold text-primary-500 mb-2">50+</p>
                  <p className="text-dark-muted">Projects Completed</p>
                </div>
                <div className="card text-center">
                  <p className="text-5xl font-bold text-primary-500 mb-2">100%</p>
                  <p className="text-dark-muted">Client Satisfaction</p>
                </div>
              </div>

              {/* Bio Text */}
              <div className="card mb-8">
                <h2 className="mb-4">Who Am I?</h2>
                <p className="text-dark-muted leading-relaxed mb-4">
                  {settings.bio ||
                    `I'm Inam Ul Haq, a professional Shopify Developer with strong experience in building, customizing, and optimizing Shopify stores. With around 9 years of experience in web and Shopify development, I have worked on a wide range of projects including Shopify theme development, custom feature implementation, bug fixing, app integration, and store performance optimization.`}
                </p>
                <p className="text-dark-muted leading-relaxed">
                  My goal is to help businesses build scalable and user-friendly online stores that improve sales and customer experience. I focus on clean code, responsive design, and delivering solutions tailored to client requirements.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="section bg-dark-900">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="mb-8 text-center">Key Skills & Expertise</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-dark-800 rounded-lg hover:border-primary-500 border border-dark-700 transition-colors">
                    <span className="text-primary-500 text-lg">✓</span>
                    <span className="text-dark-text font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="section">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="mb-8 text-center">My Journey</h2>
              <div className="space-y-8">
                <div className="card">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary-500/10 border-2 border-primary-500 flex-shrink-0 flex items-center justify-center">
                      <span className="text-primary-500 font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Foundation (2015-2017)</h3>
                      <p className="text-dark-muted">
                        Started my journey in web development with HTML, CSS, and JavaScript. Built foundational knowledge of eCommerce principles.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary-500/10 border-2 border-primary-500 flex-shrink-0 flex items-center justify-center">
                      <span className="text-primary-500 font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Shopify Specialization (2017-2020)</h3>
                      <p className="text-dark-muted">
                        Focused on Shopify development, learned Liquid templating language, and completed 20+ successful store projects.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary-500/10 border-2 border-primary-500 flex-shrink-0 flex items-center justify-center">
                      <span className="text-primary-500 font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Performance & Optimization (2020-2024)</h3>
                      <p className="text-dark-muted">
                        Shifted focus to performance optimization, conversion rate optimization, and helping established stores scale.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary-500/10 border-2 border-primary-500 flex-shrink-0 flex items-center justify-center">
                      <span className="text-primary-500 font-bold">4</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Present & Future (2024+)</h3>
                      <p className="text-dark-muted">
                        Currently working with high-volume stores on complex optimization challenges and mentoring junior developers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section bg-dark-900 gradient-bg">
          <div className="container text-center">
            <h2 className="mb-6">Let's Work Together</h2>
            <p className="text-dark-muted text-lg mb-8 max-w-2xl mx-auto">
              Whether you need a complete store overhaul or targeted optimizations, I'm ready to help.
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
