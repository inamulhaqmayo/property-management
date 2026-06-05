import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getAuthCookie, verifyToken } from '@/lib/auth';

// GET all testimonials
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured') === 'true';

    let sql = 'SELECT * FROM testimonials';
    const params: boolean[] = [];

    if (featured) {
      sql += ' WHERE featured = $1';
      params.push(true);
    }

    sql += ' ORDER BY order_number ASC, created_at DESC';

    const result = await query(sql, params as (string | boolean)[]);

    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error('Testimonials fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}

// POST create new testimonial (admin only)
export async function POST(request: NextRequest) {
  try {
    const token = await getAuthCookie();

    if (!token || !verifyToken(token)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { client_name, client_company, client_role, quote, image_url, rating, featured } =
      await request.json();

    if (!client_name || !quote) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await query(
      `INSERT INTO testimonials
       (client_name, client_company, client_role, quote, image_url, rating, featured)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [client_name, client_company || null, client_role || null, quote, image_url || null, rating || 5, featured || false]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Testimonial create error:', error);
    return NextResponse.json(
      { error: 'Failed to create testimonial' },
      { status: 500 }
    );
  }
}
