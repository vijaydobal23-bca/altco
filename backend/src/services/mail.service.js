import nodemailer from "nodemailer";
import dns from "dns";

// Force IPv4 resolution to prevent IPv6 timeouts on Render
dns.setDefaultResultOrder("ipv4first");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GOOGLE_USER,
    pass: process.env.GMAIL_APP_PASS,
  },
  logger: true,
  debug: true,
});

transporter
  .verify()
  .then(() => {
    console.log("Transporter is ready");
  })
  .catch((err) => {
    console.log("Email transporter varification failed", err);
  });

export async function sendEmail({ to, subject, html, text }) {
  const mailOptions = {
    from: process.env.GOOGLE_USER,
    to,
    subject,
    html,
    text,
  };

  const details = await transporter.sendMail(mailOptions);
  console.log("Email sent", details);

  return details;
}
