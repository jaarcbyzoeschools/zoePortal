import { create } from 'zustand'
import { User } from '@/types/index'
import { authService } from '@services/auth'
import { logger } from '@utils/logger'

interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  error: string | null
  isAuthenticated: boolean

  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  setError: (error: string | null) => void
  setIsLoading: (isLoading: boolean) => void

  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>
  requestPasswordReset: (email: string) => Promise<boolean>
  resetPassword: (resetToken: string, newPassword: string) => Promise<boolean>
  initializeAuth: () => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,

  setUser: (user) => {
    if (user) {
      authService.saveUser(user)
      set({ user, isAuthenticated: true })
    } else {
      localStorage.removeItem('user')
      set({ user: null, isAuthenticated: false })
    }
  },

  setToken: (token) => {
    if (token) {
      authService.saveToken(token)
      set({ token })
    } else {
      localStorage.removeItem('accessToken')
      set({ token: null })
    }
  },

  setError: (error) => set({ error }),

  setIsLoading: (isLoading) => set({ isLoading }),

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null })

    try {
      const response = await authService.login(email, password)

      if (!response.success) {
        set({
          error: response.error || 'Login failed',
          isLoading: false,
        })
        return false
      }

      const { accessToken, user } = response.data!

      get().setToken(accessToken)
      get().setUser(user)

      set({ isLoading: false })
      return true
    } catch (error) {
      logger.error('Login error:', error)
      set({
        error: 'Login failed. Please try again.',
        isLoading: false,
      })
      return false
    }
  },

  logout: () => {
    authService.logout()
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,
    })
  },

  changePassword: async (currentPassword: string, newPassword: string) => {
    set({ isLoading: true, error: null })

    try {
      const response = await authService.changePassword(currentPassword, newPassword)

      if (!response.success) {
        set({
          error: response.error || 'Password change failed',
          isLoading: false,
        })
        return false
      }

      set({ isLoading: false })
      return true
    } catch (error) {
      logger.error('Change password error:', error)
      set({
        error: 'Password change failed. Please try again.',
        isLoading: false,
      })
      return false
    }
  },

  requestPasswordReset: async (email: string) => {
    set({ isLoading: true, error: null })

    try {
      const response = await authService.requestPasswordReset(email)

      if (!response.success) {
        set({
          error: response.error || 'Password reset request failed',
          isLoading: false,
        })
        return false
      }

      set({ isLoading: false })
      return true
    } catch (error) {
      logger.error('Password reset request error:', error)
      set({
        error: 'Password reset request failed. Please try again.',
        isLoading: false,
      })
      return false
    }
  },

  resetPassword: async (resetToken: string, newPassword: string) => {
    set({ isLoading: true, error: null })

    try {
      const response = await authService.resetPassword(resetToken, newPassword)

      if (!response.success) {
        set({
          error: response.error || 'Password reset failed',
          isLoading: false,
        })
        return false
      }

      set({ isLoading: false })
      return true
    } catch (error) {
      logger.error('Reset password error:', error)
      set({
        error: 'Password reset failed. Please try again.',
        isLoading: false,
      })
      return false
    }
  },

  initializeAuth: () => {
    const token = authService.getToken()
    const user = authService.getUser()

    if (token && user) {
      set({
        token,
        user,
        isAuthenticated: true,
      })
    }
  },
}))