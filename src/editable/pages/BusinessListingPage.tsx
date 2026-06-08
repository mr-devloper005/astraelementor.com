import { EditableTaskArchiveRoute, taskMetadata } from '@/editable/pages/TaskArchivePage'

export const revalidate = 3
const baseRoute = '/listing'

export const generateMetadata = () => taskMetadata('listing', baseRoute)

export async function BusinessListingPageTaskPage({
  searchParams,
  basePath = baseRoute,
}: {
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  return <EditableTaskArchiveRoute task="listing" searchParams={searchParams} basePath={basePath} />
}

export default BusinessListingPageTaskPage

export const BusinessListingTaskPage = BusinessListingPageTaskPage
