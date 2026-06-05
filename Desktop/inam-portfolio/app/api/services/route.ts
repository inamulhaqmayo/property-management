import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getAuthCookie, verifyToken } from '@/lib/auth';

// GET all services
export async function GET(request: NextRequest) {
  try {
    const result = await query(
      'SELECT * FROM services ORDER BY order_number ASC, created_at DESC'
    );

    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error('Services fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}

// POST create new service (admin only)
export async function POST(request: NextRequest) {
  try {
    const token = await getAuthCookie();

    if (!token || !verifyToken(token)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { title, slug, description, icon } = await request.json();

    if (!title || !slug || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await query(
      `INSERT INTO services
       (title, slug, description, icon)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [title, slug, description, icon || null]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Service create error:', error);
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    );
  }
}
