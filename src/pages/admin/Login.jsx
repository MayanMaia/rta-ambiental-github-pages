import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../hooks/useAuth'

export default function AdminLogin() {
  const { login }   = useAuth()
  const navigate    = useNavigate()
  const [erro, setErro] = useState(null)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()

  const onSubmit = async ({ email, password }) => {
    setErro(null)
    try {
      await login(email, password)
      navigate('/admin')
    } catch {
      setErro('E-mail ou senha inválidos.')
    }
  }

  return (
    <div className="min-h-dvh flex items-center justify-center bg-neutral-50 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="font-heading font-bold text-2xl text-primary-700">RTA Ambiental</p>
          <p className="text-sm text-neutral-500 mt-1">Painel Administrativo</p>
        </div>

        <div className="card shadow-card">
          <h1 className="text-lg font-heading font-semibold text-neutral-800 mb-6">Entrar</h1>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            <div>
              <label className="label" htmlFor="email">E-mail</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                className={`input ${errors.email ? 'input-error' : ''}`}
                {...register('email', { required: 'E-mail é obrigatório' })}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="label" htmlFor="password">Senha</label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                className={`input ${errors.password ? 'input-error' : ''}`}
                {...register('password', { required: 'Senha é obrigatória' })}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            {erro && (
              <p className="text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg">{erro}</p>
            )}

            <button type="submit" disabled={isSubmitting} className="btn-primary w-full mt-2">
              {isSubmitting ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
