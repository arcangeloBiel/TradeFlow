import { createClient } from '@/lib/supabase/client'
import { User, UserRole } from '@/types'

export const authService = {
    // Login com email e senha
    async signIn(email: string, password: string) {
        const { data, error } = await createClient().auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            console.error('Erro no login:', error.message)
            throw error
        }

        return data
    },

    // Logout
    async signOut() {
        const { error } = await createClient().auth.signOut()
        if (error) {
            console.error('Erro no logout:', error.message)
            throw error
        }
    },

    // Busca o perfil do usuário logado na tabela 'profiles'
    async getUserProfile(userId: string): Promise<User | null> {
        const { data, error } = await createClient()
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single()

        if (error) {
            console.error('Erro ao buscar perfil:', error.message)
            return null
        }

        return {
            id: data.id,
            nome: data.nome,
            email: data.email,
            role: data.role as UserRole,
            avatar: data.avatar
        }
    },

    // Busca usuário atual da sessão
    async getCurrentUser() {
        const { data: { user } } = await createClient().auth.getUser()
        return user
    },

    // Altera a senha do usuário
    async updatePassword(password: string) {
        const { error } = await createClient().auth.updateUser({
            password: password
        })

        if (error) {
            console.error('Erro ao atualizar senha:', error.message)
            throw error
        }
    }
}
