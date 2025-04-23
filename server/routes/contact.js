const express = require("express");
const router = express.Router();
const sendMail = require("../services/mailServices.js"); // Adjust path based on your folder structure

// POST /api/contact
router.post("/", async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Check if all required fields are provided
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const emailSubject = `We received your message: ${subject}`;
  const emailContent = `
    <h3>Hello ${name},</h3>
    <p>Thank you for reaching out to us.</p>
    <p>We have received your message and will get back to you shortly.</p>
    <hr/>
    <h4>Your Message:</h4>
    <p><strong>Subject:</strong> ${subject}</p>
    <p><strong>Message:</strong> ${message}</p>
    <br/>
    <p>Best regards,<br/>Team Agriveda</p>
  `;

  try {
    // Send the email and await the result
    const success = await sendMail(email, emailContent, emailSubject);

    // If email was successfully sent
    if (success) {
      return res.status(200).json({ success: true, message: "Email sent successfully" });
    } else {
      // If email failed to send
      return res.status(500).json({ success: false, error: "Failed to send email" });
    }
  } catch (error) {
    // Handle errors during email process
    console.error("Email error:", error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
});

module.exports = router;
