import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Mail, ArrowLeft } from 'lucide-react'
import { z } from 'zod'
import { Button } from '@components/common/Button'
import { Input } from '@components/common/Input'
import { Card } from '@components/common/Card'
import { Alert } from '@components/common/Alert'
import { useAuth, useFormValidation } from '@hooks/index'
import { ROUTES } from '@constants/index'
import { forgotPasswordSchema } from '@utils/validation'

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

export const ForgotPassword: React.FC = () => {
  const navigate = useNavigate()
  const { requestPasswordReset, isLoading, error } = useAuth()
  const [submitted, setSubmitted] = React.useState(false)
  const { register, handleSubmit, formState: { errors }, watch } = useFormValidation<ForgotPasswordFormData>({
    schema: forgotPasswordSchema,
    defaultValues: {
      email: '',
    },
  })

  const email = watch('email')

  const onSubmit = async (data: ForgotPasswordFormData) => {
    const success = await requestPasswordReset(data.email)
    if (success) {
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary to-blue-700 flex items-center justify-center px-4">
        <Card className="w-full max-w-md" padding="lg" variant="default">
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="bg-green-100 rounded-full p-3">
                <Mail className="w-6 h-6 text-success" />
              </div>
            </div>

            <h1 className="text-xl font-bold text-gray-900 mb-2">Email Sent</h1>
            <p className="text-sm text-gray-600 mb-6">
              Check your email for instructions to reset your password. The link will expire
              in 1 hour.
            </p>

            <Button variant="primary" onClick={() => navigate(ROUTES.LOGIN)} fullWidth>
              Back to Login
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-blue-700 flex items-center justify-center px-4">
      <Card className="w-full max-w-md" padding="lg" variant="default">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Reset Password</h1>
          <p className="text-sm text-gray-600">Enter your email to receive reset instructions</p>
        </div>

        {error && (
          <Alert type="error" message={error} dismissible={false} className="mb-4" />
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="School Email"
            type="email"
            placeholder="your.email@zoesschools.org"
            icon={<Mail className="w-4 h-4" />}
            error={errors.email?.message}
            disabled={isLoading}
            {...register('email')}
          />

          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isLoading}
            disabled={isLoading || !email}
          >
            Send Reset Link
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link
            to={ROUTES.LOGIN}
            className="inline-flex items-center gap-1 text-xs text-primary hover:underline font-medium"
          >
            <ArrowLeft className="w-3 h-3" />
            Back to Login
          </Link>
        </div>
      </Card>
    </div>
  )
}