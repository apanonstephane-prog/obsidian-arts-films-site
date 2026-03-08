# Agent Aides & Subventions Françaises 🇫🇷

Agent IA spécialisé dans la recherche exhaustive de toutes les aides, subventions,
concours et dispositifs d'accompagnement disponibles pour les créateurs d'entreprise
et startups dans le numérique en France.

Propulsé par **Claude Opus 4.6** (Anthropic) avec recherche web en temps réel.

---

## Ce que fait l'agent

- **Recherche en temps réel** toutes les aides disponibles via le web (montants actuels, deadlines)
- **Évalue votre éligibilité** selon votre profil (statut, localisation, secteur, stade)
- **Couvre** : aides nationales, régionales (Occitanie/Toulouse), européennes, concours
- **Aide à la rédaction** de dossiers de candidature
- **Mode conversationnel** : posez des questions de suivi après la recherche

### Sources couvertes

- Bpifrance (Bourse French Tech, i-Lab, i-Nov, prêts...)
- ACRE / NACRE / ARCE (exonérations et accompagnement)
- ADI Occitanie, Région Occitanie, Toulouse Métropole
- Initiative Grands Toulouse, Réseau Entreprendre Occitanie
- CCI Toulouse, French Tech Toulouse
- Concours nationaux et régionaux
- Aides européennes (FEDER, EIC, Horizon Europe...)
- aides-entreprises.fr et portails officiels

---

## Installation

```bash
# 1. Cloner le repo et aller dans le dossier
git clone <url-du-repo>
cd obsidian-arts-films-site

# 2. Installer les dépendances
pip install -r requirements.txt

# 3. Configurer la clé API
cp .env.example .env
# Éditez .env et ajoutez votre clé Anthropic
# → https://console.anthropic.com/
```

---

## Utilisation

```bash
# Menu interactif (recommandé)
python main.py

# Raccourcis directs
python main.py search    # Recherche complète de toutes les aides
python main.py concours  # Concours & appels à projets en cours
```

### Options du menu

| N° | Action |
|----|--------|
| 1 | Recherche complète — toutes les aides disponibles |
| 2 | Concours et appels à projets en cours |
| 3 | Aides accessibles maintenant (auto-entrepreneur numérique) |
| 4 | Aide à la rédaction d'un dossier de candidature |
| 5 | Que gagnerais-je à créer une SAS/SARL ? |
| 6 | Question personnalisée |

Après la recherche initiale, vous pouvez poser des **questions de suivi** en mode chat.

---

## Personnalisation

Modifiez le dictionnaire `PROFIL` en haut de `main.py` :

```python
PROFIL = {
    "secteur": "Développement d'applications mobiles et web",
    "stade": "Pré-création / idée",
    "localisation": "Toulouse (Haute-Garonne, Occitanie)",
    "statut": "Auto-entrepreneur (micro-entreprise) avec SIRET",
    "activite": "Création d'applications et sites web",
    "objectif": "Développer une startup tech dans le numérique",
}
```

L'agent adapte automatiquement toutes ses recherches et évaluations à ce profil.

---

## Architecture

```
main.py          → Agent principal (Claude Opus 4.6 + web_search + web_fetch)
requirements.txt → Dépendances Python
.env             → Clé API Anthropic (à créer à partir de .env.example)
```

**Outils utilisés :**
- `web_search_20260209` — recherche web en temps réel
- `web_fetch_20260209` — lecture des pages officielles
- `thinking: adaptive` — raisonnement approfondi sur l'éligibilité

---

## Coût estimé

Chaque recherche complète consomme environ **50k–150k tokens** (Claude Opus 4.6).
Soit ~0,25€–1,25€ par recherche complète.

Les questions de suivi (mode chat) sont beaucoup moins coûteuses (~5k–20k tokens).

---

## Notes importantes

- Certaines aides (Bourse French Tech, i-Lab...) nécessitent une **structure juridique** (SAS, SARL)
- L'agent le signale toujours clairement et explique comment changer de statut
- Les informations sont vérifiées en temps réel mais **vérifiez toujours les délais officiels**
- Pour les dossiers officiels, l'agent prépare le contenu — la **soumission reste manuelle**
