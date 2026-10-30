import React, { useState } from 'react'
import { Check, Link2, Send } from 'lucide-react'
import { FaFacebookF, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa6'

export const ShareButtons: React.FC<{ title: string; showLabel?: boolean }> = ({
  title,
  showLabel = true,
}) => {
  const [copied, setCopied] = useState(false)
  const url = window.location.href
  const enc = encodeURIComponent

  const links = [
    { label: 'Share on Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`, icon: <FaFacebookF className="h-3 w-3" /> },
    { label: 'Share on WhatsApp', href: `https://wa.me/?text=${enc(`${title} ${url}`)}`, icon: <FaWhatsapp className="h-3.5 w-3.5" /> },
    { label: 'Share on LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`, icon: <FaLinkedinIn className="h-3 w-3" /> },
    { label: 'Share on Telegram', href: `https://t.me/share/url?url=${enc(url)}&text=${enc(title)}`, icon: <Send className="h-3.5 w-3.5" /> },
  ]

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard blocked: nothing to do */
    }
  }

  const btn =
    'flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition-colors hover:border-accent hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent'

  return (
    <div className="flex items-center gap-2">
      <span className="mr-1 text-xs font-medium text-gray-600">Share:</span>
      {links.map((l) => (
        <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" aria-label={l.label} className={btn}>
          {l.icon}
        </a>
      ))}
            {showLabel && <span className="mr-1 text-xs font-medium text-gray-600">Share:</span>}
      <button type="button" onClick={copy} aria-label="Copy link" className={btn}>
        {copied ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Link2 className="h-3.5 w-3.5" />}
      </button>
    </div>
  )
}

export default ShareButtons