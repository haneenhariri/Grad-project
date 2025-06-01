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
import EditeCourse from './instructorDash/EditeCourse/EditeCourse.tsx';
import  AdminEditeCourse  from './Admin/EditeCourse/EditeCourse.tsx';
import Spinner from './components/Spinner/Spinner.tsx';
import Teachers from './components/Teachers/Teachers.tsx';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';
import ProtectedCourseRoute from './hooks/ProtectedCourseRoute';
import ChargeAccount from './Admin/Payments/ChargeAccount.tsx';
import Quiz from './pages/Quiz/Quiz.tsx';
import Dash from './Admin/Dash/Dash.tsx';
import StdDash from './pages/UserDash/StdDash.tsx';
import ChatApp from './chat/ChatApp.tsx';
import Log from './Admin/log/log.tsx';
import TestResults from './pages/UserDash/TestResults.tsx';

const Home  = lazy(() => import(/* webpackChunkName: "home" */ './pages/Home/Home.tsx'))
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
const MyCourse = lazy(() => import(/* webpackChunkName: "my-course" */ './instructorDash/MyCourse.tsx'));
const AdminCourse = lazy(() => import(/* webpackChunkName: "admin-course" */ './Admin/AdminCourse.tsx'));
const InstructorList = lazy(() => import(/* webpackChunkName: "instructor-list" */ './Admin/InstructorList.tsx'));
const Students = lazy(() => import(/* webpackChunkName: "students" */ './Admin/Students.tsx'));
const Payments = lazy(() => import(/* webpackChunkName: "payments" */ './Admin/Payments.tsx'));
const AdminSettings = lazy(() => import(/* webpackChunkName: "admin-settings" */ './Admin/AdminSettings.tsx'));
const Wishlist = lazy(()=> import(/* webpackChunkName: Wishlist */ './pages/UserDash/Wishlist.tsx'));
const PurchaseHistory = lazy( () => import( /* webpackChunkName: PurchaseHistory */ './components/PurchaseHistory/PurchaseHistory.tsx'))
const routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <Home /> },
      { path: '/courses', element: <CoursesPage /> },
      { path: '/oneCourse/:id', element: <OneCourse /> },
      { 
        path: '/watch/:id', 
        element: <ProtectedCourseRoute />,
        children: [
          { index: true, element: <WatchCourse /> }
        ]
      },
      { path: '/quiz/:id', element: <Quiz /> },
      { path: '/auth/:formType', element: <Auth /> },
      {
        path: 'User',
        element: (
          <RoleProtectedRoute allowedRoles={['student']}>
            <UserDash />
          </RoleProtectedRoute>
        ),
        children: [
          { index: true, element: <StdDash /> },
          {path: 'dash', element: <StdDash/>},
          { path: 'settings', element: <ProfileSettings /> },
          { path: 'usercourse', element: <Courses /> },
          { path: 'Teachers', element: <Teachers /> },
          { path: 'Message/:user_id', element: <ChatApp/>},
          {path: 'wishlist' , element:( <Wishlist/>)},
          { path: 'purchaseHistory', element: <PurchaseHistory/> },
          { path: 'TestResults', element: <TestResults/> },
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
      { index: true, element: <Dash /> },
      { path: 'dash', element: <Dash /> },
      { path: 'Settings', element: <AdminSettings /> },
      { path: 'Courses', element: <AdminCourse /> },
      { path: 'Create', element: <CreatCourse /> },
      { path: 'Payments', element: <Payments /> },
      { path: 'ChargeAccount', element: <ChargeAccount/> },
      { path: 'instructorlist', element: <InstructorList /> },
      { path: 'Students', element: <Students /> },
      { path: 'detail/:id', element: <AdminEditeCourse /> },
      { path: 'log', element: <Log /> },
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
      { path: 'Message/:user_id', element: <ChatApp /> },
      { path: 'MyCourses', element: <MyCourse /> },
      { path: 'detail/:id', element: <EditeCourse /> },
    ],
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<Spinner />}>
            <RouterProvider router={routes} />
          </Suspense>
        </QueryClientProvider>
      </Provider>
    </ErrorBoundary>
  </StrictMode>
);






