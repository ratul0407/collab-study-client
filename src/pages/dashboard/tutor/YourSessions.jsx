import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SessionCard from "../../../components/dashboard/tutor/SessionCard";
import toast from "react-hot-toast";

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

  const handleRequest = async (id) => {
    try {
      await axiosSecure.patch(`/session/${id}`, { status: "Pending" });
      toast.success(
        "Request sent successfully. Please wait for admins approval",
      );
    } catch (err) {
      toast.error("Something went wrong please try again later!");
    } finally {
      refetch();
    }
  };

  return (
    <div>
      <h3 className="dashboard-title">Your sessions</h3>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {sessions.map((session) => {
          return (
            <SessionCard
              key={session._id}
              session={session}
              handleRequest={handleRequest}
            />
          );
        })}
      </div>
    </div>
  );
}

export default YourSessions;
