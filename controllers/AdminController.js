const bcrypt = require("bcryptjs");
const Student = require("../models/Student");
const Admin = require("../models/Admin");
const SuperAdmin = require("../models/SuperAdmin");


// Store predefined admin credentials (Runs once when server starts)
const storeAdminUserS = async () => {
    try {
        const existingAdmin = await Admin.findOne({ email: "admin@gmail.com" });
        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash("admin", 10);
            const newAdmin = new Admin({
                fullName: "Admin ",
                email: "admin@gmail.com",
                password: hashedPassword,
            });
            await newAdmin.save();
            console.log("✅ Admin user created successfully.");
        }
    } catch (error) {
        console.error("❌ Error storing admin user:", error);
    }
};


module.exports = { storeAdminUserS };  