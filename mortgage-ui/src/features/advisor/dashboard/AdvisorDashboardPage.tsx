import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, CalendarDays, FolderOpen, FileText, AlertCircle } from 'lucide-react'
import { advisorApi } from '@/api/advisor.api'
import type { AdvisorCustomerDto, AdvisorCaseDto, AdvisorAppointmentDto, AdvisorDocumentDto } from '@/types/advisor-admin.types'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge, statusVariant } from '@/components/ui/Badge'
import { PageHeader } from '@/components/ui/PageHeader'
import { LoadingScreen } from '@/components/ui/Feedback'
import { formatDateTime, translateStatus, translateCaseType } from '@/utils/formatters'
import { useAuthStore } from '@/store/auth.store'

export function AdvisorDashboardPage() {
  const { username } = useAuthStore()
  const navigate = useNavigate()
  const [customers, setCustomers] = useState<AdvisorCustomerDto[]>([])
  const [cases, setCases] = useState<AdvisorCaseDto[]>([])
  const [appointments, setAppointments] = useState<AdvisorAppointmentDto[]>([])
  const [allDocs, setAllDocs] = useState<AdvisorDocumentDto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    Promise.all([
      advisorApi.getCustomers(),
      advisorApi.getCases(),
      advisorApi.getAppointments(),
    ])
      .then(async ([c, cs, a]) => {
        setCustomers(c.data)
        setCases(cs.data)
        setAppointments(a.data)
        // load docs for all customers
        const docsResults = await Promise.all(
          c.data.map(cu => advisorApi.getCustomerDocuments(cu.customerId).then(r => r.data).catch(() => []))
        )
        setAllDocs(docsResults.flat())
      })
      .catch(() => setError('שגיאה בטעינת הנתונים'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingScreen />

  const today = new Date().toDateString()
  const todayAppts = appointments.filter(a => new Date(a.appointmentDate).toDateString() === today)
  const pendingDocs = allDocs.filter(d => !d.isVerified)
  const openCases = cases.filter(c => c.status === 'Active' || c.status === 'Pending')

  return (
    <div className="p-8">
      <PageHeader title={`שלום, ${username}`} subtitle="סיכום יומי" />

      {error && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-6 text-sm">
          <AlertCircle className="w-4 h-4" />{error}
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KpiCard icon={<Users className="w-6 h-6 text-indigo-600" />} label="לקוחות" value={customers.length} bg="bg-indigo-50" onClick={() => navigate('/advisor/customers')} />
        <KpiCard icon={<FolderOpen className="w-6 h-6 text-blue-600" />} label="תיקים פתוחים" value={openCases.length} bg="bg-blue-50" onClick={() => navigate('/advisor/cases')} />
        <KpiCard icon={<CalendarDays className="w-6 h-6 text-green-600" />} label="פגישות היום" value={todayAppts.length} bg="bg-green-50" onClick={() => navigate('/advisor/appointments')} />
        <KpiCard icon={<FileText className="w-6 h-6 text-yellow-600" />} label="מסמכים לאימות" value={pendingDocs.length} bg="bg-yellow-50" onClick={() => navigate('/advisor/documents')} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <span className="font-semibold text-gray-900">פגישות היום</span>
            <button onClick={() => navigate('/advisor/appointments')} className="text-sm text-indigo-600 hover:underline">הצג הכל</button>
          </div>
          <CardContent className="p-0">
            {todayAppts.length === 0
              ? <p className="text-sm text-gray-500 px-6 py-4">אין פגישות היום</p>
              : <ul className="divide-y divide-gray-100">
                  {todayAppts.slice(0, 4).map(a => (
                    <li key={a.appointmentId} className="flex items-center justify-between px-6 py-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{formatDateTime(a.appointmentDate)}</p>
                        <p className="text-xs text-gray-500">לקוח: {a.customerId}</p>
                      </div>
                      <Badge variant={statusVariant(a.status)}>{translateStatus(a.status)}</Badge>
                    </li>
                  ))}
                </ul>
            }
          </CardContent>
        </Card>

        <Card>
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <span className="font-semibold text-gray-900">תיקים אחרונים</span>
            <button onClick={() => navigate('/advisor/cases')} className="text-sm text-indigo-600 hover:underline">הצג הכל</button>
          </div>
          <CardContent className="p-0">
            {cases.length === 0
              ? <p className="text-sm text-gray-500 px-6 py-4">אין תיקים</p>
              : <ul className="divide-y divide-gray-100">
                  {cases.slice(0, 4).map(c => (
                    <li key={c.caseId} className="flex items-center justify-between px-6 py-3">
                      <p className="text-sm font-medium text-gray-900">{translateCaseType(c.caseType)}</p>
                      <Badge variant={statusVariant(c.status)}>{translateStatus(c.status)}</Badge>
                    </li>
                  ))}
                </ul>
            }
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function KpiCard({ icon, label, value, bg, onClick }: { icon: React.ReactNode; label: string; value: number; bg: string; onClick: () => void }) {
  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
      <CardContent className="flex items-center gap-4 py-5">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${bg}`}>{icon}</div>
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}
