import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

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

  const imageUrl =
    "https://i.ibb.co.com/D4Pq8m2/Getting-Started-with-Array-Data-Structure.webp"; // Replace with your image URL
  const fileName = "downloaded-image.jpg";
  const downloadImage = () => {
    const link = document.createElement("a"); // Create a link element
    link.href = imageUrl; // Set the href to the image URL
    link.download = fileName; // Set the download attribute with the file name
    document.body.appendChild(link); // Append the link to the document
    link.click(); // Trigger the download
    document.body.removeChild(link); // Remove the link after download
  };
  return (
    <div>
      <h3 className="dashboard-title">All Materials</h3>
      {materials?.map((material) => {
        return (
          <div className="card w-96 bg-base-100 shadow-xl">
            <figure>
              <img src={material.image} alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{material.title}</h2>
              <Link to={material.link} target="_blank" className="underline">
                Google Drive Link
              </Link>
              <div className="card-actions justify-end">
                <button onClick={downloadImage}>Download Image</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MaterialsStudent;
