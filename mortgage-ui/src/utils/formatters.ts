export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS', maximumFractionDigits: 0 }).format(amount)

export const formatDate = (dateStr: string) =>
  new Intl.DateTimeFormat('he-IL', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(dateStr))

export const formatDateTime = (dateStr: string) =>
  new Intl.DateTimeFormat('he-IL', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  }).format(new Date(dateStr))

export const formatPercent = (value: number) =>
  `${value.toFixed(2)}%`

const STATUS_MAP: Record<string, string> = {
  Active: 'פעיל',
  Pending: 'ממתין',
  Processing: 'בטיפול',
  Completed: 'הושלם',
  Closed: 'סגור',
  Cancelled: 'בוטל',
  Requested: 'נשלחה בקשה',
  Approved: 'אושר',
  Rejected: 'נדחה',
  Verified: 'אומת',
}

export const translateStatus = (status: string) => STATUS_MAP[status] ?? status

const CASE_TYPE_MAP: Record<string, string> = {
  Regular: 'משכנתא רגילה',
  Refinance: 'מחזור משכנתא',
  Construction: 'משכנתא לבנייה',
}

export const translateCaseType = (type: string) => CASE_TYPE_MAP[type] ?? type

const MEETING_TYPE_MAP: Record<string, string> = {
  Initial: 'פגישה ראשונית',
  Followup: 'מעקב',
  Signing: 'חתימות',
  Online: 'פגישה מקוונת',
  InPerson: 'פגישה פנים אל פנים',
}

export const translateMeetingType = (type: string) => MEETING_TYPE_MAP[type] ?? type

const DOC_TYPE_MAP: Record<string, string> = {
  SalarySlip: 'תלוש שכר',
  BankStatement: 'דף חשבון בנק',
  IdCopy: 'צילום תעודת זהות',
  PurchaseContract: 'חוזה רכישה',
  General: 'כללי',
}

export const translateDocType = (type: string) => DOC_TYPE_MAP[type] ?? type
