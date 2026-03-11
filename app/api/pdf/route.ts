import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';
import type { Profil } from '@/lib/types';

export const runtime = 'nodejs';
export const maxDuration = 30;

const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY ?? '',
  compatibility: 'compatible',
});

/**
 * POST /api/pdf
 * Body: { fields: Record<string,string>, profil: Profil, pdfText: string }
 * Returns: { values: Record<string,string> }
 */
export async function POST(req: Request) {
  try {
    const { fields, profil, pdfText } = (await req.json()) as {
      fields: Record<string, string>;
      profil: Profil;
      pdfText: string;
    };

    const fieldNames = JSON.stringify(Object.keys(fields), null, 2);

    const prompt = `Tu es un expert en dossiers de subventions françaises.

Profil :
${JSON.stringify(profil, null, 2)}

Contenu PDF :
${pdfText.slice(0, 4000)}

Champs à remplir :
${fieldNames}

Génère les valeurs pour chaque champ selon le profil.
Réponds UNIQUEMENT avec un objet JSON valide, sans commentaires ni markdown.
Exemple : {"nom": "Dupont", "secteur": "Développement web"}`;

    const { text } = await generateText({
      model: groq('llama-3.3-70b-versatile'),
      prompt,
      temperature: 0.2,
    });

    const match = text.match(/\{[\s\S]*\}/);
    if (!match) {
      return Response.json({ values: {} });
    }

    const values = JSON.parse(match[0]) as Record<string, string>;
    return Response.json({ values });
  } catch (err) {
    console.error('[pdf/route]', err);
    return Response.json({ values: {} }, { status: 500 });
  }
}
