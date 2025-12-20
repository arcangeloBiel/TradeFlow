'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, Download, TrendingUp } from 'lucide-react'

/**
 * Página de relatórios e Business Intelligence
 * Exibe relatórios específicos por departamento
 * Permite exportação de dados
 */
export default function RelatoriosPage() {
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
	
	const relatoriosTrade = [
		{
			id: '1',
			titulo: 'Performance por Categoria',
			descricao: 'Análise detalhada de vendas e ROI por categoria de produtos',
			tipo: 'trade',
		},
		{
			id: '2',
			titulo: 'ROI de Campanhas',
			descricao: 'Retorno sobre investimento de todas as campanhas promocionais',
			tipo: 'trade',
		},
		{
			id: '3',
			titulo: 'Análise de Concorrência',
			descricao: 'Comparativo de market share e posicionamento competitivo',
			tipo: 'trade',
		},
	]
	
	const relatoriosCompras = [
		{
			id: '4',
			titulo: 'Performance de Fornecedores',
			descricao: 'Avaliação completa de desempenho e entregas',
			tipo: 'compras',
		},
		{
			id: '5',
			titulo: 'Análise de Custos',
			descricao: 'Evolução de custos e economia gerada',
			tipo: 'compras',
		},
		{
			id: '6',
			titulo: 'Contratos e Renovações',
			descricao: 'Status de contratos e prazos de renovação',
			tipo: 'compras',
		},
	]
	
	const relatorios = user.role === 'trade' ? relatoriosTrade : relatoriosCompras
	
	return (
		<div className="container mx-auto p-6">
			<div className="mb-6">
				<h1 className="text-3xl font-bold text-gray-900">
					Relatórios e Business Intelligence
				</h1>
				<p className="mt-2 text-gray-600">
					Acesse relatórios detalhados e análises do seu departamento
				</p>
			</div>
			
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{relatorios.map((relatorio) => (
					<Card key={relatorio.id}>
						<CardHeader>
							<div className="flex items-start gap-3">
								<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-700">
									<FileText className="h-5 w-5" />
								</div>
								<div className="flex-1">
									<CardTitle className="text-lg">{relatorio.titulo}</CardTitle>
								</div>
							</div>
						</CardHeader>
						<CardContent className="space-y-4">
							<p className="text-sm text-gray-600">{relatorio.descricao}</p>
							
							<div className="flex items-center gap-2">
								<Button variant="outline" className="flex-1" size="sm">
									<TrendingUp className="h-4 w-4 mr-2" />
									Visualizar
								</Button>
								<Button variant="ghost" size="sm">
									<Download className="h-4 w-4" />
								</Button>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
			
			{/* Relatórios Integrados */}
			<div className="mt-8">
				<Card>
					<CardHeader>
						<CardTitle>Relatórios Integrados</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
								<div>
									<p className="font-medium text-gray-900">
										Análise Cross-Departamental
									</p>
									<p className="mt-1 text-sm text-gray-600">
										Visão integrada de Trade e Compras
									</p>
								</div>
								<Button variant="outline" size="sm">
									Visualizar
								</Button>
							</div>
							
							<div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
								<div>
									<p className="font-medium text-gray-900">
										Performance Global
									</p>
									<p className="mt-1 text-sm text-gray-600">
										Métricas consolidadas de toda a operação
									</p>
								</div>
								<Button variant="outline" size="sm">
									Visualizar
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}

