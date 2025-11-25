import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const createTransporter = () => {
  // Use different configuration for production (Render)
  if (process.env.NODE_ENV === 'production') {
    return nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      // Render-specific settings
      tls: {
        rejectUnauthorized: false,
        ciphers: 'SSLv3'
      },
      connectionTimeout: 30000, // 30 seconds for cloud
      greetingTimeout: 30000,
      socketTimeout: 30000,
      // Retry configuration
      retries: 3,
      retryDelay: 1000
    });
  } else {
    // Development configuration
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }
    });
  }
};

// Test connection with better error handling
export const testTransporter = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('✅ Email transporter is ready');
    return true;
  } catch (error) {
    console.error('❌ Email transporter failed:', error.message);
    return false;
  }
};

export const sendContactNotification = async (contactData) => {
  try {
    console.log('🔧 Attempting to send email on:', process.env.NODE_ENV);
    
    const transporter = createTransporter();
    
    // Test connection with timeout
    const connectionPromise = transporter.verify();
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Connection timeout')), 15000)
    );
    
    await Promise.race([connectionPromise, timeoutPromise]);
    console.log('✅ Email connection verified');

    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.NOTIFICATION_EMAIL,
      replyTo: contactData.email,
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
    console.log('🔧 Attempting to send auto-reply on:', process.env.NODE_ENV);
    
    const transporter = createTransporter();
    
    // Skip connection test for auto-reply to avoid double timeouts
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
        </div>
      `,
    };

    // Send without verification for auto-reply
    await transporter.sendMail(mailOptions);
    console.log('✅ Auto-reply email sent to user');
  } catch (error) {
    console.error('❌ Failed to send auto-reply email:', error.message);
    // Don't throw for auto-reply failures
  }
};