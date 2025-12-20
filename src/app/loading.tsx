/**
 * Componente de loading global
 * Exibido durante carregamento de páginas
 * Melhora percepção de performance para o usuário
 */
export default function Loading() {
	return (
		<div className="flex min-h-screen items-center justify-center">
			<div className="flex flex-col items-center gap-4">
				<div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-200 border-t-primary-500"></div>
				<p className="text-sm text-gray-600">Carregando...</p>
			</div>
		</div>
	)
}

