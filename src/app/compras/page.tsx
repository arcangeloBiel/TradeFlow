'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Package, FileCheck, AlertCircle } from 'lucide-react'

/**
 * Página específica do módulo de Compras
 * Dashboard com funcionalidades específicas de gestão comercial
 * Apenas acessível para perfil Compras
 */
export default function ComprasPage() {
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
	
	return (
		<div className="container mx-auto p-6">
			<div className="mb-6">
				<h1 className="text-3xl font-bold text-gray-900">
					Gestão Comercial
				</h1>
				<p className="mt-2 text-gray-600">
					Controle de ordens de compra, negociações e contratos
				</p>
			</div>
			
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader>
						<CardTitle className="text-sm font-medium text-gray-600">
							Pedidos Pendentes
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex items-baseline justify-between">
							<div className="text-2xl font-bold text-gray-900">89</div>
							<ShoppingCart className="h-5 w-5 text-primary-500" />
						</div>
						<p className="mt-2 text-xs text-gray-500">
							-12 desde o último mês
						</p>
					</CardContent>
				</Card>
				
				<Card>
					<CardHeader>
						<CardTitle className="text-sm font-medium text-gray-600">
							Em Trânsito
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex items-baseline justify-between">
							<div className="text-2xl font-bold text-gray-900">156</div>
							<Package className="h-5 w-5 text-blue-500" />
						</div>
						<p className="mt-2 text-xs text-gray-500">
							+8 desde a última semana
						</p>
					</CardContent>
				</Card>
				
				<Card>
					<CardHeader>
						<CardTitle className="text-sm font-medium text-gray-600">
							Aprovações Pendentes
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex items-baseline justify-between">
							<div className="text-2xl font-bold text-gray-900">23</div>
							<FileCheck className="h-5 w-5 text-yellow-500" />
						</div>
						<p className="mt-2 text-xs text-gray-500">
							Requerem atenção
						</p>
					</CardContent>
				</Card>
				
				<Card>
					<CardHeader>
						<CardTitle className="text-sm font-medium text-gray-600">
							Alertas
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex items-baseline justify-between">
							<div className="text-2xl font-bold text-gray-900">7</div>
							<AlertCircle className="h-5 w-5 text-red-500" />
						</div>
						<p className="mt-2 text-xs text-gray-500">
							Contratos vencendo
						</p>
					</CardContent>
				</Card>
			</div>
			
			<div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Últimas Ordens de Compra</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="flex items-center justify-between border-b border-gray-200 pb-3">
								<div>
									<p className="font-medium text-gray-900">OC #12345</p>
									<p className="text-sm text-gray-600">Moda Fashion Ltda</p>
								</div>
								<span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
									Aprovada
								</span>
							</div>
							
							<div className="flex items-center justify-between border-b border-gray-200 pb-3">
								<div>
									<p className="font-medium text-gray-900">OC #12344</p>
									<p className="text-sm text-gray-600">EletroTech S.A.</p>
								</div>
								<span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
									Pendente
								</span>
							</div>
							
							<div className="flex items-center justify-between">
								<div>
									<p className="font-medium text-gray-900">OC #12343</p>
									<p className="text-sm text-gray-600">Brinquedos Educativos</p>
								</div>
								<span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
									Em Trânsito
								</span>
							</div>
						</div>
					</CardContent>
				</Card>
				
				<Card>
					<CardHeader>
						<CardTitle>Negociações em Andamento</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="rounded-lg border border-gray-200 p-4">
								<p className="font-medium text-gray-900">
									Renovação Contrato - Moda
								</p>
								<p className="mt-1 text-sm text-gray-600">
									Prazo: 15 dias | Valor: R$ 2.5M
								</p>
								<div className="mt-3 flex gap-2">
									<Button size="sm" className="flex-1">
										Aprovar
									</Button>
									<Button variant="outline" size="sm" className="flex-1">
										Negociar
									</Button>
								</div>
							</div>
							
							<div className="rounded-lg border border-gray-200 p-4">
								<p className="font-medium text-gray-900">
									Cotação Especial - Eletrodomésticos
								</p>
								<p className="mt-1 text-sm text-gray-600">
									Prazo: 7 dias | 3 fornecedores
								</p>
								<div className="mt-3 flex gap-2">
									<Button size="sm" className="flex-1">
										Ver Propostas
									</Button>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}

