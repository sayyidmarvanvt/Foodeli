import React, { useEffect } from "react";
import "./Verify.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const navigate = useNavigate();

  const verifyPayment = async (e) => {
    const response = await axios.post("/api/order/verify", {
      success,
      orderId,
    });
    if (response.data.success) {
      navigate("/myorders");
    } else {
      navigate("/");
    }
  };

  useEffect(()=>{verifyPayment()},[])
  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
