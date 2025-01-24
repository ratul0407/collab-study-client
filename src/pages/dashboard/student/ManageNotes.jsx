import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import NoteCard from "../../../components/dashboard/student/NoteCard";

function ManageNotes() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: notes, isLoading } = useQuery({
    queryKey: ["note", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/get-notes/${user?.email}`);
      return data;
    },
  });

  return (
    <div>
      <h3 className="dashboard-title">Manage notes</h3>
      {/* show the notes in card format */}
      <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => {
          return (
            <NoteCard
              title={note.title}
              description={note.description}
              key={note._id}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ManageNotes;
