import { EditableTaskArchiveRoute, taskMetadata } from '@/editable/pages/TaskArchivePage'

export const revalidate = 3
const baseRoute = '/article'

export const generateMetadata = () => taskMetadata('article', baseRoute)

export async function ArticlePageTaskPage({
  searchParams,
  basePath = baseRoute,
}: {
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  return <EditableTaskArchiveRoute task="article" searchParams={searchParams} basePath={basePath} />
}

export default ArticlePageTaskPage

export const ArticleTaskPage = ArticlePageTaskPage
