import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { BookOpen, Plus, X } from 'lucide-react'
import { adminApi } from '@/api/admin.api'
import type { MortgageProgramDto, BankDto } from '@/types/advisor-admin.types'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { PageHeader } from '@/components/ui/PageHeader'
import { LoadingScreen, EmptyState } from '@/components/ui/Feedback'
import { formatPercent } from '@/utils/formatters'

const schema = z.object({
  bankId: z.string().min(1, 'שדה חובה'),
  programName: z.string().min(2, 'שדה חובה'),
  interestRate: z.string().min(1, 'שדה חובה'),
  maxLoanPercentage: z.string().min(1, 'שדה חובה'),
  minDownPayment: z.string().min(1, 'שדה חובה'),
  description: z.string().optional(),
})
type FormValues = z.infer<typeof schema>

export function AdminProgramsPage() {
  const [programs, setPrograms] = useState<MortgageProgramDto[]>([])
  const [banks, setBanks] = useState<BankDto[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingRate, setEditingRate] = useState<{ id: number; rate: string } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const load = () =>
    Promise.all([adminApi.getPrograms(), adminApi.getBanks()])
      .then(([p, b]) => { setPrograms(p.data); setBanks(b.data) })
      .finally(() => setLoading(false))

  useEffect(() => { load() }, [])

  const onSubmit = async (values: FormValues) => {
    try {
      await adminApi.addProgram({
        bankId: parseInt(values.bankId),
        programName: values.programName,
        interestRate: parseFloat(values.interestRate),
        maxLoanPercentage: parseFloat(values.maxLoanPercentage),
        minDownPayment: parseFloat(values.minDownPayment),
        description: values.description,
      })
      reset(); setShowModal(false); setLoading(true); load()
    } catch { setError('שגיאה בהוספת תוכנית') }
  }

  const saveRate = async (id: number, rate: string) => {
    await adminApi.updateInterestRate(id, parseFloat(rate)).catch(() => null)
    setPrograms(prev => prev.map(p => p.programId === id ? { ...p, interestRate: parseFloat(rate) } : p))
    setEditingRate(null)
  }

  if (loading) return <LoadingScreen />

  return (
    <div className="p-8">
      <PageHeader
        title="תוכניות משכנתא"
        subtitle={`${programs.length} תוכניות`}
        action={<Button onClick={() => { reset(); setShowModal(true) }}><Plus className="w-4 h-4" /> תוכנית חדשה</Button>}
      />
      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

      {programs.length === 0
        ? <EmptyState icon={BookOpen} title="אין תוכניות" />
        : <div className="space-y-2">
            {programs.map(p => (
              <Card key={p.programId}>
                <CardContent className="flex items-center justify-between py-4">
                  <div>
                    <p className="font-medium text-gray-900">{p.programName}</p>
                    <p className="text-xs text-gray-500">
                      ריבית: {formatPercent(p.interestRate)} · מקס׳ מימון: {formatPercent(p.maxLoanPercentage)} · הון עצמי מינ׳: {formatPercent(p.minDownPayment)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {editingRate?.id === p.programId
                      ? <> {/* editingRate is non-null here */}
                          <input
                            type="number"
                            step="0.01"
                            value={editingRate!.rate}
                            onChange={e => setEditingRate({ id: p.programId!, rate: e.target.value })}
                            className="w-20 text-sm border border-gray-300 rounded-lg px-2 py-1"
                          />
                          <Button size="sm" onClick={() => saveRate(p.programId!, editingRate!.rate)}>שמור</Button>
                          <Button size="sm" variant="outline" onClick={() => setEditingRate(null)}>ביטול</Button>
                        </>
                      : <Button size="sm" variant="outline" onClick={() => setEditingRate({ id: p.programId!, rate: String(p.interestRate) })}>
                          עדכן ריבית
                        </Button>
                    }
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
      }

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">תוכנית חדשה</h2>
              <button onClick={() => setShowModal(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-4 space-y-3">
              <Select
                label="בנק"
                {...register('bankId')}
                error={errors.bankId?.message}
                options={banks.map(b => ({ value: String(b.bankId), label: b.bankName }))}
                placeholder="בחר בנק"
              />
              <Input label="שם תוכנית" {...register('programName')} error={errors.programName?.message} />
              <div className="grid grid-cols-3 gap-3">
                <Input label="ריבית (%)" type="number" step="0.01" {...register('interestRate')} error={errors.interestRate?.message} />
                <Input label="מקס׳ מימון (%)" type="number" {...register('maxLoanPercentage')} error={errors.maxLoanPercentage?.message} />
                <Input label="הון עצמי מינ׳ (%)" type="number" {...register('minDownPayment')} error={errors.minDownPayment?.message} />
              </div>
              <Input label="תיאור" {...register('description')} />
              <div className="flex gap-3 pt-2">
                <Button type="submit" loading={isSubmitting} className="flex-1">הוסף</Button>
                <Button type="button" variant="outline" onClick={() => setShowModal(false)} className="flex-1">ביטול</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
