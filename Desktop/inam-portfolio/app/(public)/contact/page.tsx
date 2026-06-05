'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError('Failed to send message. Please try again.');
      }
    } catch (err) {
      console.error('Submit error:', err);
      setError('An error occurred. Please try again.');
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
            <h1 className="mb-4">Get In Touch</h1>
            <p className="text-dark-muted text-lg max-w-2xl mx-auto">
              Have a project in mind or questions about my services? I'd love to hear from you. Fill out the form below or reach out directly.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="section">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {/* Contact Form */}
              <div>
                <h2 className="mb-8">Send Me a Message</h2>

                {submitted && (
                  <div className="bg-primary-500/10 border border-primary-500 text-primary-400 px-4 py-3 rounded-lg mb-6">
                    ✓ Thank you! Your message has been received. I'll get back to you soon.
                  </div>
                )}

                {error && (
                  <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-6">
                    ✗ {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-3 text-white placeholder-dark-muted focus:outline-none focus:border-primary-500 transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-3 text-white placeholder-dark-muted focus:outline-none focus:border-primary-500 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-3 text-white placeholder-dark-muted focus:outline-none focus:border-primary-500 transition-colors resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="flex flex-col gap-6">
                <h2 className="mb-2">Contact Information</h2>

                {/* Email */}
                <div className="card">
                  <p className="text-sm text-dark-muted mb-2 uppercase tracking-wide">Email</p>
                  <a
                    href="mailto:contact@inamulhaq.com"
                    className="text-lg font-semibold text-primary-500 hover:text-primary-400 break-all"
                  >
                    contact@inamulhaq.com
                  </a>
                </div>

                {/* Response Time */}
                <div className="card">
                  <p className="text-sm text-dark-muted mb-2 uppercase tracking-wide">Response Time</p>
                  <p className="text-lg font-semibold">
                    Typically within 24 hours
                  </p>
                </div>

                {/* Availability */}
                <div className="card">
                  <p className="text-sm text-dark-muted mb-2 uppercase tracking-wide">Availability</p>
                  <p className="text-lg font-semibold">
                    Available for new projects
                  </p>
                </div>

                {/* Social Links */}
                <div className="card">
                  <p className="text-sm text-dark-muted mb-4 uppercase tracking-wide">Connect</p>
                  <div className="flex gap-4">
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-lg bg-dark-800 hover:bg-primary-500 flex items-center justify-center transition-colors"
                      aria-label="LinkedIn"
                    >
                      <span className="text-sm">in</span>
                    </a>
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-lg bg-dark-800 hover:bg-primary-500 flex items-center justify-center transition-colors"
                      aria-label="GitHub"
                    >
                      <span className="text-sm">gh</span>
                    </a>
                  </div>
                </div>

                {/* FAQ */}
                <div className="card bg-primary-500/5 border-primary-500/20">
                  <p className="text-sm text-primary-400 mb-2 uppercase tracking-wide font-semibold">Quick Tip</p>
                  <p className="text-dark-muted text-sm">
                    When contacting me, please provide details about your project, timeline, and budget to help me give you the most accurate response.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
