import { isAfter, isBefore, parse } from "date-fns";
import useRole from "../../../hooks/useRole";

function SessionCard({ session }) {
  console.log(session);
  console.log(session);
  const {
    img,
    title,
    description,
    status,
    class_end,
    class_start,
    reg_end,
    reg_start,
    fee,
    hours,
    mins,
  } = session || {};
  const { role } = useRole();
  const regEndDate = parse(reg_end, "yyyy-dd-MM", new Date());
  const closed = isBefore(regEndDate, new Date());
  console.log(closed);
  return (
    <div className="card mx-auto w-72 border bg-base-100 shadow-xl sm:w-96 2xl:w-11/12">
      <figure>
        <img className="h-64 w-full object-cover" src={img} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {title}
          {role !== "student" && (
            <div
              className={`badge ${status === "Pending" ? "bg-yellow-400" : status === "Rejected" ? "bg-red-400" : "bg-green-400"}`}
            >
              {status}
            </div>
          )}
        </h2>
        <p>{description.substring(0, 100)}.... </p>
        <p className="font-bold">Registration Starts: {reg_start}</p>
        <p className="font-bold">Registration Ends: {reg_end}</p>
        <p className="font-bold">Class Starts: {class_start}</p>
        <p className="font-bold">Class Ends: {class_end}</p>
        <p className="font-bold">Fee: {fee}</p>
        <p className="font-bold">
          Session Duration: {hours}hrs and {mins}mins
        </p>
        {role === "student" && status === "Rejected" && (
          <div className="card-actions justify-end">
            <button className="btn">Request</button>
          </div>
        )}
        {role === "student" && (
          <p
            className={`w-fit rounded-xl ${closed ? "bg-red-500" : "bg-green-500"} p-1 font-bold text-white`}
          >
            {closed ? "Closed" : "Ongoing"}
          </p>
        )}

        {!closed && <button className="btn">Read More</button>}
      </div>
    </div>
  );
}

export default SessionCard;
