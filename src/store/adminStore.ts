import { create } from 'zustand'
import { Application, AdmissionsStats } from '@/types/index'
import { admissionsService } from '@services/admissions'
import { logger } from '@utils/logger'

interface AdminStoreState {
  applications: Application[]
  selectedApplication: Application | null
  stats: AdmissionsStats | null
  isLoading: boolean
  error: string | null
  filterStatus: string | null
  filterClassLevel: string | null

  setApplications: (applications: Application[]) => void
  setSelectedApplication: (application: Application | null) => void
  setStats: (stats: AdmissionsStats | null) => void
  setError: (error: string | null) => void
  setIsLoading: (isLoading: boolean) => void
  setFilterStatus: (status: string | null) => void
  setFilterClassLevel: (classLevel: string | null) => void

  fetchApplications: (status?: string, classLevel?: string) => Promise<boolean>
  fetchApplication: (applicationId: string) => Promise<boolean>
  approveApplication: (applicationId: string, notes?: string) => Promise<boolean>
  rejectApplication: (applicationId: string, rejectionReason: string) => Promise<boolean>
  fetchStats: () => Promise<boolean>

  clearAdmin: () => void
}

export const useAdminStore = create<AdminStoreState>((set, get) => ({
  applications: [],
  selectedApplication: null,
  stats: null,
  isLoading: false,
  error: null,
  filterStatus: null,
  filterClassLevel: null,

  setApplications: (applications) => set({ applications }),

  setSelectedApplication: (application) => set({ selectedApplication: application }),

  setStats: (stats) => set({ stats }),

  setError: (error) => set({ error }),

  setIsLoading: (isLoading) => set({ isLoading }),

  setFilterStatus: (status) => set({ filterStatus: status }),

  setFilterClassLevel: (classLevel) => set({ filterClassLevel: classLevel }),

  fetchApplications: async (status?: string, classLevel?: string) => {
    set({ isLoading: true, error: null })

    try {
      const response = await admissionsService.getApplications(status, classLevel)

      if (!response.success) {
        set({
          error: response.error || 'Failed to fetch applications',
          isLoading: false,
        })
        return false
      }

      set({
        applications: response.data!,
        isLoading: false,
      })
      return true
    } catch (error) {
      logger.error('Fetch applications error:', error)
      set({
        error: 'Failed to fetch applications. Please try again.',
        isLoading: false,
      })
      return false
    }
  },

  fetchApplication: async (applicationId: string) => {
    set({ isLoading: true, error: null })

    try {
      const response = await admissionsService.getApplication(applicationId)

      if (!response.success) {
        set({
          error: response.error || 'Failed to fetch application',
          isLoading: false,
        })
        return false
      }

      set({
        selectedApplication: response.data!,
        isLoading: false,
      })
      return true
    } catch (error) {
      logger.error('Fetch application error:', error)
      set({
        error: 'Failed to fetch application. Please try again.',
        isLoading: false,
      })
      return false
    }
  },

  approveApplication: async (applicationId: string, notes?: string) => {
    set({ isLoading: true, error: null })

    try {
      const response = await admissionsService.approveApplication(applicationId, notes)

      if (!response.success) {
        set({
          error: response.error || 'Failed to approve application',
          isLoading: false,
        })
        return false
      }

      await get().fetchApplications(get().filterStatus ?? undefined, get().filterClassLevel ?? undefined)
      set({ isLoading: false })
      return true
    } catch (error) {
      logger.error('Approve application error:', error)
      set({
        error: 'Failed to approve application. Please try again.',
        isLoading: false,
      })
      return false
    }
  },

  rejectApplication: async (applicationId: string, rejectionReason: string) => {
    set({ isLoading: true, error: null })

    try {
      const response = await admissionsService.rejectApplication(applicationId, rejectionReason)

      if (!response.success) {
        set({
          error: response.error || 'Failed to reject application',
          isLoading: false,
        })
        return false
      }

      await get().fetchApplications(get().filterStatus ?? undefined, get().filterClassLevel ?? undefined)
      set({ isLoading: false })
      return true
    } catch (error) {
      logger.error('Reject application error:', error)
      set({
        error: 'Failed to reject application. Please try again.',
        isLoading: false,
      })
      return false
    }
  },

  fetchStats: async () => {
    set({ isLoading: true, error: null })

    try {
      const response = await admissionsService.getStats()

      if (!response.success) {
        set({
          error: response.error || 'Failed to fetch statistics',
          isLoading: false,
        })
        return false
      }

      set({
        stats: response.data!,
        isLoading: false,
      })
      return true
    } catch (error) {
      logger.error('Fetch stats error:', error)
      set({
        error: 'Failed to fetch statistics. Please try again.',
        isLoading: false,
      })
      return false
    }
  },

  clearAdmin: () => {
    set({
      applications: [],
      selectedApplication: null,
      stats: null,
      error: null,
    })
  },
}))