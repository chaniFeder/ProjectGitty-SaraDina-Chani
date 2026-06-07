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
  customerId: z
    .string()
    .length(9, 'תעודת זהות חייבת להכיל 9 ספרות')
    .regex(/^\d+$/, 'תעודת זהות חייבת להכיל ספרות בלבד'),
  username: z.string().min(3, 'שם משתמש חייב להכיל לפחות 3 תווים'),
  password: z.string().min(6, 'סיסמה חייבת להכיל לפחות 6 תווים'),
  firstName: z.string().min(2, 'שם פרטי הוא שדה חובה'),
  lastName: z.string().min(2, 'שם משפחה הוא שדה חובה'),
  email: z.string().email('כתובת מייל לא תקינה'),
  phoneNumber: z
    .string()
    .regex(/^0\d{9}$/, 'מספר טלפון לא תקין (10 ספרות, מתחיל ב-0)'),
  address: z.string().min(5, 'כתובת היא שדה חובה'),
  monthlyIncome: z.string().optional(),
})

type FormData = z.infer<typeof schema>

export function RegisterPage() {
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
      const res = await authApi.register({
        ...data,
        monthlyIncome: data.monthlyIncome ? parseFloat(data.monthlyIncome) : undefined,
      })
      setAuth(res.data)
      navigate('/customer/dashboard')
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message
        ?? 'שגיאה בהרשמה, נסה שנית'
      setServerError(msg)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg">
            <Home className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">הרשמה למערכת</h1>
          <p className="text-gray-500 mt-1 text-sm">צור חשבון לקוח חדש</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            {/* Row 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="תעודת זהות"
                placeholder="9 ספרות"
                maxLength={9}
                error={errors.customerId?.message}
                {...register('customerId')}
              />
              <Input
                label="שם משתמש"
                placeholder="לפחות 3 תווים"
                error={errors.username?.message}
                {...register('username')}
              />
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="שם פרטי"
                placeholder="שם פרטי"
                error={errors.firstName?.message}
                {...register('firstName')}
              />
              <Input
                label="שם משפחה"
                placeholder="שם משפחה"
                error={errors.lastName?.message}
                {...register('lastName')}
              />
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="כתובת מייל"
                type="email"
                placeholder="example@email.com"
                error={errors.email?.message}
                {...register('email')}
              />
              <Input
                label="מספר טלפון"
                placeholder="05X-XXXXXXX"
                error={errors.phoneNumber?.message}
                {...register('phoneNumber')}
              />
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="כתובת מגורים"
                placeholder="רחוב, עיר"
                error={errors.address?.message}
                {...register('address')}
              />
              <Input
                label="הכנסה חודשית נטו (₪)"
                type="number"
                placeholder="לדוגמה: 15000"
                error={errors.monthlyIncome?.message}
                {...register('monthlyIncome')}
              />
            </div>

            {/* Password */}
            <Input
              label="סיסמה"
              type="password"
              placeholder="לפחות 6 תווים"
              error={errors.password?.message}
              {...register('password')}
            />

            {serverError && (
              <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
                {serverError}
              </div>
            )}

            <Button type="submit" className="w-full" size="lg" loading={isSubmitting}>
              הרשמה
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            כבר יש לך חשבון?{' '}
            <Link to="/login" className="text-blue-600 font-medium hover:underline">
              התחבר כאן
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
