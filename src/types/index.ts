/**
 * Tipos principais do sistema TradeMax Havan
 * Centraliza todas as definições de tipos para garantir type safety
 */

// Perfis de usuário do sistema
export type UserRole = 'trade' | 'compras' | 'fornecedor'

// Status de campanha
export type CampanhaStatus = 'planejada' | 'ativa' | 'finalizada' | 'cancelada'

// Status de pedido
export type PedidoStatus = 'pendente' | 'aprovado' | 'em_transito' | 'entregue' | 'cancelado'

// Categorias de produtos
export type CategoriaProduto =
	| 'moda'
	| 'camaMesaBanho'
	| 'eletrodomesticos'
	| 'ferramentas'
	| 'brinquedos'
	| 'tapetes'
	| 'utensiliosDomesticos'

// Interface de usuário
export interface User {
	id: string
	nome: string
	email: string
	role: UserRole
	avatar?: string
}

// Interface de KPI
export interface KPI {
	id: string
	titulo: string
	valor: number
	unidade: string
	variacao?: number
	tendencia?: 'up' | 'down' | 'stable'
}

// Interface de campanha promocional
export interface Campanha {
	id: string
	titulo: string
	categoria: CategoriaProduto
	status: CampanhaStatus
	dataInicio: Date
	dataFim: Date
	roi?: number
	orcamento?: number
	objetivos: string[]
	produtos: string[]
}

// Interface de fornecedor
export interface Fornecedor {
	id: string
	nome: string
	categoria: CategoriaProduto
	contato: string
	email: string
	telefone: string
	status: 'ativo' | 'inativo' | 'pendente'
	avaliacao: number
	pedidosTotal: number
	tempoMedioEntrega: number
	contratoVencimento?: Date
}

// Interface de mensagem
export interface Mensagem {
	id: string
	remetente: User
	destinatario: User
	assunto: string
	conteudo: string
	data: Date
	lida: boolean
	anexos?: string[]
}

// Interface de solicitação
export interface Solicitacao {
	id: string
	tipo: 'produto' | 'cotacao' | 'aprovacao'
	remetente: User
	destinatario: User
	categoria: CategoriaProduto
	produto?: string
	quantidade?: number
	prazo?: Date
	status: 'pendente' | 'em_analise' | 'aprovada' | 'rejeitada'
	dataCriacao: Date
}

