const Support = require("../models/support");

// POST: Create a new support request
exports.createSupportRequest = async (req, res) => {
  try {
    const { name, email, issueType, message } = req.body;

    // Create a new support request
    const supportRequest = new Support({
      name,
      email,
      issueType,
      message,
    });

    await supportRequest.save();

    res.status(201).json({ success: true, data: supportRequest });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// GET: Get all support requests
exports.getSupportRequests = async (req, res) => {
  try {
    const supportRequests = await Support.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: supportRequests });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// DELETE: Delete a specific support request by ID
exports.deleteSupportRequest = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the support request exists
    const supportRequest = await Support.findById(id);
    if (!supportRequest) {
      return res
        .status(404)
        .json({ success: false, message: "Support request not found" });
    }

    await supportRequest.remove();
    res.status(200).json({ success: true, message: "Support request deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};
