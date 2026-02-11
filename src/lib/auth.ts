import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
 import nodemailer from "nodemailer";
 
 const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user:  process.env.APP_USER ,
    pass: process.env.APP_PASS ,
  },
});
 
 
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    trustedOrigins:[process.env.FRONTEND_URL!],
     user: {
       additionalFields: {
          role: {
              type: "string",
               defaultValue: "user",
               required: false,
            } ,
            isBanned:{
                type: "boolean",
                defaultValue: false,
                required: false,

            },
            phone:{
                type: "string",
                required: false,
            },
             address:{
                type: "string",
                required: false,
             }
        }
    },
      emailAndPassword: { 
    enabled: true, 
    autoSignIn:false,
    requireEmailVerification:true,

  },
 emailVerification: {
  sendOnSignUp:true,

    sendVerificationEmail: async ( { user, url, token }, request) => {
    
    try{
           const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

const info = await transporter.sendMail({
  from: '"MediStore 💊" <no-reply@medistore.com>',
  to: user.email,
  subject: "Verify Your Email - MediStore",
  text: `Verify your email by clicking this link: ${verificationUrl}`,
  html: `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Email Verification</title>
  </head>
  <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f4f6f8;">
    <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; margin:40px auto; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 10px rgba(0,0,0,0.05);">
      
      <!-- Header -->
      <tr>
        <td style="background-color:#1e3a8a; padding:20px; text-align:center;">
          <h1 style="color:#ffffff; margin:0;">MediStore 💊</h1>
          <p style="color:#dbeafe; margin:5px 0 0;">Your Trusted Online Medicine Shop</p>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding:30px;">
          <h2 style="color:#111827; margin-top:0;">Verify Your Email Address</h2>
          <p style="color:#4b5563; line-height:1.6;">
          Hello ${user.name},<br/><br/>
            Thank you for registering with MediStore. Please confirm your email address by clicking the button below.
          </p>

          <!-- Button -->
          <div style="text-align:center; margin:30px 0;">
            <a href="${verificationUrl}" 
               style="background-color:#2563eb; color:#ffffff; padding:14px 28px; text-decoration:none; border-radius:6px; font-weight:bold; display:inline-block;">
              Verify Email
            </a>
          </div>

          <p style="color:#6b7280; font-size:14px;">
            If the button above does not work, copy and paste this link into your browser:
          </p>

          <p style="word-break:break-all; color:#2563eb; font-size:14px;">
            ${verificationUrl}
          </p>

          <p style="color:#6b7280; font-size:14px; margin-top:30px;">
            If you did not create an account, you can safely ignore this email.
          </p>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background-color:#f9fafb; padding:20px; text-align:center; font-size:12px; color:#9ca3af;">
          © ${new Date().getFullYear()} MediStore. All rights reserved.
        </td>
      </tr>
    </table>
  </body>
  </html>
  `
});


  console.log("Message sent:", info.messageId);
    }
    catch(error){
      alert("Error sending email: " + error);
    }
    },
  },  
});