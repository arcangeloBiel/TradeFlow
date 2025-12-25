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

        console.log('🔄 Adicionando role "admin" ao enum user_role...')

        // Em Postgres, não podemos usar IF NOT EXISTS em ALTER TYPE ADD VALUE sem cuidado
        // Mas podemos consultar o sistema para ver se já existe
        const res = await client.query(`
            SELECT 1 FROM pg_type t 
            JOIN pg_enum e ON t.oid = e.enumtypid 
            WHERE t.typname = 'user_role' AND e.enumlabel = 'admin'
        `)

        if (res.rows.length === 0) {
            await client.query("ALTER TYPE user_role ADD VALUE 'admin'")
            console.log('✅ Role "admin" adicionada com sucesso!')
        } else {
            console.log('💡 A role "admin" já existe no banco de dados.')
        }

    } catch (err) {
        console.error('❌ Erro ao adicionar role:', err)
    } finally {
        await client.end()
    }
}

run()
