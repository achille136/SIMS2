import express from "express";
import {
  getSpareParts,
  addSparePart,
} from "../controllers/sparepartController.js";

const router = express.Router();

router.get("/", getSpareParts);
router.post("/", addSparePart);

export default router;
