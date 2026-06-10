import { useEffect, useRef, useState } from 'react'
import { FileText, Upload, CheckCircle, Clock } from 'lucide-react'
import { customerApi } from '@/api/customer.api'
import type { DocumentDto } from '@/types/customer.types'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'
import { PageHeader } from '@/components/ui/PageHeader'
import { LoadingScreen, EmptyState } from '@/components/ui/Feedback'
import { formatDate, translateDocType } from '@/utils/formatters'

const DOC_TYPES = [
  { value: 'SalarySlip', label: 'תלוש שכר' },
  { value: 'BankStatement', label: 'דף חשבון בנק' },
  { value: 'IdCopy', label: 'צילום תעודת זהות' },
  { value: 'PurchaseContract', label: 'חוזה רכישה' },
  { value: 'General', label: 'כללי' },
]

export function DocumentsPage() {
  const [documents, setDocuments] = useState<DocumentDto[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [docType, setDocType] = useState('General')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const load = () =>
    customerApi.getDocuments()
      .then(r => setDocuments(r.data))
      .catch(() => setError('שגיאה בטעינת המסמכים'))
      .finally(() => setLoading(false))

  useEffect(() => { load() }, [])

  const handleUpload = async () => {
    const file = fileRef.current?.files?.[0]
    if (!file) return
    setUploading(true)
    setError(null)
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('documentType', docType)
      fd.append('documentName', file.name)
      await customerApi.uploadDocument(fd)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
      if (fileRef.current) fileRef.current.value = ''
      setLoading(true)
      load()
    } catch {
      setError('שגיאה בהעלאת הקובץ')
    } finally {
      setUploading(false)
    }
  }

  if (loading) return <LoadingScreen />

  const verified = documents.filter(d => d.isVerified)
  const pending = documents.filter(d => !d.isVerified)

  return (
    <div className="p-8">
      <PageHeader title="המסמכים שלי" subtitle="מסמכים שהועלו לתיק שלך" />

      {/* Upload area */}
      <Card className="mb-6">
        <CardContent className="py-5">
          <p className="text-sm font-medium text-gray-700 mb-3">העלאת מסמך חדש</p>
          <div className="flex flex-wrap items-end gap-3">
            <div className="w-48">
              <Select
                options={DOC_TYPES}
                value={docType}
                onChange={e => setDocType(e.target.value)}
                label="סוג מסמך"
              />
            </div>
            <div className="flex-1 min-w-48">
              <label className="text-sm font-medium text-gray-700 block mb-1.5">קובץ</label>
              <input
                ref={fileRef}
                type="file"
                className="block w-full text-sm text-gray-500 file:ml-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
            <Button onClick={handleUpload} loading={uploading}>
              <Upload className="w-4 h-4" /> העלה
            </Button>
          </div>
          {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
          {success && <p className="text-sm text-green-600 mt-2">המסמך הועלה בהצלחה ✓</p>}
        </CardContent>
      </Card>

      {documents.length === 0 ? (
        <EmptyState icon={FileText} title="אין מסמכים" description="העלה מסמך ראשון כדי להתחיל" />
      ) : (
        <div className="space-y-6">
          {pending.length > 0 && (
            <Section title="ממתינים לאימות" icon={<Clock className="w-4 h-4 text-yellow-500" />} docs={pending} />
          )}
          {verified.length > 0 && (
            <Section title="מאומתים" icon={<CheckCircle className="w-4 h-4 text-green-500" />} docs={verified} />
          )}
        </div>
      )}
    </div>
  )
}

function Section({ title, icon, docs }: { title: string; icon: React.ReactNode; docs: DocumentDto[] }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h2 className="text-sm font-semibold text-gray-700">{title}</h2>
      </div>
      <div className="space-y-2">
        {docs.map(d => (
          <Card key={d.documentId}>
            <CardContent className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-gray-400 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{d.documentName}</p>
                  <p className="text-xs text-gray-500">
                    {translateDocType(d.documentType ?? '')}
                    {d.expiryDate && ` · תפוגה: ${formatDate(d.expiryDate)}`}
                  </p>
                </div>
              </div>
              <Badge variant={d.isVerified ? 'success' : 'warning'}>
                {d.isVerified ? 'מאומת' : 'ממתין'}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
