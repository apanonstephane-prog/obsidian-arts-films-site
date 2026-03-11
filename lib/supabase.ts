import { createClient } from '@supabase/supabase-js';
import type { Profil, ConversationRecord, MessageRecord } from './types';

function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function createConversation(profil: Profil): Promise<string> {
  const db = getClient();
  if (!db) return '';
  try {
    const { data } = await db
      .from('conversations')
      .insert({
        title: `Session ${new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}`,
        user_profile: profil,
      })
      .select('id')
      .single();
    return data?.id ?? '';
  } catch {
    return '';
  }
}

export async function saveMessage(
  convId: string,
  role: 'user' | 'assistant',
  content: string,
): Promise<void> {
  if (!convId) return;
  const db = getClient();
  if (!db) return;
  try {
    await db.from('messages').insert({ conversation_id: convId, role, content });
  } catch {}
}

export async function loadMessages(convId: string): Promise<MessageRecord[]> {
  if (!convId) return [];
  const db = getClient();
  if (!db) return [];
  try {
    const { data } = await db
      .from('messages')
      .select('role, content')
      .eq('conversation_id', convId)
      .order('created_at');
    return (data as MessageRecord[]) ?? [];
  } catch {
    return [];
  }
}

export async function recentConversations(limit = 8): Promise<ConversationRecord[]> {
  const db = getClient();
  if (!db) return [];
  try {
    const { data } = await db
      .from('conversations')
      .select('id, title, created_at')
      .order('created_at', { ascending: false })
      .limit(limit);
    return (data as ConversationRecord[]) ?? [];
  } catch {
    return [];
  }
}
