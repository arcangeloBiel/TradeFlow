import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'

import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
	title: 'TradeMax Havan - Trade Marketing',
	description: 'Sistema de gestão de trade marketing para Havan',
}

/**
 * Layout raiz da aplicação
 * Define estrutura base com Header e Sidebar
 * Configura fonte e estilos globais
 */
export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="pt-BR">
			<body className={`${inter.variable} font-sans antialiased`}>
				<Providers>
					<div className="flex min-h-screen flex-col">
						<Header />
						<div className="flex flex-1">
							<Sidebar />
							<main className="flex-1 bg-gray-50">{children}</main>
						</div>
					</div>
				</Providers>
			</body>
		</html>
	)
}

