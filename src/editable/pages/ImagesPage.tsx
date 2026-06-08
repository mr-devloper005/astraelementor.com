import { EditableTaskArchiveRoute, taskMetadata } from '@/editable/pages/TaskArchivePage'

export const revalidate = 3
const baseRoute = '/image'

export const generateMetadata = () => taskMetadata('image', baseRoute)

export async function ImagesPageTaskPage({
  searchParams,
  basePath = baseRoute,
}: {
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  return <EditableTaskArchiveRoute task="image" searchParams={searchParams} basePath={basePath} />
}

export default ImagesPageTaskPage

export const ImagesTaskPage = ImagesPageTaskPage
