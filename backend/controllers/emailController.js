import UserOTPVerification from '../models/otpModel.js';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const sendOTPVerificationEmail = async ({ _id, email }, res) => {
  try {
    const otp = `${Math.floor(1000 + Math.random * 9000)}`;

    const newOTPVerification = await new UserOTPVerification({
      userId: _id,
      otp: otp,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });

    await newOTPVerification.save();

    const accessToken = await oAuth2Client.getAccessToken();

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
        clientId: process.env.CLIENT_ID,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
    await new Promise((resolve, reject) => {
      transporter.verify((error, success) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log('Ready for messages!');
          console.log(success);
          resolve(success);
        }
      });
    });
    
    // transporter.verify((error, success) => {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log('Ready for messages!');
    //     console.log(success);
    //   }
    // });

    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: 'Verify Your Email',
      html: `<p>Enter this <b>${otp}<b> to verify your email address to complete the sign up!</p>
      <p>This code <b>expires in 1 hour</b></p>`,
    };
    await transporter.sendMail(mailOptions);

    res.json({
      status: 'Pending...',
      message: 'Verification OTP email is sent!',
      data: {
        userId: _id,
        email,
      },
    });
  } catch (error) {
    res.json({
      status: 'Failed',
      message: error.message,
    });
  }
};

export default sendOTPVerificationEmail;
