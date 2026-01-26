import dotenv from "dotenv";
dotenv.config(); // MUST be first line

import app from "./app.js";
import transporter from "./config/mailer.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

  transporter.verify((err, success) => {
    if (err) {
      console.error("❌ SMTP ERROR:", err);
    } else {
      console.log("✅ SMTP READY (Gmail app password working)");
    }
  });
});