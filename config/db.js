const mongoose = require("mongoose");
require("dotenv").config(); //  .env is loaded

const DATABASE_URL = process.env.DATABASE_URL; 

// MongoDB Connection with college Databases defined in .env file 

const connectDB = async () => {
    try {
        if (!DATABASE_URL) {
            throw new Error("DATABASE_URL is not defined in .env file");
        }

        await mongoose.connect(DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1);
    }
};

module.exports = connectDB;
