import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CalendarDays, Plus, X } from 'lucide-react'
import { customerApi } from '@/api/customer.api'
import { useAuthStore } from '@/store/auth.store'
import type { AppointmentResponseDto, AdvisorDto } from '@/types/customer.types'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge, statusVariant } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { PageHeader } from '@/components/ui/PageHeader'
import { LoadingScreen, EmptyState } from '@/components/ui/Feedback'
import { formatDateTime, translateStatus, translateMeetingType } from '@/utils/formatters'

const schema = z.object({
  userId: z.string().min(1, 'יש לבחור יועץ'),
  appointmentDate: z.string().min(1, 'יש לבחור תאריך ושעה'),
  duration: z.string().min(1, 'שדה חובה'),
  meetingType: z.string().min(1, 'יש לבחור סוג פגישה'),
  notes: z.string().optional(),
})
type FormValues = z.infer<typeof schema>

const MEETING_TYPES = [
  { value: 'Initial', label: 'פגישה ראשונית' },
  { value: 'Followup', label: 'מעקב' },
  { value: 'Signing', label: 'חתימות' },
  { value: 'Online', label: 'פגישה מקוונת' },
  { value: 'InPerson', label: 'פגישה פנים אל פנים' },
]

export function AppointmentsPage() {
  const { userId } = useAuthStore()
  const [appointments, setAppointments] = useState<AppointmentResponseDto[]>([])
  const [advisors, setAdvisors] = useState<AdvisorDto[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { duration: '30' },
  })

  const load = () =>
    Promise.all([customerApi.getAppointments(), customerApi.getAdvisors()])
      .then(([a, adv]) => { setAppointments(a.data); setAdvisors(adv.data) })
      .catch(() => setServerError('שגיאה בטעינת הנתונים'))
      .finally(() => setLoading(false))

  useEffect(() => { load() }, [])

  const onSubmit = async (values: FormValues) => {
    try {
      setServerError(null)
      const advisor = advisors.find(a => a.userId === values.userId)
      await customerApi.requestAppointment({
        customerId: userId!,
        advisorName: advisor?.username ?? '',
        userId: values.userId,
        appointmentDate: new Date(values.appointmentDate).toISOString(),
        duration: parseInt(values.duration),
        meetingType: values.meetingType,
        notes: values.notes,
        status: 'Requested',
      })
      reset()
      setShowModal(false)
      setLoading(true)
      load()
    } catch {
      setServerError('שגיאה בשליחת הבקשה')
    }
  }

  if (loading) return <LoadingScreen />

  return (
    <div className="p-8">
      <PageHeader
        title="הפגישות שלי"
        subtitle="פגישות קרובות עם היועץ שלך"
        action={
          <Button onClick={() => setShowModal(true)}>
            <Plus className="w-4 h-4" /> בקש פגישה
          </Button>
        }
      />

      {serverError && <p className="text-sm text-red-600 mb-4">{serverError}</p>}

      {appointments.length === 0 ? (
        <EmptyState icon={CalendarDays} title="אין פגישות" description="לחץ על 'בקש פגישה' כדי לקבוע פגישה עם יועץ" />
      ) : (
        <div className="space-y-3">
          {appointments.map(a => (
            <Card key={a.appointmentId}>
              <CardContent className="flex items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    <CalendarDays className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{formatDateTime(a.appointmentDate)}</p>
                    <p className="text-sm text-gray-500">{translateMeetingType(a.meetingType)} · {a.duration} דקות</p>
                    {a.notes && <p className="text-xs text-gray-400 mt-0.5">{a.notes}</p>}
                  </div>
                </div>
                <Badge variant={statusVariant(a.status)}>{translateStatus(a.status)}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">בקשת פגישה חדשה</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-4 space-y-4">
              <Select
                label="יועץ"
                {...register('userId')}
                error={errors.userId?.message}
                options={advisors.map(a => ({ value: a.userId, label: a.username }))}
                placeholder="בחר יועץ"
              />
              <Input
                label="תאריך ושעה"
                type="datetime-local"
                {...register('appointmentDate')}
                error={errors.appointmentDate?.message}
              />
              <Input
                label="משך (דקות)"
                type="number"
                {...register('duration')}
                error={errors.duration?.message}
              />
              <Select
                label="סוג פגישה"
                {...register('meetingType')}
                error={errors.meetingType?.message}
                options={MEETING_TYPES}
                placeholder="בחר סוג"
              />
              <Input label="הערות (אופציונלי)" {...register('notes')} />
              {serverError && <p className="text-sm text-red-600">{serverError}</p>}
              <div className="flex gap-3 pt-2">
                <Button type="submit" loading={isSubmitting} className="flex-1">שלח בקשה</Button>
                <Button type="button" variant="outline" onClick={() => setShowModal(false)} className="flex-1">ביטול</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
