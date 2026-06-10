import { createBrowserRouter, Navigate } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { CustomerLayout } from '@/components/layout/CustomerLayout'
import { AdvisorLayout } from '@/components/layout/AdvisorLayout'
import { AdminLayout } from '@/components/layout/AdminLayout'

// Auth
import { LoginPage } from '@/features/auth/LoginPage'
import { RegisterPage } from '@/features/auth/RegisterPage'

// Customer
import { DashboardPage } from '@/features/customer/dashboard/DashboardPage'
import { ProfilePage } from '@/features/customer/profile/ProfilePage'
import { AppointmentsPage } from '@/features/customer/appointments/AppointmentsPage'
import { DocumentsPage } from '@/features/customer/documents/DocumentsPage'
import { CasesPage } from '@/features/customer/cases/CasesPage'
import { MortgagePage } from '@/features/customer/mortgage/MortgagePage'

// Advisor
import { AdvisorDashboardPage } from '@/features/advisor/dashboard/AdvisorDashboardPage'
import { AdvisorCustomersPage } from '@/features/advisor/customers/AdvisorCustomersPage'
import { AdvisorCasesPage } from '@/features/advisor/cases/AdvisorCasesPage'
import { AdvisorAppointmentsPage } from '@/features/advisor/appointments/AdvisorAppointmentsPage'
import { AdvisorDocumentsPage } from '@/features/advisor/documents/AdvisorDocumentsPage'

// Admin
import { AdminDashboardPage } from '@/features/admin/dashboard/AdminDashboardPage'
import { AdminCasesPage } from '@/features/admin/cases/AdminCasesPage'
import { AdminBanksPage } from '@/features/admin/banks/AdminBanksPage'
import { AdminProgramsPage } from '@/features/admin/programs/AdminProgramsPage'
import { AdminUsersPage } from '@/features/admin/users/AdminUsersPage'

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },

  // Customer portal
  {
    path: '/customer',
    element: <ProtectedRoute allowedRole="customer" />,
    children: [{
      element: <CustomerLayout />,
      children: [
        { index: true, element: <Navigate to="dashboard" replace /> },
        { path: 'dashboard', element: <DashboardPage /> },
        { path: 'profile', element: <ProfilePage /> },
        { path: 'appointments', element: <AppointmentsPage /> },
        { path: 'documents', element: <DocumentsPage /> },
        { path: 'cases', element: <CasesPage /> },
        { path: 'mortgage/:id', element: <MortgagePage /> },
      ],
    }],
  },

  // Advisor portal
  {
    path: '/advisor',
    element: <ProtectedRoute allowedRole="advisor" />,
    children: [{
      element: <AdvisorLayout />,
      children: [
        { index: true, element: <Navigate to="dashboard" replace /> },
        { path: 'dashboard', element: <AdvisorDashboardPage /> },
        { path: 'customers', element: <AdvisorCustomersPage /> },
        { path: 'cases', element: <AdvisorCasesPage /> },
        { path: 'appointments', element: <AdvisorAppointmentsPage /> },
        { path: 'documents', element: <AdvisorDocumentsPage /> },
      ],
    }],
  },

  // Admin portal
  {
    path: '/admin',
    element: <ProtectedRoute allowedRole="admin" />,
    children: [{
      element: <AdminLayout />,
      children: [
        { index: true, element: <Navigate to="dashboard" replace /> },
        { path: 'dashboard', element: <AdminDashboardPage /> },
        { path: 'cases', element: <AdminCasesPage /> },
        { path: 'banks', element: <AdminBanksPage /> },
        { path: 'programs', element: <AdminProgramsPage /> },
        { path: 'users', element: <AdminUsersPage /> },
      ],
    }],
  },

  { path: '*', element: <Navigate to="/login" replace /> },
])
