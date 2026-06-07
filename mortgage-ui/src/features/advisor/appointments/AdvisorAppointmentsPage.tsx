import { useEffect, useState } from 'react'
import { CalendarDays } from 'lucide-react'
import { advisorApi } from '@/api/advisor.api'
import type { AdvisorAppointmentDto } from '@/types/advisor-admin.types'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge, statusVariant } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { PageHeader } from '@/components/ui/PageHeader'
import { LoadingScreen, EmptyState } from '@/components/ui/Feedback'
import { formatDateTime, translateStatus, translateMeetingType } from '@/utils/formatters'

export function AdvisorAppointmentsPage() {
  const [appointments, setAppointments] = useState<AdvisorAppointmentDto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    advisorApi.getAppointments()
      .then(r => setAppointments(r.data))
      .catch(() => setError('שגיאה בטעינת פגישות'))
      .finally(() => setLoading(false))
  }, [])

  const updateStatus = async (id: number, status: string) => {
    await advisorApi.updateAppointmentStatus(id, status).catch(() => null)
    setAppointments(prev => prev.map(a => a.appointmentId === id ? { ...a, status } : a))
  }

  if (loading) return <LoadingScreen />

  return (
    <div className="p-8">
      <PageHeader title="פגישות" subtitle={`${appointments.length} פגישות`} />
      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

      {appointments.length === 0
        ? <EmptyState icon={CalendarDays} title="אין פגישות" />
        : <div className="space-y-3">
            {appointments.map(a => (
              <Card key={a.appointmentId}>
                <CardContent className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                      <CalendarDays className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{formatDateTime(a.appointmentDate)}</p>
                      <p className="text-sm text-gray-500">
                        {translateMeetingType(a.meetingType)} · {a.duration} דקות · לקוח: {a.customerId}
                      </p>
                      {a.notes && <p className="text-xs text-gray-400 mt-0.5">{a.notes}</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={statusVariant(a.status)}>{translateStatus(a.status)}</Badge>
                    {a.status === 'Requested' && (
                      <>
                        <Button size="sm" variant="success" onClick={() => updateStatus(a.appointmentId, 'Approved')}>אשר</Button>
                        <Button size="sm" variant="destructive" onClick={() => updateStatus(a.appointmentId, 'Cancelled')}>בטל</Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
      }
    </div>
  )
}
