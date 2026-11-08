import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';
export async function GET(req: Request) {
  const auth = req.headers.get('authorization');
  const username = req.headers.get('x-admin-username')?.trim();
  const allowedUsers = (process.env.ADMIN_USERNAMES || '').split(',').map((v) => v.trim()).filter(Boolean);
  const validUser = Boolean(username && allowedUsers.includes(username));
  const validPassword = Boolean(process.env.ADMIN_PASSWORD && auth === `Bearer ${process.env.ADMIN_PASSWORD}`);
  if (!validUser || !validPassword) return NextResponse.json({ error: 'Invalid admin username or password' }, { status: 401 });
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: 'Supabase is not configured' }, { status: 503 });
  const { data, error } = await supabase.from('rsvps').select('*').order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: 'Could not load RSVPs' }, { status: 500 });
  return NextResponse.json({ data });
}
