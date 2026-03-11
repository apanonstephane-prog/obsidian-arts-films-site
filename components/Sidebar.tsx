'use client';

import { useState } from 'react';
import { Settings, Clock, Plus, ChevronRight, Zap, Shield, Eye } from 'lucide-react';
import type { Profil, AgentMode, ConversationRecord } from '@/lib/types';

interface Props {
  profil: Profil;
  onProfilChange: (p: Profil) => void;
  agentMode: AgentMode;
  onAgentModeChange: (m: AgentMode) => void;
  conversations: ConversationRecord[];
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
}

const STADE_OPTIONS = [
  'Pré-création / idée',
  'MVP en cours',
  'Premier CA',
  'Levée de fonds',
];

const STATUT_OPTIONS = [
  'Auto-entrepreneur (micro-entreprise)',
  'En cours de création',
  'SAS',
  'SARL',
  'Association',
];

const AGENT_MODES: { value: AgentMode; label: string; desc: string; icon: React.ReactNode }[] = [
  {
    value: 'conseiller',
    label: 'Conseiller',
    desc: "Je décide",
    icon: <Eye size={14} />,
  },
  {
    value: 'assistant',
    label: 'Assistant',
    desc: "Je valide",
    icon: <Shield size={14} />,
  },
  {
    value: 'autonome',
    label: 'Autonome',
    desc: "Je vérifie",
    icon: <Zap size={14} />,
  },
];

export default function Sidebar({
  profil,
  onProfilChange,
  agentMode,
  onAgentModeChange,
  conversations,
  onSelectConversation,
  onNewConversation,
}: Props) {
  const [section, setSection] = useState<'profile' | 'history'>('profile');

  const update = (key: keyof Profil, val: string) =>
    onProfilChange({ ...profil, [key]: val });

  return (
    <aside className="flex flex-col h-full bg-navy text-slate-100 w-72 flex-shrink-0">
      {/* ── Brand header ─────────────────────────────── */}
      <div className="px-4 py-4 border-b border-navy-border">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white">SOTAI</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Aides & Subventions 🇫🇷
            </p>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setSection('profile')}
              className={`p-1.5 rounded-lg transition-colors ${
                section === 'profile'
                  ? 'bg-fr-blue text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Profil"
            >
              <Settings size={15} />
            </button>
            <button
              onClick={() => setSection('history')}
              className={`p-1.5 rounded-lg transition-colors ${
                section === 'history'
                  ? 'bg-fr-blue text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Historique"
            >
              <Clock size={15} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {section === 'profile' ? (
          <div className="p-4 space-y-4">
            {/* ── Profile fields ───────────────────── */}
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Votre profil
              </p>
              <div className="space-y-3">
                <div>
                  <label className="sidebar-label">Secteur d&apos;activité</label>
                  <input
                    value={profil.secteur}
                    onChange={(e) => update('secteur', e.target.value)}
                    className="sidebar-input"
                    placeholder="Ex : SaaS, e-commerce…"
                  />
                </div>
                <div>
                  <label className="sidebar-label">Stade du projet</label>
                  <select
                    value={profil.stade}
                    onChange={(e) => update('stade', e.target.value)}
                    className="sidebar-select"
                  >
                    {STADE_OPTIONS.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="sidebar-label">Localisation</label>
                  <input
                    value={profil.localisation}
                    onChange={(e) => update('localisation', e.target.value)}
                    className="sidebar-input"
                    placeholder="Ex : Toulouse, Occitanie"
                  />
                </div>
                <div>
                  <label className="sidebar-label">Statut juridique</label>
                  <select
                    value={profil.statut}
                    onChange={(e) => update('statut', e.target.value)}
                    className="sidebar-select"
                  >
                    {STATUT_OPTIONS.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="sidebar-label">Activité</label>
                  <textarea
                    value={profil.activite}
                    onChange={(e) => update('activite', e.target.value)}
                    className="sidebar-input resize-none"
                    rows={3}
                    placeholder="Décrivez votre activité…"
                  />
                </div>
              </div>
            </div>

            {/* ── Agent mode (Principe 7 — Agentic UX) ── */}
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Mode agent
              </p>
              <div className="space-y-1.5">
                {AGENT_MODES.map(({ value, label, desc, icon }) => (
                  <button
                    key={value}
                    onClick={() => onAgentModeChange(value)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                      agentMode === value
                        ? 'bg-fr-blue text-white'
                        : 'hover:bg-navy-light text-slate-300'
                    }`}
                  >
                    <span className="flex-shrink-0">{icon}</span>
                    <span className="font-medium">{label}</span>
                    <span
                      className={`ml-auto text-xs ${
                        agentMode === value ? 'text-blue-200' : 'text-slate-500'
                      }`}
                    >
                      {desc}
                    </span>
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-2">
                {agentMode === 'conseiller' && "L'IA propose · vous agissez"}
                {agentMode === 'assistant' && "L'IA prépare · vous validez avant action"}
                {agentMode === 'autonome' && "L'IA agit directement · audit disponible"}
              </p>
            </div>
          </div>
        ) : (
          /* ── History section ─────────────────────── */
          <div className="p-4 space-y-2">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Conversations récentes
            </p>
            {conversations.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-6">
                Aucune conversation sauvegardée.<br />
                <span className="text-slate-600">
                  Configurez Supabase pour la persistance.
                </span>
              </p>
            ) : (
              conversations.map((c) => (
                <button
                  key={c.id}
                  onClick={() => onSelectConversation(c.id)}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left hover:bg-navy-light transition-colors group"
                >
                  <Clock size={13} className="text-slate-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-300 truncate">{c.title}</p>
                    <p className="text-xs text-slate-500">
                      {new Date(c.created_at).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <ChevronRight
                    size={13}
                    className="text-slate-600 group-hover:text-slate-300 flex-shrink-0"
                  />
                </button>
              ))
            )}
          </div>
        )}
      </div>

      {/* ── Footer — new conversation ─────────────── */}
      <div className="p-4 border-t border-navy-border">
        <button
          onClick={onNewConversation}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-navy-light hover:bg-navy-border border border-navy-border rounded-lg text-sm text-slate-300 hover:text-slate-100 transition-all"
        >
          <Plus size={15} />
          Nouvelle conversation
        </button>
      </div>
    </aside>
  );
}
