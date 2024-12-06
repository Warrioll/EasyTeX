import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import DashboardPage from './pages/DashboardPage';
import DocumentPage from './pages/Document/DocumentPage';
import { HomePage } from './pages/Home.page';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/document',
    element: <DocumentPage />,
  },
  {
    path: '/dashboard',
    element: <MainLayout content={<DashboardPage />} />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
