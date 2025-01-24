import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

function UpdateNoteModal({ id, title, description, refetch }) {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    const note = {
      title: data.title,
      description: data.description,
    };

    try {
      await axiosSecure.patch(`/notes/${id}`, { note });
      toast.success("Note updated successfully");
      document.getElementById(id).close();
      refetch();
    } catch (err) {
      toast.error(err.response);
    }
  };
  return (
    <div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn"
        onClick={() => document.getElementById(id).showModal()}
      >
        Update
      </button>
      <dialog id={id} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
              ✕
            </button>
          </form>
          <form onSubmit={handleSubmit(onSubmit)} method="dialog">
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
                defaultValue={title}
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
                defaultValue={description}
                {...register("description")}
                id="description"
              />
            </div>
            <button type="submit" className="form-btn">
              Create Note
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default UpdateNoteModal;
