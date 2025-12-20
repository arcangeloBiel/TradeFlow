import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Função utilitária para combinar classes do Tailwind CSS
 * Utiliza clsx para condicionais e tailwind-merge para resolver conflitos
 * Esta é a melhor prática para gerenciar classes condicionais no Tailwind
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

