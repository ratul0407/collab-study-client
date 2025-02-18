import { isBefore, parse } from "date-fns";
import { Link } from "react-router-dom";
function HomePageSessionCard({ session }) {
  const {
    _id,
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

  const regEndDate = parse(reg_end, "yyyy-dd-MM", new Date());
  const closed = isBefore(regEndDate, new Date());
  return (
    <div className="mx-auto w-72 border bg-base-100 shadow-xl sm:w-96 2xl:w-11/12">
      <figure>
        <img className="h-64 w-full object-cover" src={img} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description.substring(0, 100)}.... </p>
        <p className="font-bold">Registration Starts: {reg_start}</p>
        <p className="font-bold">Registration Ends: {reg_end}</p>
        <p className="font-bold">Class Starts: {class_start}</p>
        <p className="font-bold">Class Ends: {class_end}</p>
        <p className="font-bold">Fee: {fee}</p>
        <p className="font-bold">
          Session Duration: {hours}hrs and {mins}mins
        </p>
        <p
          className={`w-fit rounded-xl ${closed ? "bg-red-500" : "bg-green-500"} p-1 font-bold text-white`}
        >
          Registrations: {closed ? "Closed" : "Ongoing"}
        </p>

        <Link to={`/session/${_id}`} className="btn">
          Read More
        </Link>
      </div>
    </div>
  );
}

export default HomePageSessionCard;
