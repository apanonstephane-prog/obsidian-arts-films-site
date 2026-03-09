# AdminSearch 🇫🇷

**Agent IA · Aides & Subventions Françaises pour Startups & Entrepreneurs du Numérique**

Recherche en temps réel toutes les aides, subventions, concours et dispositifs
disponibles selon votre profil. Propulsé par **Claude Opus 4.6** (Anthropic).

---

## Démo rapide

1. Cloner le repo
2. `pip install -r requirements.txt`
3. `streamlit run app.py`
4. Entrer sa clé API Anthropic dans la barre latérale
5. Cliquer sur "🔍 Toutes les aides"

---

## Installation locale

```bash
git clone <url-du-repo>
cd obsidian-arts-films-site
git checkout claude/french-aid-finder-agent-8InF6

pip install -r requirements.txt

# Optionnel : créer un .env avec votre clé (sinon, la saisir dans l'interface)
cp .env.example .env
# Éditez .env → ANTHROPIC_API_KEY=sk-ant-...

streamlit run app.py
# → Ouvre http://localhost:8501
```

---

## Déploiement sur Streamlit Cloud (partage en ligne)

Pour partager AdminSearch via un lien public :

1. **Pusher le code sur GitHub** (repo public ou privé)
2. Aller sur [share.streamlit.io](https://share.streamlit.io)
3. Se connecter avec son compte GitHub
4. Cliquer "New app" → sélectionner ce repo → fichier : `app.py`
5. Dans **Advanced settings → Secrets**, ajouter :
   ```
   ANTHROPIC_API_KEY = "sk-ant-..."
   ```
6. Cliquer "Deploy" → obtenir un lien public type `adminsearch.streamlit.app`

Chaque utilisateur peut aussi entrer sa propre clé API dans la barre latérale.

---

## Fonctionnalités

**Boutons d'action rapide :**
| Bouton | Action |
|--------|--------|
| 🔍 Toutes les aides | Recherche exhaustive classée par priorité |
| 🏆 Concours en cours | Ouvertures dans les 6 prochains mois |
| 💡 Aides immédiates | Ce que vous pouvez obtenir maintenant |

**Sources couvertes (vérifiées en temps réel) :**
- Bpifrance (Bourse French Tech, i-Lab, i-Nov, prêts...)
- ACRE / NACRE / ARCE (exonérations et accompagnement)
- ADI Occitanie, Région Occitanie, Toulouse Métropole
- Initiative Grands Toulouse, Réseau Entreprendre
- CCI Toulouse, French Tech Toulouse
- Concours nationaux et régionaux
- Aides européennes (FEDER, EIC, Horizon Europe)
- aides-entreprises.fr et portails officiels

**Mode chat :** posez vos questions de suivi après la recherche initiale.

---

## Profil configurable

Tout se configure dans la barre latérale de l'interface :
- Secteur d'activité
- Stade du projet (idée → levée de fonds)
- Localisation (Toulouse par défaut, mais cherche partout en France)
- Statut juridique (auto-entrepreneur, SAS, SARL...)
- Description de l'activité

---

## Coût estimé par session

| Action | Coût (~) |
|--------|---------|
| Recherche complète | 0,40€ – 0,75€ |
| Question de suivi | 0,05€ – 0,15€ |
| Rédaction de dossier | 0,15€ – 0,30€ |

*Chaque utilisateur utilise sa propre clé API Anthropic.*

---

## Notes importantes

- Certaines aides (Bourse French Tech, i-Lab) nécessitent une **SAS/SARL** — l'agent le signale clairement
- Les informations sont vérifiées en temps réel mais vérifiez toujours les **délais officiels**
- La soumission des dossiers reste **manuelle** (l'agent prépare le contenu)
