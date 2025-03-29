import { useState, useEffect, FC } from "react";
import "./Orders.scss";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

interface Item {
  name: string;
  quantity: number;
}

interface Address {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  phone: string;
}

interface Order {
  _id: number;
  userId: string;
  items: Item[];
  amount: number;
  address: Address;
  status: "Food Processing" | "Out for Delivery" | "Delivered" | "Cancelled";
}


const Orders: FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(
      "https://foodeli-backend-55b2.onrender.com/api/order/list"
    );
    if (response.data.success) {
      setOrders(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const statusHandler = async (
    e: React.ChangeEvent<HTMLSelectElement>,
    orderId: number
  ) => {
    const response = await axios.post(
      "https://foodeli-backend-55b2.onrender.com/api/order/status",
      {
        orderId,
        status: e.target.value,
      }
    );
    if (response.data.success) {
      await fetchAllOrders();
    }
  };
  useEffect(() => {
    fetchAllOrders();
  }, []);
  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p className="order-iten-name">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.street + ", "}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items : {order.items.length}</p>
            <p>${order.amount}</p>
            <select
              onChange={(e) => statusHandler(e, order._id)}
              value={order.status}
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
