import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    // 1. Cria uma resposta inicial
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    // 2. Inicializa o cliente do Supabase para SSR
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return request.cookies.get(name)?.value
                },
                set(name: string, value: string, options: CookieOptions) {
                    // Atualiza os cookies na requisição e na resposta
                    request.cookies.set({ name, value, ...options })
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    response.cookies.set({ name, value, ...options })
                },
                remove(name: string, options: CookieOptions) {
                    // Remove os cookies na requisição e na resposta
                    request.cookies.set({ name, value: '', ...options })
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    response.cookies.set({ name, value: '', ...options })
                },
            },
        }
    )

    // 3. Verifica a sessão (IMPORTANTE: use getUser() por segurança no middleware)
    const {
        data: { user },
    } = await supabase.auth.getUser()

    const isProtectedRoute =
        request.nextUrl.pathname.startsWith('/dashboard') ||
        request.nextUrl.pathname.startsWith('/campanhas') ||
        request.nextUrl.pathname.startsWith('/comunicacao') ||
        request.nextUrl.pathname.startsWith('/relatorios')

    // 4. Lógica de Redirecionamento
    if (isProtectedRoute && !user) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    if (request.nextUrl.pathname === '/' && user) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return response
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}