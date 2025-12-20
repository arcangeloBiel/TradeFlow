import { cn } from '@/lib/utils'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

/**
 * Componente Button reutilizável
 * Suporta diferentes variantes e tamanhos
 * Acessível com atributos ARIA apropriados
 */

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
	size?: 'sm' | 'md' | 'lg'
	children: ReactNode
}

export function Button({
	variant = 'primary',
	size = 'md',
	className,
	children,
	...props
}: ButtonProps) {
	const baseStyles =
		'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'
	
	const variants = {
		primary:
			'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700',
		secondary:
			'bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300',
		outline:
			'border border-gray-300 bg-transparent hover:bg-gray-50 active:bg-gray-100',
		ghost: 'hover:bg-gray-100 active:bg-gray-200',
	}
	
	const sizes = {
		sm: 'h-8 px-3 text-sm',
		md: 'h-10 px-4 py-2',
		lg: 'h-12 px-6 text-lg',
	}
	
	return (
		<button
			className={cn(baseStyles, variants[variant], sizes[size], className)}
			{...props}
		>
			{children}
		</button>
	)
}

