import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';

const HomePage = lazy(() => import('@/features/home/presentation/pages/HomePage'));
const LoginPage = lazy(() => import('@/features/login/presentation/pages/LoginPage').then(module => ({ default: module.LoginPage })));

export const appRouter = createBrowserRouter([
  { 
    path: '/',
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: '/home',
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <div>404</div>,
  },
]);