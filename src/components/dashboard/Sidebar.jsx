import { MdMenu } from "react-icons/md";
import TutorMenu from "./menu/TutorMenu";
import StudentMenu from "./menu/StudentMenu";
import useRole from "../../hooks/useRole";
import AdminMenu from "./menu/AdminMenu";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../shared/LoadingSpinner";

function Sidebar() {
  const { logOut } = useAuth();
  const { role, isLoading } = useRole();
  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="bg:sidebar_bg drawer sticky top-0 lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer-2" className="btn drawer-button lg:hidden">
          <MdMenu />
        </label>
      </div>
      <div className="bg:sidebar_bg drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu min-h-full w-80 bg-base-200 p-4 text-lg font-semibold text-base-content">
          {/* Sidebar content here */}

          {/* for the student */}
          {role === "student" && <StudentMenu />}

          {/* for tutor */}
          {role === "tutor" && <TutorMenu />}

          {/* for admin */}
          {role === "admin" && <AdminMenu />}
          <div className="border-border_clr divider border-b"></div>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dashboard/user-profile">Profile</Link>
          </li>
          <li>
            <button onClick={logOut}>Log out</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
