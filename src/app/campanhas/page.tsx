'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { campanhasMock } from '@/data/mocks'
import { Plus, Calendar, DollarSign, Target } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'

/**
 * Página de gestão de campanhas promocionais
 * Exibe lista de campanhas com status e permite criar novas
 * Apenas acessível para perfil Trade Marketing
 */
export default function CampanhasPage() {
	const router = useRouter()
	const { user, isAuthenticated } = useAuthStore()

	useEffect(() => {
		if (!isAuthenticated || user?.role !== 'trade') {
			router.push('/dashboard')
		}
	}, [isAuthenticated, user, router])

	if (!user || user.role !== 'trade') {
		return null
	}

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'ativa':
				return 'bg-green-100 text-green-800'
			case 'planejada':
				return 'bg-blue-100 text-blue-800'
			case 'finalizada':
				return 'bg-gray-100 text-gray-800'
			default:
				return 'bg-gray-100 text-gray-800'
		}
	}

	return (
		<div className="container mx-auto p-6">
			<div className="mb-6 flex items-start justify-between gap-4">
				<div>
					<h1 className="text-xl font-bold text-gray-900 md:text-3xl">
						Gestão de Campanhas
					</h1>
					<p className="mt-1 text-sm text-gray-600 md:mt-2 md:text-base">
						Crie e gerencie campanhas promocionais
					</p>
				</div>
				<Button className="shrink-0 h-8 w-8 p-0 sm:w-auto sm:px-3" size="sm">
					<Plus className="h-4 w-4 sm:mr-2" />
					<span className="hidden sm:inline">Nova Campanha</span>
				</Button>
			</div>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{campanhasMock.map((campanha) => (
					<Card key={campanha.id}>
						<CardHeader>
							<div className="flex items-start justify-between">
								<CardTitle className="text-lg">{campanha.titulo}</CardTitle>
								<span
									className={`rounded-full px-2 py-1 text-xs font-medium capitalize ${getStatusColor(
										campanha.status
									)}`}
								>
									{campanha.status}
								</span>
							</div>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center gap-2 text-sm text-gray-600">
								<Calendar className="h-4 w-4" />
								<span>
									{format(campanha.dataInicio, "dd 'de' MMM", {
										locale: ptBR,
									})}{' '}
									-{' '}
									{format(campanha.dataFim, "dd 'de' MMM", {
										locale: ptBR,
									})}
								</span>
							</div>

							{campanha.roi && (
								<div className="flex items-center gap-2 text-sm">
									<DollarSign className="h-4 w-4 text-green-600" />
									<span className="font-medium">ROI: {campanha.roi}%</span>
								</div>
							)}

							{campanha.orcamento && (
								<div className="flex items-center gap-2 text-sm text-gray-600">
									<DollarSign className="h-4 w-4" />
									<span>
										Orçamento:{' '}
										{new Intl.NumberFormat('pt-BR', {
											style: 'currency',
											currency: 'BRL',
										}).format(campanha.orcamento)}
									</span>
								</div>
							)}

							<div>
								<div className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
									<Target className="h-4 w-4" />
									Objetivos:
								</div>
								<ul className="ml-6 list-disc space-y-1 text-sm text-gray-600">
									{campanha.objetivos.map((objetivo, index) => (
										<li key={index}>{objetivo}</li>
									))}
								</ul>
							</div>

							<div className="pt-2">
								<Button variant="outline" className="w-full" size="sm">
									Ver Detalhes
								</Button>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	)
}

