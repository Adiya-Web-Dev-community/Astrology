const express = require("express");
const connectDB = require("./config/dbConnection.js");
const userRoutes = require("./routes/userRoutes.js");
const categoryRoutes = require("./routes/categoryRoutes.js");
const blogRoutes = require("./routes/blogRoutes.js");
const astrologerRoutes = require("./routes/astrologerRoutes.js");
const reviewRoutes = require("./routes/reviewRoutes.js");
const favoriteAstrologerRoutes = require("./routes/favoriteAstrologerRoutes");
const horoscopeRoutes = require("./routes/FreeServices/HoroscopeRoutes.js");
const cors = require("cors");

const app = express();

// Connect to database
connectDB();

// Use CORS middleware
app.use(cors());
// Middleware
app.use(express.json());

// Routes
app.use("/api/blogs", blogRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/astrologers", astrologerRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/favoriteAstrologer", favoriteAstrologerRoutes);
app.use("/api/free-services", horoscopeRoutes);

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
