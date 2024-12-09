const express = require("express");

const { createChatMessage, updateChatDetails, getChatHistory } = require("../controllers/chatController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();


// Routes
router.get("/:sessionId", getChatHistory); // Get chat history for astrologer or client
router.post("/", protect, createChatMessage); // Create a new chat message
router.put("/:chatId", updateChatDetails); // Update earnings, payment, and status

module.exports = router;
