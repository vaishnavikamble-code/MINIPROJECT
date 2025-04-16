// const nodemailer = require('nodemailer');
// const dotenv = require('dotenv');

// dotenv.config();

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//     }
// });

// // ✅ Function to send email
// const sendEmail = async (email, subject, message) => {
//     try {
//         await transporter.sendMail({
//             from: `"Admin" <${process.env.EMAIL_USER}>`,
//             to: email,
//             subject: subject,
//             html: `<p>${message}</p>`
//         });
//         console.log(`📩 Email sent successfully to ${email}`);
//     } catch (error) {
//         console.error('❌ Error sending email:', error);
//         throw new Error('Failed to send email');
//     }
// };

// module.exports = { sendEmail };
