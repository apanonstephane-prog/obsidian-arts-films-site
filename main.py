#!/usr/bin/env python3
"""
Agent Aides & Subventions Françaises
=====================================
Cherche toutes les aides, subventions, concours et dispositifs disponibles
pour les créateurs d'entreprise et startups dans le numérique.

Usage :
  python main.py          → Menu interactif
  python main.py search   → Recherche complète des aides
  python main.py concours → Concours & appels à projets en cours
"""

import os
import sys
from openai import OpenAI
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

# ============================================================
# CONFIGURATION — Adaptez selon votre profil
# ============================================================
PROFIL = {
    "secteur": "Développement d'applications mobiles et web",
    "stade": "Pré-création / idée",
    "localisation": "Toulouse (Haute-Garonne, Occitanie)",
    "statut": "Auto-entrepreneur (micro-entreprise) avec SIRET",
    "activite": "Création d'applications et sites web (apps, SaaS, outils numériques)",
    "objectif": "Développer une startup tech dans le numérique",
}

SYSTEM_PROMPT = """Tu es un expert en financement public français, spécialisé dans les aides aux créateurs \
d'entreprise, startups et entrepreneurs du numérique.

Tu maîtrises et recherches activement tous les dispositifs suivants :

## AIDES IMMÉDIATES (auto-entrepreneur)
- ACRE : exonération partielle des cotisations sociales (1ère année, jusqu'à ~50% d'exo)
- NACRE : accompagnement + prêt à taux zéro (0%) jusqu'à 8 000€
- ARCE : si ancien demandeur d'emploi → capital (45% des droits ARE restants) en lieu d'allocations
- Maintien ARE : cumul allocation chômage + revenus auto-entrepreneur
- Micro-crédit ADIE : jusqu'à 12 000€ pour auto-entrepreneurs

## AIDES BPIFRANCE & ÉTAT
- Bourse French Tech (10k–30k€, nécessite structure type SAS/SARL)
- i-Lab (jusqu'à 600k€, deep tech / innovation de rupture)
- i-Nov (jusqu'à 600k€, startups innovantes)
- Prêt d'amorçage Bpifrance (de 30k à 100k€)
- Pass French Tech (accompagnement accéléré)
- CIR / CII : Crédit Impôt Recherche / Innovation (structures avancées)
- JEI / JEC : Jeune Entreprise Innovante / Créative (exonérations fiscales et sociales)
- Aide au Conseil (CONSEIL+ Bpifrance)

## AIDES RÉGION OCCITANIE & TOULOUSE
- ADI Occitanie (Agence Développement et Innovation) : accompagnement + prêts
- Région Occitanie : dispositifs numérique, aide à la création, chèques innovation
- Toulouse Métropole : aides à la création d'activité
- French Tech Toulouse : accompagnement, mise en réseau, label
- CCI Occitanie / CCI Toulouse : chèques conseil, accompagnement
- Initiative Grands Toulouse : prêts d'honneur 0% (jusqu'à 30k€)
- Réseau Entreprendre Occitanie : prêts d'honneur 0% (jusqu'à 50k€)
- Village by CA Toulouse : incubateur
- Cap'Innov Occitanie, PEPITE Occitanie

## ACCOMPAGNEMENT & INCUBATEURS (Toulouse)
- Incubateur PEPITE (statut national étudiant-entrepreneur, si étudiant)
- Incubateurs universitaires UT1, UT3, INSA
- Station F (Paris, mais accessible)
- Le Catalyseur (incubateur Bpifrance)

## CONCOURS ET PRIX
- Concours i-Lab Bpifrance (annuel, jusqu'à 600k€)
- Challenge French Tech
- Prix Pépite Étudiants (si statut étudiant-entrepreneur)
- Tremplins du Numérique
- Talents Occitanie / Étoiles de l'Économie
- Concours "La France s'engage"
- Grand Prix Innovation Toulouse
- Startup Weekend Toulouse
- Concours sectoriels (Syntec Numérique, etc.)

## AIDES EUROPÉENNES
- FEDER Occitanie (Fonds Européen Développement Régional, géré en région)
- FSE+ (Fonds Social Européen)
- Horizon Europe (projets R&D, en consortium)
- EIC Accelerator (haut potentiel, jusqu'à 2,5M€ + equity)
- COSME (accès au financement PME)
- Digital Europe Programme

## PLATEFORMES DE RÉFÉRENCE
- aides-entreprises.fr (portail officiel)
- bpifrance-creation.fr
- occitanie.fr → aides aux entreprises
- lafrenchtech.com
- guichet-entreprises.fr

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
1. Recherche activement les informations actuelles (montants 2025-2026, deadlines, critères)
2. Évalue chaque aide : ✅ Éligible maintenant | ⚠️ Sous conditions | ❌ Pas encore accessible
3. Pour chaque aide → nom officiel, montant, critères précis, deadline, lien officiel, étapes concrètes
4. Sois honnête : signale quand une aide nécessite une SAS/SARL
5. Indique toujours ce qu'un changement de statut apporterait comme nouvelles opportunités
6. Classe par priorité : accessibilité immédiate > impact financier > facilité de candidature
7. Pour les dossiers : adapte le contenu aux critères exacts de l'appel à projets concerné
"""


def get_system_prompt() -> str:
    return SYSTEM_PROMPT.format(**PROFIL, date=datetime.now().strftime("%B %Y"))


def sep(title: str = "", width: int = 62) -> None:
    if title:
        pad = (width - len(title) - 2) // 2
        print(f"\n{'═' * pad} {title} {'═' * (width - pad - len(title) - 2)}")
    else:
        print("\n" + "═" * width)


def stream_response(client: OpenAI, messages: list) -> str:
    """Lance une requête en streaming et retourne le texte complet."""

    stream = client.chat.completions.create(
        model="meta-llama/llama-3.3-70b-instruct:free",
        messages=messages,
        stream=True,
        extra_body={"plugins": [{"id": "web", "max_results": 5}]},
    )

    print("\n\033[36m[🔍 Recherche web en cours...]\033[0m\n", flush=True)
    full_text = ""
    first_chunk = True

    for chunk in stream:
        if chunk.choices and chunk.choices[0].delta.content:
            text = chunk.choices[0].delta.content
            if first_chunk:
                first_chunk = False
            print(text, end="", flush=True)
            full_text += text

    print()
    return full_text


def run_query(client: OpenAI, query: str) -> str:
    """Exécute une requête et retourne le texte de la réponse."""
    messages = [
        {"role": "system", "content": get_system_prompt()},
        {"role": "user", "content": query},
    ]
    return stream_response(client, messages)


def interactive_session(client: OpenAI, initial_query: str) -> None:
    """Lance la session complète : recherche initiale + questions de suivi."""

    sep()
    print("  ⏳ Recherche en cours...")
    sep()
    print()

    initial_text = run_query(client, initial_query)

    sep("✅ RECHERCHE TERMINÉE")
    print()
    print(
        "\033[90mPostez vos questions de suivi, "
        "ou tapez 'quit' pour terminer.\033[0m"
    )

    # Historique de conversation
    conv = [
        {"role": "system", "content": get_system_prompt()},
        {"role": "user", "content": initial_query},
        {"role": "assistant", "content": initial_text or "Recherche effectuée."},
    ]

    while True:
        try:
            followup = input("\n\033[1mVous :\033[0m ").strip()
        except (EOFError, KeyboardInterrupt):
            print("\n\n👋 À bientôt !")
            break

        if not followup or followup.lower() in ("quit", "exit", "q", "fin", "sortir"):
            print("\n👋 À bientôt !")
            break

        conv.append({"role": "user", "content": followup})
        print("\n\033[1mAgent :\033[0m ", flush=True)

        response_text = stream_response(client, conv)

        if response_text:
            conv.append({"role": "assistant", "content": response_text})

        print()


# ============================================================
# MENU DES OPTIONS
# ============================================================
MENU = {
    "1": {
        "label": "🔍 Recherche complète — toutes les aides disponibles",
        "query": (
            "Effectue une recherche exhaustive de TOUTES les aides, subventions, prêts d'honneur, "
            "exonérations, concours et dispositifs d'accompagnement disponibles pour mon profil. "
            "Structure ta réponse ainsi :\n\n"
            "## 1. AIDES IMMÉDIATES (éligible maintenant avec mon statut actuel)\n"
            "## 2. AIDES SOUS CONDITIONS (actions à effectuer de ma part)\n"
            "## 3. CONCOURS & APPELS À PROJETS (ouverts ou dans les 6 prochains mois)\n"
            "## 4. AIDES FUTURES (si changement de statut vers SAS/SARL)\n"
            "## 5. PLAN D'ACTION PRIORISÉ (par où commencer ?)\n\n"
            "Pour chaque aide : nom officiel, montant, critères précis, deadline, "
            "lien officiel, démarches concrètes."
        ),
    },
    "2": {
        "label": "🏆 Concours et appels à projets en cours",
        "query": (
            "Recherche tous les concours, prix et appels à projets actuellement ouverts "
            "ou s'ouvrant dans les 6 prochains mois, pertinents pour :\n"
            "- Développeur web/app (applications et sites) à Toulouse\n"
            "- Auto-entrepreneur, stade pré-création / early stage\n"
            "- Concours nationaux ET régionaux Occitanie\n\n"
            "Pour chaque concours : nom, organisateur, dotation/prix, critères d'éligibilité, "
            "date limite, lien de candidature."
        ),
    },
    "3": {
        "label": "💡 Aides accessibles maintenant (auto-entrepreneur numérique)",
        "query": (
            "Focus exclusif sur les aides auxquelles je peux prétendre MAINTENANT "
            "avec mon statut d'auto-entrepreneur dans le numérique à Toulouse.\n\n"
            "Détaille chacune avec les démarches concrètes pas à pas :\n"
            "1. ACRE : comment en bénéficier, montant exact, durée\n"
            "2. NACRE : éligibilité, montant, comment candidater\n"
            "3. ARCE : suis-je potentiellement éligible ?\n"
            "4. Prêts d'honneur accessibles sans création de société\n"
            "5. Aides ADI Occitanie, Région, CCI Toulouse pour auto-entrepreneurs\n"
            "6. Micro-crédit ADIE : conditions et démarches\n\n"
            "Pour chaque aide : montant, délais, contact, lien, étapes."
        ),
    },
    "4": {
        "label": "📝 Aide à la rédaction d'un dossier de candidature",
        "query": None,  # Demandé à l'utilisateur
    },
    "5": {
        "label": "🔄 Que gagnerais-je à créer une SAS/SARL ?",
        "query": (
            "Analyse et compare les opportunités si je crée une SAS ou SARL "
            "plutôt que de rester en auto-entrepreneur :\n\n"
            "1. Quelles aides supplémentaires deviendraient accessibles ?\n"
            "   (Bourse French Tech, i-Lab, i-Nov, Bpifrance, JEI/JEC, aides Occitanie...)\n"
            "2. Quels avantages en termes d'accès aux investisseurs et financements ?\n"
            "3. Coût et démarches de création d'une SAS à Toulouse\n"
            "4. Tableau comparatif : auto-entrepreneur vs SAS pour mon cas précis\n"
            "5. Recommandation : à quel stade / pour quel objectif changer de statut ?"
        ),
    },
    "6": {
        "label": "💬 Question personnalisée",
        "query": None,  # Demandée à l'utilisateur
    },
}


def main() -> None:
    api_key = os.environ.get("OPENROUTER_API_KEY")
    if not api_key:
        print("\n❌  OPENROUTER_API_KEY non définie.")
        print("    Copiez .env.example en .env et ajoutez votre clé.")
        print("    → https://openrouter.ai/\n")
        sys.exit(1)

    client = OpenAI(
        base_url="https://openrouter.ai/api/v1",
        api_key=api_key,
    )

    # Raccourcis ligne de commande
    if len(sys.argv) > 1:
        arg = sys.argv[1].lower()
        if arg == "search":
            interactive_session(client, MENU["1"]["query"])
            return
        elif arg == "concours":
            interactive_session(client, MENU["2"]["query"])
            return

    # ── Menu interactif ──────────────────────────────────────
    print()
    sep()
    print("  🇫🇷  AGENT AIDES & SUBVENTIONS FRANÇAISES")
    print("       Spécialisé Startups & Numérique")
    sep()
    print(f"  📍  {PROFIL['localisation']}")
    print(f"  ⚙️   {PROFIL['statut']}")
    print(f"  💻  {PROFIL['activite']}")
    sep()
    print("\n  Que souhaitez-vous faire ?\n")

    for key, option in MENU.items():
        print(f"  {key}.  {option['label']}")

    print()
    choix = input("  Votre choix (1-6) [défaut: 1] : ").strip() or "1"

    if choix not in MENU:
        choix = "1"

    query = MENU[choix]["query"]

    if query is None:
        if choix == "4":
            print("\n  Pour quelle aide souhaitez-vous rédiger un dossier ?")
            print("  (ex: Bourse French Tech, i-Lab, NACRE, Initiative Grands Toulouse...)")
            aide = input("  Aide visée : ").strip()
            if not aide:
                query = MENU["1"]["query"]
            else:
                query = (
                    f"Aide-moi à rédiger un dossier de candidature pour : **{aide}**\n\n"
                    "1. Explique précisément les critères de sélection de cette aide\n"
                    "2. Liste les pièces justificatives et informations requises\n"
                    "3. Rédige un projet de réponse aux questions clés du dossier, "
                    "adapté à mon profil (développeur web/app, Toulouse, auto-entrepreneur, "
                    "stade pré-création, activité : apps et sites web)\n"
                    "4. Donne les conseils pour maximiser les chances de succès\n"
                    "5. Signale les erreurs courantes à éviter\n"
                    "6. Indique les contacts et délais importants"
                )
        else:  # choix == "6"
            print("\n  Votre question (soyez précis pour de meilleurs résultats) :")
            query = input("  → ").strip()
            if not query:
                query = MENU["1"]["query"]

    interactive_session(client, query)


if __name__ == "__main__":
    main()
