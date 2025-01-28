import UpdateNoteModal from "../../modal/UpdateNoteModal";

function NoteCard({ title, description, id, refetch, handleDelete }) {
  return (
    <div className="card max-w-96 shadow-inner shadow-slate-300">
      <div className="card-body items-center text-center">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <UpdateNoteModal
            refetch={refetch}
            id={id}
            title={title}
            description={description}
          />
          <button className="btn btn-error" onClick={() => handleDelete(id)}>
            delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
