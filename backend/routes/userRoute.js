import express from "express";
import { loginUser, registerUser,googleUser } from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.post("/google",googleUser)

export default userRouter;