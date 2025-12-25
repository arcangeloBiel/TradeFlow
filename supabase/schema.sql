-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enums
CREATE TYPE user_role AS ENUM ('trade', 'compras', 'fornecedor', 'admin');
CREATE TYPE campanha_status AS ENUM ('planejada', 'ativa', 'finalizada', 'cancelada');
CREATE TYPE categoria_produto AS ENUM ('moda', 'camaMesaBanho', 'eletrodomesticos', 'ferramentas', 'brinquedos', 'tapetes', 'utensiliosDomesticos');
CREATE TYPE kpi_tendencia AS ENUM ('up', 'down', 'stable');
CREATE TYPE fornecedor_status AS ENUM ('ativo', 'inativo', 'pendente');

-- Table: profiles (Users)
CREATE TABLE IF NOT EXISTS profiles (
  id TEXT PRIMARY KEY, 
  nome TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role user_role NOT NULL,
  avatar TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table: kpis
CREATE TABLE IF NOT EXISTS kpis (
  id TEXT PRIMARY KEY,
  titulo TEXT NOT NULL,
  valor NUMERIC NOT NULL,
  unidade TEXT NOT NULL,
  variacao NUMERIC,
  tendencia kpi_tendencia,
  tipo TEXT NOT NULL -- 'trade' or 'compras'
);

-- Table: campanhas
CREATE TABLE IF NOT EXISTS campanhas (
  id TEXT PRIMARY KEY,
  titulo TEXT NOT NULL,
  categoria categoria_produto NOT NULL,
  status campanha_status NOT NULL,
  data_inicio TIMESTAMP WITH TIME ZONE NOT NULL,
  data_fim TIMESTAMP WITH TIME ZONE NOT NULL,
  roi NUMERIC,
  orcamento NUMERIC,
  objetivos TEXT[],
  produtos TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table: fornecedores
CREATE TABLE IF NOT EXISTS fornecedores (
  id TEXT PRIMARY KEY,
  nome TEXT NOT NULL,
  categoria categoria_produto NOT NULL,
  contato TEXT NOT NULL,
  email TEXT NOT NULL,
  telefone TEXT NOT NULL,
  status fornecedor_status NOT NULL,
  avaliacao NUMERIC NOT NULL,
  pedidos_total INTEGER NOT NULL,
  tempo_medio_entrega NUMERIC NOT NULL,
  contrato_vencimento TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Analytics Helper Tables
CREATE TABLE IF NOT EXISTS analytics_vendas_categoria (
  id SERIAL PRIMARY KEY,
  categoria TEXT NOT NULL,
  vendas NUMERIC NOT NULL
);

CREATE TABLE IF NOT EXISTS analytics_performance_campanhas (
  id SERIAL PRIMARY KEY,
  campanha TEXT NOT NULL,
  roi NUMERIC NOT NULL,
  vendas NUMERIC NOT NULL
);

-- RLS Policies (Basic examples)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE kpis ENABLE ROW LEVEL SECURITY;
ALTER TABLE campanhas ENABLE ROW LEVEL SECURITY;
ALTER TABLE fornecedores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access" ON profiles FOR SELECT USING (true);
CREATE POLICY "Public read access" ON kpis FOR SELECT USING (true);
CREATE POLICY "Public read access" ON campanhas FOR SELECT USING (true);
CREATE POLICY "Public read access" ON fornecedores FOR SELECT USING (true);

CREATE TABLE IF NOT EXISTS analytics_vendas_mensal (
  id SERIAL PRIMARY KEY,
  mes TEXT NOT NULL,
  vendas NUMERIC NOT NULL,
  ordem INTEGER NOT NULL -- Para ordenacao correta (1=Jan, etc)
);

CREATE POLICY "Public read access" ON analytics_vendas_mensal FOR SELECT USING (true);
CREATE POLICY "Public read access" ON analytics_vendas_categoria FOR SELECT USING (true);
CREATE POLICY "Public read access" ON analytics_performance_campanhas FOR SELECT USING (true);
