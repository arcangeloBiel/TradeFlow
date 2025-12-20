'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Send, Inbox } from 'lucide-react'

/**
 * Página de comunicação integrada
 * Sistema de mensagens entre Trade e Compras
 * Workflow de aprovações e solicitações
 */
export default function ComunicacaoPage() {
	const router = useRouter()
	const { user, isAuthenticated } = useAuthStore()

	useEffect(() => {
		if (!isAuthenticated) {
			router.push('/')
		}
	}, [isAuthenticated, router])

	if (!user) {
		return null
	}

	return (
		<div className="container mx-auto p-6">
			<div className="mb-6 flex items-start justify-between gap-4">
				<div>
					<h1 className="text-xl font-bold text-gray-900 md:text-3xl">
						Central de Comunicação
					</h1>
					<p className="mt-1 text-sm text-gray-600 md:mt-2 md:text-base">
						Comunicação integrada entre Trade e Compras
					</p>
				</div>
				<Button className="shrink-0 h-8 w-8 p-0 sm:w-auto sm:px-3" size="sm">
					<Plus className="h-4 w-4 sm:mr-2" />
					<span className="hidden sm:inline">Nova Mensagem</span>
				</Button>
			</div>

			<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Inbox className="h-5 w-5" />
							Mensagens Recebidas
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="rounded-lg border border-gray-200 p-4">
								<div className="flex items-start justify-between">
									<div>
										<p className="font-medium text-gray-900">
											Solicitação de Produtos - Campanha Black Friday
										</p>
										<p className="mt-1 text-sm text-gray-600">
											De: {user.role === 'trade' ? 'Compras' : 'Trade Marketing'}
										</p>
										<p className="mt-1 text-xs text-gray-500">
											Há 2 horas
										</p>
									</div>
									<span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
										Nova
									</span>
								</div>
							</div>

							<div className="rounded-lg border border-gray-200 p-4">
								<div className="flex items-start justify-between">
									<div>
										<p className="font-medium text-gray-900">
											Confirmação de Cotação - Eletrodomésticos
										</p>
										<p className="mt-1 text-sm text-gray-600">
											De: {user.role === 'trade' ? 'Compras' : 'Trade Marketing'}
										</p>
										<p className="mt-1 text-xs text-gray-500">
											Ontem
										</p>
									</div>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Send className="h-5 w-5" />
							Mensagens Enviadas
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="rounded-lg border border-gray-200 p-4">
								<div>
									<p className="font-medium text-gray-900">
										Pedido de Aprovação - Campanha Dia das Crianças
									</p>
									<p className="mt-1 text-sm text-gray-600">
										Para: {user.role === 'trade' ? 'Compras' : 'Trade Marketing'}
									</p>
									<p className="mt-1 text-xs text-gray-500">
										Há 1 dia
									</p>
									<span className="mt-2 inline-block rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
										Pendente
									</span>
								</div>
							</div>

							<div className="rounded-lg border border-gray-200 p-4">
								<div>
									<p className="font-medium text-gray-900">
										Solicitação de Estoque - Moda
									</p>
									<p className="mt-1 text-sm text-gray-600">
										Para: {user.role === 'trade' ? 'Compras' : 'Trade Marketing'}
									</p>
									<p className="mt-1 text-xs text-gray-500">
										Há 3 dias
									</p>
									<span className="mt-2 inline-block rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
										Aprovada
									</span>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}

