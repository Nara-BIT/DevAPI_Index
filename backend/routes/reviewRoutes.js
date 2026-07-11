const express = require("express");
const router = express.Router();
const {
  getReviewsByApi,
  createReview,
  deleteReview,
} = require("../controllers/reviewController");
const { protect } = require("../middleware/auth");

router.get("/:apiId", getReviewsByApi);
router.post("/:apiId", protect, createReview);
router.delete("/:id", protect, deleteReview);

module.exports = router;
