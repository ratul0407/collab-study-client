import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import SignUp from "../pages/authentication/SignUp";
import Login from "../pages/authentication/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import CreateStudySession from "../pages/dashboard/tutor/CreateStudySession";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [{}],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/create-study-session",
        element: <CreateStudySession />,
      },
    ],
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
export default router;
