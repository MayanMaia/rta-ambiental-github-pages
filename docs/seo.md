# SEO Técnico — RTA Ambiental

## Implementado no frontend

| Item              | Onde                         | Status  |
|-------------------|------------------------------|---------|
| `<title>`         | `utils/seo.js` por página    | ✅      |
| `<meta description>` | `utils/seo.js`            | ✅      |
| `<link canonical>` | `utils/seo.js`              | ✅      |
| Open Graph        | `index.html` + seo.js        | ✅      |
| Twitter Card      | `index.html`                 | ✅      |
| `robots.txt`      | `public/robots.txt`          | ✅      |
| `sitemap.xml`     | `public/sitemap.xml`         | ✅      |
| Semântica HTML    | `<header>`, `<main>`, `<footer>`, `<nav>` | ✅ |

## A implementar (backend/infra)
- HTTPS com certificado válido.
- Compressão Gzip/Brotli.
- Cache de assets estáticos (Cache-Control).
- Lazy loading de imagens (`loading="lazy"`).
- Geração dinâmica do `sitemap.xml` conforme serviços cadastrados.

## Estrutura de URLs

```
/                          → Início
/sobre                     → Sobre a empresa
/servicos                  → Lista de serviços
/servicos/:slug            → Detalhe do serviço
/contato                   → Formulário de contato
/trabalhe-conosco          → Banco de Talentos
/politica-de-privacidade   → Política de Privacidade
```
