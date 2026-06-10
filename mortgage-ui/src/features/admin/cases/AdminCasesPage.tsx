import { useEffect, useState } from 'react'
import { FolderOpen } from 'lucide-react'
import { adminApi } from '@/api/admin.api'
import type { AdminCaseDto } from '@/types/advisor-admin.types'
import { Badge, statusVariant } from '@/components/ui/Badge'
import { PageHeader } from '@/components/ui/PageHeader'
import { LoadingScreen, EmptyState } from '@/components/ui/Feedback'
import { formatDate, translateStatus, translateCaseType } from '@/utils/formatters'

export function AdminCasesPage() {
  const [cases, setCases] = useState<AdminCaseDto[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    adminApi.getActiveCases()
      .then(r => setCases(r.data))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingScreen />

  return (
    <div className="p-8">
      <PageHeader title="תיקים פעילים" subtitle={`${cases.length} תיקים`} />
      {cases.length === 0
        ? <EmptyState icon={FolderOpen} title="אין תיקים פעילים" />
        : <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['מזהה', 'סוג', 'סטטוס', 'יועץ', 'תאריך פתיחה'].map(h => (
                    <th key={h} className="px-6 py-3 text-right font-medium text-gray-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {cases.map(c => (
                  <tr key={c.caseId} className="hover:bg-gray-50">
                    <td className="px-6 py-3 text-gray-900">#{c.caseId}</td>
                    <td className="px-6 py-3 text-gray-900">{translateCaseType(c.caseType)}</td>
                    <td className="px-6 py-3"><Badge variant={statusVariant(c.status)}>{translateStatus(c.status)}</Badge></td>
                    <td className="px-6 py-3 text-gray-500">{c.advisorId}</td>
                    <td className="px-6 py-3 text-gray-500">{formatDate(c.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      }
    </div>
  )
}
