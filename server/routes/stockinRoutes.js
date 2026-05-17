import express from "express";
import {
  getRecord,
  addRecord
} from "../controllers/stockinController.js";


const router = express.Router();

router.get("/", getRecord);
router.post("/", addRecord);

export default router;
