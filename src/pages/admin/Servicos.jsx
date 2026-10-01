import { useEffect, useState } from 'react'
import { servicosService } from '../../services/servicos.service'
import LoadingSpinner from '../../components/common/LoadingSpinner'

const emptyForm = {
  nome: '',
  slug: '',
  categoria: 'tecnologia',
  descricao: '',
  conteudo: '',
  imagem: '',
}

export default function AdminServicos() {
  const [servicos, setServicos] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)

  const loadServicos = async () => {
    const dados = await servicosService.listar()
    setServicos(dados)
  }

  useEffect(() => {
    loadServicos().finally(() => setLoading(false))
  }, [])

  const resetForm = () => {
    setForm(emptyForm)
    setEditingId(null)
    setShowForm(false)
  }

  const openCreate = () => {
    setEditingId(null)
    setForm(emptyForm)
    setShowForm(true)
  }

  const openEdit = (servico) => {
    setEditingId(servico.id)
    setForm({
      nome: servico.nome,
      slug: servico.slug,
      categoria: servico.categoria === 'consultoria' ? 'consultoria' : 'tecnologia',
      descricao: servico.descricao,
      conteudo: servico.conteudo || servico.descricao,
      imagem: servico.imagem || '',
    })
    setShowForm(true)
  }

  const onChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()

    const nome = form.nome.trim()
    const descricao = form.descricao.trim()
    if (!nome || !descricao) return

    const payload = {
      nome,
      slug: form.slug.trim() || nome.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      categoria: form.categoria === 'consultoria' ? 'consultoria' : 'tecnologia',
      descricao,
      conteudo: form.conteudo.trim() || `<p>${descricao}</p>`,
      imagem: form.imagem?.trim() || '',
    }

    if (editingId) {
      await servicosService.atualizar(editingId, payload)
    } else {
      await servicosService.criar(payload)
    }

    await loadServicos()
    resetForm()
  }

  const excluir = async (id) => {
    if (!confirm('Excluir este serviço?')) return
    await servicosService.excluir(id)
    setServicos((ss) => ss.filter((s) => s.id !== id))
  }

  if (loading) return <LoadingSpinner fullPage={false} />

  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-4">
        <h1 className="text-xl font-heading font-bold text-slate-100">Serviços</h1>
        <button onClick={openCreate} className="btn-primary btn-sm">+ Novo serviço</button>
      </div>

      {showForm && (
        <form onSubmit={onSubmit} className="card mb-6 space-y-4 bg-slate-900 border border-slate-700 shadow-none">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-semibold text-slate-100">{editingId ? 'Editar serviço' : 'Novo serviço'}</h2>
            <button type="button" onClick={resetForm} className="btn-ghost btn-sm text-xs text-slate-200 hover:bg-slate-800">Cancelar</button>
          </div>

          <div>
            <label className="label text-slate-200">Nome</label>
            <input name="nome" value={form.nome} onChange={onChange} className="input bg-slate-950 text-slate-100 border-slate-600" required />
          </div>

          <div>
            <label className="label text-slate-200">Slug</label>
            <input name="slug" value={form.slug} onChange={onChange} className="input bg-slate-950 text-slate-100 border-slate-600" placeholder="ex: consultoria-ambiental" />
          </div>

          <div>
            <label className="label text-slate-200">Categoria</label>
            <select name="categoria" value={form.categoria} onChange={onChange} className="input bg-slate-950 text-slate-100 border-slate-600">
              <option value="tecnologia">Tecnologia</option>
              <option value="consultoria">Consultoria</option>
            </select>
          </div>

          <div>
            <label className="label text-slate-200">Descrição curta</label>
            <textarea name="descricao" value={form.descricao} onChange={onChange} rows={3} className="input resize-none bg-slate-950 text-slate-100 border-slate-600" required />
          </div>

          <div>
            <label className="label text-slate-200">Conteúdo</label>
            <textarea name="conteudo" value={form.conteudo} onChange={onChange} rows={5} className="input resize-none bg-slate-950 text-slate-100 border-slate-600" />
          </div>

          <div>
            <label className="label text-slate-200">Imagem de destaque (URL opcional)</label>
            <input
              name="imagem"
              value={form.imagem}
              onChange={onChange}
              className="input bg-slate-950 text-slate-100 border-slate-600"
              placeholder="https://images.unsplash.com/..."
            />
          </div>

          <div className="flex justify-end gap-3">
            <button type="button" onClick={resetForm} className="btn-ghost btn-sm text-slate-200 hover:bg-slate-800">Cancelar</button>
            <button type="submit" className="btn-primary btn-sm">
              {editingId ? 'Salvar alterações' : 'Criar serviço'}
            </button>
          </div>
        </form>
      )}

      {servicos.length === 0 ? (
        <p className="text-slate-300 text-sm">Nenhum serviço cadastrado.</p>
      ) : (
        <div className="space-y-3">
          {servicos.map((s) => (
            <div key={s.id} className="card flex items-center justify-between gap-4 bg-slate-900 border border-slate-700 shadow-none">
              <div>
                <p className="font-medium text-slate-100">{s.nome}</p>
                <p className="text-xs text-slate-400">{s.slug}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => openEdit(s)} className="btn-ghost btn-sm text-xs text-emerald-300 hover:bg-slate-800">Editar</button>
                <button onClick={() => excluir(s.id)} className="btn-sm btn text-red-300 hover:bg-red-500/10 text-xs">Excluir</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
