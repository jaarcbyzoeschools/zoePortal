import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios'
import { API_BASE_URL, TIMEOUT, ERROR_MESSAGES } from '@constants/index'
import { ApiResponse, ApiError } from '@/types/index'
import { logger } from '@utils/logger'

class ApiClient {
  private client: AxiosInstance
  private isRefreshing = false
  private failedQueue: Array<{
    onSuccess: (token: string) => void
    onError: (error: Error) => void
  }> = []

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.setupInterceptors()
  }

  private setupInterceptors(): void {
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('accessToken')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        logger.error('Request interceptor error:', error)
        return Promise.reject(error)
      }
    )

    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as any

        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            return new Promise((onSuccess, onError) => {
              this.failedQueue.push({ onSuccess, onError })
            })
              .then((token) => {
                originalRequest.headers.Authorization = `Bearer ${token}`
                return this.client(originalRequest)
              })
              .catch((err) => Promise.reject(err))
          }

          this.isRefreshing = true
          originalRequest._retry = true

          try {
            const refreshed = await this.refreshToken()
            if (refreshed) {
              const token = localStorage.getItem('accessToken')
              originalRequest.headers.Authorization = `Bearer ${token}`
              this.processQueue(null, token!)
              return this.client(originalRequest)
            }
          } catch (err) {
            this.processQueue(err as Error, null)
            localStorage.removeItem('accessToken')
            localStorage.removeItem('user')
            window.location.href = '/login'
            return Promise.reject(err)
          } finally {
            this.isRefreshing = false
          }
        }

        return Promise.reject(error)
      }
    )
  }

  private processQueue(
    error: Error | null,
    token: string | null
  ): void {
    this.failedQueue.forEach((prom) => {
      if (error) {
        prom.onError(error)
      } else if (token) {
        prom.onSuccess(token)
      }
    })

    this.failedQueue = []
  }

  private async refreshToken(): Promise<boolean> {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/me`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })

      if (response.data.success) {
        localStorage.setItem('accessToken', response.data.data.accessToken)
        return true
      }

      return false
    } catch (error) {
      logger.error('Token refresh failed:', error)
      return false
    }
  }

  async get<T>(url: string, config = {}): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.client.get(url, config)
      return response.data
    } catch (error) {
      return this.handleError(error)
    }
  }

  async post<T>(url: string, data?: any, config = {}): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.client.post(url, data, config)
      return response.data
    } catch (error) {
      return this.handleError(error)
    }
  }

  async put<T>(url: string, data?: any, config = {}): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.client.put(url, data, config)
      return response.data
    } catch (error) {
      return this.handleError(error)
    }
  }

  async patch<T>(url: string, data?: any, config = {}): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.client.patch(url, data, config)
      return response.data
    } catch (error) {
      return this.handleError(error)
    }
  }

  async delete<T>(url: string, config = {}): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.client.delete(url, config)
      return response.data
    } catch (error) {
      return this.handleError(error)
    }
  }

  private handleError(error: unknown): ApiResponse<never> {
    if (axios.isAxiosError(error)) {
      const apiError = error.response?.data as ApiError | undefined

      if (apiError?.error) {
        logger.error('API error:', apiError.error)
        return {
          success: false,
          error: apiError.error,
          code: apiError.code,
          message: apiError.error,
        }
      }

      if (error.response?.status === 0) {
        return {
          success: false,
          error: ERROR_MESSAGES.NETWORK_ERROR,
          code: 'NETWORK_ERROR',
          message: ERROR_MESSAGES.NETWORK_ERROR,
        }
      }

      const statusCode = error.response?.status
      let message: string = ERROR_MESSAGES.SERVER_ERROR

      if (statusCode === 400) message = ERROR_MESSAGES.VALIDATION_ERROR
      if (statusCode === 401) message = ERROR_MESSAGES.UNAUTHORIZED
      if (statusCode === 403) message = ERROR_MESSAGES.FORBIDDEN
      if (statusCode === 404) message = ERROR_MESSAGES.NOT_FOUND

      return {
        success: false,
        error: message,
        code: `HTTP_${statusCode}`,
        message,
      }
    }

    logger.error('Unknown error:', error)
    return {
      success: false,
      error: ERROR_MESSAGES.SERVER_ERROR,
      code: 'UNKNOWN_ERROR',
      message: ERROR_MESSAGES.SERVER_ERROR,
    }
  }
}

export const apiClient = new ApiClient()