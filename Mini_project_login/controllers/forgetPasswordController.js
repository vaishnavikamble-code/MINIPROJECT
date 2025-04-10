// const Student = require('../models/Student');
// const Admin = require('../models/Admin');
// const SuperAdmin = require('../models/SuperAdmin');
// const bcrypt = require('bcryptjs'); 
// const jwt = require('jsonwebtoken');
// const { sendEmail } = require('../services/emailService');

// // ✅ Function to find user by role
// const getUserByEmail = async (email) => {
//     let user = await SuperAdmin.findOne({ email });
//     if (user) return { user, role: "superAdmin" };

//     user = await Admin.findOne({ email });
//     if (user) return { user, role: "admin" };

//     user = await Student.findOne({ email });
//     if (user) return { user, role: "student" };

//     return null;
// };

// // ✅ Send OTP
// exports.sendOTP = async (req, res) => {
//     const { email } = req.body;

//     try {
//         const result = await getUserByEmail(email);
//         if (!result) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         const { user, role } = result;

//         // Generate OTP
//         const otp = `${Math.floor(100000 + Math.random() * 900000)}`;
//         user.otp = otp;
//         user.otpExpire = Date.now() + 5 * 60 * 1000;

//         await user.save();

//         // Send OTP email
//         await sendEmail(
//             email,
//             'Password Reset OTP',
//             `Your OTP is: <b>${otp}</b>. It expires in 5 minutes.`
//         );

//         console.log(`✅ OTP sent to ${role}: ${otp}`);
//         res.status(200).json({ message: `OTP sent successfully to ${role}` });

//     } catch (error) {
//         console.error('❌ Error sending OTP:', error);
//         res.status(500).json({ message: 'Server error', error });
//     }
// };


// // // ✅ Verify OTP & Reset Password
// // exports.verifyOTPAndResetPassword = async (req, res) => {
// //     const { email, otp, newPassword } = req.body;

// //     try {
// //         const result = await getUserByEmail(email);
// //         if (!result) {
// //             return res.status(404).json({ message: 'User not found' });
// //         }

// //         const { user, role } = result;

// //         console.log("Validating OTP...");

// //         // ✅ Improved OTP validation with type conversion
// //         if (!user || user.otp != otp || Date.now() > user.otpExpire) {
// //             return res.status(400).json({ message: 'Invalid or expired OTP' });
// //         }

// //         // ✅ Password hashing with error handling
// //         try {
// //             const salt = await bcrypt.genSalt(10);
// //             user.password = await bcrypt.hash(newPassword, salt);
// //         } catch (hashError) {
// //             console.error('❌ Error hashing password:', hashError);
// //             return res.status(500).json({ message: 'Failed to hash password' });
// //         }

// //         // ✅ Clear OTP fields
// //         user.otp = undefined;
// //         user.otpExpire = undefined;

// //         await user.save();

// //         console.log(`✅ Password reset successfully for ${role}`);
// //         res.status(200).json({ message: `Password reset successfully for ${role}` });

// //     } catch (error) {
// //         console.error('❌ Error verifying OTP:', error);
// //         res.status(500).json({ message: 'Server error', error });
// //     }
// // };


// // ✅ Verify OTP and Reset Password
// exports.verifyOTPAndResetPassword = async (req, res) => {
//     const { email, otp, newPassword } = req.body;

//     try {
//         const result = await getUserByEmail(email);
        
//         if (!result) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         const { user, role } = result;

//         console.log(`Validating OTP for: ${email}`);

//         // ✅ Improved OTP validation with explicit type conversion
//         if (!user || `${user.otp}` !== `${otp}` || Date.now() > user.otpExpire) {
//             return res.status(400).json({ message: 'Invalid or expired OTP' });
//         }

//         // ✅ Hash the new password properly
//         const salt = await bcrypt.genSalt(10);
//         user.password = await bcrypt.hash(newPassword, salt);

//         // ✅ Clear OTP fields
//         user.otp = undefined;
//         user.otpExpire = undefined;

//         // ✅ Save the user with the new password
//         await user.save();

//         console.log(`✅ Password reset successfully for ${role}`);
//         res.status(200).json({ message: `Password reset successfully for ${role}` });

//     } catch (error) {
//         console.error('❌ Error resetting password:', error);
//         res.status(500).json({ message: 'Server error', error });
//     }
// };



// exports.loginUser = async (req, res) => {
//     const { email, password } = req.body;

//     console.log(`📩 Incoming Request - Email: ${email}, Password: ${password}`);

//     if (!email || !password) {
//         console.log('❌ Missing fields');
//         return res.status(400).json({ message: 'All fields are required' });
//     }

//     try {
//         let user = await SuperAdmin.findOne({ email }) ||
//                    await Admin.findOne({ email }) ||
//                    await Student.findOne({ email });

//         if (!user) {
//             console.log(`❌ User not found for: ${email}`);
//             return res.status(400).json({ message: 'Invalid email or password' });
//         }

//         console.log(`✅ User found: ${user.email}`);
//         console.log(`🔑 Hashed password in DB: ${user.password}`);

//         // ✅ Compare the password
//         const isMatch = await bcrypt.compare(password, user.password);
//         console.log(`🔍 Password Comparison Result: ${isMatch}`);

//         if (!isMatch) {
//             console.log(`❌ Password mismatch for: ${email}`);
//             return res.status(400).json({ message: 'Invalid email or password' });
//         }

//         // ✅ Generate JWT token
//         const token = jwt.sign(
//             { id: user._id, role: user.role },
//             process.env.JWT_SECRET,
//             { expiresIn: '1h' }
//         );

//         console.log(`✅ Login successful for: ${email}`);
//         res.status(200).json({ message: 'Login successful', token, role: user.role });

//     } catch (error) {
//         console.error('❌ Error in Login:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };