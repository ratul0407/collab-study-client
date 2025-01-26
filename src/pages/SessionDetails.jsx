import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { isBefore, parse } from "date-fns";
import LoadingSpinner from "../components/shared/LoadingSpinner";

function SessionDetails() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  console.log(id);
  const { data: session = [], isLoading } = useQuery({
    queryKey: ["session", id],
    queryFn: async () => {
      const { data } = await axiosSecure(`/session/${id}`);
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  const {
    title,
    img,
    description,
    reg_end,
    reg_start,
    fee,
    class_start,
    class_end,
    hours,
    mins,
    rating,
    tutor_name,
  } = session || {};
  const regEndDate = parse(reg_end, "yyyy-dd-MM", new Date());
  const closed = isBefore(regEndDate, new Date());

  const handleBooking = async () => {};
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="card max-w-[600px] bg-base-100 shadow-xl">
        <figure>
          <img src={img} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>{description}</p>
          <p className="font-bold">Registration Starts: {reg_start}</p>
          <p className="font-bold">Registration Ends: {reg_end}</p>
          <p className="font-bold">Class Starts: {class_start}</p>
          <p className="font-bold">Class Ends: {class_end}</p>
          <p className="font-bold">Rating: {rating}</p>
          <p className="font-bold">
            Session Duration: {hours}hrs and {mins}mins
          </p>
          <p className="font-bold">Teacher: {tutor_name}</p>
          <p className="w-fit rounded-lg bg-blue-500 p-2 font-bold text-white">
            Fee: ${fee}
          </p>

          <div className="card-actions justify-end">
            <button disabled={closed} className="form-btn btn">
              {closed ? "Registration Closed" : "Book now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SessionDetails;
