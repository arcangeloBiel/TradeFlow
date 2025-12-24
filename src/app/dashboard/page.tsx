'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth-store'
import { useQuery } from '@tanstack/react-query'
import { dashboardService } from '@/services/dashboard-service'
import { KPICard } from '@/components/ui/kpi-card'
import { BarChart } from '@/components/charts/bar-chart'
import { LineChart } from '@/components/charts/line-chart'

/**
 * Dashboard principal do sistema
 * Adapta conteúdo conforme perfil do usuário (Trade ou Compras)
 * Exibe KPIs e gráficos relevantes para cada perfil
 */
export default function DashboardPage() {
	const router = useRouter()
	const { user, isAuthenticated } = useAuthStore()

	const { data: kpis, isLoading: isLoadingKPIs } = useQuery({
		queryKey: ['kpis', user?.role],
		queryFn: () => user ? dashboardService.getKPIs(user.role) : Promise.resolve([]),
		enabled: !!user
	})

	const { data: vendasPorCategoria, isLoading: isLoadingVendas } = useQuery({
		queryKey: ['vendas-categoria'],
		queryFn: dashboardService.getVendasPorCategoria
	})

	const { data: performanceData, isLoading: isLoadingPerformance } = useQuery({
		queryKey: ['performance-mensal'],
		queryFn: dashboardService.getPerformanceMensal
	})

	useEffect(() => {
		// Redireciona para login se não estiver autenticado
		if (!isAuthenticated) {
			router.push('/')
		}
	}, [isAuthenticated, router])

	if (!user) {
		return null
	}

	if (isLoadingKPIs || isLoadingVendas || isLoadingPerformance) {
		return <div className="p-6">Carregando dados...</div>
	}

	// Debug logs
	console.log('--- Dashboard Data Debug ---')
	console.log('User Role:', user.role)
	console.log('KPIs:', kpis)
	console.log('Vendas Categoria:', vendasPorCategoria)
	console.log('Performance Mensal:', performanceData)

	const dashboardTitle =
		user.role === 'trade'
			? 'Dashboard Trade Marketing'
			: 'Dashboard Compras'

	return (
		<div className="container mx-auto p-6">
			<div className="mb-6">
				<h1 className="text-3xl font-bold text-gray-900">{dashboardTitle}</h1>
				<p className="mt-2 text-gray-600">
					Bem-vindo, {user.nome}. Acompanhe as métricas e performance do sistema.
				</p>
			</div>

			{/* Grid de KPIs */}
			<div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				{kpis?.map((kpi) => (
					<KPICard key={kpi.id} kpi={kpi} />
				))}
			</div>

			{/* Gráficos */}
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
				<BarChart
					data={vendasPorCategoria || []}
					dataKey="vendas"
					xAxisKey="categoria"
					title="Vendas por Categoria"
					color="#003366"
				/>
				<LineChart
					data={performanceData || []}
					dataKey="vendas"
					xAxisKey="mes"
					title="Performance Mensal"
					color="#003366"
				/>
			</div>
		</div>
	)
}

