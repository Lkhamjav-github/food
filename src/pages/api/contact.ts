import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Use Gmail's SMTP server
  port: 587, // Port for secure SMTP
  secure: false, // Set to true if using port 465
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your app password or email password
  },
});

// API handler for sending emails
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    // Validate the input data (you can add more checks as needed)
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    try {
      await transporter.sendMail({
        from: `${name} <${email}>`, // Use the user's email as the sender
        to: process.env.EMAIL_RECEIVER, // Your receiving email address
        subject: `Contact Form Submission from ${name}`,
        text: message, // Plain text body
        html: `<p>${message}</p>`, // HTML body
      });
      res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
      console.error("Error sending email:", error); // Log the error for debugging
      res.status(500).json({ error: "Error sending email." });
    }
  } else {
    res.setHeader("Allow", ["POST"]); // Specify allowed methods
    res.status(405).end(`Method ${req.method} Not Allowed`); // Handle invalid method
  }
};

export default handler;
