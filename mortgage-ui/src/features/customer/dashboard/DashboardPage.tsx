import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FolderOpen, CalendarDays, FileText, AlertCircle } from 'lucide-react'
import { customerApi } from '@/api/customer.api'
import { useAuthStore } from '@/store/auth.store'
import type { CaseDto, AppointmentResponseDto, DocumentDto } from '@/types/customer.types'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge, statusVariant } from '@/components/ui/Badge'
import { PageHeader } from '@/components/ui/PageHeader'
import { LoadingScreen } from '@/components/ui/Feedback'
import { formatDate, formatDateTime, translateStatus, translateCaseType } from '@/utils/formatters'

export function DashboardPage() {
  const { username } = useAuthStore()
  const navigate = useNavigate()

  const [cases, setCases] = useState<CaseDto[]>([])
  const [appointments, setAppointments] = useState<AppointmentResponseDto[]>([])
  const [documents, setDocuments] = useState<DocumentDto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    Promise.all([
      customerApi.getCases(),
      customerApi.getAppointments(),
      customerApi.getDocuments(),
    ])
      .then(([c, a, d]) => {
        setCases(c.data)
        setAppointments(a.data)
        setDocuments(d.data)
      })
      .catch(() => setError('שגיאה בטעינת הנתונים'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingScreen />

  const activeCases = cases.filter(c => c.status === 'Active')
  const nextAppointment = appointments
    .filter(a => new Date(a.appointmentDate) >= new Date())
    .sort((a, b) => new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime())[0]
  const pendingDocs = documents.filter(d => !d.isVerified)

  return (
    <div className="p-8">
      <PageHeader
        title={`שלום, ${username} 👋`}
        subtitle="הנה סיכום המצב העדכני של התיק שלך"
      />

      {error && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-6 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <KpiCard
          icon={<FolderOpen className="w-6 h-6 text-blue-600" />}
          label="תיקים פעילים"
          value={activeCases.length}
          bg="bg-blue-50"
          onClick={() => navigate('/customer/cases')}
        />
        <KpiCard
          icon={<CalendarDays className="w-6 h-6 text-green-600" />}
          label="פגישה הבאה"
          value={nextAppointment ? formatDate(nextAppointment.appointmentDate) : '—'}
          bg="bg-green-50"
          onClick={() => navigate('/customer/appointments')}
        />
        <KpiCard
          icon={<FileText className="w-6 h-6 text-yellow-600" />}
          label="מסמכים לאימות"
          value={pendingDocs.length}
          bg="bg-yellow-50"
          onClick={() => navigate('/customer/documents')}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Cases */}
        <Card>
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <span className="font-semibold text-gray-900">התיקים שלי</span>
            <button
              onClick={() => navigate('/customer/cases')}
              className="text-sm text-blue-600 hover:underline"
            >
              הצג הכל
            </button>
          </div>
          <CardContent className="p-0">
            {cases.length === 0 ? (
              <p className="text-sm text-gray-500 px-6 py-4">אין תיקים</p>
            ) : (
              <ul className="divide-y divide-gray-100">
                {cases.slice(0, 4).map(c => (
                  <li key={c.caseId} className="flex items-center justify-between px-6 py-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{translateCaseType(c.caseType)}</p>
                      <p className="text-xs text-gray-500">{formatDate(c.createdAt)}</p>
                    </div>
                    <Badge variant={statusVariant(c.status)}>{translateStatus(c.status)}</Badge>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card>
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <span className="font-semibold text-gray-900">פגישות קרובות</span>
            <button
              onClick={() => navigate('/customer/appointments')}
              className="text-sm text-blue-600 hover:underline"
            >
              הצג הכל
            </button>
          </div>
          <CardContent className="p-0">
            {appointments.length === 0 ? (
              <p className="text-sm text-gray-500 px-6 py-4">אין פגישות קרובות</p>
            ) : (
              <ul className="divide-y divide-gray-100">
                {appointments.slice(0, 4).map(a => (
                  <li key={a.appointmentId} className="flex items-center justify-between px-6 py-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{formatDateTime(a.appointmentDate)}</p>
                      <p className="text-xs text-gray-500">{a.meetingType}</p>
                    </div>
                    <Badge variant={statusVariant(a.status)}>{translateStatus(a.status)}</Badge>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function KpiCard({
  icon, label, value, bg, onClick,
}: {
  icon: React.ReactNode
  label: string
  value: string | number
  bg: string
  onClick: () => void
}) {
  return (
    <Card
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <CardContent className="flex items-center gap-4 py-5">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${bg}`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}
