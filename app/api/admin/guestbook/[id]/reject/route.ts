import { NextRequest } from 'next/server';
import sql from '@/lib/db';

export async function POST(request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const auth = request.headers.get('authorization');

  if (auth !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await ctx.params;

  await sql`
    DELETE FROM guestbook WHERE id = ${id}
  `;

  return Response.json({ success: true });
}
