import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css';
import './utils/i18n.ts'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './layout/Layout.tsx';
import Home from './pages/Home/Home.tsx';

import Auth from './pages/Auth/Auth.tsx';
import Profiles from './pages/Profiles/Profiles.tsx';
import UserDash from './pages/UserDash/UserDash.tsx';
import CoursesPage from './pages/CoursesPage/CoursesPage.tsx';
import OneCourse from './pages/OneCourse/OneCourse.tsx';
import ProtectedRoute from './hooks/ProtectedRoute.tsx';
import PaymentPage from './pages/PaymentPage/PaymentPage.tsx';
import WatchCourse from './pages/WatchCourse/WatchCourse.tsx';
import InstructorPage from './pages/InstructorPage/InstructorPage.tsx';
import About from './pages/About/About.tsx';


const routes = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout/>,
      children :
      [
        {
          path: '/',
          element: <Home/>
        },
        {
          path: '/about',
          element : <About/>
        },
        {
          path: '/courses',
          element:<CoursesPage/>
        },
        {
          path: '/oneCourse/:courseId',
          element:<OneCourse/>
        },
        {
          path: '/payment/:courseId',
          element:(
           
              <PaymentPage/>
         
             )
        },
        {
          path: '/watch/:courseId',
          element:(
            <ProtectedRoute>
              <WatchCourse/>
            </ProtectedRoute>
             )
        },
        {
          path: '/auth/:formType',
          element: <Auth/>,
        },
        {
          path: 'User',
          element:
          (
              <ProtectedRoute>
                <UserDash/>
              </ProtectedRoute>
          ),
          children : 
          [
            {
              path: 'profile',
              element: <Profiles/>,
            },
          ]
        },
        {
          path: '/Instructor',
          element: <InstructorPage/>
        },
        
        {
          path : '*',
          element: <Home/>
        }
      ],
    },
  ],
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <RouterProvider router={routes}/>
  </StrictMode>,
)
