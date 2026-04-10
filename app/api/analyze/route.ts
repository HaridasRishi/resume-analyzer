export const runtime = "nodejs";
import { NextRequest, NextResponse } from 'next/server';
import pdf from 'pdf-parse';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  const buffer = Buffer.from(await file.arrayBuffer());
  const data = await pdf(buffer);

  const resumeText = data.text;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'user',
        content: `Extract skills, experience, education and job roles from this resume:\n${resumeText}`,
      },
    ],
  });

  return NextResponse.json({
    result: completion.choices[0].message.content,
  });
}
