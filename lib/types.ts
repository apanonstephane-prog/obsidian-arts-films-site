export interface Profil {
  secteur: string;
  stade: string;
  localisation: string;
  statut: string;
  activite: string;
}

export type AgentMode = 'conseiller' | 'assistant' | 'autonome';

export interface ConversationRecord {
  id: string;
  title: string;
  created_at: string;
  user_profile?: Profil;
}

export interface MessageRecord {
  role: 'user' | 'assistant';
  content: string;
}

export interface PdfState {
  bytes: ArrayBuffer | null;
  text: string;
  fields: Record<string, string>;
  name: string;
  filledBytes: ArrayBuffer | null;
  previewVals: Record<string, string> | null;
}

export type TrustLevel = 'confirmed' | 'verify' | 'unknown' | 'none';
