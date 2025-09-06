import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import GuestLayout from './components/Layout/GuestLayout/GuestLayout';
import MainLayout from './components/Layout/MainLayout/MainLayout';
import MyAssetsPage from './pages/Assets/MyAssetsPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import {
  ActiveBlockProvider,
  ActiveTableCellProvider,
  BlocksContentProvider,
} from './pages/Document/DocumentContextProviders';
import DocumentPage from './pages/Document/DocumentPage';
import { HomePage } from './pages/Home.page';
import LoginPage from './pages/Login/LoginPage';
import NotFoundPage from './pages/NotFound/NotFoundPage';
import ProfilePage from './pages/Profile/ProfilePage';
import RegisterPage from './pages/Register/RegisterPage';
import SessionExpiredPage from './pages/SessionExpired/SessionExpiredPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <GuestLayout content={<HomePage />} />,
  },
  {
    path: '/document/:id',
    element: (
      <BlocksContentProvider>
        <ActiveBlockProvider>
          <ActiveTableCellProvider>
            <DocumentPage />
          </ActiveTableCellProvider>
        </ActiveBlockProvider>
      </BlocksContentProvider>
    ),
  },
  {
    path: '/dashboard',
    element: <MainLayout content={<DashboardPage />} />,
  },
  {
    path: '/profile',
    element: <MainLayout content={<ProfilePage />} />,
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
    path: '*',
    element: <GuestLayout content={<NotFoundPage />} />,
  },
]);

export function Router() {
  console.log();
  return <RouterProvider router={router} />;
}
