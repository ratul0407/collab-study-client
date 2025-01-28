import { ImCross } from "react-icons/im";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

function RejectionModal({ refetch, id }) {
  const axiosSecure = useAxiosSecure();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const reason = form.reason.value;
    const feedback = form.feedback.value;
    try {
      await axiosSecure.patch(`/reject-session/${id}`, {
        status: "Rejected",
        reason,
        feedback,
      });
      toast.success("Rejection successful!");
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
        <ImCross />
      </button>
      <dialog id={id} className="modal">
        <div className="modal-box">
          <form
            onSubmit={handleSubmit}
            method="dialog"
            className="mx-auto grid max-w-sm space-y-4"
          >
            <div className="form-control">
              <label htmlFor="reason" className="label">
                <span className="label-text">Rejection reason:</span>
              </label>
              <textarea
                className="textarea textarea-bordered"
                placeholder="rejection reason"
                name="reason"
                required
              ></textarea>
            </div>
            <div className="form-control">
              <label htmlFor="" className="label">
                <span className="label-text">Feedback:</span>
              </label>
              <textarea
                className="textarea textarea-bordered"
                name="feedback"
                required
                placeholder="Feedback"
              ></textarea>
            </div>
            <button className="btn">Submit</button>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default RejectionModal;
