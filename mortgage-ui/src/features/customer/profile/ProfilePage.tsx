import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { customerApi } from '@/api/customer.api'
import type { CustomerDetailsDto } from '@/types/customer.types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { PageHeader } from '@/components/ui/PageHeader'
import { LoadingScreen } from '@/components/ui/Feedback'
import { formatDate, formatCurrency } from '@/utils/formatters'

const schema = z.object({
  email: z.string().email('כתובת מייל לא תקינה'),
  phoneNumber: z.string().min(9, 'מספר טלפון לא תקין'),
})
type FormValues = z.infer<typeof schema>

export function ProfilePage() {
  const [profile, setProfile] = useState<CustomerDetailsDto | null>(null)
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    customerApi.getProfile()
      .then(r => {
        setProfile(r.data)
        reset({ email: r.data.email, phoneNumber: r.data.phoneNumber })
      })
      .catch(() => setServerError('שגיאה בטעינת הפרופיל'))
      .finally(() => setLoading(false))
  }, [reset])

  const onSubmit = async (values: FormValues) => {
    try {
      setServerError(null)
      await customerApi.updateContact({ name: 0, email: values.email, phoneNumber: values.phoneNumber })
      setProfile(prev => prev ? { ...prev, ...values } : prev)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch {
      setServerError('שגיאה בשמירת הפרטים')
    }
  }

  if (loading) return <LoadingScreen />

  return (
    <div className="p-8 max-w-2xl">
      <PageHeader title="הפרופיל שלי" subtitle="פרטים אישיים ופרטי קשר" />

      {/* Read-only details */}
      <Card className="mb-6">
        <CardHeader><CardTitle>פרטים אישיים</CardTitle></CardHeader>
        <CardContent>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
            <Detail label="שם פרטי" value={profile?.firstName} />
            <Detail label="שם משפחה" value={profile?.lastName} />
            <Detail label="תעודת זהות" value={profile?.customerId} />
            <Detail label="תאריך לידה" value={profile?.dateOfBirth ? formatDate(profile.dateOfBirth) : '—'} />
            <Detail label="כתובת" value={profile?.address} />
            <Detail label="הכנסה חודשית" value={profile?.monthlyIncome ? formatCurrency(profile.monthlyIncome) : '—'} />
          </dl>
        </CardContent>
      </Card>

      {/* Editable contact info */}
      <Card>
        <CardHeader><CardTitle>פרטי קשר</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="כתובת מייל"
              type="email"
              {...register('email')}
              error={errors.email?.message}
            />
            <Input
              label="טלפון"
              type="tel"
              {...register('phoneNumber')}
              error={errors.phoneNumber?.message}
            />
            {serverError && <p className="text-sm text-red-600">{serverError}</p>}
            {saved && <p className="text-sm text-green-600">הפרטים נשמרו בהצלחה ✓</p>}
            <Button type="submit" loading={isSubmitting}>שמור שינויים</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

function Detail({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <dt className="text-gray-500">{label}</dt>
      <dd className="font-medium text-gray-900 mt-0.5">{value ?? '—'}</dd>
    </div>
  )
}
