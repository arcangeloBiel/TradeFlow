import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Shell } from '@/components/layout/shell'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
	title: 'TradeMax Havan - Trade Marketing',
	description: 'Sistema de gestão de trade marketing para Havan',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="pt-BR">
			<body className={`${inter.variable} font-sans antialiased text-gray-900`}>
				<Providers>
					<Shell>{children}</Shell>
				</Providers>
			</body>
		</html>
	)
}
