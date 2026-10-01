import { useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import AdminSidebar from '../components/layout/AdminSidebar'
import AdminHeader  from '../components/layout/AdminHeader'

export default function AdminLayout() {
  const { user, loading } = useAuth()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  if (loading) return null
  if (!user)   return <Navigate to="/admin/login" replace />

  return (
    <div className="flex min-h-dvh bg-[#0f172a] text-slate-100">
      <AdminSidebar collapsed={sidebarCollapsed} />
      <div className="flex-1 flex flex-col min-w-0 bg-[#111827]">
        <AdminHeader
          collapsed={sidebarCollapsed}
          onToggleSidebar={() => setSidebarCollapsed((prev) => !prev)}
        />
        <main className="flex-1 p-6 overflow-auto bg-[#0f172a]">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
