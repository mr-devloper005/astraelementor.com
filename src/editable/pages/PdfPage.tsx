import { EditableTaskArchiveRoute, taskMetadata } from '@/editable/pages/TaskArchivePage'

export const revalidate = 3
const baseRoute = '/pdf'

export const generateMetadata = () => taskMetadata('pdf', baseRoute)

export async function PdfPageTaskPage({
  searchParams,
  basePath = baseRoute,
}: {
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  return <EditableTaskArchiveRoute task="pdf" searchParams={searchParams} basePath={basePath} />
}

export default PdfPageTaskPage

export const PdfTaskPage = PdfPageTaskPage
