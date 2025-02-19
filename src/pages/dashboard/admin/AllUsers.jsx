import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import UpdateUserRole from "../../../components/modal/UpdateUserRole";

function AllUsers() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    const getCount = async () => {
      const { data } = await axiosSecure("/usersCount");
      setCount(data.count);
    };
    getCount();
  }, []);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const numberOfPages = Math.ceil(count / itemsPerPage) || 0;

  const pages = [...Array(numberOfPages).keys()];

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", user?.email, currentPage, itemsPerPage, search],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/users/${user?.email}?page=${currentPage}&limit=${itemsPerPage}&search=${search}`,
      );
      return data;
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(searchText);
  };
  if (isLoading) return <LoadingSpinner />;
  console.log(users);
  return (
    <div className="space-y-4">
      <h3 className="dashboard-title">All Users</h3>

      <div className="mx-8 flex justify-end">
        <form onSubmit={handleSubmit} className="flex-reverse flex gap-4">
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            placeholder="search user"
            className="input input-bordered w-64"
          />
          <button type="submit" className="btn">
            <FaSearch />
          </button>
        </form>
      </div>
      <div className="min-h-[50vh] overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Update Role</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users?.map((item) => {
              return (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>
                    <UpdateUserRole
                      defaultValue={item.role}
                      id={item._id}
                      refetch={refetch}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {!search && (
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
      )}
    </div>
  );
}

export default AllUsers;
