const Gemstone = require("../../models/astroServices/gemstoneSchema");

// Get all gemstones
exports.getAllGemstones = async (req, res) => {
  try {
    const gemstones = await Gemstone.find();
    res.status(200).json(gemstones);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get gemstone by ID
exports.getGemstoneById = async (req, res) => {
  try {
    const gemstone = await Gemstone.findById(req.params.id);
    if (!gemstone) {
      return res.status(404).json({ message: "Gemstone not found" });
    }
    res.status(200).json(gemstone);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Create a new gemstone
exports.createGemstone = async (req, res) => {
  try {
    const gemstone = new Gemstone(req.body);
    await gemstone.save();
    res.status(201).json(gemstone);
  } catch (error) {
    res.status(400).json({ message: "Invalid data", error });
  }
};

// Update a gemstone
exports.updateGemstone = async (req, res) => {
  try {
    const gemstone = await Gemstone.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!gemstone) {
      return res.status(404).json({ message: "Gemstone not found" });
    }
    res.status(200).json(gemstone);
  } catch (error) {
    res.status(400).json({ message: "Invalid data", error });
  }
};

// Delete a gemstone
exports.deleteGemstone = async (req, res) => {
  try {
    const gemstone = await Gemstone.findByIdAndDelete(req.params.id);
    if (!gemstone) {
      return res.status(404).json({ message: "Gemstone not found" });
    }
    res.status(200).json({ message: "Gemstone deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
