import { NavLink } from "react-router-dom";

function TutorMenu() {
  return (
    <>
      <li>
        <NavLink to="/dashboard/create-study-session">
          Create study session
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/your-sessions">Your sessions</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/upload-material">Upload material</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/view-materials-tutor">
          View all materials
        </NavLink>
      </li>
    </>
  );
}

export default TutorMenu;
