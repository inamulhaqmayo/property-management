import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getAuthCookie, verifyToken } from '@/lib/auth';

// GET single blog post
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await Promise.resolve(params);
    const token = await getAuthCookie();
    const isAdmin = token && verifyToken(token);

    let sql = 'SELECT * FROM blog_posts WHERE id = $1 OR slug = $1';
    const params_arr: (string | number)[] = [isNaN(Number(id)) ? id : Number(id)];

    const result = await query(sql, params_arr);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    const post = result.rows[0];

    // If not published and not admin, deny access
    if (!post.published && !isAdmin) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error('Blog post fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}

// PUT update blog post (admin only)
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
    const { title, slug, content, excerpt, featured_image, published } = await request.json();

    const result = await query(
      `UPDATE blog_posts
       SET title = $1, slug = $2, content = $3, excerpt = $4, featured_image = $5,
           published = $6, published_at = CASE WHEN $6 THEN CURRENT_TIMESTAMP ELSE published_at END,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $7
       RETURNING *`,
      [title, slug, content, excerpt || null, featured_image || null, published || false, Number(id)]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error) {
    console.error('Blog post update error:', error);
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

// DELETE blog post (admin only)
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
      'DELETE FROM blog_posts WHERE id = $1 RETURNING *',
      [Number(id)]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Blog post deleted' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Blog post delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}
