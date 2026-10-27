import { apiClient } from './api'
import { AuthResponse, User } from '@/types/index'
import { ApiResponse } from '@/types/index'


export const authService = {
  async login(email: string, password: string): Promise<ApiResponse<AuthResponse['data']>> {
    return apiClient.post('/auth/login', { email, password })
  },

  async requestPasswordReset(email: string): Promise<ApiResponse<void>> {
    return apiClient.post('/auth/request-password-reset', { email })
  },

  async resetPassword(resetToken: string, newPassword: string): Promise<ApiResponse<void>> {
    return apiClient.post('/auth/reset-password', { resetToken, newPassword })
  },

  async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<ApiResponse<void>> {
    return apiClient.post('/auth/change-password', { currentPassword, newPassword })
  },

  async getCurrentUser(): Promise<ApiResponse<User>> {
    return apiClient.get('/auth/me')
  },

  saveToken(token: string): void {
    localStorage.setItem('accessToken', token)
  },

  saveUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user))
  },

  getToken(): string | null {
    return localStorage.getItem('accessToken')
  },

  getUser(): User | null {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },

  logout(): void {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
    localStorage.removeItem('sessionWarning')
  },

  isAuthenticated(): boolean {
    return !!this.getToken() && !!this.getUser()
  },
}