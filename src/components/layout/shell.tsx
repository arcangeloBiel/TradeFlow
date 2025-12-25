'use client'

import { usePathname } from 'next/navigation'
import { Header } from './header'
import { Sidebar } from './sidebar'

/**
 * Componente Shell que decide se deve exibir a estrutura do dashboard
 * Oculta Header e Sidebar na página de login
 */
export function Shell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    // Lista de rotas que NÃO devem exibir Header e Sidebar
    const isLoginPage = pathname === '/' || pathname === '/login'

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
