import { Card, CardContent, CardHeader, CardTitle } from './card'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import type { KPI } from '@/types'

/**
 * Componente KPI Card especializado
 * Exibe métricas com indicadores de tendência
 * Usado nos dashboards para visualização rápida de KPIs
 */

interface KPICardProps {
	kpi: KPI
	className?: string
}

export function KPICard({ kpi, className }: KPICardProps) {
	const getTendenciaIcon = () => {
		if (kpi.tendencia === 'up') {
			return <TrendingUp className="h-4 w-4 text-green-600" />
		}
		if (kpi.tendencia === 'down') {
			return <TrendingDown className="h-4 w-4 text-red-600" />
		}
		return <Minus className="h-4 w-4 text-gray-400" />
	}
	
	const getVariacaoColor = () => {
		if (kpi.tendencia === 'up') {
			return 'text-green-600'
		}
		if (kpi.tendencia === 'down') {
			return 'text-red-600'
		}
		return 'text-gray-600'
	}
	
	const formatValue = (valor: number) => {
		if (valor >= 1000000) {
			return `${(valor / 1000000).toFixed(1)}M`
		}
		if (valor >= 1000) {
			return `${(valor / 1000).toFixed(1)}K`
		}
		return valor.toFixed(1)
	}
	
	return (
		<Card className={className}>
			<CardHeader>
				<CardTitle className="text-sm font-medium text-gray-600">
					{kpi.titulo}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex items-baseline justify-between">
					<div>
						<div className="text-2xl font-bold text-gray-900">
							{formatValue(kpi.valor)} {kpi.unidade}
						</div>
						{kpi.variacao !== undefined && (
							<div
								className={cn(
									'mt-1 flex items-center gap-1 text-sm',
									getVariacaoColor()
								)}
							>
								{getTendenciaIcon()}
								<span>
									{Math.abs(kpi.variacao)}% vs período anterior
								</span>
							</div>
						)}
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

