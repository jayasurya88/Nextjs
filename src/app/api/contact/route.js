import { promises as fs } from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/app/api/contact/contact.json');

export async function GET() {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return new Response(data, { status: 200 });
  } catch {
    // Default contact info
    return new Response(JSON.stringify({
      email: 'jayasurya7879@gmail.com',
      phone: '',
      address: ''
    }), { status: 200 });
  }
}

export async function POST(req) {
  const body = await req.json();
  await fs.writeFile(filePath, JSON.stringify(body, null, 2));
  return new Response(JSON.stringify({ success: true }), { status: 200 });
} 