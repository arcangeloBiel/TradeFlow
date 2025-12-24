import { createClient } from '@/lib/supabase/client'
import { UserRole } from '@/types'

export interface Relatorio {
    id: number
    titulo: string
    descricao: string
    tipo: 'trade' | 'compras'
}

export const relatoriosService = {
    // Busca relatórios por tipo (departamento)
    async getRelatorios(role: UserRole): Promise<Relatorio[]> {
        const { data, error } = await createClient()
            .from('relatorios')
            .select('*')
            // Se o usuário for trade, busca trade. Se for compras, busca compras.
            // Se for outro (ex: fornecedor), retorna lista vazia ou padrão.
            .eq('tipo', role)
            .order('titulo', { ascending: true })

        if (error) {
            console.error('Erro ao buscar relatórios:', error)
            throw error
        }
        return data || []
    }
}
