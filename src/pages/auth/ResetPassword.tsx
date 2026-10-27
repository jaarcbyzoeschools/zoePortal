import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Lock, ArrowLeft } from 'lucide-react'
import { z } from 'zod'
import { Link } from 'react-router-dom'
import { Button } from '@components/common/Button'
import { Input } from '@components/common/Input'
import { Card } from '@components/common/Card'
import { Alert } from '@components/common/Alert'
import { useAuth, useFormValidation } from '@hooks/index'
import { ROUTES } from '@constants/index'
import { resetPasswordSchema } from '@utils/validation'

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

export const ResetPassword: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { resetPassword, isLoading, error } = useAuth()
  const [submitted, setSubmitted] = React.useState(false)
  const [invalidToken, setInvalidToken] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useFormValidation<ResetPasswordFormData>({
    schema: resetPasswordSchema,
    defaultValues: {
      resetToken: searchParams.get('token') || '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  const resetToken = watch('resetToken')
  const newPassword = watch('newPassword')
  const confirmPassword = watch('confirmPassword')

  useEffect(() => {
    if (!resetToken) {
      setInvalidToken(true)
    }
  }, [resetToken])

  const onSubmit = async (data: ResetPasswordFormData) => {
    const success = await resetPassword(data.resetToken, data.newPassword)
    if (success) {
      setSubmitted(true)
    }
  }

  if (invalidToken) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary to-blue-700 flex items-center justify-center px-4">
        <Card className="w-full max-w-md" padding="lg" variant="default">
          <Alert
            type="error"
            title="Invalid Link"
            message="The password reset link is invalid or has expired. Please request a new one."
            dismissible={false}
            className="mb-4"
          />

          <Button
            variant="primary"
            onClick={() => navigate(ROUTES.FORGOT_PASSWORD)}
            fullWidth
          >
            Request New Link
          </Button>
        </Card>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary to-blue-700 flex items-center justify-center px-4">
        <Card className="w-full max-w-md" padding="lg" variant="default">
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="bg-green-100 rounded-full p-3">
                <Lock className="w-6 h-6 text-success" />
              </div>
            </div>

            <h1 className="text-xl font-bold text-gray-900 mb-2">Password Reset</h1>
            <p className="text-sm text-gray-600 mb-6">
              Your password has been successfully reset. You can now log in with your new
              password.
            </p>

            <Button variant="primary" onClick={() => navigate(ROUTES.LOGIN)} fullWidth>
              Go to Login
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
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Create New Password</h1>
          <p className="text-sm text-gray-600">Enter your new password below</p>
        </div>

        {error && (
          <Alert type="error" message={error} dismissible={false} className="mb-4" />
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="New Password"
            type="password"
            placeholder="Enter new password"
            icon={<Lock className="w-4 h-4" />}
            error={errors.newPassword?.message}
            disabled={isLoading}
            helperText="At least 6 characters with 1 uppercase and 1 number"
            {...register('newPassword')}
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm new password"
            icon={<Lock className="w-4 h-4" />}
            error={errors.confirmPassword?.message}
            disabled={isLoading}
            {...register('confirmPassword')}
          />

          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isLoading}
            disabled={isLoading || !newPassword || !confirmPassword}
          >
            Reset Password
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