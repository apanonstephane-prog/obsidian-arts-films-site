'use client';

import { useState, useRef, useCallback } from 'react';
import { Upload, FileText, Check, ChevronDown, ChevronUp, AlertCircle, Download } from 'lucide-react';
import type { Profil, PdfState, AgentMode } from '@/lib/types';
import { cn } from '@/lib/cn';

interface Props {
  profil: Profil;
  agentMode: AgentMode;
  apiKeyConfigured: boolean;
}

export default function PDFPanel({ profil, agentMode, apiKeyConfigured }: Props) {
  const [open, setOpen] = useState(false);
  const [pdfState, setPdfState] = useState<PdfState>({
    bytes: null,
    text: '',
    fields: {},
    name: '',
    filledBytes: null,
    previewVals: null,
  });
  const [loading, setLoading] = useState(false);
  const [editedVals, setEditedVals] = useState<Record<string, string>>({});
  const [showAudit, setShowAudit] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  /* ── Handle file upload (client-side parsing placeholder) ─── */
  const handleFile = useCallback(
    async (file: File) => {
      if (!file || file.type !== 'application/pdf') return;
      setLoading(true);
      try {
        const bytes = await file.arrayBuffer();
        // For Vercel (Edge), we send the file to an API route for processing
        // Here we just store name and signal it's loaded
        setPdfState({
          bytes,
          text: '(Contenu disponible comme contexte dans le chat)',
          fields: {},
          name: file.name,
          filledBytes: null,
          previewVals: null,
        });
        setEditedVals({});
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  /* ── Drag & drop ────────────────────────────────────────────── */
  const [dragOver, setDragOver] = useState(false);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const hasFields = Object.keys(pdfState.fields).length > 0;
  const hasPreview = pdfState.previewVals !== null;

  return (
    <div className="border-t border-slate-100">
      {/* Expander header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-slate-50 transition-colors text-sm"
      >
        <div className="flex items-center gap-2 text-slate-600">
          <FileText size={15} />
          <span>
            {pdfState.name ? (
              <span className="font-medium text-fr-blue">{pdfState.name}</span>
            ) : (
              'Importer un PDF'
            )}
          </span>
          {pdfState.name && (
            <span className="text-xs text-green-600 bg-green-50 px-1.5 py-0.5 rounded">chargé</span>
          )}
        </div>
        {open ? <ChevronUp size={14} className="text-slate-400" /> : <ChevronDown size={14} className="text-slate-400" />}
      </button>

      {open && (
        <div className="px-4 pb-4 space-y-3 animate-fade-in">
          {/* Drop zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            onClick={() => fileRef.current?.click()}
            className={cn(
              'border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all',
              dragOver
                ? 'border-fr-blue bg-fr-blue-light'
                : pdfState.name
                ? 'border-green-300 bg-green-50'
                : 'border-slate-200 hover:border-fr-blue/50 hover:bg-fr-blue-light/30',
            )}
          >
            <input
              ref={fileRef}
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
            {loading ? (
              <p className="text-sm text-slate-500 animate-pulse">Analyse du PDF…</p>
            ) : pdfState.name ? (
              <div className="flex flex-col items-center gap-1">
                <Check size={20} className="text-green-500" />
                <p className="text-sm font-medium text-green-700">{pdfState.name}</p>
                <p className="text-xs text-slate-500">Cliquez pour remplacer</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1.5">
                <Upload size={20} className="text-slate-400" />
                <p className="text-sm text-slate-600">
                  Glissez un PDF ou <span className="text-fr-blue font-medium">parcourir</span>
                </p>
                <p className="text-xs text-slate-400">Formulaire de subvention, appel à projets…</p>
              </div>
            )}
          </div>

          {/* Context note */}
          {pdfState.name && (
            <p className="text-xs text-slate-500 flex items-center gap-1.5">
              <AlertCircle size={12} className="text-amber-500 flex-shrink-0" />
              {agentMode === 'conseiller'
                ? 'Mode Conseiller : le PDF est disponible comme contexte dans le chat.'
                : hasFields
                ? `${Object.keys(pdfState.fields).length} champ(s) détecté(s) — cliquez "Remplir" pour préparer le formulaire.`
                : 'PDF chargé comme contexte de conversation. Mentionnez-le dans votre question.'}
            </p>
          )}

          {/* Fill button — only in assistant/autonome mode */}
          {pdfState.name && hasFields && agentMode !== 'conseiller' && apiKeyConfigured && !hasPreview && (
            <button
              onClick={async () => {
                setLoading(true);
                try {
                  const res = await fetch('/api/pdf', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      fields: pdfState.fields,
                      profil,
                      pdfText: pdfState.text,
                    }),
                  });
                  const data = await res.json() as { values: Record<string, string> };
                  if (agentMode === 'autonome') {
                    setPdfState((s) => ({ ...s, previewVals: data.values }));
                  } else {
                    setPdfState((s) => ({ ...s, previewVals: data.values }));
                    setEditedVals(data.values);
                  }
                } finally {
                  setLoading(false);
                }
              }}
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? 'Analyse en cours…' : 'Remplir avec mon profil'}
            </button>
          )}

          {/* ── Intent Preview (Principe 4 — MIT CHI 2025) ─── */}
          {hasPreview && pdfState.filledBytes === null && agentMode === 'assistant' && (
            <div className="space-y-3 animate-fade-in">
              <div className="flex items-start gap-2 p-2.5 bg-amber-50 border border-amber-200 rounded-lg">
                <AlertCircle size={14} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-700">
                  <strong>Vérifiez chaque champ</strong> — l&apos;IA peut se tromper.
                  Corrigez avant de générer.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto">
                {Object.entries(pdfState.previewVals!).map(([name, val]) => (
                  <div key={name}>
                    <label className="block text-xs text-slate-500 mb-0.5">{name}</label>
                    <input
                      value={editedVals[name] ?? val}
                      onChange={(e) =>
                        setEditedVals((prev) => ({ ...prev, [name]: e.target.value }))
                      }
                      className="w-full text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-fr-blue"
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={() => {
                  // In a real app: generate filled PDF client-side or via API
                  // Here we signal success for demo
                  setPdfState((s) => ({ ...s, filledBytes: new ArrayBuffer(0) }));
                }}
                className="btn-primary w-full"
              >
                ✅ Confirmer et générer le PDF
              </button>
            </div>
          )}

          {/* Audit log (autonome mode) */}
          {agentMode === 'autonome' && hasPreview && (
            <div>
              <button
                onClick={() => setShowAudit(!showAudit)}
                className="text-xs text-slate-500 hover:text-slate-700 flex items-center gap-1"
              >
                {showAudit ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                Audit — valeurs utilisées
              </button>
              {showAudit && (
                <pre className="mt-1 text-xs bg-slate-50 border border-slate-100 rounded-lg p-2 overflow-auto max-h-32">
                  {JSON.stringify(pdfState.previewVals, null, 2)}
                </pre>
              )}
            </div>
          )}

          {/* Download */}
          {pdfState.filledBytes !== null && pdfState.filledBytes.byteLength > 0 && (
            <a
              href={URL.createObjectURL(
                new Blob([pdfState.filledBytes], { type: 'application/pdf' }),
              )}
              download={`rempli_${pdfState.name}`}
              className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors"
            >
              <Download size={15} />
              Télécharger le PDF rempli
            </a>
          )}
        </div>
      )}
    </div>
  );
}
