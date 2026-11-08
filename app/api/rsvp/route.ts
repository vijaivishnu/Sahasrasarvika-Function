import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body.name || '').trim();
    const phone = String(body.phone || '').trim();
    const attendance = String(body.attendance || '');
    const guests = Math.max(1, Math.min(20, Number(body.guests) || 1));
    const message = String(body.message || '').trim().slice(0, 500);
    if (!name || !phone || !['yes','no','maybe'].includes(attendance)) return NextResponse.json({ error: 'பெயர், தொலைபேசி எண் மற்றும் வருகை விவரங்களை சரிபார்க்கவும்.' }, { status: 400 });
    if (!/^[+0-9\s-]{7,18}$/.test(phone)) return NextResponse.json({ error: 'சரியான தொலைபேசி எண்ணை உள்ளிடவும்.' }, { status: 400 });
    const supabase = getSupabaseAdmin();
    if (!supabase) return NextResponse.json({ error: 'RSVP சேமிப்பு இன்னும் அமைக்கப்படவில்லை. நிர்வாகியைத் தொடர்பு கொள்ளவும்.' }, { status: 503 });
    const { error } = await supabase.from('rsvps').insert({ name, phone, attendance, guests, message });
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ error: 'சமர்ப்பிக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.' }, { status: 500 }); }
}
