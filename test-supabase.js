import { createBrowserClient, createServerClient } from '@supabase/ssr'

try {
    console.log('createBrowserClient (Client):', typeof createBrowserClient);
    console.log('createServerClient (Server/Middleware):', typeof createServerClient);
} catch (e) {
    console.error('Erro ao importar @supabase/ssr:', e);
}