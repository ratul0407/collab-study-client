import { IoBookSharp, IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";
import avatarImg from "../../assets/placeholder.jpg";
import useAuth from "../../hooks/useAuth";
import { FaUser } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import useRole from "../../hooks/useRole";
function Navbar() {
  const { user, logOut } = useAuth();
  const { role } = useRole();
  return (
    <div className="navbar">
      <div className="navbar-start space-x-4">
        <Link to="/">
          {/* <img className="w-20" src={logo} alt="Company Logo" />
           */}
          <div className="flex flex-col items-center">
            <IoBookSharp size={40} />
            <span className="font-cursive text-3xl">Study House</span>
          </div>
        </Link>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end rounded-full border">
          <div
            tabIndex={0}
            role="button"
            className="flex cursor-pointer flex-row items-center gap-3 rounded-full border-[1px] border-neutral-200 p-4 transition hover:shadow-md md:px-2 md:py-1"
          >
            <div className="flex w-full items-center justify-between gap-2">
              <AiOutlineMenu />
              <div className="hidden md:block">
                {/* Avatar */}
                <img
                  className="rounded-full"
                  referrerPolicy="no-referrer"
                  src={user && user.photoURL ? user.photoURL : avatarImg}
                  alt="profile"
                  height="30"
                  width="30"
                />
              </div>
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
