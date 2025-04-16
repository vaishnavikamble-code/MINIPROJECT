const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("./config/db"); // Import database connection function
const authRoutes = require("./routes/authRoutes"); // Import authentication routes
const cors = require("cors"); // Add CORS support
const { storeAdminUser }=require("./controllers/SuperAdminController")
const { storeAdminUserS }=require("./controllers/AdminController")



dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS for all routes

// Store predefined admin user when server starts
storeAdminUser();

storeAdminUserS();


// Connect to MongoDB with error handling
connectDB().catch(err => {
    console.error("❌ Failed to connect to MongoDB:", err);
    process.exit(1);
});

// Routes
app.use("/api/auth", authRoutes);

// Default route
app.get("/", (req, res) => {
    res.send("Welcome to the College Management System API!");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error("❌ Server Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('❌ Unhandled Promise Rejection:', err);
    // Close server & exit process
    process.exit(1);
});


