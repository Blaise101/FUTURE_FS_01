import dotenv from 'dotenv';
import app from './app.js';
import transporter from './config/mailer.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  transporter.verify((error, success) => {
    if (error) {
      console.log("❌ Mail error:", error);
    } else {
      console.log("✅ Mail server ready");
    }
  });
  console.log(`Server is running on port ${PORT}`);
});