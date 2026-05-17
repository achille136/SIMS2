import express from "express";

import {
  getRecord,
  addRecord,
  updateRecord,
  deleteRecord,
} from "../controllers/stockoutController.js";

const router = express.Router();

router.get("/", getRecord);
router.post("/", addRecord);
router.put("/:id", updateRecord);
router.delete("/:id", deleteRecord);

export default router;