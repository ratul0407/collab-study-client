import { IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import useAuth from "../../hooks/useAuth";
function Navbar() {
  const { user, logOut } = useAuth();
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <Link to="/">
          <img className="w-20" src={logo} alt="Company Logo" />
        </Link>
      </div>
      <div className="navbar-center">
        <h3 className="rounded-lg bg-blue-700 p-2.5 text-xl font-bold text-white md:text-2xl lg:text-3xl">
          Study House
        </h3>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="avatar btn btn-circle btn-ghost"
          >
            <div className="rounded-full">
              <IoMenu size={20} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
          >
            {user ? (
              <>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <button onClick={logOut}>Log Out</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/sign-up">Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
