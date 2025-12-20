/**
 * Dados mock do sistema TradeMax Havan
 * Simula dados reais para desenvolvimento e demonstração
 */

import type {
	CategoriaProduto,
	KPI,
	Campanha,
	Fornecedor,
	User,
} from '@/types'

// Fornecedores por categoria conforme especificação
export const fornecedoresPorCategoria: Record<CategoriaProduto, number> = {
	moda: 89,
	camaMesaBanho: 62,
	eletrodomesticos: 45,
	ferramentas: 78,
	brinquedos: 95,
	tapetes: 34,
	utensiliosDomesticos: 120,
}

// KPIs Trade Marketing conforme especificação
export const kpisTradeMock: KPI[] = [
	{
		id: '1',
		titulo: 'Share de Gôndola',
		valor: 65.2,
		unidade: '%',
		variacao: 2.3,
		tendencia: 'up',
	},
	{
		id: '2',
		titulo: 'Sell-Out Mensal',
		valor: 125000,
		unidade: 'unidades',
		variacao: 5.8,
		tendencia: 'up',
	},
	{
		id: '3',
		titulo: 'Market Share',
		valor: 23.8,
		unidade: '%',
		variacao: -1.2,
		tendencia: 'down',
	},
	{
		id: '4',
		titulo: 'Taxa de Ruptura',
		valor: 2.1,
		unidade: '%',
		variacao: -0.5,
		tendencia: 'down',
	},
	{
		id: '5',
		titulo: 'Frequência de Visitas',
		valor: 85,
		unidade: '%',
		variacao: 3.2,
		tendencia: 'up',
	},
	{
		id: '6',
		titulo: 'Campanhas Ativas',
		valor: 12,
		unidade: 'campanhas',
		variacao: 2,
		tendencia: 'up',
	},
]

// KPIs Compras conforme especificação
export const kpisComprasMock: KPI[] = [
	{
		id: '1',
		titulo: 'Fornecedores Ativos',
		valor: 523,
		unidade: 'fornecedores',
		variacao: 8,
		tendencia: 'up',
	},
	{
		id: '2',
		titulo: 'Pedidos Pendentes',
		valor: 89,
		unidade: 'pedidos',
		variacao: -12,
		tendencia: 'down',
	},
	{
		id: '3',
		titulo: 'Tempo Médio de Entrega',
		valor: 7.2,
		unidade: 'dias',
		variacao: -0.8,
		tendencia: 'down',
	},
	{
		id: '4',
		titulo: 'Taxa de Atraso',
		valor: 8.5,
		unidade: '%',
		variacao: -1.5,
		tendencia: 'down',
	},
	{
		id: '5',
		titulo: 'Economia Gerada',
		valor: 2.3,
		unidade: 'milhões R$',
		variacao: 0.4,
		tendencia: 'up',
	},
	{
		id: '6',
		titulo: 'Contratos Vencendo',
		valor: 15,
		unidade: 'contratos',
		variacao: 3,
		tendencia: 'up',
	},
]

// Campanhas mock
export const campanhasMock: Campanha[] = [
	{
		id: '1',
		titulo: 'Black Friday Moda 2024',
		categoria: 'moda',
		status: 'ativa',
		dataInicio: new Date('2024-11-20'),
		dataFim: new Date('2024-11-30'),
		roi: 245.8,
		orcamento: 500000,
		objetivos: ['Aumentar vendas em 30%', 'Liquidar estoque sazonal'],
		produtos: ['Camisas', 'Calças', 'Acessórios'],
	},
	{
		id: '2',
		titulo: 'Dia das Crianças - Brinquedos',
		categoria: 'brinquedos',
		status: 'planejada',
		dataInicio: new Date('2024-10-01'),
		dataFim: new Date('2024-10-12'),
		orcamento: 300000,
		objetivos: ['Aumentar market share', 'Lançar novos produtos'],
		produtos: ['Brinquedos educativos', 'Eletrônicos'],
	},
	{
		id: '3',
		titulo: 'Natal - Eletrodomésticos',
		categoria: 'eletrodomesticos',
		status: 'finalizada',
		dataInicio: new Date('2024-12-01'),
		dataFim: new Date('2024-12-25'),
		roi: 189.5,
		orcamento: 800000,
		objetivos: ['Aumentar vendas linha branca'],
		produtos: ['Geladeiras', 'Fogões', 'Microondas'],
	},
]

// Fornecedores mock
export const fornecedoresMock: Fornecedor[] = [
	{
		id: '1',
		nome: 'Moda Fashion Ltda',
		categoria: 'moda',
		contato: 'João Silva',
		email: 'contato@modafashion.com.br',
		telefone: '(47) 99999-9999',
		status: 'ativo',
		avaliacao: 4.8,
		pedidosTotal: 245,
		tempoMedioEntrega: 5,
		contratoVencimento: new Date('2024-12-31'),
	},
	{
		id: '2',
		nome: 'EletroTech S.A.',
		categoria: 'eletrodomesticos',
		contato: 'Maria Santos',
		email: 'vendas@eletrotech.com.br',
		telefone: '(47) 88888-8888',
		status: 'ativo',
		avaliacao: 4.5,
		pedidosTotal: 189,
		tempoMedioEntrega: 7,
		contratoVencimento: new Date('2025-03-15'),
	},
	{
		id: '3',
		nome: 'Brinquedos Educativos Brasil',
		categoria: 'brinquedos',
		contato: 'Pedro Costa',
		email: 'comercial@brinquedoseducativos.com.br',
		telefone: '(47) 77777-7777',
		status: 'ativo',
		avaliacao: 4.9,
		pedidosTotal: 312,
		tempoMedioEntrega: 6,
		contratoVencimento: new Date('2024-11-30'),
	},
]

// Usuários mock para autenticação
export const usuariosMock: User[] = [
	{
		id: '1',
		nome: 'Ana Silva',
		email: 'ana.silva@havan.com.br',
		role: 'trade',
	},
	{
		id: '2',
		nome: 'Carlos Mendes',
		email: 'carlos.mendes@havan.com.br',
		role: 'compras',
	},
]

// Dados para gráficos - Vendas por categoria
export const vendasPorCategoriaMock = [
	{ categoria: 'Moda', vendas: 1250000 },
	{ categoria: 'Eletrodomésticos', vendas: 980000 },
	{ categoria: 'Brinquedos', vendas: 750000 },
	{ categoria: 'Cama, Mesa e Banho', vendas: 620000 },
	{ categoria: 'Ferramentas', vendas: 480000 },
	{ categoria: 'Utensílios Domésticos', vendas: 390000 },
	{ categoria: 'Tapetes', vendas: 210000 },
]

// Performance de campanhas
export const performanceCampanhasMock = [
	{ campanha: 'Black Friday Moda', roi: 245.8, vendas: 1250000 },
	{ campanha: 'Natal Eletrodomésticos', roi: 189.5, vendas: 980000 },
	{ campanha: 'Dia das Crianças', roi: 165.2, vendas: 750000 },
]

