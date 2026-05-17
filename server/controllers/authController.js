import bcrypt from "bcrypt";
import db from "../config/db.js";

export const register = async (req, res) => {
  const { Username, Password } = req.body;

  if (!Username || !Password) {
    return res.status(400).json({ message: "Username and Password are required" });
  }

  const hashedPassword = await bcrypt.hash(Password, 10);

  db.query(
    "INSERT INTO users (Username, Password) VALUES (?, ?)",
    [Username, hashedPassword],
    (err) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(409).json({ message: "Username already exists" });
        }

        return res.status(500).json({ message: "Registration failed", error: err.message });
      }

      res.status(201).json({ message: "Registered successfully" });
    }
  );
};

export const login = (req, res) => {
  const { Username, Password } = req.body;

  db.query(
    "SELECT * FROM users WHERE Username = ?",
    [Username],
    async (err, data) => {
      if (err) {
        return res.status(500).json({ message: "Login failed", error: err.message });
      }

      if (data.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const user = data[0];
      const validPassword = await bcrypt.compare(Password, user.Password);

      if (!validPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      req.session.user = {
        UserID: user.UserID,
        Username: user.Username
      };

      res.json(req.session.user);
    }
  );
};

export const logout = (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "Logged out" });
  });
};
