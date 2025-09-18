import express from 'express';
import cors from 'cors';
import clientRoutes from "./routes/clientRoutes.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 API is running... try /api/clients");
});

// No authentication middleware, just use the routes directly
app.use('/api', clientRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
