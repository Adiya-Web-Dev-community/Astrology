const Astrologer = require("../models/astrologerModel");
const User = require("../models/userModel");

// @desc    Get all astrologers with pagination
// @route   GET /api/v1/astrologers
// @access  Public
exports.getAstrologers = async (req, res, next) => {
  try {
    // Extract page and limit from query params, with default values
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Calculate the starting index of the records
    const startIndex = (page - 1) * limit;

    // Get total count of astrologers
    const total = await Astrologer.countDocuments();

    // Fetch astrologers with pagination and populate specialties
    const astrologers = await Astrologer.find()
      .populate("specialties", "name")
      .skip(startIndex)
      .limit(limit);

    // Calculate total pages
    const totalPages = Math.ceil(total / limit);

    // Send the response with pagination data
    res.status(200).json({
      success: true,
      count: astrologers.length,
      totalPages,
      currentPage: page,
      data: astrologers,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @desc    Get single astrologer
// @route   GET /api/v1/astrologers/:id
// @access  Public
exports.getAstrologer = async (req, res, next) => {
  try {
    const astrologer = await Astrologer.findById(req.params.id).populate(
      "specialties",
      "name"
    );

    if (!astrologer) {
      return res.status(404).json({
        success: false,
        error: `Astrologer not found with id of ${req.params.id}`,
      });
    }

    res.status(200).json({ success: true, data: astrologer });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @desc    Create new astrologer
// @route   POST /api/v1/astrologers
// @access  Private/Admin
exports.createAstrologer = async (req, res, next) => {
  try {
    const astrologer = await Astrologer.create(req.body);
    res.status(201).json({ success: true, data: astrologer });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Update astrologer
// @route   PUT /api/v1/astrologers/:id
// @access  Private/Admin
exports.updateAstrologer = async (req, res, next) => {
  try {
    let astrologer = await Astrologer.findById(req.params.id);

    if (!astrologer) {
      return res.status(404).json({
        success: false,
        error: `Astrologer not found with id of ${req.params.id}`,
      });
    }

    astrologer = await Astrologer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: astrologer });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Delete astrologer
// @route   DELETE /api/v1/astrologers/:id
// @access  Private/Admin
exports.deleteAstrologer = async (req, res, next) => {
  try {
    const astrologer = await Astrologer.findByIdAndDelete(
      req.params.id
    ).populate("userId");
    const user = await User.findByIdAndDelete(astrologer.userId._id);
    if (!astrologer) {
      return res.status(404).json({
        success: false,
        error: `Astrologer not found with id of ${req.params.id}`,
      });
    }

    res.status(200).json({ success: true, message: "Deleted Successful" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @desc    Get astrologers by specialty
// @route   GET /api/v1/astrologers/specialty/:categoryId
// @access  Public
exports.getAstrologersBySpecialty = async (req, res, next) => {
  try {
    const astrologers = await Astrologer.find({
      specialties: req.params.categoryId,
    }).populate("specialties", "name");
    res
      .status(200)
      .json({ success: true, count: astrologers.length, data: astrologers });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @desc    Get top rated astrologers
// @route   GET /api/v1/astrologers/top-rated
// @access  Public
exports.getTopRatedAstrologers = async (req, res, next) => {
  try {
    const astrologers = await Astrologer.find()
      .sort({ rating: -1 })
      .limit(5)
      .populate("specialties", "name");
    res
      .status(200)
      .json({ success: true, count: astrologers.length, data: astrologers });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @desc    Toggle astrologer availability
// @route   PUT /api/v1/astrologers/:id/toggle-availability
// @access  Private/Astrologer
exports.toggleAstrologerAvailability = async (req, res, next) => {
  try {
    let astrologer = await Astrologer.findById(req.params.id);

    if (!astrologer) {
      return res.status(404).json({
        success: false,
        error: `Astrologer not found with id of ${req.params.id}`,
      });
    }

    // Ensure the astrologer can only toggle their own availability
    if (
      astrologer.userId.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(401).json({
        success: false,
        error: `User ${req.user.id} is not authorized to update this astrologer`,
      });
    }

    astrologer.isAvailable = !astrologer.isAvailable;
    await astrologer.save();

    res.status(200).json({ success: true, data: astrologer });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @desc    Create new astrologer with user account
// @route   POST /api/v1/astrologers/create
// @access  Private/Admin
exports.createAstrologerWithAccount = async (req, res, next) => {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      specialties,
      experience,
      bio,
      profileImage,
      pricing,
    } = req.body;

    // Create user account
    const user = await User.create({
      email,
      password,
      role: "astrologer",
      firstName,
      lastName,
      phoneNumber,
      isVerified: true,
    });

    // Create astrologer profile
    const astrologer = await Astrologer.create({
      name: `${firstName} ${lastName}`,
      email,
      phoneNumber,
      specialties,
      experience,
      bio,
      profileImage,
      rating: 0, // Initial rating
      isAvailable: true,
      pricing,
      userId: user._id,
    });

    res.status(201).json({
      success: true,
      data: {
        user: {
          _id: user._id,
          email: user.email,
          role: user.role,
        },
        astrologer,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
