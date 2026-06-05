'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Settings {
  bio?: string;
  headline?: string;
  years_experience?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  github?: string;
}

export default function AdminSettingsPage() {
  const [formData, setFormData] = useState<Settings>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings');
      if (response.ok) {
        const data = await response.json();
        setFormData(data);
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Failed to save settings:', error);
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <p className="text-dark-muted">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Header */}
      <header className="bg-dark-900 border-b border-dark-800 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Site Settings</h1>
            <p className="text-dark-muted text-sm">Manage your portfolio information</p>
          </div>
          <Link href="/admin/dashboard" className="btn btn-secondary text-sm">
            ← Back
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {success && (
            <div className="bg-primary-500/10 border border-primary-500 text-primary-400 px-4 py-3 rounded-lg mb-6">
              ✓ Settings saved successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Headline */}
            <div className="card">
              <label className="block text-sm font-medium mb-2">Headline</label>
              <input
                type="text"
                name="headline"
                value={formData.headline || ''}
                onChange={handleChange}
                className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-3 text-white placeholder-dark-muted focus:outline-none focus:border-primary-500"
                placeholder="e.g. Build High-Converting Shopify Stores"
              />
              <p className="text-dark-muted text-xs mt-2">Your main headline on the homepage</p>
            </div>

            {/* Bio */}
            <div className="card">
              <label className="block text-sm font-medium mb-2">Bio</label>
              <textarea
                name="bio"
                value={formData.bio || ''}
                onChange={handleChange}
                rows={5}
                className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-3 text-white placeholder-dark-muted focus:outline-none focus:border-primary-500 resize-none"
                placeholder="Tell visitors about yourself..."
              />
              <p className="text-dark-muted text-xs mt-2">Your professional bio</p>
            </div>

            {/* Years of Experience */}
            <div className="card">
              <label className="block text-sm font-medium mb-2">Years of Experience</label>
              <input
                type="text"
                name="years_experience"
                value={formData.years_experience || ''}
                onChange={handleChange}
                className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-3 text-white placeholder-dark-muted focus:outline-none focus:border-primary-500"
                placeholder="e.g. 9"
              />
            </div>

            {/* Contact Information */}
            <div className="card border-t-2 border-primary-500/20 pt-6">
              <h3 className="font-semibold mb-4">Contact Information</h3>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleChange}
                  className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-3 text-white placeholder-dark-muted focus:outline-none focus:border-primary-500"
                  placeholder="your@email.com"
                />
              </div>

              {/* Phone */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleChange}
                  className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-3 text-white placeholder-dark-muted focus:outline-none focus:border-primary-500"
                  placeholder="+1-XXX-XXX-XXXX"
                />
              </div>
            </div>

            {/* Social Links */}
            <div className="card border-t-2 border-primary-500/20 pt-6">
              <h3 className="font-semibold mb-4">Social Links</h3>

              {/* LinkedIn */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">LinkedIn</label>
                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin || ''}
                  onChange={handleChange}
                  className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-3 text-white placeholder-dark-muted focus:outline-none focus:border-primary-500"
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>

              {/* GitHub */}
              <div>
                <label className="block text-sm font-medium mb-2">GitHub</label>
                <input
                  type="url"
                  name="github"
                  value={formData.github || ''}
                  onChange={handleChange}
                  className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-3 text-white placeholder-dark-muted focus:outline-none focus:border-primary-500"
                  placeholder="https://github.com/yourprofile"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={saving}
                className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : 'Save Settings'}
              </button>
              <Link href="/admin/dashboard" className="btn btn-secondary">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
