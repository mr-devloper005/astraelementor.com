import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: pagesContent.auth.signup.metadataDescription })
}

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-[1440px] items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.95fr_1fr] lg:px-8">
          <div className="rounded-[2rem] border border-[#ced9d1] bg-white p-6 shadow-[0_24px_70px_rgba(21,51,58,0.09)] sm:p-8">
            <h1 className="text-3xl font-black tracking-[-0.05em]">{pagesContent.auth.signup.formTitle}</h1>
            <EditableLocalSignupForm />
            <p className="mt-5 text-sm text-[var(--slot4-soft-muted-text)]">Already have an account? <Link href="/login" className="font-black text-[var(--slot4-accent)] underline-offset-4 hover:underline">{pagesContent.auth.signup.loginCta}</Link></p>
          </div>
          <div className="rounded-[2.4rem] bg-[var(--slot4-blue-band)] p-8 text-white shadow-[0_24px_70px_rgba(53,133,142,0.24)]">
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-white/72">{pagesContent.auth.signup.badge}</p>
            <h2 className="mt-5 max-w-xl text-5xl font-black leading-[0.96] tracking-[-0.07em] sm:text-6xl">{pagesContent.auth.signup.title}</h2>
            <p className="mt-6 max-w-lg text-sm leading-8 text-white/82">{pagesContent.auth.signup.description}</p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
