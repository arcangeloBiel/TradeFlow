import { createClient } from '@/lib/supabase/client'
import { Campanha, CampanhaStatus, CategoriaProduto } from '@/types'

export const campanhasService = {
    async getCampanhas(): Promise<Campanha[]> {
        const { data, error } = await createClient()
            .from('campanhas')
            .select('*')
            .order('data_inicio', { ascending: false })

        if (error) {
            console.error('Erro ao buscar campanhas:', error)
            throw error
        }

        // Mapeia do formato do banco (snake_case) para o frontend (camelCase)
        // e garante conversão de tipos (Date e Number)
        return data?.map(item => ({
            id: item.id,
            titulo: item.titulo,
            categoria: item.categoria as CategoriaProduto,
            status: item.status as CampanhaStatus,
            dataInicio: new Date(item.data_inicio),
            dataFim: new Date(item.data_fim),
            roi: item.roi ? Number(item.roi) : undefined,
            orcamento: item.orcamento ? Number(item.orcamento) : undefined,
            objetivos: item.objetivos || [],
            produtos: item.produtos || []
        })) || []
    }
}
