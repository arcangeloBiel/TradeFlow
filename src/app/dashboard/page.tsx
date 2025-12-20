'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth-store'
import { KPICard } from '@/components/ui/kpi-card'
import { BarChart } from '@/components/charts/bar-chart'
import { LineChart } from '@/components/charts/line-chart'
import { kpisTradeMock, kpisComprasMock, vendasPorCategoriaMock } from '@/data/mocks'

/**
 * Dashboard principal do sistema
 * Adapta conteúdo conforme perfil do usuário (Trade ou Compras)
 * Exibe KPIs e gráficos relevantes para cada perfil
 */
export default function DashboardPage() {
	const router = useRouter()
	const { user, isAuthenticated } = useAuthStore()
	
	useEffect(() => {
		// Redireciona para login se não estiver autenticado
		if (!isAuthenticated) {
			router.push('/')
		}
	}, [isAuthenticated, router])
	
	if (!user) {
		return null
	}
	
	// Seleciona KPIs conforme perfil
	const kpis = user.role === 'trade' ? kpisTradeMock : kpisComprasMock
	const dashboardTitle =
		user.role === 'trade'
			? 'Dashboard Trade Marketing'
			: 'Dashboard Compras'
	
	// Dados para gráfico de linha (performance ao longo do tempo)
	const performanceData = [
		{ mes: 'Jan', vendas: 1200000 },
		{ mes: 'Fev', vendas: 1350000 },
		{ mes: 'Mar', vendas: 1280000 },
		{ mes: 'Abr', vendas: 1450000 },
		{ mes: 'Mai', vendas: 1520000 },
		{ mes: 'Jun', vendas: 1480000 },
	]
	
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
				{kpis.map((kpi) => (
					<KPICard key={kpi.id} kpi={kpi} />
				))}
			</div>
			
			{/* Gráficos */}
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
				<BarChart
					data={vendasPorCategoriaMock}
					dataKey="vendas"
					xAxisKey="categoria"
					title="Vendas por Categoria"
					color="#003366"
				/>
				<LineChart
					data={performanceData}
					dataKey="vendas"
					xAxisKey="mes"
					title="Performance Mensal"
					color="#003366"
				/>
			</div>
		</div>
	)
}

