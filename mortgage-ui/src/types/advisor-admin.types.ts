// Advisor types
export interface AdvisorCustomerDto {
  customerId: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  address: string
  dateOfBirth?: string
  monthlyIncome?: number
}

export interface NewCustomerDto {
  customerId: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  address: string
  dateOfBirth?: string
  monthlyIncome?: number
}

export interface AdvisorCaseDto {
  caseId: number
  advisorId: string
  caseType: string
  status: string
  bankId?: number
  createdAt: string
  updatedAt: string
}

export interface CreateCaseDto {
  customerId: string
  caseType: string
  status: string
  bankId?: number
}

export interface AdvisorAppointmentDto {
  appointmentId: number
  customerId: string
  userId: string
  appointmentDate: string
  duration: number
  status: string
  notes?: string
  meetingType: string
}

export interface AdvisorDocumentDto {
  documentId: number
  customerId: string
  documentType?: string
  documentName: string
  filePath: string
  isVerified?: boolean
  expiryDate?: string
}

// Admin types
export interface BankDto {
  bankId?: number
  bankCode: number
  bankName: string
  contactPerson?: string
  phoneNumber?: string
  email?: string
  isActive?: boolean
  minLoanAmount?: number
  maxLoanAmount?: number
}

export interface MortgageProgramDto {
  programId?: number
  bankId: number
  programName?: string
  interestRate: number
  maxLoanPercentage: number
  minDownPayment: number
  description?: string
}

export interface SystemStatisticsDto {
  activeCases: number
  expectedRevenue: number
  closureRate: number
}

export interface AdminUserDto {
  userId?: string
  username: string
  password: string
  role: string
}

export interface AdminCaseDto {
  caseId: number
  advisorId: string
  caseType: string
  status: string
  bankId?: number
  createdAt: string
  updatedAt: string
}
