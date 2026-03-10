#!/usr/bin/env python3
"""
AdminSearch — Agent Aides & Subventions Françaises
===================================================
Architecture : MIT Fluid Interfaces · Stanford HAI · Harvard HCI (2026)
Lancer avec  : streamlit run app.py
"""

import os
import io
import json
import re
import hashlib
import asyncio
import concurrent.futures
import streamlit as st
from openai import OpenAI
from datetime import datetime
from dotenv import load_dotenv

# ── PDF (optionnel) ────────────────────────────────────────────
try:
    import pdfplumber
    _PDF_READ_OK = True
except ImportError:
    _PDF_READ_OK = False

try:
    from pypdf import PdfReader
    _PYPDF_OK = True
except ImportError:
    _PYPDF_OK = False

try:
    from PyPDFForm import PdfWrapper
    _PDF_FILL_OK = True
except ImportError:
    _PDF_FILL_OK = False

load_dotenv()

# ── Supabase (optionnel) ──────────────────────────────────────
try:
    from supabase import create_client
    _SUPABASE_OK = True
except ImportError:
    _SUPABASE_OK = False

# ── MCP data.gouv.fr (optionnel) ──────────────────────────────
try:
    from mcp import ClientSession
    from mcp.client.streamable_http import streamablehttp_client
    _MCP_OK = True
except ImportError:
    _MCP_OK = False


# ============================================================
# Config
# ============================================================

def _get_default_api_key() -> str:
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
# MCP data.gouv.fr — enrichissement live
# ============================================================

_MCP_URL = "https://mcp.data.gouv.fr/mcp"


def enrich_with_datagouv(query: str) -> str:
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
                    item.text for item in result.content if hasattr(item, "text")
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
# PDF — lecture, détection de champs, remplissage IA
# ============================================================

def extract_pdf_text(pdf_bytes: bytes) -> str:
    if not _PDF_READ_OK:
        return ""
    try:
        with pdfplumber.open(io.BytesIO(pdf_bytes)) as pdf:
            pages = []
            for i, page in enumerate(pdf.pages):
                text = page.extract_text() or ""
                if text.strip():
                    pages.append(f"[Page {i+1}]\n{text}")
            return "\n\n".join(pages)
    except Exception:
        return ""


def detect_pdf_fields(pdf_bytes: bytes) -> dict:
    if not _PYPDF_OK:
        return {}
    try:
        reader = PdfReader(io.BytesIO(pdf_bytes))
        fields = reader.get_fields()
        if not fields:
            return {}
        return {name: (field.value or "") for name, field in fields.items()}
    except Exception:
        return {}


def ai_fill_fields(fields: dict, profil: dict, pdf_text: str, api_key: str) -> dict:
    champs_list = json.dumps(list(fields.keys()), ensure_ascii=False, indent=2)
    prompt = (
        "Tu es un expert en dossiers de subventions françaises.\n\n"
        f"Profil :\n{json.dumps(profil, ensure_ascii=False, indent=2)}\n\n"
        f"Contenu PDF :\n{pdf_text[:4000]}\n\n"
        f"Champs à remplir :\n{champs_list}\n\n"
        "Génère les valeurs pour chaque champ selon le profil. "
        "Réponds UNIQUEMENT avec un objet JSON valide, sans commentaires ni markdown.\n"
        'Exemple : {"nom": "Dupont", "secteur": "Développement web"}'
    )
    try:
        client = OpenAI(base_url="https://api.groq.com/openai/v1", api_key=api_key)
        resp = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}],
            stream=False,
        )
        raw = resp.choices[0].message.content or ""
        match = re.search(r"\{.*\}", raw, re.DOTALL)
        if match:
            return json.loads(match.group())
    except Exception:
        pass
    return {}


def fill_pdf(pdf_bytes: bytes, fill_values: dict) -> bytes | None:
    if not _PDF_FILL_OK or not fill_values:
        return None
    try:
        filled = PdfWrapper(io.BytesIO(pdf_bytes)).fill(fill_values)
        buf = io.BytesIO()
        filled.write(buf)
        return buf.getvalue()
    except Exception:
        return None


# ============================================================
# Trust rendering — Principe 3 (Stanford TCMM) + Principe 6 (CLT)
# ============================================================

def render_response_with_trust(text: str, key_prefix: str = ""):
    """
    Principe 3 (Stanford) : signaux de confiance visuels [CONFIRMÉ/À VÉRIFIER/NON VÉRIFIÉ]
    Principe 6 (MIT CLT)  : PROCHAINE ÉTAPE en boîte verte distincte
    """
    # Extraire la section "PROCHAINE ÉTAPE"
    next_step = ""
    main_text = text
    match = re.search(
        r"##\s*PROCHAINE ÉTAPE RECOMMANDÉE\s*\n(.*?)(?=\n##|\Z)",
        text, re.DOTALL | re.IGNORECASE
    )
    if match:
        next_step = match.group(1).strip()
        main_text = text[:match.start()].strip()

    # Tags de confiance → badges visuels
    main_text = main_text.replace("[CONFIRMÉ]", "🟢 **[CONFIRMÉ]**")
    main_text = main_text.replace("[À VÉRIFIER]", "🟡 **[À VÉRIFIER]**")
    main_text = main_text.replace("[NON VÉRIFIÉ]", "⚪ **[NON VÉRIFIÉ]**")

    st.markdown(main_text)

    # Prochaine étape en call-to-action vert (Principe 6)
    if next_step:
        st.success(f"**Prochaine étape →** {next_step}")

    # Micro-feedback (Stanford Trustworthy AI Lab — Principe 8)
    fb1, fb2, _ = st.columns([1, 1, 10])
    with fb1:
        if st.button("👍", key=f"{key_prefix}_up", help="Réponse utile"):
            st.toast("Merci pour votre retour !")
    with fb2:
        if st.button("⚠️", key=f"{key_prefix}_flag", help="Signaler une imprécision"):
            st.warning(
                "Merci. Les montants et délais évoluent — "
                "vérifiez toujours sur le site officiel avant de soumettre."
            )


# ============================================================
# Page config
# ============================================================

st.set_page_config(
    page_title="AdminSearch — Aides Françaises",
    page_icon="🇫🇷",
    layout="centered",
    initial_sidebar_state="expanded",
)


# ============================================================
# System prompt — calibré MIT/Stanford/Harvard
# ============================================================

SYSTEM_PROMPT = """Tu es AdminSearch, expert en financement public français pour entrepreneurs et startups numériques.
Connaissance : dispositifs 2024-2026. Pour les montants exacts et deadlines, recommande de vérifier sur le site officiel.

## DISPOSITIFS MAÎTRISÉS

### Aides immédiates (auto-entrepreneur)
- ACRE : exonération ~50% cotisations sociales, 1ère année
- NACRE : accompagnement + prêt taux zéro jusqu'à 8 000€
- ARCE : si chômeur → 45% des droits ARE en capital
- Maintien ARE : cumul allocation + revenus auto-entrepreneur
- Micro-crédit ADIE : jusqu'à 12 000€

### Bpifrance & État
- Bourse French Tech : 10k–30k€ (nécessite SAS/SARL)
- i-Lab : jusqu'à 600k€ (deep tech)
- i-Nov : jusqu'à 600k€ (startups innovantes)
- Prêt d'amorçage / Prêt création Bpifrance
- Pass French Tech, CIR/CII, JEI/JEC

### Occitanie & Toulouse
- ADI Occitanie : accompagnement + prêts
- Région Occitanie : FREC, chèques innovation numérique
- French Tech Toulouse, CCI Occitanie/Toulouse
- Initiative Grands Toulouse : prêts d'honneur 0% jusqu'à 30k€
- Réseau Entreprendre Occitanie : prêts d'honneur 0% jusqu'à 50k€

### Concours
- i-Lab Bpifrance, Challenge French Tech, Prix Pépite
- Tremplins du Numérique, Talents Occitanie, Grand Prix Innovation Toulouse

### Europe
- FEDER Occitanie, FSE+, Horizon Europe, EIC Accelerator (jusqu'à 2,5M€)

---

Profil accompagné :
- Secteur : {secteur}
- Stade : {stade}
- Localisation : {localisation}
- Statut : {statut}
- Activité : {activite}
- Objectif : {objectif}
- Date : {date}

---

## RÈGLES OBLIGATOIRES

1. **Tag de confiance obligatoire** sur chaque aide :
   - [CONFIRMÉ] : programme permanent, critères stables et certains
   - [À VÉRIFIER] : programme cyclique/régional, conditions susceptibles d'avoir changé
   - [NON VÉRIFIÉ] : information potentiellement obsolète ou incertaine

2. **Format standard** pour chaque aide :
   **[TAG] Nom de l'aide** — Montant | Critère clé | Deadline si connue
   Lien : https://...
   Démarche : étape 1 → étape 2 → étape 3

3. **Éligibilité** : ✅ Maintenant | ⚠️ Sous conditions | ❌ Pas accessible

4. Signale explicitement les aides nécessitant un changement de statut

5. Classe par priorité : accessibilité immédiate > impact financier > facilité dossier

6. Pour les montants/deadlines exacts : recommande toujours de vérifier sur le site officiel

7. **OBLIGATOIRE — dernière section de chaque réponse** :
## PROCHAINE ÉTAPE RECOMMANDÉE
[1 action concrète · 1 contact ou lien direct · deadline si applicable — 3 lignes max]
"""


def get_system_prompt(profil: dict, extra: str = "") -> str:
    return SYSTEM_PROMPT.format(**profil, date=datetime.now().strftime("%B %Y")) + extra


# ============================================================
# Actions rapides
# ============================================================

QUICK_QUERIES = {
    "🔍 Toutes les aides": (
        "Recherche exhaustive de TOUTES les aides pour mon profil.\n\n"
        "Structure :\n## 1. AIDES IMMÉDIATES\n## 2. SOUS CONDITIONS\n"
        "## 3. CONCOURS (6 prochains mois)\n## 4. FUTURES (si changement statut)\n"
        "## 5. PLAN D'ACTION PRIORITAIRE\n\n"
        "Pour chaque aide : [TAG CONFIANCE], montant, critères, deadline, lien, démarches."
    ),
    "🏆 Concours en cours": (
        "Tous les concours, prix et appels à projets ouverts ou s'ouvrant "
        "dans les 6 prochains mois. Nationaux ET régionaux Occitanie.\n"
        "Pour chaque : nom, organisateur, dotation, critères, date limite, lien."
    ),
    "💡 Aides immédiates": (
        "Focus sur les aides accessibles MAINTENANT avec mon statut actuel. Détails pas à pas :\n"
        "1. ACRE | 2. NACRE | 3. ARCE | 4. Prêts d'honneur sans société\n"
        "5. ADI Occitanie / Région / CCI Toulouse | 6. Micro-crédit ADIE\n"
        "Pour chaque : montant exact, démarches concrètes, contact, lien."
    ),
}


# ============================================================
# Sidebar — Profil · Clé API · Mode agent · Historique
# ============================================================

db = _supabase()

with st.sidebar:
    # ── Profil ────────────────────────────────────────────────
    st.header("⚙️ Votre profil")
    st.caption("L'agent adapte ses réponses à ces informations.")

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
        help="Inclut les aides nationales et européennes",
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

    # ── Clé API ───────────────────────────────────────────────
    st.header("🔑 Clé API Groq")
    api_key = st.text_input(
        "Clé API",
        value=_get_default_api_key(),
        type="password",
        placeholder="gsk_...",
        help="Gratuit sur console.groq.com",
    )
    if not api_key:
        st.warning("⚠️ Clé API requise pour démarrer")
        st.markdown("[→ Obtenir une clé gratuite](https://console.groq.com/)")
    else:
        st.success("Clé configurée ✓")

    st.markdown("---")

    # ── Mode agent — Principe 7 (Agentic UX, Microsoft/Stanford) ──
    st.header("🤖 Mode de l'agent")
    agent_mode = st.radio(
        "Niveau d'initiative",
        [
            "Conseiller — je décide",
            "Assistant — je valide",
            "Autonome — je vérifie",
        ],
        index=1,
        label_visibility="collapsed",
        help=(
            "Conseiller : l'IA propose uniquement\n"
            "Assistant : l'IA prépare, vous validez avant action\n"
            "Autonome : l'IA agit directement + audit disponible"
        ),
    )
    mode_desc = {
        "Conseiller — je décide": "Chat uniquement · pas d'action automatique",
        "Assistant — je valide": "Aperçu des valeurs avant remplissage PDF",
        "Autonome — je vérifie": "Remplissage direct · audit accessible",
    }
    st.caption(mode_desc.get(agent_mode, ""))

    st.markdown("---")

    # ── Actions ───────────────────────────────────────────────
    if st.button("🆕 Nouvelle conversation", use_container_width=True):
        for k in [
            "messages", "conversation_id",
            "pdf_bytes", "pdf_text", "pdf_fields",
            "pdf_name", "filled_pdf_bytes", "pdf_preview_vals",
        ]:
            st.session_state.pop(k, None)
        st.rerun()

    # ── Historique Supabase ───────────────────────────────────
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

# Hash du profil pour cache (Streamlit GenAI best practices)
_profil_hash = hashlib.md5(
    json.dumps(profil, sort_keys=True).encode()
).hexdigest()[:8]


# ============================================================
# Zone principale
# ============================================================

st.title("🇫🇷 AdminSearch")
st.caption(
    "Expert IA · Aides & Subventions 2024-2026 · "
    f"{statut} · {localisation}"
    + (" · 📄 PDF chargé" if st.session_state.get("pdf_name") else "")
)

# ── Boutons d'action rapide ───────────────────────────────────
col1, col2, col3 = st.columns(3)
query_from_button = None

for col, (label, query_text) in zip([col1, col2, col3], QUICK_QUERIES.items()):
    if col.button(label, use_container_width=True):
        query_from_button = query_text

st.markdown("---")

# ============================================================
# PDF Upload + Intent Preview (Principe 4 — MIT CHI 2025)
# ============================================================

with st.expander("📄 Importer un PDF (formulaire ou document)", expanded=False):
    uploaded_pdf = st.file_uploader(
        "Glissez un PDF — formulaire de subvention, appel à projets, dossier de demande…",
        type=["pdf"],
        key="pdf_uploader",
        label_visibility="collapsed",
    )

    if uploaded_pdf:
        pdf_bytes_raw = uploaded_pdf.read()
        name = uploaded_pdf.name

        # Extraction uniquement si nouveau fichier
        if st.session_state.get("pdf_name") != name:
            with st.spinner("Analyse du PDF…"):
                _txt = extract_pdf_text(pdf_bytes_raw)
                _flds = detect_pdf_fields(pdf_bytes_raw)
            st.session_state.pdf_bytes = pdf_bytes_raw
            st.session_state.pdf_text = _txt
            st.session_state.pdf_fields = _flds
            st.session_state.pdf_name = name
            st.session_state.filled_pdf_bytes = None
            st.session_state.pdf_preview_vals = None

        pdf_text_doc = st.session_state.get("pdf_text", "")
        pdf_fields_doc = st.session_state.get("pdf_fields", {})

        # Infos fichier
        col_info, col_btn = st.columns([3, 2])
        with col_info:
            nb_pages = pdf_text_doc.count("[Page ") or 1
            st.success(
                f"**{name}** · {nb_pages} page(s)"
                + (
                    f" · **{len(pdf_fields_doc)} champ(s) détecté(s)**"
                    if pdf_fields_doc
                    else " · Document texte"
                )
            )

        # Bouton remplissage (désactivé en mode Conseiller)
        if pdf_fields_doc and api_key and "Conseiller" not in agent_mode:
            with col_btn:
                if st.button(
                    "Remplir avec mon profil",
                    type="primary",
                    use_container_width=True,
                ):
                    with st.spinner("L'IA analyse les champs…"):
                        fill_vals = ai_fill_fields(
                            pdf_fields_doc, profil,
                            st.session_state.get("pdf_text", ""),
                            api_key,
                        )
                    if "Autonome" in agent_mode:
                        # Remplissage direct (mode autonome)
                        filled = fill_pdf(st.session_state.pdf_bytes, fill_vals)
                        st.session_state.filled_pdf_bytes = filled
                        st.session_state.pdf_preview_vals = fill_vals
                    else:
                        # Mode Assistant : Intent Preview avant remplissage
                        st.session_state.pdf_preview_vals = fill_vals

        # ── Intent Preview — Principe 4 (MIT CHI 2025 / Agentic UX) ──
        preview_vals = st.session_state.get("pdf_preview_vals")
        if (
            preview_vals
            and not st.session_state.get("filled_pdf_bytes")
            and "Autonome" not in agent_mode
        ):
            st.subheader("Valeurs proposées — vérifiez avant de générer")
            st.caption(
                "🟡 L'IA peut se tromper. Corrigez les champs si nécessaire avant de confirmer."
            )
            edited_vals = {}
            cols_fields = st.columns(2)
            for i, (field_name, proposed) in enumerate(preview_vals.items()):
                with cols_fields[i % 2]:
                    edited_vals[field_name] = st.text_input(
                        field_name,
                        value=str(proposed),
                        key=f"field_{field_name}",
                    )
            if st.button(
                "✅ Confirmer et générer le PDF rempli",
                type="primary",
                use_container_width=True,
            ):
                filled = fill_pdf(st.session_state.pdf_bytes, edited_vals)
                st.session_state.filled_pdf_bytes = filled
                st.rerun()

        # Audit log mode Autonome
        if "Autonome" in agent_mode and st.session_state.get("pdf_preview_vals"):
            with st.expander("📋 Audit — valeurs utilisées par l'IA", expanded=False):
                st.json(st.session_state.pdf_preview_vals)

        # Téléchargement
        if st.session_state.get("filled_pdf_bytes"):
            st.download_button(
                label="⬇️ Télécharger le PDF rempli",
                data=st.session_state.filled_pdf_bytes,
                file_name=f"rempli_{st.session_state.get('pdf_name', 'formulaire.pdf')}",
                mime="application/pdf",
                use_container_width=True,
            )

        if not pdf_fields_doc and pdf_text_doc:
            st.caption(
                "Ce PDF n'a pas de champs éditables — "
                "son contenu est disponible comme contexte dans le chat."
            )

st.markdown("---")

# ============================================================
# Historique de conversation
# ============================================================

if "messages" not in st.session_state:
    st.session_state.messages = []

# Message de bienvenue — Principe 5 (NNGroup : mental model précis)
if not st.session_state.messages:
    with st.chat_message("assistant"):
        st.markdown(
            "Bonjour ! Je suis **AdminSearch**, votre expert en aides et subventions françaises.\n\n"
            "**Ce que je fais :**\n"
            "- Connaissance approfondie des dispositifs 2024-2026 "
            "(ACRE, Bpifrance, Occitanie, Europe…)\n"
            "- Enrichissement en temps réel via data.gouv.fr quand disponible\n"
            "- Analyse de vos PDF et aide au remplissage de formulaires\n"
            "- Signalement de confiance sur chaque information : "
            "🟢 Confirmé · 🟡 À vérifier · ⚪ Non vérifié\n\n"
            "**Important :** Vérifiez toujours les montants et délais exacts sur les sites "
            "officiels avant de soumettre un dossier — les dispositifs évoluent régulièrement.\n\n"
            f"*Profil : {statut} · {localisation} · {secteur}*"
        )

# Affichage de l'historique avec feedback (Principe 8)
for i, msg in enumerate(st.session_state.messages):
    with st.chat_message(msg["role"]):
        if msg["role"] == "assistant":
            render_response_with_trust(msg["content"], key_prefix=f"hist_{i}")
        else:
            st.markdown(msg["content"])

# ── Input utilisateur ─────────────────────────────────────────
user_input = st.chat_input(
    "Posez votre question (aides, concours, PDF, statut juridique…)"
)

query = query_from_button or user_input

# ============================================================
# Traitement de la requête
# ============================================================

if query:
    if not api_key:
        st.error(
            "⚠️ Ajoutez votre clé API Groq dans la barre latérale.\n\n"
            "→ Gratuit sur [console.groq.com](https://console.groq.com/)"
        )
        st.stop()

    if db and "conversation_id" not in st.session_state:
        st.session_state.conversation_id = _new_conversation(db, profil)

    with st.chat_message("user"):
        st.markdown(query)
    st.session_state.messages.append({"role": "user", "content": query})
    _save_msg(db, st.session_state.get("conversation_id", ""), "user", query)

    # ── Stage 1 : MCP data.gouv.fr — Principe 2 (status progression) ──
    datagouv_ctx = ""
    if _MCP_OK:
        with st.spinner("📡 Consultation data.gouv.fr…"):
            datagouv_ctx = enrich_with_datagouv(
                f"aides entreprises subventions {query[:80]}"
            )
        if datagouv_ctx:
            st.caption("✅ Données officielles data.gouv.fr intégrées")

    # Contexte PDF
    pdf_ctx = ""
    pdf_text_loaded = st.session_state.get("pdf_text", "")
    pdf_name_loaded = st.session_state.get("pdf_name", "")
    if pdf_text_loaded:
        pdf_ctx = (
            f"\n\n## DOCUMENT PDF CHARGÉ : {pdf_name_loaded}\n"
            f"{pdf_text_loaded[:6000]}\n"
            "(Tiens compte de ce document dans ta réponse.)"
        )

    api_messages = [
        {"role": "system", "content": get_system_prompt(profil, datagouv_ctx + pdf_ctx)},
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

        # ── Stage 2 : LLM thinking ────────────────────────────
        status_area.caption("🧠 Analyse de votre profil et recherche des aides…")

        try:
            stream = client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=api_messages,
                stream=True,
            )

            # ── Stage 3 : streaming réponse ───────────────────
            streaming_started = False
            for chunk in stream:
                if not chunk.choices:
                    continue
                delta = chunk.choices[0].delta.content
                if delta:
                    if not streaming_started:
                        status_area.empty()
                        streaming_started = True
                    full_text += delta
                    text_area.markdown(full_text + "▌")

        except Exception as e:
            status_area.empty()
            st.error(f"**Erreur API Groq :** {e}")
            st.info(
                "Vérifiez votre clé API. "
                "→ [console.groq.com](https://console.groq.com/)"
            )

        # Rendu final avec signaux de confiance
        status_area.empty()
        text_area.empty()
        if full_text:
            render_response_with_trust(full_text, key_prefix=f"new_{_profil_hash}")

    if full_text:
        st.session_state.messages.append({"role": "assistant", "content": full_text})
        _save_msg(
            db,
            st.session_state.get("conversation_id", ""),
            "assistant",
            full_text,
        )
