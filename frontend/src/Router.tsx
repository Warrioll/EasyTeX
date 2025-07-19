import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import GuestLayout from './components/Layout/GuestLayout/GuestLayout';
import MainLayout from './components/Layout/MainLayout/MainLayout';
import MyAssetsPage from './pages/Assets/MyAssetsPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import DocumentPage from './pages/Document/DocumentPage';
import { HomePage } from './pages/Home.page';
import LoginPage from './pages/Login/LoginPage';
import ProfilePage from './pages/Profile/ProfilePage';
import RegisterPage from './pages/Register/RegisterPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/document/:id',
    element: <DocumentPage />,
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
]);

export function Router() {
  return <RouterProvider router={router} />;
}
