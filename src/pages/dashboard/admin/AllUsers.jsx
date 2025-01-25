import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";

function AllUsers() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  useEffect(() => {
    const getCount = async () => {
      const { data } = await axiosSecure("/usersCount");
      setCount(data.count);
    };
    getCount();
  }, []);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 2;
  const numberOfPages = Math.ceil(count / itemsPerPage) || 0;
  // console.log(numberOfPages);
  const pages = [...Array(numberOfPages).keys()];
  console.log(currentPage);

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", user?.email, currentPage, itemsPerPage],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/users/${user?.email}?page=${currentPage}&limit=${itemsPerPage}`,
      );
      return data;
    },
  });

  console.log(users);
  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="space-y-4">
      <h3 className="dashboard-title">All Users</h3>

      <div className="mx-8 flex justify-end">
        <form className="flex-reverse flex gap-4">
          <input
            type="text"
            placeholder="search user"
            className="input input-bordered w-64"
          />
          <button type="submit" className="btn">
            <FaSearch />
          </button>
        </form>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Role</th>
              <th>Update Role</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users?.map((item, index) => {
              return (
                <tr key={item._id}>
                  <td>{++index}</td>
                  <td>{item.name}</td>
                  <td>{item.role}</td>
                  <td>
                    <button className="btn btn-ghost">update</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="space-x-3 text-center">
          <button
            onClick={() => {
              if (currentPage > 0) {
                setCurrentPage(currentPage - 1);
              }
            }}
            className="btn rounded-full"
          >
            Prev
          </button>
          {pages.map((page) => {
            return (
              <button
                onClick={() => {
                  setCurrentPage(page);
                }}
                className={`btn rounded-full ${currentPage === page && "bg-blue-500 text-white hover:bg-blue-400"}`}
                key={page}
              >
                {page}
              </button>
            );
          })}
          <button
            onClick={() => {
              if (currentPage < pages.length - 1) {
                setCurrentPage(currentPage + 1);
              }
            }}
            className="btn rounded-full"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default AllUsers;
