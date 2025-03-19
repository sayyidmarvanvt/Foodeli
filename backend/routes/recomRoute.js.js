import express from "express";
import { getRecommendations } from "../controllers/recommendationsController.js";

const recommendationRouter = express.Router();

recommendationRouter.post("/", getRecommendations);

export default recommendationRouter;
