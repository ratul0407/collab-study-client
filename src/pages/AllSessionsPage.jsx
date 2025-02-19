import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import HomePageSessionCard from "../components/Home/HomePageSessionCard";
import LoadingSpinner from "../components/shared/LoadingSpinner";

function AllSessionsPage() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: sessions = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["sessions", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure("/all-sessions");
      return data;
    },
  });
  if (isLoading) return <LoadingSpinner />;
  console.log(sessions);
  return (
    <div className="py-12">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {sessions?.map((session) => (
          <HomePageSessionCard key={session._id} session={session} />
        ))}
      </div>
    </div>
  );
}

export default AllSessionsPage;
