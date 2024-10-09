const express = require("express");
const {
  createCallHistory,
  getCallHistory,
  updateCallHistory,
  deleteCallHistory,
} = require("../controllers/callHistoryController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router
  .route("/call-history")
  .post(protect, createCallHistory) // POST: Create call history
  .get(protect, getCallHistory); // GET: Get call history

router
  .route("/call-history/:id")
  .put(protect, updateCallHistory) // PUT: Update call history
  .delete(protect, deleteCallHistory); // DELETE: Delete call history

module.exports = router;
