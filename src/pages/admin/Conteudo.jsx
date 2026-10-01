import { useEffect, useState } from 'react'
import { getSiteContent, saveSiteContent } from '../../mock/content'
import AdminEditor from '../../components/admin/AdminEditor'

const BLOCK_LIBRARY = [
  { type: 'hero', label: 'Hero' },
  { type: 'text', label: 'Texto' },
  { type: 'media', label: 'Imagem + texto' },
  { type: 'cards', label: 'Cards' },
  { type: 'cta', label: 'CTA' },
]

const createBlock = (type) => {
  const baseId = `${type}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`

  switch (type) {
    case 'hero':
      return {
        id: baseId,
        type: 'hero',
        eyebrow: 'Novo destaque',
        title: 'Nova proposta de valor',
        description: 'Descreva a mensagem principal da sua página aqui.',
        ctaPrimaryText: 'Saiba mais',
        ctaPrimaryLink: '/servicos',
        ctaSecondaryText: 'Falar com a equipe',
        ctaSecondaryLink: '/contato',
        backgroundImage: '/imagens-docx/image15.jpg',
        accentColor: '#f6aa00',
        textColor: '#ffffff',
        align: 'left',
      }
    case 'text':
      return {
        id: baseId,
        type: 'text',
        title: 'Nova seção de texto',
        description: 'Subtítulo ou indicação breve da seção.',
        body: 'Escreva aqui o conteúdo desta área.',
        backgroundColor: '#ffffff',
        textColor: '#101c43',
      }
    case 'media':
      return {
        id: baseId,
        type: 'media',
        title: 'Nova seção com imagem',
        description: 'Explique melhor sua proposta com conteúdo e visual.',
        body: 'Escreva a mensagem principal desta seção.',
        imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
        buttonText: 'Saiba mais',
        buttonLink: '/contato',
        backgroundColor: '#f7f8f5',
        textColor: '#101c43',
        align: 'left',
      }
    case 'cards':
      return {
        id: baseId,
        type: 'cards',
        title: 'Soluções para cada desafio',
        description: 'Estratégias feitas para o seu negócio.',
        items: [
          { title: 'Diagnóstico', text: 'Mapeamos oportunidades e riscos com profundidade.' },
          { title: 'Execução', text: 'Implementamos soluções com estratégia e acompanhamento.' },
          { title: 'Resultado', text: 'Ações orientadas ao impacto real para sua operação.' },
        ],
        backgroundColor: '#f7f8f5',
        textColor: '#101c43',
      }
    case 'cta':
      return {
        id: baseId,
        type: 'cta',
        title: 'Seu próximo projeto pode deixar uma marca positiva.',
        description: 'Use este bloco para reforçar a proposta de conversão.',
        buttonText: 'Fale conosco',
        buttonLink: '/contato',
        backgroundColor: '#101c43',
        textColor: '#ffffff',
      }
    default:
      return null
  }
}

const getSelectedBlock = (layout, selectedId) => layout.find((block) => block.id === selectedId) || null

const parseItemsText = (items) => {
  if (Array.isArray(items)) {
    return items
      .map((item) => ({ title: item.title || '', text: item.text || '' }))
      .filter((item) => item.title || item.text)
  }

  if (typeof items === 'string') {
    return items
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => ({ title: line, text: line }))
  }

  return []
}

const renderEditorFields = (block, onUpdate) => {
  if (!block) return null

  const field = (name, label, type = 'text', textarea = false, placeholder = '') => (
    <div key={name}>
      <label className="label text-slate-200">{label}</label>
      {textarea ? (
        <textarea
          rows={4}
          placeholder={placeholder}
          className="input resize-none bg-slate-950 text-slate-100 border-slate-600"
          value={block[name] || ''}
          onChange={(event) => onUpdate(name, event.target.value)}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className="input bg-slate-950 text-slate-100 border-slate-600"
          value={block[name] || ''}
          onChange={(event) => onUpdate(name, event.target.value)}
        />
      )}
    </div>
  )

  if (block.type === 'hero') {
    return (
      <div className="space-y-4">
        {field('eyebrow', 'Eyebrow')}
        {field('title', 'Título principal')}
        {field('description', 'Descrição', 'text', true)}
        {field('backgroundImage', 'Imagem de fundo', 'url')}
        {field('accentColor', 'Cor de destaque', 'color')}
        {field('textColor', 'Cor do texto', 'color')}
        <div>
          <label className="label text-slate-200">Alinhamento</label>
          <select
            className="input bg-slate-950 text-slate-100 border-slate-600"
            value={block.align || 'left'}
            onChange={(event) => onUpdate('align', event.target.value)}
          >
            <option value="left">Esquerda</option>
            <option value="center">Centralizado</option>
            <option value="right">Direita</option>
          </select>
        </div>
        {field('ctaPrimaryText', 'Texto do botão principal')}
        {field('ctaPrimaryLink', 'Link do botão principal')}
        {field('ctaSecondaryText', 'Texto do botão secundário')}
        {field('ctaSecondaryLink', 'Link do botão secundário')}
      </div>
    )
  }

  if (block.type === 'text') {
    return (
      <div className="space-y-4">
        {field('title', 'Título')}
        {field('description', 'Subtítulo')}
        {field('body', 'Conteúdo', 'text', true)}
        {field('backgroundColor', 'Cor de fundo', 'color')}
        {field('textColor', 'Cor de texto', 'color')}
      </div>
    )
  }

  if (block.type === 'media') {
    return (
      <div className="space-y-4">
        {field('title', 'Título')}
        {field('description', 'Subtítulo', 'text', true)}
        {field('body', 'Texto', 'text', true)}
        {field('imageUrl', 'URL da imagem')}
        {field('backgroundColor', 'Cor de fundo', 'color')}
        {field('textColor', 'Cor de texto', 'color')}
        <div>
          <label className="label text-slate-200">Posição da imagem</label>
          <select
            className="input bg-slate-950 text-slate-100 border-slate-600"
            value={block.align || 'left'}
            onChange={(event) => onUpdate('align', event.target.value)}
          >
            <option value="left">Esquerda</option>
            <option value="right">Direita</option>
          </select>
        </div>
        {field('buttonText', 'Texto do botão')}
        {field('buttonLink', 'Link do botão')}
      </div>
    )
  }

  if (block.type === 'cards') {
    return (
      <div className="space-y-4">
        {field('title', 'Título')}
        {field('description', 'Descrição', 'text', true)}
        <div>
          <label className="label text-slate-200">Itens (um por linha)</label>
          <textarea
            rows={6}
            className="input resize-none bg-slate-950 text-slate-100 border-slate-600"
            value={parseItemsText(block.items)
              .map((item) => `${item.title || ''}${item.text && item.title ? ' - ' : ''}${item.text || ''}`)
              .join('\n') || ''}
            onChange={(event) => {
              const value = event.target.value
              const parsed = value
                .split('\n')
                .map((line) => line.trim())
                .filter(Boolean)
                .map((line) => ({ title: line, text: line }))
              onUpdate('items', parsed)
            }}
          />
        </div>
        {field('backgroundColor', 'Cor de fundo', 'color')}
        {field('textColor', 'Cor de texto', 'color')}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {field('title', 'Título')}
      {field('description', 'Descrição', 'text', true)}
      {field('buttonText', 'Texto do botão')}
      {field('buttonLink', 'Link do botão')}
      {field('backgroundColor', 'Cor de fundo', 'color')}
      {field('textColor', 'Cor do texto', 'color')}
    </div>
  )
}

const renderCanvasBlock = (block) => {
  if (!block) return null

  if (block.type === 'hero') {
    return (
      <section className="builder-preview builder-preview--hero" style={{ backgroundImage: block.backgroundImage ? `url('${block.backgroundImage}')` : undefined }}>
        <div className="builder-preview__content">
          <p className="builder-preview__eyebrow" style={{ color: block.accentColor || '#f6aa00' }}>{block.eyebrow}</p>
          <h3>{block.title}</h3>
          <p>{block.description}</p>
          <div className="builder-preview__actions">
            <span>{block.ctaPrimaryText}</span>
            <span>{block.ctaSecondaryText}</span>
          </div>
        </div>
      </section>
    )
  }

  if (block.type === 'text') {
    return (
      <section className="builder-preview builder-preview--text" style={{ backgroundColor: block.backgroundColor || '#ffffff', color: block.textColor || '#101c43' }}>
        <p className="builder-preview__eyebrow" style={{ color: block.accentColor || '#36ad55' }}>Conteúdo</p>
        <h3>{block.title}</h3>
        <p className="builder-preview__muted">{block.description}</p>
        <p>{block.body}</p>
      </section>
    )
  }

  if (block.type === 'media') {
    return (
      <section className="builder-preview builder-preview--media" style={{ backgroundColor: block.backgroundColor || '#f7f8f5', color: block.textColor || '#101c43' }}>
        <img src={block.imageUrl || '/imagens-docx/image15.jpg'} alt={block.title} />
        <div>
          <p className="builder-preview__eyebrow" style={{ color: block.accentColor || '#36ad55' }}>Destaque</p>
          <h3>{block.title}</h3>
          <p>{block.description}</p>
          <button type="button" className="btn btn-sm mt-3" style={{ background: block.accentColor || '#f6aa00', color: '#071128' }}>{block.buttonText}</button>
        </div>
      </section>
    )
  }

  if (block.type === 'cards') {
    const items = parseItemsText(block.items)
    return (
      <section className="builder-preview builder-preview--cards" style={{ backgroundColor: block.backgroundColor || '#f7f8f5', color: block.textColor || '#101c43' }}>
        <p className="builder-preview__eyebrow" style={{ color: block.accentColor || '#36ad55' }}>Soluções</p>
        <h3>{block.title}</h3>
        <div className="builder-preview__grid">
          {items.map((item, index) => (
            <div key={`${item.title}-${index}`} className="builder-preview__card">
              <span>{index + 1}</span>
              <strong>{item.title}</strong>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="builder-preview builder-preview--cta" style={{ backgroundColor: block.backgroundColor || '#101c43', color: block.textColor || '#ffffff' }}>
      <div>
        <p className="builder-preview__eyebrow" style={{ color: block.accentColor || '#f6aa00' }}>Convite</p>
        <h3>{block.title}</h3>
        <p>{block.description}</p>
      </div>
      <button type="button" className="btn btn-sm" style={{ background: block.accentColor || '#36ad55', color: '#071128' }}>{block.buttonText}</button>
    </section>
  )
}

function LegacyAdminConteudo() {
  const [form, setForm] = useState(() => getSiteContent())
  const [selectedId, setSelectedId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [draggedId, setDraggedId] = useState(null)
  const [activeTab, setActiveTab] = useState('inicio')
  const [selectedSobreCardId, setSelectedSobreCardId] = useState(null)

  useEffect(() => {
    const content = getSiteContent()
    setForm(content)
    setSelectedId(content?.pageBuilder?.layout?.[0]?.id || null)
    setSelectedSobreCardId(content?.sobreBuilder?.layout?.[0]?.id || null)
  }, [])

  const layout = form?.pageBuilder?.layout || []
  const selectedBlock = getSelectedBlock(layout, selectedId)
  const sobreLayout = form?.sobreBuilder?.layout || []
  const selectedSobreCard = sobreLayout.find((card) => card.id === selectedSobreCardId) || null

  const updateBuilderLayout = (nextLayout) => {
    setForm((prev) => ({
      ...prev,
      pageBuilder: {
        ...(prev.pageBuilder || {}),
        layout: nextLayout,
      },
    }))
  }

  const updateSobreLayout = (nextLayout) => {
    setForm((prev) => ({
      ...prev,
      sobreBuilder: {
        ...(prev.sobreBuilder || {}),
        layout: nextLayout,
      },
    }))
  }

  const onChange = (section, field) => (event) => {
    const value = event.target.value
    setForm((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  const addBlock = (type) => {
    const nextBlock = createBlock(type)
    if (!nextBlock) return

    const nextLayout = [...layout, nextBlock]
    updateBuilderLayout(nextLayout)
    setSelectedId(nextBlock.id)
  }

  const updateBlock = (id, field, value) => {
    const nextLayout = layout.map((block) => (block.id === id ? { ...block, [field]: value } : block))
    updateBuilderLayout(nextLayout)
  }

  const deleteBlock = (id) => {
    const nextLayout = layout.filter((block) => block.id !== id)
    updateBuilderLayout(nextLayout)

    if (selectedId === id) {
      setSelectedId(nextLayout[0]?.id || null)
    }
  }

  const addSobreCard = () => {
    const newCard = {
      id: `sobre-card-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
      type: 'card',
      title: 'Novo card',
      text: 'Descreva o conteúdo desta área.',
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
      backgroundColor: '#ffffff',
      textColor: '#101c43',
      borderColor: '#36ad55',
    }

    const nextLayout = [...sobreLayout, newCard]
    updateSobreLayout(nextLayout)
    setSelectedSobreCardId(newCard.id)
  }

  const updateSobreCard = (id, field, value) => {
    const nextLayout = sobreLayout.map((card) => (card.id === id ? { ...card, [field]: value } : card))
    updateSobreLayout(nextLayout)
  }

  const deleteSobreCard = (id) => {
    const nextLayout = sobreLayout.filter((card) => card.id !== id)
    updateSobreLayout(nextLayout)

    if (selectedSobreCardId === id) {
      setSelectedSobreCardId(nextLayout[0]?.id || null)
    }
  }

  const moveSobreCard = (fromId, toId) => {
    if (!fromId || !toId || fromId === toId) return

    const nextLayout = [...sobreLayout]
    const fromIndex = nextLayout.findIndex((card) => card.id === fromId)
    const toIndex = nextLayout.findIndex((card) => card.id === toId)

    if (fromIndex < 0 || toIndex < 0) return

    const [removed] = nextLayout.splice(fromIndex, 1)
    nextLayout.splice(toIndex, 0, removed)
    updateSobreLayout(nextLayout)
  }

  const moveBlock = (fromId, toId) => {
    if (!fromId || !toId || fromId === toId) return

    const nextLayout = [...layout]
    const fromIndex = nextLayout.findIndex((block) => block.id === fromId)
    const toIndex = nextLayout.findIndex((block) => block.id === toId)

    if (fromIndex < 0 || toIndex < 0) return

    const [removed] = nextLayout.splice(fromIndex, 1)
    nextLayout.splice(toIndex, 0, removed)
    updateBuilderLayout(nextLayout)
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setSaving(true)
    saveSiteContent(form)
    setTimeout(() => setSaving(false), 250)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-heading font-bold text-slate-100 mb-1">Gestão de Conteúdo</h1>
        <p className="text-slate-300 text-sm">Edite a página inicial e a página Sobre em áreas separadas.</p>
      </div>

      <div className="inline-flex rounded-xl border border-slate-700 bg-slate-900 p-1">
        {[
          { id: 'inicio', label: 'Início' },
          { id: 'sobre', label: 'Sobre' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-[#36ad55] text-white'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="flex justify-end">
          <button type="submit" className="btn-primary btn-sm" disabled={saving}>
            {saving ? 'Salvando...' : 'Salvar conteúdo'}
          </button>
        </div>

        {activeTab === 'inicio' ? (
          <>
            <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
              <aside className="card space-y-5 bg-slate-900 border border-slate-700 shadow-none">
                <div>
                  <h2 className="text-lg font-heading font-semibold text-slate-100 mb-3">Blocos</h2>
                  <div className="flex flex-wrap gap-2">
                    {BLOCK_LIBRARY.map((block) => (
                      <button
                        key={block.type}
                        type="button"
                        onClick={() => addBlock(block.type)}
                        className="btn btn-sm border border-slate-600 bg-slate-950 text-slate-100 hover:bg-slate-800"
                      >
                        + {block.label}
                      </button>
                    ))}
                  </div>
                </div>

                {selectedBlock ? (
                  <div className="space-y-4 border-t border-slate-700 pt-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Editar bloco</h3>
                      <button type="button" onClick={() => deleteBlock(selectedBlock.id)} className="text-xs text-rose-300 underline">Excluir</button>
                    </div>
                    {renderEditorFields(selectedBlock, (field, value) => updateBlock(selectedBlock.id, field, value))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-400">Selecione um bloco para editar.</p>
                )}
              </aside>

              <div className="card space-y-4 bg-slate-900 border border-slate-700 shadow-none">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-heading font-semibold text-slate-100">Preview da página inicial</h2>
                  <span className="text-xs uppercase tracking-[0.2em] text-slate-400">{layout.length} blocos</span>
                </div>

                <div className="builder-canvas">
                  {layout.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-600 bg-slate-950 p-8 text-center text-slate-400">
                      Nenhum bloco cadastrado ainda. Adicione uma seção para começar.
                    </div>
                  ) : (
                    layout.map((block) => (
                      <div
                        key={block.id}
                        draggable
                        onDragStart={() => setDraggedId(block.id)}
                        onDragOver={(event) => event.preventDefault()}
                        onDrop={() => {
                          moveBlock(draggedId, block.id)
                          setDraggedId(null)
                        }}
                        onClick={() => setSelectedId(block.id)}
                        className={`builder-block ${selectedId === block.id ? 'is-selected' : ''}`}
                      >
                        <div className="builder-block__toolbar">
                          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400">{block.type}</span>
                          <div className="flex gap-2">
                            <button type="button" onClick={(event) => { event.stopPropagation(); setSelectedId(block.id) }} className="text-xs text-slate-300">Editar</button>
                            <button type="button" onClick={(event) => { event.stopPropagation(); deleteBlock(block.id) }} className="text-xs text-rose-300">Remover</button>
                          </div>
                        </div>
                        {renderCanvasBlock(block)}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="card space-y-6 bg-slate-900 border border-slate-700 shadow-none">
              <div>
                <h2 className="text-lg font-heading font-semibold text-slate-100 mb-4">Configurações gerais da home</h2>
                <div className="space-y-4">
                  <div>
                    <label className="label text-slate-200">Eyebrow</label>
                    <input className="input bg-slate-950 text-slate-100 border-slate-600" value={form.home.eyebrow} onChange={onChange('home', 'eyebrow')} />
                  </div>
                  <div>
                    <label className="label text-slate-200">Título principal</label>
                    <input className="input bg-slate-950 text-slate-100 border-slate-600" value={form.home.title} onChange={onChange('home', 'title')} />
                  </div>
                  <div>
                    <label className="label text-slate-200">Descrição</label>
                    <textarea rows={3} className="input resize-none bg-slate-950 text-slate-100 border-slate-600" value={form.home.description} onChange={onChange('home', 'description')} />
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-6">
            <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
              <aside className="card space-y-5 bg-slate-900 border border-slate-700 shadow-none">
                <div>
                  <h2 className="text-lg font-heading font-semibold text-slate-100 mb-3">Cards da página Sobre</h2>
                  <button
                    type="button"
                    onClick={addSobreCard}
                    className="btn btn-sm border border-slate-600 bg-slate-950 text-slate-100 hover:bg-slate-800"
                  >
                    + Adicionar card
                  </button>
                </div>

                {selectedSobreCard ? (
                  <div className="space-y-4 border-t border-slate-700 pt-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Editar card</h3>
                      <button type="button" onClick={() => deleteSobreCard(selectedSobreCard.id)} className="text-xs text-rose-300 underline">Excluir</button>
                    </div>
                    <div>
                      <label className="label text-slate-200">Título</label>
                      <input
                        className="input bg-slate-950 text-slate-100 border-slate-600"
                        value={selectedSobreCard.title || ''}
                        onChange={(event) => updateSobreCard(selectedSobreCard.id, 'title', event.target.value)}
                      />
                    </div>
                    <div>
                      <label className="label text-slate-200">Conteúdo</label>
                      <textarea
                        rows={3}
                        className="input resize-none bg-slate-950 text-slate-100 border-slate-600"
                        value={selectedSobreCard.text || ''}
                        onChange={(event) => updateSobreCard(selectedSobreCard.id, 'text', event.target.value)}
                      />
                    </div>
                    <div>
                      <label className="label text-slate-200">URL da imagem</label>
                      <input
                        className="input bg-slate-950 text-slate-100 border-slate-600"
                        value={selectedSobreCard.imageUrl || ''}
                        onChange={(event) => updateSobreCard(selectedSobreCard.id, 'imageUrl', event.target.value)}
                        placeholder="https://..."
                      />
                    </div>
                    <div>
                      <label className="label text-slate-200">Cor de borda</label>
                      <input
                        type="color"
                        className="input bg-slate-950 border-slate-600 h-10"
                        value={selectedSobreCard.borderColor || '#36ad55'}
                        onChange={(event) => updateSobreCard(selectedSobreCard.id, 'borderColor', event.target.value)}
                      />
                    </div>
                    <div>
                      <label className="label text-slate-200">Cor de fundo</label>
                      <input
                        type="color"
                        className="input bg-slate-950 border-slate-600 h-10"
                        value={selectedSobreCard.backgroundColor || '#ffffff'}
                        onChange={(event) => updateSobreCard(selectedSobreCard.id, 'backgroundColor', event.target.value)}
                      />
                    </div>
                    <div>
                      <label className="label text-slate-200">Cor de texto</label>
                      <input
                        type="color"
                        className="input bg-slate-950 border-slate-600 h-10"
                        value={selectedSobreCard.textColor || '#101c43'}
                        onChange={(event) => updateSobreCard(selectedSobreCard.id, 'textColor', event.target.value)}
                      />
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-slate-400">Selecione um card para editar.</p>
                )}
              </aside>

              <div className="card space-y-4 bg-slate-900 border border-slate-700 shadow-none">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-heading font-semibold text-slate-100">Preview dos cards</h2>
                  <span className="text-xs uppercase tracking-[0.2em] text-slate-400">{sobreLayout.length} cards</span>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {sobreLayout.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-600 bg-slate-950 p-8 text-center text-slate-400 col-span-full">
                      Nenhum card cadastrado. Adicione um para começar.
                    </div>
                  ) : (
                    sobreLayout.map((card) => (
                      <div
                        key={card.id}
                        draggable
                        onDragStart={() => setDraggedId(card.id)}
                        onDragOver={(event) => event.preventDefault()}
                        onDrop={() => {
                          moveSobreCard(draggedId, card.id)
                          setDraggedId(null)
                        }}
                        onClick={() => setSelectedSobreCardId(card.id)}
                        style={{
                          borderColor: card.borderColor || '#36ad55',
                        }}
                        className={`group relative overflow-hidden rounded-[20px] border-4 p-6 text-left transition-all duration-500 ease-out min-h-[240px] hover:-translate-y-1 ${selectedSobreCardId === card.id ? 'shadow-[0_24px_60px_rgba(15,23,42,0.3)]' : 'shadow-lg'}`}
                      >
                        {card.imageUrl && (
                          <>
                            <img
                              src={card.imageUrl}
                              alt={card.title}
                              className="absolute inset-0 w-full h-full object-cover transition duration-700 ease-out group-hover:scale-110"
                            />
                            <span className="absolute inset-0 bg-slate-950/75" />
                          </>
                        )}
                        <div className="relative z-10 flex h-full flex-col justify-between">
                          <div>
                            <h3 className="font-heading font-bold text-xl mb-2 text-white">{card.title}</h3>
                            <p className="text-sm text-white/90 line-clamp-3">{card.text}</p>
                          </div>
                          <div className="mt-3 flex items-center justify-between">
                            <span className="text-xs text-white/70 uppercase tracking-wider">Card</span>
                            <button type="button" onClick={(event) => { event.stopPropagation(); deleteSobreCard(card.id) }} className="text-xs text-rose-300 hover:text-rose-200">Remover</button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="card space-y-6 bg-slate-900 border border-slate-700 shadow-none">
              <div>
                <h2 className="text-lg font-heading font-semibold text-slate-100 mb-4">Conteúdo da página Sobre</h2>
                <div className="space-y-4">
                  <div>
                    <label className="label text-slate-200">Título</label>
                    <input className="input bg-slate-950 text-slate-100 border-slate-600" value={form.sobre.title} onChange={onChange('sobre', 'title')} />
                  </div>
                  <div>
                    <label className="label text-slate-200">Subtítulo</label>
                    <input className="input bg-slate-950 text-slate-100 border-slate-600" value={form.sobre.subtitle} onChange={onChange('sobre', 'subtitle')} />
                  </div>
                  <div>
                    <label className="label text-slate-200">Missão</label>
                    <textarea rows={2} className="input resize-none bg-slate-950 text-slate-100 border-slate-600" value={form.sobre.mission} onChange={onChange('sobre', 'mission')} />
                  </div>
                  <div>
                    <label className="label text-slate-200">Visão</label>
                    <textarea rows={2} className="input resize-none bg-slate-950 text-slate-100 border-slate-600" value={form.sobre.vision} onChange={onChange('sobre', 'vision')} />
                  </div>
                  <div>
                    <label className="label text-slate-200">Valores</label>
                    <textarea rows={2} className="input resize-none bg-slate-950 text-slate-100 border-slate-600" value={form.sobre.values} onChange={onChange('sobre', 'values')} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}

export default AdminEditor
