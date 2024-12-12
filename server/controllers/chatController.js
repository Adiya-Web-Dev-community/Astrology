const { updateSessionActivity } = require("../helpers/updateSessionActivity");
const Chat = require("../models/chatModel");
const Session = require("../models/sessionModel");
const userModel = require("../models/userModel");


// exports.getChatHistory = async (req, res) => {
//   try {
//     const { receiver } = req.body;
//     const userId = req.user._id;

//     // Fetch chat history where the user is either the sender or receiver
//     const chatHistory = await Chat.find({
//       $or: [
//         { sender: userId, receiver },
//         { sender: receiver, receiver: userId }
//       ]
//     }).sort({ createdAt: -1 });

//     res.status(200).json({ success: true, data: chatHistory });
//   } catch (error) {
//     console.error("Error fetching chat history:", error);
//     res.status(500).json({ success: false, message: "Error fetching chat history" });
//   }
// };

// exports.getChatHistory = async (req, res) => {
//   try {
//     const { receiver, page = 1, limit = 10 } = req.body; // Default values for page and limit
//     const userId = req.user._id;

//     // Calculate the number of documents to skip
//     const skip = (page - 1) * limit;

//     // Fetch paginated chat history
//     const chatHistory = await Chat.find({
//       $or: [
//         { sender: userId, receiver },
//         { sender: receiver, receiver: userId }
//       ]
//     })
//       .sort({ createdAt: -1 }) // Sort in descending order
//       .skip(skip)
//       .limit(limit);

//     // Count total chats between the two users
//     const totalChats = await Chat.countDocuments({
//       $or: [
//         { sender: userId, receiver },
//         { sender: receiver, receiver: userId }
//       ]
//     });

//     res.status(200).json({
//       success: true,
//       data: chatHistory,
//       pagination: {
//         totalChats,
//         currentPage: page,
//         totalPages: Math.ceil(totalChats / limit),
//       },
//     });
//   } catch (error) {
//     console.error("Error fetching chat history:", error);
//     res.status(500).json({ success: false, message: "Error fetching chat history" });
//   }
// };

exports.getChatHistory = async (req, res) => {
  try {
    const { receiver } = req.query; 
    const page = parseInt(req.query.page, 1) || 1; 
    const limit = parseInt(req.query.limit, 10) || 10; 
    const userId = req.user._id;

    
    const skip = (page - 1) * limit;

  
    const chatHistory = await Chat.find({
      $or: [
        { sender: userId, receiver },
        { sender: receiver, receiver: userId },
      ]
    })
      .sort({ createdAt: -1 }) 
      .skip(skip)
      .limit(limit);

    
    const totalChats = await Chat.countDocuments({
      $or: [
        { sender: userId, receiver },
        { sender: receiver, receiver: userId },
      ]
    });

    res.status(200).json({
      success: true,
      data: chatHistory,
      pagination: {
        totalChats,
        currentPage: page,
        totalPages: Math.ceil(totalChats / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching chat history:", error);
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
    const messageSize = message.length / 1024;
    const updateResult = await updateSessionActivity(sessionId, sender, messageSize);

    if (!updateResult.success) {
      return res.status(500).json({ message: "Failed to update session." });
    }
  
    if (updateResult.isPlanExceeded) {
      return res.status(403).json({ message: "Plan limits exceeded." });
    }
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
