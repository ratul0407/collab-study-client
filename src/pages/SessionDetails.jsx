import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { isBefore, parse } from "date-fns";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import toast from "react-hot-toast";
import useRole from "../hooks/useRole";
import PaymentModal from "../components/modal/PaymentModal";
import ReviewsModal from "../components/modal/ReviewsModal";
import axios from "axios";

function SessionDetails() {
  const { user } = useAuth();
  const { role } = useRole();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate("");
  const { data: session = [], isLoading } = useQuery({
    queryKey: ["session", id],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/session/${id}`,
      );
      return data;
    },
  });
  const { data: reviews = [], isLoading: reviewsLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/reviews?session=${_id}`,
      );
      return data;
    },
  });
  if (isLoading) return <LoadingSpinner />;
  const {
    title,
    _id,
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
    tutor_email,
  } = session || {};

  const regEndDate = parse(reg_end, "yyyy-dd-MM", new Date());
  const closed = isBefore(regEndDate, new Date());
  const handleBooking = async () => {
    try {
      const response = await axiosSecure.post("/booked-session", {
        student: user?.email,
        sessionId: _id,
        tutor: tutor_email,
      });
      if (response.status === 200) {
        toast.success("Booking Successful");
        navigate("/dashboard/booked-session");
      }
    } catch (err) {
      if (err?.response.status === 409) {
        toast.error(err?.response.data.message);
      } else {
        toast.error("Something went wrong! Please try again later!");
      }
    }
  };

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
          {rating > 0 ? (
            <ReviewsModal reviews={reviews} rating={rating} />
          ) : (
            <p className="font-bold">reviews: {rating}</p>
          )}

          <p className="font-bold">
            Session Duration: {hours}hrs and {mins}mins
          </p>
          <p className="font-bold">Teacher: {tutor_name}</p>
          <p className="w-fit rounded-lg bg-blue-500 p-2 font-bold text-white">
            Fee: ${fee}
          </p>

          <div className="card-actions justify-end">
            {fee > 0 && role === "student" ? (
              <PaymentModal tutorEmail={tutor_email} id={_id} fee={fee} />
            ) : (
              <button
                onClick={handleBooking}
                disabled={closed || role !== "student"}
                className="form-btn btn"
              >
                {closed
                  ? "Registration Closed"
                  : role !== "student"
                    ? "You Can't book"
                    : "Book now"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SessionDetails;
