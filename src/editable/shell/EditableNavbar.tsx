'use client'

import { useMemo, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogIn, Menu, PlusCircle, Search, UserPlus, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  const navItems = useMemo(() => SITE_CONFIG.tasks.filter((task) => task.enabled).map((task) => ({ label: task.label, href: task.route })), [])
  const style = {
    '--editable-border': '#d3ddd7',
    '--editable-container': '1440px',
  } as CSSProperties

  return (
    <header style={style} className="sticky top-0 z-50 border-b border-[var(--editable-border)] bg-white/96 text-[var(--slot4-page-text)] backdrop-blur-xl">
      <div className="mx-auto flex min-h-[82px] w-full max-w-[var(--editable-container)] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-[#d9e3dd] bg-white shadow-[0_10px_22px_rgba(53,133,142,0.12)]">
            <img src="/favicon.png" alt={SITE_CONFIG.name} className="h-full w-full object-contain p-1" />
          </span>
          <span className="min-w-0">
            <span className="block text-[1.9rem] font-black leading-none tracking-[-0.06em] text-[#2374c8]">
              ASTRA<span className="text-[#f0bc2b]">ELEMENTOR</span>
            </span>
            <span className="block text-[10px] font-black uppercase tracking-[0.28em] text-[var(--slot4-muted-text)]">
              {globalContent.nav.tagline}
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {[{ label: 'Home', href: '/' }, ...navItems.slice(0, 4), { label: 'Contact', href: '/contact' }].map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                  active ? 'bg-[var(--slot4-accent-soft)] text-[var(--slot4-page-text)]' : 'text-[var(--slot4-muted-text)] hover:text-[var(--slot4-page-text)]'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        <form action="/search" className="ml-auto hidden min-w-0 flex-1 justify-end xl:flex">
          <label className="flex w-full max-w-[340px] items-center rounded-full border border-[var(--editable-border)] bg-[#f8fbf8] px-4 py-2.5">
            <Search className="h-4 w-4 text-[var(--slot4-muted-text)]" />
            <input
              name="q"
              type="search"
              placeholder="Search the library"
              className="min-w-0 flex-1 bg-transparent px-3 text-sm font-semibold outline-none placeholder:text-[var(--slot4-soft-muted-text)]"
            />
          </label>
        </form>

        <div className="hidden items-center gap-3 md:flex">
          {session ? (
            <>
              <Link href="/create" className="inline-flex items-center gap-2 rounded-[0.85rem] bg-[var(--slot4-accent-fill)] px-4 py-2.5 text-sm font-black text-white">
                <PlusCircle className="h-4 w-4" /> Create
              </Link>
              <button type="button" onClick={logout} className="text-sm font-black text-[var(--slot4-muted-text)] hover:text-[var(--slot4-page-text)]">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="inline-flex items-center gap-2 text-sm font-black text-[#2374c8]">
                <LogIn className="h-4 w-4" /> Log In
              </Link>
              <Link href="/signup" className="inline-flex items-center gap-2 rounded-[0.85rem] bg-[#2374c8] px-5 py-2.5 text-sm font-black text-white">
                <UserPlus className="h-4 w-4" /> Get Started
              </Link>
            </>
          )}
        </div>

        <button type="button" onClick={() => setOpen((value) => !value)} className="rounded-full border border-[var(--editable-border)] p-2 lg:hidden" aria-label="Toggle menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-[var(--editable-border)] bg-white px-4 py-4 lg:hidden">
          <form action="/search" className="mb-4 flex items-center rounded-2xl border border-[var(--editable-border)] bg-[#f8fbf8] px-4 py-3">
            <Search className="h-4 w-4 text-[var(--slot4-muted-text)]" />
            <input name="q" type="search" placeholder="Search the library" className="min-w-0 flex-1 bg-transparent px-3 text-sm font-semibold outline-none" />
          </form>
          <div className="grid gap-2">
            {[{ label: 'Home', href: '/' }, ...navItems, { label: 'Contact', href: '/contact' }, ...(session ? [{ label: 'Create', href: '/create' }] : [{ label: 'Login', href: '/login' }, { label: 'Sign up', href: '/signup' }])].map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-2xl border border-[var(--editable-border)] bg-white px-4 py-3 text-sm font-black">
                {item.label}
              </Link>
            ))}
            {session ? (
              <button type="button" onClick={() => { logout(); setOpen(false) }} className="rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-accent-soft)] px-4 py-3 text-left text-sm font-black">
                Logout
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  )
}
