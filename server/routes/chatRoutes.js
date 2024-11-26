const express = require("express");
const { getChatHistory } = require("../controllers/sessionController");
const router = express.Router();


// Routes
router.get("/", getChatHistory); // Get chat history for astrologer or client
router.post("/", createChatMessage); // Create a new chat message
router.put("/:chatId", updateChatDetails); // Update earnings, payment, and status

module.exports = router;
