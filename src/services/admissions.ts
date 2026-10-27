import { apiClient } from './api'
import { Application, AdmissionsStats } from '@/types/index'
import { ApiResponse } from '@/types/index'

export const admissionsService = {
  async getApplications(
    status?: string,
    classLevel?: string
  ): Promise<ApiResponse<Application[]>> {
    const params = new URLSearchParams()
    if (status) params.append('status', status)
    if (classLevel) params.append('classLevel', classLevel)

    const query = params.toString() ? `?${params.toString()}` : ''
    return apiClient.get(`/admissions/applications${query}`)
  },

  async getApplication(applicationId: string): Promise<ApiResponse<Application>> {
    return apiClient.get(`/admissions/applications/${applicationId}`)
  },

  async approveApplication(
    applicationId: string,
    notes?: string
  ): Promise<ApiResponse<any>> {
    return apiClient.post(`/admissions/applications/${applicationId}/approve`, { notes })
  },

  async rejectApplication(
    applicationId: string,
    rejectionReason: string
  ): Promise<ApiResponse<any>> {
    return apiClient.post(`/admissions/applications/${applicationId}/reject`, {
      rejectionReason,
    })
  },

  async getStats(): Promise<ApiResponse<AdmissionsStats>> {
    return apiClient.get('/admissions/stats')
  },
}