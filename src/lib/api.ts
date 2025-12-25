import { createClient } from './supabase/client'

/**
 * Utilitário de API com Interceptor de JWT
 * Segue as melhores práticas para anexar o token automaticamente
 */
export async function apiFetch(input: RequestInfo | URL, init?: RequestInit) {
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()

    const headers = new Headers(init?.headers)

    // Anexa o JWT se houver uma sessão ativa
    if (session?.access_token) {
        headers.set('Authorization', `Bearer ${session.access_token}`)
    }

    const response = await fetch(input, {
        ...init,
        headers,
    })

    // Tratamento global de erros de autenticação
    if (response.status === 401 || response.status === 403) {
        // Opcional: Redirecionar para login ou disparar evento de logout
        console.warn('Sessão expirada ou acesso não autorizado')
    }

    return response
}

export const api = {
    get: (url: string, init?: RequestInit) => apiFetch(url, { ...init, method: 'GET' }),
    post: (url: string, body: any, init?: RequestInit) =>
        apiFetch(url, {
            ...init,
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json', ...init?.headers }
        }),
    put: (url: string, body: any, init?: RequestInit) =>
        apiFetch(url, {
            ...init,
            method: 'PUT',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json', ...init?.headers }
        }),
    patch: (url: string, body: any, init?: RequestInit) =>
        apiFetch(url, {
            ...init,
            method: 'PATCH',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json', ...init?.headers }
        }),
    delete: (url: string, init?: RequestInit) => apiFetch(url, { ...init, method: 'DELETE' }),
}
