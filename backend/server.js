require("dotenv").config();

const express = require("express");
const cors = require("cors");

// Existing Email Route
const sendEmailRoute = require("./routes/sendEmail");

// NEW AI Route
const aiRoutes = require("./routes/aiRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Attendance Backend is Running 🚀");
});

// Existing Routes
app.use("/api", sendEmailRoute);

// NEW AI Route
app.use("/api/ai", aiRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});