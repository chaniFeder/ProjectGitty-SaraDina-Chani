import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Users, Plus, X, ChevronLeft } from 'lucide-react'
import { advisorApi } from '@/api/advisor.api'
import type { AdvisorCustomerDto } from '@/types/advisor-admin.types'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { PageHeader } from '@/components/ui/PageHeader'
import { LoadingScreen, EmptyState } from '@/components/ui/Feedback'

const schema = z.object({
  customerId: z.string().length(9, 'תעודת זהות חייבת להכיל 9 ספרות'),
  firstName: z.string().min(2, 'שדה חובה'),
  lastName: z.string().min(2, 'שדה חובה'),
  email: z.string().email('מייל לא תקין'),
  phoneNumber: z.string().min(9, 'טלפון לא תקין'),
  address: z.string().min(3, 'שדה חובה'),
  monthlyIncome: z.string().optional(),
})
type FormValues = z.infer<typeof schema>

export function AdvisorCustomersPage() {
  const navigate = useNavigate()
  const [customers, setCustomers] = useState<AdvisorCustomerDto[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [search, setSearch] = useState('')
  const [error, setError] = useState<string | null>(null)

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const load = () =>
    advisorApi.getCustomers()
      .then(r => setCustomers(r.data))
      .catch(() => setError('שגיאה בטעינת לקוחות'))
      .finally(() => setLoading(false))

  useEffect(() => { load() }, [])

  const onSubmit = async (values: FormValues) => {
    try {
      await advisorApi.registerCustomer({
        ...values,
        monthlyIncome: values.monthlyIncome ? parseFloat(values.monthlyIncome) : undefined,
      })
      reset()
      setShowModal(false)
      setLoading(true)
      load()
    } catch {
      setError('שגיאה ברישום לקוח')
    }
  }

  const filtered = customers.filter(c =>
    `${c.firstName} ${c.lastName} ${c.customerId}`.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return <LoadingScreen />

  return (
    <div className="p-8">
      <PageHeader
        title="הלקוחות שלי"
        subtitle={`${customers.length} לקוחות`}
        action={<Button onClick={() => setShowModal(true)}><Plus className="w-4 h-4" /> לקוח חדש</Button>}
      />

      <Input
        placeholder="חיפוש לפי שם או ת.ז..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="mb-4 max-w-sm"
      />

      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

      {filtered.length === 0
        ? <EmptyState icon={Users} title="אין לקוחות" description="הוסף לקוח חדש כדי להתחיל" />
        : <div className="space-y-2">
            {filtered.map(c => (
              <Card key={c.customerId} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate(`/advisor/customers/${c.customerId}`)}>
                <CardContent className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-700">
                      {c.firstName[0]}{c.lastName[0]}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{c.firstName} {c.lastName}</p>
                      <p className="text-sm text-gray-500">{c.email} · {c.phoneNumber}</p>
                    </div>
                  </div>
                  <ChevronLeft className="w-4 h-4 text-gray-400" />
                </CardContent>
              </Card>
            ))}
          </div>
      }

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">רישום לקוח חדש</h2>
              <button onClick={() => setShowModal(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Input label="תעודת זהות" {...register('customerId')} error={errors.customerId?.message} />
                <Input label="טלפון" {...register('phoneNumber')} error={errors.phoneNumber?.message} />
                <Input label="שם פרטי" {...register('firstName')} error={errors.firstName?.message} />
                <Input label="שם משפחה" {...register('lastName')} error={errors.lastName?.message} />
                <Input label="מייל" type="email" {...register('email')} error={errors.email?.message} />
                <Input label="הכנסה חודשית" type="number" {...register('monthlyIncome')} />
              </div>
              <Input label="כתובת" {...register('address')} error={errors.address?.message} />
              <div className="flex gap-3 pt-2">
                <Button type="submit" loading={isSubmitting} className="flex-1">רשום לקוח</Button>
                <Button type="button" variant="outline" onClick={() => setShowModal(false)} className="flex-1">ביטול</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
