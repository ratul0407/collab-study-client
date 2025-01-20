import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";

function Root() {
  return (
    <div className="container mx-auto font-montserrat font-normal lg:w-11/12">
      <div className="py-2 md:py-4 lg:py-8">
        <Navbar />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default Root;
