import axios from "axios";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const img_hosting_key = import.meta.env.VITE_IMG_HOSTING_KEY;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;
function UploadMaterialModal({ id }) {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const link = form.link.value;
    const img = form.img.files[0];
    console.log(img);

    const imgFile = { image: img };
    const res = await axios.post(img_hosting_api, imgFile, {
      headers: { "content-type": "multipart/form-data" },
    });
    console.log(res);
    const material = {
      title,
      link,
      image: res?.data?.data?.display_url,
      tutor: user?.email,
      sessionId: id,
    };
    try {
      await axiosSecure.post("/materials", material);
      toast.success("Material saved");
      navigate("/dashboard/view-materials-tutor");
    } catch (err) {
      toast.error("Something went wrong! please try again later!");
    } finally {
      document.getElementById(id).close();
    }
  };
  return (
    <div>
      <button
        className="btn"
        onClick={() => document.getElementById(id).showModal()}
      >
        Upload Material
      </button>
      <dialog id={id} className="modal">
        <div className="modal-box">
          <form onSubmit={handleSubmit} method="dialog" className="grid">
            {/* title */}
            <div className="form-control">
              <label htmlFor="title" className="label">
                <span className="label-text">Title:</span>
              </label>
              <input
                id="title"
                type="text"
                className="input input-bordered w-full"
                placeholder="Title"
                required
                name="title"
              />
            </div>
            {/* session id */}
            <div className="form-control">
              <label htmlFor="sessionId" className="label">
                <span className="label-text">Session ID:</span>
              </label>
              <input
                id="sessionId"
                type="text"
                className="input input-bordered w-full"
                value={id}
                readOnly
              />
            </div>
            {/* tutor  */}
            <div className="form-control">
              <label htmlFor="tutor" className="label">
                <span className="label-text">Tutor:</span>
              </label>
              <input
                id="tutor"
                type="email"
                className="input input-bordered w-full"
                value={user?.email}
                readOnly
              />
            </div>
            {/* Img upload */}
            <div className="form-control">
              <label htmlFor="img" className="label">
                <span className="label-text">Upload Image</span>
              </label>
              <input
                type="file"
                required
                name="img"
                className="input input-bordered w-full pt-2"
              />
            </div>
            {/* google drive link */}
            <div className="form-control">
              <label htmlFor="link" className="label">
                <span className="label-text">Google Drive Link:</span>
              </label>
              <input
                id="link"
                type="url"
                className="input input-bordered w-full"
                placeholder="Google Drive link"
                name="link"
                required
              />
            </div>
            <button className="form-btn" type="submit">
              Upload Material
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default UploadMaterialModal;
