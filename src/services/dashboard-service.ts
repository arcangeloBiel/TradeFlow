import { createClient } from '@/lib/supabase/client'
import { KPI, UserRole } from '@/types'

export const dashboardService = {
    async getKPIs(role: UserRole): Promise<KPI[]> {
        const { data, error } = await createClient()
            .from('kpis')
            .select('*')
            .eq('tipo', role)

        if (error) throw error
        return data as KPI[]
    },

    async getVendasPorCategoria() {
        const { data, error } = await createClient()
            .from('analytics_vendas_categoria')
            .select('categoria, vendas')

        if (error) {
            console.error('Erro ao buscar Vendas por Categoria:', error)
            throw error
        }

        // Garante que vendas é número (Supabase pode retornar NUMERIC como string)
        return data?.map((item: any) => ({
            ...item,
            vendas: Number(item.vendas)
        })) || []
    },

    async getPerformanceMensal() {
        const { data, error } = await createClient()
            .from('analytics_vendas_mensal')
            .select('mes, vendas')
            .order('ordem')

        if (error) {
            console.error('Erro ao buscar Performance Mensal:', error)
            throw error
        }

        return data?.map((item: any) => ({
            ...item,
            vendas: Number(item.vendas)
        })) || []
    }
}
