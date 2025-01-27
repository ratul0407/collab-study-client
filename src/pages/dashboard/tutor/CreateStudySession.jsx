import { useForm } from "react-hook-form";
import InputField from "../../../components/form/InputField";
import useAuth from "../../../hooks/useAuth";
import { createContext } from "react";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const img_hosting_key = import.meta.env.VITE_IMG_HOSTING_KEY;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;
export const FormContext = createContext(null);
function CreateStudySession() {
  const navigate = useNavigate("");

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    //upload the img to imgbb
    const imgFile = { image: data.img[0] };
    const res = await axios.post(img_hosting_api, imgFile, {
      headers: { "content-type": "multipart/form-data" },
    });

    try {
      await axiosSecure.post(`${import.meta.env.VITE_API_URL}/add-session`, {
        ...data,
        img: res.data.data.display_url,
        fee: parseInt(data.fee),
        rating: 0,
      });
      toast.success("Session created successfully!");
      navigate("/dashboard/your-sessions");
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <FormContext.Provider value={{ register }}>
      <div className="mx-4 px-4 py-10 shadow-2xl sm:mx-6 lg:mx-auto lg:max-w-2xl lg:rounded-lg lg:px-4 lg:py-12">
        <h3 className="dashboard-title">Add a new Study Session</h3>

        <form className="lg:px-10" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid">
            <InputField
              label={"Session Title"}
              placeholder={"Session Title"}
              type={"text"}
              id={"session-title"}
              name={"title"}
              required={true}
            />
            <InputField
              type={"file"}
              placeholder={"Session Image"}
              id={"session-img"}
              label={"Session Image"}
              custom="pt-2"
              name="img"
              required={true}
            />
            {/* tutor */}
            <div className="lg:flex lg:gap-4">
              {/* tutor email */}
              <InputField
                label={"Tutor Email"}
                name="tutor_email"
                readOnly={true}
                defaultValue={user?.email}
                split={true}
                id="tutor_email"
              />

              {/* tutor name */}
              <InputField
                label={"Tutor Name"}
                readOnly={true}
                defaultValue={user?.displayName}
                name="tutor_name"
                split={true}
                type={"text"}
                id="tutor_name"
              />
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
              ></textarea>
            </label>
            {/* registration */}
            <div className="lg:flex lg:gap-4">
              {/* registration start date */}
              <InputField
                label={"Registration Start Date"}
                split={true}
                type={"date"}
                id={"reg-start"}
                name={"reg_start"}
                required={true}
              />

              {/* registration end date */}
              <InputField
                label={"Registration End Date"}
                split={true}
                type={"date"}
                id={"red-end"}
                name={"reg_end"}
                required={true}
              />
            </div>
            {/* class start and end date */}
            <div className="lg:flex lg:gap-4">
              {/* class start date */}
              <InputField
                label={"Class Start Date"}
                split={true}
                type="time"
                id={"class-start"}
                name="class_start"
                required={true}
              />

              {/* class end date */}
              <InputField
                label="Class End Date"
                split={true}
                type="time"
                id="class-end"
                name="class_end"
                required={true}
              />
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
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
              </div>

              <InputField
                label="mins"
                type="number"
                placeholder="mins"
                name="mins"
                id="mins"
                min="0"
                max="59"
                split={true}
                defaultValue={0}
                required={true}
              />
            </div>

            <div className="lg:flex lg:gap-4">
              {/* registration fee */}
              <InputField
                label={"Registration fee"}
                split={true}
                type={"number"}
                defaultValue={0}
                readOnly={true}
                id={"fee"}
                name={"fee"}
              />

              {/* session status */}
              <InputField
                split={true}
                label={"Status"}
                defaultValue={"Pending"}
                name={"status"}
                readOnly={true}
                id={"status"}
              />
            </div>
            <button type="submit" className="form-btn">
              Create session
            </button>
          </div>
        </form>
      </div>
    </FormContext.Provider>
  );
}

export default CreateStudySession;
