import { EditableTaskArchiveRoute, taskMetadata } from '@/editable/pages/TaskArchivePage'

export const revalidate = 3
const baseRoute = '/classified'

export const generateMetadata = () => taskMetadata('classified', baseRoute)

export async function ClassifiedPageTaskPage({
  searchParams,
  basePath = baseRoute,
}: {
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  return <EditableTaskArchiveRoute task="classified" searchParams={searchParams} basePath={basePath} />
}

export default ClassifiedPageTaskPage

export const ClassifiedTaskPage = ClassifiedPageTaskPage
