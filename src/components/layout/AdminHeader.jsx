import { useNavigate } from 'react-router-dom'
import { LogOut, Bell, RotateCcw, PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { resetMockData } from '../../mock/index'

export default function AdminHeader({ collapsed = false, onToggleSidebar }) {
  const { logout } = useAuth()
  const navigate   = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  const handleResetMock = () => {
    if (!window.confirm('Resetar todos os dados mockados? Isso limpa serviços, usuários, mensagens e conteúdo do mock.')) {
      return
    }

    resetMockData()
    window.location.reload()
  }

  return (
    <header className="h-14 bg-[#111827] border-b border-slate-700/80 flex items-center justify-between px-6 gap-3 sticky top-0 z-30">
      <button
        type="button"
        onClick={onToggleSidebar}
        className="p-2 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors"
        aria-label={collapsed ? 'Expandir sidebar' : 'Recolher sidebar'}
        title={collapsed ? 'Expandir sidebar' : 'Recolher sidebar'}
      >
        {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
      </button>

      <div className="ml-auto flex items-center gap-3">
        <button className="p-2 rounded-lg text-slate-300 hover:bg-slate-800 relative" aria-label="Notificações">
          <Bell size={18} />
        </button>
        <button
          onClick={handleResetMock}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-amber-200 hover:bg-amber-500/10 border border-amber-500/40 transition-colors"
          title="Resetar dados mockados"
        >
          <RotateCcw size={15} />
          Reset mock
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-slate-200 hover:bg-red-500/10 hover:text-red-300 transition-colors"
        >
          <LogOut size={16} />
          Sair
        </button>
      </div>
    </header>
  )
}
