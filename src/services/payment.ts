import { apiClient } from './api'
import { Payment, InitializePaymentResponse } from '@/types/index'
import { ApiResponse } from '@/types/index'

export const paymentService = {
  async initializePayment(
    studentId: string,
    amount: number,
    sessionYear: number,
    term: number,
    installmentNumber: number
  ): Promise<ApiResponse<InitializePaymentResponse['data']>> {
    return apiClient.post('/payments/initialize', {
      studentId,
      amount,
      sessionYear,
      term,
      installmentNumber,
    })
  },

  async getPaymentStatus(referenceNumber: string): Promise<ApiResponse<Payment>> {
    return apiClient.get(`/payments/status/${referenceNumber}`)
  },

  async getStudentPayments(studentId: string, sessionYear?: number): Promise<ApiResponse<Payment[]>> {
    const query = sessionYear ? `?sessionYear=${sessionYear}` : ''
    return apiClient.get(`/payments/student/${studentId}${query}`)
  },

  async getOutstandingBalance(
    studentId: string,
    sessionYear: number,
    term: number
  ): Promise<ApiResponse<any>> {
    return apiClient.get(
      `/payments/balance/${studentId}?sessionYear=${sessionYear}&term=${term}`
    )
  },
}