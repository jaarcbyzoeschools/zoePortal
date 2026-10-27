export interface User {
  id: string
  email: string
  role: 'student' | 'teacher' | 'admin' | 'admissions' | 'bursar'
  isActive: boolean
  lastLoginAt: string | null
  createdAt: string
  updatedAt: string
}

export interface AuthResponse {
  success: boolean
  data: {
    accessToken: string
    user: User
  }
  message: string
}

export interface Student {
  id: string
  userId: string
  firstName: string
  middleName: string | null
  surname: string
  dateOfBirth: string
  gender: string | null
  studentIdNumber: string
  classLevel: string
  schoolEmail: string
  personalEmail: string | null
  phoneNumber: string | null
  parentName: string | null
  parentEmail: string
  parentPhoneNumber: string | null
  status: 'active' | 'graduated' | 'withdrawn' | 'suspended'
  admissionDate: string
  previousSchool: string | null
  createdAt: string
  updatedAt: string
}

export interface Application {
  id: string
  applicantFirstName: string
  applicantMiddleName: string | null
  applicantSurname: string
  applicantDateOfBirth: string
  applicantEmail: string
  parentName: string
  parentRelationship: string
  parentEmail: string
  parentPhoneNumber: string
  parentAddress: string | null
  parentOccupation: string | null
  classApplyingFor: string
  previousSchool: string | null
  birthCertificateUrl: string | null
  reportCardUrl: string | null
  status: 'draft' | 'submitted' | 'under_review' | 'admitted' | 'rejected' | 'withdrawn'
  submittedAt: string | null
  decidedAt: string | null
  decidedByUserId: string | null
  rejectionReason: string | null
  adminNotes: string | null
  createdAt: string
  updatedAt: string
}

export interface Payment {
  id: string
  studentId: string
  sessionYear: number
  term: number
  installmentNumber: number
  amount: number
  status: 'pending' | 'confirmed' | 'failed' | 'refunded'
  referenceNumber: string
  gatewayTransactionId: string | null
  paymentMethod: 'card' | 'transfer' | 'ussd' | 'mobile_money'
  paymentDate: string | null
  failureReason: string | null
  receiptUrl: string | null
  createdAt: string
  updatedAt: string
}

export interface PortalAccess {
  id: string
  studentId: string
  sessionYear: number
  term: number
  firstPaymentCompleted: boolean
  firstPaymentDate: string | null
  secondPaymentCompleted: boolean
  secondPaymentDate: string | null
  portalLocked: boolean
  gradesLocked: boolean
  lastAccessedAt: string | null
  createdAt: string
  updatedAt: string
}

export interface Dashboard {
  student: Student
  paymentStatus: {
    portalLocked: boolean
    gradesLocked: boolean
    firstPaymentCompleted: boolean
    secondPaymentCompleted: boolean
    firstPaymentDate: string | null
    secondPaymentDate: string | null
  }
  balance: {
    totalAmount: number
    paidAmount: number
    outstandingAmount: number
    percentagePaid: number
  }
  sessionYear: number
  term: number
}

export interface InitializePaymentResponse {
  success: boolean
  data: {
    referenceNumber: string
    authorizationUrl: string
    accessCode: string
    amount: number
    email: string
  }
  message: string
}

export interface AdmissionsStats {
  totalApplications: number
  pendingApplications: number
  admittedApplications: number
  rejectedApplications: number
  approvalRate: number
}

export interface ApiError {
  success: false
  error: string
  code: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  code?: string
  message: string
}