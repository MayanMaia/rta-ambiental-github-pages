# Banco de Talentos — RTA Ambiental

## Fluxo do candidato

1. Acessa `/trabalhe-conosco`.
2. Preenche: nome, e-mail, telefone (opc.), área, currículo (PDF ≤ 5MB), mensagem (opc.).
3. Dados são sanitizados no frontend.
4. `POST /api/candidatos` (multipart/form-data).
5. Backend valida, armazena currículo e salva registro no banco.
6. E-mail automático de confirmação é enviado ao candidato.
7. Mensagem de sucesso exibida no site.

## Fluxo do RH (painel admin)

1. Acessa `/admin/candidatos`.
2. Visualiza lista paginada com filtro por área e status.
3. Clica em "Ver PDF" para abrir currículo.
4. Altera status: pendente → em análise → aprovado / recusado.

## Status possíveis

| Status      | Descrição                              |
|-------------|----------------------------------------|
| pendente    | Recebido, ainda não analisado          |
| em análise  | Sendo avaliado pelo RH                 |
| aprovado    | Candidato aprovado para entrevista     |
| recusado    | Candidatura não atende ao perfil atual |

## Segurança

- Validação de tipo MIME no frontend e backend.
- Limite de 5MB por arquivo.
- Currículo armazenado com nome gerado (UUID), não o nome original.
- Acesso ao currículo apenas por usuários autenticados.
