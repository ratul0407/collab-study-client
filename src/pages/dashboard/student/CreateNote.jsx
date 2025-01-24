import { useForm } from "react-hook-form";
import InputField from "../../../components/form/InputField";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function CreateNote() {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate("");
  const { user } = useAuth();
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    try {
      await axiosSecure.post("/add-note", data);
      toast.success("Note created successfully!");
      navigate("/dashboard/manage-notes");
    } catch (err) {
      toast.error(err.response);
    }
  };
  return (
    <div>
      <h3 className="text-center text-xl font-bold uppercase">
        Create a note for better understanding of a topic.
      </h3>
      <form
        className="mx-auto max-w-lg rounded-lg px-8 py-12 shadow-2xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-control">
          <label htmlFor="email" className="label">
            <span className="label-text">Student Email:</span>
          </label>
          <input
            type="email"
            value={user?.email}
            readOnly
            className="input input-bordered w-full"
            id="email"
            required
            {...register("email")}
          />
        </div>
        <div className="form-control">
          <label htmlFor="title" className="label">
            <span className="label-text">Note Title:</span>
          </label>
          <input
            type="text"
            id="title"
            className="input input-bordered w-full"
            placeholder="Note Title"
            {...register("title")}
          />
        </div>
        <div className="form-control">
          <label htmlFor="description" className="label">
            <span className="label-text">Description:</span>
          </label>
          <textarea
            placeholder="Description"
            className="textarea textarea-bordered"
            required
            {...register("description")}
            id="description"
          />
        </div>
        <button type="submit" className="form-btn">
          Create Note
        </button>
      </form>
    </div>
  );
}

export default CreateNote;
