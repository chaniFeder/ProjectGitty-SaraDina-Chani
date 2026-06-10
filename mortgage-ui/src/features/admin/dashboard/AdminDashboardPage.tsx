import { useEffect, useState } from 'react'
import { TrendingUp, FolderOpen, Percent } from 'lucide-react'
import { adminApi } from '@/api/admin.api'
import type { SystemStatisticsDto } from '@/types/advisor-admin.types'
import { Card, CardContent } from '@/components/ui/Card'
import { PageHeader } from '@/components/ui/PageHeader'
import { LoadingScreen } from '@/components/ui/Feedback'
import { formatCurrency, formatPercent } from '@/utils/formatters'

export function AdminDashboardPage() {
  const [stats, setStats] = useState<SystemStatisticsDto | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    adminApi.getStatistics()
      .then(r => setStats(r.data))
      .catch(() => setError('שגיאה בטעינת נתונים'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingScreen />

  return (
    <div className="p-8">
      <PageHeader title="לוח בקרה" subtitle="סטטיסטיקות מערכת" />
      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          icon={<FolderOpen className="w-6 h-6 text-blue-600" />}
          label="תיקים פעילים"
          value={String(stats?.activeCases ?? 0)}
          bg="bg-blue-50"
        />
        <StatCard
          icon={<TrendingUp className="w-6 h-6 text-emerald-600" />}
          label="הכנסה צפויה"
          value={formatCurrency(stats?.expectedRevenue ?? 0)}
          bg="bg-emerald-50"
        />
        <StatCard
          icon={<Percent className="w-6 h-6 text-purple-600" />}
          label="שיעור סגירה"
          value={formatPercent(stats?.closureRate ?? 0)}
          bg="bg-purple-50"
        />
      </div>
    </div>
  )
}

function StatCard({ icon, label, value, bg }: { icon: React.ReactNode; label: string; value: string; bg: string }) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 py-6">
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${bg}`}>{icon}</div>
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}
