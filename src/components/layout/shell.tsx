'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Header } from './header'
import { Sidebar } from './sidebar'
import { useAuthStore } from '@/store/auth-store'

/**
 * Componente Shell que decide se deve exibir a estrutura do dashboard
 * Oculta Header e Sidebar na página de login
 */
export function Shell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const { checkAuth, isLoading } = useAuthStore()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        checkAuth()
    }, [checkAuth])

    // Lista de rotas que NÃO devem exibir Header e Sidebar
    const isLoginPage = pathname === '/' || pathname === '/login'

    // Evita mismatch de hidratação e garante que a sessão seja verificada
    if (!mounted || isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50">
                <div className="text-lg font-medium text-gray-600">Carregando sessão...</div>
            </div>
        )
    }

    if (isLoginPage) {
        return <main className="min-h-screen">{children}</main>
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 bg-gray-50 p-4 md:p-6">{children}</main>
            </div>
        </div>
    )
}
