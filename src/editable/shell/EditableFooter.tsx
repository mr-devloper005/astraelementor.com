'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const taskLinks = SITE_CONFIG.tasks.filter((task) => task.enabled)
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <footer className="border-t border-[#d3ddd7] bg-[#dbe6d8] text-[var(--slot4-page-text)]">
      <div className="mx-auto grid max-w-[1440px] gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr] lg:px-8">
        <div className="rounded-[2rem] bg-white p-6 shadow-[0_20px_50px_rgba(21,51,58,0.08)]">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-[#d9e3dd] bg-white">
              <img src="/favicon.png" alt={SITE_CONFIG.name} className="h-full w-full object-contain p-1" />
            </span>
            <div>
              <p className="text-xl font-black tracking-[-0.05em]">ASTRAELEMENTOR.com</p>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--slot4-soft-muted-text)]">{globalContent.footer.tagline}</p>
            </div>
          </div>
          <p className="mt-4 max-w-md text-sm leading-7 text-[var(--slot4-muted-text)]">{globalContent.footer.description}</p>
        </div>

        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.24em] text-[var(--slot4-soft-muted-text)]">Sections</h3>
          <div className="mt-4 grid gap-2">
            {taskLinks.map((task) => (
              <Link key={task.key} href={task.route} className="inline-flex items-center gap-2 text-sm font-bold hover:text-[var(--slot4-accent-fill)]">
                {task.label} <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.24em] text-[var(--slot4-soft-muted-text)]">Pages</h3>
          <div className="mt-4 grid gap-2">
            <Link href="/about" className="text-sm font-bold hover:text-[var(--slot4-accent-fill)]">About</Link>
            <Link href="/search" className="text-sm font-bold hover:text-[var(--slot4-accent-fill)]">Search</Link>
            <Link href="/contact" className="text-sm font-bold hover:text-[var(--slot4-accent-fill)]">Contact</Link>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.24em] text-[var(--slot4-soft-muted-text)]">Account</h3>
          <div className="mt-4 grid gap-2">
            {session ? (
              <>
                <Link href="/create" className="text-sm font-bold hover:text-[var(--slot4-accent-fill)]">Create</Link>
                <button type="button" onClick={logout} className="text-left text-sm font-bold hover:text-[var(--slot4-accent-fill)]">Logout</button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm font-bold hover:text-[var(--slot4-accent-fill)]">Login</Link>
                <Link href="/signup" className="text-sm font-bold hover:text-[var(--slot4-accent-fill)]">Sign up</Link>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="border-t border-[#c8d4ca] px-4 py-4 text-center text-xs font-black uppercase tracking-[0.18em] text-[var(--slot4-soft-muted-text)]">
        © {year} {SITE_CONFIG.name}. {globalContent.footer.bottomNote}
      </div>
    </footer>
  )
}
