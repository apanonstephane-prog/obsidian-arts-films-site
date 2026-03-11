-- AdminSearch — Tables Supabase
-- Coller dans : Supabase Dashboard → SQL Editor → Run

-- ── Conversations ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.conversations (
    id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    title       TEXT,
    user_profile JSONB
);

-- ── Messages ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.messages (
    id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID        NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
    role            TEXT        NOT NULL CHECK (role IN ('user', 'assistant')),
    content         TEXT        NOT NULL,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS messages_conversation_id_idx
    ON public.messages (conversation_id);

-- ── RLS : accès public (clé anon) ─────────────────────────────
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages      ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_all_conversations" ON public.conversations
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "anon_all_messages" ON public.messages
    FOR ALL USING (true) WITH CHECK (true);
