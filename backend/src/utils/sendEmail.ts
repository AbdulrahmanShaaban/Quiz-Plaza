import nodemailer, { type Transporter } from "nodemailer";
import "../config/env.js";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

let transporter: Transporter | null = null;

function getGmailCredentials(): { user: string; pass: string } {
  const user = process.env.GMAIL_USER?.trim();
  // App passwords are 16 chars; strip spaces whether stored as "xxxx xxxx xxxx xxxx" or quoted
  const pass = process.env.GMAIL_PASS?.replace(/\s/g, "").trim();

  console.log("GMAIL_USER:", process.env.GMAIL_USER);
  console.log("GMAIL_PASS:", process.env.GMAIL_PASS ? "loaded" : "missing");

  if (!user || !pass) {
    throw new Error(
      "GMAIL_USER and GMAIL_PASS must be set in backend/.env (use quotes if the app password contains spaces)."
    );
  }

  return { user, pass };
}

function getTransporter(): Transporter {
  if (!transporter) {
    const { user, pass } = getGmailCredentials();

    transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: { user, pass },
    });
  }

  return transporter;
}

const sendEmail = async ({ to, subject, html }: EmailOptions): Promise<void> => {
  const { user } = getGmailCredentials();

  await getTransporter().sendMail({
    from: `"Quiz App" <${user}>`,
    to,
    subject,
    html,
  });
};

export default sendEmail;
