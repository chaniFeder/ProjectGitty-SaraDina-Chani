import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { customerApi } from '@/api/customer.api'
import type { MortgageDto, PaymentScheduleItemDto } from '@/types/customer.types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge, statusVariant } from '@/components/ui/Badge'
import { PageHeader } from '@/components/ui/PageHeader'
import { LoadingScreen } from '@/components/ui/Feedback'
import { formatCurrency, formatDate, formatPercent, translateStatus } from '@/utils/formatters'

export function MortgagePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [mortgage, setMortgage] = useState<MortgageDto | null>(null)
  const [payments, setPayments] = useState<PaymentScheduleItemDto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    const mortgageId = Number(id)
    Promise.all([
      customerApi.getMortgage(mortgageId),
      customerApi.getPaymentSchedule(mortgageId),
    ])
      .then(([m, p]) => { setMortgage(m.data); setPayments(p.data) })
      .catch(() => setError('שגיאה בטעינת פרטי המשכנתא'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <LoadingScreen />
  if (error || !mortgage) return <div className="p-8 text-red-600">{error ?? 'משכנתא לא נמצאה'}</div>

  return (
    <div className="p-8 max-w-4xl">
      <button
        onClick={() => navigate('/customer/cases')}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4"
      >
        <ArrowRight className="w-4 h-4" /> חזרה לתיקים
      </button>

      <PageHeader
        title="פרטי משכנתא"
        subtitle={`מספר משכנתא: ${mortgage.mortgageId}`}
        action={<Badge variant={statusVariant(mortgage.loanStatus)}>{translateStatus(mortgage.loanStatus)}</Badge>}
      />

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <StatCard label="סכום הלוואה" value={formatCurrency(mortgage.loanAmount)} />
        <StatCard label="תשלום חודשי" value={formatCurrency(mortgage.monthlyPayment)} />
        <StatCard label="ריבית" value={formatPercent(mortgage.interestRate)} />
        <StatCard label="תקופה" value={`${mortgage.loanTerm} חודשים`} />
      </div>

      {/* Details */}
      <Card className="mb-6">
        <CardHeader><CardTitle>פרטים נוספים</CardTitle></CardHeader>
        <CardContent>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
            <Detail label="שווי נכס" value={formatCurrency(mortgage.propertyValue)} />
            <Detail label="הון עצמי" value={formatCurrency(mortgage.downPayment)} />
            <Detail label="סוג הלוואה" value={mortgage.loanType ?? '—'} />
            <Detail label="תאריך בקשה" value={mortgage.applicationDate ? formatDate(mortgage.applicationDate) : '—'} />
            <Detail label="תאריך אישור" value={mortgage.approvalDate ? formatDate(mortgage.approvalDate) : '—'} />
          </dl>
        </CardContent>
      </Card>

      {/* Payment schedule */}
      {payments.length > 0 && (
        <Card>
          <CardHeader><CardTitle>לוח תשלומים</CardTitle></CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['תאריך', 'תשלום', 'ריבית', 'יתרה'].map(h => (
                    <th key={h} className="px-6 py-3 text-right font-medium text-gray-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {payments.map((p, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-6 py-3 text-gray-900">{formatDate(p.paymentDate)}</td>
                    <td className="px-6 py-3 text-gray-900">{formatCurrency(p.paymentAmount)}</td>
                    <td className="px-6 py-3 text-gray-500">{formatCurrency(p.interest)}</td>
                    <td className="px-6 py-3 text-gray-500">{p.balance ? formatCurrency(p.balance) : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardContent className="py-4">
        <p className="text-xs text-gray-500 mb-1">{label}</p>
        <p className="text-lg font-bold text-gray-900">{value}</p>
      </CardContent>
    </Card>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-gray-500">{label}</dt>
      <dd className="font-medium text-gray-900 mt-0.5">{value}</dd>
    </div>
  )
}
