'use client';

import { Loader2 } from 'lucide-react';

interface Props {
  stage: 'idle' | 'thinking' | 'streaming';
  hasPdf?: boolean;
}

const STAGE_LABELS: Record<string, string> = {
  idle: '',
  thinking: '🧠 Analyse de votre profil et recherche des aides…',
  streaming: '',
};

export default function StatusPill({ stage }: Props) {
  if (stage === 'idle' || stage === 'streaming') return null;

  return (
    <div className="flex justify-start pl-9 py-1 animate-fade-in">
      <div className="status-pill">
        <Loader2 size={12} className="animate-spin" />
        <span>{STAGE_LABELS[stage]}</span>
      </div>
    </div>
  );
}
