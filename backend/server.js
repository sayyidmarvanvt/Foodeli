import express from "express";
import { rateLimit } from "express-rate-limit";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import dotenv from "dotenv";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

//app config
const app = express();
const port = 4000;

//middleware
app.set("trust proxy", true);
app.use(express.json());
app.use(cors());

dotenv.config();

// db connection
connectDB();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5,
  message: {
    message: "Too many requests from this IP, please try again later.",
  },
  handler: function (req, res /*next*/) {
    return res.status(429).json({
      error: "You sent too many requests. Please wait a while then try again",
    });
  },
  skipSuccessfulRequests: true,
});

//api endpoints
app.use("/api/food", foodRouter);
app.use("/api/images", express.static("uploads"));
app.use("/api/user", limiter, userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("Backend is running.");
});

app.listen(port, () => {
  console.log(`Server Strarted on http://localhost:${port}`);
});
