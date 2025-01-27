import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import axios from "axios";

const img_hosting_key = import.meta.env.VITE_IMG_HOSTING_KEY;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;
function UpdateMaterialModal({ id, material, refetch }) {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const link = form.link.value;
    const title = form.title.value;
    const img = form.img.files[0];
    let image;
    if (img) {
      const imgFile = { image: img };
      const res = await axios.post(img_hosting_api, imgFile, {
        headers: { "content-type": "multipart/form-data" },
      });
    }

    image = !img ? null : res?.data?.data?.display_url;
    const material = {
      title,
      link,
      image,
      sessionId: id,
    };

    try {
      await axiosSecure.patch(`/material/${id}`, material);
      toast.success("material successfully updated!");
    } catch (err) {
      toast.error("something wrong! please try again later");
    } finally {
      refetch();
      document.getElementById(id).close();
    }
  };
  return (
    <div>
      <button
        className="btn"
        onClick={() => document.getElementById(id).showModal()}
      >
        Update Material
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
                defaultValue={material.title}
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
                value={material.sessionId}
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
                defaultValue={material.link}
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

export default UpdateMaterialModal;
