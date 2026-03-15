# CLAUDE.md — Guide d'utilisation de la pipeline Replicate

Ce fichier configure **Claude Code** pour utiliser la pipeline de génération de médias
(images & vidéos) via Replicate dans n'importe quel contexte de projet ou conversation.

---

## Pipeline Replicate — Vue d'ensemble

La pipeline se compose de :

| Fichier | Rôle |
|---|---|
| `lib/replicate-media.ts` | Core pipeline TypeScript — utilisable depuis n'importe quel code Next.js |
| `app/api/generate-media/route.ts` | Endpoint HTTP POST/GET pour générer des médias depuis le front |
| `generate-images.js` | Script CLI pour GitHub Actions et usage local |
| `components/MediaGenerator.tsx` | Composant React avec interface complète |
| `media-config.json` | Config déclarative pour le script CLI (à créer par projet) |

---

## Utilisation depuis Claude Code

### 1. Génération rapide via TypeScript

```typescript
import { quickGenerate, runMediaPipeline } from '@/lib/replicate-media'

// Image unique depuis une description simple
const result = await quickGenerate("Affiche de film noir parisien années 50")

// Pipeline complète avec contexte riche
const result = await runMediaPipeline({
  projectDescription: "Court-métrage sur l'exil en Méditerranée",
  themes: ["espoir", "mer", "humanité", "lumière"],
  style: "cinematic",
  count: 3,
  language: "fr",
}, ['image', 'video'])
```

### 2. Analyse du contexte sans générer

```typescript
import { analyzeContextForMedia } from '@/lib/replicate-media'

const analysis = analyzeContextForMedia({
  projectDescription: "Documentaire sur les startups africaines",
  themes: ["technologie", "Afrique", "innovation"],
})

console.log(analysis.imagePrompt)      // Prompt optimisé pour image
console.log(analysis.videoPrompt)      // Prompt optimisé pour vidéo
console.log(analysis.recommendedStyle) // Style détecté automatiquement
console.log(analysis.keywords)         // Mots-clés extraits
```

### 3. Via l'API HTTP

```bash
# Génération d'une image
curl -X POST http://localhost:3000/api/generate-media \
  -H "Content-Type: application/json" \
  -d '{
    "projectDescription": "Logo minimaliste pour agence créative",
    "style": "logo",
    "mediaTypes": ["image"],
    "count": 2
  }'

# GET rapide pour test
curl "http://localhost:3000/api/generate-media?description=Paysage+lunaire+futuriste&type=image"
```

### 4. Script CLI (GitHub Actions ou local)

```bash
# Installation
export REPLICATE_API_TOKEN=r8_...

# Génération directe
node generate-images.js --description "Affiche festival de cinéma" --style poster --count 2

# Depuis un fichier de config
node generate-images.js --config media-config.json

# Génération vidéo
node generate-images.js --description "Coucher de soleil sur Paris" --type video
```

---

## Fichier `media-config.json` — Format

Créez ce fichier à la racine du projet pour configurer la génération batch :

```json
[
  {
    "name": "hero-banner",
    "description": "Bannière principale du site, moderne et élégante",
    "type": "image",
    "style": "cinematic",
    "count": 2,
    "themes": ["innovation", "technologie", "France"]
  },
  {
    "name": "intro-video",
    "description": "Séquence d'introduction du projet",
    "type": "video",
    "style": "cinematic",
    "count": 1,
    "duration": 5
  }
]
```

---

## Modèles disponibles

### Images
| Clé | Modèle Replicate | Usage |
|---|---|---|
| `flux_schnell` | `black-forest-labs/flux-schnell` | Rapide, 4 steps — **défaut** |
| `flux_dev` | `black-forest-labs/flux-dev` | Qualité maximale, 28 steps |
| `sdxl` | `stability-ai/sdxl` | Polyvalent, compatible LORA |

### Vidéos
| Clé | Modèle Replicate | Usage |
|---|---|---|
| `ltx` | `lightricks/ltx-video` | Rapide, ~30s — **défaut** |
| `minimax` | `minimax/video-01` | Qualité cinématique, plus lent |

---

## Styles visuels

| Style | Idéal pour |
|---|---|
| `cinematic` | Films, courts-métrages, projets audiovisuels |
| `photorealistic` | Portraits, produits, paysages |
| `documentary` | Reportages, contenus éducatifs |
| `abstract` | Art contemporain, identité visuelle créative |
| `poster` | Affiches, événements, promotions |
| `logo` | Marques, identité visuelle |
| `illustration` | BD, enfants, editorial |

---

## Configuration requise

### Variables d'environnement

```bash
# Requis
REPLICATE_API_TOKEN=r8_...   # https://replicate.com/account/api-tokens

# Optionnel (pour generate-images.js)
MEDIA_DESCRIPTION="Description par défaut du projet"
MEDIA_STYLE=cinematic
MEDIA_COUNT=1
```

### GitHub Actions

Le workflow `.github/workflows/generate-images.yml` utilise le secret `REPLICATE_API_TOKEN`.
Ajoutez-le dans : Settings → Secrets and variables → Actions.

---

## Instructions pour Claude Code

Quand tu travailles sur ce projet ou sur tout nouveau projet :

1. **Si le contexte contient des éléments visuels** (film, affiche, produit, marque, etc.),
   propose d'utiliser la pipeline pour générer des médias appropriés.

2. **Pour analyser le contexte**, utilise `analyzeContextForMedia()` pour extraire
   les thèmes et déterminer le style approprié sans générer immédiatement.

3. **Pour la génération batch**, crée un `media-config.json` adapté au projet
   puis lance `node generate-images.js`.

4. **Intègre le composant** `<MediaGenerator />` dans les pages qui nécessitent
   une interface de génération interactive.

5. **Les fichiers générés** sont sauvegardés dans `public/images/` (images)
   et `public/videos/` (vidéos), et référencés dans `public/generated-media.json`.
