import express from "express";
import cors from "cors";
import contactRoutes from "./routes/contactRoute.js"

const app = express();

app.use(cors({
  origin: "https://blaise101portfolio.vercel.app",
  methods: ["GET", "POST"],
  credentials: true
  // origin: "http://localhost:5173",
}));

app.use(express.json());
app.use("/api/contact", contactRoutes)

export default app;