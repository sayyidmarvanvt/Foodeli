import { useContext, useEffect, useState, useCallback } from "react";
import "./MyOrders.scss";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import io from "socket.io-client";
import Recommendation from "../../components/Recommendation/Recommendation";

const socket = io("https://foodeli-backend-55b2.onrender.com");

const MyOrders = () => {
  const [data, setData] = useState([]);
  const { token } = useContext(StoreContext);

const fetchOrders = useCallback(async () => {
  try {
    const response = await axios.post(
      "https://foodeli-backend-55b2.onrender.com/api/order/userorders",
      {},
      { headers: { token } } // token comes from component scope
    );
    setData(response.data.data);
  } catch (error) {
    console.error("Error fetching orders:", error);
    toast.error("Failed to fetch orders. Please try again.");
  }
}, [token, setData]); // Add all dependencies used in the callback

useEffect(() => {
  if (token) {
    fetchOrders();

    socket.on("orderStatusUpdated", ({ orderId, status }) => {
      setData((prevData) =>
        prevData.map((order) =>
          order._id === orderId ? { ...order, status } : order
        )
      );
    });

    return () => {
      socket.disconnect();
    };
  }
}, [token, fetchOrders]);

  return (
    <>
      <div className="my-orders">
        <h2>My Orders</h2>
        <div className="container ">
          {data.length === 0 ? ( // Check if data is empty
            <div className="no-orders">
              <p>No orders available.</p>
            </div>
          ) : (
            data.map((order, index) => {
              return (
                <div className="my-orders-order" key={index}>
                  <img src={assets.parcel_icon} alt="" />
                  <p>
                    {order.items.map((item, index) => {
                      if (index === order.items.length - 1) {
                        return item.name + " x " + item.quantity;
                      } else {
                        return item.name + " x " + item.quantity + ", ";
                      }
                    })}
                  </p>
                  <p>${order.amount}.00</p>
                  <p>Items: {order.items.length}</p>
                  <p>
                    <span>&#x25Cf;</span> <b>{order.status}</b>
                  </p>
                  <button onClick={fetchOrders}>Track Order</button>
                </div>
              );
            })
          )}
        </div>
      </div>
      <Recommendation />
    </>
  );
};

export default MyOrders;
