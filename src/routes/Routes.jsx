import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import SignUp from "../pages/authentication/SignUp";
import Login from "../pages/authentication/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import CreateStudySession from "../pages/dashboard/tutor/CreateStudySession";
import YourSessions from "../pages/dashboard/tutor/YourSessions";
import TutorRoute from "./TutorRoute";
import CreateNote from "../pages/dashboard/student/CreateNote";
import ManageNotes from "../pages/dashboard/student/ManageNotes";
import AllUsers from "../pages/dashboard/admin/AllUsers";
import AllSessions from "../pages/dashboard/admin/AllSessions";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
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
        element: (
          <PrivateRoute>
            <CreateStudySession />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/your-sessions",
        element: (
          <PrivateRoute>
            <TutorRoute>
              <YourSessions />
            </TutorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/create-note",
        element: (
          <PrivateRoute>
            <CreateNote />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/manage-notes",
        element: (
          <PrivateRoute>
            <ManageNotes />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/all-users",
        element: (
          <PrivateRoute>
            <AllUsers />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/all-study-sessions",
        element: <AllSessions />,
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
