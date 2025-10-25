import { createBrowserRouter } from "react-router";
import { LoginPage } from "@/features/login/presentation/pages/LoginPage";
import { HomePage } from "@/features/home/presentation/pages/HomePage";

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/home',
    element: <HomePage />,
  },
]);