import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Use TLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Rest of your email functions remain the same...
export const sendContactNotification = async (contactData) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.NOTIFICATION_EMAIL,
      replyTo: contactData.email, // So you can reply directly to the sender
      subject: `New Contact: ${contactData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">📧 New Contact Form Submission</h2>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 5px;">
            <p><strong>👤 Name:</strong> ${contactData.name}</p>
            <p><strong>📧 Email:</strong> ${contactData.email}</p>
            <p><strong>📝 Subject:</strong> ${contactData.subject}</p>
            <p><strong>💬 Message:</strong></p>
            <div style="background: white; padding: 15px; border-left: 4px solid #007bff; margin-top: 10px;">
              ${contactData.message.replace(/\n/g, '<br>')}
            </div>
            <p><strong>🕒 Submitted:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>🌐 IP Address:</strong> ${contactData.ipAddress}</p>
          </div>
        </div>
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Contact notification email sent successfully');
    return result;
  } catch (error) {
    console.error('❌ Failed to send contact notification email:', error.message);
    throw error;
  }
};

export const sendAutoReply = async (userEmail, userName) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"Chukwuma" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: 'Thank you for contacting me!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Thank You for Reaching Out!</h2>
          <p>Hi ${userName},</p>
          <p>Thank you for getting in touch with me through my portfolio website. I have received your message and will review it shortly.</p>
          <p>I typically respond within 24-48 hours.</p>
          <p>Best regards,<br><strong>Chukwuma</strong></p>
          <hr style="margin: 20px 0;">
          <p style="font-size: 12px; color: #666;">
            This is an automated response. Please do not reply to this email.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Auto-reply email sent to user');
  } catch (error) {
    console.error('❌ Failed to send auto-reply email:', error.message);
  }
};

