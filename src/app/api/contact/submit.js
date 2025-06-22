import nodemailer from 'nodemailer';
import { promises as fs } from 'fs';
import path from 'path';

const contactedPath = path.join(process.cwd(), 'src/app/api/contact/contacted.json');

export async function POST(req) {
  const { name, email, message } = await req.json();

  // Save to contacted.json
  let submissions = [];
  try {
    const data = await fs.readFile(contactedPath, 'utf-8');
    submissions = JSON.parse(data);
  } catch {}
  submissions.push({ name, email, message, date: new Date().toISOString() });
  await fs.writeFile(contactedPath, JSON.stringify(submissions, null, 2));

  // Send email
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jayasurya7879@gmail.com',
      pass: 'YOUR_APP_PASSWORD' // Replace with your Gmail app password
    }
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${email}>`,
      to: 'jayasurya7879@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      text: message,
      html: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Message:</b><br/>${message}</p>`
    });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
}

export async function GET() {
  try {
    const data = await fs.readFile(contactedPath, 'utf-8');
    return new Response(data, { status: 200 });
  } catch {
    return new Response(JSON.stringify([]), { status: 200 });
  }
} 