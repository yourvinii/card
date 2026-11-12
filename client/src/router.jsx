import { createBrowserRouter } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CardHistory from "./pages/CardHistory";

import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },

    // USER ROUTES
    {
        element: <ProtectedRoute allowedRoles={["user"]} />,
        children: [
            {
                path: "/dashboard",
                element: <UserDashboard />
            },
            {
                path: "/history",
                element: <CardHistory />
            }
        ]
    },

    // ADMIN ROUTES
    {
        element: <ProtectedRoute allowedRoles={["admin"]} />,
        children: [
            {
                path: "/admin",
                element: <AdminDashboard />
            },
            {
                path: "/admin/history",
                element: <CardHistory />
            }
        ]
    }
]);

export default router;