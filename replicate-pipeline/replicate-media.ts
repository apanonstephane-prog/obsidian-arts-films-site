/**
 * Replicate Media Pipeline
 *
 * Pipeline universel pour générer des images et vidéos via Replicate
 * à partir du contexte d'une conversation ou d'un projet.
 *
 * Usage depuis Claude Code:
 *   import { generateMedia, analyzeContextForMedia } from '@/lib/replicate-media'
 */

import Replicate from 'replicate'

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export type MediaType = 'image' | 'video'
export type ImageStyle =
  | 'photorealistic'
  | 'cinematic'
  | 'illustration'
  | 'abstract'
  | 'logo'
  | 'poster'
  | 'documentary'

export type VideoStyle = 'cinematic' | 'animation' | 'documentary' | 'slideshow'

export interface MediaContext {
  /** Texte libre décrivant le projet ou la conversation */
  projectDescription: string
  /** Thèmes ou mots-clés extraits du contexte */
  themes?: string[]
  /** Style visuel souhaité */
  style?: ImageStyle | VideoStyle
  /** Langue du projet (influe sur les métadonnées) */
  language?: 'fr' | 'en'
  /** Nombre de médias à générer */
  count?: number
}

export interface GeneratedImage {
  type: 'image'
  url: string
  prompt: string
  model: string
  style: ImageStyle
  width: number
  height: number
}

export interface GeneratedVideo {
  type: 'video'
  url: string
  prompt: string
  model: string
  style: VideoStyle
  durationSeconds: number
}

export type GeneratedMedia = GeneratedImage | GeneratedVideo

export interface MediaPipelineResult {
  success: boolean
  media: GeneratedMedia[]
  context: MediaContext
  generatedAt: string
  error?: string
}

// ─────────────────────────────────────────────
// Models disponibles sur Replicate
// ─────────────────────────────────────────────

const IMAGE_MODELS = {
  /** FLUX Schnell - rapide, haute qualité */
  flux_schnell: 'black-forest-labs/flux-schnell',
  /** FLUX Dev - qualité maximale */
  flux_dev: 'black-forest-labs/flux-dev',
  /** SDXL - polyvalent */
  sdxl: 'stability-ai/sdxl:7762fd07cf82c948538e41f63f77d685e02b063e0ccecb392132cd624d971be3',
} as const

const VIDEO_MODELS = {
  /** Minimax Video - cinématique */
  minimax: 'minimax/video-01',
  /** LTX Video - rapide */
  ltx: 'lightricks/ltx-video',
} as const

// ─────────────────────────────────────────────
// Analyse du contexte → prompt optimisé
// ─────────────────────────────────────────────

/**
 * Analyse le contexte du projet et extrait les éléments visuels pertinents.
 * Peut être utilisé par Claude pour comprendre quel type de média générer.
 */
export function analyzeContextForMedia(context: MediaContext): {
  imagePrompt: string
  videoPrompt: string
  recommendedStyle: ImageStyle
  keywords: string[]
} {
  const { projectDescription, themes = [], style, language = 'fr' } = context

  // Extraction automatique de mots-clés du contexte
  const keywordPatterns = {
    cinematic: ['film', 'cinéma', 'cinema', 'movie', 'court-métrage', 'réalisateur', 'director', 'scene'],
    documentary: ['documentaire', 'documentary', 'reportage', 'témoignage', 'histoire', 'history'],
    abstract: ['art', 'abstrait', 'abstract', 'design', 'créatif', 'creative', 'artistique'],
    photorealistic: ['photo', 'réel', 'real', 'portrait', 'paysage', 'landscape', 'produit', 'product'],
    poster: ['affiche', 'poster', 'promotion', 'événement', 'event', 'concert', 'festival'],
    logo: ['logo', 'marque', 'brand', 'identité', 'identity', 'entreprise', 'company'],
    illustration: ['illustration', 'dessin', 'drawing', 'manga', 'comic', 'bande dessinée'],
  }

  // Détection du style depuis le contexte si non spécifié
  let detectedStyle: ImageStyle = style as ImageStyle || 'cinematic'
  const allText = `${projectDescription} ${themes.join(' ')}`.toLowerCase()

  if (!style) {
    for (const [detectedType, keywords] of Object.entries(keywordPatterns)) {
      if (keywords.some(kw => allText.includes(kw))) {
        detectedStyle = detectedType as ImageStyle
        break
      }
    }
  }

  // Construction du prompt image enrichi
  const styleModifiers: Record<ImageStyle, string> = {
    cinematic: 'cinematic lighting, dramatic composition, film grain, anamorphic lens, 8K',
    photorealistic: 'photorealistic, professional photography, sharp details, natural lighting, 8K RAW',
    documentary: 'documentary style, candid, authentic, natural light, reportage photography',
    abstract: 'abstract art, contemporary, bold colors, artistic composition, museum quality',
    poster: 'professional poster design, bold typography space, high contrast, commercial art',
    logo: 'minimal logo design, vector style, clean lines, professional branding',
    illustration: 'detailed illustration, concept art, stylized, vibrant colors, editorial',
  }

  const styleModifiersVideo: Record<VideoStyle, string> = {
    cinematic: 'cinematic quality, smooth camera movement, professional grade, film look',
    animation: 'smooth animation, vivid colors, fluid motion, animated film quality',
    documentary: 'documentary footage, handheld camera, authentic, natural movement',
    slideshow: 'elegant transitions, slow pan, Ken Burns effect, gallery quality',
  }

  const langPrefix = language === 'fr'
    ? `Projet français: ${projectDescription}`
    : projectDescription

  const themeStr = themes.length > 0 ? themes.join(', ') : ''
  const baseDescription = themeStr
    ? `${langPrefix} — themes: ${themeStr}`
    : langPrefix

  const imagePrompt = `${baseDescription}, ${styleModifiers[detectedStyle]}, no text overlay, high quality`
  const videoPrompt = `${baseDescription}, ${styleModifiersVideo[detectedStyle as VideoStyle || 'cinematic']}, no text`

  // Mots-clés extraits
  const keywords = themes.length > 0
    ? themes
    : projectDescription
        .split(/[\s,.-]+/)
        .filter(w => w.length > 3)
        .slice(0, 8)

  return {
    imagePrompt,
    videoPrompt,
    recommendedStyle: detectedStyle,
    keywords,
  }
}

// ─────────────────────────────────────────────
// Génération d'image
// ─────────────────────────────────────────────

export async function generateImage(
  prompt: string,
  options: {
    style?: ImageStyle
    width?: number
    height?: number
    model?: keyof typeof IMAGE_MODELS
  } = {}
): Promise<GeneratedImage> {
  const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN })

  const width = options.width || 1344
  const height = options.height || 768
  const modelKey = options.model || 'flux_schnell'
  const modelId = IMAGE_MODELS[modelKey]

  const output = await replicate.run(modelId as `${string}/${string}`, {
    input: {
      prompt,
      width,
      height,
      num_inference_steps: modelKey === 'flux_schnell' ? 4 : 28,
      guidance_scale: modelKey === 'flux_schnell' ? 0 : 3.5,
      output_format: 'webp',
      output_quality: 90,
    },
  })

  // Replicate retourne un tableau ou un FileOutput
  const urls = Array.isArray(output) ? output : [output]
  const url = typeof urls[0] === 'string' ? urls[0] : (urls[0] as { url: () => string }).url?.() || String(urls[0])

  return {
    type: 'image',
    url,
    prompt,
    model: modelId,
    style: options.style || 'cinematic',
    width,
    height,
  }
}

// ─────────────────────────────────────────────
// Génération de vidéo
// ─────────────────────────────────────────────

export async function generateVideo(
  prompt: string,
  options: {
    style?: VideoStyle
    durationSeconds?: number
    model?: keyof typeof VIDEO_MODELS
  } = {}
): Promise<GeneratedVideo> {
  const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN })

  const duration = options.durationSeconds || 5
  const modelKey = options.model || 'ltx'
  const modelId = VIDEO_MODELS[modelKey]

  const input: Record<string, unknown> = { prompt }

  if (modelKey === 'minimax') {
    input.first_frame_image = null
    input.prompt_optimizer = true
  } else {
    // LTX Video
    input.width = 768
    input.height = 512
    input.num_frames = duration * 24
    input.num_inference_steps = 50
    input.guidance_scale = 3
  }

  const output = await replicate.run(modelId as `${string}/${string}`, { input })

  const urls = Array.isArray(output) ? output : [output]
  const url = typeof urls[0] === 'string' ? urls[0] : String(urls[0])

  return {
    type: 'video',
    url,
    prompt,
    model: modelId,
    style: options.style || 'cinematic',
    durationSeconds: duration,
  }
}

// ─────────────────────────────────────────────
// Pipeline principal — point d'entrée unifié
// ─────────────────────────────────────────────

/**
 * Pipeline principal : prend un contexte, génère les médias appropriés.
 *
 * @example
 * const result = await runMediaPipeline({
 *   projectDescription: "Court-métrage sur l'intelligence artificielle en Afrique",
 *   themes: ["futur", "Afrique", "technologie", "espoir"],
 *   style: "cinematic",
 *   count: 3,
 * })
 */
export async function runMediaPipeline(
  context: MediaContext,
  mediaTypes: MediaType[] = ['image']
): Promise<MediaPipelineResult> {
  const startTime = new Date().toISOString()

  if (!process.env.REPLICATE_API_TOKEN) {
    return {
      success: false,
      media: [],
      context,
      generatedAt: startTime,
      error: 'REPLICATE_API_TOKEN manquant dans les variables d\'environnement',
    }
  }

  const count = context.count || 1
  const { imagePrompt, videoPrompt, recommendedStyle } = analyzeContextForMedia(context)

  const results: GeneratedMedia[] = []
  const errors: string[] = []

  for (let i = 0; i < count; i++) {
    for (const mediaType of mediaTypes) {
      try {
        if (mediaType === 'image') {
          const img = await generateImage(imagePrompt, {
            style: (context.style as ImageStyle) || recommendedStyle,
          })
          results.push(img)
        } else if (mediaType === 'video') {
          const vid = await generateVideo(videoPrompt, {
            style: (context.style as VideoStyle) || 'cinematic',
          })
          results.push(vid)
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err)
        errors.push(`[${mediaType} #${i + 1}] ${message}`)
      }
    }
  }

  return {
    success: results.length > 0,
    media: results,
    context,
    generatedAt: startTime,
    error: errors.length > 0 ? errors.join('\n') : undefined,
  }
}

// ─────────────────────────────────────────────
// Utilitaires pour Claude Code
// ─────────────────────────────────────────────

/**
 * Génération rapide depuis un simple texte descriptif.
 * Idéal pour une utilisation directe depuis Claude Code.
 *
 * @example
 * const { images } = await quickGenerate("Affiche de film noir français années 50")
 */
export async function quickGenerate(description: string, type: MediaType = 'image') {
  return runMediaPipeline(
    { projectDescription: description, count: 1 },
    [type]
  )
}
