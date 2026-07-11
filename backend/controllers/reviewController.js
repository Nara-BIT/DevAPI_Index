const Review = require("../models/Review");
const Api = require("../models/Api");

exports.getReviewsByApi = async (req, res) => {
  try {
    const reviews = await Review.find({ api: req.params.apiId })
      .populate("user", "name")
      .sort("-createdAt");
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const apiId = req.params.apiId;

    const existing = await Review.findOne({ api: apiId, user: req.user._id });
    if (existing) {
      return res
        .status(400)
        .json({ message: "You already reviewed this API" });
    }

    const review = await Review.create({
      user: req.user._id,
      api: apiId,
      rating,
      comment,
    });

    const allReviews = await Review.find({ api: apiId });
    const avgRating =
      allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

    await Api.findByIdAndUpdate(apiId, {
      avgRating: Math.round(avgRating * 10) / 10,
      reviewCount: allReviews.length,
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (
      review.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await review.deleteOne();

    const allReviews = await Review.find({ api: review.api });
    const avgRating = allReviews.length
      ? allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length
      : 0;

    await Api.findByIdAndUpdate(review.api, {
      avgRating: Math.round(avgRating * 10) / 10,
      reviewCount: allReviews.length,
    });

    res.json({ message: "Review removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
