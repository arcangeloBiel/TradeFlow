const { Client } = require('pg')
require('dotenv').config({ path: '.env.local' })

if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL não encontrada. Verifique o .env.local')
    process.exit(1)
}

const client = new Client({
    connectionString: process.env.DATABASE_URL,
})

const email = process.argv[2] || 'admin@havan.com.br'
const password = process.argv[3] || 'havan123'
const name = process.argv[4] || 'Administrador'
const role = process.argv[5] || 'trade'

async function run() {
    try {
        await client.connect()
        console.log('✅ Conectado ao banco de dados')

        console.log(`🔄 Processando usuário: ${email}...`)

        // 1. Limpar usuário antigo
        console.log('🔄 Limpando dados antigos...')
        const oldUser = await client.query('SELECT id FROM auth.users WHERE email = $1', [email])
        if (oldUser.rows.length > 0) {
            const oldId = oldUser.rows[0].id
            await client.query('DELETE FROM auth.identities WHERE user_id = $1::uuid', [oldId])
            await client.query('DELETE FROM auth.users WHERE id = $1::uuid', [oldId])
            await client.query('DELETE FROM public.profiles WHERE id = $1::text', [oldId])
        } else {
            await client.query('DELETE FROM public.profiles WHERE email = $1', [email])
        }

        // 2. Criar novo usuário
        const metaData = JSON.stringify({ full_name: name, role: role, password: password })
        const res = await client.query(`
            INSERT INTO auth.users (
                id, instance_id, email, encrypted_password, email_confirmed_at, 
                raw_user_meta_data, raw_app_meta_data, aud, role, created_at, updated_at,
                confirmation_token, recovery_token, email_change_token_new, email_change
            ) VALUES (
                gen_random_uuid(), '00000000-0000-0000-0000-000000000000', $1, 
                crypt($2, gen_salt('bf', 10)), now(), $3, 
                '{"provider":"email","providers":["email"]}', 'authenticated', 'authenticated',
                now(), now(), '', '', '', ''
            ) RETURNING id
        `, [email, password, metaData])

        const userId = res.rows[0].id
        console.log(`✅ Usuário criado na auth.users. ID: ${userId}`)

        // 3. Criar identidade (OBRIGATÓRIO para login no Supabase)
        // Removido o campo 'email' que é gerado automaticamente em versões recentes
        await client.query(`
            INSERT INTO auth.identities (
                id,
                user_id,
                identity_data,
                provider,
                provider_id,
                last_sign_in_at,
                created_at,
                updated_at
            ) VALUES (
                gen_random_uuid(),
                $1::uuid,
                $2,
                'email',
                $1::text,
                now(),
                now(),
                now()
            )
        `, [userId, JSON.stringify({ sub: userId, email: email })])
        console.log('✅ Identidade criada na auth.identities.')

        // 4. Perfil (Verificação)
        const profile = await client.query('SELECT * FROM public.profiles WHERE id = $1::text', [userId])
        if (profile.rows.length > 0) {
            console.log('✅ Perfil criado automaticamente via trigger.')
            await client.query('UPDATE public.profiles SET senha = $1 WHERE id = $2::text', [password, userId])
        } else {
            console.log('⚠️  Criando perfil manualmente...')
            await client.query(`
                INSERT INTO public.profiles (id, nome, email, role, senha)
                VALUES ($1::text, $2, $3, $4, $5)
            `, [userId, name, email, role, password])
        }

        console.log(`🎉 Sucesso: ${email}`)

    } catch (err) {
        console.error('❌ Erro:', err)
    } finally {
        await client.end()
    }
}

run()
