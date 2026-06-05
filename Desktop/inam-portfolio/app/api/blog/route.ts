import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getAuthCookie, verifyToken } from '@/lib/auth';

// GET all published blog posts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeUnpublished = searchParams.get('includeUnpublished') === 'true';
    const token = await getAuthCookie();
    const isAdmin = token && verifyToken(token);

    let sql = 'SELECT * FROM blog_posts';
    const params: boolean[] = [];

    if (!isAdmin && !includeUnpublished) {
      sql += ' WHERE published = $1';
      params.push(true);
    }

    sql += ' ORDER BY published_at DESC, created_at DESC';

    const result = await query(sql, params as (string | boolean)[]);

    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error('Blog posts fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

// POST create new blog post (admin only)
export async function POST(request: NextRequest) {
  try {
    const token = await getAuthCookie();

    if (!token || !verifyToken(token)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { title, slug, content, excerpt, featured_image, published } = await request.json();

    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await query(
      `INSERT INTO blog_posts
       (title, slug, content, excerpt, featured_image, published, published_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        title,
        slug,
        content,
        excerpt || null,
        featured_image || null,
        published || false,
        published ? new Date() : null,
      ]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Blog post create error:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}
