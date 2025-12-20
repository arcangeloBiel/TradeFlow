'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
	LayoutDashboard,
	Megaphone,
	Users,
	MessageSquare,
	FileText,
	ShoppingCart,
} from 'lucide-react'
import { useAuthStore } from '@/store/auth-store'

/**
 * Componente Sidebar de navegação
 * Adapta menu conforme perfil do usuário
 * Usa Next.js Link para navegação client-side otimizada
 */

export interface NavItem {
	title: string
	href: string
	icon: React.ComponentType<{ className?: string }>
	roles: Array<'trade' | 'compras' | 'fornecedor'>
}

export const navItems: NavItem[] = [
	{
		title: 'Dashboard',
		href: '/dashboard',
		icon: LayoutDashboard,
		roles: ['trade', 'compras'],
	},
	{
		title: 'Campanhas',
		href: '/campanhas',
		icon: Megaphone,
		roles: ['trade'],
	},
	{
		title: 'Fornecedores',
		href: '/fornecedores',
		icon: Users,
		roles: ['compras'],
	},
	{
		title: 'Comunicação',
		href: '/comunicacao',
		icon: MessageSquare,
		roles: ['trade', 'compras'],
	},
	{
		title: 'Relatórios',
		href: '/relatorios',
		icon: FileText,
		roles: ['trade', 'compras'],
	},
	{
		title: 'Compras',
		href: '/compras',
		icon: ShoppingCart,
		roles: ['compras'],
	},
]

export function Sidebar() {
	const pathname = usePathname()
	const { user } = useAuthStore()

	// Filtra itens de menu conforme perfil do usuário
	const filteredNavItems = navItems.filter((item) =>
		user ? item.roles.includes(user.role) : false
	)

	return (
		<aside className="hidden md:flex md:w-64 md:flex-col">
			<div className="flex flex-col gap-1 p-4">
				{filteredNavItems.map((item) => {
					const Icon = item.icon
					const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')

					return (
						<Link
							key={item.href}
							href={item.href}
							className={cn(
								'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
								isActive
									? 'bg-primary-50 text-primary-700'
									: 'text-gray-700 hover:bg-gray-100'
							)}
						>
							<Icon className="h-5 w-5" />
							{item.title}
						</Link>
					)
				})}
			</div>
		</aside>
	)
}

