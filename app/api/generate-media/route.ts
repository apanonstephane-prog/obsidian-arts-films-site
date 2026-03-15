/**
 * API Route: POST /api/generate-media
 *
 * Génère des images et/ou vidéos via Replicate à partir d'un contexte.
 *
 * Body JSON:
 * {
 *   projectDescription: string      // Description du projet ou contexte
 *   themes?: string[]               // Mots-clés optionnels
 *   style?: string                  // Style visuel souhaité
 *   mediaTypes?: ('image'|'video')[] // Par défaut: ['image']
 *   count?: number                  // Nombre de médias (1-4)
 *   language?: 'fr' | 'en'
 * }
 */

import { NextRequest, NextResponse } from 'next/server'
import {
  runMediaPipeline,
  analyzeContextForMedia,
  type MediaContext,
  type MediaType,
} from '@/lib/replicate-media'

export const runtime = 'nodejs' // Replicate nécessite Node.js runtime (pas Edge)
export const maxDuration = 120   // 2 minutes max pour la génération vidéo

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const {
      projectDescription,
      themes,
      style,
      mediaTypes = ['image'],
      count = 1,
      language = 'fr',
    } = body as {
      projectDescription: string
      themes?: string[]
      style?: string
      mediaTypes?: MediaType[]
      count?: number
      language?: 'fr' | 'en'
    }

    // Validation
    if (!projectDescription || typeof projectDescription !== 'string') {
      return NextResponse.json(
        { error: 'projectDescription est requis' },
        { status: 400 }
      )
    }

    if (count > 4) {
      return NextResponse.json(
        { error: 'count maximum est 4' },
        { status: 400 }
      )
    }

    const context: MediaContext = {
      projectDescription,
      themes,
      style: style as MediaContext['style'],
      count,
      language,
    }

    // Analyse du contexte (retournée même sans génération)
    const analysis = analyzeContextForMedia(context)

    // Lancement du pipeline
    const result = await runMediaPipeline(context, mediaTypes)

    return NextResponse.json({
      ...result,
      analysis: {
        detectedStyle: analysis.recommendedStyle,
        imagePrompt: analysis.imagePrompt,
        videoPrompt: analysis.videoPrompt,
        keywords: analysis.keywords,
      },
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erreur inconnue'
    console.error('[generate-media] Error:', message)
    return NextResponse.json(
      { error: message, success: false },
      { status: 500 }
    )
  }
}

/**
 * GET /api/generate-media?description=...&type=image
 * Version simplifiée pour tests rapides depuis le navigateur ou Claude Code
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const description = searchParams.get('description')
  const type = (searchParams.get('type') || 'image') as MediaType

  if (!description) {
    return NextResponse.json(
      {
        usage: 'GET /api/generate-media?description=votre+description&type=image|video',
        example: '/api/generate-media?description=Affiche+film+noir+parisien&type=image',
        models: {
          image: ['flux-schnell (rapide)', 'flux-dev (qualité)', 'sdxl (polyvalent)'],
          video: ['ltx-video (rapide)', 'minimax-video (cinématique)'],
        },
      },
      { status: 200 }
    )
  }

  const result = await runMediaPipeline(
    { projectDescription: description, count: 1 },
    [type]
  )

  return NextResponse.json(result)
}
