import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Banner from "../components/Home/Banner";
import Footer from "../components/Home/Footer";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import SessionCard from "../components/dashboard/tutor/SessionCard";

function Root() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: sessions = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["sessions", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure("/sessions-home");
      return data;
    },
  });
  console.log(sessions);
  return (
    <div className="font-montserrat font-normal">
      <div className="mx-auto w-11/12 py-2 md:py-4">
        <Navbar />
      </div>
      <div className="w-full">
        <Banner />
      </div>
      {/* session cards */}
      <section className="space-y-4 py-20">
        <h3 className="text-center text-3xl font-bold">Popular Sessions🔥</h3>
        <div className="grid grid-cols-1 items-center gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {sessions?.map((session) => {
            return <SessionCard session={session} key={session._id} />;
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Root;
