const Chat = require("../models/chatModel");
const Session = require("../models/sessionModel");
const userModel = require("../models/userModel");


// exports.getChatHistory = async (req, res, next) => {
//   try {
//     const { limit = 10, offset = 0, sessionType } = req.query;
//     const filter = {};

//     // Check user role and set filter accordingly
//     if (req.user.role === "astrologer") {
//       filter["sessionId.astrologerId"] = req.user._id;
//     } else if (req.user.role === "customer") {
//       filter["sessionId.clientId"] = req.user._id;
//     } else {
//       return res.status(403).json({
//         success: false,
//         message: "User role is not authorized to access this route",
//       });
//     }

//     // Optionally filter by session type if provided
//     if (sessionType) filter["sessionId.sessionType"] = sessionType;

//     // Fetch chat history with session details
//     const chatHistory = await Chat.find(filter)
//       .populate({
//         path: "sessionId",
//         select: "sessionType startTime endTime chargePerMinute totalCharge status",
//         populate: [
//           { path: "astrologerId", select: "firstName lastName" },
//           { path: "clientId", select: "firstName lastName" },
//         ],
//       })
//       .skip(Number(offset))
//       .limit(Number(limit))
//       .sort({ sentAt: -1 });

//     res.status(200).json({
//       success: true,
//       count: chatHistory.length,
//       data: chatHistory,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// Fetch chat history
exports.getChatHistory = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const chatHistory = await Chat.find({ sessionId }).sort({ createdAt: 1 });
    res.status(200).json({ success: true, data: chatHistory });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching chat history" });
  }
};


exports.updateChatDetails = async (req, res, next) => {
  try {
    const { earnings, paid, status } = req.body;
    const chatId = req.params.chatId;

    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { earnings, paid, status },
      { new: true, runValidators: true }
    );

    if (!updatedChat) {
      return res.status(404).json({ success: false, message: "Chat not found" });
    }

    res.status(200).json({
      success: true,
      data: updatedChat,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


exports.createChatMessage = async (req, res, next) => {
  const { sessionId,receiver, message } = req.body;
  const sender = req.user._id; // Assuming authenticated user's ID is the sender

  try {
      // Fetch the receiver user by ID
      const user = await userModel.findById(receiver);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Receiver user not found",
        });
      }
    const newChat = await Chat.create({
      sessionId,
      sender,
      receiver:user._id,
      message,
    });

    res.status(201).json({
      success: true,
      data: newChat,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
