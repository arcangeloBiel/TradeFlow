'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Send, Inbox } from 'lucide-react'

import { useQuery } from '@tanstack/react-query'
import { comunicacaoService } from '@/services/comunicacao-service'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'

/**
 * Página de comunicação integrada
 * Sistema de mensagens entre Trade e Compras
 * Workflow de aprovações e solicitações
 */
export default function ComunicacaoPage() {
	const router = useRouter()
	const { user, isAuthenticated } = useAuthStore()

	const { data: recebidas, isLoading: loadingRecebidas } = useQuery({
		queryKey: ['mensagens-recebidas', user?.role],
		queryFn: () => user ? comunicacaoService.getMensagensRecebidas(user.role) : Promise.resolve([]),
		enabled: !!user
	})

	const { data: enviadas, isLoading: loadingEnviadas } = useQuery({
		queryKey: ['mensagens-enviadas', user?.role],
		queryFn: () => user ? comunicacaoService.getMensagensEnviadas(user.role) : Promise.resolve([]),
		enabled: !!user
	})

	useEffect(() => {
		if (!isAuthenticated) {
			router.push('/')
		}
	}, [isAuthenticated, router])

	if (!user) {
		return null
	}

	if (loadingRecebidas || loadingEnviadas) {
		return <div className="p-6">Carregando mensagens...</div>
	}

	const getRoleName = (role: string) => {
		return role === 'trade' ? 'Trade Marketing' : 'Compras'
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
							{recebidas?.length === 0 && <p className="text-gray-500 text-sm">Nenhuma mensagem recebida.</p>}
							{recebidas?.map((msg) => (
								<div key={msg.id} className="rounded-lg border border-gray-200 p-4">
									<div className="flex items-start justify-between">
										<div>
											<p className="font-medium text-gray-900">
												{msg.titulo}
											</p>
											<p className="mt-1 text-sm text-gray-600">
												De: {getRoleName(msg.remetente_role)}
											</p>
											<p className="mt-1 text-xs text-gray-500 capitalize">
												{formatDistanceToNow(new Date(msg.data_criacao), { locale: ptBR, addSuffix: true })}
											</p>
										</div>
										{msg.status === 'nova' && (
											<span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 capitalize">
												{msg.status}
											</span>
										)}
									</div>
								</div>
							))}
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
							{enviadas?.length === 0 && <p className="text-gray-500 text-sm">Nenhuma mensagem enviada.</p>}
							{enviadas?.map((msg) => (
								<div key={msg.id} className="rounded-lg border border-gray-200 p-4">
									<div>
										<p className="font-medium text-gray-900">
											{msg.titulo}
										</p>
										<p className="mt-1 text-sm text-gray-600">
											Para: {getRoleName(msg.destinatario_role)}
										</p>
										<p className="mt-1 text-xs text-gray-500 capitalize">
											{formatDistanceToNow(new Date(msg.data_criacao), { locale: ptBR, addSuffix: true })}
										</p>
										<span className={`mt-2 inline-block rounded-full px-2 py-1 text-xs font-medium capitalize 
                                            ${msg.status === 'aprovada' ? 'bg-green-100 text-green-800' :
												msg.status === 'pendente' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
											{msg.status}
										</span>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}

