const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/authMiddleware");
const {
  getAstrologers,
  getAstrologer,
  createAstrologer,
  createAstrologerWithAccount,
  updateAstrologer,
  deleteAstrologer,
  getAstrologersBySpecialty,
  getTopRatedAstrologers,
  toggleAstrologerAvailability,
} = require("../controllers/astrologerController");

// Public routes
router.get("/", getAstrologers);
router.get("/:id", getAstrologer);
router.get("/specialty/:categoryId", getAstrologersBySpecialty);
router.get("/top-rated", getTopRatedAstrologers);

// Protected routes (require authentication)
router.use(protect);

// Admin only routes
// router.post("/", authorize("admin"), createAstrologer);
router.post("/create", authorize("admin"), createAstrologerWithAccount);
router.put("/:id", authorize("admin"), updateAstrologer);
router.delete("/:id", authorize("admin"), deleteAstrologer);

// Astrologer only routes
router.put(
  "/:id/toggle-availability",
  authorize("astrologer"),
  toggleAstrologerAvailability
);

module.exports = router;
