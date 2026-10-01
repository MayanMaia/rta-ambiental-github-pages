# PROMPT — Sistema de Painel Admin Visual Avançado (RTA)

## CONTEXTO DO PROJETO
Você está trabalhando em um projeto web chamado **RTA**. Ele já possui um painel administrativo funcional, mas limitado e confuso. Sua tarefa é **reconstruir completamente o sistema de administração de conteúdo**, tornando-o um editor visual robusto, confiável, seguro e altamente intuitivo.

---

## OBJETIVO CENTRAL

Criar um **painel de administração visual do tipo "o que você vê é o que você edita"**, onde o administrador consegue:

1. **Visualizar a página completa** do site em tempo real dentro do painel
2. **Selecionar qualquer elemento** da página clicando nele
3. **Editar inline ou via painel lateral** todas as propriedades visuais e de conteúdo do elemento selecionado
4. **Salvar, publicar, descartar ou restaurar** versões das alterações
5. **Navegar entre páginas** do site sem sair do editor

---

## REQUISITOS FUNCIONAIS DETALHADOS

### 🖼️ Área de Preview (Canvas Principal)
- Renderizar a página do site dentro de um `<iframe>` ou componente espelho em tempo real
- Mostrar a página **como o usuário final veria**, mas com overlays de seleção
- Ao passar o mouse sobre elementos, mostrar **highlight de hover** (borda colorida + label com tipo do elemento: `<h1>`, `<section>`, `<img>`, etc.)
- Ao clicar num elemento, **selecioná-lo** e abrir o painel de propriedades
- Suporte a **zoom** (50%, 75%, 100%, 125%) e **modo responsivo** (desktop/tablet/mobile preview)
- Mostrar **régua e grid** opcionais para alinhamento

### 🎛️ Painel Lateral de Propriedades
Quando um elemento estiver selecionado, exibir um painel lateral direito com abas:

#### Aba: Conteúdo
- Campo de texto/textarea para edição do texto interno
- Troca de imagem (upload ou URL)
- Edição de links (href, target, rel)
- Edição de atributos `alt`, `title`, `aria-label`

#### Aba: Tipografia
- Família de fonte (dropdown + preview com Google Fonts integrado)
- Tamanho da fonte (slider + input numérico, suporte px/rem/em)
- Peso da fonte (100 a 900)
- Estilo (normal, italic, oblique)
- Decoração (underline, line-through, none)
- Alinhamento de texto (left, center, right, justify)
- Altura de linha (line-height)
- Espaçamento entre letras (letter-spacing)
- Cor do texto (color picker com hex, rgb, hsl e transparência)

#### Aba: Dimensões & Espaçamento
- Width / Height (com toggle para auto/fixed/%)
- Min/Max width e height
- Padding (top, right, bottom, left — modo linked ou independente)
- Margin (top, right, bottom, left — modo linked ou independente)
- Border (largura, estilo, cor, radius por canto)
- Box shadow (offset x/y, blur, spread, cor, inset)

#### Aba: Layout & Posição
- Display (block, flex, grid, inline-block, none)
- Position (static, relative, absolute, fixed, sticky)
- Top / Right / Bottom / Left (quando applicável)
- Z-index
- Flex/Grid controls quando aplicável:
  - flex-direction, justify-content, align-items, gap
  - grid-template-columns/rows, grid-gap
- Overflow (visible, hidden, scroll, auto)

#### Aba: Aparência
- Background color (color picker)
- Background image (upload, URL, gradiente)
- Background size/position/repeat
- Opacity (0–100%)
- Filtros CSS (blur, brightness, contrast, grayscale, saturate)
- Cursor
- Visibility / Display toggle
- Animações/transições CSS básicas (hover effects)

#### Aba: Avançado
- Editor de classes CSS (adicionar/remover classes existentes)
- Editor de CSS inline direto (Monaco Editor ou CodeMirror, syntax highlighting)
- Atributos HTML customizados (data-*, id)
- Responsividade: breakpoint switcher para sobrescrever estilos por viewport

---

### 📐 Ferramentas de Edição Estrutural

- **Mover elementos**: drag-and-drop para reposicionar dentro do DOM
- **Duplicar elemento**: botão ou atalho Ctrl+D
- **Excluir elemento**: Delete ou botão no painel
- **Reordenar filhos**: setas up/down no painel de hierarquia
- **Árvore DOM visual**: painel colapsável mostrando a hierarquia completa da página, clicável
- **Adicionar elemento**: menu de inserção com tipos (texto, imagem, botão, seção, divider, etc.)

---

### 💾 Sistema de Versionamento e Persistência

- **Autosave** a cada modificação (debounced, 2s)
- **Histórico de versões** com timestamp, snapshot visual miniaturizado e nome do usuário
- **Undo/Redo** (Ctrl+Z / Ctrl+Shift+Z) com pelo menos 50 passos de histórico
- **Rascunhos vs Publicado**: o site só é atualizado quando o admin clica em "Publicar"
- **Restaurar versão**: qualquer versão salva pode ser restaurada com 1 clique
- **Exportar**: exportar o HTML/CSS modificado como arquivo

---

### 🔐 Segurança

- Todas as rotas do painel exigem autenticação JWT com refresh token
- Role-based access control: `super_admin`, `editor`, `viewer`
  - `viewer`: só visualiza, sem edição
  - `editor`: edita conteúdo e estilos, não pode excluir páginas
  - `super_admin`: acesso total
- Sanitização de inputs HTML (DOMPurify ou equivalente) para evitar XSS
- Validação server-side de todos os dados antes de persistir
- Log de auditoria: quem alterou o quê e quando
- CSRF protection em todas as mutations
- Rate limiting nas rotas de salvamento

---

### 🚀 Performance e UX

- Painel carrega em < 2s mesmo com páginas grandes
- Lazy loading dos painéis de propriedades (não renderizar o que não está visível)
- Atalhos de teclado documentados e disponíveis via painel de ajuda (?)
- Feedback visual imediato para todas as ações (toasts, loading states, error states)
- Modo escuro/claro no próprio painel admin
- Totalmente responsivo (o painel em si funciona em tablets)
- Acessibilidade: navegável por teclado, ARIA labels corretos

---

## STACK TÉCNICA PREFERIDA

> Adapte se o projeto já usa outra stack — mantenha consistência com o codebase existente.

**Frontend do Painel:**
- React + TypeScript
- Tailwind CSS para estilos do painel (não do site editado)
- Zustand ou Redux Toolkit para estado global do editor
- React DnD ou dnd-kit para drag-and-drop
- Radix UI ou shadcn/ui para componentes de UI do painel
- Monaco Editor para edição de CSS avançada

**Backend:**
- API REST ou tRPC
- Endpoints: `GET /pages`, `PUT /pages/:id/draft`, `POST /pages/:id/publish`, `GET /pages/:id/versions`, `POST /pages/:id/restore/:versionId`
- Banco: PostgreSQL com JSONB para armazenar snapshots de conteúdo/estilos
- Armazenamento de imagens: S3 ou equivalente

---

## ARQUITETURA DO SISTEMA DE EDIÇÃO

```
AdminEditor
├── Toolbar (top)
│   ├── PageSelector
│   ├── DevicePreviewToggle (desktop/tablet/mobile)
│   ├── ZoomControl
│   ├── UndoRedo
│   ├── SaveStatus (autosaved / unsaved changes)
│   └── PublishButton
│
├── Sidebar Left
│   ├── DOMTree (hierarquia de elementos, clicável)
│   └── PagesNavigator
│
├── Canvas (center)
│   ├── PagePreview (iframe ou mirror)
│   └── SelectionOverlay (highlight, resize handles)
│
└── Sidebar Right (Properties Panel)
    ├── ElementInfo (tag, id, classes)
    └── Tabs: Conteúdo | Tipografia | Dimensões | Layout | Aparência | Avançado
```

---

## COMPORTAMENTO DE SELEÇÃO DE ELEMENTOS

```
1. Usuário hover → elemento recebe outline colorido + label flutuante com tag
2. Usuário clica → elemento fica "selecionado":
   - Outline permanente
   - Resize handles nos cantos/bordas (para width/height)
   - Painel direito popula com propriedades atuais do elemento
3. Propriedade alterada no painel → aplicada em tempo real no preview
4. Drag iniciado → modo de reposicionamento ativo
5. Clique fora → deseleciona
```

---

## EXEMPLO DE FLUXO DE EDIÇÃO (User Story)

```
Admin entra no painel → vê a homepage renderizada
→ clica no título principal "Bem-vindo ao RTA"
→ painel direito mostra:
   Conteúdo: "Bem-vindo ao RTA" [editável]
   Tipografia: font-size 48px, font-weight 700, color #1a1a1a
→ muda cor para #E63946
→ título muda de cor em tempo real no canvas
→ aumenta font-size para 56px via slider
→ salva rascunho (autosave)
→ visualiza no modo mobile (320px)
→ ajusta font-size para 32px no breakpoint mobile
→ clica "Publicar" → site atualizado
```

---

## O QUE NÃO FAZER

- ❌ Não criar um CMS genérico — o sistema deve editar os elementos reais da página RTA
- ❌ Não usar `eval()` ou `innerHTML` sem sanitização
- ❌ Não salvar direto em produção sem etapa de rascunho
- ❌ Não fazer o painel de propriedades recarregar a página inteira a cada mudança
- ❌ Não ignorar mobile preview — a maioria dos usuários do site final é mobile
- ❌ Não omitir feedback de loading/error — cada ação deve ter estado visual claro

---

## ENTREGÁVEIS ESPERADOS

1. Componente `AdminEditor` completo com toda a estrutura de abas e canvas
2. Hook `useElementEditor` para gerenciar seleção, edição e histórico
3. Componentes individuais dos painéis (TypographyPanel, DimensionsPanel, etc.)
4. API routes para persistência (draft/publish/versions)
5. Sistema de autenticação e RBAC integrado
6. Documentação de atalhos de teclado
7. Testes unitários dos hooks críticos (useElementEditor, useHistory)

---

## PRIORIDADE DE IMPLEMENTAÇÃO

**Fase 1 (MVP):**
- Canvas com preview + seleção de elementos
- Edição de texto, cor e tipografia básica
- Salvar/publicar

**Fase 2:**
- Dimensões, espaçamento, layout completo
- Drag-and-drop para reposicionamento
- Histórico de versões

**Fase 3:**
- Árvore DOM interativa
- Editor CSS avançado
- RBAC completo
- Breakpoints responsivos por elemento