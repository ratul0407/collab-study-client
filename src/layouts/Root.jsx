import Navbar from "../components/shared/Navbar";
import Footer from "../components/Home/Footer";

import { Outlet } from "react-router-dom";

function Root() {
  return (
    <div className="bg-base-100 font-montserrat font-normal">
      <header className="sticky top-0 z-50 mx-auto w-11/12 bg-white py-2 md:py-4">
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
