import express from "express";
import cors from "cors";
import appRoutes from "./routes/apps.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/apps", appRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Server Error",
    error: process.env.NODE_ENV === "production" ? {} : err,
  });
});

const PORT = 3001;
app.listen(PORT, () => console.log("Running on " + PORT));
