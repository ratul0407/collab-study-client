function ShowRejectionReasonModal({ session }) {
  return (
    <div>
      <button
        className="btn"
        onClick={() => document.getElementById(session._id).showModal()}
      >
        Rejection Reason
      </button>
      <dialog id={session._id} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
              ✕
            </button>
          </form>
          <p className="font-bold">
            Rejection reason: {session.rejection.reason}
          </p>
          <p className="font-bold">Feedback: {session.rejection.feedback}</p>
        </div>
      </dialog>
    </div>
  );
}

export default ShowRejectionReasonModal;
