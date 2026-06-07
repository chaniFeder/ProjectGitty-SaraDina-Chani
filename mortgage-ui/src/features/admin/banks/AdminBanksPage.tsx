import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Building2, Plus, X, Pencil } from 'lucide-react'
import { adminApi } from '@/api/admin.api'
import type { BankDto } from '@/types/advisor-admin.types'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { PageHeader } from '@/components/ui/PageHeader'
import { LoadingScreen, EmptyState } from '@/components/ui/Feedback'
import { formatCurrency } from '@/utils/formatters'

const schema = z.object({
  bankCode: z.string().min(1, 'שדה חובה'),
  bankName: z.string().min(2, 'שדה חובה'),
  contactPerson: z.string().optional(),
  phoneNumber: z.string().optional(),
  email: z.string().email('מייל לא תקין').optional().or(z.literal('')),
  minLoanAmount: z.string().optional(),
  maxLoanAmount: z.string().optional(),
})
type FormValues = z.infer<typeof schema>

export function AdminBanksPage() {
  const [banks, setBanks] = useState<BankDto[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<BankDto | null>(null)
  const [error, setError] = useState<string | null>(null)

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const load = () => adminApi.getBanks().then(r => setBanks(r.data)).finally(() => setLoading(false))
  useEffect(() => { load() }, [])

  const openAdd = () => { setEditing(null); reset({}); setShowModal(true) }
  const openEdit = (b: BankDto) => {
    setEditing(b)
    reset({
      bankCode: String(b.bankCode),
      bankName: b.bankName,
      contactPerson: b.contactPerson ?? '',
      phoneNumber: b.phoneNumber ?? '',
      email: b.email ?? '',
      minLoanAmount: b.minLoanAmount ? String(b.minLoanAmount) : '',
      maxLoanAmount: b.maxLoanAmount ? String(b.maxLoanAmount) : '',
    })
    setShowModal(true)
  }

  const onSubmit = async (values: FormValues) => {
    try {
      const dto: BankDto = {
        bankCode: parseInt(values.bankCode),
        bankName: values.bankName,
        contactPerson: values.contactPerson,
        phoneNumber: values.phoneNumber,
        email: values.email,
        minLoanAmount: values.minLoanAmount ? parseFloat(values.minLoanAmount) : undefined,
        maxLoanAmount: values.maxLoanAmount ? parseFloat(values.maxLoanAmount) : undefined,
        isActive: true,
      }
      if (editing?.bankId) await adminApi.updateBank(editing.bankId, dto)
      else await adminApi.addBank(dto)
      setShowModal(false); setLoading(true); load()
    } catch { setError('שגיאה בשמירת בנק') }
  }

  if (loading) return <LoadingScreen />

  return (
    <div className="p-8">
      <PageHeader
        title="בנקים"
        subtitle={`${banks.length} בנקים`}
        action={<Button onClick={openAdd}><Plus className="w-4 h-4" /> בנק חדש</Button>}
      />
      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

      {banks.length === 0
        ? <EmptyState icon={Building2} title="אין בנקים" />
        : <div className="space-y-2">
            {banks.map(b => (
              <Card key={b.bankId}>
                <CardContent className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{b.bankName}</p>
                      <p className="text-xs text-gray-500">
                        קוד: {b.bankCode}
                        {b.minLoanAmount && ` · מינ׳: ${formatCurrency(b.minLoanAmount)}`}
                        {b.maxLoanAmount && ` · מקס׳: ${formatCurrency(b.maxLoanAmount)}`}
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => openEdit(b)}>
                    <Pencil className="w-4 h-4" /> עריכה
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
      }

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">{editing ? 'עריכת בנק' : 'בנק חדש'}</h2>
              <button onClick={() => setShowModal(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Input label="קוד בנק" type="number" {...register('bankCode')} error={errors.bankCode?.message} />
                <Input label="שם בנק" {...register('bankName')} error={errors.bankName?.message} />
                <Input label="איש קשר" {...register('contactPerson')} />
                <Input label="טלפון" {...register('phoneNumber')} />
                <Input label="מייל" type="email" {...register('email')} error={errors.email?.message} />
                <Input label="הלוואה מינ׳ (₪)" type="number" {...register('minLoanAmount')} />
                <Input label="הלוואה מקס׳ (₪)" type="number" {...register('maxLoanAmount')} />
              </div>
              <div className="flex gap-3 pt-2">
                <Button type="submit" loading={isSubmitting} className="flex-1">שמור</Button>
                <Button type="button" variant="outline" onClick={() => setShowModal(false)} className="flex-1">ביטול</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
