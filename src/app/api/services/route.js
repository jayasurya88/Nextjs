import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabaseClient';

export async function GET() {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request) {
  const services = await request.json();

  // DANGER: This deletes all existing services and replaces them.
  
  // 1. Delete all existing services
  const { error: deleteError } = await supabase
    .from('services')
    .delete()
    .neq('id', 0);

  if (deleteError) {
    console.error('Error deleting services:', deleteError);
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  // 2. Insert the new list of services
  const { data, error: insertError } = await supabase
    .from('services')
    .insert(services)
    .select();

  if (insertError) {
    console.error('Error inserting services:', insertError);
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json(data);
} 