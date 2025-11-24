import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

async function testEmail(emailUser, emailPass, testName) {
  console.log(`\n🧪 Testing: ${testName}`);
  console.log(`Email: ${emailUser}`);
  console.log(`Pass length: ${emailPass?.length}`);

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    await transporter.verify();
    console.log('✅ Connection successful!');

    const info = await transporter.sendMail({
      from: emailUser,
      to: 'chukwumaisaac23@gmail.com',
      subject: `Test from ${testName}`,
      text: `This is a test email from ${emailUser}`,
    });

    console.log('✅ Email sent successfully!');
    console.log('Message ID:', info.messageId);
    return true;
    
  } catch (error) {
    console.log('❌ Failed:', error.message);
    return false;
  }
}

async function main() {
  console.log('📧 Testing Both Email Configurations...\n');

  // Test current configuration
  const currentWorks = await testEmail(
    process.env.EMAIL_USER, 
    process.env.EMAIL_PASS, 
    'CURRENT SETUP (chukstechservice23)'
  );

  if (!currentWorks) {
    console.log('\n🔧 Suggested fix:');
    console.log('1. Make sure 2FA is enabled for: chukstechservice23@gmail.com');
    console.log('2. Generate App Password for: chukstechservice23@gmail.com');
    console.log('3. OR change EMAIL_USER to: chukwumaisaac23@gmail.com');
  }
}

main();