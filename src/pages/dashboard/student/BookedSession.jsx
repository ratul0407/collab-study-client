import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SessionCard from "../../../components/dashboard/tutor/SessionCard";
import { Link } from "react-router-dom";

function BookedSession() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ["sessions", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/booked-session/${user?.email}`);
      return data;
    },
  });
  console.log(sessions);
  return (
    <div>
      <h3 className="dashboard-title">Booked Session</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {sessions?.map((session) => {
          return (
            <div key={session._id} className="card w-96 bg-base-100 shadow-xl">
              <figure>
                <img src={session.img} alt="Shoes" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{session.title}</h2>
                <p>{session.description}</p>

                <div className="card-actions justify-end">
                  <Link
                    to={`/dashboard/session-rating/${session.sessionId}`}
                    className="form-btn btn"
                  >
                    view details
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BookedSession;
