import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

function UpdateUserRole({ id, defaultValue, refetch }) {
  const axiosSecure = useAxiosSecure();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.post(`/users/role/${id}`, {
        role: e.target.role.value,
      });
      toast.success("Role updated successfully!");
      document.getElementById(id).close();
    } catch (err) {
      toast.error(err);
    } finally {
      refetch();
    }
  };
  return (
    <div>
      <button
        className="btn"
        onClick={() => document.getElementById(id).showModal()}
      >
        Update Role
      </button>
      <dialog id={id} className="modal">
        <div className="modal-box min-h-64">
          <form
            onSubmit={handleSubmit}
            method="dialog"
            className="grid space-y-4"
          >
            <h3 className="pb-2 text-center text-xl font-medium">
              Select a role for the user:
            </h3>
            <select
              name="role"
              defaultValue={defaultValue}
              className="select select-bordered w-full max-w-xs"
            >
              <option value="tutor">tutor</option>
              <option value="student">student</option>
              <option value="admin">admin</option>
            </select>
            <button type="submit" className="btn">
              Update Role
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default UpdateUserRole;
