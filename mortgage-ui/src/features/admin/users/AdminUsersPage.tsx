import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Users, Plus, X } from 'lucide-react'
import { adminApi } from '@/api/admin.api'
import type { AdminUserDto } from '@/types/advisor-admin.types'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { PageHeader } from '@/components/ui/PageHeader'
import { LoadingScreen, EmptyState } from '@/components/ui/Feedback'

const schema = z.object({
  username: z.string().min(3, 'שם משתמש חייב להכיל לפחות 3 תווים'),
  password: z.string().min(6, 'סיסמה חייבת להכיל לפחות 6 תווים'),
})
type FormValues = z.infer<typeof schema>

export function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUserDto[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const load = () => adminApi.getAdvisors().then(r => setUsers(r.data)).finally(() => setLoading(false))
  useEffect(() => { load() }, [])

  const onSubmit = async (values: FormValues) => {
    try {
      await adminApi.addAdvisor({ ...values, role: 'advisor' })
      reset(); setShowModal(false); setLoading(true); load()
    } catch { setError('שגיאה בהוספת יועץ') }
  }

  if (loading) return <LoadingScreen />

  return (
    <div className="p-8">
      <PageHeader
        title="יועצים"
        subtitle={`${users.length} יועצים`}
        action={<Button onClick={() => { reset(); setShowModal(true) }}><Plus className="w-4 h-4" /> יועץ חדש</Button>}
      />
      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

      {users.length === 0
        ? <EmptyState icon={Users} title="אין יועצים" />
        : <div className="space-y-2">
            {users.map((u, i) => (
              <Card key={u.userId ?? i}>
                <CardContent className="flex items-center gap-4 py-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-700">
                    {u.username[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{u.username}</p>
                    <p className="text-xs text-gray-500">יועץ משכנתאות</p>
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
              <h2 className="font-semibold text-gray-900">יועץ חדש</h2>
              <button onClick={() => setShowModal(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-4 space-y-4">
              <Input label="שם משתמש" {...register('username')} error={errors.username?.message} />
              <Input label="סיסמה" type="password" {...register('password')} error={errors.password?.message} />
              <div className="flex gap-3 pt-2">
                <Button type="submit" loading={isSubmitting} className="flex-1">הוסף יועץ</Button>
                <Button type="button" variant="outline" onClick={() => setShowModal(false)} className="flex-1">ביטול</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
