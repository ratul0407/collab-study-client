import { useEffect, useState } from "react";
import Banner from "../components/Home/Banner";
import HomePageSessionCard from "../components/Home/HomePageSessionCard";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import WhyStudyHouse from "../components/Home/WhyStudyHouse";
import StudyHouseEmpowersYou from "../components/Home/StudyHouseEmpowersYou";

function Home() {
  const [tutorsCount, setTutorsCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const axiosSecure = useAxiosSecure();
  const [loadMore, setLoadMore] = useState(false);
  useEffect(() => {
    const getTeachersCount = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/tutors-count`,
      );

      return setTutorsCount(data.count);
    };
    getTeachersCount();
  }, []);
  const itemsPerPage = 4;
  const numberOfPages = Math.ceil(tutorsCount / itemsPerPage) || 0;

  const pages = [...Array(numberOfPages).keys()];

  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ["home-sessions", loadMore],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/sessions-home`,
      );

      return data;
    },
  });

  const { data: tutors = [] } = useQuery({
    queryKey: ["tutors", tutorsCount, itemsPerPage, currentPage],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/tutors?page=${currentPage}&limit=${itemsPerPage}`,
      );
      return data;
    },
  });

  console.log(sessions, tutors);
  if (isLoading) return <LoadingSpinner />;
  return (
    <div>
      <div className="w-full">
        <Banner />
      </div>
      {/* session cards */}
      <section className="space-y-4 py-20 2xl:container 2xl:mx-auto">
        <h3 className="text-center text-3xl font-bold">Popular Sessions🔥</h3>
        <div className="grid grid-cols-1 items-center justify-center gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {sessions?.map((session) => {
            return <HomePageSessionCard session={session} key={session._id} />;
          })}
        </div>
      </section>
      <section className="py-10 2xl:container 2xl:mx-auto">
        <WhyStudyHouse />
      </section>
      <section className="py-10 2xl:container 2xl:mx-auto">
        <StudyHouseEmpowersYou />
      </section>
      <section className="py-10 2xl:container 2xl:mx-auto">
        <h3 className="text-center text-3xl font-bold">Our Tutors</h3>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {tutors?.map((tutor, index) => {
                return (
                  <tr key={tutor._id}>
                    <td>{++index}</td>
                    <td className="max-w-fit">
                      <img
                        className="h-14 w-14 rounded-full object-cover"
                        src={tutor.photo}
                      />
                    </td>
                    <td>{tutor.name}</td>
                    <td>{tutor.email}</td>
                    <td>{tutor.role}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="space-x-3 pt-10 text-center">
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
      </section>
    </div>
  );
}

export default Home;
