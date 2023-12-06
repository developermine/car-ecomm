import React from "react";
import Checkout from "../components/checkout/Checkout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51MhyzLElWJFBBgexVtVe29zCDq5Y6o89rCHCBwPA5AsmhGt26qnDtXHck4MQCdysBDJLIo04XBtW0aqlpE4PfHpG00qBPTcR9J"
);

const CheckOutPage = () => {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <Checkout />
      </Elements>
    </div>
  );
};

export default CheckOutPage;
