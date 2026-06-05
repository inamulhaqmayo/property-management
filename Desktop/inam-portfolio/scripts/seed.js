const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

async function seedDatabase() {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // 1. Create admin user
    console.log('Creating admin user...');
    const hashedPassword = await hashPassword('demo123456');
    await client.query(
      `INSERT INTO users (email, password_hash)
       VALUES ($1, $2)
       ON CONFLICT (email) DO NOTHING`,
      ['admin@inamulhaq.com', hashedPassword]
    );

    // 2. Add site settings
    console.log('Adding site settings...');
    const settings = {
      headline: 'Build High-Converting Shopify Stores',
      bio: 'Professional Shopify Developer with 9+ years of experience creating and optimizing eCommerce solutions that drive real results. I specialize in theme development, performance optimization, and custom feature implementation.',
      years_experience: '9',
      email: 'contact@inamulhaq.com',
      phone: '+1-234-567-8900',
      linkedin: 'https://linkedin.com/in/inamulhaq',
      github: 'https://github.com/inamulhaq',
    };

    for (const [key, value] of Object.entries(settings)) {
      await client.query(
        `INSERT INTO site_settings (setting_key, setting_value)
         VALUES ($1, $2)
         ON CONFLICT (setting_key) DO UPDATE SET setting_value = $2`,
        [key, value]
      );
    }

    // 3. Add services
    console.log('Adding services...');
    const services = [
      {
        title: 'Theme Development',
        slug: 'theme-development',
        description: 'Custom Shopify theme development from scratch or modification of existing themes to match your brand vision.',
        icon: '🎨',
      },
      {
        title: 'Performance Optimization',
        slug: 'performance-optimization',
        description: 'Improve your store\'s speed, reduce load times, and boost SEO rankings with comprehensive optimization.',
        icon: '⚡',
      },
      {
        title: 'App Integration',
        slug: 'app-integration',
        description: 'Integrate third-party apps and custom solutions to extend your store\'s functionality.',
        icon: '🔌',
      },
      {
        title: 'Conversion Optimization',
        slug: 'conversion-optimization',
        description: 'Increase sales and reduce cart abandonment through strategic UX/UI improvements.',
        icon: '📈',
      },
    ];

    for (const service of services) {
      await client.query(
        `INSERT INTO services (title, slug, description, icon)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (slug) DO NOTHING`,
        [service.title, service.slug, service.description, service.icon]
      );
    }

    // 4. Add portfolio items
    console.log('Adding portfolio items...');
    const portfolioItems = [
      {
        title: 'Premium Fashion Store Optimization',
        slug: 'fashion-store-optimization',
        description: 'Optimized a high-traffic fashion ecommerce store for speed and conversions.',
        challenge:
          'The client\'s store was experiencing slow load times (8+ seconds) and high cart abandonment rates. Mobile users were dropping off at checkout.',
        solution:
          'Implemented image optimization, lazy loading, code splitting, and streamlined checkout process. Updated to latest Shopify themes and optimized Liquid code.',
        results:
          'Reduced page load time from 8.2s to 2.1s (74% improvement). Cart abandonment decreased from 42% to 28%. Conversion rate increased by 23%.',
        live_link: 'https://example-fashion.myshopify.com',
        technologies: 'Shopify Liquid, JavaScript, CSS, Webpack',
        category: 'Performance Optimization',
        featured: true,
      },
      {
        title: 'Custom Product Filter System',
        slug: 'custom-product-filter',
        description: 'Built a dynamic product filtering system for a high-volume store.',
        challenge:
          'The store had thousands of products but no effective filtering. Customers struggled to find what they wanted.',
        solution:
          'Developed a custom AJAX-based product filter with advanced filtering options including price range, size, color, and rating.',
        results:
          'Reduced bounce rate from 45% to 28%. Average session duration increased from 2 minutes to 5+ minutes.',
        live_link: 'https://example-products.myshopify.com',
        technologies: 'Shopify Liquid, Vue.js, AJAX',
        category: 'Custom Features',
        featured: true,
      },
      {
        title: 'Headless Commerce Integration',
        slug: 'headless-commerce',
        description: 'Integrated Shopify as headless CMS with custom frontend.',
        challenge:
          'Client needed a decoupled architecture for better flexibility and performance.',
        solution:
          'Set up Shopify as backend with custom Next.js frontend, implemented real-time inventory sync and advanced product features.',
        results:
          'Improved page load time by 60%. Enhanced developer experience for future updates.',
        live_link: 'https://example-headless.vercel.app',
        technologies: 'Shopify Admin API, Next.js, React',
        category: 'Custom Features',
        featured: false,
      },
    ];

    for (let i = 0; i < portfolioItems.length; i++) {
      const item = portfolioItems[i];
      await client.query(
        `INSERT INTO portfolio_items
         (title, slug, description, challenge, solution, results, live_link, technologies, category, featured, order_number)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
         ON CONFLICT (slug) DO NOTHING`,
        [
          item.title,
          item.slug,
          item.description,
          item.challenge,
          item.solution,
          item.results,
          item.live_link,
          item.technologies,
          item.category,
          item.featured,
          i,
        ]
      );
    }

    // 5. Add testimonials
    console.log('Adding testimonials...');
    const testimonials = [
      {
        client_name: 'Sarah Johnson',
        client_company: 'LuxeStyle Boutique',
        client_role: 'Store Owner',
        quote:
          'Inam transformed our store. The speed improvements alone increased our conversion rate by 23%. Highly recommended!',
        rating: 5,
        featured: true,
      },
      {
        client_name: 'Michael Chen',
        client_company: 'TechGear Inc',
        client_role: 'E-commerce Manager',
        quote:
          'Professional, responsive, and thorough. Inam understood our needs and delivered beyond expectations.',
        rating: 5,
        featured: true,
      },
      {
        client_name: 'Emma Wilson',
        client_company: 'Artisan Crafts',
        client_role: 'Founder',
        quote:
          'The custom features Inam implemented have made our store stand out. Our customers love the experience.',
        rating: 5,
        featured: false,
      },
    ];

    for (let i = 0; i < testimonials.length; i++) {
      const testimonial = testimonials[i];
      await client.query(
        `INSERT INTO testimonials
         (client_name, client_company, client_role, quote, rating, featured, order_number)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         ON CONFLICT DO NOTHING`,
        [
          testimonial.client_name,
          testimonial.client_company,
          testimonial.client_role,
          testimonial.quote,
          testimonial.rating,
          testimonial.featured,
          i,
        ]
      );
    }

    // 6. Add blog posts
    console.log('Adding blog posts...');
    const blogPosts = [
      {
        title: 'How to Optimize Your Shopify Store for Speed',
        slug: 'optimize-shopify-speed',
        excerpt:
          'Learn proven strategies to reduce page load time and improve conversion rates.',
        content:
          'Page speed is critical for ecommerce success. Studies show that every second of delay can cost you sales.\n\nHere are proven strategies to optimize your Shopify store:\n\n1. Image Optimization\nCompress images without losing quality. Use WebP format when possible. Implement lazy loading for below-the-fold images.\n\n2. Reduce JavaScript\nMinify and bundle your JavaScript files. Remove unused code and dependencies. Consider using native browser APIs instead of libraries.\n\n3. Optimize Liquid Templates\nAvoid nested loops in Liquid. Use pagination for large collections. Cache computed values.\n\n4. Enable Gzip Compression\nMost hosting providers support Gzip. This can reduce file sizes by 70%.\n\n5. Use a Content Delivery Network (CDN)\nDistribute your content globally. Vercel Edge Network is an excellent option.\n\nImplementing these strategies can reduce load times by 50-70%.',
        featured_image: 'https://via.placeholder.com/800x400?text=Speed+Optimization',
        published: true,
      },
      {
        title: 'Shopify Theme Customization Best Practices',
        slug: 'theme-customization-best-practices',
        excerpt:
          'Tips and tricks for customizing Shopify themes without breaking functionality.',
        content:
          'Customizing your Shopify theme doesn\'t have to be complicated. Here are best practices I recommend:\n\n1. Always Use a Child Theme\nThis preserves your customizations when the parent theme updates.\n\n2. Keep Custom CSS Organized\nUse a separate CSS file for custom styles. Use meaningful class names.\n\n3. Avoid Inline Styles\nKeep your HTML clean. All styling should be in CSS.\n\n4. Use Shopify\'s Built-in Features First\nBefore writing custom code, check if Shopify has a native feature.\n\n5. Test Across Devices\nAlways test your customizations on mobile, tablet, and desktop.\n\n6. Document Your Changes\nLeave comments explaining why changes were made.\n\nThese practices will make your theme more maintainable and scalable.',
        featured_image: 'https://via.placeholder.com/800x400?text=Theme+Customization',
        published: true,
      },
      {
        title: 'Top 5 Shopify Apps for Increasing Sales',
        slug: 'top-shopify-apps-sales',
        excerpt: 'Recommended apps that can significantly boost your store revenue.',
        content:
          'Not all apps are created equal. Here are my top 5 recommendations based on real results:\n\n1. Growave - Reviews & Loyalty\nBuild customer loyalty and collect reviews to increase trust.\n\n2. Smile - Loyalty Program\nIncrease repeat purchases with a customizable loyalty program.\n\n3. Judge.me - Product Reviews\nHigh-converting review app that\'s easy to set up.\n\n4. Rebuy - Product Recommendations\nAI-powered recommendations that increase average order value.\n\n5. Yotpo - Marketing Automation\nAutomated email campaigns based on customer behavior.\n\nEach of these apps has a proven ROI. Start with 1-2 and expand as needed.',
        featured_image: 'https://via.placeholder.com/800x400?text=Shopify+Apps',
        published: false,
      },
    ];

    for (const post of blogPosts) {
      await client.query(
        `INSERT INTO blog_posts
         (title, slug, content, excerpt, featured_image, published, published_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         ON CONFLICT (slug) DO NOTHING`,
        [
          post.title,
          post.slug,
          post.content,
          post.excerpt,
          post.featured_image,
          post.published,
          post.published ? new Date() : null,
        ]
      );
    }

    await client.query('COMMIT');
    console.log('✓ Database seeded successfully!');
    console.log(`\nAdmin Login:`);
    console.log(`Email: admin@inamulhaq.com`);
    console.log(`Password: demo123456`);
    process.exit(0);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Seed error:', error);
    process.exit(1);
  } finally {
    client.release();
  }
}

seedDatabase();
