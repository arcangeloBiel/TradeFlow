'use client'

import {
	BarChart as RechartsBarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Legend,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

/**
 * Componente Bar Chart usando Recharts
 * Recharts é uma biblioteca moderna e performática para gráficos React
 * Responsivo e acessível por padrão
 */

interface BarChartProps {
	data: Array<Record<string, string | number>>
	dataKey: string
	xAxisKey: string
	title?: string
	color?: string
	height?: number
}

export function BarChart({
	data,
	dataKey,
	xAxisKey,
	title,
	color = '#003366',
	height = 300,
}: BarChartProps) {
	return (
		<Card>
			{title && (
				<CardHeader>
					<CardTitle>{title}</CardTitle>
				</CardHeader>
			)}
			<CardContent>
				<ResponsiveContainer width="100%" height={height}>
					<RechartsBarChart data={data}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis
							dataKey={xAxisKey}
							tick={{ fill: '#6B7280' }}
							style={{ fontSize: '12px' }}
						/>
						<YAxis tick={{ fill: '#6B7280' }} style={{ fontSize: '12px' }} />
						<Tooltip
							contentStyle={{
								backgroundColor: '#fff',
								border: '1px solid #E5E7EB',
								borderRadius: '6px',
							}}
						/>
						<Legend />
						<Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} />
					</RechartsBarChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	)
}

