const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5501;

// Middleware
app.use(cors({
  origin: ["https://chatbott-six.vercel.app"], // Replace with your actual Vercel URL
  credentials: true
}));
app.use(express.json());

// MongoDB Connection
const mongoURI = "mongodb+srv://admin:admin123@studentdb.cc5j39j.mongodb.net/?retryWrites=true&w=majority&appName=StudentDB";
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// Schema and Model
const studentSchema = new mongoose.Schema({
  name: String,
  department: String,
  tempId: String,
  rememberedFor: String,
  rollNumber: { type: String, required: true },
  password: { type: String, required: true },
});
const Student = mongoose.model("StudentDB", studentSchema, "rno");

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the API! Use /api/login to access the login endpoint.");
});

app.post("/api/login", async (req, res) => {
  const { rollNumber, password } = req.body;

  if (!rollNumber || !password) {
    return res.status(400).json({ error: "Roll number and password are required" });
  }

  const trimmedRoll = rollNumber.trim().toUpperCase();
  console.log("Searching for roll number:", trimmedRoll);

  try {
    const student = await Student.findOne({ rollNumber: trimmedRoll });

    if (!student) {
      console.log("Roll number not found in the database.");
      return res.status(404).json({ error: "Roll number not found" });
    }

    if (student.password !== password) {
      console.log("Invalid password for roll number:", trimmedRoll);
      return res.status(401).json({ error: "Invalid password" });
    }

    console.log("Login successful for roll number:", trimmedRoll);
    res.json({ message: "Login successful", student });
  } catch (err) {
    console.error("Error during login:", err.stack);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find({}, { name: 1, rollNumber: 1, _id: 0 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});