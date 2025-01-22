import { NavLink } from "react-router-dom";

function StudentMenu() {
  return (
    <>
      <li>
        <NavLink to="/dashboard/booked-session">Booked session</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/create-note">Create note</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/manage-notes">Manage notes</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/view-all-material">View all material</NavLink>
      </li>
    </>
  );
}

export default StudentMenu;
