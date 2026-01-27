import express from "express";
import cors from "cors";
import contactRoutes from "./routes/contactRoute.js"

const app = express();

app.use(cors({
  origin: "https://future-fs-01-ebrq.onrender.com/", // Vite default port
}))

app.use(express.json());
app.use("/api/contact", contactRoutes)

export default app;