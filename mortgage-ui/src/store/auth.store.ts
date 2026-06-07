import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AuthResponse } from '@/types/auth.types'

interface AuthState {
  token: string | null
  userId: string | null
  username: string | null
  role: 'customer' | 'advisor' | 'admin' | null
  isAuthenticated: boolean
  setAuth: (data: AuthResponse) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      userId: null,
      username: null,
      role: null,
      isAuthenticated: false,

      setAuth: (data) =>
        set({
          token: data.token,
          userId: data.userId,
          username: data.username,
          role: data.role,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          token: null,
          userId: null,
          username: null,
          role: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'mortgage-auth',
    }
  )
)
