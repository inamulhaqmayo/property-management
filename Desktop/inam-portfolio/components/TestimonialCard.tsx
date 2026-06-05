'use client';

interface TestimonialCardProps {
  id: number;
  client_name: string;
  client_company?: string;
  client_role?: string;
  quote: string;
  image_url?: string;
  rating?: number;
}

export default function TestimonialCard({
  client_name,
  client_company,
  client_role,
  quote,
  image_url,
  rating = 5,
}: TestimonialCardProps) {
  return (
    <div className="card">
      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <span key={i} className="text-primary-400">
            ★
          </span>
        ))}
      </div>

      {/* Quote */}
      <p className="text-dark-text mb-6 italic">
        "{quote}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        {image_url && (
          <img
            src={image_url}
            alt={client_name}
            className="w-12 h-12 rounded-full object-cover"
          />
        )}
        <div>
          <p className="font-semibold text-sm">{client_name}</p>
          {client_role && (
            <p className="text-dark-muted text-xs">{client_role}</p>
          )}
          {client_company && (
            <p className="text-primary-500 text-xs font-medium">{client_company}</p>
          )}
        </div>
      </div>
    </div>
  );
}
