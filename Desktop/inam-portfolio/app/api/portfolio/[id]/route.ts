import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getAuthCookie, verifyToken } from '@/lib/auth';

// GET single portfolio item
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await Promise.resolve(params);

    const result = await query(
      'SELECT * FROM portfolio_items WHERE id = $1 OR slug = $1',
      [isNaN(Number(id)) ? id : Number(id)]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Portfolio item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error) {
    console.error('Portfolio fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolio item' },
      { status: 500 }
    );
  }
}

// PUT update portfolio item (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = await getAuthCookie();

    if (!token || !verifyToken(token)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await Promise.resolve(params);
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

    const result = await query(
      `UPDATE portfolio_items
       SET title = $1, slug = $2, description = $3, challenge = $4, solution = $5,
           results = $6, images = $7, live_link = $8, technologies = $9, category = $10,
           featured = $11, updated_at = CURRENT_TIMESTAMP
       WHERE id = $12
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
        Number(id),
      ]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Portfolio item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error) {
    console.error('Portfolio update error:', error);
    return NextResponse.json(
      { error: 'Failed to update portfolio item' },
      { status: 500 }
    );
  }
}

// DELETE portfolio item (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = await getAuthCookie();

    if (!token || !verifyToken(token)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await Promise.resolve(params);

    const result = await query(
      'DELETE FROM portfolio_items WHERE id = $1 RETURNING *',
      [Number(id)]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Portfolio item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Portfolio item deleted' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Portfolio delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete portfolio item' },
      { status: 500 }
    );
  }
}
