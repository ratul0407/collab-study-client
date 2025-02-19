import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { isBefore, parse } from "date-fns";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import toast from "react-hot-toast";
import useRole from "../hooks/useRole";
import PaymentModal from "../components/modal/PaymentModal";
import axios from "axios";
import useTheme from "../hooks/useTheme";

function SessionDetails() {
  const { user } = useAuth();
  const { role } = useRole();
  const { id } = useParams();
  const { theme } = useTheme();
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

  console.log(reviews);
  return (
    <div className="space-y-8 pb-32">
      <div className="flex flex-col items-center gap-8 xl:container lg:flex-row xl:mx-auto xl:gap-16">
        <div className="lg:w-1/2">
          <figure className="flex justify-center">
            <img src={img} className="max-h-[400px] w-full object-cover" />
          </figure>
        </div>
        <div className="*:border-b-1 divide-y-2 *:pt-2 lg:w-1/2">
          <h3 className="text-3xl font-bold tracking-wider">{title}</h3>
          <p>{description}</p>
          <p className="font-bold">
            Created By: <span className="text-blue-500">{tutor_name}</span>
          </p>
          <p className="font-bold">
            Session Duration:{" "}
            <span className="text-blue-500">
              {hours}hrs and {mins}mins
            </span>
          </p>
          <div>
            <p className="font-bold">
              Registration:{" "}
              <span className="text-blue-500">
                {reg_start} to {reg_end}
              </span>
            </p>
          </div>
          <p className="font-bold">
            Class Starts: <span className="text-blue-500">{class_start}</span>
          </p>
          <p className="font-bold">
            Class Ends: <span className="text-blue-500">{class_end}</span>
          </p>
          <p>
            Reviews:{" "}
            <span className="text-blue-500">
              {rating === 0 ? "No reviews yet (0)" : rating}
            </span>
          </p>
          <p className="font-bold">
            Session Fee: <span className="text-blue-500">{fee}</span>
          </p>
          <div>
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
                  : !role
                    ? "Login to book"
                    : role !== "student"
                      ? "You Can't book"
                      : "Book now"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* reviews section */}

      <div className={`w-full bg-base-300 py-12`}>
        <h3 className="px-8 text-3xl font-bold">Reviews</h3>
        {!reviews.length && (
          <div className="flex h-full items-center justify-center">
            <p className="font-bold">No reviews yet</p>
          </div>
        )}
        {reviews?.map((review) => {
          return (
            <div key={review._id} className="rounded-lg border px-5 py-8">
              <p className="font-bold">Reviewer: {review.reviewer}</p>
              <p className="font-bold">Rating: {review.rating} stars</p>
              <p className="font-bold">Review: {review.review}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SessionDetails;
