import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

function ApproveSessionModal({ id, refetch, title }) {
  const [selectedOption, setSelectedOption] = useState("");
  const axiosSecure = useAxiosSecure();
  console.log(id);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const free = form.radio[0].checked;
    const paid = form.radio[1].checked;
    const fee = form?.fee?.value;
    if (free) {
      try {
        await axiosSecure.patch(`/session/${id}`, {
          status: "Approved",
          fee: 0,
        });
        toast.success("Session Approved");
      } catch (err) {
        toast.error(err);
      } finally {
        refetch();
        document.getElementById(title).close();
      }
    }

    if (paid) {
      try {
        await axiosSecure.patch(`/session/${id}`, {
          status: "Approved",
          fee: parseInt(fee),
        });
        toast.success("Session Approved");
      } catch (err) {
        toast.error(err);
      } finally {
        refetch();
        document.getElementById(title).close();
      }
    }
  };
  return (
    <div>
      <button
        className="btn"
        onClick={() => document.getElementById(title).showModal()}
      >
        <FaCheck />
      </button>
      <dialog id={title} className="modal">
        <div className="modal-box">
          <p className="text-xl">Is the session free or paid?</p>
          <form
            onSubmit={(e) => handleSubmit(e)}
            method="dialog"
            className="grid space-y-4"
          >
            <div className="form-control flex flex-row items-center gap-4">
              <label htmlFor="free" className="label">
                <span className="label-text">Free</span>
              </label>
              <input
                type="radio"
                name="radio"
                value="free"
                className="radio"
                onChange={(e) => setSelectedOption(e.target.value)}
              />
            </div>
            <div className="form-control flex flex-row items-center gap-4">
              <label htmlFor="free" className="label">
                <span className="label-text">paid</span>
              </label>
              <input
                type="radio"
                name="radio"
                value="paid"
                className="radio"
                onChange={(e) => setSelectedOption(e.target.value)}
              />
            </div>

            {selectedOption === "paid" && (
              <div className="form-control">
                <label htmlFor="price" className="label">
                  <span className="label-text">Fee</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered"
                  placeholder="specify amount"
                  name="fee"
                  required
                  min={0}
                  max={1000}
                />
              </div>
            )}
            <button disabled={!selectedOption} type="submit" className="btn">
              Approve
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default ApproveSessionModal;
