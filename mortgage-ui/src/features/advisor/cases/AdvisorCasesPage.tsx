import { useEffect, useState } from 'react'
import { FolderOpen, Plus, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { advisorApi } from '@/api/advisor.api'
import type { AdvisorCaseDto, AdvisorCustomerDto } from '@/types/advisor-admin.types'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge, statusVariant } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'
import { PageHeader } from '@/components/ui/PageHeader'
import { LoadingScreen, EmptyState } from '@/components/ui/Feedback'
import { formatDate, translateStatus, translateCaseType } from '@/utils/formatters'

const STATUSES = ['Pending', 'Active', 'Processing', 'Completed', 'Closed'].map(s => ({ value: s, label: translateStatus(s) }))
const CASE_TYPES = [
  { value: 'Regular', label: 'משכנתא רגילה' },
  { value: 'Refinance', label: 'מחזור משכנתא' },
  { value: 'Construction', label: 'משכנתא לבנייה' },
]

const schema = z.object({
  customerId: z.string().min(1, 'שדה חובה'),
  caseType: z.string().min(1, 'שדה חובה'),
})
type FormValues = z.infer<typeof schema>

export function AdvisorCasesPage() {
  const [cases, setCases] = useState<AdvisorCaseDto[]>([])
  const [customers, setCustomers] = useState<AdvisorCustomerDto[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const load = () =>
    Promise.all([advisorApi.getCases(), advisorApi.getCustomers()])
      .then(([c, cu]) => { setCases(c.data); setCustomers(cu.data) })
      .catch(() => setError('שגיאה בטעינת תיקים'))
      .finally(() => setLoading(false))

  useEffect(() => { load() }, [])

  const onSubmit = async (values: FormValues) => {
    try {
      await advisorApi.createCase({ ...values, status: 'Pending' })
      reset(); setShowModal(false); setLoading(true); load()
    } catch { setError('שגיאה ביצירת תיק') }
  }

  const handleStatusChange = async (caseId: number, status: string) => {
    await advisorApi.updateCaseStatus(caseId, status).catch(() => null)
    setCases(prev => prev.map(c => c.caseId === caseId ? { ...c, status } : c))
  }

  if (loading) return <LoadingScreen />

  return (
    <div className="p-8">
      <PageHeader
        title="תיקים"
        subtitle={`${cases.length} תיקים`}
        action={<Button onClick={() => setShowModal(true)}><Plus className="w-4 h-4" /> תיק חדש</Button>}
      />
      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

      {cases.length === 0
        ? <EmptyState icon={FolderOpen} title="אין תיקים" />
        : <div className="space-y-2">
            {cases.map(c => (
              <Card key={c.caseId}>
                <CardContent className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                      <FolderOpen className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{translateCaseType(c.caseType)}</p>
                      <p className="text-xs text-gray-500">נפתח: {formatDate(c.createdAt)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <select
                      value={c.status}
                      onChange={e => handleStatusChange(c.caseId, e.target.value)}
                      className="text-xs border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                    <Badge variant={statusVariant(c.status)}>{translateStatus(c.status)}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
      }

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">תיק חדש</h2>
              <button onClick={() => setShowModal(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-4 space-y-4">
              <Select
                label="לקוח"
                {...register('customerId')}
                error={errors.customerId?.message}
                options={customers.map(c => ({ value: c.customerId, label: `${c.firstName} ${c.lastName}` }))}
                placeholder="בחר לקוח"
              />
              <Select
                label="סוג תיק"
                {...register('caseType')}
                error={errors.caseType?.message}
                options={CASE_TYPES}
                placeholder="בחר סוג"
              />
              <div className="flex gap-3 pt-2">
                <Button type="submit" loading={isSubmitting} className="flex-1">צור תיק</Button>
                <Button type="button" variant="outline" onClick={() => setShowModal(false)} className="flex-1">ביטול</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
