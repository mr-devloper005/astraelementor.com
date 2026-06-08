import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Download, Search, Share2, Star } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { editableDesignContract as dc, editablePalette as pal } from '@/editable/layouts/design-contract'
import { CompactIndexCard, DocumentTileCard, EditorialFeatureCard, RailPostCard, getEditableExcerpt, getEditablePostImage, postHref } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

function taskLabel(task: TaskKey) {
  return SITE_CONFIG.tasks.find((item) => item.key === task)?.label || task
}

function Section({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`${dc.shell.section} ${className}`}>{children}</section>
}

function MiniFeature({ title, body, icon: Icon }: { title: string; body: string; icon: typeof Download }) {
  return (
    <div className="rounded-[1.6rem] border border-[#d5dfd8] bg-white p-6 shadow-[0_18px_44px_rgba(21,51,58,0.06)]">
      <Icon className="h-10 w-10 text-[var(--slot4-accent)]" />
      <h3 className="mt-4 text-2xl font-black tracking-[-0.04em] text-[var(--slot4-page-text)]">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-[var(--slot4-soft-muted-text)]">{body}</p>
    </div>
  )
}

function FauxCalendarBoard({ posts, primaryTask, primaryRoute }: { posts: SitePost[]; primaryTask: TaskKey; primaryRoute: string }) {
  const items = posts.slice(0, 20)
  return (
    <div className="relative mx-auto w-full max-w-[620px] rounded-[1.2rem] border border-[#d8e1dc] bg-white p-4 shadow-[0_25px_70px_rgba(21,51,58,0.16)]">
      <div className="mb-4 flex gap-2">
        <span className="h-3 w-3 rounded-full bg-[#ff7e6d]" />
        <span className="h-3 w-3 rounded-full bg-[#f0bc2b]" />
        <span className="h-3 w-3 rounded-full bg-[#7da78c]" />
      </div>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
        {items.map((post, index) => (
          <Link
            key={post.id || post.slug || index}
            href={postHref(primaryTask, post, primaryRoute)}
            aria-label={`Open pick ${index + 1}: ${post.title}`}
            className={`rounded-[0.8rem] p-2 text-left text-[10px] font-black leading-tight transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(21,51,58,0.12)] focus:outline-none focus:ring-2 focus:ring-white/80 ${
              index % 4 === 0 ? 'bg-[#f7a7bf]' : index % 4 === 1 ? 'bg-[#f7dc58]' : index % 4 === 2 ? 'bg-[#9fe2f6]' : 'bg-[#b3e492]'
            }`}
          >
            <span className="block text-[9px] uppercase tracking-[0.12em] text-[#15333a]/65">Pick {index + 1}</span>
            <span className="mt-1 block line-clamp-4">{post.title}</span>
          </Link>
        ))}
        {Array.from({ length: Math.max(0, 20 - items.length) }).map((_, index) => (
          <div key={`empty-${index}`} className="h-[64px] rounded-[0.8rem] bg-[#eef3ef]" />
        ))}
      </div>
    </div>
  )
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const heroTitle = pagesContent.home.hero.title.join(' ')
  const heroPost = posts[0]

  return (
    <section className="border-b border-[#d0dbd5] bg-white">
      <div className="w-full px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="group relative overflow-hidden rounded-[2.6rem] bg-[var(--slot4-blue-band)] px-6 py-10 text-white shadow-[0_28px_80px_rgba(53,133,142,0.24)] sm:px-8 lg:px-10">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-[4%] top-[18%] h-28 w-28 rounded-full border-4 border-white/55" />
            <div className="absolute left-[12%] bottom-[12%] h-16 w-16 rounded-full border-2 border-white/35" />
            <div className="absolute right-[10%] top-[16%] h-24 w-24 rounded-[2rem] border-2 border-white/40" />
            <div className="absolute right-[18%] bottom-[18%] h-12 w-12 rotate-45 border-2 border-white/40" />
          </div>
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_0.88fr] lg:items-center">
            <div className="order-2 lg:order-1">
              <FauxCalendarBoard posts={posts} primaryTask={primaryTask} primaryRoute={primaryRoute} />
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-[11px] font-black uppercase tracking-[0.28em] text-white/72">{pagesContent.home.hero.badge}</p>
              <h1 className="mt-4 text-4xl font-black leading-[0.95] tracking-[-0.06em] sm:text-5xl lg:text-[4rem]">{heroTitle}</h1>
              <p className="mt-5 max-w-xl text-lg leading-9 text-white/84">{pagesContent.home.hero.description}</p>
              <Link href={primaryRoute} aria-label={`Open ${taskLabel(primaryTask)} library`} className="mt-8 inline-flex rounded-[0.85rem] bg-[#f0bc2b] px-8 py-3.5 text-sm font-black text-[var(--slot4-page-text)] transition duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_12px_30px_rgba(240,188,43,0.28)]">
                Try the library
              </Link>
              <p className="mt-5 text-sm font-semibold italic text-white/72">No clutter, just a clearer way to keep useful reading close.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#d0dbd5] bg-[#e3e8e4]">
        <Section className="py-8 text-center">
          <p className="text-2xl font-black tracking-[-0.05em] text-[var(--slot4-page-text)]">Build a better reading shelf for every kind of useful page.</p>
          
          {heroPost ? <p className="mt-4 text-sm font-semibold text-[var(--slot4-soft-muted-text)]">Featured now: {heroPost.title}</p> : null}
        </Section>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  if (!posts.length) return null
  return (
    <section className="bg-white">
      <Section className="py-16">
        <div className="text-center">
          <h2 className={dc.type.sectionTitle}>A premium shelf for fresh picks</h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-9 text-[var(--slot4-soft-muted-text)]">
            Browse the newest {taskLabel(primaryTask).toLowerCase()} through mixed-format cards that keep long pages visually alive.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-[1140px]">
          <FauxCalendarBoard posts={posts.slice(2, 10)} primaryTask={primaryTask} primaryRoute={primaryRoute} />
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.slice(0, 3).map((post, index) => (
            <MiniFeature
              key={post.id || post.slug || index}
              icon={index === 0 ? Download : index === 1 ? Share2 : CheckCircle2}
              title={index === 0 ? 'Made for PDF lovers' : index === 1 ? 'Easy to share and revisit' : 'Organized for quick scanning'}
              body={getEditableExcerpt(post, 140) || 'Useful pages are easier to trust when the layout feels calm, clear, and thoughtfully grouped.'}
            />
          ))}
        </div>

        <div className="mt-12 flex gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {posts.slice(0, 10).map((post, index) => (
            <RailPostCard key={post.id || post.slug || index} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
          ))}
        </div>
      </Section>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  if (!posts.length) return null
  const feature = posts[0]
  const tiles = posts.slice(1, 7)

  return (
    <section className="bg-[var(--slot4-blue-band)] text-white">
      <Section className="grid gap-10 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <EditorialFeatureCard post={feature} href={postHref(primaryTask, feature, primaryRoute)} label="Primary feature" />
        </div>
        <div>
          <div className="rounded-[2rem] border border-white/18 bg-white/10 p-6 backdrop-blur">
            <Star className="h-12 w-12 text-white" />
            <h2 className="mt-4 text-4xl font-black leading-tight tracking-[-0.05em]">This archive feels more like a curated product page.</h2>
            <p className="mt-5 text-lg leading-9 text-white/82">
              The structure mirrors the reference rhythm while staying connected to your existing content feeds, routes, and post fields.
            </p>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {tiles.slice(0, 4).map((post, index) => (
              <Link
                key={post.id || post.slug || index}
                href={postHref(primaryTask, post, primaryRoute)}
                className="rounded-[1.6rem] border border-white/18 bg-white/12 p-5 transition duration-300 hover:-translate-y-1 hover:bg-white/18"
              >
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/70">Feature {index + 1}</p>
                <h3 className="mt-3 line-clamp-3 text-xl font-black leading-tight tracking-[-0.04em]">{post.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </Section>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const categoryPosts = timeSections.flatMap((section) => section.posts)
  const mixed = (categoryPosts.length ? categoryPosts : posts).slice(0, 12)
  const feature = mixed[0]

  return (
    <section className="bg-white">
      <Section className="py-16">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <h2 className={dc.type.sectionTitle}>All your sections, re-framed with purpose</h2>
            <p className="mt-4 max-w-xl text-lg leading-9 text-[var(--slot4-soft-muted-text)]">
              Search-first entry points, stronger cards, and document-forward detail views give every section a more distinctive identity.
            </p>
            <form action="/search" className="mt-8 flex max-w-lg rounded-full border border-[#cad7cd] bg-[#f7faf7] p-2 shadow-sm">
              <input name="q" placeholder={pagesContent.home.hero.searchPlaceholder} className="min-w-0 flex-1 bg-transparent px-4 text-sm font-semibold outline-none" />
              <button className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-page-text)] px-5 py-3 text-sm font-black text-white">
                <Search className="h-4 w-4" /> Search
              </button>
            </form>
          </div>
          {feature ? (
            <div className="rounded-[2rem] border border-[#cad7cd] bg-[#f7faf7] p-5 shadow-[0_18px_50px_rgba(21,51,58,0.08)]">
              <div className="grid gap-5 md:grid-cols-[220px_1fr]">
                <div className="overflow-hidden rounded-[1.5rem] bg-[var(--slot4-media-bg)]">
                  <img src={getEditablePostImage(feature)} alt={feature.title} className="h-full w-full object-cover" />
                </div>
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--slot4-accent)]">Lead selection</p>
                  <h3 className="mt-3 text-3xl font-black leading-tight tracking-[-0.05em] text-[var(--slot4-page-text)]">{feature.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[var(--slot4-soft-muted-text)]">{getEditableExcerpt(feature, 170)}</p>
                  <Link href={postHref(primaryTask, feature, primaryRoute)} className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[var(--slot4-accent)]">
                    Open highlight <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {mixed.slice(0, 3).map((post, index) => (
            <DocumentTileCard key={post.id || post.slug || index} post={post} href={postHref(primaryTask, post, primaryRoute)} />
          ))}
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <div className="grid gap-4">
            {mixed.slice(3, 7).map((post, index) => (
              <CompactIndexCard key={post.id || post.slug || index} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
            ))}
          </div>
          <div className="rounded-[2rem] bg-[var(--slot4-blue-band)] p-6 text-white shadow-[0_24px_70px_rgba(53,133,142,0.24)]">
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-white/70">Built for discovery</p>
            <h3 className="mt-4 text-4xl font-black leading-[0.96] tracking-[-0.06em]">Search, browse, and open documents without losing rhythm.</h3>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.6rem] bg-white/12 p-5">
                <p className="text-2xl font-black">01</p>
                <p className="mt-2 text-sm leading-7 text-white/80">Featured cards add depth for high-value posts and lead people into the archive naturally.</p>
              </div>
              <div className="rounded-[1.6rem] bg-white/12 p-5">
                <p className="text-2xl font-black">02</p>
                <p className="mt-2 text-sm leading-7 text-white/80">Compact cards keep support content visible without repeating the same visual pattern.</p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </section>
  )
}

export function EditableHomeCta() {
  return (
    <section className="border-t border-[#d0dbd5] bg-[#d7dfd9]">
      <Section className="py-16 text-center">
        <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[var(--slot4-soft-muted-text)]">{pagesContent.home.cta.badge}</p>
        <h2 className="mt-4 text-4xl font-black tracking-[-0.06em] text-[var(--slot4-page-text)] sm:text-5xl">{pagesContent.home.cta.title}</h2>
        <p className="mx-auto mt-4 max-w-3xl text-lg leading-9 text-[var(--slot4-soft-muted-text)]">{pagesContent.home.cta.description}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href={pagesContent.home.cta.primaryCta.href} className={dc.button.accent}>{pagesContent.home.cta.primaryCta.label}</Link>
          <Link href={pagesContent.home.cta.secondaryCta.href} className={dc.button.secondary}>{pagesContent.home.cta.secondaryCta.label}</Link>
        </div>
      </Section>
    </section>
  )
}
