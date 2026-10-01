# Requisitos — RTA Ambiental

## Funcionais

### Públicos
- RF01 Exibir páginas: Início, Sobre, Serviços, Serviço (detalhe), Contato, Trabalhe Conosco, Privacidade.
- RF02 Formulário de contato com validação e proteção contra entradas maliciosas.
- RF03 Banco de Talentos com upload de currículo (PDF, máx. 5MB).
- RF04 Resposta automática por e-mail ao candidato após cadastro.
- RF05 Integração com WhatsApp via botão flutuante (FAB).

### Administrativas
- RF06 Autenticação com JWT.
- RF07 Múltiplos perfis: admin, marketing, comercial, atendimento.
- RF08 Controle de acesso por função (RBAC).
- RF09 CRUD de serviços com slug gerado automaticamente.
- RF10 Gestão de mensagens: listar, marcar como lida, excluir.
- RF11 Gestão de candidatos: listar, alterar status, visualizar currículo.
- RF12 CRUD de usuários administrativos.
- RF13 Edição de conteúdo institucional sem alterar código.

## Não Funcionais
- RNF01 Mobile first / responsivo (xs → 2xl).
- RNF02 Performance: LCP < 2,5s.
- RNF03 SEO: robots.txt, sitemap.xml, metadados, Open Graph.
- RNF04 LGPD: política de privacidade, coleta mínima, exclusão a pedido.
- RNF05 Segurança: HTTPS, validação server-side, sanitização, CORS restrito, rate limit nos endpoints.
- RNF06 Acessibilidade: contraste WCAG AA, foco visível, alt em imagens.

## Fora do escopo (Fase 1)
- Seção de Novidades / Blog.
- Área de cliente.
- App mobile nativo.
