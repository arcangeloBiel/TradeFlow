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

        // 1. Criar Função de Trigger para Novos Usuários
        console.log('🔄 Configurando Triggers de Autenticação...')
        await client.query(`
      -- Função para criar perfil automaticamente quando usuário se cadastra
      CREATE OR REPLACE FUNCTION public.handle_new_user()
      RETURNS trigger AS $$
      BEGIN
        INSERT INTO public.profiles (id, nome, email, role, avatar)
        VALUES (
          new.id,
          COALESCE(new.raw_user_meta_data->>'full_name', 'Novo Usuário'),
          new.email,
          COALESCE((new.raw_user_meta_data->>'role')::user_role, 'trade'::user_role),
          new.raw_user_meta_data->>'avatar_url'
        );
        RETURN new;
      END;
      $$ LANGUAGE plpgsql SECURITY DEFINER;

      -- Trigger
      DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
      CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
    `)

        // 2. Garantir que a tabela profiles existe e tem as colunas certas
        // (Jà foi criada no schema.sql, mas reforçamos aqui)

        // 3. Permissões
        console.log('🔄 Atualizando permissões...')
        await client.query(`
      -- Permitir que usuarios leiam seus proprios perfis e admins leiam todos (simplificado para leitura publica por enquanto para facilitar dashboards)
      DROP POLICY IF EXISTS "Profiles visíveis para todos" ON profiles;
      CREATE POLICY "Profiles visíveis para todos" ON profiles FOR SELECT USING (true);

      -- Permitir que usuarios atualizem apenas seu proprio perfil
      DROP POLICY IF EXISTS "Usuarios podem atualizar proprio perfil" ON profiles;
      CREATE POLICY "Usuarios podem atualizar proprio perfil" ON profiles FOR UPDATE USING (auth.uid()::text = id);
    `)

        console.log('✅ Configuração de Autenticação concluída!')
        console.log('⚠️  IMPORTANTE: Para criar usuários, acesse o painel do Supabase ou use a página de Registro que criaremos.')

    } catch (err) {
        console.error('❌ Erro:', err)
    } finally {
        await client.end()
    }
}

run()
