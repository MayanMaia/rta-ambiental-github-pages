import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { usuariosService } from '../../services/usuarios.service'
import { validators } from '../../utils/validators'
import LoadingSpinner from '../../components/common/LoadingSpinner'

const ROLES = ['admin', 'editor', 'marketing', 'comercial', 'atendimento']

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [showForm, setShowForm] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm()

  useEffect(() => {
    usuariosService.listar()
      .then((dados) => setUsuarios(dados))
      .finally(() => setLoading(false))
  }, [])

  const onSubmit = async (dados) => {
    const payload = {
      nome: dados.nome,
      email: dados.email,
      role: dados.role,
      status: 'ativo',
    }
    const novo = await usuariosService.criar(payload)
    setUsuarios(us => [novo, ...us])
    reset()
    setShowForm(false)
  }

  const excluir = async (id) => {
    if (!confirm('Excluir este usuário?')) return
    await usuariosService.excluir(id)
    setUsuarios(us => us.filter(u => u.id !== id))
  }

  if (loading) return <LoadingSpinner fullPage={false} />

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-heading font-bold text-slate-100">Usuários</h1>
        <button onClick={() => setShowForm(s => !s)} className="btn-primary btn-sm">
          {showForm ? 'Cancelar' : '+ Novo usuário'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="card mb-6 space-y-4 max-w-md bg-slate-900 border border-slate-700 shadow-none">
          <h2 className="font-semibold text-slate-100">Novo usuário</h2>
          <div>
            <label className="label text-slate-200">Nome</label>
            <input className={`input bg-slate-950 text-slate-100 border-slate-600 ${errors.nome ? 'input-error' : ''}`} {...register('nome', { required: 'Obrigatório' })} />
            {errors.nome && <p className="text-red-400 text-xs mt-1">{errors.nome.message}</p>}
          </div>
          <div>
            <label className="label text-slate-200">E-mail</label>
            <input type="email" className={`input bg-slate-950 text-slate-100 border-slate-600 ${errors.email ? 'input-error' : ''}`} {...register('email', validators.email)} />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="label text-slate-200">Perfil</label>
            <select className="input bg-slate-950 text-slate-100 border-slate-600" {...register('role', { required: 'Obrigatório' })}>
              {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label className="label text-slate-200">Senha temporária</label>
            <input type="password" className="input bg-slate-950 text-slate-100 border-slate-600" {...register('password', { required: 'Obrigatório', minLength: { value: 8, message: 'Mínimo 8 caracteres' } })} />
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
          </div>
          <button type="submit" disabled={isSubmitting} className="btn-primary">
            {isSubmitting ? 'Criando...' : 'Criar usuário'}
          </button>
        </form>
      )}

      <div className="overflow-x-auto rounded-2xl border border-slate-700 bg-slate-900 shadow-lg shadow-slate-950/20">
        <table className="w-full text-sm">
          <thead className="bg-slate-800/80 border-b border-slate-700">
            <tr>
              {['Nome', 'E-mail', 'Perfil', ''].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-300 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {usuarios.map(u => (
              <tr key={u.id} className="hover:bg-slate-800/60 transition-colors">
                <td className="px-4 py-3 font-medium text-slate-100">{u.nome ?? u.name}</td>
                <td className="px-4 py-3 text-slate-300">{u.email}</td>
                <td className="px-4 py-3"><span className="badge-primary capitalize">{u.role}</span></td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => excluir(u.id)} className="text-red-300 hover:text-red-200 text-xs font-medium">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
