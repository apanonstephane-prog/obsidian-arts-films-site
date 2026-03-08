#!/usr/bin/env python3
"""
AdminSearch — Agent Aides & Subventions Françaises
===================================================
Lancer avec : streamlit run app.py
Puis ouvre http://localhost:8501 dans ton navigateur
"""

import os
import streamlit as st
import anthropic
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

# ============================================================
# Configuration de la page
# ============================================================
st.set_page_config(
    page_title="AdminSearch — Aides Françaises",
    page_icon="🇫🇷",
    layout="centered",
    initial_sidebar_state="expanded",
)

# ============================================================
# Système prompt
# ============================================================
SYSTEM_PROMPT = """Tu es un expert en financement public français, spécialisé dans les aides aux créateurs \
d'entreprise, startups et entrepreneurs du numérique.

Tu maîtrises et recherches activement tous les dispositifs suivants :

## AIDES IMMÉDIATES (auto-entrepreneur)
- ACRE : exonération partielle des cotisations sociales (1ère année, jusqu'à ~50%)
- NACRE : accompagnement + prêt à taux zéro (0%) jusqu'à 8 000€
- ARCE : si ancien demandeur d'emploi → 45% des droits ARE restants en capital
- Maintien ARE : cumul allocation chômage + revenus auto-entrepreneur
- Micro-crédit ADIE : jusqu'à 12 000€ pour auto-entrepreneurs

## AIDES BPIFRANCE & ÉTAT
- Bourse French Tech (10k–30k€, nécessite SAS/SARL)
- i-Lab (jusqu'à 600k€, deep tech / innovation de rupture)
- i-Nov (jusqu'à 600k€, startups innovantes)
- Prêt d'amorçage / Prêt création entreprise Bpifrance
- Pass French Tech (accompagnement accéléré)
- CIR / CII : Crédit Impôt Recherche / Innovation
- JEI / JEC : Jeune Entreprise Innovante / Créative

## AIDES RÉGION OCCITANIE & TOULOUSE
- ADI Occitanie : accompagnement + prêts
- Région Occitanie : FREC, dispositifs numérique, chèques innovation
- Toulouse Métropole : aides à la création d'activité
- French Tech Toulouse : accompagnement, mise en réseau, label
- CCI Occitanie / CCI Toulouse : chèques conseil, accompagnement
- Initiative Grands Toulouse : prêts d'honneur 0% (jusqu'à 30k€)
- Réseau Entreprendre Occitanie : prêts d'honneur 0% (jusqu'à 50k€)
- Cap'Innov Occitanie, Village by CA Toulouse

## CONCOURS ET PRIX
- Concours i-Lab Bpifrance (annuel, jusqu'à 600k€)
- Challenge French Tech
- Prix Pépite (étudiant-entrepreneur)
- Tremplins du Numérique
- Talents Occitanie / Étoiles de l'Économie
- Grand Prix Innovation Toulouse
- Concours sectoriels (Syntec Numérique, etc.)

## AIDES EUROPÉENNES
- FEDER Occitanie (géré en région)
- FSE+ (Fonds Social Européen)
- Horizon Europe (projets R&D, consortium)
- EIC Accelerator (jusqu'à 2,5M€ + equity)
- Digital Europe Programme

## PLATEFORMES DE RÉFÉRENCE
- aides-entreprises.fr, bpifrance-creation.fr
- occitanie.fr → aides aux entreprises
- lafrenchtech.com, guichet-entreprises.fr

---

Profil de l'entrepreneur accompagné :
- Secteur : {secteur}
- Stade : {stade}
- Localisation : {localisation}
- Statut juridique : {statut}
- Activité : {activite}
- Objectif : {objectif}
- Date actuelle : {date}

---

Tes règles de travail :
1. Utilise web_search pour vérifier les informations actuelles (montants 2025-2026, deadlines)
2. Évalue chaque aide : ✅ Éligible maintenant | ⚠️ Sous conditions | ❌ Pas encore accessible
3. Pour chaque aide → nom officiel, montant, critères, deadline, lien officiel, étapes concrètes
4. Sois honnête : signale clairement quand une aide nécessite une SAS/SARL
5. Indique systématiquement ce qu'un changement de statut apporterait
6. Classe par priorité : accessibilité immédiate > impact financier > facilité
7. Pour les dossiers : adapte le contenu aux critères exacts de l'appel à projets
"""


def get_system_prompt(profil: dict) -> str:
    return SYSTEM_PROMPT.format(**profil, date=datetime.now().strftime("%B %Y"))


# ============================================================
# Actions rapides
# ============================================================
QUICK_QUERIES = {
    "🔍 Toutes les aides": (
        "Effectue une recherche exhaustive de TOUTES les aides, subventions, prêts d'honneur, "
        "exonérations, concours et dispositifs disponibles pour mon profil. "
        "Structure ta réponse :\n\n"
        "## 1. AIDES IMMÉDIATES (éligible maintenant)\n"
        "## 2. AIDES SOUS CONDITIONS\n"
        "## 3. CONCOURS & APPELS À PROJETS (6 prochains mois)\n"
        "## 4. AIDES FUTURES (si changement de statut)\n"
        "## 5. PLAN D'ACTION PRIORITAIRE\n\n"
        "Pour chaque aide : nom officiel, montant, critères précis, deadline, lien officiel, démarches."
    ),
    "🏆 Concours en cours": (
        "Recherche tous les concours, prix et appels à projets ouverts "
        "ou s'ouvrant dans les 6 prochains mois, pour mon profil. "
        "Inclus les concours nationaux ET régionaux Occitanie.\n\n"
        "Pour chaque concours : nom, organisateur, dotation/prix, critères, "
        "date limite de candidature, lien officiel."
    ),
    "💡 Aides immédiates": (
        "Focus exclusif sur les aides accessibles MAINTENANT avec mon statut actuel. "
        "Détaille avec les démarches concrètes pas à pas :\n"
        "1. ACRE : montant exact, comment en bénéficier, durée\n"
        "2. NACRE : éligibilité, montant, comment candidater\n"
        "3. ARCE : suis-je potentiellement éligible ?\n"
        "4. Prêts d'honneur accessibles sans créer une société\n"
        "5. Aides ADI Occitanie, Région, CCI Toulouse\n"
        "6. Micro-crédit ADIE : conditions et démarches\n\n"
        "Pour chaque aide : montant, délais, contact, lien."
    ),
}

# ============================================================
# Sidebar — Profil & Clé API
# ============================================================
with st.sidebar:
    st.header("⚙️ Votre profil")
    st.caption("L'agent adapte ses recherches à ces informations.")

    secteur = st.text_input(
        "Secteur d'activité",
        value="Développement d'applications et sites web",
    )
    stade = st.selectbox(
        "Stade du projet",
        ["Pré-création / idée", "MVP en cours", "Premier CA", "Levée de fonds"],
    )
    localisation = st.text_input(
        "Localisation",
        value="Toulouse (Haute-Garonne, Occitanie)",
        help="L'agent cherche aussi les aides nationales et européennes",
    )
    statut = st.selectbox(
        "Statut juridique",
        [
            "Auto-entrepreneur (micro-entreprise)",
            "En cours de création",
            "SAS",
            "SARL",
            "Association",
        ],
    )
    activite = st.text_area(
        "Décrivez votre activité",
        value="Création d'applications mobiles et sites web (apps, SaaS, outils numériques)",
        height=80,
    )

    st.markdown("---")
    st.header("🔑 Clé API Anthropic")
    api_key = st.text_input(
        "Clé API",
        value=os.environ.get("ANTHROPIC_API_KEY", ""),
        type="password",
        placeholder="sk-ant-...",
        help="Créez votre compte et obtenez une clé sur console.anthropic.com",
    )

    if not api_key:
        st.warning("⚠️ Ajoutez votre clé API pour commencer")
        st.markdown(
            "[→ Obtenir une clé API](https://console.anthropic.com/)",
            unsafe_allow_html=False,
        )
    else:
        st.success("Clé configurée ✓")

    st.markdown("---")
    if st.button("🗑️ Nouvelle conversation", use_container_width=True):
        st.session_state.pop("messages", None)
        st.rerun()

profil = {
    "secteur": secteur,
    "stade": stade,
    "localisation": localisation,
    "statut": statut,
    "activite": activite,
    "objectif": "Trouver des financements et développer mon activité",
}

# ============================================================
# Zone principale
# ============================================================
st.title("🇫🇷 AdminSearch")
st.caption(
    "Agent IA · Aides & Subventions Françaises · Recherche web en temps réel · "
    f"Profil : {statut} · {localisation}"
)

# ── Boutons d'action rapide ───────────────────────────────────
col1, col2, col3 = st.columns(3)
query_from_button = None

for col, (label, query_text) in zip([col1, col2, col3], QUICK_QUERIES.items()):
    if col.button(label, use_container_width=True):
        query_from_button = query_text

st.markdown("---")

# ── Historique de conversation ────────────────────────────────
if "messages" not in st.session_state:
    st.session_state.messages = []

# Message de bienvenue si conversation vide
if not st.session_state.messages:
    with st.chat_message("assistant"):
        st.markdown(
            "Bonjour ! 👋 Je suis **AdminSearch**, votre agent spécialisé dans les "
            "**aides et subventions françaises** pour entrepreneurs et startups numériques.\n\n"
            "**Comment ça marche :**\n"
            "1. Renseignez votre profil dans la barre latérale ←\n"
            "2. Entrez votre clé API Anthropic (console.anthropic.com)\n"
            "3. Cliquez sur un bouton ou posez votre question\n\n"
            "Je recherche en temps réel sur tous les sites officiels (Bpifrance, "
            "Région Occitanie, aides-entreprises.fr...) et vous donne les informations "
            "actualisées avec montants, critères, délais et démarches.\n\n"
            f"*Profil actuel : {statut} · {localisation} · {secteur}*"
        )

# Afficher l'historique
for msg in st.session_state.messages:
    with st.chat_message(msg["role"]):
        st.markdown(msg["content"])

# ── Input utilisateur ─────────────────────────────────────────
user_input = st.chat_input(
    "Posez votre question (aides, concours, dossiers, statut juridique...)"
)

query = query_from_button or user_input

# ── Traitement de la requête ──────────────────────────────────
if query:
    if not api_key:
        st.error(
            "⚠️ Ajoutez votre clé API Anthropic dans la barre latérale pour utiliser l'agent.\n\n"
            "→ Obtenez une clé gratuite sur [console.anthropic.com](https://console.anthropic.com/)"
        )
        st.stop()

    # Afficher le message utilisateur
    with st.chat_message("user"):
        st.markdown(query)
    st.session_state.messages.append({"role": "user", "content": query})

    # Construire les messages pour l'API
    api_messages = [
        {"role": m["role"], "content": m["content"]}
        for m in st.session_state.messages
    ]

    client = anthropic.Anthropic(api_key=api_key)

    with st.chat_message("assistant"):
        status_area = st.empty()
        text_area = st.empty()

        full_text = ""
        search_count = 0
        current_block = None
        final = None

        # Boucle agentique — gère pause_turn pour les longues recherches
        for attempt in range(5):
            try:
                with client.messages.stream(
                    model="claude-opus-4-6",
                    max_tokens=8000,
                    thinking={"type": "adaptive"},
                    system=get_system_prompt(profil),
                    tools=[
                        {"type": "web_search_20260209", "name": "web_search"},
                        {"type": "web_fetch_20260209", "name": "web_fetch"},
                    ],
                    messages=api_messages,
                ) as stream:
                    for event in stream:
                        if event.type == "content_block_start":
                            current_block = event.content_block.type
                            if current_block == "thinking":
                                status_area.caption("💭 Analyse de votre profil en cours...")
                            elif current_block == "server_tool_use":
                                search_count += 1
                                status_area.caption(
                                    f"🔍 Recherche web #{search_count} en cours..."
                                )
                            elif current_block == "text":
                                status_area.empty()

                        elif event.type == "content_block_delta":
                            if event.delta.type == "text_delta":
                                full_text += event.delta.text
                                text_area.markdown(full_text + "▌")

                        elif event.type == "content_block_stop":
                            if current_block in ("thinking", "server_tool_use"):
                                status_area.empty()

                    final = stream.get_final_message()

            except anthropic.APIError as e:
                st.error(f"Erreur API : {e}")
                break

            if not final:
                break

            if final.stop_reason == "end_turn":
                break

            if final.stop_reason == "pause_turn":
                # La recherche continue — on ré-envoie pour poursuivre
                api_messages.append(
                    {"role": "assistant", "content": final.content}
                )
                status_area.caption("🔍 Recherche approfondie en cours...")
                continue

            break

        # Affichage final propre (sans curseur clignotant)
        status_area.empty()
        text_area.markdown(full_text)

    # Sauvegarder dans l'historique de conversation
    if full_text:
        st.session_state.messages.append(
            {"role": "assistant", "content": full_text}
        )
