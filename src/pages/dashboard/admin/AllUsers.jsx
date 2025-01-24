import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

function AllUsers() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure("/users");
      return data;
    },
  });
  console.log(users);
  return (
    <div>
      <h3 className="dashboard-title">All Users</h3>
    </div>
  );
}

export default AllUsers;
