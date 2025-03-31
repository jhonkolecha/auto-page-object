import { NextRequest, NextResponse } from 'next/server';
import { run } from '../../../lib/index';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { url, pageName } = body;

  if (!url || !pageName) {
    return NextResponse.json({ error: 'URL e nome da página são obrigatórios.' }, { status: 400 });
  }

  try {
    await run(url, pageName);
    return NextResponse.json({ success: true, tsPath: `output/${pageName}/${pageName}.ts` });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Erro interno.' }, { status: 500 });
  }
}
