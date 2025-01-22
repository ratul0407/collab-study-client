import { MdMenu } from "react-icons/md";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
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
        <ul className="menu min-h-full w-80 bg-base-200 p-4 text-base-content">
          {/* Sidebar content here */}
          <li>
            <Link to="/dashboard/create-study-session">
              Create study session
            </Link>
          </li>
          <li>
            <Link>Your sessions</Link>
          </li>
          <li>
            <Link>Upload material</Link>
          </li>
          <li>
            <Link>View all material</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
