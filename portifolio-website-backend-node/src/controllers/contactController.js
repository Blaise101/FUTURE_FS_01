import transporter from "../config/mailer.js";

// Escape HTML to prevent injection
const escapeHTML = (str) =>
  str.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[char]));

// Validate email format
const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const submitContact = async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Name, email, and message are required."
    });
  }

  // Email format validation
  if (!isValidEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email address.",
    });
  }

  // Sanitize inputs
  const safeName = escapeHTML(name);
  const safeEmail = escapeHTML(email);
  const safeMessage = escapeHTML(message);
  const safeSubject = subject
    ? escapeHTML(subject)
    : "New Portfolio Message";

  try {

    // Send message to you (admin)
    await transporter.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: safeSubject,
      text: `
        Name: ${safeName}
        Email: ${safeEmail}
        Message: ${safeMessage}
      `,
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `,
    });

    // Auto-reply to sender
    await transporter.sendMail({
      from: `"Blaise Izerimana" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thanks for reaching out!",
      text: `Hi ${safeName}, Thanks for contacting me. I’ll get back to you soon.`,
      html: `
        <p>Hi ${safeName},</p>
        <p>Thanks for contacting me. I’ve received your message and will get back to you soon.</p>
        <br />
        <p>— Blaise</p>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Message received successfully.",
    });

  } catch (error) {
    console.error("Email Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};