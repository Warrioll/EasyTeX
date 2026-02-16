import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import GuestLayout from './components/Layout/GuestLayout/GuestLayout';
import MainLayout from './components/Layout/MainLayout/MainLayout';
import AccountDeletedPage from './pages/AccountDeleted/AccountDeletedPage';
import MyAssetsPage from './pages/Assets/MyAssetsPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import { BlocksContentProvider, ZoomsProvider } from './pages/Document/DocumentContextProviders';
import DocumentPage from './pages/Document/DocumentPage';
import Homepage from './pages/Homepage/Homepage';
import LoginPage from './pages/Login/LoginPage';
import NotFoundPage from './pages/NotFound/NotFoundPage';
import ProfilePage from './pages/Profile/ProfilePage';
import RegisterPage from './pages/Register/RegisterPage';
import SessionExpiredPage from './pages/SessionExpired/SessionExpiredPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <GuestLayout content={<Homepage />} />,
  },
  {
    path: '/document/:id',
    element: (
      <BlocksContentProvider>
        <ZoomsProvider>
          <DocumentPage />
        </ZoomsProvider>
      </BlocksContentProvider>
    ),
  },
  {
    path: '/dashboard',
    element: <MainLayout content={<DashboardPage />} />,
  },
  {
    path: '/profile',
    element: <MainLayout whiteBackground content={<ProfilePage />} />,
  },
  {
    path: '/assetsLibrary',
    element: <MainLayout content={<MyAssetsPage />} />,
  },
  {
    path: '/login',
    element: <GuestLayout content={<LoginPage />} />,
  },
  {
    path: '/register',
    element: <GuestLayout content={<RegisterPage />} />,
  },
  {
    path: '/sessionExpired',
    element: (
      <GuestLayout
        content={localStorage.getItem('401') ? <SessionExpiredPage /> : <NotFoundPage />}
      />
    ),
  },
  {
    path: '/accountDeleted',
    element: (
      <GuestLayout
        content={localStorage.getItem('accountDeleted') ? <AccountDeletedPage /> : <NotFoundPage />}
      />
    ),
  },
  {
    path: '*',
    element: <GuestLayout content={<NotFoundPage />} />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
