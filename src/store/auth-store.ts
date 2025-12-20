/**
 * Store de autenticação usando Zustand
 * Gerencia estado global de autenticação e usuário logado
 * Zustand é mais leve que Redux e ideal para este caso de uso
 */

import { create } from 'zustand'
import type { User, UserRole } from '@/types'
import { usuariosMock } from '@/data/mocks'

interface AuthState {
	user: User | null
	isAuthenticated: boolean
	login: (email: string, password: string, role: UserRole) => Promise<boolean>
	logout: () => void
	setUser: (user: User) => void
}

export const useAuthStore = create<AuthState>((set) => ({
	user: null,
	isAuthenticated: false,
	
	// Função de login simulada
	// Em produção, faria chamada à API real
	login: async (email: string, password: string, role: UserRole) => {
		// Simula delay de API
		await new Promise((resolve) => setTimeout(resolve, 500))
		
		// Busca usuário mock
		const user = usuariosMock.find(
			(u) => u.email === email && u.role === role
		)
		
		if (user) {
			set({ user, isAuthenticated: true })
			return true
		}
		
		return false
	},
	
	// Função de logout
	logout: () => {
		set({ user: null, isAuthenticated: false })
	},
	
	// Define usuário diretamente (útil para testes)
	setUser: (user: User) => {
		set({ user, isAuthenticated: true })
	},
}))

