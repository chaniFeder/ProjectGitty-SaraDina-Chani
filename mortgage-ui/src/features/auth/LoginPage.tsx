import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Home } from 'lucide-react'
import { authApi } from '@/api/auth.api'
import { useAuthStore } from '@/store/auth.store'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

const schema = z.object({
  username: z.string().min(1, 'שם משתמש הוא שדה חובה'),
  password: z.string().min(1, 'סיסמה היא שדה חובה'),
})

type FormData = z.infer<typeof schema>

export function LoginPage() {
  const navigate = useNavigate()
  const setAuth = useAuthStore((s) => s.setAuth)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    setServerError(null)
    try {
      const res = await authApi.login(data)
      setAuth(res.data)
      if (res.data.role === 'customer') navigate('/customer/dashboard')
      else if (res.data.role === 'advisor') navigate('/advisor/dashboard')
      else navigate('/admin/dashboard')
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message
        ?? 'שגיאה בהתחברות, נסה שנית'
      setServerError(msg)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg">
            <Home className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">מערכת ניהול משכנתאות</h1>
          <p className="text-gray-500 mt-1 text-sm">התחבר לחשבונך</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <Input
              label="שם משתמש"
              placeholder="הכנס שם משתמש"
              autoComplete="username"
              error={errors.username?.message}
              {...register('username')}
            />

            <Input
              label="סיסמה"
              type="password"
              placeholder="הכנס סיסמה"
              autoComplete="current-password"
              error={errors.password?.message}
              {...register('password')}
            />

            {serverError && (
              <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
                {serverError}
              </div>
            )}

            <Button type="submit" className="w-full" size="lg" loading={isSubmitting}>
              התחברות
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            לקוח חדש?{' '}
            <Link to="/register" className="text-blue-600 font-medium hover:underline">
              הרשמה כאן
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
