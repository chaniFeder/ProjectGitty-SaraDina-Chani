import apiClient from './client'
import type {
  BankDto,
  MortgageProgramDto,
  SystemStatisticsDto,
  AdminUserDto,
  AdminCaseDto,
} from '@/types/advisor-admin.types'

export const adminApi = {
  // Stats
  getStatistics: () => apiClient.get<SystemStatisticsDto>('/admin/statistics'),

  // Cases
  getActiveCases: () => apiClient.get<AdminCaseDto[]>('/admin/cases'),

  // Banks
  getBanks: () => apiClient.get<BankDto[]>('/admin/banks'),
  addBank: (data: BankDto) => apiClient.post('/admin/banks', data),
  updateBank: (id: number, data: BankDto) => apiClient.put(`/admin/banks/${id}`, data),

  // Programs
  getPrograms: () => apiClient.get<MortgageProgramDto[]>('/admin/programs'),
  addProgram: (data: MortgageProgramDto) => apiClient.post('/admin/programs', data),
  updateInterestRate: (programId: number, rate: number) =>
    apiClient.put(`/admin/programs/${programId}/rate`, { interestRate: rate }),

  // Users
  getAdvisors: () => apiClient.get<AdminUserDto[]>('/admin/users'),
  addAdvisor: (data: AdminUserDto) => apiClient.post('/admin/users', data),
}
