import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SessionCard from "../../../components/dashboard/tutor/SessionCard";

function YourSessions() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: sessions = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["sessions", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/study-session/${user?.email}`);
      return data;
    },
  });

  console.log(sessions);
  return (
    <div>
      <h3 className="dashboard-title">Your sessions</h3>
      <div>
        {sessions.map((session) => {
          return <SessionCard key={session._id} session={session} />;
        })}
      </div>
    </div>
  );
}

export default YourSessions;
