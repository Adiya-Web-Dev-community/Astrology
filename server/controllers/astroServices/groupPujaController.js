const GroupPuja = require("../../models/astroServices/groupPujaSchema");

// // Get all group pujas
// exports.getAllGroupPujas = async (req, res) => {
//   try {
//     const pujas = await GroupPuja.find();
//     res.status(200).json(pujas);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// Get all group pujas with optional pagination
exports.getAllGroupPujas = async (req, res) => {
  try {
    // Set default values for page and limit if not provided
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to 10 pujas per page

    // Calculate the number of documents to skip for pagination
    const skip = (page - 1) * limit;

    // Fetch the group pujas with pagination
    const pujas = await GroupPuja.find().skip(skip).limit(limit);

    // Get the total count of group pujas
    const totalPujas = await GroupPuja.countDocuments();

    // Send response with pagination info
    res.status(200).json({
      totalPujas,
      totalPages: Math.ceil(totalPujas / limit),
      currentPage: page,
      pujas,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Create a new group puja
exports.createGroupPuja = async (req, res) => {
  try {
    const puja = new GroupPuja(req.body);
    await puja.save();
    res.status(201).json(puja);
  } catch (error) {
    res.status(400).json({ message: "Invalid data", error });
  }
};

// Update a group puja
exports.updateGroupPuja = async (req, res) => {
  try {
    console.log(req.body);

    const puja = await GroupPuja.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!puja) {
      return res.status(404).json({ message: "Puja not found" });
    }
    res.status(200).json(puja);
  } catch (error) {
    res.status(400).json({ message: "Invalid data", error });
  }
};

// Delete a group puja
exports.deleteGroupPuja = async (req, res) => {
  try {
    const puja = await GroupPuja.findByIdAndDelete(req.params.id);
    if (!puja) {
      return res.status(404).json({ message: "Puja not found" });
    }
    res.status(200).json({ message: "Puja deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
