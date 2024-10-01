import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({
    path:'../.env'
})
const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.SERVER_EMAIL,
        pass:process.env.SERVER_EMAIL_PASS
    }
})


const sendOTP=async(email,otp)=>{
    try{
        const mailOptions=
        {
            from:process.enev.SERVER_EMAIL,
            to:email,
            subject:"Email verification , User this OTP to verify",
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
              <p style="font-size: 16px;">Hi there,</p>
      
              <p style="font-size: 16px;">
                We received a request to reset your password. If you made this request, please enter the following verification code in the application to proceed:
              </p>
      
              <div style="text-align: center; margin: 30px 0;">
                <h1 style="font-size: 36px; color: #4CAF50; letter-spacing: 5px; margin: 0;">${otp}</h1>
              </div>
      
              <p style="font-size: 16px; color: #555;">
                <strong>Note:</strong> This code will expire in 5 minutes. If you did not request a password reset, please ignore this email.
              </p>
      
              <p style="font-size: 16px;">
                Best regards,<br/>
                Doctor Appointment System
              </p>
      
              <p style="font-size: 12px; color: #999;">
                If you have any questions or need further assistance, please contact our support team.
              </p>
            </div>
            `,
            
          
        }
        const info=await transporter.sendMail(mailOptions)
        return { success: true, message: 'Email sent successfully' };
    }
    catch(err){
        return { success: false, message: 'Email could not be sent', error: err.message };
    }
}

export {sendOTP}
