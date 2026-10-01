import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, FileText, Briefcase,
  MessageSquare, Users, UserCog, ChevronRight
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

const NAV = [
  { to: '/admin',            label: 'Dashboard',  icon: LayoutDashboard, exact: true },
  { to: '/admin/conteudo',   label: 'Conteúdo',   icon: FileText         },
  { to: '/admin/servicos',   label: 'Serviços',   icon: Briefcase        },
  { to: '/admin/mensagens',  label: 'Mensagens',  icon: MessageSquare    },
  { to: '/admin/candidatos', label: 'Candidatos', icon: Users            },
  { to: '/admin/usuarios',   label: 'Usuários',   icon: UserCog          },
]

// Rotas visíveis por perfil
const ROLE_ACCESS = {
  admin:      ['*'],
  marketing:  ['/admin', '/admin/conteudo', '/admin/servicos'],
  comercial:  ['/admin', '/admin/mensagens'],
  atendimento:['/admin', '/admin/mensagens', '/admin/candidatos'],
}

export default function AdminSidebar({ collapsed = false }) {
  const { user } = useAuth()
  const allowed  = ROLE_ACCESS[user?.role] ?? []
  const canSee   = (to) => allowed.includes('*') || allowed.includes(to)

  return (
    <aside className={`hidden md:flex flex-col min-h-dvh bg-[#111827] border-r border-slate-700/80 transition-all duration-200 ${collapsed ? 'w-20' : 'w-60'}`}>
      {/* Logo */}
      <div className={`border-b border-slate-700/80 ${collapsed ? 'px-3 py-4' : 'px-6 py-5'}`}>
        <p className="font-heading font-bold text-[#36ad55] text-center">{collapsed ? 'R' : 'RTA Ambiental'}</p>
        {!collapsed && <p className="text-xs text-slate-400 mt-0.5">Painel Administrativo</p>}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV.filter(({ to }) => canSee(to)).map(({ to, label, icon: Icon, exact }) => (
          <NavLink
            key={to}
            to={to}
            end={exact}
            title={collapsed ? label : undefined}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl text-sm font-medium transition-colors ${collapsed ? 'justify-center px-2 py-2.5' : 'px-3 py-2.5'}
               ${isActive
                 ? 'bg-[#1e293b] text-white shadow-inner'
                 : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`
            }
          >
            <Icon size={17} />
            {!collapsed && <span className="flex-1">{label}</span>}
            {!collapsed && <ChevronRight size={13} className="opacity-40" />}
          </NavLink>
        ))}
      </nav>

      {/* Usuário */}
      <div className={`border-t border-slate-700/80 ${collapsed ? 'px-2 py-4' : 'px-4 py-4'}`}>
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'}`}>
          <div className="w-8 h-8 rounded-full bg-[#1e293b] flex items-center justify-center text-[#36ad55] text-xs font-bold border border-slate-600">
            {user?.name?.charAt(0).toUpperCase() ?? 'A'}
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-100 truncate">{user?.name}</p>
              <p className="text-xs text-slate-400 capitalize">{user?.role}</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
