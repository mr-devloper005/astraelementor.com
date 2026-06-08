import { EditableTaskDetailRoute, generateEditableDetailMetadata } from '@/editable/pages/TaskDetailPage'

export const revalidate = 3
const taskKey = 'profile'

export async function generateStaticParams() {
  return []
}

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }) {
  return generateEditableDetailMetadata(taskKey, params)
}

export default async function ProfileDetailPage({ params }: { params: Promise<{ username: string }> }) {
  return <EditableTaskDetailRoute task={taskKey} params={params} />
}
