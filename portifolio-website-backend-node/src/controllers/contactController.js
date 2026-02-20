import transporter from "../config/mailer.js";

export const submitContact = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Name, email, and message are required."
    });
  }

  try {

    await transporter.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_FROM,
      subject: subject || "New Portfolio Message",
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    })

    // Auto-reply to sender
    await transporter.sendMail({
      from: `"Blaise Izerimana" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thanks for reaching out!",
      html: `
        <p>Hi ${name},</p>
        <p>Thanks for contacting me. I’ve received your message and will get back to you soon.</p>
        <br />
        <p>— Blaise</p>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Message received successfully."
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to send message."
    })
  }
}