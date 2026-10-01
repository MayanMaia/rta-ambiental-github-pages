import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom'
import { Suspense, lazy, useEffect, useState } from 'react'

import PublicLayout  from './layouts/PublicLayout'
import AdminLayout   from './layouts/AdminLayout'
import LoadingSpinner from './components/common/LoadingSpinner'
import { servicosService } from './services/servicos.service'

// Lazy loading das páginas públicas
const Home            = lazy(() => import('./pages/Home'))
const Sobre           = lazy(() => import('./pages/Sobre'))
const Servicos        = lazy(() => import('./pages/Servicos'))
const ServicoDetalhe  = lazy(() => import('./pages/ServicoDetalhe'))
const Contato         = lazy(() => import('./pages/Contato'))
const News            = lazy(() => import('./pages/News'))
const Privacidade     = lazy(() => import('./pages/Privacidade'))
const NaoEncontrado   = lazy(() => import('./pages/NaoEncontrado'))

// Lazy loading das páginas administrativas
const AdminLogin      = lazy(() => import('./pages/admin/Login'))
const AdminDashboard  = lazy(() => import('./pages/admin/Dashboard'))
const AdminConteudo   = lazy(() => import('./pages/admin/Conteudo'))
const AdminServicos   = lazy(() => import('./pages/admin/Servicos'))
const AdminMensagens  = lazy(() => import('./pages/admin/Mensagens'))
const AdminCandidatos = lazy(() => import('./pages/admin/Candidatos'))
const AdminUsuarios   = lazy(() => import('./pages/admin/Usuarios'))

function LegacyServicoRedirect() {
  const { slug } = useParams()
  const [target, setTarget] = useState(null)

  useEffect(() => {
    let active = true

    servicosService.listar()
      .then((servicos) => {
        const item = servicos.find((servico) => servico.slug === slug)
        if (active) {
          setTarget(item ? `/${item.categoria}/${slug}` : '/tecnologia')
        }
      })
      .catch(() => {
        if (active) setTarget('/tecnologia')
      })

    return () => {
      active = false
    }
  }, [slug])

  if (!target) return <LoadingSpinner />
  return <Navigate to={target} replace />
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Rotas públicas */}
          <Route element={<PublicLayout />}>
            <Route index                          element={<Home />} />
            <Route path="sobre"                   element={<Sobre />} />
            <Route path="tecnologia"             element={<Servicos categoria="tecnologia" />} />
            <Route path="tecnologia/:slug"       element={<ServicoDetalhe categoria="tecnologia" />} />
            <Route path="consultoria"             element={<Servicos categoria="consultoria" />} />
            <Route path="consultoria/:slug"       element={<ServicoDetalhe categoria="consultoria" />} />
            <Route path="news"                    element={<News />} />
            <Route path="contato"                 element={<Contato />} />
            <Route path="servicos"                element={<Navigate to="/tecnologia" replace />} />
            <Route path="servicos/:slug"          element={<LegacyServicoRedirect />} />
            <Route path="trabalhe-conosco"        element={<Navigate to="/contato" replace />} />
            <Route path="politica-de-privacidade" element={<Privacidade />} />
            <Route path="*"                       element={<NaoEncontrado />} />
          </Route>

          {/* Login admin (sem layout público) */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Rotas administrativas protegidas */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index                   element={<AdminDashboard />} />
            <Route path="conteudo"         element={<AdminConteudo />} />
            <Route path="servicos"         element={<AdminServicos />} />
            <Route path="mensagens"        element={<AdminMensagens />} />
            <Route path="candidatos"       element={<AdminCandidatos />} />
            <Route path="usuarios"         element={<AdminUsuarios />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
