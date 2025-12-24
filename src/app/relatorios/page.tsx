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
import { useQuery } from '@tanstack/react-query'
import { relatoriosService } from '@/services/relatorios-service'

/**
 * Página de relatórios e Business Intelligence
 * Exibe relatórios específicos por departamento
 * Permite exportação de dados
 */
export default function RelatoriosPage() {
	const router = useRouter()
	const { user, isAuthenticated } = useAuthStore()

	const { data: relatorios, isLoading } = useQuery({
		queryKey: ['relatorios', user?.role],
		queryFn: () => user ? relatoriosService.getRelatorios(user.role) : Promise.resolve([]),
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

	if (isLoading) {
		return <div className="p-6">Carregando relatórios...</div>
	}

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
				{relatorios?.length === 0 && <p className="text-gray-500">Nenhum relatório encontrado.</p>}
				{relatorios?.map((relatorio) => (
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

