'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { navItems } from '@/components/layout/sidebar'
import { useAuthStore } from '@/store/auth-store'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

export function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()
    const { user } = useAuthStore()

    // Filtra itens de menu conforme perfil do usuário (Admin vê tudo)
    const filteredNavItems = navItems.filter((item) =>
        user ? user.role === 'admin' || item.roles.includes(user.role as any) : false
    )

    return (
        <div className="md:hidden">
            <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(true)}
                className="mr-2 h-10 w-10 p-0"
            >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menu</span>
            </Button>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/50 transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Drawer */}
            <div
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transition-transform duration-300 ease-in-out transform",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
                    <span className="text-lg font-bold text-gray-900">Menu</span>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsOpen(false)}
                        className="h-8 w-8 p-0"
                    >
                        <X className="h-5 w-5" />
                        <span className="sr-only">Fechar menu</span>
                    </Button>
                </div>

                <div className="flex flex-col py-4">
                    {filteredNavItems.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    'flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors border-l-4',
                                    isActive
                                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                                        : 'border-transparent text-gray-700 hover:bg-gray-50'
                                )}
                            >
                                <Icon className="h-5 w-5" />
                                {item.title}
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
