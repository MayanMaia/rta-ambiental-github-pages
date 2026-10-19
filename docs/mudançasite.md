# PROMPT — Reformulação de Conteúdo, Navegação e Layout do Site (RTA Ambiental)

## CONTEXTO

Você está trabalhando no repositório `rta-ambiental-frontend` (React 18 + Vite + Tailwind + React Router v6). O cliente enviou um documento de revisão (`Alterações_SITE_14-04-20.docx`) com mudanças de conteúdo, navegação e design para o site institucional. Este prompt traduz cada item do documento em uma tarefa técnica ligada aos arquivos reais do repositório, aponta onde o repo já tem suporte pronto para a mudança (via o sistema de `pageBuilder` em `src/mock/content.js`) e onde é preciso criar estrutura nova.

**Regra geral:** sempre que o conteúdo puder ser editado depois pelo painel administrativo (`AdminEditor` / `/admin/conteudo`), prefira colocá-lo nos objetos de `content.js` (`defaultPageBuilder`, `defaultSobreBuilder`, etc.) em vez de hardcoded no JSX — é assim que o restante do site já funciona.

Os nomes de arquivo de imagem citados abaixo (`media/imageN.*`) são os do `.docx` original; os arquivos reais serão enviados pelo cliente por e-mail — trate-os como placeholders a substituir quando chegarem (ver "Pendências" no fim).

---

## 0. MUDANÇA ESTRUTURAL — NAVEGAÇÃO E ROTAS

O menu atual (`src/components/layout/Header.jsx`) é `Início / Sobre / Serviços / Contato` + botões `Trabalhe Conosco` e `Fale Conosco`. O cliente pede:

```
Home  Sobre  Tecnologia  Consultoria  News  Contato
```

Isso implica quebrar a rota genérica `/servicos` em duas famílias de serviço (**Tecnologia** e **Consultoria**), criar uma seção **News** e **absorver `/trabalhe-conosco` dentro de `/contato`** (ver seção 6).

### Mudanças de rota necessárias em `src/App.jsx`
- Remover `servicos` / `servicos/:slug` genéricos e `trabalhe-conosco`.
- Adicionar:
  - `tecnologia` → lista da categoria Tecnologia
  - `tecnologia/:slug` → detalhe (reaproveitar `ServicoDetalhe.jsx`)
  - `consultoria` → lista da categoria Consultoria
  - `consultoria/:slug` → detalhe
  - `news` → listagem (ver seção 5, ainda sem layout definido)
- Manter redirect de `/servicos` → `/tecnologia` e de `/trabalhe-conosco` → `/contato` (usar `<Navigate>`) para não quebrar links antigos/SEO.

### Modelo de dados de serviço
`src/mock/data.js` (`mockServices`) e o service `src/services/servicos.service.js` não têm campo de categoria. Adicionar `categoria: 'tecnologia' | 'consultoria'` a cada serviço e um parâmetro de filtro em `servicosService.listar({ categoria })`. Isso mantém o CRUD único em `/admin/servicos` (não precisa duplicar o admin) — só adiciona um seletor de categoria no formulário do admin (`src/pages/admin/Servicos.jsx`) e nas rotas mock de `src/services/api.js`.

### Componentes a reaproveitar (não recriar do zero)
- `Servicos.jsx` → generalizar para `ServicosCategoria.jsx` (ou passar `categoria` via prop/rota) e usar em `/tecnologia` e `/consultoria`.
- `ServicoDetalhe.jsx` → já funciona por slug, só ajustar o link "← Voltar" para voltar à categoria correta em vez de sempre `/servicos`.

### `Header.jsx` / `Footer.jsx` / `public/sitemap.xml`
- Atualizar `NAV_LINKS` no `Header.jsx` para `Início(Home), Sobre, Tecnologia, Consultoria, News, Contato`.
- Remover o botão separado "Trabalhe Conosco" do header (desktop e mobile) — resta só "Fale Conosco".
- Atualizar a lista de navegação do `Footer.jsx` (mesma mudança) e remover o link para `/trabalhe-conosco`.
- Atualizar `public/sitemap.xml` com as novas rotas e remover as antigas.
- `docs/seo.md` e `docs/requisitos.md` (RF01) devem ser atualizados para refletir a nova estrutura de páginas.

---

## 1. HOME (`src/pages/Home.jsx`, `src/mock/content.js` → `defaultPageBuilder`, `Header.jsx`)

1. **Logo** — trocar `src/assets/logo-rta.svg` pela versão estilizada (aguardando arquivo, referência `media/image1.png` no doc do cliente). Aplicar em `Header.jsx` e `Footer.jsx`.
2. **Nav** — já coberto na seção 0.
3. **Remover "RESILIMPA TECNOLOGIA AMBIENTAL"** e usar o logo grande da RTA no lugar. Esse texto não aparece no hero atual (`content.home` só tem `eyebrow`/`title`/`description`) — provavelmente está embutido na imagem de fundo do hero ou em um bloco separado; localizar no design/imagem de fundo atual (`backgroundImage` do bloco `hero-1`) e substituir pela variação com o logo grande.
4. **Slogan rotativo** — o hero (`defaultPageBuilder.layout[0]`, tipo `hero`) hoje é estático (`title` único). Implementar rotação entre 3 frases:
   - "Invista em Experiência: RTA 20 anos!"
   - "Resolva o seu problema com pesquisa e inovação"
   - "Transforme seu resíduo em negócio"
   Sugestão técnica: estender o tipo `hero` em `renderBuilderBlock` (`Home.jsx`) para aceitar `titles: string[]` opcional, com troca automática (ex.: `setInterval` de 5s + fade) quando presente; manter `title` único como fallback para compatibilidade com o schema atual. Imagem de fundo pode ficar fixa (foto dos guarás) ou alternar por frase — **perguntar ao cliente** (ele mesmo colocou "podem ser usadas fotos diferentes ou manter somente a foto dos guarás" como opção aberta).
5. **CTA "FALE CONOSCO"** — aumentar o ícone do WhatsApp e corrigir o espaçamento entre a chamada e o texto acima dela. Isso é mais provavelmente o CTA do `Header.jsx` (botão "Fale Conosco") combinado com o `WhatsAppFAB.jsx` (ícone flutuante) do que um bloco da Home — **confirmar com o cliente a qual elemento visual ele se refere** antes de alterar; ajustar `w-14 h-14`/`w-7 h-7` do FAB ou o padding do botão do header conforme o caso.
6. **Cada seção/aba deve ocupar no mínimo a altura de uma página no Chrome** ("não pode ter duas abas dividindo o mesmo espaço visual"). Aplicar `min-h-screen` (ou `min-h-[100svh]`) às seções principais da Home e possivelmente das páginas de listagem — hoje só o hero tem altura mínima controlada (`min-h-[min(760px,calc(100svh-4.5rem))]`); estender esse padrão às demais `<section>` do layout builder.

---

## 2. SOBRE (`src/pages/Sobre.jsx`, `src/mock/content.js` → `content.sobre` e `defaultSobreBuilder`)

7. **Título**: trocar `content.sobre.title` de `"Sobre a RTA Ambiental"` para **"A Empresa"**.
8. **Legibilidade do texto sobre fundo de imagem** — hoje a página usa `--page-image` como background da section inteira, com o texto por cima sem contraste dedicado. Sugestão: um painel/fundo branco (ou branco translúcido) atrás do bloco de texto institucional, que pode ter leve parallax/scroll. **Este item é uma opinião pedida explicitamente pelo cliente ("Opinar") — inclua a sugestão de design na entrega, mas não trate como especificação fechada até ele confirmar.**
9. **Foto de fundo** → substituir pela foto da unidade de escória em Itapeva (aguardando arquivo, referência `media/image2.jpeg`). Atualizar `--page-image` inline style em `Sobre.jsx`.
10. **Texto institucional** — substituir o parágrafo fixo de `Sobre.jsx` (linhas 24–27, "A RTA Ambiental é uma empresa de prestação de serviços...") pelo texto abaixo, **justificado** (`text-align: justify` — hoje é `text-lg leading-relaxed`, sem justificação):

> A RTA Ambiental é uma empresa de prestação de serviços, dedicada à tecnologia, consultoria e engenharia, voltada à proteção do meio ambiente, com atuação em todo o território brasileiro.
>
> Dedicada a aplicar tecnologias de processo de tratamento, recuperação e reciclagem de resíduos industriais, a RTA tem executado uma gama variada de serviços, envolvendo todas as etapas necessárias à implantação de sistemas de tratamento e disposição de rejeitos líquidos e sólidos. Neste campo de atuação, destacam-se diversos trabalhos para empresas públicas e privadas, indústrias de pequeno a grande porte, nos ramos da mecânica, metalurgia, mineração, petroquímica e química.
>
> A RTA atua no ramo de comércio de minerais e subprodutos, sendo especializada no desenvolvimento de aplicações para escórias, agregados, pós e lamas. No ramo do cimento, possui experiência na utilização de escórias ácidas e alcalinas como aditivo ao clínquer. Este conhecimento, conquistado ao longo dos anos pelos seus profissionais, faz com que a empresa sempre busque alternativas ambiental e economicamente viáveis em suas realizações.
>
> Além disso, tem-se especializado na realização de licenciamento e estudos ambientais de toda ordem, desde estudos de investigação de solo e água subterrânea até a recuperação de áreas degradadas. Atua também em serviços especializados, tais como estudos topográficos e regularização de imóveis. Nossos principais serviços são: Tratamento e Destinação de Resíduos, Estudos e laudos ambientais, Licenciamento de empreendimentos, Gerenciamento ambiental e Valoração de Resíduos.

11. **Missão / Visão / Valores centralizados** em relação ao texto acima, com texto **justificado**. Hoje renderizam em grid `md:grid-cols-3` alinhados à esquerda em cada card — ajustar `text-align` dos cards (`defaultSobreBuilder.layout`) e o alinhamento do grid.
12. **Missão** → atualizar `sobreBuilder` card `id: 'sobre-card-missao'` (e `content.sobre.mission` como fallback) para:
    > Atuar nas áreas de Tecnologia e Consultoria Ambiental, com qualidade, produtividade e respeito à legislação, visando garantir a satisfação de seus clientes e demais partes interessadas através da melhoria contínua dos seus processos e serviços.
13. **Visão** → atualizar card `sobre-card-visao` / `content.sobre.vision` para:
    > Ser referência na prestação de serviços de tecnologia e consultoria através da marca sempre presente de empresa competitiva, compromissada, parceira, atualizada e com excelência na qualidade dos seus serviços.
14. **Valores** → atualizar card `sobre-card-valores` / `content.sobre.values` para:
    > Na busca do sucesso e do alto desempenho, sustentados pelos princípios de ética, sustentabilidade, criatividade, entusiasmo e harmonia.
15. **Barra verde divisória** entre o texto institucional e o bloco seguinte (vídeo/folder/slogan) — adicionar um `<hr>`/`<div>` de destaque em `#36ad55` (cor primária do design system) entre as duas seções.
16. **Vídeo institucional com frame inicial em branco** — perguntar ao cliente se querem um novo poster/thumbnail para o vídeo (frame customizado) ou se preferem remover o vídeo. **Como a Missão/Visão/Valores estão sendo alterados, o `.mp4` do vídeo institucional provavelmente precisa ser regravado/reexportado pelo cliente — sinalizar isso explicitamente e não prosseguir com a integração do vídeo até ele confirmar.** Não há player de vídeo implementado ainda no `Sobre.jsx` — será preciso criar o componente quando o novo arquivo chegar.
17. **Layout em 2 colunas**: vídeo de um lado, folder para download + slogan do outro. Slogan sugerido pelo cliente: *"Se, na sua empresa, as ideias são fundamentais. Especialmente as de baixo custo... Estamos falando a mesma linguagem."* (pedido de opinião — pode ser mantido como está ou revisado; incluir como está por padrão). Implementar como novo bloco de conteúdo (`grid md:grid-cols-2`) em `Sobre.jsx`; o link de download do folder pode ser um PDF estático em `public/` (ex. `public/folder-rta.pdf`), sem necessidade de backend.
18. **Remover a frase "FAÇA UM ORÇAMENTO"** dessa página (não há esse texto no `Sobre.jsx` atual — provavelmente está em um bloco de imagem/CTA ainda não migrado para o builder; localizar e remover ao integrar o design novo).

---

## 3. TECNOLOGIA (nova rota `/tecnologia`, dados em `src/mock/data.js`)

Item 19 do documento: 4 serviços, títulos em **duas linhas** no card de listagem (ajustar CSS de `Servicos.jsx`/card para permitir `line-clamp`/quebra em 2 linhas em vez de 1 linha truncada).

Cadastrar como 4 registros com `categoria: 'tecnologia'` em `mockServices` (e no `AdminServicos` quando integrado a um backend real):

### 3.1 Valoração de Resíduos
- **Slug sugerido:** `valoracao-de-residuos`
- **Descrição curta:** usar as 2 primeiras frases do texto como resumo do card.
- **Conteúdo completo:**

> Os processos industriais, em geral, ao mesmo tempo que produzem materiais de qualidade e com reconhecido valor agregado, obtém também outros produtos, que não possuem destinação adequada e, por esta razão, não tem um valor apreciável. São resíduos e subprodutos que podem ser até rejeitos — ou seja, materiais que não possuem valor algum e, por esta razão, é preciso pagar para dispor de forma ambientalmente adequada.
>
> A tendência atual das empresas é de não desperdiçar energia e materiais. A regra agora é a VALORAÇÃO DE RESÍDUOS, apoiado nas alternativas crescentes de RECICLAGEM e REUSO. Devido a vasta gama de opções quanto à aplicabilidade, a reutilização inteligente pode garantir ganhos significativos no orçamento da empresa, por meio da economia em materiais.
>
> A RTA desenvolveu alternativas para diversos tipos de empresas e materiais, especialmente AGREGADOS, CIMENTÍCIOS E CALCÍTICOS, utilizando a experiência da sua equipe técnica especializada em minerações, siderúrgicas e cimenteiras. Reciclou mais de 2,5 milhões de toneladas em 20 anos de trabalho com o DESENVOLVIMENTO DE PATENTES, seja na tecnologia industrial ou nas aplicações agrícolas, ou com a MONTAGEM DE UNIDADES DE RECICLAGEM.
>
> A valoração é o carro chefe da RTA. Se você tem um resíduo e deseja uma solução economicamente atrativa, entre em contato!
- **Imagem:** aguardando arquivo (`media/image3.jpeg`).
- **CTA:** link "Faça o seu orçamento" → `/contato` (ver seção 6, campo motivo pré-selecionado como Orçamento — ver "integração de CTAs" abaixo).

### 3.2 Destinação de Resíduos e Rejeitos
- **Slug sugerido:** `destinacao-de-residuos-e-rejeitos`
- **Conteúdo completo:**

> Quando um resíduo não pode ser reusado, reciclado ou reduzido, é necessário efetuar o tratamento ou a destinação do mesmo para que o material seja ambientalmente destinado, seja líquido, sólido ou semissólido. Inicialmente, é necessário classificar o resíduo entre as três classes possíveis, através da aplicação da norma ABNT NBR 10.004 (2004): PERIGOSO (Classe I), NÃO INERTE (Classe II-A) e INERTE (Classe II-B).
>
> Com esta classificação, direciona-se para as diversas tecnologias disponíveis, destacando-se as principais:
>
> a) **ATERRO SANITÁRIO**: disposição econômica de resíduos, direcionado especialmente para os resíduos classe II. As células de colocação do material dispõem de impermeabilização, drenagem de chorume e captação de gases da biodigestão, onde é mantido monitoramento para verificar contaminação do solo e da água subterrânea. A partir do marco da Política Nacional de Resíduos Sólidos (PNRS) apenas poderá ser disposto em aterro os aqueles materiais classificados como rejeito, ou seja, que não podem ser reusados, reciclados ou tratados.
>
> b) **COPROCESSAMENTO**: destruição térmica dos compostos orgânicos e incorporação de compostos inorgânicos ao cimento através do processamento em fornos de clínquer. O processo é realizado à temperatura de aproximadamente 1.250°C, sendo totalmente controlado, através de controle analítico e controle de emissões atmosféricas.
>
> c) **COMPOSTAGEM**: é a reciclagem de resíduos orgânicos, através de processo biológico controlado que acelera a decomposição do material gerando um composto orgânico como produto final, que é utilizado para fins agrícolas ou de jardinagem. É a forma de recuperar os nutrientes presentes nos resíduos orgânicos colocando-os novamente em seu ciclo natural.
>
> d) **INCINERAÇÃO**: destruição térmica dos resíduos mais tóxicos sob temperaturas superiores a 1400°C.
>
> A RTA efetua todo o processo de destinação, promovendo a preparação de resíduos para a destinação final, caso necessário. Caso precise deste tipo de serviço, entre em contato conosco.
- **Imagem:** aguardando arquivo (`media/image4.JPG`).
- **CTA:** "Faça o seu orçamento" → `/contato`.

### 3.3 Fornecimento de Produtos
- **Slug sugerido:** `fornecimento-de-produtos`
- **Conteúdo completo:**

> A RTA comercializa produtos ecológicos e ambientalmente responsáveis para aplicação predominantemente industrial. Alguns exemplos de produtos:
>
> a) **CALES**: materiais utilizados para diversos fins, inclusive para tratamento de água e efluentes. Disponível em diferentes composições, conforme necessidade de aplicação.
>
> b) **CIMENTÍCIOS**: materiais utilizados na fabricação do cimento em substituição ao clínquer.
>
> c) **ECOBRITA**: mix de materiais agregados para uso como base e sub-base de solos instáveis em pátios de armazenagem de cargas e pavimentação rodoviária.
>
> d) **ECOFINITER**: composto de material mineral que tem por finalidade reter óleos, graxas e produtos químicos oriundos de derramamentos e vazamentos no piso das fábricas. As suas propriedades de troca iônica estão comprovadas para retenção, inertização e retardamento da ação de diversos tipos de compostos químicos no meio ambiente, incluindo ácidos, hidrocarbonetos e metais pesados.
>
> A RTA também possui representação para especificação e comercialização de PRODUTOS QUÍMICOS para tratamento de água, efluentes e vapor.
>
> Na necessidade de materiais direcionados para as finalidades propostas, temos equipe técnica para especificação das melhores condições de fornecimento dos produtos, bem como assistência técnica aos fornecimentos.
- **Imagem:** aguardando arquivo (`media/image5.png`).
- **CTA:** "Faça o seu orçamento" → `/contato`.

### 3.4 Águas e Efluentes Industriais
- **Slug sugerido:** `aguas-e-efluentes-industriais`
- **Conteúdo completo:**

> Em sua forma mais pura, a água é inodora, quase incolor e insípida. Ela está presente em seu corpo, nos alimentos que você come e nas bebidas que ingere. Você a utiliza para limpar e lavar, como o melhor e mais fácil solvente disponível na natureza. Esses são alguns poucos usos da água — que inclui também a diversão, o paisagismo e a navegação. Por ser um solvente, a água usada é impura e passa a ser chamada por efluente e necessita de tratamento para ser descartada, reciclada ou reusada.
>
> A RTA projeta e seleciona sistemas de tratamento de efluentes para tratamentos físico-químicos e biológicos. São sistemas compactos e de alto desempenho, especificados para a sua aplicação. Em nosso trabalho, fazemos a avaliação preliminar da situação do seu efluente e propomos uma linha de estudo customizado para o seu problema. Dentre nossas linhas básicas de fornecimento, temos módulos específicos para postos de gasolina.
>
> Além de unidades de tratamento, fazemos operações de limpeza mecanizada de seus equipamentos, bem como dispomos e tratamos as lamas e lodos removidas deste processo. As soluções para a disposição adequada dos resíduos são integradas — desde a geração até a destinação final. Entre em contato com a RTA e saiba mais sobre as tecnologias aplicadas e as nossas metodologias de avaliação e soluções.
- **Imagem:** aguardando arquivo (`media/image6.JPG`).
- **CTA:** "Faça o seu orçamento" → `/contato`.

---

## 4. CONSULTORIA (nova rota `/consultoria`)

Item 28 lista **7 itens de serviço** ("deixar todos em duas linhas"), mas o documento traz **8 pares de texto+foto** (itens 29–46), incluindo **GERENCIAMENTO DE RESÍDUOS** (itens 35–36), que não aparece na lista de abas do item 28.

⚠️ **Confirmar com o cliente**: incluir "Gerenciamento de Resíduos" como 8º item de Consultoria (recomendado, já que o texto e a foto foram fornecidos), ou tratá-lo como conteúdo para outra seção? Implementar assumindo que **é um 8º item de Consultoria** até resposta em contrário — é a leitura mais conservadora (não descarta conteúdo entregue pelo cliente).

Cadastrar como registros com `categoria: 'consultoria'`:

### 4.1 Gerenciamento de Áreas Contaminadas
- **Slug sugerido:** `gerenciamento-de-areas-contaminadas`
- **Conteúdo completo:**

> O gerenciamento de áreas contaminadas no Estado de São Paulo é regido pela Decisão de Diretoria nº 038/2017/C da Cetesb. O processo de identificação de uma área contaminada é composto pelas fases de Avaliação Preliminar, Investigação Confirmatória, Investigação Detalhada e Avaliação de Risco. Já o processo de reabilitação de áreas contaminadas é constituído pelas etapas de Elaboração do Plano de Intervenção, Execução do Plano de Intervenção e Monitoramento para Encerramento. Desta forma, o processo de identificação de contaminação e reabilitação de uma área passa por todas as fases mencionadas acima, em ordem cronológica, sendo que a fase seguinte é totalmente dependente das informações obtidas na fase anterior.
>
> A primeira fase, a elaboração do Relatório de Avaliação Preliminar, pode ser considerada a mais importante do processo de gerenciamento de áreas contaminadas, pois é aqui que são levantados os dados históricos da área, é feita a caracterização do meio físico (solo, vegetação, rios, relevo, clima, dentre outros), a caracterização do uso e ocupação do solo no entorno, caracterização das atividades desenvolvidas no local, principais produtos químicos manipulados, bem como a descrição de ocorrências envolvendo produtos químicos perigosos. A partir de todos os dados levantados é possível elaborar o primeiro Modelo Conceitual da área, o MCA1, onde a área é classificada como Área com Potencial de Contaminação (AP) ou Área Suspeita de Contaminação (AS), e ainda, são indicadas todas as SQI (Substâncias Químicas de Interesse) a serem analisadas na próxima etapa. Outro produto da fase de Avaliação Preliminar é o Plano de Investigação Confirmatória que descreve detalhadamente como deverá ser executada a fase de Investigação Confirmatória, com descrição dos materiais e métodos a serem adotados para realização das amostragens de solo e amostragens de água de subterrânea por meio da instalação de poços de monitoramento.
>
> As demais etapas serão elaboradas na sequência em função do resultado das etapas anteriores.
>
> Precisa realizar investigação de solo e água subterrânea? Entre em contato conosco e solicite seu orçamento.
- **Imagem:** aguardando arquivo (`media/image7.png`).

### 4.2 Recuperação de Áreas Degradadas
- **Slug sugerido:** `recuperacao-de-areas-degradadas`
- **Conteúdo completo:**

> A recuperação de áreas degradadas tem como objetivo principal auxiliar o restabelecimento de um ecossistema que foi danificado, degradado ou destruído. Neste sentido, diversas técnicas podem ser utilizadas para recuperar ou restaurar uma área, dentre elas a realização do plantio de mudas de espécies nativas, o isolamento da área para regeneração natural, o controle de voçorocas, dentre outros, que podem ser utilizados isoladamente ou em conjunto.
>
> Uma área é considerada *recuperada* quando o ecossistema ou população degradada são restituídos a uma condição não degradada, que pode ser diferente de sua condição original. Adicionalmente, uma área é considerada *restaurada* quando há restituição dos processos ecológicos de um ecossistema ou de uma população o mais próximo possível da sua condição original, onde não há necessidade de intervenção (auxílio ou subsídio) adicional para que o desenvolvimento continue.
>
> A RTA Ambiental realiza a elaboração de Planos de Recuperação de Áreas Degradas, assim como a execução desses planos através de plantio de mudas nativas e monitoramento.
>
> Entre em contato para fazer um orçamento!
- **Imagem:** aguardando arquivo (`media/image8.jpg`).

### 4.3 Licenciamentos, Alvarás e Autorizações
- **Slug sugerido:** `licenciamentos-alvaras-e-autorizacoes`
- **Conteúdo completo:**

> O desenvolvimento de atividades produtivas com potencial de poluição, a construção de edificações em áreas urbanas, o transporte de resíduos, a supressão de vegetação, dentre outros exemplos, dependem de prévio licenciamento ambiental dos órgãos competentes envolvidos. Desta maneira, a RTA Ambiental tem equipe especializada para atuação em processos de obtenção de licenças ambientais junto aos órgãos públicos Federais, Estaduais e Municipais. Dentre essas licenças pode-se citar a obtenção de Certificado de Regularidade do Ibama, Licença Prévia, Licença de Instalação e Licença de Operação da Cetesb, Autorizações para supressão de vegetação, Certificados de Movimentação de Resíduos de Interesse Ambiental (CADRI), Alvará de Construção e Funcionamento e outros certificados específicos para cada atividade.
>
> Está precisando licenciar uma atividade ou obter autorizações específicas? Entre em contato conosco e solicite seu orçamento!
- **Imagem:** aguardando arquivo (`media/image9.png`).

### 4.4 Gerenciamento de Resíduos *(ver alerta acima)*
- **Slug sugerido:** `gerenciamento-de-residuos`
- **Conteúdo completo:**

> Gerenciar resíduos significa adotar efetiva e sistematicamente um conjunto de ações nas etapas de coleta, transporte, transbordo, tratamento, destinação final e disposição final ambientalmente adequada. Cada gerador é responsável pelos resíduos gerados, que devem ser segregados na fonte. Nesta linha de trabalho, existem diversos produtos realizados pela RTA:
>
> a) Plano de Gerenciamento de Resíduo Sólido — PGRS
>
> b) Plano de Gerenciamento de Resíduos Sólidos da Construção Civil — PGRSCC
>
> c) Plano de Gerenciamento de Resíduos Sólidos de Serviços de Saúde — PGRSSS
>
> d) Inventário de Resíduos e Declaração Anual
>
> e) Programa de Logística Reversa
>
> f) Programas de Educação Ambiental e Treinamento
>
> O atendimento da RTA no Gerenciamento de Resíduos é completa desde a gestão com o órgão ambiental para a emissão de CADRIs até o controle do transporte por meio de manifestos e fichas de segurança, seja por equipe própria ou parceira.
- **Imagem:** aguardando arquivo (`media/image10.jpg`).

### 4.5 Estudos, Laudos e Relatórios Ambientais
- **Slug sugerido:** `estudos-laudos-e-relatorios-ambientais`
- **Conteúdo completo:**

> As exigências ambientais são cada vez mais aperfeiçoados para que as condições e situações sejam avaliadas através das melhores técnicas disponíveis. Abaixo estão os principais estudos ambientais elaborados pela RTA:
>
> a) **LAUDOS DE IDENTIFICAÇÃO DE FAUNA/FLORA E INVENTÁRIO** — Os laudos de fauna e flora servem para a identificação de espécies animais e vegetais. Normalmente como requisito para pedidos de supressão da vegetação ou outras atividades que impactem o ambiente do empreendimento, consiste no levantamento das espécies ali presentes por meio de amostragens, caracterizando então a biodiversidade do local.
>
> b) **ESTUDOS DE IMPACTO DE VIZINHANÇA (EIV)** — É um instrumento de gestão urbana, criado pelo Estatuto da Cidade e presente em todos os Planos Diretores, aplicável a empreendimentos públicos e privados, situados na área urbana. Exigível na concessão de licenças municipais de construção, ampliação ou funcionamento.
>
> c) **MONITORAMENTO DE FAUNA TERRESTRE E AQUÁTICA** — O monitoramento da fauna de espécies terrestres e aquáticas de uma localidade, é utilizado para o levantamento de dados importantes para a tomada de decisão a respeito do manejo de áreas naturais.
>
> d) **LAUDOS DE RUÍDO AMBIENTAL** — Este laudo trata-se de um documento técnico que atesta a emissão de ruído para fora dos limites do empreendimento. A NBR ABNT 10.151 estabelece os limites de ruídos permitidos para as diversas atividades.
>
> e) **PLANO DE ATENDIMENTO EMERGENCIAL (PAE/PGR)** — O Plano de Atendimento à Emergência (PAE) e o Programa de Gerenciamento de Riscos (PGR) servem para estabelecer estratégias e procedimentos que devem ser adotados para o controle de situações emergenciais que, por ventura, aconteçam no decorrer das atividades laborais, de modo a preservar vidas, bem como reduzir os possíveis danos, proteger a comunidade, minimizar impactos ambientais e perdas patrimoniais.
>
> f) **LAUDOS DE MONITORAMENTO ANALÍTICO** — Diversos processos de avaliação ambiental exigem a realização de coletas e a realização de ensaios analíticos para validar ações de regulação ambiental.
>
> Consulte a RTA para estes ou outros trabalhos relativos à área ambiental.
- **Imagem:** aguardando arquivo (`media/image11.jpeg`).

### 4.6 Estudos, Laudos e Relatórios de SSO
- **Slug sugerido:** `estudos-laudos-e-relatorios-de-sso`
- **Conteúdo completo:**

> Medidas ergonômicas e de segurança são necessárias para um ambiente de trabalho saudável e, por lei, sua observância e conformidade deverão constar em documentos que mostrarão que a empresa está de acordo com as respectivas Normas Regulamentadoras do Ministério do Trabalho. Abaixo estão os principais estudos ambientais elaborados pela RTA:
>
> a) **Auto de Vistoria do Corpo de Bombeiros (AVCB)** — Documento emitido pelo Corpo de Bombeiros que certifica que uma edificação atende a um conjunto de medidas estruturais, técnicas e organizacionais de prevenção e combate contra incêndio.
>
> b) **ELABORAÇÃO DE PPRA E PCMAT** — O PPRA serve para fazer o mapeamento dos riscos do ambiente de trabalho e o PCMAT verifica as condições e meio ambiente de trabalho na indústria da construção civil. A partir dos riscos que forem apontados é possível agir de forma preventiva, controlando, anulando ou eliminando os riscos do ambiente de trabalho.
>
> c) **Programa de Conservação Auditiva (PCA)** — É um conjunto de medidas que previnem a instalação ou evolução das perdas auditivas ocupacionais nos trabalhadores. Trata-se de programa estabelecido pela NR-9, referente a Riscos Ambientais.
>
> d) **Laudo Técnico das Condições Ambientais de Trabalho (LTCAT)** — É um documento regulamentado pela previdência social e não pelo Ministério do Trabalho, e tem como objetivo analisar a necessidade de aplicação do direito à aposentadoria especial para o trabalhador exposto a agentes nocivos.
>
> e) **Laudo Ergonômico** — É um documento expedido para atestar as condições ergonômicas de alguma atividade específica da organização. A partir das análises das condições técnicas, ambientais e organizacionais, a AET propõe adaptações do posto de trabalho ao homem ou outras medidas administrativas, sempre com foco na saúde, segurança e desempenho eficiente das pessoas.
>
> Consulte a RTA para estes ou outros trabalhos relativos à área de Segurança do Trabalho e de Instalações.
- **Imagem:** aguardando arquivo (`media/image12.jpg`).

### 4.7 Implantação de Sistemas de Gestão
- **Slug sugerido:** `implantacao-de-sistemas-de-gestao`
- **Conteúdo completo:**

> Desenvolver e implementar um sistema de gestão é crucial para promover a melhoria nos controles, realizar projeções com maior grau de precisão e permitir que o negócio cresça de forma sustentável. Recursos tecnológicos como ferramentas de software, as técnicas e métodos inovadores para a execução de tarefas, profissionais capacitados e os recursos materiais e financeiros da empresa precisam ser geridos com eficiência e um bom sistema de gestão poderá garantir o sucesso.
>
> A implementação de um sistema de gestão realizada com a ajuda de uma empresa de consultoria especializada dará a você a chance de obter uma certificação ISO e aumentar a credibilidade do seu negócio melhorando ainda mais a imagem da empresa no mercado de atuação.
>
> A RTA possui diversas maneiras de fazer este tipo de trabalho com consultores experientes, através das modalidades presencial ou à distância. Consulte nossos planos e condições.
- **Imagem:** aguardando arquivo (`media/image13.jpeg`).

### 4.8 Assistência Técnica em Perícias Judiciais e Outros Serviços Técnicos

> **Nota:** o documento nomeia a aba como **"ASSISTÊNCIA TÉCNICA EM PERÍCIAS JUDICIAIS e OUTROS SERVIÇOS TÉCNICOS"** (item 28) mas depois fornece textos separados para cada um (itens 43–44 e 45–46). Implementar como **dois cards distintos** (mais consistente com o padrão dos demais itens) — confirmar com o cliente se a intenção era realmente um único item combinado.

**Assistência Técnica em Perícias Judiciais**
- **Slug sugerido:** `assistencia-tecnica-em-pericias-judiciais`
- **Conteúdo completo:**

> Para analisar e julgar os processos da justiça, os magistrados necessitam procurar o mais perfeito entendimento a respeito de uma temática específica que não faz parte de sua formação e de seu cotidiano. Frente a essa demanda, lança mão de elementos legais para o conhecimento dos fatos, garantindo assim uma apreciação justa.
>
> A perícia é a ferramenta legal, utilizada pela justiça, como alternativa adequada de apresentar os conhecimentos necessários, através de laudos periciais. A perícia na área ambiental é uma função é exercida por profissional especializado, devidamente registrado em órgão da categoria, com experiência e competências suficientes para emitir juízo de valor aos quesitos formulados pelo juiz.
>
> Devido a equipe técnica que possuímos, os profissionais da RTA podem atuar como peritos judiciais ou como assistentes técnicos, apresentando a verdade dos fatos. Caso você tenha necessidade deste tipo de profissional, entre em contato conosco.
- **Imagem:** aguardando arquivo (`media/image14.jpeg`).

**Outros Serviços Técnicos**
- **Slug sugerido:** `outros-servicos-tecnicos`
- **Conteúdo completo:**

> Devido ao complexo contexto ambiental em que se exige a multidisciplinaridade, a RTA possui profissionais nas diversas áreas do conhecimento, o que permite ofertar outros trabalhos na área da Engenharia, tais como:
>
> a) Elaboração de laudos e inspeções prediais
>
> b) Elaboração de projetos básicos e executivos para Engenharia
>
> c) Elaboração de estudos geotécnicos e hidrogeológicos
>
> d) Serviços especializados de fotografia aérea com drone
>
> e) Serviços especializados em topografia, demarcação e retificação com georreferenciamento
>
> f) Serviços especializados de sondagem SPT, rotativa e a trado mecânico
>
> Sempre que necessário, consulte os serviços da RTA.
- **Imagem:** aguardando arquivo (`media/image15.jpg`).

**Todos os itens de Tecnologia e Consultoria terminam com um CTA "Faça o seu orçamento" apontando para `/contato`.** Ver seção 6 sobre como pré-selecionar o motivo do contato via query string.

---

## 5. NEWS (nova rota `/news`)

Item 47: o cliente não definiu layout, só a intenção — **"um lugar onde sejam colocados os artigos e notícias da RTA. Tem que ser um espaço de fácil edição."**

Isso é um requisito em aberto, não uma especificação — implementar como um **MVP simples e explícito**, sem inventar funcionalidades que o cliente não pediu:
- Página `/news` com listagem de posts (título, data, resumo, imagem de capa) — reaproveitar o padrão visual de cards já usado em `Servicos.jsx`.
- `/news/:slug` para o post completo (mesmo padrão de `ServicoDetalhe.jsx`).
- Gestão via `/admin/conteudo` ou nova seção `/admin/news` no painel — dado que "fácil edição" é requisito explícito, o CRUD de posts deve entrar no mesmo modelo dos demais recursos administrativos (`mockNews` em `data.js`, `newsService`, rota mock em `api.js`, item no `AdminSidebar` com RBAC — decidir quais perfis têm acesso, por padrão sugerir `admin` e `marketing`, mesmo grupo de `Conteúdo`/`Serviços`).
- **Não implementar** comentários, categorias/tags, busca ou newsletter — nada disso foi pedido; manter escopo mínimo e sinalizar ao cliente que dá para expandir depois.

---

## 6. CONTATO (unifica `/contato` + `/trabalhe-conosco`)

Esta é a mudança estrutural mais sensível: o documento pede fundir o formulário de contato comercial com o banco de talentos em **um único formulário** com campo de "motivo".

48. **Trocar rótulo** "Trabalhe Conosco" por **"Fale Conosco"** — já coberto pela remoção do botão duplicado no header (seção 0); o texto "Fale Conosco" já existe como CTA principal.
49. **Mensagem de abertura**: substituir o subtítulo atual do `Contato.jsx` ("Preencha o formulário e nossa equipe entrará em contato em breve.") por:
    > "Envie a sua mensagem que entraremos em contato."
50. **Campos do formulário único**: nome do contato, **município** (novo campo — não existe hoje em `Contato.jsx` nem `TrabalheConosco.jsx`), e-mail, telefone, e um seletor de motivo com 3 opções: **ORÇAMENTO / CURRÍCULO / OUTROS**, com campo de texto livre e upload de arquivo. Regra de validação condicional: **se o motivo for CURRÍCULO, o upload do documento passa a ser obrigatório** (hoje `Contato.jsx` não tem upload; `TrabalheConosco.jsx` tem upload de currículo mas é uma página separada).
51. **Roteamento por e-mail conforme o motivo**:
    - ORÇAMENTO → `consultoria@rtaambiental.com.br`
    - CURRÍCULO ou OUTROS → `faleconosco@rtaambiental.com.br`
    Isso é lógica de **backend** (o front só envia o campo `motivo` no payload) — como o projeto ainda não tem backend real (`docs/plano-de-desenvolvimento.md` marca a Fase 4 "Backend e serviços" como pendente), documentar esse requisito para quando a API for implementada, e no `mockApi`/`api.js` simular o roteamento apenas no console/log, sem enviar e-mail de verdade.
52. **Excluir o e-mail dos contatos finais** — remover o link `mailto:contato@rtaambiental.com.br` do bloco "Contato" no `Footer.jsx` (mantém WhatsApp).
53. **Aumentar o logo da RTA** no rodapé — ajustar a largura do logo em `Footer.jsx` (hoje `w-[210px]`).
54. **Remover um ou dois espaços** dos créditos finais — reduzir o padding vertical da bottom bar do `Footer.jsx` (hoje `py-5`).

### Implementação técnica sugerida para o formulário unificado
- Substituir `src/pages/Contato.jsx` e `src/pages/TrabalheConosco.jsx` por um único `Contato.jsx` com:
  - `react-hook-form` com campo `motivo` (`radio`/`select`: `orcamento | curriculo | outros`).
  - Upload de arquivo com `register('curriculo', { required: motivo === 'curriculo' })` — usar `watch('motivo')` para validação condicional e para mostrar/ocultar o campo de upload.
  - Reaproveitar `validators.js` (telefone, e-mail) e adicionar validação de MIME/tamanho do arquivo já usada em `TrabalheConosco.jsx` (PDF, ≤5MB — ver `docs/banco-de-talentos.md`).
  - Envio: se houver arquivo, `multipart/form-data` via `candidatosService`-like; senão, JSON via `contatoService`. Ou, mais simples, um único endpoint novo `POST /api/contato` que aceita `multipart/form-data` sempre (arquivo opcional) — decidir com o time de backend; documentar a decisão em `docs/banco-de-talentos.md` e `docs/requisitos.md` (RF02/RF03 hoje descrevem dois fluxos separados).
  - Permitir que os links de "Faça o seu orçamento" das páginas de Tecnologia/Consultoria cheguem em `/contato?motivo=orcamento` e pré-selecionem o motivo via `useSearchParams`.
- Atualizar `docs/requisitos.md` (RF02/RF03), `docs/banco-de-talentos.md` (fluxo do candidato) e `docs/painel-administrativo.md` para refletir o formulário único — hoje esses documentos descrevem `/trabalhe-conosco` como fluxo separado; o admin (`/admin/candidatos` e `/admin/mensagens`) pode continuar separado internamente (uma tabela para orçamento/outros, outra para currículos) mesmo com o formulário público unificado, **ou** ser unificado também — decidir com o cliente/PO antes de mexer no painel admin, já que isso não foi pedido explicitamente no documento de alterações.

---

## 7. PENDÊNCIAS — confirmar com o cliente antes de fechar a implementação

1. Todas as imagens citadas como `media/imageN.*` — aguardando envio por e-mail pelo cliente; até lá, manter placeholders/imagens atuais.
2. Item 8 (Sobre): tratamento visual do fundo com texto — pedido de opinião, não especificação fechada.
3. Item 16 (Sobre): decisão sobre regravar o vídeo institucional (novo MP4 com Missão/Visão/Valores atualizados) ou apenas trocar o frame de capa.
4. Item 17 (Sobre): aprovação do slogan sugerido para a coluna ao lado do vídeo/folder.
5. Item 5 (Home): confirmar se a "chamada para contato" com o ícone do WhatsApp é o CTA do header, o FAB flutuante, ou um elemento novo do hero.
6. Seção 4: se "Gerenciamento de Resíduos" entra como 8º item de Consultoria (a lista do item 28 tem só 7).
7. Seção 4.8: se "Assistência Técnica em Perícias Judiciais" e "Outros Serviços Técnicos" devem ser um item combinado (como sugere o título da aba no item 28) ou dois cards separados (como sugerem os textos individuais dos itens 43–46).
8. Seção 6: se o painel admin de Mensagens/Candidatos deve ser unificado junto com o formulário público, ou continuar como duas listagens internas.
9. Item 4 (Home): se a foto de fundo do hero muda junto com cada uma das 3 frases rotativas, ou permanece fixa (foto dos guarás).

---

## 8. CHECKLIST TÉCNICO — arquivos a alterar/criar

**Rotas e navegação**
- [ ] `src/App.jsx` — novas rotas `/tecnologia`, `/tecnologia/:slug`, `/consultoria`, `/consultoria/:slug`, `/news`, `/news/:slug`; redirects de `/servicos` e `/trabalhe-conosco`
- [ ] `src/components/layout/Header.jsx` — novo `NAV_LINKS`, remover botão "Trabalhe Conosco"
- [ ] `src/components/layout/Footer.jsx` — nav, remover e-mail, logo maior, padding dos créditos
- [ ] `public/sitemap.xml`

**Dados e serviços**
- [ ] `src/mock/data.js` — reescrever `mockServices` com os 12 itens reais (4 Tecnologia + 8 Consultoria) e campo `categoria`; novo `mockNews`
- [ ] `src/services/servicos.service.js` — parâmetro `categoria`
- [ ] `src/services/api.js` — rotas mock para categoria e para `news`
- [ ] novo `src/services/news.service.js`

**Páginas**
- [ ] `src/pages/Home.jsx` — hero rotativo, `min-h-screen` nas seções, logo/texto do topo
- [ ] `src/pages/Sobre.jsx` — título, texto justificado, MVV atualizados/centralizados, barra verde, bloco vídeo+folder+slogan
- [ ] `src/mock/content.js` — `content.sobre`, `defaultSobreBuilder`, `defaultPageBuilder` (hero com `titles[]`)
- [ ] renomear/generalizar `src/pages/Servicos.jsx` → usado por `/tecnologia` e `/consultoria` (via prop de categoria), título de card em 2 linhas
- [ ] `src/pages/ServicoDetalhe.jsx` — ajustar link de retorno por categoria
- [ ] novo `src/pages/News.jsx` e `src/pages/NewsDetalhe.jsx`
- [ ] `src/pages/Contato.jsx` — formulário unificado (motivo + upload condicional + município)
- [ ] remover `src/pages/TrabalheConosco.jsx` (ou redirecionar)

**Admin (se o escopo incluir)**
- [ ] `src/pages/admin/Servicos.jsx` — seletor de categoria
- [ ] `src/components/layout/AdminSidebar.jsx` — item News (+ RBAC)
- [ ] novo `src/pages/admin/News.jsx`

**Documentação do repo a atualizar em conjunto**
- [ ] `docs/requisitos.md` (RF01, RF02, RF03)
- [ ] `docs/painel-administrativo.md` (seções do menu)
- [ ] `docs/banco-de-talentos.md` (fluxo unificado)
- [ ] `docs/seo.md` (estrutura de URLs)