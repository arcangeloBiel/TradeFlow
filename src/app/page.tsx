'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

/**
 * Página de login inicial
 * Redireciona automaticamente se usuário já estiver autenticado
 * Interface simples e intuitiva para acesso ao sistema
 */
export default function HomePage() {
	const router = useRouter()
	const { isAuthenticated, login, setUser } = useAuthStore()
	
	useEffect(() => {
		// Redireciona para dashboard se já estiver autenticado
		if (isAuthenticated) {
			router.push('/dashboard')
		}
	}, [isAuthenticated, router])
	
	const handleLogin = async (role: 'trade' | 'compras') => {
		// Login simulado - em produção faria autenticação real
		const success = await login(`user@havan.com.br`, 'password', role)
		if (success) {
			router.push('/dashboard')
		} else {
			// Define usuário mock diretamente para demonstração
			setUser({
				id: role === 'trade' ? '1' : '2',
				nome: role === 'trade' ? 'Ana Silva' : 'Carlos Mendes',
				email: `${role}@havan.com.br`,
				role,
			})
			router.push('/dashboard')
		}
	}
	
	return (
		<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 p-4">
			<Card className="w-full max-w-md">
				<CardHeader className="text-center">
					<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-500 text-white text-2xl font-bold">
						H
					</div>
					<CardTitle className="text-2xl">TradeMax Havan</CardTitle>
					<p className="mt-2 text-sm text-gray-600">
						Sistema de Gestão de Trade Marketing
					</p>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<Button
							className="w-full"
							onClick={() => handleLogin('trade')}
						>
							Entrar como Trade Marketing
						</Button>
						<Button
							variant="secondary"
							className="w-full"
							onClick={() => handleLogin('compras')}
						>
							Entrar como Compras
						</Button>
					</div>
					<p className="text-center text-xs text-gray-500">
						Selecione seu perfil para acessar o sistema
					</p>
				</CardContent>
			</Card>
		</div>
	)
}

