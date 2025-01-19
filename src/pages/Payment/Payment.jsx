import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../../component/PaymentForm/PaymentForm";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_KEY);

const Payment = () => {
  const location = useLocation();
  const classDetails = location?.state;

  return (
    <div className="mt-20">
      <Elements stripe={stripePromise}>
        <PaymentForm classDetails={classDetails} />
      </Elements>
    </div>
  );
};

export default Payment;
