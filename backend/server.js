import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import dotenv from "dotenv";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import bulkUploadImages from "./bulk.js";


//app config
const app = express();
const port = 4000;

//middleware
app.use(express.json());
app.use(cors());

dotenv.config();

console.log(process.env.CLOUDINARY_CLOUD_NAME);

// db connection
connectDB();

bulkUploadImages();

//api endpoints
app.use("/api/food", foodRouter);
app.use("/api/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("Backend is running.");
});

app.listen(port, () => {
  console.log(`Server Strarted on http://localhost:${port}`);
});
