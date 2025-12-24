const { Client } = require('pg')
require('dotenv').config({ path: '.env.local' })

if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL não encontrada. Verifique o .env.local')
    process.exit(1)
}

const client = new Client({
    connectionString: process.env.DATABASE_URL,
})

async function run() {
    try {
        await client.connect()
        console.log('✅ Conectado ao banco de dados')

        // 1. Criar Tabela
        console.log('🔄 Criando tabela relatorios...')
        await client.query(`
      CREATE TABLE IF NOT EXISTS relatorios (
        id SERIAL PRIMARY KEY,
        titulo TEXT NOT NULL,
        descricao TEXT NOT NULL,
        tipo TEXT NOT NULL, -- 'trade', 'compras'
        created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
      );
    `)

        // 2. Limpar dados antigos
        await client.query('DELETE FROM relatorios')

        // 3. Inserir Dados (Seed)
        console.log('🔄 Inserindo relatórios de exemplo...')
        await client.query(`
      INSERT INTO relatorios (titulo, descricao, tipo) VALUES
      -- Relatórios Trade
      ('Performance por Categoria', 'Análise detalhada de vendas e ROI por categoria de produtos', 'trade'),
      ('ROI de Campanhas', 'Retorno sobre investimento de todas as campanhas promocionais', 'trade'),
      ('Análise de Concorrência', 'Comparativo de market share e posicionamento competitivo', 'trade'),
      
      -- Relatórios Compras
      ('Performance de Fornecedores', 'Avaliação completa de desempenho e entregas', 'compras'),
      ('Análise de Custos', 'Evolução de custos e economia gerada', 'compras'),
      ('Contratos e Renovações', 'Status de contratos e prazos de renovação', 'compras');
    `)

        // 4. Permissões
        console.log('🔄 Configurando permissões...')
        await client.query(`
      GRANT SELECT ON relatorios TO anon, authenticated, service_role;
      ALTER TABLE relatorios ENABLE ROW LEVEL SECURITY;
      DROP POLICY IF EXISTS "Public access" ON relatorios;
      CREATE POLICY "Public access" ON relatorios FOR ALL USING (true);
    `)

        console.log('✅ Tabela de relatórios criada e populada com sucesso!')

    } catch (err) {
        console.error('❌ Erro:', err)
    } finally {
        await client.end()
    }
}

run()
