'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Settings {
  email?: string;
  linkedin?: string;
  github?: string;
  phone?: string;
  years_experience?: string;
}

export default function Footer() {
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

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-900 border-t border-dark-800 mt-auto">
      <div className="container py-12 md:py-16">
        {/* Footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold gradient-text mb-4">Inam Ul Haq</h3>
            <p className="text-dark-muted text-sm">
              Professional Shopify Developer crafting high-converting eCommerce solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-dark-muted hover:text-primary-500 text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-dark-muted hover:text-primary-500 text-sm transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-dark-muted hover:text-primary-500 text-sm transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-dark-muted hover:text-primary-500 text-sm transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              {settings.email && (
                <li>
                  <a
                    href={`mailto:${settings.email}`}
                    className="text-dark-muted hover:text-primary-500 text-sm transition-colors"
                  >
                    {settings.email}
                  </a>
                </li>
              )}
              {settings.phone && (
                <li>
                  <a
                    href={`tel:${settings.phone}`}
                    className="text-dark-muted hover:text-primary-500 text-sm transition-colors"
                  >
                    {settings.phone}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold mb-4">Follow</h4>
            <div className="flex gap-4">
              {settings.linkedin && (
                <a
                  href={settings.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-dark-800 hover:bg-primary-500 flex items-center justify-center transition-colors"
                  aria-label="LinkedIn"
                >
                  <span className="text-sm">in</span>
                </a>
              )}
              {settings.github && (
                <a
                  href={settings.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-dark-800 hover:bg-primary-500 flex items-center justify-center transition-colors"
                  aria-label="GitHub"
                >
                  <span className="text-sm">gh</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-dark-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-dark-muted text-sm">
              © {currentYear} Inam Ul Haq. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-dark-muted hover:text-primary-500 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-dark-muted hover:text-primary-500 text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
