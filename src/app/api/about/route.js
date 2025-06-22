import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabaseClient';

// GET Handler: Fetch about data
export async function GET() {
  const { data, error } = await supabase
    .from('about')
    .select('*')
    .single();

  if (error) {
    console.error('Error fetching about data:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// POST Handler: Update bio and handle image upload
export async function POST(request) {
  const formData = await request.formData();
  const bio = formData.get('bio');
  const imageFile = formData.get('image');

  let imageUrl = '';

  // 1. Handle the image upload if a new file is provided
  if (imageFile) {
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('uploads') // Make sure this is the name of your public bucket
      .upload(`about/${imageFile.name}_${Date.now()}`, imageFile, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    // Get the public URL of the uploaded image
    const { data: urlData } = supabase.storage
      .from('uploads')
      .getPublicUrl(uploadData.path);
    
    imageUrl = urlData.publicUrl;
  }

  // 2. Update the database
  // If a new image was uploaded, update the image_url. Otherwise, just update the bio.
  const updatePayload = { bio };
  if (imageUrl) {
    updatePayload.image_url = imageUrl;
  }

  const { data, error } = await supabase
    .from('about')
    .update(updatePayload)
    .eq('id', 1)
    .select()
    .single();

  if (error) {
    console.error('Error updating about data:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Rename image_url to image to match frontend expectation
  if (data) {
    data.image = data.image_url;
    delete data.image_url;
  }

  return NextResponse.json(data);
} 