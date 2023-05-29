import UserOTPVerification from '../models/otpModel.js';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import dotenv from 'dotenv';
import User from '../models/userModel.js'
dotenv.config();

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

export const sendOTPVerificationEmail = async ({ _id, email }, res) => {
  try {
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log(otp)
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
        clientSecret: process.env.CLIENT_SECRET,
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

    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: 'Verify Your Email',
      html: `<h1>Welcome to APEXMall! <br/>Confirm your new account on <i>ApexMall</i></h1><p>
      To check you're a real person and not a bot, we need to confirm this is a real email address. Enter this <b>${otp}</b> to verify your email address to complete the sign up!</p>
      <p>This code <i>expires in 1 hour</i></p>`,
    };
    await transporter.sendMail(mailOptions);
    console.log('Email sent');
    // res.json({
    //   status: 'Pending...',
    //   message: 'Verification OTP email is sent!',
    //   data: {
    //     userId: _id,
    //     email,
    //   },
    // });
  } catch (error) {
    console.log(error.message);
  }
};

export const verifyOTP = async (req, res) => {
  try {
    let { userId, otp } = req.body;
    console.log(userId, otp);
    if (!userId || !otp) {
      throw Error('Empty otp details are not allowed!');
    } else {
      const UserOTPVerificationRecords = await UserOTPVerification.find({
        userId,
      });
      if (UserOTPVerificationRecords.length <= 0) {
        throw new Error(
          "Account record doesn't exist or has been verified already. Please sign up or log in!"
        );
      } else {
        const { expiresAt, otp } = UserOTPVerificationRecords[0];
        if (expiresAt < Date.now()) {
          await UserOTPVerification.deleteMany({ userId });
          throw new Error('Code has expired. Please request again.');
        } else {
          if (!otp) {
            throw new Error('Invalid code passed. Check your inbox!');
          } else {
            await User.updateOne({ _id: userId }, { verified: true });
            console.log('verified')
            // await UserOTPVerification.deleteMany({ userId });
            res.json({
              status: 'Verified',
              message: 'User email verified successfully.',
            });
          }
        }
      }
    }
  } catch (error) {
    res.json({
      status: 'Not Verified. Failed.',
      message: error.message,
    });
  }
};
