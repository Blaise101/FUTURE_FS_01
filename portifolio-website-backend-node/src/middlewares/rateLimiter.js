import rateLimit from "express-rate-limit";

export const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
});