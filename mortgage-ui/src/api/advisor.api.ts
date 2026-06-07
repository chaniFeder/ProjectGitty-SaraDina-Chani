import apiClient from './client'
import type {
  AdvisorCustomerDto,
  NewCustomerDto,
  AdvisorCaseDto,
  CreateCaseDto,
  AdvisorAppointmentDto,
  AdvisorDocumentDto,
} from '@/types/advisor-admin.types'

export const advisorApi = {
  // Customers
  getCustomers: () => apiClient.get<AdvisorCustomerDto[]>('/advisor/customers'),
  getCustomer: (id: string) => apiClient.get<AdvisorCustomerDto>(`/advisor/customers/${id}`),
  registerCustomer: (data: NewCustomerDto) => apiClient.post('/advisor/customers', data),

  // Cases
  getCases: () => apiClient.get<AdvisorCaseDto[]>('/advisor/cases'),
  createCase: (data: CreateCaseDto) => apiClient.post('/advisor/cases', data),
  updateCaseStatus: (caseId: number, status: string) =>
    apiClient.put(`/advisor/cases/${caseId}/status`, { status }),

  // Appointments
  getAppointments: () => apiClient.get<AdvisorAppointmentDto[]>('/advisor/appointments'),
  updateAppointmentStatus: (id: number, status: string) =>
    apiClient.put(`/advisor/appointments/${id}/status`, { status }),

  // Documents
  getCustomerDocuments: (customerId: string) =>
    apiClient.get<AdvisorDocumentDto[]>(`/advisor/documents/${customerId}`),
  verifyDocument: (documentId: number, isVerified: boolean) =>
    apiClient.put(`/advisor/documents/${documentId}/verify`, { isVerified }),
}
