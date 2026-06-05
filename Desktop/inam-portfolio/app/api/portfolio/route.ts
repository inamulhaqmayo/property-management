import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getAuthCookie, verifyToken } from '@/lib/auth';

// GET all portfolio items or featured ones
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured') === 'true';

    let sql = 'SELECT * FROM portfolio_items';
    const params: (string | boolean)[] = [];

    if (featured) {
      sql += ' WHERE featured = $1';
      params.push(true);
    }

    sql += ' ORDER BY order_number ASC, created_at DESC';

    const result = await query(sql, params);

    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error('Portfolio fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolio items' },
      { status: 500 }
    );
  }
}

// POST create new portfolio item (admin only)
export async function POST(request: NextRequest) {
  try {
    const token = await getAuthCookie();

    if (!token || !verifyToken(token)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const {
      title,
      slug,
      description,
      challenge,
      solution,
      results,
      images,
      live_link,
      technologies,
      category,
      featured,
    } = await request.json();

    if (!title || !slug || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await query(
      `INSERT INTO portfolio_items
       (title, slug, description, challenge, solution, results, images, live_link, technologies, category, featured)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *`,
      [
        title,
        slug,
        description,
        challenge || null,
        solution || null,
        results || null,
        images ? JSON.stringify(images) : null,
        live_link || null,
        technologies || null,
        category || null,
        featured || false,
      ]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Portfolio create error:', error);
    return NextResponse.json(
      { error: 'Failed to create portfolio item' },
      { status: 500 }
    );
  }
}
