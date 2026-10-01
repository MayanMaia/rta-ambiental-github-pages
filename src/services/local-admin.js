const LOCAL_ADMIN_EMAIL = import.meta.env.VITE_LOCAL_ADMIN_EMAIL ?? 'admin@rta.local'
const LOCAL_ADMIN_PASSWORD = import.meta.env.VITE_LOCAL_ADMIN_PASSWORD ?? 'admin123'

export const localAdminService = {
  enabled: import.meta.env.DEV && import.meta.env.VITE_ENABLE_LOCAL_ADMIN === 'true',

  login(email, password) {
    if (!this.enabled || email !== LOCAL_ADMIN_EMAIL || password !== LOCAL_ADMIN_PASSWORD) {
      return null
    }

    return {
      id: 'local-admin',
      name: 'Administrador local',
      email: LOCAL_ADMIN_EMAIL,
      role: 'admin',
      token: 'local-admin-token',
    }
  },
}