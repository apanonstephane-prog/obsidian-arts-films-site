import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { buildSystemPrompt } from '@/lib/system-prompt';
import type { Profil } from '@/lib/types';

export const runtime = 'edge';
export const maxDuration = 60;

const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY ?? '',
  compatibility: 'compatible',
});

export async function POST(req: Request) {
  try {
    const { messages, profil, pdfContext } = (await req.json()) as {
      messages: Array<{ role: 'user' | 'assistant'; content: string }>;
      profil: Profil;
      pdfContext?: string;
    };

    if (!process.env.GROQ_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'GROQ_API_KEY non configuré' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const system = buildSystemPrompt(profil, pdfContext ?? '');

    const result = streamText({
      model: groq('llama-3.3-70b-versatile'),
      system,
      messages,
      temperature: 0.7,
      maxTokens: 4096,
    });

    return result.toDataStreamResponse();
  } catch (err) {
    console.error('[chat/route]', err);
    return new Response(
      JSON.stringify({ error: 'Erreur serveur' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
}
