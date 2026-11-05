import { createBrowserRouter } from "react-router";
import MainLayout from "./layout/MainLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CardHistory from "./pages/CardHistory";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/dashboard",
        element: <UserDashboard />,
      },
      {
        path: "/admin",
        element: <AdminDashboard />,
      },
      {
        path: "/history",
        element: <CardHistory />,
      },
    ],
  },
]);

export default router;
