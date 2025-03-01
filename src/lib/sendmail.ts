"use server";
import nodemailer from "nodemailer";

// Move sensitive information to environment variables
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

async function sendMail(email: string, feedback: string) {
  try {
    const info = await transporter.sendMail({
      from: `"${email}" <${email}>`, // Use verified sender address
      to: "gowrisankarkalla4@gmail.com",
      subject: "Feedback from SnowDayCalculator",
      text: `From: ${email}\n\nFeedback: ${feedback}`,
      html: `<p><strong>From:</strong> ${email}</p><p><strong>Feedback:</strong> ${feedback}</p>`,
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

export default sendMail;
