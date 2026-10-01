import { useAuth } from '../../hooks/useAuth'

const CARDS = [
  { label: 'Mensagens',  key: 'mensagens',  color: 'bg-blue-50 text-blue-700'    },
  { label: 'Candidatos', key: 'candidatos', color: 'bg-purple-50 text-purple-700' },
  { label: 'Serviços',   key: 'servicos',   color: 'bg-green-50 text-green-700'  },
  { label: 'Usuários',   key: 'usuarios',   color: 'bg-orange-50 text-orange-700' },
]

export default function AdminDashboard() {
  const { user } = useAuth()

  return (
    <div>
      <h1 className="text-xl font-heading font-bold text-slate-100 mb-1">
        Olá, {user?.name?.split(' ')[0]} 👋
      </h1>
      <p className="text-sm text-slate-300 mb-8">
        Bem-vindo ao painel administrativo da RTA Ambiental.
      </p>

      {/* Resumo */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {CARDS.map(({ label, color }) => (
          <div key={label} className="card bg-slate-900 border border-slate-700 shadow-none">
            <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${color} inline-flex px-2 py-0.5 rounded-full`}>
              {label}
            </p>
            <p className="text-3xl font-heading font-bold text-slate-100">—</p>
            <p className="text-xs text-slate-400 mt-1">Carregando...</p>
          </div>
        ))}
      </div>

      <p className="text-sm text-slate-300">
        Use o menu lateral para gerenciar conteúdo, mensagens, candidatos e usuários.
      </p>
    </div>
  )
}
