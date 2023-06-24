import React, { useEffect, useRef, useState } from "react";
import "./Pay.scss";
import newRequest from "../../utils/newRequest";
import Layout from "../../components/Layout";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51NMCozALxVEwLCM6Vts5WllrrAw9iSW1wHAGmI2HSWEZHbCIiY63ylf1A81JvBcweh9m8TgnjFkog0k8n4BtDcas00Ji0aLM8R"
);

const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");
  const { id } = useParams();
  const dataFetchedRef = useRef(false)

  const makeRequest = async () => {
    try {
      const res = await newRequest.post(`/orders/create-payment-intent/${id}`);
      setClientSecret(res.data.clientSecret);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(dataFetchedRef.current) return;
    dataFetchedRef.current = true
    makeRequest();

  }, [])
  

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <Layout>
      <div className="pay">
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </Layout>
  )
};

export default Pay;
