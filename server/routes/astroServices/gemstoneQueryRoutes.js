const express = require("express");
const router = express.Router();
const gemstoneQueryController = require("../../controllers/astroServices/gemstoneQueryController");

// Create a new query
router.post("/", gemstoneQueryController.createGemstoneQuery);

// Get all queries
router.get("/", gemstoneQueryController.getAllQueries);

// Get queries by user
router.get("/user/:userId", gemstoneQueryController.getQueriesByUser);

// Update query status or respond
router.patch("/:id", gemstoneQueryController.updateQuery);

// Delete a query
router.delete("/:id", gemstoneQueryController.deleteQuery);

module.exports = router;
