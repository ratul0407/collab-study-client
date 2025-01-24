import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import NoteCard from "../../../components/dashboard/student/NoteCard";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import Swal from "sweetalert2";

function ManageNotes() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: notes,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["note", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/notes/${user?.email}`);
      return data;
    },
  });

  const handleDelete = (id) => {
    console.log(id);
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
        await axiosSecure.delete(`/notes/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };
  if (isLoading) return <LoadingSpinner />;
  return (
    <div>
      <h3 className="dashboard-title">Manage notes</h3>
      {/* show the notes in card format */}
      <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => {
          return (
            <NoteCard
              refetch={refetch}
              title={note.title}
              description={note.description}
              key={note._id}
              id={note._id}
              handleDelete={handleDelete}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ManageNotes;
