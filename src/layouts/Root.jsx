import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";

function Root() {
  return (
    <div className="container mx-auto w-11/12 font-montserrat font-normal">
      <div className="py-2 md:py-4">
        <Navbar />
      </div>
      <div className="">
        <Outlet />
      </div>
    </div>
  );
}

export default Root;
