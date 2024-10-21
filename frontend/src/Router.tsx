import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DocumentPage from './pages/DocumentPage';
import { HomePage } from './pages/Home.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/document',
    element: <DocumentPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
