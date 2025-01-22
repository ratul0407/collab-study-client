import { useForm } from "react-hook-form";
import InputField from "../../../components/form/InputField";
import useAuth from "../../../hooks/useAuth";
import { createContext } from "react";
import axios from "axios";

const img_hosting_key = import.meta.env.VITE_IMG_HOSTING_KEY;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;
export const FormContext = createContext(null);
function CreateStudySession() {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    //upload img to imgbb and then get imgurl
    const imgFile = data.img[0];
    const res = await axios.post(img_hosting_api, imgFile);
  };
  return (
    <FormContext.Provider value={{ register }}>
      <div className="mx-4 px-4 py-10 shadow-2xl sm:mx-6 lg:mx-auto lg:max-w-2xl lg:rounded-lg lg:px-4 lg:py-12">
        <h3 className="pb-4 text-center text-3xl font-bold text-blue-700">
          Add a new Study Session
        </h3>
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
                name={"tutor-email"}
                readOnly={true}
                defaultValue={user?.email}
                split={true}
                id={"tutor-email"}
              />

              {/* tutor name */}
              <InputField
                label={"Tutor Name"}
                readOnly={true}
                defaultValue={user?.displayName}
                name={"tutor-name"}
                split={true}
                type={"text"}
                id={"tutor-name"}
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
                name={"register-starts"}
              />

              {/* registration end date */}
              <InputField
                label={"Registration End Date"}
                split={true}
                type={"date"}
                id={"red-end"}
                name={"register-ends"}
              />
            </div>
            {/* class start and end date */}
            <div className="lg:flex lg:gap-4">
              {/* class start date */}
              <InputField
                label={"Class Start Date"}
                split={true}
                type={"date"}
                id={"class-start"}
                name="class-starts"
              />

              {/* class end date */}
              <InputField
                label={"Class End Date"}
                split={true}
                type={"date"}
                id={"class-end"}
                name="class-ends"
              />
            </div>
            {/* session duration */}
            <span>Session Duration</span>
            <div className="lg:flex lg:gap-4">
              <InputField
                label={"hours"}
                type={"number"}
                placeholder={"0 hrs and 0 mins"}
                id={"hours"}
                name="hours"
                min="0"
                max="6"
                split={true}
              />
              <InputField
                label="mins"
                type="number"
                placeholder="mins"
                name="mins"
                id="mins"
                min="0"
                max="59"
                split={true}
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
            <button
              type="submit"
              className="btn mt-4 bg-blue-700 text-lg text-white transition-all duration-300 hover:bg-blue-500"
            >
              Create session
            </button>
          </div>
        </form>
      </div>
    </FormContext.Provider>
  );
}

export default CreateStudySession;
