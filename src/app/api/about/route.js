import { promises as fs } from 'fs';
import path from 'path';

const aboutPath = path.join(process.cwd(), 'src/app/api/about/about.json');
const uploadDir = path.join(process.cwd(), 'public/uploads');

export async function POST(req) {
  const formData = await req.formData();
  const bio = formData.get('bio');
  const file = formData.get('image');

  let imagePath = '';

  if (file && typeof file === 'object' && file.name) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.mkdir(uploadDir, { recursive: true });
    const fileName = Date.now() + '-' + file.name.replace(/\s/g, '_');
    const filePath = path.join(uploadDir, fileName);
    await fs.writeFile(filePath, buffer);
    imagePath = `/uploads/${fileName}`;
  }

  const aboutData = { bio, image: imagePath };
  await fs.writeFile(aboutPath, JSON.stringify(aboutData, null, 2));
  return new Response(JSON.stringify({ success: true, image: imagePath }), { status: 200 });
}

export async function GET() {
  try {
    const data = await fs.readFile(aboutPath, 'utf-8');
    return new Response(data, { status: 200 });
  } catch {
    return new Response(JSON.stringify({
      bio: "",
      image: ""
    }), { status: 200 });
  }
} 