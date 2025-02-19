import Navbar from "../components/shared/Navbar";
import Footer from "../components/Home/Footer";

import { Outlet } from "react-router-dom";
import useTheme from "../hooks/useTheme";
function Root() {
  const { theme, setTheme } = useTheme();
  console.log(theme);
  return (
    <div className="bg-base-100 font-montserrat font-normal">
      <header
        className={`sticky top-0 z-50 w-full py-2 md:py-4 ${theme === "black" ? "bg-black" : "bg-white"}`}
      >
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Root;
