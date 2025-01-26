import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Banner from "../components/Home/Banner";
import Footer from "../components/Home/Footer";

function Root() {
  return (
    <div className="font-montserrat font-normal">
      <div className="mx-auto w-11/12 py-2 md:py-4">
        <Navbar />
      </div>
      <div className="w-full">
        <Banner />
      </div>
      <div>{/* session cards */}</div>

      <Footer />
    </div>
  );
}

export default Root;
