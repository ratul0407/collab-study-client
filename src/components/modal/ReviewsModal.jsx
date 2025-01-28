function ReviewsModal({ rating, reviews }) {
  return (
    <div>
      <button
        className="font-bold underline"
        onClick={() => document.getElementById("review-modal").showModal()}
      >
        Reviews: {rating}
      </button>
      <dialog id="review-modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
              ✕
            </button>
          </form>
          {reviews?.map((review) => {
            return (
              <div key={review._id} className="rounded-lg border px-5 py-8">
                <p className="font-bold">Reviewer: {review.reviewer}</p>
                <p className="font-bold">Rating: {review.rating} stars</p>
                <p className="font-bold">Review: {review.review}</p>
              </div>
            );
          })}
        </div>
      </dialog>
    </div>
  );
}

export default ReviewsModal;
