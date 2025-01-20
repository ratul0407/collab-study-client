import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [],
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
