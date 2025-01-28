import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

import axios from "axios";

function useRole() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: role, isLoading } = useQuery({
    queryKey: ["role", user?.email],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/users/role/${user?.email}`,
      );
      return data?.role;
    },
  });
  return { role, isLoading };
}

export default useRole;
