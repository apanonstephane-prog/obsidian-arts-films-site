#!/usr/bin/env python3
"""
AdminSearch — Agent Aides & Subventions Françaises
===================================================
Lancer avec : streamlit run app.py
Puis ouvre http://localhost:8501 dans ton navigateur
"""

import os
import asyncio
import concurrent.futures
import streamlit as st
from openai import OpenAI
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

# ── Imports optionnels ─────────────────────────────────────────
try:
    from supabase import create_client
    _SUPABASE_OK = True
except ImportError:
    _SUPABASE_OK = False

try:
    from mcp import ClientSession
    from mcp.client.streamable_http import streamablehttp_client
    _MCP_OK = True
except ImportError:
    _MCP_OK = False


def _get_default_api_key() -> str:
    """Lit la clé depuis st.secrets (Streamlit Cloud) ou l'environnement local."""
    try:
        return st.secrets.get("GROQ_API_KEY", "")
    except Exception:
        return os.environ.get("GROQ_API_KEY", "")


# ============================================================
# Supabase — persistance des conversations
# ============================================================

@st.cache_resource
def _supabase():
    if not _SUPABASE_OK:
        return None
    url = os.environ.get("SUPABASE_URL", "")
    key = os.environ.get("SUPABASE_KEY", "")
    try:
        url = url or st.secrets.get("SUPABASE_URL", "")
        key = key or st.secrets.get("SUPABASE_KEY", "")
    except Exception:
        pass
    if url and key:
        try:
            return create_client(url, key)
        except Exception:
            pass
    return None


def _new_conversation(db, profil: dict) -> str:
    try:
        r = db.table("conversations").insert({
            "title": f"Session {datetime.now().strftime('%d/%m %H:%M')}",
            "user_profile": profil,
        }).execute()
        return r.data[0]["id"]
    except Exception:
        return ""


def _save_msg(db, conv_id: str, role: str, content: str):
    if not db or not conv_id:
        return
    try:
        db.table("messages").insert({
            "conversation_id": conv_id,
            "role": role,
            "content": content,
        }).execute()
    except Exception:
        pass


def _load_msgs(db, conv_id: str) -> list[dict]:
    if not db or not conv_id:
        return []
    try:
        r = (
            db.table("messages")
            .select("role, content")
            .eq("conversation_id", conv_id)
            .order("created_at")
            .execute()
        )
        return r.data or []
    except Exception:
        return []


def _recent_convs(db, limit: int = 8) -> list[dict]:
    if not db:
        return []
    try:
        r = (
            db.table("conversations")
            .select("id, title, created_at")
            .order("created_at", desc=True)
            .limit(limit)
            .execute()
        )
        return r.data or []
    except Exception:
        return []


# ============================================================
# MCPdatagouv — enrichissement avec données officielles
# ============================================================

_MCP_URL = "https://mcp.data.gouv.fr/mcp"


def enrich_with_datagouv(query: str) -> str:
    """
    Interroge data.gouv.fr via le serveur MCP officiel.
    Retourne un bloc de contexte formaté, ou '' si indisponible.
    """
    if not _MCP_OK:
        return ""

    async def _search():
        async with streamablehttp_client(_MCP_URL) as (read, write, _):
            async with ClientSession(read, write) as session:
                await session.initialize()
                result = await session.call_tool(
                    "search_datasets",
                    arguments={"query": query, "page_size": 3},
                )
                return "\n".join(
                    item.text
                    for item in result.content
                    if hasattr(item, "text")
                )

    try:
        with concurrent.futures.ThreadPoolExecutor(max_workers=1) as pool:
            raw = pool.submit(lambda: asyncio.run(_search())).result(timeout=10)
        if raw and len(raw) > 40:
            return f"\n\n## DONNÉES OFFICIELLES DATA.GOUV.FR\n{raw[:1500]}\n"
    except Exception:
        pass
    return ""


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
1. Recherche activement les informations actuelles (montants 2025-2026, deadlines)
2. Évalue chaque aide : ✅ Éligible maintenant | ⚠️ Sous conditions | ❌ Pas encore accessible
3. Pour chaque aide → nom officiel, montant, critères, deadline, lien officiel, étapes concrètes
4. Sois honnête : signale clairement quand une aide nécessite une SAS/SARL
5. Indique systématiquement ce qu'un changement de statut apporterait
6. Classe par priorité : accessibilité immédiate > impact financier > facilité
7. Pour les dossiers : adapte le contenu aux critères exacts de l'appel à projets
"""


def get_system_prompt(profil: dict, extra: str = "") -> str:
    base = SYSTEM_PROMPT.format(**profil, date=datetime.now().strftime("%B %Y"))
    return base + extra


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
# Sidebar — Profil, Clé API, Historique
# ============================================================
db = _supabase()

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
    st.header("🔑 Clé API Groq")
    api_key = st.text_input(
        "Clé API",
        value=_get_default_api_key(),
        type="password",
        placeholder="gsk_...",
        help="Créez votre compte gratuit sur console.groq.com",
    )

    if not api_key:
        st.warning("⚠️ Ajoutez votre clé API pour commencer")
        st.markdown(
            "[→ Obtenir une clé API gratuite](https://console.groq.com/)",
            unsafe_allow_html=False,
        )
    else:
        st.success("Clé configurée ✓")

    st.markdown("---")
    if st.button("🆕 Nouvelle conversation", use_container_width=True):
        st.session_state.pop("messages", None)
        st.session_state.pop("conversation_id", None)
        st.rerun()

    # ── Historique des conversations (Supabase) ───────────────
    if db:
        convs = _recent_convs(db)
        if convs:
            st.markdown("---")
            st.caption("📂 Conversations récentes")
            for c in convs:
                if st.button(c["title"], key=c["id"], use_container_width=True):
                    st.session_state.conversation_id = c["id"]
                    st.session_state.messages = _load_msgs(db, c["id"])
                    st.rerun()
    else:
        st.caption("💾 Supabase non configuré — historique local uniquement")

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
            "2. Entrez votre clé API OpenRouter (openrouter.ai — gratuit)\n"
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
            "⚠️ Ajoutez votre clé API OpenRouter dans la barre latérale pour utiliser l'agent.\n\n"
            "→ Obtenez une clé gratuite sur [openrouter.ai](https://openrouter.ai/)"
        )
        st.stop()

    # Créer la conversation Supabase au premier message
    if db and "conversation_id" not in st.session_state:
        st.session_state.conversation_id = _new_conversation(db, profil)

    # Afficher et sauvegarder le message utilisateur
    with st.chat_message("user"):
        st.markdown(query)
    st.session_state.messages.append({"role": "user", "content": query})
    _save_msg(db, st.session_state.get("conversation_id", ""), "user", query)

    # ── Enrichissement MCPdatagouv ────────────────────────────
    datagouv_ctx = ""
    if _MCP_OK:
        with st.spinner("📡 Consultation data.gouv.fr (données officielles)..."):
            datagouv_ctx = enrich_with_datagouv(
                f"aides entreprises subventions {query[:80]}"
            )
        if datagouv_ctx:
            st.caption("✅ Données officielles data.gouv.fr intégrées")

    # ── Appel LLM (streaming) ─────────────────────────────────
    api_messages = [
        {"role": "system", "content": get_system_prompt(profil, datagouv_ctx)},
        *[
            {"role": m["role"], "content": m["content"]}
            for m in st.session_state.messages
        ],
    ]

    client = OpenAI(
        base_url="https://api.groq.com/openai/v1",
        api_key=api_key,
    )

    with st.chat_message("assistant"):
        status_area = st.empty()
        text_area = st.empty()

        full_text = ""
        searching = True
        status_area.caption("🔍 Recherche web en cours...")

        try:
            stream = client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=api_messages,
                stream=True,
            )

            for chunk in stream:
                if not chunk.choices:
                    continue
                delta_content = chunk.choices[0].delta.content
                if delta_content:
                    if searching:
                        status_area.empty()
                        searching = False
                    full_text += delta_content
                    text_area.markdown(full_text + "▌")

        except Exception as e:
            status_area.empty()
            st.error(f"**Erreur API OpenRouter :** {e}")
            st.info(
                "Vérifiez que votre clé API est correcte et que vous avez du crédit "
                "ou utilisez un modèle gratuit. → [openrouter.ai](https://openrouter.ai/)"
            )

        # Affichage final propre (sans curseur clignotant)
        status_area.empty()
        text_area.markdown(full_text)

    # Sauvegarder la réponse
    if full_text:
        st.session_state.messages.append({"role": "assistant", "content": full_text})
        _save_msg(
            db,
            st.session_state.get("conversation_id", ""),
            "assistant",
            full_text,
        )
