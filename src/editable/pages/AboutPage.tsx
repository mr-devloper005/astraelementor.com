import Link from 'next/link'
import { ArrowRight, FileText, Search, Sparkles } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const highlights = [
  { value: 'PDF-friendly', label: 'layout rhythm' },
  { value: 'Clearer', label: 'reading flow' },
  { value: 'Faster', label: 'revisits' },
]

const principles = [
  {
    icon: FileText,
    title: 'Document-first browsing',
    description: 'PDFs and files get the strongest visual treatment so they feel like the main attraction, not an afterthought.',
  },
  {
    icon: Search,
    title: 'Easier to scan',
    description: 'The page structure keeps headings, summaries, and supporting panels easy to follow at a glance.',
  },
  {
    icon: Sparkles,
    title: 'Premium editorial feel',
    description: 'Soft blue-green branding, framed modules, and generous spacing keep the experience calm and polished.',
  },
]

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] px-4 py-12 text-[var(--slot4-page-text)] sm:px-6 lg:px-8 lg:py-16">
        <section className="mx-auto max-w-[1440px] overflow-hidden rounded-[2.4rem] border border-[#ced9d1] bg-white shadow-[0_24px_70px_rgba(21,51,58,0.09)]">
          <div className="grid gap-8 bg-[var(--slot4-blue-band)] px-6 py-8 text-white lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-10">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.28em] text-white/72">{pagesContent.about.badge}</p>
              <h1 className="mt-4 max-w-3xl text-5xl font-black leading-[0.94] tracking-[-0.07em] sm:text-6xl">
                {pagesContent.about.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/84">{pagesContent.about.description}</p>
            </div>
            <div className="self-end rounded-[1.8rem] border border-white/16 bg-white/12 p-5 backdrop-blur">
              <p className="text-[11px] font-black uppercase tracking-[0.24em] text-white/72">About {SITE_CONFIG.name}</p>
              <p className="mt-3 text-sm leading-7 text-white/82">
                A cleaner interface, clearer hierarchy, and calmer navigation make useful content easier to revisit.
              </p>
              <div className="mt-5 grid grid-cols-3 gap-3">
                {highlights.map((item) => (
                  <div key={item.label} className="rounded-[1.2rem] border border-white/16 bg-white/10 p-3 text-center">
                    <p className="text-base font-black">{item.value}</p>
                    <p className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-white/72">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-8 px-6 py-8 lg:grid-cols-[1fr_0.95fr] lg:px-10 lg:py-10">
            <article className="rounded-[2rem] border border-[#d5dfd9] bg-[#f8fbf8] p-6">
              <div className="space-y-4 text-sm leading-8 text-[var(--slot4-muted-text)]">
                {pagesContent.about.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/pdf" className="inline-flex items-center gap-2 rounded-[0.85rem] bg-[var(--slot4-accent-fill)] px-5 py-3 text-sm font-black text-white">
                  Explore PDFs <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/search" className="inline-flex items-center gap-2 rounded-[0.85rem] border border-[#ced9d1] bg-white px-5 py-3 text-sm font-black">
                  Search the archive
                </Link>
              </div>
            </article>

            <aside className="grid gap-4">
              {principles.map((item) => (
                <div key={item.title} className="rounded-[2rem] border border-[#d5dfd9] bg-white p-6 shadow-[0_14px_40px_rgba(21,51,58,0.05)]">
                  <item.icon className="h-6 w-6 text-[var(--slot4-accent)]" />
                  <h2 className="mt-3 text-xl font-black tracking-[-0.04em]">{item.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-[var(--slot4-soft-muted-text)]">{item.description}</p>
                </div>
              ))}
            </aside>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
