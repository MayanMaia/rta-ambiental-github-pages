# Arquitetura — RTA Ambiental

## Visão geral

```
Browser ──► React SPA (Vite + Tailwind)
                │
                ▼
         REST API (Node/Express ou similar)
                │
         ┌──────┴──────┐
         ▼             ▼
    PostgreSQL     Armazenamento
    (dados)        de arquivos (S3 / local)
```

## Frontend

- **React 18** + **Vite** — build rápido, HMR.
- **React Router v6** — roteamento client-side com lazy loading.
- **Tailwind CSS** — utility-first, design system próprio.
- **react-hook-form** — validação performática de formulários.
- **Axios** — cliente HTTP com interceptors para auth.

## Pastas principais

```
src/
├── components/
│   ├── common/     — componentes genéricos (LoadingSpinner, WhatsAppFAB)
│   ├── layout/     — Header, Footer, AdminSidebar, AdminHeader
│   ├── sections/   — blocos de página reutilizáveis
│   └── forms/      — campos customizados
├── hooks/          — useAuth, usePagination, etc.
├── layouts/        — PublicLayout, AdminLayout
├── pages/          — uma pasta por domínio (admin/)
├── services/       — chamadas à API (api.js + *service.js)
├── styles/         — global.css (Tailwind + camadas)
└── utils/          — validators, sanitize, seo
```

## Autenticação

- JWT retornado pelo backend no login.
- Token salvo em `localStorage` via `authService`.
- Injetado em todas as requisições pelo interceptor do Axios.
- Expiração gerenciada pelo backend; 401 → redirect para `/admin/login`.

## Controle de acesso (RBAC)

| Perfil      | Acesso                                                   |
|-------------|----------------------------------------------------------|
| admin       | Tudo                                                     |
| marketing   | Dashboard, Conteúdo, Serviços                            |
| comercial   | Dashboard, Mensagens                                     |
| atendimento | Dashboard, Mensagens, Candidatos                         |

## SEO técnico

- `<title>` e `<meta description>` atualizados via `utils/seo.js` em cada página.
- `public/robots.txt` — bloqueia `/admin/` e `/api/`.
- `public/sitemap.xml` — todas as rotas públicas.
- Open Graph e Twitter Card no `index.html`.
