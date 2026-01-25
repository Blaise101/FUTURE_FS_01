import express from "express";
import cors from "cors";
import contactRoutes from "./routes/contactRoute.js"

const app = express();

app.use(cors({
  origin: "http://localhost:5173", // Vite default port
}))

app.use(express.json());
app.use("/api/contact", contactRoutes)

export default app;