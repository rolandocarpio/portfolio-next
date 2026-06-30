import { NextRequest } from 'next/server';
import sql from '@/lib/db';

export async function GET() {
  const entries = await sql`
    SELECT id, name, message, created_at
    FROM guestbook
    WHERE approved = true
    ORDER BY created_at DESC
  `;
  return Response.json(entries);
}

export async function POST(request: NextRequest) {
  const { name, message } = await request.json();

  if (!name || !message) {
    return Response.json({ error: 'Name and message are required' }, { status: 400 });
  }

  await sql`
    INSERT INTO guestbook (name, message)
    VALUES (${name}, ${message})
  `;

  return Response.json({ success: true }, { status: 201 });
}
