import express from "express";
import cors from "cors";
import contactRoutes from "./routes/contactRoute.js";

const app = express();

// ✅ Allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://blaise101portfolio.vercel.app"
];

// ✅ Proper CORS config (dynamic)
app.use(cors({
  origin: function (origin, callback) {
    // allow requests like Postman or server-to-server (no origin)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("CORS not allowed"));
    }
  },
  methods: ["GET", "POST", "OPTIONS"],
  credentials: true
}));

// ✅ Important for preflight
app.options("*", cors());

app.use(express.json());

// ✅ Routes
app.use("/api/contact", contactRoutes);

export default app;
