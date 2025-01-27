import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SessionCard from "../../../components/dashboard/tutor/SessionCard";

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
      <div>
        {sessions?.map((session) => {
          return (
            <div className="card w-96 bg-base-100 shadow-xl">
              <figure>
                <img src={session.img} alt="Shoes" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Shoes!</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
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
