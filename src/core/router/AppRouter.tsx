import { RouterProvider } from "react-router";
import { appRouter } from "./app.router";

export const AppRouter = () => {
    return <RouterProvider router={appRouter} />;
};