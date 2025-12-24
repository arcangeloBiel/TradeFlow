const { Client } = require('pg')
const fs = require('fs')
const path = require('path')
require('dotenv').config({ path: '.env.local' })

if (!process.env.DATABASE_URL) {
    console.error('❌ Erro: DATABASE_URL não encontrada no arquivo .env.local')
    console.log('💡 Adicione a connection string do Supabase no arquivo .env.local:')
    console.log('   DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"')
    process.exit(1)
}

const client = new Client({
    connectionString: process.env.DATABASE_URL,
})

async function run() {
    try {
        await client.connect()
        console.log('✅ Conectado ao banco de dados')

        // Read files
        const schemaPath = path.join(process.cwd(), 'supabase', 'schema.sql')
        const seedPath = path.join(process.cwd(), 'supabase', 'seed.sql')

        const schemaSql = fs.readFileSync(schemaPath, 'utf8')
        const seedSql = fs.readFileSync(seedPath, 'utf8')

        // Run Schema
        console.log('🔄 Executando Schema...')
        await client.query(schemaSql)
        console.log('✅ Schema criado com sucesso')

        // Run Seed
        console.log('🔄 Executando Seed...')
        await client.query(seedSql)
        console.log('✅ Dados populados com sucesso')

    } catch (err) {
        console.error('❌ Erro ao executar script:', err)
    } finally {
        await client.end()
    }
}

run()
