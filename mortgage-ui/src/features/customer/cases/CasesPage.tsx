import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FolderOpen, ChevronLeft } from 'lucide-react'
import { customerApi } from '@/api/customer.api'
import type { CaseDto, MortgageDto } from '@/types/customer.types'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge, statusVariant } from '@/components/ui/Badge'
import { PageHeader } from '@/components/ui/PageHeader'
import { LoadingScreen, EmptyState } from '@/components/ui/Feedback'
import { formatDate, translateStatus, translateCaseType, formatCurrency } from '@/utils/formatters'

export function CasesPage() {
  const navigate = useNavigate()
  const [cases, setCases] = useState<CaseDto[]>([])
  const [mortgages, setMortgages] = useState<MortgageDto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    Promise.all([customerApi.getCases(), customerApi.getMortgages()])
      .then(([c, m]) => { setCases(c.data); setMortgages(m.data) })
      .catch(() => setError('שגיאה בטעינת התיקים'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingScreen />

  const mortgageByCase = (caseId: number) =>
    mortgages.find(m => m.mortgageId === caseId)

  return (
    <div className="p-8">
      <PageHeader title="התיקים שלי" subtitle={`סה״כ ${cases.length} תיקים`} />

      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

      {cases.length === 0 ? (
        <EmptyState icon={FolderOpen} title="אין תיקים" description="אין תיקים פתוחים כרגע" />
      ) : (
        <div className="space-y-3">
          {cases.map(c => {
            const mortgage = mortgageByCase(c.caseId)
            return (
              <Card
                key={c.caseId}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => mortgage && navigate(`/customer/mortgage/${mortgage.mortgageId}`)}
              >
                <CardContent className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                      <FolderOpen className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{translateCaseType(c.caseType)}</p>
                      <p className="text-sm text-gray-500">
                        נפתח: {formatDate(c.createdAt)}
                        {c.bank && ` · ${c.bank.bankName}`}
                      </p>
                      {mortgage && (
                        <p className="text-xs text-gray-400 mt-0.5">
                          סכום הלוואה: {formatCurrency(mortgage.loanAmount)}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={statusVariant(c.status)}>{translateStatus(c.status)}</Badge>
                    {mortgage && <ChevronLeft className="w-4 h-4 text-gray-400" />}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
