export interface LoginRequest {
  username: string
  password: string
}

export interface RegisterRequest {
  customerId: string
  username: string
  password: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  address: string
  dateOfBirth?: string
  monthlyIncome?: number
}

export interface AuthResponse {
  token: string
  userId: string
  username: string
  role: 'customer' | 'advisor' | 'admin'
}
