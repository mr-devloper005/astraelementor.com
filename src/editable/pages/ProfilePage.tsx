import { EditableTaskArchiveRoute, taskMetadata } from '@/editable/pages/TaskArchivePage'

export const revalidate = 3
const baseRoute = '/profile'

export const generateMetadata = () => taskMetadata('profile', baseRoute)

export async function ProfilePageTaskPage({
  searchParams,
  basePath = baseRoute,
}: {
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  return <EditableTaskArchiveRoute task="profile" searchParams={searchParams} basePath={basePath} />
}

export default ProfilePageTaskPage

export const ProfileTaskPage = ProfilePageTaskPage
