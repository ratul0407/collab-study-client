import { MdDelete } from "react-icons/md";
import ApproveSessionModal from "../../modal/ApproveSessionModal";
import { ImCross } from "react-icons/im";
import { FaPen } from "react-icons/fa";
import RejectionModal from "../../modal/RejectionModal";

function SessionRow({ session, refetch, status }) {
  return (
    <tr key={session._id}>
      <td>
        <img className="h-10 w-20 object-cover" src={session.img} />
      </td>
      <td>{session?.["tutor-email"]}</td>
      <td>{session?.["tutor-name"]}</td>
      <td>{session.title}</td>
      <td>{session.status}</td>
      <td>{session.fee}</td>
      <td className="space-x-4">
        <div
          className="tooltip"
          data-tip={`${status === "Pending" ? "approve" : "update"}`}
        >
          {status === "Pending" ? (
            <ApproveSessionModal
              refetch={refetch}
              id={session._id}
              title={session.title}
            />
          ) : (
            <FaPen />
          )}
        </div>
        <div
          className="tooltip"
          data-tip={`${status === "Pending" ? "reject" : "delete"}`}
        >
          {status === "Pending" ? (
            <RejectionModal refetch={refetch} id={session._id} />
          ) : (
            <MdDelete />
          )}
        </div>
      </td>
    </tr>
  );
}

export default SessionRow;
