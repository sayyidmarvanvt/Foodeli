import express from "express";
import { rateLimit } from "express-rate-limit";
import cors from "cors";
import { connectDB } from "./config/db.js";
import http from "http";
import { Server } from "socket.io";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import dotenv from "dotenv";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import recommendationRouter from "./routes/recomRoute.js.js";

// App config
const app = express();
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "https://foodeli-frontend.onrender.com",
    methods: ["GET", "POST"],
  },
});

const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());
dotenv.config();

// DB connection
connectDB();

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5,
  message: "Too many requests, please try again after 15 minutes",
  skipSuccessfulRequests: true,
  standardHeaders: true,
  legacyHeaders: false,
});

app.set("trust proxy", 3);

// API endpoints
app.use("/api/food", foodRouter);
app.use("/api/user", limiter, userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/recommendations", recommendationRouter);

app.get("/", (req, res) => {
  res.send("Backend is running.");
});

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("A client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("A client disconnected:", socket.id);
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
