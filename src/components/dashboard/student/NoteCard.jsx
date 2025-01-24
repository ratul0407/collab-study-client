import UpdateNoteModal from "../../modal/UpdateNoteModal";

function NoteCard({ title, description, id, refetch }) {
  return (
    <div className="card max-w-64 shadow-inner shadow-slate-300">
      <div className="card-body items-center text-center">
        <h2 className="card-title">{title.substring(0, 20)}...</h2>
        <p>{description.substring(0, 30)}...</p>
        <div className="card-actions justify-end">
          <UpdateNoteModal
            refetch={refetch}
            id={id}
            title={title}
            description={description}
          />
          <button className="btn btn-error">delete</button>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
