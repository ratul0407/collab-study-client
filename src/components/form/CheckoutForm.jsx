import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function CheckoutForm({ price, tutorEmail, id }) {
  const { user } = useAuth();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate("");
  console.log(price);
  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", {
        price: price,
        sessionId: id,
        student: user?.email,
      })
      .then((res) => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
  }, [price]);
  const handleSubmit = async (e) => {
    // Block native form submission.
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
      console.log("[error]", error);
    } else {
      setError("");
      console.log("[PaymentMethod]", paymentMethod);
    }

    //confirm payment
    const { paymentIntent, error: cardConfirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (cardConfirmError) {
      console.log(cardConfirmError);
    } else {
      console.log(paymentIntent);
    }

    if (paymentIntent.status === "succeeded") {
      const response = await axiosSecure.post("/booked-session", {
        student: user?.email,
        tutor: tutorEmail,
        sessionId: id,
        transactionId: paymentIntent?.id,
      });

      toast.success("Session Booked successfully!");
      navigate("/dashboard/booked-session");
    }
  };
  return (
    <form className="grid" onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="form-btn"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      <p className="text-red-500">{error}</p>
    </form>
  );
}

export default CheckoutForm;
