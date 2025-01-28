import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
function MaterialsStudent() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: materials = [], isLoading } = useQuery({
    queryKey: ["materials", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/booked-session-material/${user?.email}`,
      );
      return data;
    },
  });
  console.log(materials);

  const downloadImg = async (imgSrc, imgName) => {
    const imgBlob = await fetch(imgSrc).then((res) => res.blob());
    const link = document.createElement("a");
    link.href = URL.createObjectURL(imgBlob);
    link.download = imgName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div>
      <h3 className="dashboard-title">All Materials</h3>
      {materials?.map((material) => {
        return (
          <div key={material._id} className="card w-96 bg-base-100 shadow-xl">
            <figure>
              <img src={material.image} alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{material.title}</h2>
              <Link to={material.link} target="_blank" className="underline">
                Google Drive Link
              </Link>
              <div className="card-actions justify-end">
                <button
                  className="btn"
                  onClick={() => downloadImg(material.image, material.title)}
                >
                  Download Image
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MaterialsStudent;
