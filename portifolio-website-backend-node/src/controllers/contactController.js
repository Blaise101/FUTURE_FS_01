export const submitContact = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Name, email, and message are required."
    });
  }

  try {
    console.log("New Contact Message:");
    console.log({ name, email, subject, message });

    return res.status(200).json({
      success: true,
      message: "Message received successfully."
    })
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later."
    })
  }
}