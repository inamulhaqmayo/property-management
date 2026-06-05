'use client';

import Image from 'next/image';
import Link from 'next/link';

interface PortfolioCardProps {
  id: number;
  title: string;
  slug: string;
  description: string;
  images?: string[];
  results?: string;
  category?: string;
}

export default function PortfolioCard({
  id,
  title,
  slug,
  description,
  images,
  results,
  category,
}: PortfolioCardProps) {
  const imageUrl = images && images.length > 0 ? images[0] : '/placeholder.jpg';

  return (
    <Link href={`/portfolio/${slug}`}>
      <div className="card group cursor-pointer h-full flex flex-col">
        {/* Image container */}
        <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg bg-dark-800">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {category && (
            <div className="absolute top-3 right-3 bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-medium">
              {category}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-grow flex flex-col">
          <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-500 transition-colors">
            {title}
          </h3>
          <p className="text-dark-muted text-sm mb-3 line-clamp-2">
            {description}
          </p>

          {results && (
            <p className="text-primary-400 text-sm font-medium mb-4">
              ✓ {results}
            </p>
          )}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2 text-primary-500 font-medium text-sm group-hover:gap-3 transition-all">
          View Case Study
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </Link>
  );
}
