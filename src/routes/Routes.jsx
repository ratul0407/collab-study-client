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
import SessionDetails from "../pages/SessionDetails";
import BookedSession from "../pages/dashboard/student/BookedSession";
import UploadMaterial from "../pages/dashboard/tutor/UploadMaterial";
import SessionRating from "../pages/dashboard/student/SessionRating";
import MaterialsTutor from "../pages/dashboard/tutor/MaterialsTutor";
import AdminRoute from "./AdminRoute";
import UpdateSession from "../pages/dashboard/admin/UpdateSession";
import MaterialsAdmin from "../pages/dashboard/admin/MaterialsAdmin";
import MaterialsStudent from "../pages/dashboard/student/MaterialsStudent";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import UserProfile from "../pages/dashboard/UserProfile";
import AllSessionsPage from "../pages/AllSessionsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/session/:id",
        element: <SessionDetails />,
      },
      {
        path: "/all-sessions",
        element: <AllSessionsPage />,
      },
    ],
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
        path: "/dashboard/upload-material",
        element: (
          <PrivateRoute>
            <TutorRoute>
              <UploadMaterial />
            </TutorRoute>
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
        path: "/dashboard/view-materials-tutor",
        element: (
          <PrivateRoute>
            <TutorRoute>
              <MaterialsTutor />
            </TutorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/booked-session",
        element: (
          <PrivateRoute>
            <BookedSession />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/materials-student",
        element: (
          <PrivateRoute>
            <MaterialsStudent />
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
        path: "/dashboard/session-rating/:id",
        element: (
          <PrivateRoute>
            <SessionRating />
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
            <AdminRoute>
              <AllUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/all-study-sessions",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllSessions />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/view-materials-admin",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <MaterialsAdmin />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/user-profile",
        element: (
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/update-session/:id",
    element: (
      <PrivateRoute>
        <AdminRoute>
          <UpdateSession />
        </AdminRoute>
      </PrivateRoute>
    ),
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
