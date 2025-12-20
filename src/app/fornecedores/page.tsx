'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { fornecedoresMock } from '@/data/mocks'
import { Mail, Phone, Star, Package, Clock } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'

/**
 * Página de gestão de fornecedores
 * Exibe lista de fornecedores com informações de performance
 * Apenas acessível para perfil Compras
 */
export default function FornecedoresPage() {
	const router = useRouter()
	const { user, isAuthenticated } = useAuthStore()
	
	useEffect(() => {
		if (!isAuthenticated || user?.role !== 'compras') {
			router.push('/dashboard')
		}
	}, [isAuthenticated, user, router])
	
	if (!user || user.role !== 'compras') {
		return null
	}
	
	const getStatusColor = (status: string) => {
		switch (status) {
			case 'ativo':
				return 'bg-green-100 text-green-800'
			case 'inativo':
				return 'bg-red-100 text-red-800'
			case 'pendente':
				return 'bg-yellow-100 text-yellow-800'
			default:
				return 'bg-gray-100 text-gray-800'
		}
	}
	
	return (
		<div className="container mx-auto p-6">
			<div className="mb-6">
				<h1 className="text-3xl font-bold text-gray-900">
					Gestão de Fornecedores
				</h1>
				<p className="mt-2 text-gray-600">
					Gerencie e monitore seus fornecedores
				</p>
			</div>
			
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{fornecedoresMock.map((fornecedor) => (
					<Card key={fornecedor.id}>
						<CardHeader>
							<div className="flex items-start justify-between">
								<CardTitle className="text-lg">{fornecedor.nome}</CardTitle>
								<span
									className={`rounded-full px-2 py-1 text-xs font-medium capitalize ${getStatusColor(
										fornecedor.status
									)}`}
								>
									{fornecedor.status}
								</span>
							</div>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center justify-between">
								<span className="text-sm text-gray-600">Categoria:</span>
								<span className="text-sm font-medium capitalize">
									{fornecedor.categoria}
								</span>
							</div>
							
							<div className="flex items-center gap-2 text-sm text-gray-600">
								<Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
								<span className="font-medium">
									{fornecedor.avaliacao.toFixed(1)} / 5.0
								</span>
							</div>
							
							<div className="space-y-2 text-sm">
								<div className="flex items-center gap-2 text-gray-600">
									<Mail className="h-4 w-4" />
									<span>{fornecedor.email}</span>
								</div>
								<div className="flex items-center gap-2 text-gray-600">
									<Phone className="h-4 w-4" />
									<span>{fornecedor.telefone}</span>
								</div>
								<div className="flex items-center gap-2 text-gray-600">
									<Package className="h-4 w-4" />
									<span>{fornecedor.pedidosTotal} pedidos</span>
								</div>
								<div className="flex items-center gap-2 text-gray-600">
									<Clock className="h-4 w-4" />
									<span>{fornecedor.tempoMedioEntrega} dias (média)</span>
								</div>
							</div>
							
							{fornecedor.contratoVencimento && (
								<div className="rounded-lg bg-yellow-50 p-2 text-xs text-yellow-800">
									Contrato vence em:{' '}
									{format(fornecedor.contratoVencimento, "dd 'de' MMM 'de' yyyy", {
										locale: ptBR,
									})}
								</div>
							)}
							
							<div className="pt-2 flex gap-2">
								<Button variant="outline" className="flex-1" size="sm">
									Ver Detalhes
								</Button>
								<Button className="flex-1" size="sm">
									Enviar Mensagem
								</Button>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	)
}

