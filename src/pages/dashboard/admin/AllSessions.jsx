import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

import SessionRow from "../../../components/dashboard/admin/SessionRow";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";

function AllSessions() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: sessions = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["sessions", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure("/sessions");
      return data;
    },
  });
  console.log(sessions);
  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="space-y-10">
      <h3 className="dashboard-title">All the study sessions</h3>
      {/* pending sessions */}

      <div className="pb-20">
        <h3 className="text-xl font-bold text-blue-500">Pending sessions</h3>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Image</th>
                <th>Tutor Email</th>
                <th>Tutor Name</th>
                <th>Session Title</th>
                <th>Status</th>
                <th>Fee</th>
                <th>Update Status</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {sessions.map((session, index) => {
                return (
                  session.status === "Pending" && (
                    <SessionRow
                      key={session._id}
                      session={session}
                      refetch={refetch}
                    />
                  )
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* approved sessions */}
      <div>
        <h3 className="text-xl font-bold text-blue-500">Approved sessions</h3>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Image</th>
                <th>Tutor Email</th>
                <th>Tutor Name</th>
                <th>Session Title</th>
                <th>Status</th>
                <th>Fee</th>
                <th>Update Status</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {sessions.map((session) => {
                return (
                  session.status === "Approved" && (
                    <SessionRow key={session._id} session={session} />
                  )
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AllSessions;
