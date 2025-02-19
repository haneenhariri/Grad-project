import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './redux/store/index.ts';
import RoleProtectedRoute from './hooks/RoleProtectedRoute.tsx';
import Layout from './layout/Layout.tsx';
import DashLayout from './layout/DashLayout.tsx';
import './index.css';
import './utils/i18n.ts';
import NewCourse from './Admin/NewCourse.tsx';
import Home from './pages/Home/Home.tsx';
import EditeCourse from './Dashboard/EditeCourse.tsx';
const Auth = lazy(() => import('./pages/Auth/Auth.tsx'));
const UserDash = lazy(() => import('./pages/UserDash/UserDash.tsx'));
const CoursesPage = lazy(() => import('./pages/CoursesPage/CoursesPage.tsx'));
const OneCourse = lazy(() => import('./pages/OneCourse/OneCourse.tsx'));
const WatchCourse = lazy(() => import('./pages/WatchCourse/WatchCourse.tsx'));
const InstructorPage = lazy(() => import('./pages/InstructorPage/InstructorPage.tsx'));
const ProfileSettings = lazy(() => import('./components/ProfileSettings/ProfileSettings.tsx'));
const Courses = lazy(() => import('./components/UserCourse/Courses.tsx'));
const Admin = lazy(() => import('./Admin/Admin.tsx'));
const TeacherForm = lazy(() => import('./pages/TeacherForm/TeacherForm.tsx'));
const InstractorDash = lazy(() => import('./Dashboard/InstractorDash.tsx'));
const InstractSettings = lazy(() => import('./Dashboard/InstractSettings.tsx'));
const CreatCourse = lazy(() => import('./Dashboard/CreatCourse.tsx'));
const Earning = lazy(() => import('./Dashboard/Earning.tsx'));
const IstractCourses = lazy(() => import('./Dashboard/IstractCourses.tsx'));
const CourseDetail = lazy(() => import('./Dashboard/CourseDetail.tsx'));
const MyCourse = lazy(() => import('./Dashboard/MyCourse.tsx'));
const AdminCourse = lazy(() => import('./Admin/AdminCourse.tsx'));
const InstructorList = lazy(() => import('./Admin/InstructorList.tsx'));
const Students = lazy(() => import('./Admin/Students.tsx'));
const Payments = lazy(() => import('./Admin/Payments.tsx'));
const AdminSettings = lazy(() => import('./Admin/AdminSettings.tsx'));

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element:<Home /> },
      { path: '/courses', element: <Suspense fallback={<p>Loading...</p>}><CoursesPage /></Suspense> },
      { path: '/oneCourse/:id', element: <Suspense fallback={<p>Loading...</p>}><OneCourse /></Suspense> },
      { path: '/watch/:id', element: <Suspense fallback={<p>Loading...</p>}><WatchCourse /></Suspense> },
      { path: '/auth/:formType', element: <Suspense fallback={<p>Loading...</p>}><Auth /></Suspense> },
      {
        path: 'User',
        element: (
          <RoleProtectedRoute allowedRoles={['student']}>
            <Suspense fallback={<p>Loading...</p>}><UserDash /></Suspense>
          </RoleProtectedRoute>
        ),
        children: [
          { index: true, element: <Suspense fallback={<p>Loading...</p>}><ProfileSettings /></Suspense> },
          { path: 'settings', element: <Suspense fallback={<p>Loading...</p>}><ProfileSettings /></Suspense> },
          { path: 'usercourse', element: <Suspense fallback={<p>Loading...</p>}><Courses /></Suspense> },
        ],
      },
      { path: '/Instructor', element: <Suspense fallback={<p>Loading...</p>}><InstructorPage /></Suspense> },
      { path: '/InstructorForm', element: <Suspense fallback={<p>Loading...</p>}><TeacherForm /></Suspense> },
      { path: '*', element: <Suspense fallback={<p>Loading...</p>}><Home /></Suspense> },
    ],
  },
  {
    path: '/Admin',
    element: (
      <RoleProtectedRoute allowedRoles={['admin']}>
        <Suspense fallback={<p>Loading...</p>}><Admin /></Suspense>
      </RoleProtectedRoute>
    ),
    children: [
      { index: true, element: <Suspense fallback={<p>Loading...</p>}><InstractorDash /></Suspense> },
      { path: 'dash', element: <Suspense fallback={<p>Loading...</p>}><InstractorDash /></Suspense> },
      { path: 'Settings', element: <Suspense fallback={<p>Loading...</p>}><AdminSettings /></Suspense> },
      { path: 'Courses', element: <Suspense fallback={<p>Loading...</p>}><AdminCourse /></Suspense> },
      { path: 'Create', element: <Suspense fallback={<p>Loading...</p>}><NewCourse/></Suspense> },
      { path: 'Payments', element: <Suspense fallback={<p>Loading...</p>}><Payments /></Suspense> },
      { path: 'instructorlist', element: <Suspense fallback={<p>Loading...</p>}><InstructorList /></Suspense> },
      { path: 'Students', element: <Suspense fallback={<p>Loading...</p>}><Students /></Suspense> },
    ],
  },
  {
    path: '/instruct',
    element: (
      <RoleProtectedRoute allowedRoles={['instructor']}>
        <Suspense fallback={<p>Loading...</p>}><DashLayout /></Suspense>
      </RoleProtectedRoute>
    ),
    children: [
      { index: true, element: <Suspense fallback={<p>Loading...</p>}><InstractSettings /></Suspense> },
      { path: 'dash', element: <Suspense fallback={<p>Loading...</p>}><InstractorDash /></Suspense> },
      { path: 'Settings', element: <Suspense fallback={<p>Loading...</p>}><InstractSettings /></Suspense> },
      { path: 'Create', element: <Suspense fallback={<p>Loading...</p>}><CreatCourse /></Suspense> },
      { path: 'Earning', element: <Suspense fallback={<p>Loading...</p>}><Earning /></Suspense> },
      { path: 'edit/:id', element: <Suspense fallback={<p>Loading...</p>}><EditeCourse /></Suspense> },
      {
        path: 'MyCourses',
        element: <Suspense fallback={<p>Loading...</p>}><IstractCourses /></Suspense>,
        children: [
          { path: '', element: <Suspense fallback={<p>Loading...</p>}><MyCourse /></Suspense> },
          { path: 'detail/:id', element: <Suspense fallback={<p>Loading...</p>}><CourseDetail /></Suspense> },
        ],
      },
    ],
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes} />
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
