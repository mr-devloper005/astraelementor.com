'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { MessageSquare, Search } from 'lucide-react'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

type StoredComment = {
  id: string
  name: string
  email?: string
  comment: string
  createdAt: string
  articleTitle?: string
  articleSlug?: string
}

const COMMENTS_PER_PAGE = 8
const COMMENT_KEY_PREFIX = 'slot4:article-comments:'

const formatDate = (value: string) => {
  try {
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(value))
  } catch {
    return 'Just now'
  }
}

const readCommentsFromStorage = (): StoredComment[] => {
  const items: StoredComment[] = []
  for (let index = 0; index < window.localStorage.length; index += 1) {
    const key = window.localStorage.key(index)
    if (!key?.startsWith(COMMENT_KEY_PREFIX)) continue
    const articleSlug = key.replace(COMMENT_KEY_PREFIX, '')
    try {
      const parsed = JSON.parse(window.localStorage.getItem(key) || '[]')
      if (!Array.isArray(parsed)) continue
      for (const item of parsed) {
        if (!item || typeof item !== 'object') continue
        if (typeof item.name !== 'string' || typeof item.comment !== 'string') continue
        items.push({
          id: typeof item.id === 'string' ? item.id : `${articleSlug}-${items.length}`,
          name: item.name,
          email: typeof item.email === 'string' ? item.email : undefined,
          comment: item.comment,
          createdAt: typeof item.createdAt === 'string' ? item.createdAt : new Date().toISOString(),
          articleTitle: typeof item.articleTitle === 'string' ? item.articleTitle : undefined,
          articleSlug: typeof item.articleSlug === 'string' ? item.articleSlug : articleSlug,
        })
      }
    } catch {
      // Ignore corrupted local comment records.
    }
  }

  return items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export default function CommentsPage() {
  const [comments, setComments] = useState<StoredComment[]>([])
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    setComments(readCommentsFromStorage())
  }, [])

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return comments
    return comments.filter((item) => [item.name, item.email, item.comment, item.articleTitle, item.articleSlug].filter(Boolean).some((value) => String(value).toLowerCase().includes(term)))
  }, [comments, query])

  const totalPages = Math.max(1, Math.ceil(filtered.length / COMMENTS_PER_PAGE))
  const currentPage = Math.min(page, totalPages)
  const visibleComments = filtered.slice((currentPage - 1) * COMMENTS_PER_PAGE, currentPage * COMMENTS_PER_PAGE)

  function refreshComments() {
    setComments(readCommentsFromStorage())
    setPage(1)
  }

  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] px-4 py-10 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-[1200px] overflow-hidden rounded-[2.4rem] border border-[#ced9d1] bg-white shadow-[0_24px_70px_rgba(21,51,58,0.09)]">
          <div className="grid gap-6 bg-[var(--slot4-blue-band)] px-6 py-8 text-white lg:grid-cols-[1fr_auto] lg:items-end lg:px-10">
            <div>
              <p className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.28em] text-white/72">
                <MessageSquare className="h-4 w-4" /> Local comments
              </p>
              <h1 className="mt-4 text-5xl font-black tracking-[-0.07em]">Comments</h1>
              <p className="mt-4 max-w-2xl text-sm leading-8 text-white/82">Review comments stored in this browser from article detail pages.</p>
            </div>
            <button type="button" className="rounded-full bg-white px-5 py-3 text-sm font-black text-[var(--slot4-page-text)]" onClick={refreshComments}>Refresh comments</button>
          </div>

          <div className="px-6 py-8 lg:px-10">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:max-w-md">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--slot4-soft-muted-text)]" />
                <input
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value)
                    setPage(1)
                  }}
                  placeholder="Search comments..."
                  className="h-12 w-full rounded-2xl border border-[#ced9d1] bg-[#f8fbf8] pl-9 pr-3 text-sm font-semibold outline-none"
                />
              </div>
              <p className="text-sm text-[var(--slot4-soft-muted-text)]">{filtered.length} comment{filtered.length === 1 ? '' : 's'} found</p>
            </div>

            {visibleComments.length ? (
              <section className="mt-8 grid gap-4">
                {visibleComments.map((item) => (
                  <article key={`${item.articleSlug}-${item.id}`} className="rounded-[1.8rem] border border-[#d5dfd9] bg-[#f8fbf8] p-5">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="font-black text-[var(--slot4-page-text)]">{item.name}</p>
                        <p className="mt-1 text-xs text-[var(--slot4-soft-muted-text)]">{formatDate(item.createdAt)}</p>
                      </div>
                      {item.articleSlug ? <Link href={`/article/${item.articleSlug}`} className="text-sm font-black text-[var(--slot4-accent)]">Open article</Link> : null}
                    </div>
                    {item.articleTitle ? <p className="mt-4 text-sm font-bold text-[var(--slot4-page-text)]">{item.articleTitle}</p> : null}
                    <p className="mt-3 text-sm leading-7 text-[var(--slot4-soft-muted-text)]">{item.comment}</p>
                  </article>
                ))}
              </section>
            ) : (
              <section className="mt-8 rounded-[1.8rem] border border-dashed border-[#ced9d1] bg-[#f8fbf8] p-8 text-center">
                <h2 className="text-xl font-black text-[var(--slot4-page-text)]">No comments yet</h2>
                <p className="mt-2 text-sm text-[var(--slot4-soft-muted-text)]">Add a comment on any article page and it will appear here.</p>
              </section>
            )}

            {filtered.length > COMMENTS_PER_PAGE ? (
              <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-[1.8rem] border border-[#d5dfd9] bg-[#f8fbf8] p-4 text-sm text-[var(--slot4-soft-muted-text)]">
                <span>Page {currentPage} of {totalPages}</span>
                <div className="flex gap-2">
                  <button type="button" className="rounded-full border border-[#ced9d1] px-4 py-2 font-black disabled:opacity-40" disabled={currentPage <= 1} onClick={() => setPage((value) => Math.max(1, value - 1))}>Previous</button>
                  <button type="button" className="rounded-full border border-[#ced9d1] px-4 py-2 font-black disabled:opacity-40" disabled={currentPage >= totalPages} onClick={() => setPage((value) => Math.min(totalPages, value + 1))}>Next</button>
                </div>
              </div>
            ) : null}
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
