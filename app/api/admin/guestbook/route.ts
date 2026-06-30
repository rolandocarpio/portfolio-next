import { NextRequest } from 'next/server';
import sql from '@/lib/db';

export async function GET(request: NextRequest) {
  const auth = request.headers.get('authorization');

  if (auth !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const entries = await sql`
    SELECT id, name, message, approved, created_at
    FROM guestbook
    ORDER BY created_at DESC
  `;

  return Response.json(entries);
}
