import { create } from 'zustand'
import { Dashboard, PortalAccess, Payment } from '@/types/index'
import { dashboardService } from '@services/dashboard'
import { logger } from '@utils/logger'

interface DashboardState {
  dashboard: Dashboard | null
  portalAccess: PortalAccess | null
  paymentHistory: Payment[]
  isLoading: boolean
  error: string | null

  setDashboard: (dashboard: Dashboard | null) => void
  setPortalAccess: (access: PortalAccess | null) => void
  setPaymentHistory: (payments: Payment[]) => void
  setError: (error: string | null) => void
  setIsLoading: (isLoading: boolean) => void

  fetchDashboard: (sessionYear: number, term: number) => Promise<boolean>
  fetchAccessStatus: (studentId: string, sessionYear: number, term: number) => Promise<boolean>
  fetchPaymentHistory: (studentId: string, sessionYear?: number) => Promise<boolean>
  clearDashboard: () => void
}

export const useDashboardStore = create<DashboardState>((set) => ({
  dashboard: null,
  portalAccess: null,
  paymentHistory: [],
  isLoading: false,
  error: null,

  setDashboard: (dashboard) => set({ dashboard }),

  setPortalAccess: (access) => set({ portalAccess: access }),

  setPaymentHistory: (payments) => set({ paymentHistory: payments }),

  setError: (error) => set({ error }),

  setIsLoading: (isLoading) => set({ isLoading }),

  fetchDashboard: async (sessionYear: number, term: number) => {
    set({ isLoading: true, error: null })

    try {
      const response = await dashboardService.getCurrentStudentDashboard(sessionYear, term)

      if (!response.success) {
        set({
          error: response.error || 'Failed to load dashboard',
          isLoading: false,
        })
        return false
      }

      set({
        dashboard: response.data!,
        isLoading: false,
      })
      return true
    } catch (error) {
      logger.error('Fetch dashboard error:', error)
      set({
        error: 'Failed to load dashboard. Please try again.',
        isLoading: false,
      })
      return false
    }
  },

  fetchAccessStatus: async (studentId: string, sessionYear: number, term: number) => {
    set({ isLoading: true, error: null })

    try {
      const response = await dashboardService.getAccessStatus(studentId, sessionYear, term)

      if (!response.success) {
        set({
          error: response.error || 'Failed to load access status',
          isLoading: false,
        })
        return false
      }

      set({
        portalAccess: response.data!,
        isLoading: false,
      })
      return true
    } catch (error) {
      logger.error('Fetch access status error:', error)
      set({
        error: 'Failed to load access status. Please try again.',
        isLoading: false,
      })
      return false
    }
  },

  fetchPaymentHistory: async (studentId: string, sessionYear?: number) => {
    set({ isLoading: true, error: null })

    try {
      const response = await dashboardService.getPaymentSummary(
        studentId,
        sessionYear || new Date().getFullYear(),
        2
      )

      if (!response.success) {
        set({
          error: response.error || 'Failed to load payment history',
          isLoading: false,
        })
        return false
      }

      set({
        isLoading: false,
      })
      return true
    } catch (error) {
      logger.error('Fetch payment history error:', error)
      set({
        error: 'Failed to load payment history. Please try again.',
        isLoading: false,
      })
      return false
    }
  },

  clearDashboard: () => {
    set({
      dashboard: null,
      portalAccess: null,
      paymentHistory: [],
      error: null,
    })
  },
}))