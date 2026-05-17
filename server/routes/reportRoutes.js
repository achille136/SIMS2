import express from "express";
import { getDailyStockOut, getStockStatus } from "../controllers/reportController.js";

const router = express.Router();

router.get("/daily-stockout", getDailyStockOut);

router.get("/stock-status", getStockStatus);

export default router;