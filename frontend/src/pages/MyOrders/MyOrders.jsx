import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.scss";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import io from "socket.io-client";
import { toast } from "react-toastify";

const socket = io("https://foodeli-backend-55b2.onrender.com");

const MyOrders = () => {
  const [data, setData] = useState([]);
  const { token } = useContext(StoreContext);

  const fetchOrders = async () => {
      if (data.order.status === "Delivered") {
        toast.success("Your order delivered successfully.");
      } else if (data.order.status === "Cancelled") {
        toast.error("Your order has been cancelled.");
      }
    try {
      const response = await axios.post(
        "https://foodeli-backend-55b2.onrender.com/api/order/userorders",
        {},
        { headers: { token: token } } // Pass the token in headers
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders. Please try again.");
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();

      socket.on("orderStatusUpdated", ({ orderId, status }) => {
        console.log("Order status updated:", orderId, status);
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
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
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
  );
};

export default MyOrders;
