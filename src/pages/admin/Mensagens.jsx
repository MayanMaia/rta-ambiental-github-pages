import { useEffect, useState } from 'react'
import { contatoService } from '../../services/contato.service'
import LoadingSpinner from '../../components/common/LoadingSpinner'

export default function AdminMensagens() {
  const [mensagens, setMensagens] = useState([])
  const [loading,   setLoading]   = useState(true)

  useEffect(() => {
    contatoService.listar()
      .then(setMensagens)
      .finally(() => setLoading(false))
  }, [])

  const marcarLida = async (id) => {
    await contatoService.marcarLida(id)
    setMensagens(ms => ms.map(m => m.id === id ? { ...m, lida: true } : m))
  }

  const excluir = async (id) => {
    if (!confirm('Excluir esta mensagem?')) return
    await contatoService.excluir(id)
    setMensagens(ms => ms.filter(m => m.id !== id))
  }

  if (loading) return <LoadingSpinner fullPage={false} />

  return (
    <div>
      <h1 className="text-xl font-heading font-bold text-slate-100 mb-6">Mensagens</h1>

      {mensagens.length === 0 ? (
        <p className="text-slate-300 text-sm">Nenhuma mensagem recebida.</p>
      ) : (
        <div className="space-y-4">
          {mensagens.map((m) => (
            <div key={m.id} className={`card bg-slate-900 border border-slate-700 ${m.lida ? 'opacity-60' : ''}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-semibold text-slate-100 text-sm">{m.nome}</p>
                  <p className="text-xs text-slate-300">{m.email} {m.telefone ? `· ${m.telefone}` : ''}</p>
                  {m.empresa && <p className="text-xs text-slate-300">{m.empresa}</p>}
                  <p className="text-sm text-slate-200 mt-3 whitespace-pre-line">{m.mensagem}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  {!m.lida && (
                    <button onClick={() => marcarLida(m.id)} className="btn-ghost btn-sm text-xs text-slate-200 hover:bg-slate-800">
                      Marcar lida
                    </button>
                  )}
                  <button onClick={() => excluir(m.id)} className="btn-sm btn text-red-300 hover:bg-red-500/10 text-xs">
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
