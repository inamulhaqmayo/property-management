'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  message: string;
  read: boolean;
  created_at?: string;
}

export default function AdminMessagesPage() {
  const [items, setItems] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/contact');
      if (response.ok) {
        const data = await response.json();
        setItems(data);
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this message?')) return;

    try {
      setItems(items.filter((item) => item.id !== id));
      // Note: We don't have a DELETE endpoint for messages yet
      // In a real app, you'd want to add one
    } catch (error) {
      console.error('Failed to delete message:', error);
    }
  };

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Header */}
      <header className="bg-dark-900 border-b border-dark-800 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Contact Messages</h1>
            <p className="text-dark-muted text-sm">Messages from your website visitors</p>
          </div>
          <Link href="/admin/dashboard" className="btn btn-secondary text-sm">
            ← Back
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-dark-muted">Loading messages...</p>
          </div>
        ) : items.length > 0 ? (
          <div className="space-y-4 max-w-3xl mx-auto">
            {items.map((item) => (
              <div
                key={item.id}
                className={`card cursor-pointer transition-all ${
                  expandedId === item.id ? 'ring-2 ring-primary-500' : ''
                }`}
                onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      {!item.read && (
                        <span className="bg-primary-500 text-white text-xs px-2 py-1 rounded-full">
                          New
                        </span>
                      )}
                    </div>
                    <a
                      href={`mailto:${item.email}`}
                      className="text-primary-500 hover:text-primary-400 text-sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {item.email}
                    </a>
                  </div>
                  <span className="text-dark-muted text-sm whitespace-nowrap ml-4">
                    {formatDate(item.created_at || '')}
                  </span>
                </div>

                {/* Expanded Message */}
                {expandedId === item.id && (
                  <div className="border-t border-dark-700 pt-4 mt-4">
                    <p className="text-dark-muted whitespace-pre-wrap mb-4">{item.message}</p>
                    <div className="flex gap-2">
                      <a
                        href={`mailto:${item.email}`}
                        className="text-primary-500 hover:text-primary-400 text-sm font-medium"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Reply
                      </a>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item.id);
                        }}
                        className="text-red-500 hover:text-red-400 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 card">
            <p className="text-dark-muted">No messages yet.</p>
          </div>
        )}
      </main>
    </div>
  );
}
