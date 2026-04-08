import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import 'dotenv/config'
const sendMail = async ({
    email,
    email_type,
    userId,
}) => {
    try {
        const hashed = Math.round(Math.random() * 100000 + 1)
        const hashedPassword = await bcrypt.hash(userId, 10)
        if (email_type === "VERIFY") {
            await User.findOneAndUpdate(
                { _id: userId },
                { otp_token: hashed, otp_expiry: Date.now() + 3600000 }
            );
        } else if (email_type === "FORGOT") {
            await User.findOneAndUpdate(
                { _id: userId },
                { forgotPassword: hashedPassword, forgotPasswordExpiry: Date.now() + 3600000 }
            );
        }

        const transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.MAILTRAP_USERNAME,
                pass: process.env.MAILTRAP_PASSWORD,
            },
        });

        const verifyHtml = `<p><a href='${process.env.DOMAIN}/verifyemail'>Click Here to verify email</a></p> 
        <br><p>token: ${hashed}</p>`;

        const forgotHtml = '<p>Successfully password reset</p>';

        const mailOptions = {
            from: "ammarshaikh50099@gmail.com",
            to: email,
            subject: `${email_type === "VERIFY" ? "Verify Email" : "Forgot Password"}`,
            html: `<p> ${email_type === "VERIFY" ? "click to verify your email" + verifyHtml : "reset your password" + forgotHtml}</p>`,
        };
        const mail = await transport.sendMail(mailOptions);
        return mail;
    } catch (error) {
        console.log(error.message);
    }
};
export default sendMail;
