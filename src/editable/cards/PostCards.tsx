import Link from 'next/link'
import { ArrowRight, Clock3, FileText } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'
import { editableDesignContract as dc, editablePalette as pal } from '@/editable/layouts/design-contract'

export function getEditablePostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const images = Array.isArray(content.images) ? content.images : []
  const contentImage = images.find((url): url is string => typeof url === 'string' && Boolean(url))
  const featured = typeof content.featuredImage === 'string' ? content.featuredImage : ''
  const image = typeof content.image === 'string' ? content.image : ''
  const logo = typeof content.logo === 'string' ? content.logo : ''
  return mediaUrl || contentImage || featured || image || logo || '/placeholder.svg?height=900&width=1400'
}

export function getEditableExcerpt(post?: SitePost | null, limit = 150) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const raw = (typeof content.description === 'string' && content.description) || (typeof content.summary === 'string' && content.summary) || post?.summary || ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

export function getEditableCategory(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Featured'
}

export function postHref(task: TaskKey, post: SitePost, route = `/${task}`) {
  return `${route}/${post.slug}`
}

export function EditorialFeatureCard({ post, href, label = 'Featured read' }: { post: SitePost; href: string; label?: string }) {
  return (
    <Link href={href} className={`group block overflow-hidden ${dc.surface.card} ${dc.motion.lift}`}>
      <div className="relative min-h-[420px] bg-[var(--slot4-blue-band)] p-5 text-white sm:min-h-[520px] sm:p-8">
        <div className="absolute left-[6%] top-[10%] h-24 w-24 rounded-full border-4 border-white/30" />
        <div className="absolute right-[6%] top-[8%] h-10 w-10 rounded-full border-2 border-white/50" />
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-20 transition duration-500 group-hover:scale-105" />
        <div className="relative z-10 grid h-full gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex min-h-[240px] items-end">
            <div className="w-full rounded-[2rem] border border-white/20 bg-white/10 p-6 backdrop-blur">
              <p className="text-[11px] font-black uppercase tracking-[0.28em] text-white/72">{label}</p>
              <h3 className="mt-3 text-3xl font-black leading-[0.92] tracking-[-0.06em] sm:text-5xl">{post.title}</h3>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/78">{getEditableExcerpt(post, 170)}</p>
              <span className="mt-6 inline-flex items-center gap-2 rounded-[0.85rem] bg-[#f0bc2b] px-5 py-3 text-sm font-black text-[#15333a]">
                Open feature <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-[430px] rounded-[2rem] border border-white/20 bg-white p-5 text-[var(--slot4-page-text)] shadow-[0_22px_60px_rgba(0,0,0,0.18)]">
              <div className="mb-4 flex gap-2">
                <span className="h-3 w-3 rounded-full bg-[#ff7e6d]" />
                <span className="h-3 w-3 rounded-full bg-[#f0bc2b]" />
                <span className="h-3 w-3 rounded-full bg-[#7da78c]" />
              </div>
              <div className="grid gap-3">
                <div className="rounded-[1rem] bg-[var(--slot4-accent-soft)] p-3">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--slot4-accent)]">Saved today</p>
                  <p className="mt-1 text-lg font-black">{getEditableCategory(post)}</p>
                </div>
                <div className="grid grid-cols-4 gap-2 rounded-[1rem] bg-[#f6faf7] p-3">
                  {Array.from({ length: 16 }).map((_, index) => (
                    <span key={index} className={`h-10 rounded-xl ${index % 5 === 0 ? 'bg-[var(--slot4-accent-fill)]/80' : index % 3 === 0 ? 'bg-[var(--slot4-accent-tertiary)]' : 'bg-[#d5ddd8]'}`} />
                  ))}
                </div>
                <div className="rounded-[1rem] border border-[#d8e2dc] p-3 text-sm font-semibold text-[var(--slot4-muted-text)]">
                  Clean categories, clear summaries, and an easier way to revisit useful pages.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export function RailPostCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className={`group ${dc.layout.minRailCard} block overflow-hidden ${dc.surface.card} ${dc.motion.lift}`}>
      <div className="relative aspect-[4/5] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(21,51,58,0.82)_100%)]" />
        <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--slot4-page-text)]">0{index + 1}</span>
        <h3 className="absolute bottom-4 left-4 right-4 line-clamp-3 text-xl font-black leading-tight tracking-[-0.04em] text-white">{post.title}</h3>
      </div>
    </Link>
  )
}

export function CompactIndexCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className={`group block min-w-0 ${dc.surface.soft} p-5 ${dc.motion.lift}`}>
      <div className="flex items-start gap-4">
        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${pal.accentBg} text-xs font-black text-white`}>{String(index + 1).padStart(2, '0')}</span>
        <div className="min-w-0">
          <p className={`flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.22em] ${pal.accentText}`}>
            <Clock3 className="h-3.5 w-3.5" /> {getEditableCategory(post)}
          </p>
          <h3 className={`mt-2 line-clamp-2 text-xl font-black leading-tight tracking-[-0.04em] ${pal.panelText}`}>{post.title}</h3>
          <p className={`mt-2 line-clamp-2 text-sm leading-6 ${pal.softMutedText}`}>{getEditableExcerpt(post, 105)}</p>
        </div>
      </div>
    </Link>
  )
}

export function ArticleListCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const image = getEditablePostImage(post)
  return (
    <Link href={href} className={`group grid gap-5 overflow-hidden ${dc.surface.card} p-4 ${dc.motion.lift} sm:grid-cols-[250px_minmax(0,1fr)]`}>
      <div className="relative min-h-[220px] overflow-hidden rounded-[1.5rem] bg-[var(--slot4-media-bg)]">
        <img src={image} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="min-w-0 p-2 sm:py-3 sm:pr-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-[var(--slot4-accent-soft)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--slot4-accent)]">
            Read {String(index + 1).padStart(2, '0')}
          </span>
          <span className="rounded-full border border-[#d5ddd8] px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--slot4-soft-muted-text)]">
            {getEditableCategory(post)}
          </span>
        </div>
        <h2 className={`mt-4 line-clamp-3 text-2xl font-black leading-tight tracking-[-0.05em] ${pal.panelText} sm:text-3xl`}>{post.title}</h2>
        <p className={`mt-4 line-clamp-3 text-sm leading-7 ${pal.softMutedText}`}>{getEditableExcerpt(post, 180)}</p>
        <span className={`mt-5 inline-flex items-center gap-2 text-sm font-black ${pal.panelText}`}>
          Open article <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  )
}

export function DocumentTileCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className={`group flex h-full flex-col rounded-[2rem] border border-[#cad7cd] bg-white p-6 ${dc.motion.lift}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="rounded-[1.4rem] bg-[var(--slot4-accent-fill)] p-4 text-white">
          <FileText className="h-7 w-7" />
        </div>
        <span className="rounded-full bg-[var(--slot4-accent-soft)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--slot4-accent)]">
          {getEditableCategory(post)}
        </span>
      </div>
      <h3 className="mt-6 line-clamp-3 text-2xl font-black leading-tight tracking-[-0.05em] text-[var(--slot4-page-text)]">{post.title}</h3>
      <p className="mt-4 line-clamp-4 text-sm leading-7 text-[var(--slot4-soft-muted-text)]">{getEditableExcerpt(post, 155)}</p>
      <span className="mt-auto pt-6 text-sm font-black text-[var(--slot4-accent)]">Open document</span>
    </Link>
  )
}
