# Painel Administrativo — RTA Ambiental

## Acesso
URL: `/admin/login`
Autenticação via e-mail + senha. Token JWT com expiração configurável.

## Seções

### Dashboard (`/admin`)
Visão geral com contadores: mensagens não lidas, candidatos pendentes, total de serviços, usuários ativos.

### Conteúdo (`/admin/conteudo`)
Edição dos textos das páginas institucionais (Início, Sobre). Editor rich text a ser integrado (TipTap ou similar).

### Serviços (`/admin/servicos`)
CRUD completo. Campos: nome, slug (auto), descrição curta, conteúdo (rich text), ativo/inativo.

### Mensagens (`/admin/mensagens`)
Listagem das mensagens recebidas pelo formulário de contato. Ações: marcar como lida, excluir.

### Candidatos (`/admin/candidatos`)
Listagem do Banco de Talentos. Ações: ver PDF, alterar status.

### Usuários (`/admin/usuarios`)
Disponível apenas para o perfil **admin**. CRUD de usuários administrativos com atribuição de perfil.

## Perfis e permissões

| Seção      | admin | marketing | comercial | atendimento |
|------------|-------|-----------|-----------|-------------|
| Dashboard  | ✅    | ✅         | ✅         | ✅           |
| Conteúdo   | ✅    | ✅         | ❌         | ❌           |
| Serviços   | ✅    | ✅         | ❌         | ❌           |
| Mensagens  | ✅    | ❌         | ✅         | ✅           |
| Candidatos | ✅    | ❌         | ❌         | ✅           |
| Usuários   | ✅    | ❌         | ❌         | ❌           |
