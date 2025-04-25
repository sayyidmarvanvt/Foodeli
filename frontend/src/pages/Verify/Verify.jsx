import { useEffect, useCallback } from "react";
import "./Verify.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const Verify = () => {
  const [searchParams] = useSearchParams(); // Removed unused setSearchParams
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const navigate = useNavigate();

  const verifyPayment = useCallback(async () => {
    const response = await axios.post(
      "https://foodeli-backend-55b2.onrender.com/api/order/verify",
      {
        success,
        orderId,
      }
    );
    if (response.data.success) {
      navigate("/myorders");
    } else {
      navigate("/");
    }
  }, [success, orderId, navigate]);

  useEffect(() => {
    verifyPayment();
  }, [verifyPayment]);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
