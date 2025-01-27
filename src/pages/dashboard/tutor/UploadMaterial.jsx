import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UploadMaterialModal from "../../../components/modal/UploadMaterialModal";

function UploadMaterial() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: sessions = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["upload-sessions", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/study-session/${user?.email}`);
      return data;
    },
  });
  console.log(sessions);

  return (
    <div>
      <h3 className="dashboard-title">Select session to upload material</h3>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {sessions?.map((session) => {
          return (
            <div key={session._id} className="card w-96 bg-base-100 shadow-xl">
              <figure>
                <img src={session.img} alt="Shoes" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{session.title}</h2>
                <p>{session.description.substring(0, 100)}....</p>
                <div className="card-actions justify-end">
                  <UploadMaterialModal id={session._id} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UploadMaterial;
