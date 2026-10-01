import api from './api'
import { localAdminService } from './local-admin'

const TOKEN_KEY = '@rta:token'
const USER_KEY  = '@rta:user'

export const authService = {
  async login(email, password) {
    const localUser = localAdminService.login(email, password)
    if (localUser) {
      localStorage.setItem(TOKEN_KEY, localUser.token)
      localStorage.setItem(USER_KEY, JSON.stringify(localUser))
      return localUser
    }

    const { data } = await api.post('/auth/login', { email, password })
    localStorage.setItem(TOKEN_KEY, data.token)
    localStorage.setItem(USER_KEY,  JSON.stringify(data.user))
    return data.user
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  },

  getStoredUser() {
    try {
      return JSON.parse(localStorage.getItem(USER_KEY))
    } catch {
      return null
    }
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY)
  },
}
