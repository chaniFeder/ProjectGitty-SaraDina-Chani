export interface CustomerDetailsDto {
  customerId: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  address: string
  dateOfBirth?: string
  monthlyIncome?: number
}

export interface ContactInfoDto {
  name: number
  email: string
  phoneNumber: string
}

export interface CaseDto {
  caseId: number
  caseType: string
  status: string
  bankId?: number
  advisorId: string
  createdAt: string
  updatedAt: string
  bank?: BankDto
}

export interface BankDto {
  bankId: number
  bankName: string
  bankCode: number
  contactPerson: string
  phoneNumber?: string
  email: string
  isActive: boolean
  minLoanAmount: number
  maxLoanAmount: number
}

export interface MortgageDto {
  mortgageId: number
  customerId: string
  loanAmount: number
  interestRate: number
  loanTerm: number
  monthlyPayment: number
  loanStatus: string
  propertyValue: number
  downPayment: number
  applicationDate?: string
  approvalDate?: string
  bankId?: number
  loanType?: string
}

export interface PaymentScheduleItemDto {
  paymentDate: string
  paymentAmount: number
  balance: number
  interest: number
}

export interface DocumentDto {
  documentId: number
  customerId: string
  documentType?: string
  documentName: string
  filePath: string
  isVerified?: boolean
  expiryDate?: string
}

export interface AppointmentResponseDto {
  appointmentId: number
  customerId: string
  userId: string
  appointmentDate: string
  duration: number
  status: string
  notes?: string
  meetingType: string
  createdDate?: string
}

export interface AppointmentRequestDto {
  customerId: string
  advisorName: string
  userId: string
  appointmentDate: string
  duration: number
  status: string
  notes?: string
  meetingType: string
}

export interface AdvisorDto {
  userId: string
  username: string
}
