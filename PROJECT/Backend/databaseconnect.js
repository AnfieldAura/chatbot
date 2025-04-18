const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5501; // Port number

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = "mongodb://localhost:27017/studentDB"; // Database name is 'studentDB'
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));

// Define a Mongoose Schema and Model
const studentSchema = new mongoose.Schema({
    name: { type: String },
    department: { type: String },
    tempId: { type: String },
    rememberedFor: { type: String },
    rollNumber: { type: String, required: true },
    password: { type: String, required: true }
});

// Explicitly specify the collection name as "Student"
const Student = mongoose.model("Student", studentSchema, "Student");

// Root Route
app.get("/", (req, res) => {
    res.send("Welcome to the API! Use /api/login to access the login endpoint.");
});

// API Endpoint for Login using Roll Number
app.post("/api/login", async (req, res) => {
    const { rollNumber, password } = req.body;

    if (!rollNumber || !password) {
        console.log("Missing rollNumber or password in the request body.");
        return res.status(400).json({ error: "Roll number and password are required" });
    }

    try {
        console.log("Searching for roll number:", rollNumber.trim());
        const student = await Student.findOne({ rollNumber: rollNumber.trim() });

        if (!student) {
            console.log("Roll number not found in the database.");
            return res.status(404).json({ error: "Roll number not found" });
        }

        if (student.password !== password) {
            console.log("Invalid password for roll number:", rollNumber);
            return res.status(401).json({ error: "Invalid password" });
        }

        console.log("Login successful for roll number:", rollNumber);
        res.json({ message: "Login successful", student });
    } catch (err) {
        console.error("Error during login:", err.stack);
        res.status(500).json({ error: "Server error", details: err.message });
    }
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});