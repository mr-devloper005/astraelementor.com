import { EditableTaskDetailRoute, generateEditableDetailMetadata } from '@/editable/pages/TaskDetailPage'

export const revalidate = 3
const taskKey = 'classified'

export async function generateStaticParams() {
  return []
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return generateEditableDetailMetadata(taskKey, params)
}

export default async function ClassifiedDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  return <EditableTaskDetailRoute task={taskKey} params={params} />
}
