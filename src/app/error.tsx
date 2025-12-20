'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

/**
 * Componente de erro global
 * Captura erros não tratados na aplicação
 * Fornece feedback amigável ao usuário
 */
export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	useEffect(() => {
		// Log do erro para monitoramento (em produção, enviaria para serviço de logging)
		console.error('Erro capturado:', error)
	}, [error])
	
	return (
		<div className="flex min-h-screen items-center justify-center p-4">
			<div className="text-center">
				<h2 className="mb-4 text-2xl font-bold text-gray-900">
					Algo deu errado!
				</h2>
				<p className="mb-6 text-gray-600">
					Ocorreu um erro inesperado. Por favor, tente novamente.
				</p>
				<Button onClick={reset}>Tentar novamente</Button>
			</div>
		</div>
	)
}

