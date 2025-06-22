import { promises as fs } from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/app/api/hero/hero.json');

export async function GET() {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return new Response(data, { status: 200 });
  } catch {
    return new Response(JSON.stringify({
      title: "Jayasurya",
      subtitle: "Aspiring DevOps Engineer | Automating the Future",
      buttonText: "View My Work",
      buttonLink: "#projects"
    }), { status: 200 });
  }
}

export async function POST(req) {
  const body = await req.json();
  await fs.writeFile(filePath, JSON.stringify(body, null, 2));
  return new Response(JSON.stringify({ success: true }), { status: 200 });
} 