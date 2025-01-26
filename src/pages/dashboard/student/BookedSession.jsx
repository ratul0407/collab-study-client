import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

function BookedSession() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ["sessions", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure("/booked-session");
      return data;
    },
  });
  console.log(sessions);
  return (
    <div>
      <h3 className="dashboard-title">Booked Session</h3>
    </div>
  );
}

export default BookedSession;
