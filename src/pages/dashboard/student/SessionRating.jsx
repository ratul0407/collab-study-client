import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";

function SessionRating() {
  const navigate = useNavigate("");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { data: session = [], isLoading } = useQuery({
    queryKey: ["session-rating", user?.email, id],
    queryFn: async () => {
      const { data } = await axiosSecure(`/session/${id}`);
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const review = form.review.value;

    try {
      await axiosSecure.post(`/reviews`, {
        review,
        rating,
        reviewer: user?.email,
        session: session._id,
      });
      toast.success("Thanks for your feedback and review");
      navigate("/dashboard/booked-session");
    } catch (err) {
      toast.error("something went wrong please try again later!");
    }
  };
  return (
    <div className="card rounded-2xl bg-base-100 p-4 shadow-xl lg:flex lg:items-center">
      <figure className="w-full lg:w-1/3">
        <img
          src={session.img}
          alt={session.title}
          className="h-48 w-full rounded-xl object-cover"
        />
      </figure>
      <div className="card-body lg:w-2/3">
        <h2 className="card-title text-xl font-bold">{session.title}</h2>
        <p className="mb-2 text-sm text-gray-600">{session.description}</p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <p>
            <span className="font-bold">Tutor:</span> {session.tutor_name} (
            {session.tutor_email})
          </p>
          <p>
            <span className="font-bold">Fee:</span> ${session.fee}
          </p>
          <p>
            <span className="font-bold">Class Hours:</span> {session.hours} hrs
          </p>
          <p>
            <span className="font-bold">Duration:</span> {session.mins}{" "}
            mins/session
          </p>
          <p>
            <span className="font-bold">Registration:</span> {session.reg_start}{" "}
            to {session.reg_end}
          </p>
          <p>
            <span className="font-bold">Class Time:</span> {session.class_start}{" "}
            - {session.class_end}
          </p>
          <p>
            <span className="font-bold">Status:</span>{" "}
            <span className="text-green-500">{session.status}</span>
          </p>
          <p>
            <span className="font-bold">Rating:</span> {session.rating}
          </p>
        </div>
        <div className="py-10">
          <h3 className="text-center text-xl font-bold">
            Please Provide your rating and review
          </h3>
          <form
            onSubmit={handleSubmit}
            className="grid rounded-lg border p-5 shadow-xl"
          >
            <div className="form-control">
              <label htmlFor="email" className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                className="input input-bordered w-full"
                value={user?.email}
                readOnly
                id="email"
                name="email"
                type="email"
              />
            </div>
            <div className="form-control">
              <label htmlFor="name" className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                value={user?.displayName}
                type="text"
                id="name"
                name="name"
                className="input input-bordered w-full"
                readOnly
              />
            </div>
            <div className="form-control">
              <label htmlFor="review" className="label">
                <span className="label-text">Review</span>
              </label>
              <textarea
                id="review"
                name="review"
                className="textarea textarea-bordered w-full"
                placeholder="Write a review"
                required
              ></textarea>
            </div>
            <div className="form-control">
              <label htmlFor="rating" className="label">
                <span className="label-text">Rating</span>
              </label>
              <input
                placeholder="Rate"
                min={1}
                max={5}
                type="number"
                required
                name="rating"
                className="input input-bordered w-full"
              />
            </div>
            <button className="form-btn btn" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SessionRating;
