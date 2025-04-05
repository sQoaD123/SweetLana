const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = 5000 || process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
  },
});

app.post("/api/contact", (req, res) => {
  const { name, tel, products, message } = req.body;

  if (!name || !tel || !products || !message) {
    return res.status(400).json({ error: "Всі поля повинні бути заповнені!" });
  }

  const adminHtml = `
  <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Phone:</strong> ${tel}</p>
    <p><strong>Product:</strong> ${products}</p>
    <p><strong>Phone:</strong></p>
    <p>${message}</p>
  </div>
  `;

  const adminMailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `${subject}`,
    html: adminHtml,
  };

  transporter.sendMail(adminMailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email to admin:", error);
      return res.status(500).json({ error: "Failed to send email to admin" });
    }

    console.log("Admin email sent:", info.response);
  });
});

app.listen(PORT, () => {
  console.log(`Server is Running on http://localhost:${PORT}`);
});
