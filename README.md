# TradeFlow
Create for marketing in purchases

## Configuração Supabase

Esta aplicação utiliza Supabase como backend. Siga os passos abaixo para configurar o ambiente.

### 1. Criar Projeto
1. Crie um novo projeto no [Supabase](https://supabase.com).
2. Vá em `Project Settings` > `API` e copie a `URL` e `anon public` key.
3. Vá em `Project Settings` > `Database` > `Connection String` > `Nodejs` e copie a connection string (substitua a senha).

### 2. Configurar Variáveis de Ambiente
Copie o arquivo de exemplo e configure suas chaves:
```bash
cp .env.local.example .env.local
```
Edite `.env.local` adicionando também a `DATABASE_URL`.

### 3. Configurar Banco de Dados
Você pode configurar o banco de dados automaticamente rodando o script:
```bash
npm run db:setup
```
Este script irá conectar ao seu banco Supabase e criar todas as tabelas e dados iniciais necessários.

## Scripts
- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Compila para produção.
- `npm run start`: Inicia em produção.
- `npm run db:setup`: Cria tabelas e popula o banco de dados.
