import nodeMailer from "nodemailer";
import { Request } from "express";
import dotenv from "dotenv";
dotenv.config();

export default class NodeMailerConfig {
  transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MANGER,
      pass: process.env.MANGER_PASSWORD,
    },
  });
  sendMail = (
    route: string,
    username: string,
    email: string,
    emailToken: string,
    host: any
  ) => {
    const mailOptions = {
      from: `"S.W.W"<${process.env.MANGER}>`,
      to: email,
      subject: `Verify your email please`,
      html: `<h1>Welocme to S.W.W <h1>
             <h2>Dear ${username} thank you for signing up !</h2>
             <h4>Please verify your mail to continue ...</h4>
             <a href="http://${host}/auth/${route}?token=${emailToken}" > Verify </a>
            `,
    };
    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return error;
      } else {
        return console.log("con");
      }
    });
  };
  sendMailForInterview = (
    // route: string,
    // username: string,
    companyName: string,
    jop: string,
    scheduledTimes: string[],
    emails: string[],
    // host: any
  ) => {
    const mailOptions = {
      from: `"S.W.W"<${process.env.MANGER}>`,
      bcc: emails.join(","),
      subject: "Interview Schedule",
      html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Interview Schedule</h2>
        <p>Hello,</p>
        <p>You have been selected for an interview for the following position:</p>
        <p><strong>Company Name:</strong> ${companyName}</p>
        <p><strong>Job Title:</strong> ${jop}</p>
        <p>Please choose a suitable time slot from the available options below:</p>
        <ul>
          ${scheduledTimes
            .map(
              (time, index) => `
                <li>${index + 1} - ${time}</li>
              `
            )
            .join("")}
        </ul>
        <p>Please choose the time that works best for you.</p>
        <p>Thank you, and we look forward to seeing you at the interview.</p>
      </div>
    `,
    };
    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return error;
      } else {
        return console.log("con");
      }
    });
  };
}
