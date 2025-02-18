import { IoBookSharp, IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";
import avatarImg from "../../assets/placeholder.jpg";
import useAuth from "../../hooks/useAuth";
import { AiOutlineMenu } from "react-icons/ai";
import useRole from "../../hooks/useRole";
import { GoMoon, GoSun } from "react-icons/go";
import { BiBlock } from "react-icons/bi";
import { useEffect, useState } from "react";
function Navbar() {
  const isSystemDark = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;
  const usePreferredTheme = isSystemDark ? "black" : "light";
  const [theme, setTheme] = useState(usePreferredTheme);
  console.log(theme);

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);
  const { user, logOut } = useAuth();
  const { role } = useRole();
  return (
    <div className="navbar bg-white shadow-xl md:py-3 lg:py-4 xl:py-6">
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
              <AiOutlineMenu className="" />
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
            className="dark:bg-card_bg menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
          >
            {user ? (
              <>
                <li>
                  <Link
                    to={`/dashboard/${role === "student" ? "create-note" : role === "tutor" ? "create-study-session" : "all-users"}`}
                  >
                    Dashboard
                  </Link>
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
            <li>
              <div className="flex items-center gap-4">
                <span>Theme</span>
                <div className="flex w-full justify-around gap-1 rounded-full border p-2">
                  <button
                    data-tip="light"
                    className="tooltip"
                    onClick={() => setTheme("light")}
                  >
                    <GoSun className="h-4 w-4" />
                  </button>
                  <button
                    className="tooltip"
                    data-tip="dark"
                    onClick={() => setTheme("black")}
                  >
                    <GoMoon className="h-4 w-4" />
                  </button>
                  <button
                    className="tooltip"
                    data-tip="system default"
                    onClick={() => setTheme(usePreferredTheme)}
                  >
                    <BiBlock className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
