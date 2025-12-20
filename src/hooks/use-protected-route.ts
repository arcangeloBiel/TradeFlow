'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth-store'
import { ROTAS_POR_PERFIL } from '@/lib/constants'

/**
 * Hook customizado para proteção de rotas
 * Redireciona usuário se não tiver permissão para acessar a rota
 * Garante controle de acesso baseado em perfis
 */
export function useProtectedRoute(requiredRole?: 'trade' | 'compras' | 'fornecedor') {
	const router = useRouter()
	const { user, isAuthenticated } = useAuthStore()
	
	useEffect(() => {
		if (!isAuthenticated) {
			router.push('/')
			return
		}
		
		if (user && requiredRole && user.role !== requiredRole) {
			// Redireciona para dashboard se não tiver permissão
			router.push('/dashboard')
		}
	}, [isAuthenticated, user, requiredRole, router])
	
	return { user, isAuthenticated }
}

