import Link from 'next/link'
import type { CSSProperties } from 'react'
import { notFound } from 'next/navigation'
import { ArrowLeft, Bookmark, Building2, Camera, CheckCircle2, Download, ExternalLink, FileText, Globe2, Mail, MapPin, MessageCircle, Phone, Tag, UserRound } from 'lucide-react'
import { buildPostMetadata, buildTaskMetadata } from '@/lib/seo'
import { buildPostUrl, fetchArticleComments, fetchTaskPostBySlug, fetchTaskPosts } from '@/lib/task-data'
import { getTaskConfig, SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export const revalidate = 3

export async function generateEditableDetailMetadata(task: TaskKey, params: Promise<{ slug?: string; username?: string }>) {
  const resolved = await params
  const slug = resolved.slug || resolved.username || ''
  const post = await fetchTaskPostBySlug(task, slug)
  return post ? await buildPostMetadata(task, post) : await buildTaskMetadata(task)
}

export async function EditableTaskDetailRoute({ task, params }: { task: TaskKey; params: Promise<{ slug?: string; username?: string }> }) {
  const resolved = await params
  const slug = resolved.slug || resolved.username || ''
  const post = await fetchTaskPostBySlug(task, slug)
  if (!post) notFound()
  const related = (await fetchTaskPosts(task, 7)).filter((item) => item.slug !== post.slug).slice(0, 4)
  const comments = task === 'article' ? await fetchArticleComments(post.slug, 50) : []
  return <TaskDetailView task={task} post={post} related={related} comments={comments} />
}

const getContent = (post: SitePost) => (post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {})
const asText = (value: unknown) => (typeof value === 'string' ? value.trim() : '')
const isUrl = (value: string) => value.startsWith('/') || /^https?:\/\//i.test(value)

const getField = (post: SitePost, keys: string[]) => {
  const content = getContent(post)
  for (const key of keys) {
    const value = asText(content[key])
    if (value) return value
  }
  return ''
}

const getImages = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.map((item) => item?.url).filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const images = Array.isArray(content.images) ? content.images.filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const singleImages = ['image', 'featuredImage', 'thumbnail', 'logo', 'avatar'].map((key) => asText(content[key])).filter((url) => url && isUrl(url))
  return [...media, ...images, ...singleImages].filter(Boolean).slice(0, 12)
}

const getBody = (post: SitePost) => {
  const content = getContent(post)
  return asText(content.body) || asText(content.description) || asText(content.details) || post.summary || 'Details will appear here once available.'
}

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')

const safeUrl = (value: string) => (/^https?:\/\//i.test(value) ? value : '#')

const linkifyMarkdown = (value: string) =>
  value.replace(/\[([^\]]+)]\((https?:\/\/[^\s)]+)\)/gi, (_match, label, url) => `<a href="${safeUrl(url)}" target="_blank" rel="nofollow noopener noreferrer">${label}</a>`)

const linkifyText = (value: string) =>
  linkifyMarkdown(value).replace(/(^|[\s(>])((https?:\/\/)[^\s<)]+)/gi, (_match, prefix, url) => `${prefix}<a href="${safeUrl(url)}" target="_blank" rel="nofollow noopener noreferrer">${url}</a>`)

const hardenLinks = (html: string) =>
  html.replace(/<a\s+([^>]*href=["'][^"']+["'][^>]*)>/gi, (_match, attrs) => {
    let next = String(attrs).replace(/\s+on\w+=("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    if (!/\starget=/i.test(next)) next += ' target="_blank"'
    if (!/\srel=/i.test(next)) next += ' rel="nofollow noopener noreferrer"'
    return `<a ${next}>`
  })

const sanitizeHtml = (html: string) =>
  hardenLinks(
    html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<(iframe|object|embed)[^>]*>[\s\S]*?<\/\1>/gi, '')
      .replace(/\s+on\w+=("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
      .replace(/(href|src)=(['"])javascript:[\s\S]*?\2/gi, '$1="#"')
  )

const formatPlainText = (raw: string) => {
  const value = raw.trim()
  if (!value) return ''
  if (/<[a-z][\s\S]*>/i.test(value)) return sanitizeHtml(linkifyMarkdown(value))
  return value
    .split(/\n{2,}/)
    .map((part) => `<p>${linkifyText(escapeHtml(part).replace(/\n/g, '<br />'))}</p>`)
    .join('')
}

const summaryText = (post: SitePost) => post.summary || asText(getContent(post).description) || asText(getContent(post).excerpt) || ''
const categoryOf = (post: SitePost, fallback: string) => asText(getContent(post).category) || post.tags?.[0] || fallback
const mapSrcFor = (post: SitePost) => {
  const address = getField(post, ['address', 'location', 'city'])
  const lat = getField(post, ['lat', 'latitude'])
  const lng = getField(post, ['lng', 'lon', 'longitude'])
  if (lat && lng) return `https://maps.google.com/maps?q=${encodeURIComponent(`${lat},${lng}`)}&z=14&output=embed`
  if (address) return `https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=13&output=embed`
  return ''
}

export function TaskDetailView({ task, post, related, comments = [] }: { task: TaskKey; post: SitePost; related: SitePost[]; comments?: Array<{ id: string; name: string; comment: string; createdAt: string }> }) {
  const detailVars = {
    '--detail-bg': 'var(--slot4-page-bg)',
    '--detail-text': 'var(--slot4-page-text)',
    '--detail-surface': '#ffffff',
    '--detail-accent': 'var(--slot4-accent-fill)',
  } as CSSProperties

  return (
    <EditableSiteShell>
      <main style={detailVars} className="bg-[var(--detail-bg)] text-[var(--detail-text)]">
        {task === 'listing' ? <ListingDetail post={post} related={related} /> : null}
        {task === 'classified' ? <ClassifiedDetail post={post} related={related} /> : null}
        {task === 'image' ? <ImageDetail post={post} related={related} /> : null}
        {task === 'sbm' ? <BookmarkDetail post={post} related={related} /> : null}
        {task === 'pdf' ? <PdfDetail post={post} related={related} /> : null}
        {task === 'profile' ? <ProfileDetail post={post} related={related} /> : null}
        {task === 'article' ? <ArticleDetail post={post} related={related} comments={comments} /> : null}
      </main>
    </EditableSiteShell>
  )
}

function DetailHero({ task, title, eyebrow, summary, children }: { task: TaskKey; title: string; eyebrow: string; summary?: string; children?: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-[1440px] px-4 pt-8 sm:px-6 lg:px-8 lg:pt-10">
      <div className="overflow-hidden rounded-[2.4rem] border border-[#ced9d1] bg-white shadow-[0_24px_70px_rgba(21,51,58,0.09)]">
        <div className="grid gap-8 bg-[var(--slot4-blue-band)] px-6 py-8 text-white lg:grid-cols-[1.1fr_0.9fr] lg:px-10">
          <div>
            <BackLink task={task} />
            <p className="mt-6 text-[11px] font-black uppercase tracking-[0.28em] text-white/72">{eyebrow}</p>
            <h1 className="mt-4 text-4xl font-black leading-[0.94] tracking-[-0.07em] sm:text-5xl lg:text-6xl">{title}</h1>
            {summary ? <p className="mt-5 max-w-3xl text-base leading-8 text-white/84">{summary}</p> : null}
          </div>
          <div className="self-end rounded-[1.8rem] border border-white/16 bg-white/12 p-5 backdrop-blur">
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}

function BackLink({ task }: { task: TaskKey }) {
  const taskConfig = getTaskConfig(task)
  return (
    <Link href={taskConfig?.route || '/'} className="inline-flex items-center gap-2 rounded-full bg-white/14 px-4 py-2 text-sm font-black text-white hover:bg-white/18">
      <ArrowLeft className="h-4 w-4" /> Back to {taskConfig?.label || 'posts'}
    </Link>
  )
}

function ArticleDetail({ post, related, comments }: { post: SitePost; related: SitePost[]; comments: Array<{ id: string; name: string; comment: string; createdAt: string }> }) {
  const images = getImages(post)
  return (
    <>
      <DetailHero task="article" eyebrow={categoryOf(post, 'Article')} title={post.title} summary={summaryText(post)}>
        <p className="text-[11px] font-black uppercase tracking-[0.22em] text-white/70">Reading note</p>
        <p className="mt-3 text-sm leading-7 text-white/84">Long-form pages are framed with larger headlines, richer spacing, and focused supporting panels.</p>
      </DetailHero>
      <section className="mx-auto grid max-w-[1440px] gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:px-8 lg:py-12">
        <article className="min-w-0 rounded-[2rem] border border-[#ced9d1] bg-white p-5 shadow-[0_18px_54px_rgba(21,51,58,0.08)] sm:p-8 lg:p-10">
          {images[0] ? <img src={images[0]} alt="" className="max-h-[620px] w-full rounded-[1.6rem] object-cover" /> : null}
          <BodyContent post={post} />
          <EditableComments slug={post.slug} comments={comments} />
        </article>
        <RelatedPanel task="article" post={post} related={related} />
      </section>
    </>
  )
}

function ListingDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  const logo = images[0]
  const address = getField(post, ['address', 'location', 'city'])
  const phone = getField(post, ['phone', 'telephone', 'mobile'])
  const email = getField(post, ['email'])
  const website = getField(post, ['website', 'url'])
  const mapSrc = mapSrcFor(post)
  return (
    <>
      <DetailHero task="listing" eyebrow="Business listing" title={post.title} summary={summaryText(post)}>
        <InfoChip label="Location" value={address || 'Available on page'} />
        <InfoChip label="Contact" value={phone || email || 'Available on page'} />
      </DetailHero>
      <section className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
          <article className="rounded-[2rem] border border-[#ced9d1] bg-white p-6 shadow-[0_18px_54px_rgba(21,51,58,0.08)] sm:p-8">
            <div className="grid gap-6 sm:grid-cols-[150px_1fr]">
              <div className="flex h-36 w-36 items-center justify-center overflow-hidden rounded-[2rem] bg-[#eef4f1] ring-1 ring-[#d7e1db]">
                {logo ? <img src={logo} alt="" className="h-full w-full object-cover" /> : <Building2 className="h-14 w-14 opacity-40" />}
              </div>
              <div>
                <h2 className="text-4xl font-black leading-[0.98] tracking-[-0.07em] sm:text-5xl">{post.title}</h2>
                <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--slot4-soft-muted-text)]">{summaryText(post)}</p>
              </div>
            </div>
            <InfoGrid items={[['Location', address, MapPin], ['Phone', phone, Phone], ['Email', email, Mail], ['Website', website, Globe2]]} />
            <BodyContent post={post} />
            <ImageStrip images={images.slice(1)} label="Business showcase" />
          </article>
          <aside className="space-y-5">
            {mapSrc ? <MapBox src={mapSrc} label={address || post.title} /> : <ContactAction website={website} phone={phone} email={email} />}
            {mapSrc ? <ContactAction website={website} phone={phone} email={email} /> : null}
            <RelatedPanel task="listing" post={post} related={related} compact />
          </aside>
        </div>
      </section>
    </>
  )
}

function ClassifiedDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  const price = getField(post, ['price', 'amount', 'budget'])
  const location = getField(post, ['location', 'address', 'city'])
  const condition = getField(post, ['condition', 'availability', 'type'])
  const phone = getField(post, ['phone', 'telephone', 'mobile'])
  const email = getField(post, ['email'])
  const website = getField(post, ['website', 'url'])
  return (
    <>
      <DetailHero task="classified" eyebrow="Classified notice" title={post.title} summary={summaryText(post)}>
        {price ? <InfoChip label="Price" value={price} /> : null}
        {condition ? <InfoChip label="Condition" value={condition} /> : null}
        {location ? <InfoChip label="Location" value={location} /> : null}
      </DetailHero>
      <section className="mx-auto grid max-w-[1440px] gap-7 px-4 py-8 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8 lg:py-12">
        <aside className="rounded-[2rem] border border-[#ced9d1] bg-[var(--slot4-page-text)] p-7 text-white shadow-[0_18px_54px_rgba(21,51,58,0.14)] lg:sticky lg:top-24 lg:self-start">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-white/58">Quick actions</p>
          <div className="mt-6 grid gap-3">
            {price ? <BadgeLine label="Price" value={price} /> : null}
            {condition ? <BadgeLine label="Condition" value={condition} /> : null}
            {location ? <BadgeLine label="Location" value={location} /> : null}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {phone ? <a href={`tel:${phone}`} className="rounded-full bg-white px-5 py-3 text-sm font-black text-[var(--slot4-page-text)]">Call now</a> : null}
            {email ? <a href={`mailto:${email}`} className="rounded-full border border-white/25 px-5 py-3 text-sm font-black">Email</a> : null}
          </div>
        </aside>
        <article className="rounded-[2rem] border border-[#ced9d1] bg-white p-6 shadow-[0_18px_54px_rgba(21,51,58,0.08)] sm:p-8">
          <ImageStrip images={images} label="Offer images" large />
          <BodyContent post={post} />
          <ContactAction website={website} phone={phone} email={email} />
          <RelatedPanel task="classified" post={post} related={related} />
        </article>
      </section>
    </>
  )
}

function ImageDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  return (
    <>
      <DetailHero task="image" eyebrow="Image story" title={post.title} summary={summaryText(post)}>
        <p className="text-sm leading-7 text-white/82">Gallery pages keep the media dominant while still giving the surrounding text room to breathe.</p>
      </DetailHero>
      <section className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <aside className="rounded-[2rem] border border-[#ced9d1] bg-white p-7 lg:sticky lg:top-24 lg:self-start">
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-page-text)] px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-white"><Camera className="h-4 w-4" /> Image story</div>
            <h1 className="mt-6 text-4xl font-black leading-[0.98] tracking-[-0.07em] sm:text-5xl">{post.title}</h1>
            <p className="mt-5 text-base leading-8 text-[var(--slot4-soft-muted-text)]">{summaryText(post)}</p>
            <BodyContent post={post} compact />
          </aside>
          <div className="columns-1 gap-5 space-y-5 md:columns-2">
            {(images.length ? images : ['/placeholder.svg?height=900&width=1200']).map((image, index) => (
              <figure key={`${image}-${index}`} className="break-inside-avoid overflow-hidden rounded-[2rem] border border-[#ced9d1] bg-white shadow-[0_18px_54px_rgba(21,51,58,0.08)]">
                <img src={image} alt="" className="w-full object-cover" />
                {index === 0 ? <figcaption className="p-5 text-sm font-bold text-[var(--slot4-soft-muted-text)]">Featured visual from this image post.</figcaption> : null}
              </figure>
            ))}
          </div>
        </div>
        <div className="mt-10"><RelatedPanel task="image" post={post} related={related} /></div>
      </section>
    </>
  )
}

function BookmarkDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const website = getField(post, ['website', 'url', 'link'])
  return (
    <>
      <DetailHero task="sbm" eyebrow="Saved resource" title={post.title} summary={summaryText(post)}>
        <p className="text-sm leading-7 text-white/82">Bookmarks are framed like references worth keeping, with clear outbound actions and calm metadata.</p>
      </DetailHero>
      <section className="mx-auto grid max-w-[1440px] gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8 lg:py-12">
        <article className="rounded-[2rem] border border-[#ced9d1] bg-white p-7 shadow-[0_18px_54px_rgba(21,51,58,0.08)] sm:p-10">
          <div className="flex h-20 w-20 items-center justify-center rounded-[2rem] bg-[var(--slot4-page-text)] text-white"><Bookmark className="h-9 w-9" /></div>
          <h1 className="mt-7 text-4xl font-black leading-[0.98] tracking-[-0.07em] sm:text-6xl">{post.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-9 text-[var(--slot4-soft-muted-text)]">{summaryText(post)}</p>
          {website ? <Link href={website} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--slot4-page-text)] px-5 py-3 text-sm font-black text-white">Open saved resource <ExternalLink className="h-4 w-4" /></Link> : null}
          <BodyContent post={post} />
        </article>
        <RelatedPanel task="sbm" post={post} related={related} />
      </section>
    </>
  )
}

function PdfDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const fileUrl = getField(post, ['fileUrl', 'pdfUrl', 'documentUrl', 'url'])
  const category = categoryOf(post, 'PDF')
  const summary = summaryText(post)
  return (
    <>
      <section className="mx-auto max-w-[1560px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-8 xl:grid-cols-[300px_minmax(0,1fr)_320px]">
          <aside className="rounded-[2.2rem] bg-[var(--slot4-page-text)] p-6 text-white shadow-[0_24px_70px_rgba(21,51,58,0.18)] lg:sticky lg:top-24 lg:self-start">
            <BackLink task="pdf" />
            <p className="mt-6 text-[11px] font-black uppercase tracking-[0.28em] text-white/65">Document archive</p>
            <h1 className="mt-4 text-4xl font-black leading-[0.96] tracking-[-0.07em]">{post.title}</h1>
           
            <div className="mt-6 grid gap-3">
              <div className="rounded-[1.2rem] border border-white/12 bg-white/8 p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/60">Category</p>
                <p className="mt-2 text-sm font-bold">{category}</p>
              </div>
              
              
            </div>

            {fileUrl ? (
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={fileUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-[0.85rem] bg-[#f0bc2b] px-5 py-3 text-sm font-black text-[var(--slot4-page-text)]">
                  Download <Download className="h-4 w-4" />
                </Link>
                <Link href={fileUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-[0.85rem] border border-white/15 px-5 py-3 text-sm font-black text-white">
                  Open file
                </Link>
              </div>
            ) : null}
          </aside>

          <article className="overflow-hidden rounded-[2.4rem] border border-[#ced9d1] bg-white shadow-[0_24px_70px_rgba(21,51,58,0.09)]">
            <div className="flex items-center justify-between gap-4 border-b border-[#d8e2dc] bg-[#f7faf8] px-5 py-4 sm:px-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--slot4-soft-muted-text)]">Preview sheet</p>
                <p className="mt-1 text-sm font-bold text-[var(--slot4-page-text)]">Click anywhere on the document to open it</p>
              </div>
              <div className="hidden items-center gap-2 sm:flex">
                <span className="h-3 w-3 rounded-full bg-[#ff7e6d]" />
                <span className="h-3 w-3 rounded-full bg-[#f0bc2b]" />
                <span className="h-3 w-3 rounded-full bg-[#7da78c]" />
              </div>
            </div>

            <div className="bg-[linear-gradient(180deg,#f7faf8_0%,#ffffff_54%)] p-4 sm:p-6">
              {fileUrl ? (
                <div className="relative overflow-hidden rounded-[2rem] border border-[#d8e2dc] bg-[#eef4f0] shadow-[0_18px_45px_rgba(21,51,58,0.08)]">
                  <Link href={fileUrl} target="_blank" rel="noreferrer" aria-label={`Open ${post.title} PDF`} className="absolute inset-0 z-10" />
                  <iframe
                    src={`${fileUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                    title={post.title}
                    className="h-[76vh] w-full pointer-events-none bg-white"
                  />
                </div>
              ) : (
                <div className="flex min-h-[60vh] items-center justify-center rounded-[2rem] border border-dashed border-[#d8e2dc] bg-[#f7faf8] p-10 text-center">
                  <div>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]">
                      <FileText className="h-8 w-8" />
                    </div>
                    <p className="mt-4 text-xl font-black">Preview not available</p>
                    <p className="mt-2 text-sm text-[var(--slot4-soft-muted-text)]">This post does not include a direct file URL yet.</p>
                  </div>
                </div>
              )}
            </div>

            <div className="grid gap-4 border-t border-[#d8e2dc] bg-[#f8fbf8] p-5 sm:grid-cols-3">
              <div className="rounded-[1.5rem] border border-[#d5dfd9] bg-white p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--slot4-soft-muted-text)]">Read</p>
                <p className="mt-2 text-sm leading-6 text-[var(--slot4-page-text)]">Open the preview and scan the page like a document sheet.</p>
              </div>
              <div className="rounded-[1.5rem] border border-[#d5dfd9] bg-white p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--slot4-soft-muted-text)]">Save</p>
                <p className="mt-2 text-sm leading-6 text-[var(--slot4-page-text)]">Use the download action to keep the file locally.</p>
              </div>
              <div className="rounded-[1.5rem] border border-[#d5dfd9] bg-white p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--slot4-soft-muted-text)]">Share</p>
                <p className="mt-2 text-sm leading-6 text-[var(--slot4-page-text)]">Related documents stay one step away in the side rail.</p>
              </div>
            </div>
          </article>

          
        </div>
      </section>
    </>
  )
}

function ProfileDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  const role = getField(post, ['role', 'designation', 'company', 'location'])
  const website = getField(post, ['website', 'url'])
  const email = getField(post, ['email'])
  return (
    <>
      <DetailHero task="profile" eyebrow="Profile" title={post.title} summary={summaryText(post)}>
        {role ? <InfoChip label="Role" value={role} /> : null}
      </DetailHero>
      <section className="mx-auto grid max-w-[1440px] gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[420px_minmax(0,1fr)] lg:px-8 lg:py-12">
        <aside className="rounded-[2rem] border border-[#ced9d1] bg-white p-8 text-center shadow-[0_18px_54px_rgba(21,51,58,0.08)] lg:sticky lg:top-24 lg:self-start">
          <div className="mx-auto flex h-40 w-40 items-center justify-center overflow-hidden rounded-full bg-[#eef4f1] ring-1 ring-[#d7e1db]">
            {images[0] ? <img src={images[0]} alt="" className="h-full w-full object-cover" /> : <UserRound className="h-16 w-16 opacity-45" />}
          </div>
          <h1 className="mt-6 text-4xl font-black leading-[0.98] tracking-[-0.07em]">{post.title}</h1>
          {role ? <p className="mt-3 text-xs font-black uppercase tracking-[0.18em] text-[var(--slot4-accent)]">{role}</p> : null}
          <ContactAction website={website} email={email} />
        </aside>
        <article className="rounded-[2rem] border border-[#ced9d1] bg-white p-7 shadow-[0_18px_54px_rgba(21,51,58,0.08)] sm:p-10">
          <BodyContent post={post} />
          <ImageStrip images={images.slice(1)} label="Profile gallery" />
          <RelatedPanel task="profile" post={post} related={related} />
        </article>
      </section>
    </>
  )
}

function BodyContent({ post, compact = false }: { post: SitePost; compact?: boolean }) {
  return <div className={`article-content mt-8 max-w-none ${compact ? 'text-base leading-8' : 'text-lg leading-9'}`} dangerouslySetInnerHTML={{ __html: formatPlainText(getBody(post)) }} />
}

function InfoGrid({ items }: { items: Array<[string, string, typeof MapPin]> }) {
  const visible = items.filter(([, value]) => value)
  if (!visible.length) return null
  return (
    <div className="mt-8 grid gap-3 sm:grid-cols-2">
      {visible.map(([label, value, Icon]) => (
        <div key={label} className="rounded-[1.5rem] border border-[#d5dfd9] bg-[#f4f8f3] p-4">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[var(--slot4-soft-muted-text)]"><Icon className="h-4 w-4" /> {label}</div>
          <p className="mt-2 break-words text-sm font-bold leading-6">{value}</p>
        </div>
      ))}
    </div>
  )
}

function ImageStrip({ images, label, large = false }: { images: string[]; label: string; large?: boolean }) {
  if (!images.length) return null
  return (
    <section className="mt-8">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--slot4-accent)]">{label}</p>
      <div className={`mt-4 grid gap-3 ${large ? 'sm:grid-cols-2' : 'grid-cols-2 sm:grid-cols-4'}`}>
        {images.slice(0, large ? 4 : 8).map((image, index) => <img key={`${image}-${index}`} src={image} alt="" className="aspect-[4/3] rounded-[1.4rem] object-cover ring-1 ring-[#d7e1db]" />)}
      </div>
    </section>
  )
}

function MapBox({ src, label }: { src: string; label: string }) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-[#ced9d1] bg-white shadow-[0_18px_54px_rgba(21,51,58,0.08)]">
      <div className="flex items-center gap-2 p-4 text-sm font-black"><MapPin className="h-4 w-4" /> {label || 'Map location'}</div>
      <iframe src={src} title="Map" loading="lazy" className="h-80 w-full border-0" />
    </div>
  )
}

function ContactAction({ website, phone, email }: { website?: string; phone?: string; email?: string }) {
  if (!website && !phone && !email) return null
  return (
    <div className="mt-5 rounded-[2rem] border border-[#ced9d1] bg-white p-5 shadow-[0_18px_54px_rgba(21,51,58,0.08)]">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--slot4-soft-muted-text)]">Quick actions</p>
      <div className="mt-4 flex flex-wrap gap-3">
        {website ? <Link href={website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-page-text)] px-4 py-2 text-sm font-black text-white">Website <ExternalLink className="h-4 w-4" /></Link> : null}
        {phone ? <a href={`tel:${phone}`} className="inline-flex items-center gap-2 rounded-full border border-[#ced9d1] px-4 py-2 text-sm font-black"><Phone className="h-4 w-4" /> Call</a> : null}
        {email ? <a href={`mailto:${email}`} className="inline-flex items-center gap-2 rounded-full border border-[#ced9d1] px-4 py-2 text-sm font-black"><Mail className="h-4 w-4" /> Email</a> : null}
      </div>
    </div>
  )
}

function BadgeLine({ label, value }: { label: string; value: string }) {
  return <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm"><span className="font-black uppercase tracking-[0.16em] text-white/60">{label}</span><span className="font-black">{value}</span></div>
}

function InfoChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1rem] border border-white/16 bg-white/12 px-4 py-3 text-sm text-white">
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/62">{label}</p>
      <p className="mt-1 font-bold">{value}</p>
    </div>
  )
}

function RelatedPanel({ task, post, related, compact = false }: { task: TaskKey; post: SitePost; related: SitePost[]; compact?: boolean }) {
  const taskConfig = getTaskConfig(task)
  return (
    <aside className="min-w-0 space-y-5">
      {!compact ? (
        <div className="rounded-[2rem] border border-[#ced9d1] bg-white p-5 shadow-[0_18px_54px_rgba(21,51,58,0.08)]">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--slot4-soft-muted-text)]">About this post</p>
          <div className="mt-4 grid gap-3 text-sm font-bold text-[var(--slot4-muted-text)]">
            <p className="inline-flex items-center gap-2"><Tag className="h-4 w-4" /> Task: {taskConfig?.label || task}</p>
            <p className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Site: {SITE_CONFIG.name}</p>
            {post.publishedAt ? <p>Published: {new Date(post.publishedAt).toLocaleDateString()}</p> : null}
          </div>
        </div>
      ) : null}
      {related.length ? (
        <div className="rounded-[2rem] border border-[#ced9d1] bg-white p-5 shadow-[0_18px_54px_rgba(21,51,58,0.08)]">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-black tracking-[-0.04em]">More like this</h2>
            <Link href={taskConfig?.route || '/'} className="text-xs font-black uppercase tracking-[0.16em] text-[var(--slot4-soft-muted-text)]">View all</Link>
          </div>
          <div className="mt-5 grid gap-3">
            {related.map((item, index) => <RelatedCard key={item.id || item.slug || index} task={task} post={item} />)}
          </div>
        </div>
      ) : null}
    </aside>
  )
}

function RelatedCard({ task, post }: { task: TaskKey; post: SitePost }) {
  const image = getImages(post)[0]
  return (
    <Link href={buildPostUrl(task, post.slug)} className="group flex gap-3 rounded-2xl border border-[#d5dfd9] bg-[#f8fbf8] p-3 transition hover:-translate-y-0.5 hover:shadow-lg">
      {image && task !== 'sbm' ? <img src={image} alt="" className="h-20 w-20 shrink-0 rounded-xl object-cover" /> : <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-white"><FileText className="h-6 w-6 opacity-45" /></div>}
      <div className="min-w-0">
        <h3 className="line-clamp-3 text-sm font-black leading-tight tracking-[-0.03em]">{post.title}</h3>
        <p className="mt-2 line-clamp-2 text-xs leading-5 text-[var(--slot4-soft-muted-text)]">{summaryText(post)}</p>
      </div>
    </Link>
  )
}

function EditableComments({ slug, comments }: { slug: string; comments: Array<{ id: string; name: string; comment: string; createdAt: string }> }) {
  return (
    <section className="mt-10 rounded-[2rem] border border-[#ced9d1] bg-[#f8fbf8] p-5">
      <div className="flex items-center gap-2 text-lg font-black"><MessageCircle className="h-5 w-5" /> Comments</div>
      <div className="mt-5 grid gap-3">
        {comments.slice(0, 5).map((comment) => (
          <div key={comment.id} className="rounded-2xl border border-[#d5dfd9] bg-white p-4">
            <p className="text-sm font-black">{comment.name}</p>
            <p className="mt-2 text-sm leading-6 text-[var(--slot4-soft-muted-text)]">{comment.comment}</p>
          </div>
        ))}
        {!comments.length ? <p className="text-sm text-[var(--slot4-soft-muted-text)]">No comments yet for {slug}.</p> : null}
      </div>
    </section>
  )
}
