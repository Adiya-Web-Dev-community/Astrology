const GroupPuja = require("../../models/astroServices/groupPujaSchema");

// Get all group pujas
exports.getAllGroupPujas = async (req, res) => {
  try {
    const pujas = await GroupPuja.find();
    res.status(200).json(pujas);
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
