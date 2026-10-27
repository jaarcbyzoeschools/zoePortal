import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  CreditCard, 
  CheckCircle2, 
  Lock, 
  TrendingUp, 
  Calendar,
  FileText,
  BarChart3,
} from 'lucide-react'
import { Card } from '@components/common/Card'
import { Badge } from '@components/common/Badge'
import { Alert } from '@components/common/Alert'
import { Button } from '@components/common/Button'
import { Spinner } from '@components/common/Spinner'
import { useDashboard } from '@hooks/useDashboard'
import { formatCurrency, formatDate } from '@utils/format'
import { ROUTES } from '@constants/index'

const StudentDashboard: React.FC = () => {
  const navigate = useNavigate()
  const currentYear = new Date().getFullYear()
  const currentTerm = 1

  const { dashboard, isLoading, error, fetchDashboard } = useDashboard(currentYear, currentTerm)

  useEffect(() => {
    fetchDashboard()
  }, [fetchDashboard])

  if (isLoading) {
    return <Spinner fullScreen message="Loading your dashboard..." />
  }

  if (error || !dashboard) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-600 mt-1">We encountered an issue loading your data</p>
        </div>
        <Alert
          type="error"
          title="Unable to Load Dashboard"
          message={error || 'Please try again later'}
          dismissible={false}
        />
        <Button variant="primary" onClick={fetchDashboard} size="md">
          Try Again
        </Button>
      </div>
    )
  }

  const { student, paymentStatus, balance, sessionYear, term } = dashboard

  const handlePaymentClick = () => {
    navigate(`${ROUTES.DASHBOARD}/payment`)
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {student.firstName}
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Academic Year {sessionYear}/{sessionYear + 1} • Term {term}
          </p>
        </div>
      </div>

      {/* CRITICAL ALERTS */}
      {paymentStatus.portalLocked && (
        <Alert
          type="warning"
          title="Portal Access Required"
          message="Complete the first payment of ₦40,000 to unlock full portal access including timetable, assignments, and attendance."
          dismissible={false}
        />
      )}

      {paymentStatus.gradesLocked && !paymentStatus.portalLocked && (
        <Alert
          type="info"
          title="Grades Not Yet Available"
          message="Complete the second payment to view your grades and report cards."
          dismissible={false}
        />
      )}

      {/* STUDENT INFO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* STUDENT CARD */}
        <Card padding="lg" variant="elevated">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900">Student Profile</h2>
            <Badge label={student.status} variant="success" size="sm" />
          </div>

          <div className="space-y-4">
            <div className="border-b border-gray-100 pb-3">
              <p className="text-xs text-gray-600 mb-1">Full Name</p>
              <p className="text-sm font-semibold text-gray-900">
                {student.firstName} {student.surname}
              </p>
            </div>

            <div className="border-b border-gray-100 pb-3">
              <p className="text-xs text-gray-600 mb-1">Student ID</p>
              <p className="text-sm font-semibold text-gray-900 font-mono">
                {student.studentIdNumber}
              </p>
            </div>

            <div className="border-b border-gray-100 pb-3">
              <p className="text-xs text-gray-600 mb-1">Class Level</p>
              <p className="text-sm font-semibold text-gray-900">{student.classLevel}</p>
            </div>

            <div>
              <p className="text-xs text-gray-600 mb-1">School Email</p>
              <p className="text-xs font-semibold text-blue-600 break-all">
                {student.schoolEmail}
              </p>
            </div>
          </div>
        </Card>

        {/* SESSION CARD */}
        <Card padding="lg" variant="elevated">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Session Information</h2>

          <div className="space-y-4">
            <div className="border-b border-gray-100 pb-3">
              <p className="text-xs text-gray-600 mb-1">Academic Session</p>
              <p className="text-sm font-semibold text-gray-900">
                {sessionYear}/{sessionYear + 1}
              </p>
            </div>

            <div className="border-b border-gray-100 pb-3">
              <p className="text-xs text-gray-600 mb-1">Current Term</p>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-900">Term {term}</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Active</span>
              </div>
            </div>

            <div className="border-b border-gray-100 pb-3">
              <p className="text-xs text-gray-600 mb-1">Admission Date</p>
              <p className="text-sm font-semibold text-gray-900">
                {formatDate(new Date(student.admissionDate))}
              </p>
            </div>

            {student.previousSchool && (
              <div>
                <p className="text-xs text-gray-600 mb-1">Previous School</p>
                <p className="text-sm font-semibold text-gray-900">{student.previousSchool}</p>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* PAYMENT STATUS CARDS */}
      <Card padding="lg" variant="bordered">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-blue-600" />
            Payment Status
          </h2>
          <Badge 
            label={`${balance.percentagePaid}% Complete`}
            variant="primary"
            size="sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* FIRST INSTALLMENT */}
          <div className={`rounded-lg p-4 border-2 transition-all ${
            paymentStatus.firstPaymentCompleted
              ? 'border-green-200 bg-green-50'
              : 'border-gray-200 bg-gray-50'
          }`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                {paymentStatus.firstPaymentCompleted ? (
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Lock className="w-5 h-5 text-yellow-600" />
                  </div>
                )}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">First Installment</h3>
                  <p className="text-xs text-gray-600">Tuition Payment</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded p-3 mb-4">
              <p className="text-xs text-gray-600 mb-1">Amount Due</p>
              <p className="text-lg font-bold text-gray-900">{formatCurrency(40000)}</p>
            </div>

            {paymentStatus.firstPaymentCompleted ? (
              <div className="text-center">
                <p className="text-xs text-green-800 font-medium mb-1">Payment Completed</p>
                <p className="text-xs text-green-700">
                  {paymentStatus.firstPaymentDate && 
                    formatDate(new Date(paymentStatus.firstPaymentDate))
                  }
                </p>
              </div>
            ) : (
              <>
                <p className="text-xs text-gray-600 mb-3">
                  Pay to unlock timetable, assignments, and attendance records
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  fullWidth
                  onClick={handlePaymentClick}
                >
                  Pay First Installment
                </Button>
              </>
            )}
          </div>

          {/* SECOND INSTALLMENT */}
          <div className={`rounded-lg p-4 border-2 transition-all ${
            paymentStatus.secondPaymentCompleted
              ? 'border-green-200 bg-green-50'
              : 'border-gray-200 bg-gray-50'
          }`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                {paymentStatus.secondPaymentCompleted ? (
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Lock className="w-5 h-5 text-yellow-600" />
                  </div>
                )}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Second Installment</h3>
                  <p className="text-xs text-gray-600">Final Payment</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded p-3 mb-4">
              <p className="text-xs text-gray-600 mb-1">Amount Due</p>
              <p className="text-lg font-bold text-gray-900">{formatCurrency(40000)}</p>
            </div>

            {paymentStatus.secondPaymentCompleted ? (
              <div className="text-center">
                <p className="text-xs text-green-800 font-medium mb-1">Payment Completed</p>
                <p className="text-xs text-green-700">
                  {paymentStatus.secondPaymentDate && 
                    formatDate(new Date(paymentStatus.secondPaymentDate))
                  }
                </p>
              </div>
            ) : (
              <>
                <p className="text-xs text-gray-600 mb-3">
                  {paymentStatus.firstPaymentCompleted
                    ? 'Pay to unlock grades and report cards'
                    : 'Complete first payment to enable this'}
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  fullWidth
                  disabled={!paymentStatus.firstPaymentCompleted}
                  onClick={handlePaymentClick}
                >
                  {paymentStatus.firstPaymentCompleted ? 'Pay Final Installment' : 'Locked'}
                </Button>
              </>
            )}
          </div>
        </div>
      </Card>

      {/* BALANCE SUMMARY */}
      <Card padding="lg" variant="elevated">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Balance Summary
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-xs text-gray-600 mb-2 font-medium">Total Amount</p>
            <p className="text-xl font-bold text-gray-900">
              {formatCurrency(balance.totalAmount)}
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <p className="text-xs text-gray-600 mb-2 font-medium">Amount Paid</p>
            <p className="text-xl font-bold text-green-600">
              {formatCurrency(balance.paidAmount)}
            </p>
          </div>
          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <p className="text-xs text-gray-600 mb-2 font-medium">Outstanding</p>
            <p className="text-xl font-bold text-red-600">
              {formatCurrency(balance.outstandingAmount)}
            </p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="text-xs text-gray-600 mb-2 font-medium">Progress</p>
            <p className="text-xl font-bold text-blue-600">{balance.percentagePaid}%</p>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-gray-700">Payment Progress</span>
            <span className="text-xs font-semibold text-gray-900">
              {formatCurrency(balance.paidAmount)} / {formatCurrency(balance.totalAmount)}
            </span>
          </div>
          <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-full transition-all duration-500 ease-out"
              style={{ width: `${Math.min(balance.percentagePaid, 100)}%` }}
            ></div>
          </div>
        </div>
      </Card>

      {/* QUICK ACCESS CARDS */}
      <div>
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Quick Access</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card
            padding="md"
            variant="default"
            clickable
            onClick={() => navigate(ROUTES.TIMETABLE)}
            className="hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-gray-900">My Timetable</h3>
                <p className="text-xs text-gray-600">View class schedule</p>
                {paymentStatus.portalLocked && (
                  <p className="text-xs text-yellow-600 mt-2">Locked</p>
                )}
              </div>
            </div>
          </Card>

          <Card
            padding="md"
            variant="default"
            clickable
            onClick={() => navigate(ROUTES.ASSIGNMENTS)}
            className="hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Assignments</h3>
                <p className="text-xs text-gray-600">View pending work</p>
                {paymentStatus.portalLocked && (
                  <p className="text-xs text-yellow-600 mt-2">Locked</p>
                )}
              </div>
            </div>
          </Card>

          <Card
            padding="md"
            variant="default"
            clickable
            onClick={() => navigate(ROUTES.GRADES)}
            className="hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Grades</h3>
                <p className="text-xs text-gray-600">View your scores</p>
                {paymentStatus.gradesLocked && (
                  <p className="text-xs text-yellow-600 mt-2">Locked</p>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard