import { NavLink } from "react-router-dom";

function AdminMenu() {
  return (
    <>
      <li>
        <NavLink to="/dashboard/all-users">View All Users</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/all-study-sessions">
          View All Study Sessions
        </NavLink>
      </li>

      <li>
        <NavLink to="/dashboard/view-all-materials">View all materials</NavLink>
      </li>
    </>
  );
}

export default AdminMenu;
