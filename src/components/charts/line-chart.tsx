'use client'

import {
	LineChart as RechartsLineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Legend,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

/**
 * Componente Line Chart usando Recharts
 * Ideal para visualizar tendências ao longo do tempo
 */

interface LineChartProps {
	data: Array<Record<string, string | number>>
	dataKey: string
	xAxisKey: string
	title?: string
	color?: string
	height?: number
}

export function LineChart({
	data,
	dataKey,
	xAxisKey,
	title,
	color = '#003366',
	height = 300,
}: LineChartProps) {
	return (
		<Card>
			{title && (
				<CardHeader>
					<CardTitle>{title}</CardTitle>
				</CardHeader>
			)}
			<CardContent>
				<ResponsiveContainer width="100%" height={height}>
					<RechartsLineChart data={data}>
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
						<Line
							type="monotone"
							dataKey={dataKey}
							stroke={color}
							strokeWidth={2}
							dot={{ r: 4 }}
						/>
					</RechartsLineChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	)
}

