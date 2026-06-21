import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FolderOpen, ChevronLeft } from 'lucide-react'
import { fetchCases } from '@/store/casesSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { customerApi } from '@/api/customer.api'
import { useState } from 'react'
import type { MortgageDto } from '@/types/customer.types'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge, statusVariant } from '@/components/ui/Badge'
import { PageHeader } from '@/components/ui/PageHeader'
import { LoadingScreen, EmptyState } from '@/components/ui/Feedback'
import { formatDate, translateStatus, translateCaseType, formatCurrency } from '@/utils/formatters'

export function CasesPage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  // Redux state
  const { data: cases, loading, error } = useAppSelector((s) => s.cases)
  const [mortgages, setMortgages] = useState<MortgageDto[]>([])

  useEffect(() => {
    dispatch(fetchCases())
    customerApi.getMortgages().then((r) => setMortgages(r.data))
  }, [dispatch])

  if (loading) return <LoadingScreen />

  const mortgageByCase = (caseId: number) =>
    mortgages.find((m) => m.mortgageId === caseId)

  return (
    <div className="p-8">
      <PageHeader title="התיקים שלי" subtitle={`סה״כ ${cases.length} תיקים`} />

      {error && (
        <div className="flex items-center justify-between bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-4 text-sm text-red-700">
          <span>{error}</span>
          <button
            onClick={() => dispatch(fetchCases())}
            className="text-red-600 underline hover:no-underline"
          >
            נסה שוב
          </button>
        </div>
      )}

      {cases.length === 0 ? (
        <EmptyState icon={FolderOpen} title="אין תיקים" description="אין תיקים פתוחים כרגע" />
      ) : (
        <div className="space-y-3">
          {cases.map((c) => {
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
