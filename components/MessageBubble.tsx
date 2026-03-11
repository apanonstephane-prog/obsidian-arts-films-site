'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ThumbsUp, AlertTriangle, Bot, User } from 'lucide-react';

interface Props {
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
  msgId: string;
}

/* ── Trust tag regex ─────────────────────────────────────────── */
function parseTrust(text: string) {
  // Extract PROCHAINE ÉTAPE section
  const nextMatch = text.match(
    /##\s*PROCHAINE ÉTAPE RECOMMANDÉE\s*\n([\s\S]*?)(?=\n##|$)/i,
  );
  const nextStep = nextMatch ? nextMatch[1].trim() : '';
  const mainText = nextMatch ? text.slice(0, nextMatch.index).trim() : text;

  // Replace trust tags with HTML spans we'll render safely
  const processed = mainText
    .replace(/\[CONFIRMÉ\]/g, '<span class="trust-confirmed">🟢 CONFIRMÉ</span>')
    .replace(/\[À VÉRIFIER\]/g, '<span class="trust-verify">🟡 À VÉRIFIER</span>')
    .replace(/\[NON VÉRIFIÉ\]/g, '<span class="trust-unknown">⚪ NON VÉRIFIÉ</span>');

  return { processed, nextStep };
}

/* ── Feedback state per message ──────────────────────────────── */
type FeedbackState = 'none' | 'liked' | 'flagged';

export default function MessageBubble({ role, content, isStreaming, msgId }: Props) {
  const [feedback, setFeedback] = useState<FeedbackState>('none');
  const [showFlagNote, setShowFlagNote] = useState(false);

  if (role === 'user') {
    return (
      <div className="flex justify-end gap-2 animate-fade-in">
        <div className="max-w-[80%] bg-fr-blue text-white rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm leading-relaxed shadow-sm">
          {content}
        </div>
        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center">
          <User size={14} className="text-slate-500" />
        </div>
      </div>
    );
  }

  /* ── Assistant message ──────────────────────────────────────── */
  const { processed, nextStep } = parseTrust(content);

  return (
    <div className="flex gap-2 animate-slide-up">
      {/* Avatar */}
      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-fr-blue flex items-center justify-center">
        <Bot size={14} className="text-white" />
      </div>

      <div className="flex-1 min-w-0">
        {/* Message card */}
        <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
          {/* Markdown content with trust tags */}
          <div
            className="prose-chat"
            dangerouslySetInnerHTML={{ __html: '' }}
            style={{ display: 'none' }}
          />
          {/* We render markdown but replace trust tags via rehype */}
          <div className="prose-chat">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                // Intercept paragraph to inject trust badge spans
                p({ children }) {
                  return <p>{children}</p>;
                },
                // Make links open in new tab
                a({ href, children }) {
                  return (
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      {children}
                    </a>
                  );
                },
              }}
            >
              {processed
                .replace(/<span class="trust-confirmed">🟢 CONFIRMÉ<\/span>/g, '🟢 **[CONFIRMÉ]**')
                .replace(/<span class="trust-verify">🟡 À VÉRIFIER<\/span>/g, '🟡 **[À VÉRIFIER]**')
                .replace(/<span class="trust-unknown">⚪ NON VÉRIFIÉ<\/span>/g, '⚪ **[NON VÉRIFIÉ]**')}
            </ReactMarkdown>
          </div>

          {/* Streaming cursor */}
          {isStreaming && (
            <span className="inline-block w-2 h-4 bg-fr-blue ml-0.5 animate-cursor-blink rounded-sm" />
          )}

          {/* ── Prochaine étape (Principe 6 — MIT CLT) ──────── */}
          {nextStep && !isStreaming && (
            <div className="next-step-box mt-3">
              <p className="text-xs font-semibold text-green-700 mb-1 flex items-center gap-1">
                <span>✅</span> Prochaine étape recommandée
              </p>
              <ReactMarkdown remarkPlugins={[remarkGfm]} className="text-sm text-green-800">
                {nextStep}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {/* ── Micro-feedback (Principe 8 — Stanford) ───────── */}
        {!isStreaming && (
          <div className="flex items-center gap-2 mt-1.5 ml-1">
            <button
              onClick={() => setFeedback(feedback === 'liked' ? 'none' : 'liked')}
              className={`flex items-center gap-1 text-xs px-2 py-1 rounded-md transition-all ${
                feedback === 'liked'
                  ? 'bg-green-50 text-green-600 border border-green-200'
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
              }`}
              title="Réponse utile"
            >
              <ThumbsUp size={12} />
              <span>Utile</span>
            </button>
            <button
              onClick={() => {
                setFeedback(feedback === 'flagged' ? 'none' : 'flagged');
                setShowFlagNote(feedback !== 'flagged');
              }}
              className={`flex items-center gap-1 text-xs px-2 py-1 rounded-md transition-all ${
                feedback === 'flagged'
                  ? 'bg-amber-50 text-amber-600 border border-amber-200'
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
              }`}
              title="Signaler une imprécision"
            >
              <AlertTriangle size={12} />
              <span>Signaler</span>
            </button>
            {showFlagNote && feedback === 'flagged' && (
              <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-md border border-amber-100">
                Merci — vérifiez sur les sites officiels avant de soumettre.
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
