const express = require("express");
const {
  createCallHistory,
  getCallHistory,
  updateCallHistory,
  deleteCallHistory,
} = require("../controllers/callHistoryController");
const { protect } = require("../middleware/authMiddleware");
const { initiateCall, endCall, handleMissedCall } = require("../helpers/callHandlers");

const router = express.Router();



router.post('/initiate',protect, initiateCall);
router.post('/end', protect,endCall);
router.post('/missed', protect,handleMissedCall);

router.use(protect);

router
  .route("/call-history")
  .post( createCallHistory) // POST: Create call history
  .get(getCallHistory); // GET: Get call history

router
  .route("/call-history/:id")
  .put( updateCallHistory) // PUT: Update call history
  .delete( deleteCallHistory); // DELETE: Delete call history

module.exports = router;
