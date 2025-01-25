import { MdDelete } from "react-icons/md";
import ApproveSessionModal from "../../modal/ApproveSessionModal";

function SessionRow({ session, refetch }) {
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
        <div className="tooltip" data-tip="approve">
          <ApproveSessionModal refetch={refetch} id={session._id} />
        </div>
        <div className="tooltip" data-tip="reject">
          <button className="btn">
            <MdDelete />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default SessionRow;
