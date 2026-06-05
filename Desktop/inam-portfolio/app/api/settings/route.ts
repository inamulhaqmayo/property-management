import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getAuthCookie, verifyToken } from '@/lib/auth';

// GET all settings (public)
export async function GET(request: NextRequest) {
  try {
    const result = await query('SELECT setting_key, setting_value FROM site_settings');

    const settings: { [key: string]: string } = {};
    result.rows.forEach((row: { setting_key: string; setting_value: string }) => {
      settings[row.setting_key] = row.setting_value;
    });

    return NextResponse.json(settings, { status: 200 });
  } catch (error) {
    console.error('Settings fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

// PUT update settings (admin only)
export async function PUT(request: NextRequest) {
  try {
    const token = await getAuthCookie();

    if (!token || !verifyToken(token)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const settings = await request.json();

    for (const [key, value] of Object.entries(settings)) {
      await query(
        `INSERT INTO site_settings (setting_key, setting_value)
         VALUES ($1, $2)
         ON CONFLICT (setting_key) DO UPDATE SET setting_value = $2, updated_at = CURRENT_TIMESTAMP`,
        [key, String(value)]
      );
    }

    return NextResponse.json({ success: true, message: 'Settings updated' }, { status: 200 });
  } catch (error) {
    console.error('Settings update error:', error);
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}
