import { EditableTaskArchiveRoute, taskMetadata } from '@/editable/pages/TaskArchivePage'

export const revalidate = 3
const baseRoute = '/sbm'

export const generateMetadata = () => taskMetadata('sbm', baseRoute)

export async function SocialBookmarkingPageTaskPage({
  searchParams,
  basePath = baseRoute,
}: {
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  return <EditableTaskArchiveRoute task="sbm" searchParams={searchParams} basePath={basePath} />
}

export default SocialBookmarkingPageTaskPage

export const SocialBookmarkingTaskPage = SocialBookmarkingPageTaskPage
