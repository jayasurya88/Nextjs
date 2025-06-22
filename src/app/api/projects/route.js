import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabaseClient';

export async function GET() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request) {
  const projects = await request.json();

  // DANGER: This deletes all existing projects and replaces them.
  // This is suitable for this portfolio admin panel but be careful in other apps.
  
  // 1. Delete all existing projects
  const { error: deleteError } = await supabase
    .from('projects')
    .delete()
    .neq('id', 0); // Trick to delete all rows

  if (deleteError) {
    console.error('Error deleting projects:', deleteError);
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  // 2. Insert the new list of projects
  const { data, error: insertError } = await supabase
    .from('projects')
    .insert(projects)
    .select();

  if (insertError) {
    console.error('Error inserting projects:', insertError);
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json(data);
} 