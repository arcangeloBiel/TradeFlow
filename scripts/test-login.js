const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

async function testLogin() {
    console.log('--- Testando Login ---')
    const { data, error } = await supabase.auth.signInWithPassword({
        email: 'ana.silva@havan.com.br',
        password: 'havan123'
    })

    if (error) {
        console.error('❌ Erro no login:', error)
        console.log('Detalhes:', JSON.stringify(error, null, 2))
    } else {
        console.log('✅ Login bem sucedido!')
        console.log('Sessão:', data.session ? 'OK' : 'Sem sessão')
    }
}

testLogin()
