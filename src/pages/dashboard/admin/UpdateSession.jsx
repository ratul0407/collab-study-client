import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";

const img_hosting_key = import.meta.env.VITE_IMG_HOSTING_KEY;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;
function UpdateSession() {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate("");

  const {
    data: session = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["session", id],
    queryFn: async () => {
      const { data } = await axiosSecure(`/session/${id}`);
      return data;
    },
  });
  if (isLoading) return <LoadingSpinner />;

  const {
    tutor_email,
    tutor_name,
    description,
    reg_end,
    reg_start,
    class_start,
    class_end,
    title,
    hours,
    mins,
    fee,
    status,
  } = session || {};

  const onSubmit = async (data) => {
    try {
      if (data.img[0]) {
        //upload the img to imgbb
        const imgFile = { image: data.img[0] };
        const res = await axios.post(img_hosting_api, imgFile, {
          headers: { "content-type": "multipart/form-data" },
        });
        const response = await axiosSecure.patch(`/update-session/${id}`, {
          ...data,
          img: res?.data?.data?.display_url,
        });
        if (response?.data?.modifiedCount > 0) {
          toast.success("session updated successfully!");
          navigate("/dashboard/all-study-sessions");
        }
      } else {
        const response = await axiosSecure.patch(`/update-session/${id}`, {
          ...data,
          img: null,
        });
        if (response?.data?.modifiedCount > 0) {
          toast.success("session updated successfully!");
          navigate("/dashboard/all-study-sessions");
        }
      }
    } catch (err) {
      toast.error("Something went wrong! Please try again");
    } finally {
      refetch();
    }
  };

  return (
    <div>
      <div>
        <div className="mx-4 px-4 py-10 shadow-2xl sm:mx-6 lg:mx-auto lg:max-w-2xl lg:rounded-lg lg:px-4 lg:py-12">
          <h3 className="dashboard-title">Update Session</h3>

          <form className="lg:px-10" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid">
              {/* session title */}
              <div className="form-control">
                <label htmlFor="title" className="label">
                  <span className="label-text">Session Title</span>
                </label>
                <input
                  type="text"
                  {...register("title")}
                  className="input input-bordered w-full"
                  placeholder="session title"
                  defaultValue={title}
                  required
                />
              </div>
              {/* img */}
              <div className="form-control">
                <label htmlFor="img" className="label">
                  <span className="label-text">Image</span>
                </label>
                <input
                  type="file"
                  {...register("img")}
                  className="input input-bordered w-full pt-2"
                />
              </div>

              {/* tutor */}
              <div className="lg:flex lg:gap-4">
                {/* tutor email */}

                <div className="form-control lg:w-1/2">
                  <label htmlFor="tutor_email" className="label">
                    <span className="label-text">Tutor Email:</span>
                  </label>
                  <input
                    type="text"
                    {...register("tutor_email")}
                    className="input input-bordered w-full"
                    defaultValue={tutor_email}
                    id="tutor_email"
                    readOnly
                    required
                  />
                </div>

                {/* tutor name */}
                <div className="form-control lg:w-1/2">
                  <label htmlFor="tutor_name" className="label">
                    <span className="label-text">Tutor Name: </span>
                  </label>
                  <input
                    type="text"
                    id="tutor_name"
                    {...register("tutor_name")}
                    defaultValue={tutor_name}
                    readOnly
                    className="input input-bordered w-full"
                    required
                  />
                </div>
              </div>
              {/* description */}
              <label className="form-control">
                <div className="label">
                  <span className="label-text">Add description</span>
                </div>
                <textarea
                  {...register("description")}
                  className="textarea textarea-bordered h-24"
                  placeholder="description...."
                  required
                  defaultValue={description}
                ></textarea>
              </label>
              {/* registration */}
              <div className="lg:flex lg:gap-4">
                {/* registration start date */}

                <div className="form-control lg:w-1/2">
                  <label htmlFor="reg_start" className="label">
                    <span className="label-text">Registration Starts </span>
                  </label>
                  <input
                    type="date"
                    id="reg_start"
                    required
                    {...register("reg_start")}
                    defaultValue={reg_start}
                    className="input input-bordered w-full"
                  />
                </div>
                {/* registration end date */}
                <div className="form-control lg:w-1/2">
                  <label htmlFor="reg_end" className="label">
                    <span className="label-text">Registration Ends </span>
                  </label>
                  <input
                    type="date"
                    id="reg_end"
                    {...register("reg_end")}
                    required
                    defaultValue={reg_end}
                    className="input input-bordered w-full"
                  />
                </div>
              </div>
              {/* class start and end date */}
              <div className="lg:flex lg:gap-4">
                {/* class start date */}
                <div className="form-control lg:w-1/2">
                  <label htmlFor="class_start" className="label">
                    <span className="label-text">Class Starts </span>
                  </label>
                  <input
                    type="time"
                    id="class_start"
                    defaultValue={class_start}
                    required
                    {...register("class_start")}
                    className="input input-bordered w-full"
                  />
                </div>

                {/* class end date */}
                <div className="form-control lg:w-1/2">
                  <label htmlFor="class_end" className="label">
                    <span className="label-text">Class Ends</span>
                  </label>
                  <input
                    type="time"
                    defaultValue={class_end}
                    id="class_end"
                    required
                    {...register("class_end")}
                    className="input input-bordered w-full"
                  />
                </div>
              </div>
              {/* session duration */}
              <span>Session Duration</span>
              <div className="lg:flex lg:gap-4">
                <div className="form-control w-full lg:w-1/2">
                  <label htmlFor="hours" className="label">
                    Hours
                  </label>
                  <select
                    className="select select-bordered"
                    {...register("hours")}
                    id="hours"
                    required
                    defaultValue={hours}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </select>
                </div>
                {/* minutes */}
                <div className="form-control lg:w-1/2">
                  <label htmlFor="mins" className="label">
                    <span className="label-text">Minutes </span>
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={59}
                    required
                    id="mins"
                    defaultValue={mins}
                    {...register("mins")}
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              <div className="lg:flex lg:gap-4">
                {/* registration fee */}
                <div className="form-control lg:w-1/2">
                  <label htmlFor="fee" className="label">
                    <span className="label-text">Fee </span>
                  </label>
                  <input
                    type="number"
                    id="fee"
                    required
                    {...register("fee")}
                    defaultValue={fee}
                    className="input input-bordered w-full"
                  />
                </div>

                {/* session status */}
                <div className="form-control lg:w-1/2">
                  <label htmlFor="status" className="label">
                    <span className="label-text">Status </span>
                  </label>
                  <input
                    type="text"
                    id="status"
                    defaultValue={status}
                    readOnly
                    {...register("status")}
                    className="input input-bordered w-full"
                  />
                </div>
              </div>
              <button type="submit" className="form-btn">
                Create session
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default UpdateSession;
