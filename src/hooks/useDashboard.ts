import { useState, useCallback } from 'react'
import { apiClient } from '@services/api'
import { Dashboard } from '@/types/index'

export const useDashboard = (year?: number, term?: number) => {
  const [dashboard, setDashboard] = useState<Dashboard | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchDashboard = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      const params = new URLSearchParams()
      if (year) params.append('sessionYear', year.toString())
      if (term) params.append('term', term.toString())

      const response = await apiClient.get<Dashboard>(
        `/api/dashboard/me?${params.toString()}`
      )

      if (response.success && response.data) {
        setDashboard(response.data)
      } else {
        setError(response.message || 'Failed to fetch dashboard')
      }
    } catch (err: any) {
      setError(err.message || 'Error fetching dashboard')
    } finally {
      setIsLoading(false)
    }
  }, [year, term])

  return {
    dashboard,
    isLoading,
    error,
    fetchDashboard,
    refetch: fetchDashboard,
  }
}