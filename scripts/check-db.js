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
        console.log('--- Lendo dados do Supabase ---')

        // 1. Check Vendas por Categoria
        const res1 = await client.query('SELECT * FROM analytics_vendas_categoria ORDER BY vendas DESC')
        console.log('\n📊 Vendas por Categoria:')
        console.table(res1.rows)

        // 2. Check Performance Mensal
        const res2 = await client.query('SELECT * FROM analytics_vendas_mensal ORDER BY ordem')
        console.log('\n📈 Performance Mensal:')
        console.table(res2.rows)

    } catch (err) {
        console.error('❌ Erro:', err)
    } finally {
        await client.end()
    }
}

run()
