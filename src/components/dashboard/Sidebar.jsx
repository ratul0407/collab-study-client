import { MdMenu } from "react-icons/md";
import TutorMenu from "./menu/TutorMenu";
import StudentMenu from "./menu/StudentMenu";
import useRole from "../../hooks/useRole";

function Sidebar() {
  const { role } = useRole();
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer-2" className="btn drawer-button lg:hidden">
          <MdMenu />
        </label>
      </div>
      <div className="drawer-side">
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
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
