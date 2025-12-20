'use client'

import { useAuthStore } from '@/store/auth-store'
import { Button } from '@/components/ui/button'
import { LogOut, User } from 'lucide-react'

/**
 * Componente Header do sistema
 * Exibe informações do usuário logado e opção de logout
 * Responsivo e acessível
 */

export function Header() {
	const { user, logout } = useAuthStore()
	
	return (
		<header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
			<div className="container mx-auto flex h-16 items-center justify-between px-4">
				<div className="flex items-center gap-2">
					<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500 text-white font-bold text-xl">
						H
					</div>
					<div>
						<h1 className="text-xl font-bold text-gray-900">TradeMax Havan</h1>
						<p className="text-xs text-gray-500">Trade Marketing</p>
					</div>
				</div>
				
				{user && (
					<div className="flex items-center gap-4">
						<div className="flex items-center gap-2">
							<div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-700">
								<User className="h-4 w-4" />
							</div>
							<div className="hidden md:block text-right">
								<p className="text-sm font-medium text-gray-900">{user.nome}</p>
								<p className="text-xs text-gray-500 capitalize">{user.role}</p>
							</div>
						</div>
						<Button variant="ghost" size="sm" onClick={logout}>
							<LogOut className="h-4 w-4 mr-2" />
							<span className="hidden sm:inline">Sair</span>
						</Button>
					</div>
				)}
			</div>
		</header>
	)
}

