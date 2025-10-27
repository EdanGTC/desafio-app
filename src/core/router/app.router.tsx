import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';
import { RouterErrorPage } from "./RouterErrorPage";

const HomePage = lazy(() => import('@/features/home/presentation/pages/HomePage'));
const LoginPage = lazy(() => import('@/features/login/presentation/pages/LoginPage'));

export const appRouter = createBrowserRouter([
  { 
    path: '/',
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
    errorElement: <RouterErrorPage />, 
  },
  {
    path: '/home',
    element: (
      <ProtectedRoute>  
        <HomePage />
      </ProtectedRoute>
    ),
    errorElement: <RouterErrorPage />,
  },
  {
    path: '*',
    element: <div>404</div>,
    errorElement: <RouterErrorPage />,
  },
]);