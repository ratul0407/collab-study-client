import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../form/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK_KEY);
function PaymentModal({ fee, tutorEmail, id }) {
  return (
    <div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="form-btn"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        Book Now
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
              ✕
            </button>
          </form>
          <p className="font-bold">Price: {fee}</p>
          <div className="border px-10 py-12">
            <Elements stripe={stripePromise}>
              <CheckoutForm price={fee} tutorEmail={tutorEmail} id={id} />
            </Elements>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default PaymentModal;
