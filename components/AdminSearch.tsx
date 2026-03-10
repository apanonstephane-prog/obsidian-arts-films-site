'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useChat } from '@ai-sdk/react';
import { Send, Menu, X, Key, ExternalLink } from 'lucide-react';
import Sidebar from './Sidebar';
import MessageBubble from './MessageBubble';
import StatusPill from './StatusPill';
import PDFPanel from './PDFPanel';
import type { Profil, AgentMode, ConversationRecord } from '@/lib/types';
import { QUICK_QUERIES } from '@/lib/system-prompt';

/* ── Default profile ─────────────────────────────────────────── */
const DEFAULT_PROFIL: Profil = {
  secteur: "Développement d'applications et sites web",
  stade: 'Pré-création / idée',
  localisation: 'Toulouse (Haute-Garonne, Occitanie)',
  statut: 'Auto-entrepreneur (micro-entreprise)',
  activite: 'Création d\'applications mobiles et sites web (apps, SaaS, outils numériques)',
};

/* ── Welcome message (Principe 5 — NNGroup accurate mental model) ── */
const WELCOME = `Bonjour ! Je suis **SOTAI**, votre expert en aides et subventions françaises.

**Ce que je fais :**
- Connaissance approfondie des dispositifs 2024-2026 (ACRE, Bpifrance, Occitanie, Europe…)
- Signalement de confiance sur chaque information : 🟢 Confirmé · 🟡 À vérifier · ⚪ Non vérifié
- Analyse de vos PDF et préparation au remplissage
- Prochaine étape concrète à chaque réponse

**Important :** Les montants et délais évoluent — vérifiez toujours sur les sites officiels avant de soumettre un dossier.

*Commencez par vérifier votre profil ← puis utilisez un bouton ou posez votre question.*`;

export default function AdminSearch() {
  /* ── State ──────────────────────────────────────────────────── */
  const [profil, setProfil] = useState<Profil>(DEFAULT_PROFIL);
  const [agentMode, setAgentMode] = useState<AgentMode>('assistant');
  const [apiKey, setApiKey] = useState('');
  const [showApiInput, setShowApiInput] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [conversations, setConversations] = useState<ConversationRecord[]>([]);
  const [pendingQuery, setPendingQuery] = useState<string | null>(null);
  const [stage, setStage] = useState<'idle' | 'thinking' | 'streaming'>('idle');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* ── Vercel AI SDK useChat ───────────────────────────────────── */
  const {
    messages,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
    append,
  } = useChat({
    api: '/api/chat',
    body: { profil },
    headers: apiKey ? { 'x-groq-key': apiKey } : {},
    onResponse: () => setStage('streaming'),
    onFinish: () => setStage('idle'),
    onError: () => setStage('idle'),
  });

  /* ── Auto-scroll ─────────────────────────────────────────────── */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  /* ── Stage tracking ─────────────────────────────────────────── */
  useEffect(() => {
    if (isLoading && stage === 'idle') setStage('thinking');
  }, [isLoading, stage]);

  /* ── Handle quick action ────────────────────────────────────── */
  const fireQuery = useCallback(
    (query: string) => {
      setStage('thinking');
      append({ role: 'user', content: query });
    },
    [append],
  );

  /* ── Handle pending query from button ───────────────────────── */
  useEffect(() => {
    if (pendingQuery) {
      fireQuery(pendingQuery);
      setPendingQuery(null);
    }
  }, [pendingQuery, fireQuery]);

  /* ── New conversation ───────────────────────────────────────── */
  const newConversation = () => {
    setMessages([]);
    setStage('idle');
  };

  /* ── Load supabase history on mount ─────────────────────────── */
  useEffect(() => {
    async function loadHistory() {
      try {
        const { recentConversations } = await import('@/lib/supabase');
        const convs = await recentConversations();
        setConversations(convs);
      } catch {}
    }
    loadHistory();
  }, []);

  /* ── Select conversation ────────────────────────────────────── */
  const selectConversation = async (id: string) => {
    try {
      const { loadMessages } = await import('@/lib/supabase');
      const msgs = await loadMessages(id);
      setMessages(
        msgs.map((m, i) => ({ id: String(i), role: m.role, content: m.content })),
      );
    } catch {}
    setSidebarOpen(false);
  };

  const apiKeyConfigured = !!apiKey || !!process.env.NEXT_PUBLIC_GROQ_KEY;
  const hasMessages = messages.length > 0;

  /* ── Custom submit (sends profil in body) ───────────────────── */
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setStage('thinking');
    handleSubmit(e, { body: { profil } });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* ── Mobile sidebar overlay ────────────────────────────── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ───────────────────────────────────────────── */}
      <div
        className={`
          fixed lg:relative inset-y-0 left-0 z-50 transform transition-transform duration-300
          lg:translate-x-0 lg:flex lg:flex-shrink-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <Sidebar
          profil={profil}
          onProfilChange={setProfil}
          agentMode={agentMode}
          onAgentModeChange={setAgentMode}
          conversations={conversations}
          onSelectConversation={selectConversation}
          onNewConversation={newConversation}
        />
      </div>

      {/* ── Main chat area ────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* ── Top bar ─────────────────────────────────────────── */}
        <header className="flex items-center gap-3 px-4 py-3 bg-white border-b border-slate-100 shadow-sm flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-slate-100 text-slate-500"
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-semibold text-slate-900 truncate">
              SOTAI — Aides & Subventions
            </h2>
            <p className="text-xs text-slate-400 truncate">
              {profil.statut} · {profil.localisation}
            </p>
          </div>

          {/* API Key input (Principe 5 — transparency) */}
          <div className="flex items-center gap-2">
            {showApiInput ? (
              <div className="flex items-center gap-1">
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="gsk_..."
                  className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 w-36 focus:outline-none focus:border-fr-blue"
                  onBlur={() => setShowApiInput(false)}
                  autoFocus
                />
              </div>
            ) : (
              <button
                onClick={() => setShowApiInput(true)}
                className={`flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border transition-all ${
                  apiKey
                    ? 'border-green-200 bg-green-50 text-green-700'
                    : 'border-slate-200 text-slate-500 hover:border-fr-blue/30 hover:text-fr-blue'
                }`}
                title="Configurer la clé API Groq"
              >
                <Key size={12} />
                <span>{apiKey ? 'Clé ✓' : 'Clé API'}</span>
              </button>
            )}
            <a
              href="https://console.groq.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-slate-400 hover:text-fr-blue p-1.5 rounded-lg hover:bg-slate-50"
              title="Obtenir une clé Groq gratuite"
            >
              <ExternalLink size={13} />
            </a>
          </div>
        </header>

        {/* ── Quick actions (Principe 1 — Progressive Disclosure) ── */}
        <div className="flex gap-2 px-4 py-2.5 bg-white border-b border-slate-100 overflow-x-auto flex-shrink-0">
          {Object.keys(QUICK_QUERIES).map((label) => (
            <button
              key={label}
              onClick={() => setPendingQuery(QUICK_QUERIES[label])}
              disabled={isLoading}
              className="btn-quick whitespace-nowrap flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── Messages ──────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {/* Welcome message (Principe 5) */}
          {!hasMessages && (
            <MessageBubble
              role="assistant"
              content={WELCOME}
              msgId="welcome"
            />
          )}

          {/* Conversation messages */}
          {messages.map((msg, i) => (
            <MessageBubble
              key={msg.id}
              role={msg.role as 'user' | 'assistant'}
              content={msg.content}
              isStreaming={isLoading && i === messages.length - 1 && msg.role === 'assistant'}
              msgId={msg.id}
            />
          ))}

          {/* Stage 2 status pill (Principe 2 — 3-stage status) */}
          <StatusPill stage={stage} />

          <div ref={messagesEndRef} />
        </div>

        {/* ── PDF Panel (Principe 4 — Intent Preview) ───────────── */}
        <PDFPanel
          profil={profil}
          agentMode={agentMode}
          apiKeyConfigured={apiKeyConfigured}
        />

        {/* ── Input area ────────────────────────────────────────── */}
        <div className="flex-shrink-0 px-4 py-3 bg-white border-t border-slate-100">
          <form onSubmit={onSubmit} className="flex items-end gap-2">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                value={input}
                onChange={handleInputChange}
                placeholder="Posez votre question (aides, concours, PDF, statut juridique…)"
                disabled={isLoading}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:border-fr-blue focus:ring-2 focus:ring-fr-blue/10 disabled:opacity-50 resize-none bg-slate-50 hover:bg-white transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-fr-blue hover:bg-fr-blue-dark text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send size={16} />
            </button>
          </form>
          <p className="text-xs text-slate-400 mt-1.5 text-center">
            Vérifiez toujours les informations sur les sites officiels avant de soumettre.
          </p>
        </div>
      </div>
    </div>
  );
}
