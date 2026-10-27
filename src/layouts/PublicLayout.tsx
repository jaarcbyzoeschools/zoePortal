import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from '@components/common/Navbar'
import Footer from '@components/common/Footer'
import { ToastContainer } from '@components/common/ToastContainer'
import { useToast } from '@hooks/index'

/** Scrolls to top on page change, or to #section when the URL has a hash. */
const ScrollManager: React.FC = () => {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}

export const PublicLayout: React.FC = () => {
  const { toasts, removeToast } = useToast()

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <ScrollManager />

      {/* Keyboard users can jump past the nav */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main-content" className="flex-1">
        <Outlet />
      </main>

      <Footer />

      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    </div>
  )
}