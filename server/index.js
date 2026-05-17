import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";

import db from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import sparepartRoutes from "./routes/sparepartRoutes.js";
import stockinRoutes from "./routes/stockinRoutes.js";
import stockoutRoutes from "./routes/stockoutRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || "secretkey",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false
  }
}));

app.use("/auth", authRoutes);
app.use("/spare-parts", sparepartRoutes);
app.use("/stock-in", stockinRoutes);
app.use("/stock-out", stockoutRoutes);
app.use("/report", reportRoutes);


app.get("/", (req, res) => {
  res.json({ message: "Parachute backend running" });
});


db.getConnection((err, connection) => {
  if (err) {
    console.log("Database connection failed:", err.message);
  } else {
    console.log("MySQL Connected");
    connection.release();
  }
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});