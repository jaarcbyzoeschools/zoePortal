import { useEffect } from 'react'
import { useAuth } from './useAuth'
import { SESSION_TIMEOUT, SESSION_WARNING_TIME } from '@constants/index'

export const useSessionTimeout = () => {
  const { isAuthenticated, logout } = useAuth()
 let timeoutId: ReturnType<typeof setTimeout> | null = null;
let warningTimeoutId: ReturnType<typeof setTimeout> | null = null;


  useEffect(() => {
    if (!isAuthenticated) {
      return
    }

    const resetTimeout = () => {
      if (timeoutId) clearTimeout(timeoutId)
      if (warningTimeoutId) clearTimeout(warningTimeoutId)

      warningTimeoutId = setTimeout(() => {
        localStorage.setItem('sessionWarning', 'true')
      }, SESSION_TIMEOUT - SESSION_WARNING_TIME)

      timeoutId = setTimeout(() => {
        localStorage.removeItem('sessionWarning')
        logout()
      }, SESSION_TIMEOUT)
    }

    const events = ['mousedown', 'keydown', 'scroll', 'touchstart']

    events.forEach((event) => {
      document.addEventListener(event, resetTimeout)
    })

    resetTimeout()

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, resetTimeout)
      })
      if (timeoutId) clearTimeout(timeoutId)
      if (warningTimeoutId) clearTimeout(warningTimeoutId)
    }
  }, [isAuthenticated, logout])
}