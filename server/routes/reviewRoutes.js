const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.post("/", protect, reviewController.createReview);

router.get("/astrologer/:astrologerId", reviewController.getAstrologerReviews);

router.put("/:reviewId", protect, reviewController.updateReview);

router.delete(
  "/:reviewId",
  protect,
  authorize("admin"),
  reviewController.deleteReview
);
router.get(
  "/astrologer/:astrologerId/average-rating",
  reviewController.getAstrologerAverageRating
);

module.exports = router;
