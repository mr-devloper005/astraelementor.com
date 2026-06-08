'use client'

import { useState } from 'react'

export function PdfShareButton({ className = '' }: { className?: string }) {
  const [label, setLabel] = useState('Share')

  const handleClick = async () => {
    if (typeof window === 'undefined') return
    const url = window.location.href
    try {
      await navigator.clipboard.writeText(url)
      setLabel('Copied')
    } catch {
      window.prompt('Copy this page URL', url)
      setLabel('Copied')
    }
    window.setTimeout(() => setLabel('Share'), 1800)
  }

  return (
    <button type="button" onClick={handleClick} className={className}>
      {label}
    </button>
  )
}
