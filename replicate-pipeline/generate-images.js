#!/usr/bin/env node
/**
 * generate-images.js
 *
 * Script CLI pour GitHub Actions et usage local.
 * Génère des images et vidéos via Replicate à partir d'un fichier de config JSON
 * ou de variables d'environnement.
 *
 * Usage:
 *   node generate-images.js                         # Lit media-config.json
 *   node generate-images.js --description "..."     # Génération directe
 *   node generate-images.js --config custom.json    # Config personnalisée
 *   node generate-images.js --type video            # Génère une vidéo
 */

const Replicate = require('replicate')
const fs = require('fs')
const path = require('path')
const https = require('https')
const http = require('http')

// ─────────────────────────────────────────────
// Config
// ─────────────────────────────────────────────

const OUTPUT_DIR = path.join(process.cwd(), 'public', 'images')
const VIDEO_DIR = path.join(process.cwd(), 'public', 'videos')
const RESULTS_FILE = path.join(process.cwd(), 'public', 'generated-media.json')

const IMAGE_MODELS = {
  flux_schnell: 'black-forest-labs/flux-schnell',
  flux_dev: 'black-forest-labs/flux-dev',
  sdxl: 'stability-ai/sdxl:7762fd07cf82c948538e41f63f77d685e02b063e0ccecb392132cd624d971be3',
}

const VIDEO_MODELS = {
  ltx: 'lightricks/ltx-video',
  minimax: 'minimax/video-01',
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function log(msg, level = 'info') {
  const icons = { info: '→', success: '✓', error: '✗', warn: '⚠' }
  console.log(`${icons[level] || '·'} ${msg}`)
}

function parseArgs() {
  const args = process.argv.slice(2)
  const result = {}
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].slice(2)
      result[key] = args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : true
      if (result[key] !== true) i++
    }
  }
  return result
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http
    const file = fs.createWriteStream(dest)
    protocol.get(url, res => {
      res.pipe(file)
      file.on('finish', () => { file.close(); resolve(dest) })
    }).on('error', err => { fs.unlink(dest, () => {}); reject(err) })
  })
}

function buildImagePrompt(description, style = 'cinematic') {
  const modifiers = {
    cinematic: 'cinematic lighting, dramatic composition, film grain, 8K, professional',
    photorealistic: 'photorealistic, professional photography, sharp details, 8K RAW',
    documentary: 'documentary style, candid, authentic, natural light, reportage',
    abstract: 'abstract art, contemporary, bold colors, artistic composition',
    poster: 'professional poster design, bold colors, high contrast, commercial art',
    illustration: 'detailed illustration, concept art, vibrant colors, editorial',
    logo: 'minimal logo design, vector style, clean lines, professional branding',
  }
  return `${description}, ${modifiers[style] || modifiers.cinematic}, no text overlay`
}

function buildVideoPrompt(description, style = 'cinematic') {
  const modifiers = {
    cinematic: 'cinematic quality, smooth camera movement, professional grade, film look',
    animation: 'smooth animation, vivid colors, fluid motion',
    documentary: 'documentary footage, handheld camera, authentic movement',
  }
  return `${description}, ${modifiers[style] || modifiers.cinematic}, no text`
}

// ─────────────────────────────────────────────
// Génération image
// ─────────────────────────────────────────────

async function generateImage(replicate, prompt, options = {}) {
  const model = IMAGE_MODELS[options.model || 'flux_schnell']
  const width = options.width || 1344
  const height = options.height || 768

  log(`Génération image: "${prompt.slice(0, 60)}..."`)
  log(`Modèle: ${model}`)

  const output = await replicate.run(model, {
    input: {
      prompt,
      width,
      height,
      num_inference_steps: options.model === 'flux_dev' ? 28 : 4,
      output_format: 'webp',
      output_quality: 90,
    },
  })

  const urls = Array.isArray(output) ? output : [output]
  return String(urls[0])
}

// ─────────────────────────────────────────────
// Génération vidéo
// ─────────────────────────────────────────────

async function generateVideo(replicate, prompt, options = {}) {
  const modelKey = options.model || 'ltx'
  const model = VIDEO_MODELS[modelKey]

  log(`Génération vidéo: "${prompt.slice(0, 60)}..."`)
  log(`Modèle: ${model}`)

  const input = { prompt }
  if (modelKey === 'ltx') {
    input.width = 768
    input.height = 512
    input.num_frames = (options.duration || 5) * 24
    input.num_inference_steps = 50
    input.guidance_scale = 3
  } else {
    input.prompt_optimizer = true
  }

  const output = await replicate.run(model, { input })
  const urls = Array.isArray(output) ? output : [output]
  return String(urls[0])
}

// ─────────────────────────────────────────────
// Pipeline principal
// ─────────────────────────────────────────────

async function main() {
  const args = parseArgs()

  // Vérif token
  const token = process.env.REPLICATE_API_TOKEN
  if (!token) {
    log('REPLICATE_API_TOKEN manquant !', 'error')
    log('Définissez: export REPLICATE_API_TOKEN=r8_...', 'warn')
    process.exit(1)
  }

  const replicate = new Replicate({ auth: token })

  // ── Chargement de la config ──────────────────
  let configs = []
  const configFile = args.config || 'media-config.json'

  if (args.description) {
    // Mode CLI direct
    configs = [{
      description: args.description,
      type: args.type || 'image',
      style: args.style || 'cinematic',
      count: parseInt(args.count || '1', 10),
      name: args.name || 'generated',
    }]
    log(`Mode direct: "${args.description}"`)
  } else if (fs.existsSync(configFile)) {
    const raw = fs.readFileSync(configFile, 'utf8')
    const parsed = JSON.parse(raw)
    configs = Array.isArray(parsed) ? parsed : [parsed]
    log(`Config chargée: ${configFile} (${configs.length} entrée(s))`)
  } else {
    // Config par défaut depuis les env vars du projet
    const defaultDesc = process.env.MEDIA_DESCRIPTION || 'Project visual, professional, modern design'
    configs = [{
      description: defaultDesc,
      type: 'image',
      style: process.env.MEDIA_STYLE || 'cinematic',
      count: parseInt(process.env.MEDIA_COUNT || '1', 10),
      name: 'project-visual',
    }]
    log(`Config par défaut: "${defaultDesc}"`, 'warn')
  }

  // ── Préparation des dossiers ─────────────────
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  fs.mkdirSync(VIDEO_DIR, { recursive: true })

  // ── Résultats ───────────────────────────────
  const results = []

  for (const config of configs) {
    const {
      description,
      type = 'image',
      style = 'cinematic',
      count = 1,
      name = 'generated',
      model,
      themes = [],
    } = config

    const fullDesc = themes.length > 0 ? `${description} — ${themes.join(', ')}` : description

    for (let i = 0; i < count; i++) {
      const suffix = count > 1 ? `-${i + 1}` : ''

      try {
        if (type === 'image') {
          const prompt = buildImagePrompt(fullDesc, style)
          const url = await generateImage(replicate, prompt, { model, style })

          const filename = `${name}${suffix}.webp`
          const destPath = path.join(OUTPUT_DIR, filename)
          await downloadFile(url, destPath)

          results.push({
            type: 'image',
            name: `${name}${suffix}`,
            localPath: `/images/${filename}`,
            remoteUrl: url,
            prompt,
            style,
            generatedAt: new Date().toISOString(),
          })
          log(`Image sauvegardée: public/images/${filename}`, 'success')

        } else if (type === 'video') {
          const prompt = buildVideoPrompt(fullDesc, style)
          const url = await generateVideo(replicate, prompt, { model, style, duration: config.duration })

          const filename = `${name}${suffix}.mp4`
          const destPath = path.join(VIDEO_DIR, filename)
          await downloadFile(url, destPath)

          results.push({
            type: 'video',
            name: `${name}${suffix}`,
            localPath: `/videos/${filename}`,
            remoteUrl: url,
            prompt,
            style,
            generatedAt: new Date().toISOString(),
          })
          log(`Vidéo sauvegardée: public/videos/${filename}`, 'success')
        }
      } catch (err) {
        log(`Erreur pour "${name}${suffix}": ${err.message}`, 'error')
        results.push({
          type,
          name: `${name}${suffix}`,
          error: err.message,
          generatedAt: new Date().toISOString(),
        })
      }
    }
  }

  // ── Sauvegarde du manifeste ──────────────────
  const manifest = {
    generatedAt: new Date().toISOString(),
    total: results.length,
    success: results.filter(r => !r.error).length,
    failed: results.filter(r => r.error).length,
    media: results,
  }

  fs.writeFileSync(RESULTS_FILE, JSON.stringify(manifest, null, 2))
  log(`Manifeste: public/generated-media.json`, 'success')

  // ── Résumé ───────────────────────────────────
  console.log('\n─────────────────────────────')
  log(`Total: ${manifest.total} | Succès: ${manifest.success} | Échecs: ${manifest.failed}`)

  if (manifest.failed > 0) {
    process.exit(1)
  }
}

main().catch(err => {
  log(err.message, 'error')
  process.exit(1)
})
