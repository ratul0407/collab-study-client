function NoteCard({ title, description }) {
  return (
    <div className="card max-w-64 shadow-inner shadow-slate-300">
      <div className="card-body items-center text-center">
        <h2 className="card-title">{title}</h2>
        <p>{description.substring(0, 20)}...</p>
        <div className="card-actions justify-end">
          <button className="btn btn-warning">update</button>
          <button className="btn btn-error">delete</button>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
