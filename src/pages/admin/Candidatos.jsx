import { useEffect, useState } from 'react'
import { candidatosService } from '../../services/candidatos.service'
import LoadingSpinner from '../../components/common/LoadingSpinner'

const STATUS_OPTS = ['novo', 'em_análise', 'aprovado', 'recusado']

export default function AdminCandidatos() {
  const [candidatos, setCandidatos] = useState([])
  const [loading,    setLoading]    = useState(true)

  useEffect(() => {
    candidatosService.listar()
      .then(setCandidatos)
      .finally(() => setLoading(false))
  }, [])

  const atualizarStatus = async (id, status) => {
    await candidatosService.atualizarStatus(id, status)
    setCandidatos(cs => cs.map(c => c.id === id ? { ...c, status } : c))
  }

  if (loading) return <LoadingSpinner fullPage={false} />

  return (
    <div>
      <h1 className="text-xl font-heading font-bold text-slate-100 mb-6">Banco de Talentos</h1>

      {candidatos.length === 0 ? (
        <p className="text-slate-300 text-sm">Nenhuma candidatura recebida.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-700 bg-slate-900 shadow-lg shadow-slate-950/20">
          <table className="w-full text-sm">
            <thead className="bg-slate-800/80 border-b border-slate-700">
              <tr>
                {['Nome', 'E-mail', 'Área', 'Currículo', 'Status', ''].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-300 uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {candidatos.map((c) => (
                <tr key={c.id} className="hover:bg-slate-800/60 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-100">{c.nome}</td>
                  <td className="px-4 py-3 text-slate-300">{c.email}</td>
                  <td className="px-4 py-3 text-slate-300 capitalize">{c.area}</td>
                  <td className="px-4 py-3">
                    {c.curriculoUrl
                      ? <a href={c.curriculoUrl} target="_blank" rel="noopener" className="text-emerald-300 hover:underline text-xs">Ver PDF</a>
                      : <span className="text-slate-400 text-xs">—</span>
                    }
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={c.status ?? 'novo'}
                      onChange={(e) => atualizarStatus(c.id, e.target.value)}
                      className="text-xs border border-slate-600 rounded-lg px-2 py-1 bg-slate-950 text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    >
                      {STATUS_OPTS.map((s) => (
                        <option key={s} value={s}>{s === 'em_análise' ? 'em análise' : s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
