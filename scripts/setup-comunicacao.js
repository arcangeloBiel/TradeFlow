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
        console.log('🔄 Criando tabela comunicacao...')
        await client.query(`
      CREATE TABLE IF NOT EXISTS comunicacao (
        id SERIAL PRIMARY KEY,
        titulo TEXT NOT NULL,
        tipo TEXT NOT NULL, -- 'mensagem', 'solicitacao', 'aprovacao'
        remetente_role TEXT NOT NULL,
        destinatario_role TEXT NOT NULL,
        status TEXT NOT NULL, -- 'nova', 'lida', 'pendente', 'aprovada'
        data_criacao TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
        conteudo TEXT
      );
    `)

        // 2. Limpar dados antigos
        await client.query('DELETE FROM comunicacao')

        // 3. Inserir Dados (Seed)
        console.log('🔄 Inserindo mensagens de exemplo...')
        await client.query(`
      INSERT INTO comunicacao (titulo, tipo, remetente_role, destinatario_role, status, data_criacao) VALUES
      -- Recebidas (Trade recebe de Compras)
      ('Solicitação de Produtos - Campanha Black Friday', 'solicitacao', 'compras', 'trade', 'nova', NOW() - INTERVAL '2 hours'),
      ('Confirmação de Cotação - Eletrodomésticos', 'mensagem', 'compras', 'trade', 'lida', NOW() - INTERVAL '1 day'),
      
      -- Enviadas (Trade envia para Compras)
      ('Pedido de Aprovação - Campanha Dia das Crianças', 'aprovacao', 'trade', 'compras', 'pendente', NOW() - INTERVAL '1 day'),
      ('Solicitação de Estoque - Moda', 'solicitacao', 'trade', 'compras', 'aprovada', NOW() - INTERVAL '3 days');
    `)

        // 4. Permissões
        console.log('🔄 Configurando permissões...')
        await client.query(`
      GRANT SELECT, INSERT, UPDATE, DELETE ON comunicacao TO anon, authenticated, service_role;
      ALTER TABLE comunicacao ENABLE ROW LEVEL SECURITY;
      DROP POLICY IF EXISTS "Public access" ON comunicacao;
      CREATE POLICY "Public access" ON comunicacao FOR ALL USING (true);
    `)

        console.log('✅ Tabela de comunicação criada e populada com sucesso!')

    } catch (err) {
        console.error('❌ Erro:', err)
    } finally {
        await client.end()
    }
}

run()
