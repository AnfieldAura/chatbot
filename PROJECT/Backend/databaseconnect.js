const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5501; // Port number

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = "mongodb+srv://admin:admin123@studentdb.cc5j39j.mongodb.net/?retryWrites=true&w=majority&appName=StudentDB"; // Database name is 'studentDB'
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

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
const Student = mongoose.model("StudentDB", studentSchema, "rno");

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

// API Endpoint to Fetch Name and Roll Number
app.get("/api/students", async (req, res) => {
    try {
        const students = await Student.find({}, { name: 1, rollNumber: 1, _id: 0 }); // Fetch only name and rollNumber
        res.json(students);
    } catch (err) {
        console.error("Error fetching students:", err.stack);
        res.status(500).json({ error: "Server error", details: err.message });
    }
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});