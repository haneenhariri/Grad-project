import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './utils/i18n.ts';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './layout/Layout.tsx';
import Home from './pages/Home/Home.tsx';
import Auth from './pages/Auth/Auth.tsx';
import UserDash from './pages/UserDash/UserDash.tsx';
import CoursesPage from './pages/CoursesPage/CoursesPage.tsx';
import OneCourse from './pages/OneCourse/OneCourse.tsx';
import ProtectedRoute from './hooks/ProtectedRoute.tsx';
import PaymentPage from './pages/PaymentPage/PaymentPage.tsx';
import WatchCourse from './pages/WatchCourse/WatchCourse.tsx';
import InstructorPage from './pages/InstructorPage/InstructorPage.tsx';
import About from './pages/About/About.tsx';
import ProfileSettings from './components/ProfileSettings/ProfileSettings.tsx';
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPasswordPage.tsx';
import DashboardUser from './components/DashboardUser/DashboardUser.tsx';
import Courses from './components/UserCourse/Courses.tsx';
import { Elements } from '@stripe/react-stripe-js';
import stripePromise from './utils/stripe'; 

const routes = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/about',
          element: <About />,
        },
        {
          path: '/courses',
          element: <CoursesPage />,
        },
        {
          path: '/oneCourse/:courseId',
          element: <OneCourse />,
        },
        {
          path: '/payment/:courseId',
          element: (
            <Elements stripe={stripePromise}>
              <PaymentPage />
            </Elements>
          ),
        },
        {
          path: '/watch/:courseId',
          element: <WatchCourse />,
        },
        {
          path: '/auth/:formType',
          element: <Auth />,
        },
        {
          path: 'ResetPassword',
          element: <ResetPasswordPage />,
        },
        {
          path: 'User',
          element: (
            <ProtectedRoute>
              <UserDash />
            </ProtectedRoute>
          ),
          children: [
            {
              index: true,
              element: <ProfileSettings />,
            },
            {
              path: 'settings',
              element: <ProfileSettings />,
            },
            {
              path: 'dashboard',
              element: <DashboardUser />,
            },
            {
              path: 'usercourse',
              element: <Courses />,
            },
          ],
        },
        {
          path: '/Instructor',
          element: <InstructorPage />,
        },
        {
          path: '*',
          element: <Home />,
        },
      ],
    },
  ]
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>
);
