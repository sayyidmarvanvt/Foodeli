import orderModal from "../models/orderModel.js";
import userModal from "../models/userModal.js";
import {io} from "../server.js"
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing order
export const placeOrder = async (req, res) => {
  const fronted_url = "https://foodeli-frontend.onrender.com";
  try {
    const newOrder = new orderModal({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();
    await userModal.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 80,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100 * 80,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${fronted_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${fronted_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.status(200).json({ success: true, session_url: session.url }); // 200 OK
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" }); // 500 Internal Server Error
  }
};

// Verify order
export const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success == "true") {
      await orderModal.findByIdAndUpdate(orderId, { payment: true });
      res.status(200).json({ success: true, message: "Paid" }); // 200 OK
    } else {
      await orderModal.findByIdAndDelete(orderId);
      res.status(200).json({ success: false, message: "Not Paid" }); // 200 OK
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" }); // 500 Internal Server Error
  }
};

// User orders
export const userOrders = async (req, res) => {
  try {
    const orders = await orderModal.find({ userId: req.body.userId });
    res.status(200).json({ success: true, data: orders }); // 200 OK
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" }); // 500 Internal Server Error
  }
};

// Orders for admin panel
export const listOrders = async (req, res) => {
  try {
    const orders = await orderModal.find({});
    res.status(200).json({ success: true, data: orders }); // 200 OK
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" }); // 500 Internal Server Error
  }
};


// Update order status
export const updateStatus = async (req, res) => {
   const { orderId, status } = req.body;
  try {
    await orderModal.findByIdAndUpdate(orderId, { status });

    // Additional logic for cancellations
    if (status === "Cancelled") {
      // Send a notification to the user
      io.emit("orderCancelled", {
        orderId,
        message: "Your order has been cancelled.",
      });

      // Trigger a refund (if applicable)
      // await refundUser(orderId);
    }

    // Emit the updated status to all connected clients
    io.emit("orderStatusUpdated", { orderId, status });

    res.status(200).json({ success: true, message: "Status Updated" }); // 200 OK
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" }); // 500 Internal Server Error
  }
};
