import express from "express";
import cors from "cors";
import clientRoutes from "./routes/clientRoutes.js";
import { query } from "./db.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 API is running... try /api/clients");
});

// ✅ Debugging route
app.get("/testdb", async (req, res) => {
  try {
    const result = await query("SELECT NOW()");
    res.json(result.rows[0]);
  } catch (err) {
    console.error("DB connection failed:", err);
    res.status(500).json({ error: "DB connection failed" });
  }
});

app.use("/api", clientRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
