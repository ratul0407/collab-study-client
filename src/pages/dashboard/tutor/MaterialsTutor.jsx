import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import UpdateMaterialModal from "../../../components/modal/UpdateMaterialModal";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import Swal from "sweetalert2";

function MaterialsTutor() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: materials = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["materials", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/materials/${user?.email}`);
      return data;
    },
  });

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/materials/${id}`);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
      refetch();
    });
  };
  console.log(materials);
  if (isLoading) return <LoadingSpinner />;
  return (
    <div>
      <h3 className="dashboard-title">All of your materials</h3>
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-2">
        {materials?.map((material) => {
          return (
            <div key={material._id} className="card w-96 bg-base-100 shadow-xl">
              <figure>
                <img className="h-64 w-full" src={material.image} alt="Shoes" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{material.title}</h2>
                <Link to={material.link} target="_blank" className="underline">
                  google drive link
                </Link>

                <div className="card-actions justify-end">
                  <UpdateMaterialModal
                    key={material._id}
                    material={material}
                    id={material._id}
                    refetch={refetch}
                  />
                  <button
                    className="btn btn-error"
                    onClick={() => handleDelete(material._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MaterialsTutor;
