/**
 * Store de autenticação usando Zustand
 * Gerencia estado global de autenticação e usuário logado
 * Zustand é mais leve que Redux e ideal para este caso de uso
 */

import { create } from 'zustand'
import type { User, UserRole } from '@/types'
import { authService } from '@/services/auth-service'

interface AuthState {
	user: User | null
	isAuthenticated: boolean
	isLoading: boolean
	login: (email: string, password: string) => Promise<boolean>
	logout: () => Promise<void>
	checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
	user: null,
	isAuthenticated: false,
	isLoading: true,

	login: async (email, password) => {
		try {
			// 1. Autentica no Supabase
			const data = await authService.signIn(email, password)

			if (data.user) {
				// 2. Busca perfil (role)
				const profile = await authService.getUserProfile(data.user.id)

				if (profile) {
					set({ user: profile, isAuthenticated: true })
					return true
				}
			}
			return false
		} catch (error) {
			console.error('Login error:', error)
			return false
		}
	},

	logout: async () => {
		await authService.signOut()
		set({ user: null, isAuthenticated: false })
	},

	checkAuth: async () => {
		try {
			set({ isLoading: true })
			const currentUser = await authService.getCurrentUser()

			if (currentUser) {
				const profile = await authService.getUserProfile(currentUser.id)
				if (profile) {
					set({ user: profile, isAuthenticated: true })
				} else {
					set({ user: null, isAuthenticated: false })
				}
			} else {
				set({ user: null, isAuthenticated: false })
			}
		} catch (error) {
			set({ user: null, isAuthenticated: false })
		} finally {
			set({ isLoading: false })
		}
	},
}))

