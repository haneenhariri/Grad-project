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
import EditeCourse from './instructorDash/EditeCourse.tsx';
import Spinner from './components/Spinner/Spinner.tsx';

const Auth = lazy(() => import(/* webpackChunkName: "auth" */ './pages/Auth/Auth.tsx'));
const UserDash = lazy(() => import(/* webpackChunkName: "user-dash" */ './pages/UserDash/UserDash.tsx'));
const CoursesPage = lazy(() => import(/* webpackChunkName: "courses" */ './pages/CoursesPage/CoursesPage.tsx'));
const OneCourse = lazy(() => import(/* webpackChunkName: "one-course" */ './pages/OneCourse/OneCourse.tsx'));
const WatchCourse = lazy(() => import(/* webpackChunkName: "watch-course" */ './pages/WatchCourse/WatchCourse.tsx'));
const InstructorPage = lazy(() => import(/* webpackChunkName: "instructor" */ './pages/InstructorPage/InstructorPage.tsx'));
const ProfileSettings = lazy(() => import(/* webpackChunkName: "profile-settings" */ './components/ProfileSettings/ProfileSettings.tsx'));
const Courses = lazy(() => import(/* webpackChunkName: "user-courses" */ './components/UserCourse/Courses.tsx'));
const Admin = lazy(() => import(/* webpackChunkName: "admin" */ './Admin/Admin.tsx'));
const TeacherForm = lazy(() => import(/* webpackChunkName: "teacher-form" */ './pages/TeacherForm/TeacherForm.tsx'));
const InstractorDash = lazy(() => import(/* webpackChunkName: "instructor-dash" */ './instructorDash/InstractorDash.tsx'));
const InstractSettings = lazy(() => import(/* webpackChunkName: "instructor-settings" */ './instructorDash/InstractSettings.tsx'));
const CreatCourse = lazy(() => import(/* webpackChunkName: "create-course" */ './instructorDash/AddCourse/CreatCourse.tsx'));
const Earning = lazy(() => import(/* webpackChunkName: "earning" */ './instructorDash/Earning.tsx'));
const IstractCourses = lazy(() => import(/* webpackChunkName: "instructor-courses" */ './instructorDash/IstractCourses.tsx'));
const CourseDetail = lazy(() => import(/* webpackChunkName: "course-detail" */ './instructorDash/CourseDetail.tsx'));
const MyCourse = lazy(() => import(/* webpackChunkName: "my-course" */ './instructorDash/MyCourse.tsx'));
const AdminCourse = lazy(() => import(/* webpackChunkName: "admin-course" */ './Admin/AdminCourse.tsx'));
const InstructorList = lazy(() => import(/* webpackChunkName: "instructor-list" */ './Admin/InstructorList.tsx'));
const Students = lazy(() => import(/* webpackChunkName: "students" */ './Admin/Students.tsx'));
const Payments = lazy(() => import(/* webpackChunkName: "payments" */ './Admin/Payments.tsx'));
const AdminSettings = lazy(() => import(/* webpackChunkName: "admin-settings" */ './Admin/AdminSettings.tsx'));

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <Home /> },
      { path: '/courses', element: <CoursesPage /> },
      { path: '/oneCourse/:id', element: <OneCourse /> },
      { path: '/watch/:id', element: <WatchCourse /> },
      { path: '/auth/:formType', element: <Auth /> },
      {
        path: 'User',
        element: (
          <RoleProtectedRoute allowedRoles={['student']}>
            <UserDash />
          </RoleProtectedRoute>
        ),
        children: [
          { index: true, element: <ProfileSettings /> },
          { path: 'settings', element: <ProfileSettings /> },
          { path: 'usercourse', element: <Courses /> },
        ],
      },
      { path: '/Instructor', element: <InstructorPage /> },
      { path: '/InstructorForm', element: <TeacherForm /> },
      { path: '*', element: <Home /> },
    ],
  },
  {
    path: '/Admin',
    element: (
      <RoleProtectedRoute allowedRoles={['admin']}>
        <Admin />
      </RoleProtectedRoute>
    ),
    children: [
      { index: true, element: <InstractorDash /> },
      { path: 'dash', element: <InstractorDash /> },
      { path: 'Settings', element: <AdminSettings /> },
      { path: 'Courses', element: <AdminCourse /> },
      { path: 'Create', element: <NewCourse /> },
      { path: 'Payments', element: <Payments /> },
      { path: 'instructorlist', element: <InstructorList /> },
      { path: 'Students', element: <Students /> },
    ],
  },
  {
    path: '/instruct',
    element: (
      <RoleProtectedRoute allowedRoles={['instructor']}>
        <DashLayout />
      </RoleProtectedRoute>
    ),
    children: [
      { index: true, element: <InstractSettings /> },
      { path: 'dash', element: <InstractorDash /> },
      { path: 'Settings', element: <InstractSettings /> },
      { path: 'Create', element: <CreatCourse /> },
      { path: 'Earning', element: <Earning /> },
      { path: 'edit/:id', element: <EditeCourse /> },
      {
        path: 'MyCourses',
        element: <IstractCourses />,
        children: [
          { path: '', element: <MyCourse /> },
          { path: 'detail/:id', element: <CourseDetail /> },
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
        <Suspense fallback={<Spinner />}>
          <RouterProvider router={routes} />
        </Suspense>
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);