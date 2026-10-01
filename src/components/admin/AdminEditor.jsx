import { useEffect, useState } from 'react'
import {
  ChevronDown, Copy, Eye, Image, Layout, Monitor,
  Palette, PanelRight, Plus, Redo2, Save, Smartphone, Tablet, Trash2, Type, Undo2,
  X, Zap,
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { getSiteVersions, publishSiteContent, saveSiteDraft } from '../../mock/content'
import { useElementEditor } from '../../hooks/useElementEditor'

const BLOCKS = [
  { type: 'hero', label: 'Hero', icon: Zap },
  { type: 'text', label: 'Texto', icon: Type },
  { type: 'media', label: 'Imagem', icon: Image },
  { type: 'cards', label: 'Cards', icon: Layout },
  { type: 'cta', label: 'CTA', icon: Palette },
]

const newBlock = (type) => {
  const id = `${type}-${Date.now()}`
  const common = { id, type, backgroundColor: '#ffffff', textColor: '#101c43', accentColor: '#36ad55' }
  if (type === 'hero') return { ...common, title: 'Novo destaque', eyebrow: 'Sua mensagem', description: 'Apresente aqui a proposta principal.', backgroundImage: '', ctaPrimaryText: 'Saiba mais' }
  if (type === 'text') return { ...common, title: 'Nova seção', description: 'Uma explicação breve.', body: 'Escreva o conteúdo desta seção.' }
  if (type === 'media') return { ...common, title: 'Imagem e conteúdo', description: 'Explique sua proposta.', body: 'Uma mensagem que complementa o visual.', imageUrl: '', buttonText: 'Saiba mais' }
  if (type === 'cards') return { ...common, title: 'Soluções', description: 'Conheça nossas frentes.', items: [{ title: 'Novo item', text: 'Descrição do item.' }] }
  return { ...common, backgroundColor: '#101c43', textColor: '#ffffff', title: 'Próximo passo', description: 'Vamos conversar sobre o seu projeto.', buttonText: 'Fale conosco' }
}

const textField = (label, value, onChange, multiline = false) => (
  <label className="block space-y-1">
    <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">{label}</span>
    {multiline ? <textarea rows={4} className="admin-editor-input resize-y" value={value || ''} onChange={(event) => onChange(event.target.value)} /> : <input className="admin-editor-input" value={value || ''} onChange={(event) => onChange(event.target.value)} />}
  </label>
)

function Selectable({ active, label, onClick, children }) {
  return <div className={`editor-selectable ${active ? 'is-active' : ''}`} data-editor-label={label} onClick={(event) => { event.stopPropagation(); onClick() }}>{children}</div>
}

function BlockPreview({ block, selectedElement, selectElement }) {
  const select = (element) => selectElement(block.id, element)
  const text = (field, content, tag = 'p') => <Selectable active={selectedElement === `${block.id}:${field}`} label={`<${tag}>`} onClick={() => select(field)}>{tag === 'h1' ? <h1>{content}</h1> : tag === 'h2' ? <h2>{content}</h2> : <p>{content}</p>}</Selectable>
  const style = {
    backgroundColor: block.backgroundColor,
    color: block.textColor,
    fontSize: block.fontSize,
    fontWeight: block.fontWeight,
    textAlign: block.textAlign,
    opacity: block.opacity ? Number.parseInt(block.opacity, 10) / 100 : undefined,
    width: block.width && block.width !== 'auto' ? block.width : undefined,
    minHeight: block.height && block.height !== 'auto' ? block.height : undefined,
    padding: block.padding,
    margin: block.margin,
    display: block.display,
  }

  if (block.type === 'hero') return <section className="editor-preview-block editor-preview-hero" style={{ ...style, backgroundImage: block.backgroundImage ? `linear-gradient(90deg, rgba(7,17,40,.86), rgba(7,17,40,.28)), url('${block.backgroundImage}')` : undefined }}>
    <div className="editor-preview-inner"><Selectable active={selectedElement === `${block.id}:eyebrow`} label="<p>" onClick={() => select('eyebrow')}><span className="editor-eyebrow">{block.eyebrow}</span></Selectable>{text('title', block.title, 'h1')}{text('description', block.description)}<div className="flex flex-wrap gap-2"><Selectable active={selectedElement === `${block.id}:ctaPrimaryText`} label="<a>" onClick={() => select('ctaPrimaryText')}><span className="editor-preview-button">{block.ctaPrimaryText || 'Saiba mais'}</span></Selectable></div></div>
  </section>
  if (block.type === 'media') return <section className="editor-preview-block grid gap-6 md:grid-cols-2" style={style}><Selectable active={selectedElement === `${block.id}:imageUrl`} label="<img>" onClick={() => select('imageUrl')}><img className="editor-preview-image" src={block.imageUrl || import.meta.env.BASE_URL + 'imagens-docx/image15.jpg'} alt={block.title} /></Selectable><div className="self-center">{text('title', block.title, 'h2')}{text('description', block.description)}{text('body', block.body)}</div></section>
  if (block.type === 'cards') return <section className="editor-preview-block" style={style}>{text('title', block.title, 'h2')}{text('description', block.description)}<div className="mt-5 grid gap-3 md:grid-cols-3">{(block.items || []).map((item, index) => <div key={`${item.title}-${index}`} className="rounded-xl bg-white/90 p-4 text-slate-900"><strong>{item.title}</strong><p className="mt-2 text-xs">{item.text}</p></div>)}</div></section>
  if (block.type === 'card') return <section className="editor-preview-block" style={style}><Selectable active={selectedElement === `${block.id}:title`} label="<h3>" onClick={() => select('title')}><h2>{block.title}</h2></Selectable><Selectable active={selectedElement === `${block.id}:text`} label="<p>" onClick={() => select('text')}><p>{block.text}</p></Selectable>{block.imageUrl ? <Selectable active={selectedElement === `${block.id}:imageUrl`} label="<img>" onClick={() => select('imageUrl')}><img className="editor-preview-image mt-4 max-h-48" src={block.imageUrl} alt={block.title || 'Imagem do card'} /></Selectable> : null}</section>
  return <section className="editor-preview-block flex flex-col justify-between gap-5 md:flex-row md:items-center" style={style}><div>{text('title', block.title, 'h2')}{text('description', block.description)}</div><Selectable active={selectedElement === `${block.id}:buttonText`} label="<a>" onClick={() => select('buttonText')}><span className="editor-preview-button" style={{ backgroundColor: block.accentColor }}>{block.buttonText || 'Fale conosco'}</span></Selectable></section>
}

function PropertyPanel({ block, element, update, tab }) {
  if (!block) return <div className="p-5 text-sm text-slate-400">Selecione um bloco ou elemento no preview.</div>
  const field = element?.split(':')[1] || 'title'
  const contentFields = block.type === 'hero' ? ['eyebrow', 'title', 'description', 'ctaPrimaryText', 'ctaPrimaryLink', 'backgroundImage'] : block.type === 'media' ? ['title', 'description', 'body', 'imageUrl', 'buttonText', 'buttonLink'] : ['title', 'description', 'body', 'buttonText', 'buttonLink']
  const updateField = (name, value) => update(name, value)
  if (tab === 'content') return <div className="space-y-5 p-5">
    <div className="flex items-center justify-between"><div><p className="text-[10px] uppercase tracking-[0.2em] text-emerald-400">Elemento selecionado</p><h3 className="mt-1 font-semibold text-white">{field}</h3></div><span className="rounded bg-slate-800 px-2 py-1 text-[10px] text-slate-400">{block.type}</span></div>
    <div className="space-y-4">{contentFields.includes(field) && textField(field === 'title' ? 'Texto' : field, block[field], (value) => updateField(field, value), field === 'description' || field === 'body')}{!contentFields.includes(field) && textField('Texto', block[field], (value) => updateField(field, value))}</div>
  </div>
  if (tab === 'typography') return <div className="space-y-4 p-5"><p className="text-xs text-slate-400">A tipografia é aplicada ao bloco selecionado em tempo real.</p><div className="grid grid-cols-2 gap-3">{textField('Tamanho', block.fontSize || '16px', (value) => updateField('fontSize', value))}{textField('Peso', block.fontWeight || '400', (value) => updateField('fontWeight', value))}</div>{textField('Cor', block.textColor || '#101c43', (value) => updateField('textColor', value))}{textField('Alinhamento', block.textAlign || 'left', (value) => updateField('textAlign', value))}</div>
  if (tab === 'layout') return <div className="space-y-4 p-5"><div className="grid grid-cols-2 gap-3">{textField('Largura', block.width || 'auto', (value) => updateField('width', value))}{textField('Altura', block.height || 'auto', (value) => updateField('height', value))}{textField('Padding', block.padding || '32px', (value) => updateField('padding', value))}{textField('Margem', block.margin || '0', (value) => updateField('margin', value))}</div>{textField('Display', block.display || 'block', (value) => updateField('display', value))}</div>
  if (tab === 'appearance') return <div className="space-y-4 p-5">{textField('Cor de fundo', block.backgroundColor || '#ffffff', (value) => updateField('backgroundColor', value))}{textField('Cor de destaque', block.accentColor || '#36ad55', (value) => updateField('accentColor', value))}{textField('Opacidade', block.opacity || '100%', (value) => updateField('opacity', value))}{textField('Imagem de fundo', block.backgroundImage || block.imageUrl || '', (value) => updateField(block.type === 'media' ? 'imageUrl' : 'backgroundImage', value))}</div>
  return <div className="space-y-4 p-5">{textField('ID do elemento', block.htmlId || '', (value) => updateField('htmlId', value))}{textField('Classes CSS', block.className || '', (value) => updateField('className', value))}{textField('Atributo aria-label', block.ariaLabel || '', (value) => updateField('ariaLabel', value))}<p className="text-xs leading-relaxed text-slate-500">Use classes existentes do site. Conteúdo inserido é tratado como texto para evitar HTML inseguro.</p></div>
}

export default function AdminEditor() {
  const editor = useElementEditor()
  const { user } = useAuth()
  const [device, setDevice] = useState('desktop')
  const [zoom, setZoom] = useState('100')
  const [selectedElement, setSelectedElement] = useState(null)
  const [activeTab, setActiveTab] = useState('content')
  const [versions, setVersions] = useState(() => getSiteVersions())
  const [message, setMessage] = useState('')
  const selectedBlock = editor.selected

  useEffect(() => {
    setSelectedElement(null)
  }, [editor.page])

  useEffect(() => {
    if (!editor.selectedId) {
      setSelectedElement(null)
    } else if (selectedElement && !selectedElement.startsWith(`${editor.selectedId}:`)) {
      setSelectedElement(`${editor.selectedId}:title`)
    }
  }, [editor.selectedId, selectedElement])

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Delete' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName)) editor.removeSelected()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [editor.removeSelected])

  const selectElement = (id, element) => { editor.setSelectedId(id); setSelectedElement(`${id}:${element}`) }
  const update = (field, value) => editor.updateSelected(field, value)
  const addNewBlock = (type = 'hero') => { const block = newBlock(type); editor.addBlock(block); selectElement(block.id, 'title') }
  const save = () => { saveSiteDraft(editor.content); setMessage('Rascunho salvo'); window.setTimeout(() => setMessage(''), 2200) }
  const publish = () => { const version = publishSiteContent(editor.content, user?.name || 'Administrador'); setVersions((items) => [version, ...items]); setMessage('Publicado com sucesso'); window.setTimeout(() => setMessage(''), 2200) }
  const duplicate = () => { if (!selectedBlock) return; const copy = { ...selectedBlock, id: `${selectedBlock.type}-${Date.now()}` }; editor.addBlock(copy); selectElement(copy.id, 'title') }
  const restore = (version) => { editor.updateContent(version.content); setMessage('Versão restaurada como rascunho'); window.setTimeout(() => setMessage(''), 2200) }
  const canvasWidth = device === 'mobile' ? 390 : device === 'tablet' ? 768 : 1200
  const tabs = [['content', 'Conteúdo'], ['typography', 'Tipografia'], ['layout', 'Dimensões'], ['appearance', 'Aparência'], ['advanced', 'Avançado']]

  return <div className="admin-editor-shell">
    <header className="admin-editor-toolbar"><div className="flex min-w-0 items-center gap-3"><div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400"><Zap size={16} /></div><div className="hidden min-w-0 sm:block"><h1 className="truncate text-sm font-semibold text-white">Editor visual</h1><p className="text-[10px] text-slate-500">RTA Ambiental / {editor.page === 'home' ? 'Início' : 'Sobre'}</p></div><select value={editor.page} onChange={(event) => editor.setPage(event.target.value)} className="admin-editor-select"><option value="home">Início</option><option value="sobre">Sobre</option></select></div><div className="flex items-center gap-1"><button className="editor-icon-button" onClick={editor.undo} disabled={!editor.canUndo} title="Desfazer"><Undo2 size={16} /></button><button className="editor-icon-button" onClick={editor.redo} disabled={!editor.canRedo} title="Refazer"><Redo2 size={16} /></button><span className="mx-2 hidden text-[11px] text-slate-500 md:block">{editor.saveState === 'unsaved' ? 'Alterações pendentes' : editor.saveState === 'autosaved' ? 'Salvo automaticamente' : 'Salvo'}</span><button className="editor-secondary-button" onClick={save}><Save size={14} /> <span className="hidden sm:inline">Salvar rascunho</span></button><button className="editor-publish-button" onClick={publish}><Zap size={14} /> Publicar</button></div></header>
    <div className="admin-editor-body">
      <aside className="admin-editor-left"><div className="editor-panel-heading"><span>Estrutura</span><button className="editor-icon-button" onClick={() => addNewBlock()} title="Adicionar bloco"><Plus size={15} /></button></div><div className="space-y-1 p-3">{editor.layout.map((block, index) => <button key={block.id} onClick={() => selectElement(block.id, 'title')} className={`editor-tree-item ${editor.selectedId === block.id ? 'is-active' : ''}`}><ChevronDown size={13} className="text-slate-500" /><span className="truncate">{index + 1}. {block.type}</span></button>)}</div><div className="border-t border-slate-800 p-3"><p className="mb-2 text-[10px] uppercase tracking-[0.16em] text-slate-500">Adicionar</p><div className="grid grid-cols-2 gap-2">{BLOCKS.map(({ type, label, icon: Icon }) => <button key={type} onClick={() => addNewBlock(type)} className="editor-add-button"><Icon size={13} /> {label}</button>)}</div></div><div className="mt-auto border-t border-slate-800 p-3 text-[11px] text-slate-500"><p className="mb-2 uppercase tracking-[0.16em]">Atalhos</p><p>Ctrl + Z desfazer</p><p>Ctrl + Y refazer</p><p>Delete excluir seleção</p></div></aside>
      <main className="admin-editor-canvas-area"><div className="editor-canvas-controls"><div className="flex items-center gap-1"><button className={`editor-device-button ${device === 'desktop' ? 'is-active' : ''}`} onClick={() => setDevice('desktop')} title="Desktop"><Monitor size={15} /></button><button className={`editor-device-button ${device === 'tablet' ? 'is-active' : ''}`} onClick={() => setDevice('tablet')} title="Tablet"><Tablet size={15} /></button><button className={`editor-device-button ${device === 'mobile' ? 'is-active' : ''}`} onClick={() => setDevice('mobile')} title="Mobile"><Smartphone size={15} /></button></div><div className="flex items-center gap-3"><span className="hidden text-[11px] text-slate-500 md:block">Preview responsivo</span><select value={zoom} onChange={(event) => setZoom(event.target.value)} className="admin-editor-select"><option value="50">50%</option><option value="75">75%</option><option value="100">100%</option><option value="125">125%</option></select><button className="editor-icon-button" title="Visualizar página"><Eye size={15} /></button></div></div><div className="editor-canvas-scroll"><div className="editor-canvas-frame" style={{ width: `${canvasWidth}px`, transform: `scale(${Number(zoom) / 100})`, transformOrigin: 'top center' }}>{editor.layout.map((block) => <div key={block.id} className={`editor-block-wrapper ${editor.selectedId === block.id ? 'is-selected' : ''}`} onClick={() => selectElement(block.id, 'title')}><div className="editor-block-label">{block.type}</div><BlockPreview block={block} selectedElement={selectedElement} selectElement={selectElement} /></div>)}</div></div></main>
      <aside className="admin-editor-right"><div className="editor-panel-heading"><span className="flex items-center gap-2"><PanelRight size={15} /> Propriedades</span><div className="flex gap-1"><button className="editor-icon-button" onClick={duplicate} title="Duplicar"><Copy size={14} /></button><button className="editor-icon-button" onClick={editor.removeSelected} title="Excluir"><Trash2 size={14} /></button><button className="editor-icon-button" title="Fechar painel"><X size={15} /></button></div></div><nav className="editor-tabs">{tabs.map(([id, label]) => <button key={id} onClick={() => setActiveTab(id)} className={activeTab === id ? 'is-active' : ''}>{label}</button>)}</nav><PropertyPanel block={selectedBlock} element={selectedElement} update={update} tab={activeTab} /><div className="mt-auto border-t border-slate-800 p-4"><div className="mb-3 flex items-center justify-between"><span className="text-[10px] uppercase tracking-[0.16em] text-slate-500">Histórico</span><span className="text-[10px] text-slate-600">{versions.length} versões</span></div>{versions.slice(0, 3).map((version) => <div key={version.id} className="mb-2 flex items-center justify-between gap-2 text-[11px] text-slate-400"><span>{new Date(version.createdAt).toLocaleDateString('pt-BR')}</span><button className="text-emerald-400 hover:text-emerald-300" onClick={() => restore(version)}>Restaurar</button></div>)}</div></aside>
    </div>{message && <div className="editor-toast"><Zap size={15} /> {message}</div>}
  </div>
}
