import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const { filename, dataUrl } = await req.json();
    if (!filename || !dataUrl) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const partnersDir = path.join(process.cwd(), 'public', 'partners');
    if (!fs.existsSync(partnersDir)) {
      fs.mkdirSync(partnersDir, { recursive: true });
    }

    const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    const filePath = path.join(partnersDir, filename);

    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({ success: true, file: `/partners/${filename}` });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
