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
import WatchCourse from './pages/WatchCourse/WatchCourse.tsx';
import InstructorPage from './pages/InstructorPage/InstructorPage.tsx';
import ProfileSettings from './components/ProfileSettings/ProfileSettings.tsx';
import Courses from './components/UserCourse/Courses.tsx';
import Admin from './Admin/Admin.tsx';
import TeacherForm from './pages/TeacherForm/TeacherForm.tsx';
import DashLayout from './layout/DashLayout.tsx';
import InstractorDash from './Dashboard/InstractorDash.tsx';
import InstractSettings from './Dashboard/InstractSettings.tsx';
import CreatCourse from './Dashboard/CreatCourse.tsx';
import Earning from './Dashboard/Earning.tsx';
import IstractCourses from './Dashboard/IstractCourses.tsx';
import CourseDetail from './Dashboard/CourseDetail.tsx';
import MyCourse from './Dashboard/MyCourse.tsx';
import AdminCourse from './Admin/AdminCourse.tsx';
import InstructorList from './Admin/InstructorList.tsx';
import Students from './Admin/Students.tsx';
import Payments from './Admin/Payments.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from './redux/store/index.ts';
import { Provider } from 'react-redux';
import RoleProtectedRoute from './hooks/RoleProtectedRoute.tsx';
import AdminSettings from './Admin/AdminSettings.tsx';
const routes = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '',
          element: <Home />,
        },
        {
          path: '/courses',
          element: <CoursesPage />,
        },
        {
          path: '/oneCourse/:id',
          element: <OneCourse />,
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
          path: 'User',
          element: (
            <RoleProtectedRoute allowedRoles={['student']}>
              <UserDash />
            </RoleProtectedRoute>
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
          path: '/InstructorForm',
          element : <TeacherForm/>
        },
        {
          path: '*',
          element: <Home />,
        },
      ],
    },
    {
      path : '/Admin',
      
      element : 
      (<RoleProtectedRoute allowedRoles={['admin']}>
        <Admin/>
      </RoleProtectedRoute>),
      children: [
        {
          index: true,
          element: <InstractorDash/>,
        },
        {
          path : 'dash',
          element: <InstractorDash/>
        },
        {
          path : 'Settings',
          element: <AdminSettings/>
        },
        {
          path : 'Create',
          element: <AdminCourse/>
        },
        {
          path : 'Payments',
          element: <Payments/>
        },
        {
          path : 'instructorlist',
          element: <InstructorList/>,
        },
        {
          path : 'Students',
          element: <Students/>,
        },
      ]
    },
    {
      path : '/instruct',
      element :
      (   
      <RoleProtectedRoute allowedRoles={['instructor']}>
        <DashLayout/>
      </RoleProtectedRoute>),
      children: [
        {
          path : 'dash',
          element: <InstractorDash/>
        },
        {
          path : 'Settings',
          element: <InstractSettings/>
        },
        {
          path : 'Create',
          element: <CreatCourse/>
        },
        {
          path : 'Earning',
          element: <Earning/>
        },
        {
          path : 'MyCourses',
          element: <IstractCourses/>,
          children :[
            {
              path:'',
              element: <MyCourse/>
            },
            {
              path: 'detail/:id',
              element : <CourseDetail/>
            }
          ] 
        },
      ]
    }
  ]
);
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
