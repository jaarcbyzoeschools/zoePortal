import { create } from 'zustand'
import { Payment, InitializePaymentResponse } from '@/types/index'
import { paymentService } from '@services/payment'
import { logger } from '@utils/logger'

interface PaymentStoreState {
  payments: Payment[]
  currentPayment: Payment | null
  initializePaymentResponse: InitializePaymentResponse['data'] | null
  isLoading: boolean
  error: string | null

  setPayments: (payments: Payment[]) => void
  setCurrentPayment: (payment: Payment | null) => void
  setInitializePaymentResponse: (data: InitializePaymentResponse['data'] | null) => void
  setError: (error: string | null) => void
  setIsLoading: (isLoading: boolean) => void

  initializePayment: (
    studentId: string,
    amount: number,
    sessionYear: number,
    term: number,
    installmentNumber: number
  ) => Promise<boolean>

  getPaymentStatus: (referenceNumber: string) => Promise<boolean>

  fetchStudentPayments: (studentId: string, sessionYear?: number) => Promise<boolean>

  clearPayment: () => void
}

export const usePaymentStore = create<PaymentStoreState>((set) => ({
  payments: [],
  currentPayment: null,
  initializePaymentResponse: null,
  isLoading: false,
  error: null,

  setPayments: (payments) => set({ payments }),

  setCurrentPayment: (payment) => set({ currentPayment: payment }),

  setInitializePaymentResponse: (data) => set({ initializePaymentResponse: data }),

  setError: (error) => set({ error }),

  setIsLoading: (isLoading) => set({ isLoading }),

  initializePayment: async (
    studentId: string,
    amount: number,
    sessionYear: number,
    term: number,
    installmentNumber: number
  ) => {
    set({ isLoading: true, error: null })

    try {
      const response = await paymentService.initializePayment(
        studentId,
        amount,
        sessionYear,
        term,
        installmentNumber
      )

      if (!response.success) {
        set({
          error: response.error || 'Failed to initialize payment',
          isLoading: false,
        })
        return false
      }

      set({
        initializePaymentResponse: response.data!,
        isLoading: false,
      })
      return true
    } catch (error) {
      logger.error('Initialize payment error:', error)
      set({
        error: 'Failed to initialize payment. Please try again.',
        isLoading: false,
      })
      return false
    }
  },

  getPaymentStatus: async (referenceNumber: string) => {
    set({ isLoading: true, error: null })

    try {
      const response = await paymentService.getPaymentStatus(referenceNumber)

      if (!response.success) {
        set({
          error: response.error || 'Failed to fetch payment status',
          isLoading: false,
        })
        return false
      }

      set({
        currentPayment: response.data!,
        isLoading: false,
      })
      return true
    } catch (error) {
      logger.error('Get payment status error:', error)
      set({
        error: 'Failed to fetch payment status. Please try again.',
        isLoading: false,
      })
      return false
    }
  },

  fetchStudentPayments: async (studentId: string, sessionYear?: number) => {
    set({ isLoading: true, error: null })

    try {
      const response = await paymentService.getStudentPayments(studentId, sessionYear)

      if (!response.success) {
        set({
          error: response.error || 'Failed to fetch payments',
          isLoading: false,
        })
        return false
      }

      set({
        payments: response.data!,
        isLoading: false,
      })
      return true
    } catch (error) {
      logger.error('Fetch student payments error:', error)
      set({
        error: 'Failed to fetch payments. Please try again.',
        isLoading: false,
      })
      return false
    }
  },

  clearPayment: () => {
    set({
      currentPayment: null,
      initializePaymentResponse: null,
      error: null,
    })
  },
}))