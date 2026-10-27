import { apiClient } from './api'
import { Dashboard, PortalAccess } from '@/types/index'
import { ApiResponse } from '@/types/index'

export const dashboardService = {
  async getCurrentStudentDashboard(
    sessionYear: number,
    term: number
  ): Promise<ApiResponse<Dashboard>> {
    return apiClient.get(`/dashboard/me?sessionYear=${sessionYear}&term=${term}`)
  },

  async getAccessStatus(
    studentId: string,
    sessionYear: number,
    term: number
  ): Promise<ApiResponse<PortalAccess>> {
    return apiClient.get(
      `/dashboard/access-status/${studentId}?sessionYear=${sessionYear}&term=${term}`
    )
  },

  async getPaymentSummary(
    studentId: string,
    sessionYear: number,
    term: number
  ): Promise<ApiResponse<any>> {
    return apiClient.get(
      `/dashboard/payment-summary/${studentId}?sessionYear=${sessionYear}&term=${term}`
    )
  },

  async getStudentInfo(studentId: string): Promise<ApiResponse<any>> {
    return apiClient.get(`/dashboard/student-info/${studentId}`)
  },
}