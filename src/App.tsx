import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '@hooks/index'
import { ROLES, ROUTES } from '@constants/index'

import { Login, ForgotPassword, ResetPassword } from '@pages/auth'
import { NotFound, ServerError, Unauthorized } from '@pages/errors'

import { ProtectedRoute, RoleProtectedRoute } from '@middleware/index'
import { StudentLayout, AdminLayout, TeacherLayout, PublicLayout } from '@layouts/index'

import { Home } from './pages/public/Home'
import { About } from './pages/public/About'
import Admission from './pages/public/Admission'

import StudentDashboard from '@pages/student/Dashboard'
import StudentTimetable from '@pages/student/Timetable'
import StudentAssignments from '@pages/student/Assignments'
import StudentMessages from '@pages/student/Messages'
import StudentAttendance from '@pages/student/Attendance'
import { Gallery } from './pages/public/Gallery'
import { NewsAndEvent } from './pages/public/NewsAndEvent'
import { Contact } from './pages/public/Contact'
import NewsArticle from './pages/public/NewsArticle'
import Events from './pages/public/Events'
import EventDetail from './pages/public/EventDetail'
import Policy from './pages/public/Policy'
// import StudentGrades from '@pages/student/Grades'
// import StudentSettings from '@pages/student/Settings'

// import AdminApplications from '@pages/admin/Applications'
// import AdminAnalytics from '@pages/admin/Analytics'

// import TeacherDashboard from '@pages/teacher/Dashboard'

/* ---------- Helpers ---------- */

const PageLoader: React.FC = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
      <p className="text-sm text-gray-600">Loading...</p>
    </div>
  </div>
)

const getHomeRouteForRole = (role?: string): string => {
  switch (role) {
    case ROLES.STUDENT:
      return ROUTES.DASHBOARD
    case ROLES.ADMIN:
    case ROLES.ADMISSIONS:
      return ROUTES.APPLICATIONS
    case ROLES.TEACHER:
      return ROUTES.TEACHER_DASHBOARD
    default:
      return '/'
  }
}

/** Auth pages: logged-in users get sent to their dashboard instead. */
const GuestRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, user, isLoading } = useAuth()

  if (isLoading) return <PageLoader />
  if (isAuthenticated) return <Navigate to={getHomeRouteForRole(user?.role)} replace />

  return <>{children}</>
}

/* ---------- App ---------- */

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public information site — never waits on auth */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/admission" element={<Admission />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/news" element={<NewsAndEvent />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/news/:slug" element={<NewsArticle />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/policy" element={<Policy />} />

        <Route path="*" element={<NotFound />} />

          



          {/* More public routes go here */}
        </Route>

        {/* Auth pages */}
        <Route path={ROUTES.LOGIN} element={<GuestRoute><Login /></GuestRoute>} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<GuestRoute><ForgotPassword /></GuestRoute>} />
        <Route path={ROUTES.RESET_PASSWORD} element={<GuestRoute><ResetPassword /></GuestRoute>} />

        {/* Student portal (paused) */}
        <Route
          element={
            <ProtectedRoute>
              <RoleProtectedRoute allowedRoles={[ROLES.STUDENT]}>
                <StudentLayout />
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        >
          <Route path={ROUTES.DASHBOARD} element={<StudentDashboard />} />
          <Route path={ROUTES.TIMETABLE} element={<StudentTimetable />} />
          <Route path={ROUTES.ASSIGNMENTS} element={<StudentAssignments />} />
          <Route path={ROUTES.MESSAGES} element={<StudentMessages />} />
          <Route path={ROUTES.ATTENDANCE} element={<StudentAttendance />} />
          {/* <Route path={ROUTES.GRADES} element={<StudentGrades />} /> */}
          {/* <Route path={ROUTES.SETTINGS} element={<StudentSettings />} /> */}
        </Route>

        {/* Admin portal (paused) */}
        <Route
          element={
            <ProtectedRoute>
              <RoleProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.ADMISSIONS]}>
                <AdminLayout />
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        >
          {/* <Route path={ROUTES.APPLICATIONS} element={<AdminApplications />} /> */}
          {/* <Route path={ROUTES.ANALYTICS} element={<AdminAnalytics />} /> */}
        </Route>

        {/* Teacher portal (paused) */}
        <Route
          element={
            <ProtectedRoute>
              <RoleProtectedRoute allowedRoles={[ROLES.TEACHER]}>
                <TeacherLayout />
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        >
          {/* <Route path={ROUTES.TEACHER_DASHBOARD} element={<TeacherDashboard />} /> */}
        </Route>

        {/* Errors */}
        <Route path={ROUTES.UNAUTHORIZED} element={<Unauthorized />} />
        <Route path={ROUTES.ERROR} element={<ServerError />} />
      </Routes>
    </BrowserRouter>
  )
}