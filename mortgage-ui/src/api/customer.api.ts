import apiClient from './client'
import type {
  CustomerDetailsDto,
  ContactInfoDto,
  CaseDto,
  MortgageDto,
  PaymentScheduleItemDto,
  DocumentDto,
  AppointmentResponseDto,
  AppointmentRequestDto,
  AdvisorDto,
} from '@/types/customer.types'

export const customerApi = {
  // Profile
  getProfile: () =>
    apiClient.get<CustomerDetailsDto>('/customer/profile'),

  updateContact: (data: ContactInfoDto) =>
    apiClient.put('/customer/profile/contact', data),

  // Cases
  getCases: () =>
    apiClient.get<CaseDto[]>('/customer/cases'),

  // Mortgages
  getMortgages: () =>
    apiClient.get<MortgageDto[]>('/customer/mortgages'),

  getMortgage: (id: number) =>
    apiClient.get<MortgageDto>(`/customer/mortgages/${id}`),

  getPaymentSchedule: (mortgageId: number) =>
    apiClient.get<PaymentScheduleItemDto[]>(`/customer/mortgages/${mortgageId}/payments`),

  // Documents
  getDocuments: () =>
    apiClient.get<DocumentDto[]>('/customer/documents'),

  uploadDocument: (formData: FormData) =>
    apiClient.post('/customer/documents', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  // Appointments
  getAppointments: () =>
    apiClient.get<AppointmentResponseDto[]>('/customer/appointments'),

  requestAppointment: (data: AppointmentRequestDto) =>
    apiClient.post<AppointmentResponseDto>('/customer/appointments', data),

  // Advisors list (for appointment booking)
  getAdvisors: () =>
    apiClient.get<AdvisorDto[]>('/advisors'),
}
