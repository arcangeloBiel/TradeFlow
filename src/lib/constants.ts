/**
 * Constantes do sistema TradeMax Jakatech
 * Centraliza valores fixos e configurações
 */

import type { CategoriaProduto } from '@/types'

// Mapeamento de categorias para nomes legíveis
export const CATEGORIAS_NOMES: Record<CategoriaProduto, string> = {
	moda: 'Moda',
	camaMesaBanho: 'Cama, Mesa e Banho',
	eletrodomesticos: 'Eletrodomésticos',
	ferramentas: 'Ferramentas',
	brinquedos: 'Brinquedos',
	tapetes: 'Tapetes',
	utensiliosDomesticos: 'Utensílios Domésticos',
}

// Rotas protegidas por perfil
export const ROTAS_POR_PERFIL: Record<
	'trade' | 'compras' | 'fornecedor',
	string[]
> = {
	trade: ['/dashboard', '/campanhas', '/comunicacao', '/relatorios'],
	compras: [
		'/dashboard',
		'/fornecedores',
		'/compras',
		'/comunicacao',
		'/relatorios',
	],
	fornecedor: ['/fornecedor'],
}

// Configurações de cores para gráficos
export const CORES_GRAFICOS = {
	primary: '#003366',
	secondary: '#66A5C3',
	success: '#10B981',
	warning: '#F59E0B',
	danger: '#EF4444',
}

