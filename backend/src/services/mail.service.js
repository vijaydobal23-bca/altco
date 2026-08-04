import nodemailer from "nodemailer";
import dns from "dns";

// Force IPv4 resolution to prevent IPv6 issues on Render
dns.setDefaultResultOrder("ipv4first");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,

  auth: {
    user: process.env.GOOGLE_USER,
    pass: process.env.GMAIL_APP_PASS,
  },

  logger: true,
  debug: true,

  tls: {
    rejectUnauthorized: false,
  },
});

transporter
  .verify()
  .then(() => {
    console.log("Transporter is ready");
  })
  .catch((err) => {
    console.log("Email transporter verification failed", err);
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