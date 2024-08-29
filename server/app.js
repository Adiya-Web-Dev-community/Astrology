const express = require("express");
const connectDB = require("./config/dbConnection.js");
const userRoutes = require("./routes/userRoutes.js");
const cors = require("cors");

const app = express();

// Connect to database
connectDB();

// Use CORS middleware
app.use(cors());
// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Something went wrong" });
});

const PORT = process.env.PORT || 5000;

app.get("/", async (req, res) => {
  res.send("ASTROLOGY APP");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
