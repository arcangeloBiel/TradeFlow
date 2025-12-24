import { supabase } from '@/lib/supabase/client'
import { UserRole } from '@/types'

export interface MensagemDB {
    id: number
    titulo: string
    tipo: 'mensagem' | 'solicitacao' | 'aprovacao'
    remetente_role: UserRole
    destinatario_role: UserRole
    status: 'nova' | 'lida' | 'pendente' | 'aprovada' | 'rejeitada'
    data_criacao: string
    conteudo?: string
}

export const comunicacaoService = {
    // Busca mensagens onde o usuário é o destinatário (Recebidas)
    async getMensagensRecebidas(userRole: UserRole): Promise<MensagemDB[]> {
        const { data, error } = await supabase
            .from('comunicacao')
            .select('*')
            .eq('destinatario_role', userRole)
            .order('data_criacao', { ascending: false })

        if (error) {
            console.error('Erro ao buscar mensagens recebidas:', error)
            throw error
        }
        return data || []
    },

    // Busca mensagens onde o usuário é o remetente (Enviadas)
    async getMensagensEnviadas(userRole: UserRole): Promise<MensagemDB[]> {
        const { data, error } = await supabase
            .from('comunicacao')
            .select('*')
            .eq('remetente_role', userRole)
            .order('data_criacao', { ascending: false })

        if (error) {
            console.error('Erro ao buscar mensagens enviadas:', error)
            throw error
        }
        return data || []
    }
}
