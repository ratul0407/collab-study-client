import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import SignUp from "../pages/SignUp";

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
]);
export default router;
