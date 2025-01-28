import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

import SessionRow from "../../../components/dashboard/admin/SessionRow";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

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
  const approved = sessions?.Approved;
  const pending = sessions?.Pending;
  const rejected = sessions?.Rejected;

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axiosSecure.delete(`/session/${id}`);

        if (data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "Session has been deleted",
            icon: "success",
          });
          refetch();
        }
      }
    });
  };
  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="space-y-10">
      <h3 className="dashboard-title">All the study sessions</h3>
      {/* pending sessions */}

      <div className="pb-10">
        <h3 className="text-xl font-bold text-yellow-500">Pending sessions</h3>
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
              {pending?.map((session, index) => {
                return (
                  <SessionRow
                    key={session._id}
                    session={session}
                    refetch={refetch}
                    status="Pending"
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* approved sessions */}
      <div className="pb-10">
        <h3 className="text-xl font-bold text-green-500">Approved sessions</h3>
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
              {approved?.map((session) => {
                return (
                  <SessionRow
                    key={session._id}
                    session={session}
                    refetch={refetch}
                    handleDelete={handleDelete}
                    status="Approved"
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* rejected sessions */}
      <div>
        <h3 className="text-xl font-bold text-red-500">Rejected sessions</h3>
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
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {rejected?.map((session) => {
                return (
                  <SessionRow
                    key={session._id}
                    session={session}
                    refetch={refetch}
                    status="Rejected"
                  />
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
