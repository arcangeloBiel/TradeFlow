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

        // 0. FIX PERMISSIONS (Crucial para o Supabase API funcionar)
        console.log('🔄 Corrigindo permissões...')
        await client.query(`
      -- Garante que o usuário anônimo (frontend) possa ler as tabelas
      GRANT SELECT ON analytics_vendas_categoria TO anon, authenticated, service_role;
      GRANT SELECT ON analytics_vendas_mensal TO anon, authenticated, service_role;
      
      -- Ativa RLS
      ALTER TABLE analytics_vendas_categoria ENABLE ROW LEVEL SECURITY;
      ALTER TABLE analytics_vendas_mensal ENABLE ROW LEVEL SECURITY;
      
      -- Recria politicas para garantir acesso público de leitura
      DROP POLICY IF EXISTS "Public read access" ON analytics_vendas_categoria;
      DROP POLICY IF EXISTS "Public read access" ON analytics_vendas_mensal;
      
      CREATE POLICY "Public read access" ON analytics_vendas_categoria FOR SELECT USING (true);
      CREATE POLICY "Public read access" ON analytics_vendas_mensal FOR SELECT USING (true);
    `)

        // 1. Limpar e Popular Vendas por Categoria
        console.log('🔄 Atualizando Vendas por Categoria...')
        await client.query('DELETE FROM analytics_vendas_categoria')
        await client.query(`
      INSERT INTO analytics_vendas_categoria (categoria, vendas) VALUES
      ('Moda', 1250000),
      ('Eletrodomésticos', 980000),
      ('Brinquedos', 750000),
      ('Cama, Mesa e Banho', 620000),
      ('Ferramentas', 480000),
      ('Utensílios Domésticos', 390000),
      ('Tapetes', 210000),
      ('Automotivo', 320000);
    `)

        // 2. Limpar e Popular Performance Mensal
        console.log('🔄 Atualizando Performance Mensal...')
        await client.query('DELETE FROM analytics_vendas_mensal')
        await client.query(`
      INSERT INTO analytics_vendas_mensal (mes, vendas, ordem) VALUES
      ('Jan', 1200000, 1),
      ('Fev', 1350000, 2),
      ('Mar', 1280000, 3),
      ('Abr', 1450000, 4),
      ('Mai', 1520000, 5),
      ('Jun', 1480000, 6),
      ('Jul', 1600000, 7);
    `)

        // 3. Verificar dados
        const res1 = await client.query('SELECT count(*) FROM analytics_vendas_categoria')
        const res2 = await client.query('SELECT count(*) FROM analytics_vendas_mensal')

        console.log(`✅ Sucesso!`)
        console.log(`   - Categorias: ${res1.rows[0].count} registros`)
        console.log(`   - Meses: ${res2.rows[0].count} registros`)

    } catch (err) {
        console.error('❌ Erro:', err)
    } finally {
        await client.end()
    }
}

run()
