import nodemailer from "nodemailer";

type EmailOptions = {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  auth: {
    user: "mszulfiqarkhan@gmail.com",
    pass: "pfzoqufirgtajeko",
  },
});


export async function sendEmailFunction({ to, subject, html, text }: EmailOptions) {
  await transporter.sendMail({
    from: `"Better Auth" <${process.env.SMTP_EMAIL}>`,
    to,
    subject,
    html,
    text
  });
}