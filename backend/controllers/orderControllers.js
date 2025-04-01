import orderModal from "../models/orderModel.js";
import userModal from "../models/userModal.js";
import nodemailer from "nodemailer";
import { io } from "../server.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const fronted_url = "https://foodeli-frontend.onrender.com";
// Placing order
export const placeOrder = async (req, res) => {
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

// Verify order and send Mail
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER, // Store in .env
    pass: process.env.EMAIL_PASSWORD, // Use "App Password" for Gmail
  },
});

export const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      // 1. Update order status and fetch user email
      const updatedOrder = await orderModal.findByIdAndUpdate(
        orderId,
        { payment: true, status: "Order Placed" }, // Update status
        { new: true } // Return the updated order
      );

      if (!updatedOrder) {
        return res
          .status(404)
          .json({ success: false, message: "Order not found" });
      }

      console.log("updated", updatedOrder);

      // 2. Send email to user
      const mailOptions = {
        from: '"Foodeli Demo" <foodeli.demo@gmail.com>',
        to: updatedOrder.address.email, // Use email from address
        subject: `🍔 Order Confirmed (#${orderId})`,
        html: `
    <h2>Hi ${updatedOrder.address.firstName} ${
          updatedOrder.address.lastName
        }, your order is confirmed!</h2>
    <p><strong>Amount Paid:</strong> ₹${updatedOrder.amount}</p>
    <p><strong>Delivery Address:</strong> ${updatedOrder.address.street}, ${
          updatedOrder.address.city
        }</p>
    <h3>Items Ordered:</h3>
    <ul>
      ${updatedOrder.items
        .map(
          (item) => `
        <li>${item.name} × ${item.quantity}</li>
      `
        )
        .join("")}
    </ul>
    <p><em>Note: This is a demo project. No real food will be delivered.</em></p>
    <p>Track your order status <a href="${fronted_url}/orders">here</a>.</p>
  `,
      };

      await transporter.sendMail(mailOptions);

      res.status(200).json({ success: true, message: "Payment successful" });
    } else {
      // Payment failed: Delete the order
      await orderModal.findByIdAndDelete(orderId);
      res.status(200).json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    console.error("Error in verifyOrder:", error);
    res.status(500).json({ success: false, message: "Server error" });
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

    // Emit the updated status to all connected clients
    io.emit("orderStatusUpdated", { orderId, status });

    res.status(200).json({ success: true, message: "Status Updated" }); // 200 OK
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" }); // 500 Internal Server Error
  }
};
