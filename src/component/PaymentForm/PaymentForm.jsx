import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import { Button, message } from "antd";

import { useAuth } from "../../context/AuthProvider";
import useAxiosSecure from "../../axios/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const PaymentForm = ({ classDetails }) => {
  const { currentUser } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const axios = useAxiosSecure();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const cardElement = elements.getElement(CardElement);

    if (!stripe || !cardElement) return;

    try {
      const { data } = await axios.post("/users/create-payment-intent", {
        amount: classDetails.price,
        currency: "usd",
      });

      const { clientSecret } = data;
      setClientSecret(clientSecret);

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (paymentResult.error) {
        setError(paymentResult.error.message);
      } else if (paymentResult.paymentIntent.status === "succeeded") {
        const enrollMents = {
          classId: classDetails._id,
          user: currentUser?.email,
          payment_id: paymentResult.paymentIntent.id,
          amount: classDetails.price,
        };

        const { data } = await axios.post("/users/enrollments", enrollMents);
        const result = data.data;

        if (result?.insertedId) {
          message.success("Congratulation! you have successfully enrolled!");
          navigate("/dashboard/my-enroll-class");
        } else {
          setError("Payment failed. Please try again.");
        }
      }
    } catch {
      setError("Payment failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-lg mx-auto border p-8 rounded-lg border-primaryColor"
    >
      <h2 className="text-xl lg:text-3xl font-bold text-primaryColor">
        Complete Your Payment
      </h2>

      <CardElement
        className="p-3 border rounded-md shadow-sm"
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

      {error && <p className="text-red">{error}</p>}

      <Button
        type="primary"
        htmlType="submit"
        size="large"
        loading={loading}
        disabled={loading || !stripe}
        className="bg-primaryColor hover:!bg-secondaryColor"
      >
        {loading ? "Proccesing..." : "Pay Now"}
      </Button>
    </form>
  );
};
export default PaymentForm;
