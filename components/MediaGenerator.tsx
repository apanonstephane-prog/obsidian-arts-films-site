'use client'

/**
 * MediaGenerator Component
 *
 * Interface pour générer des images et vidéos via la pipeline Replicate.
 * Peut être intégré dans n'importe quelle page Next.js.
 *
 * Usage:
 *   <MediaGenerator initialContext="Affiche film noir parisien années 50" />
 */

import { useState } from 'react'

interface GeneratedMedia {
  type: 'image' | 'video'
  url: string
  prompt: string
  model: string
  style: string
}

interface PipelineResult {
  success: boolean
  media: GeneratedMedia[]
  analysis?: {
    detectedStyle: string
    imagePrompt: string
    videoPrompt: string
    keywords: string[]
  }
  error?: string
  generatedAt: string
}

interface Props {
  initialContext?: string
  showAnalysis?: boolean
}

const STYLES = [
  { value: 'cinematic', label: 'Cinématique' },
  { value: 'photorealistic', label: 'Photoréaliste' },
  { value: 'documentary', label: 'Documentaire' },
  { value: 'abstract', label: 'Abstrait' },
  { value: 'poster', label: 'Affiche' },
  { value: 'illustration', label: 'Illustration' },
  { value: 'logo', label: 'Logo' },
]

export function MediaGenerator({ initialContext = '', showAnalysis = true }: Props) {
  const [description, setDescription] = useState(initialContext)
  const [themes, setThemes] = useState('')
  const [style, setStyle] = useState('cinematic')
  const [mediaTypes, setMediaTypes] = useState<('image' | 'video')[]>(['image'])
  const [count, setCount] = useState(1)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<PipelineResult | null>(null)

  const toggleMediaType = (type: 'image' | 'video') => {
    setMediaTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    )
  }

  const handleGenerate = async () => {
    if (!description.trim()) return

    setLoading(true)
    setResult(null)

    try {
      const res = await fetch('/api/generate-media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectDescription: description,
          themes: themes ? themes.split(',').map(t => t.trim()).filter(Boolean) : undefined,
          style,
          mediaTypes,
          count,
          language: 'fr',
        }),
      })

      const data: PipelineResult = await res.json()
      setResult(data)
    } catch (err) {
      setResult({
        success: false,
        media: [],
        generatedAt: new Date().toISOString(),
        error: err instanceof Error ? err.message : 'Erreur réseau',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 p-6">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-white">Générateur de médias</h2>
        <p className="text-sm text-gray-400">
          Générez des images et vidéos via Replicate à partir du contexte de votre projet
        </p>
      </div>

      {/* Form */}
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-5 space-y-4">

        {/* Description */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-300">
            Description du projet ou contexte
          </label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={3}
            placeholder="Ex: Court-métrage sur l'exil en Méditerranée, ton mélancolique, lumière dorée du soir..."
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 resize-none"
          />
        </div>

        {/* Themes */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-300">
            Thèmes / mots-clés <span className="text-gray-500">(optionnel, séparés par des virgules)</span>
          </label>
          <input
            type="text"
            value={themes}
            onChange={e => setThemes(e.target.value)}
            placeholder="ex: espoir, Afrique, futur, technologie"
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Style + Count */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-300">Style visuel</label>
            <select
              value={style}
              onChange={e => setStyle(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
            >
              {STYLES.map(s => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-300">Nombre</label>
            <select
              value={count}
              onChange={e => setCount(Number(e.target.value))}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
            >
              {[1, 2, 3, 4].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Media types */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-300">Type de média</label>
          <div className="flex gap-3">
            {(['image', 'video'] as const).map(type => (
              <button
                key={type}
                onClick={() => toggleMediaType(type)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  mediaTypes.includes(type)
                    ? 'bg-indigo-600 border-indigo-500 text-white'
                    : 'bg-gray-800 border-gray-600 text-gray-400 hover:border-gray-500'
                }`}
              >
                {type === 'image' ? 'Image' : 'Vidéo'}
                {type === 'video' && (
                  <span className="ml-1.5 text-xs opacity-70">(lent)</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleGenerate}
          disabled={loading || !description.trim() || mediaTypes.length === 0}
          className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Génération en cours...
            </span>
          ) : 'Générer'}
        </button>
      </div>

      {/* Analysis */}
      {showAnalysis && result?.analysis && (
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 space-y-3">
          <h3 className="text-sm font-medium text-gray-300">Analyse du contexte</h3>
          <div className="space-y-2 text-xs text-gray-400">
            <div>
              <span className="text-gray-500">Style détecté:</span>{' '}
              <span className="text-indigo-400">{result.analysis.detectedStyle}</span>
            </div>
            <div>
              <span className="text-gray-500">Prompt image:</span>{' '}
              <span className="text-gray-300">{result.analysis.imagePrompt}</span>
            </div>
            {result.analysis.videoPrompt !== result.analysis.imagePrompt && (
              <div>
                <span className="text-gray-500">Prompt vidéo:</span>{' '}
                <span className="text-gray-300">{result.analysis.videoPrompt}</span>
              </div>
            )}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {result.analysis.keywords.map(kw => (
                <span key={kw} className="px-2 py-0.5 bg-gray-800 rounded text-gray-400">
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Error */}
      {result && !result.success && result.error && (
        <div className="bg-red-900/20 border border-red-800 rounded-xl p-4">
          <p className="text-sm text-red-400">{result.error}</p>
        </div>
      )}

      {/* Results */}
      {result?.media && result.media.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-300">
            {result.media.length} média{result.media.length > 1 ? 's' : ''} générés
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {result.media.map((media, i) => (
              <div key={i} className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
                {media.type === 'image' ? (
                  <img
                    src={media.url}
                    alt={media.prompt}
                    className="w-full aspect-video object-cover"
                    loading="lazy"
                  />
                ) : (
                  <video
                    src={media.url}
                    controls
                    className="w-full aspect-video"
                    preload="metadata"
                  />
                )}
                <div className="p-3 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 bg-gray-800 rounded text-gray-400">
                      {media.type}
                    </span>
                    <span className="text-xs px-2 py-0.5 bg-gray-800 rounded text-indigo-400">
                      {media.style}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-2">{media.prompt}</p>
                  <a
                    href={media.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-indigo-400 hover:underline"
                  >
                    Ouvrir le fichier original
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
