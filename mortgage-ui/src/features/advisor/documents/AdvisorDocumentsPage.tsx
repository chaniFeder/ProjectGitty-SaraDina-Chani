import { useEffect, useState } from 'react'
import { FileText, CheckCircle, XCircle } from 'lucide-react'
import { advisorApi } from '@/api/advisor.api'
import type { AdvisorCustomerDto, AdvisorDocumentDto } from '@/types/advisor-admin.types'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'
import { PageHeader } from '@/components/ui/PageHeader'
import { LoadingScreen, EmptyState } from '@/components/ui/Feedback'
import { translateDocType } from '@/utils/formatters'

export function AdvisorDocumentsPage() {
  const [customers, setCustomers] = useState<AdvisorCustomerDto[]>([])
  const [selectedId, setSelectedId] = useState('')
  const [docs, setDocs] = useState<AdvisorDocumentDto[]>([])
  const [loading, setLoading] = useState(true)
  const [docsLoading, setDocsLoading] = useState(false)

  useEffect(() => {
    advisorApi.getCustomers()
      .then(r => setCustomers(r.data))
      .finally(() => setLoading(false))
  }, [])

  const loadDocs = (customerId: string) => {
    setSelectedId(customerId)
    setDocsLoading(true)
    advisorApi.getCustomerDocuments(customerId)
      .then(r => setDocs(r.data))
      .finally(() => setDocsLoading(false))
  }

  const verify = async (docId: number, isVerified: boolean) => {
    await advisorApi.verifyDocument(docId, isVerified).catch(() => null)
    setDocs(prev => prev.map(d => d.documentId === docId ? { ...d, isVerified } : d))
  }

  if (loading) return <LoadingScreen />

  return (
    <div className="p-8">
      <PageHeader title="מסמכי לקוחות" subtitle="אמת או דחה מסמכים" />

      <div className="max-w-xs mb-6">
        <Select
          label="בחר לקוח"
          value={selectedId}
          onChange={e => loadDocs(e.target.value)}
          options={customers.map(c => ({ value: c.customerId, label: `${c.firstName} ${c.lastName}` }))}
          placeholder="בחר לקוח..."
        />
      </div>

      {docsLoading && <LoadingScreen />}

      {!docsLoading && selectedId && docs.length === 0 && (
        <EmptyState icon={FileText} title="אין מסמכים" description="ללקוח זה אין מסמכים עדיין" />
      )}

      {!docsLoading && docs.length > 0 && (
        <div className="space-y-2">
          {docs.map(d => (
            <Card key={d.documentId}>
              <CardContent className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{d.documentName}</p>
                    <p className="text-xs text-gray-500">{translateDocType(d.documentType ?? '')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={d.isVerified ? 'success' : 'warning'}>
                    {d.isVerified ? 'מאומת' : 'ממתין'}
                  </Badge>
                  <Button size="sm" variant="success" onClick={() => verify(d.documentId, true)}>
                    <CheckCircle className="w-4 h-4" /> אמת
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => verify(d.documentId, false)}>
                    <XCircle className="w-4 h-4" /> דחה
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
