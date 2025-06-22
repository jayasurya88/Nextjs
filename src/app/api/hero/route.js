import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabaseClient';

export async function GET() {
  const { data, error } = await supabase
    .from('hero')
    .select('*')
    .single(); // We only expect one row for the hero section

  if (error) {
    console.error('Error fetching hero data:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request) {
  const body = await request.json();

  const { data, error } = await supabase
    .from('hero')
    .update({
      title: body.title,
      subtitle: body.subtitle,
      button_text: body.buttonText,
      button_link: body.buttonLink,
    })
    .eq('id', 1) // We are always updating the row with id = 1
    .select();

  if (error) {
    console.error('Error updating hero data:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
} 