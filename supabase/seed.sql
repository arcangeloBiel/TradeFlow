-- Seed Kpis (Trade)
INSERT INTO kpis (id, titulo, valor, unidade, variacao, tendencia, tipo) VALUES
('1', 'Share de Gôndola', 65.2, '%', 2.3, 'up', 'trade'),
('2', 'Sell-Out Mensal', 125000, 'unidades', 5.8, 'up', 'trade'),
('3', 'Market Share', 23.8, '%', -1.2, 'down', 'trade'),
('4', 'Taxa de Ruptura', 2.1, '%', -0.5, 'down', 'trade'),
('5', 'Frequência de Visitas', 85, '%', 3.2, 'up', 'trade'),
('6', 'Campanhas Ativas', 12, 'campanhas', 2, 'up', 'trade');

-- Seed Kpis (Compras)
INSERT INTO kpis (id, titulo, valor, unidade, variacao, tendencia, tipo) VALUES
('7', 'Fornecedores Ativos', 523, 'fornecedores', 8, 'up', 'compras'),
('8', 'Pedidos Pendentes', 89, 'pedidos', -12, 'down', 'compras'),
('9', 'Tempo Médio de Entrega', 7.2, 'dias', -0.8, 'down', 'compras'),
('10', 'Taxa de Atraso', 8.5, '%', -1.5, 'down', 'compras'),
('11', 'Economia Gerada', 2.3, 'milhões R$', 0.4, 'up', 'compras'),
('12', 'Contratos Vencendo', 15, 'contratos', 3, 'up', 'compras');

-- Seed Campanhas
INSERT INTO campanhas (id, titulo, categoria, status, data_inicio, data_fim, roi, orcamento, objetivos, produtos) VALUES
('1', 'Black Friday Moda 2024', 'moda', 'ativa', '2024-11-20', '2024-11-30', 245.8, 500000, ARRAY['Aumentar vendas em 30%', 'Liquidar estoque sazonal'], ARRAY['Camisas', 'Calças', 'Acessórios']),
('2', 'Dia das Crianças - Brinquedos', 'brinquedos', 'planejada', '2024-10-01', '2024-10-12', NULL, 300000, ARRAY['Aumentar market share', 'Lançar novos produtos'], ARRAY['Brinquedos educativos', 'Eletrônicos']),
('3', 'Natal - Eletrodomésticos', 'eletrodomesticos', 'finalizada', '2024-12-01', '2024-12-25', 189.5, 800000, ARRAY['Aumentar vendas linha branca'], ARRAY['Geladeiras', 'Fogões', 'Microondas']);

-- Seed Fornecedores
INSERT INTO fornecedores (id, nome, categoria, contato, email, telefone, status, avaliacao, pedidos_total, tempo_medio_entrega, contrato_vencimento) VALUES
('1', 'Moda Fashion Ltda', 'moda', 'João Silva', 'contato@modafashion.com.br', '(47) 99999-9999', 'ativo', 4.8, 245, 5, '2024-12-31'),
('2', 'EletroTech S.A.', 'eletrodomesticos', 'Maria Santos', 'vendas@eletrotech.com.br', '(47) 88888-8888', 'ativo', 4.5, 189, 7, '2025-03-15'),
('3', 'Brinquedos Educativos Brasil', 'brinquedos', 'Pedro Costa', 'comercial@brinquedoseducativos.com.br', '(47) 77777-7777', 'ativo', 4.9, 312, 6, '2024-11-30');

-- Seed Profiles
INSERT INTO profiles (id, nome, email, role) VALUES
('1', 'Ana Silva', 'ana.silva@havan.com.br', 'trade'),
('2', 'Carlos Mendes', 'carlos.mendes@havan.com.br', 'compras');

-- Seed Analytics
INSERT INTO analytics_vendas_categoria (categoria, vendas) VALUES
('Moda', 1250000),
('Eletrodomésticos', 980000),
('Brinquedos', 750000),
('Cama, Mesa e Banho', 620000),
('Ferramentas', 480000),
('Utensílios Domésticos', 390000),
('Tapetes', 210000);

INSERT INTO analytics_performance_campanhas (campanha, roi, vendas) VALUES
('Black Friday Moda', 245.8, 1250000),
('Natal Eletrodomésticos', 189.5, 980000),
('Dia das Crianças', 165.2, 750000);

INSERT INTO analytics_vendas_mensal (mes, vendas, ordem) VALUES
('Jan', 1200000, 1),
('Fev', 1350000, 2),
('Mar', 1280000, 3),
('Abr', 1450000, 4),
('Mai', 1520000, 5),
('Jun', 1480000, 6);
