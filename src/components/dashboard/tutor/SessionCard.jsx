function SessionCard({ session }) {
  console.log(session);
  const { img, title, description, status } = session || {};
  return (
    <div className="card w-96 border bg-base-100 shadow-xl">
      <figure>
        <img className="h-64 w-full object-cover" src={img} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {title}
          <div
            className={`badge ${status === "Pending" ? "bg-yellow-400" : status === "Rejected" ? "bg-red-400" : "bg-green-400"}`}
          >
            {status}
          </div>
        </h2>
        <p>{description.substring(0, 100)}.... </p>
        {status === "Rejected" && (
          <div className="card-actions justify-end">
            <button className="btn">Request</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SessionCard;
